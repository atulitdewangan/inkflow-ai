import { GoogleGenAI, FunctionCallingConfigMode } from '@google/genai';
import fs from 'fs';
import path from 'path';

const env = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .reduce((acc, line) => {
    const [key, ...rest] = line.split('=');
    acc[key] = rest.join('=');
    return acc;
  }, {});

const GEMINI_API_KEY = env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env');
  process.exit(1);
}

const prompt = `You are InkFlow AI, a transcript-to-handwritten-notes generator.
Convert the transcript into a compact, paper-style outline in a structured JSON note response using the NoteResponse schema.
Include all major headlines, subheadings, definitions, bullet points, and important callouts.
Keep the notes short and concise while preserving the full structure of the paper and the key concepts.
Do not include any extra markdown, explanation, or fields outside the schema.
Use subtle pastel hex colors for suggestedColor values, and keep hasHighlight true only for the most vital concepts.

Transcript:
Today we covered the structure of plant cells, photosynthesis, and the key differences between xylem and phloem. We also discussed how sunlight is converted into chemical energy and why stomata are important for gas exchange.
`;

const noteResponseJsonSchema = {
  type: 'object',
  properties: {
    blocks: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          type: {
            type: 'string',
            enum: [
              'heading',
              'subheading',
              'body_text',
              'bullet_point',
              'definition',
              'important_callout',
            ],
          },
          text: { type: 'string' },
          suggestedColor: {
            type: 'string',
            pattern: '^#([0-9A-Fa-f]{6})$',
          },
          hasHighlight: { type: 'boolean' },
        },
        required: ['id', 'type', 'text', 'suggestedColor', 'hasHighlight'],
        additionalProperties: false,
      },
    },
  },
  required: ['blocks'],
  additionalProperties: false,
};

async function main() {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: 0,
      toolConfig: {
        functionCallingConfig: {
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['createNoteResponse'],
        },
      },
      tools: [{ functionDeclarations: [{ name: 'createNoteResponse', description: 'Return a structured NoteResponse object with ink-style note blocks for a transcript.', parametersJsonSchema: noteResponseJsonSchema }] }],
    },
  });

  console.log('response.functionCalls:', JSON.stringify(response.functionCalls, null, 2));
  console.log('response.text:', JSON.stringify(response.text, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
