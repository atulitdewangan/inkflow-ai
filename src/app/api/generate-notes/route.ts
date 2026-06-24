import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

interface NoteBlock {
  id: string;
  type: 'heading' | 'subheading' | 'body_text' | 'bullet_point' | 'definition' | 'important_callout';
  text: string;
  suggestedColor: string;
  hasHighlight: boolean;
}

interface NoteResponse {
  blocks: NoteBlock[];
}

const noteBlockSchema = z.object({
  id: z.string().min(1),
  type: z.enum([
    'heading',
    'subheading',
    'body_text',
    'bullet_point',
    'definition',
    'important_callout',
  ]),
  text: z.string().min(1),
  suggestedColor: z.string().regex(/^#([0-9A-Fa-f]{6})$/),
  hasHighlight: z.boolean(),
});

const noteResponseSchema = z.object({
  blocks: z.array(noteBlockSchema).min(1),
});

const createPrompt = (transcript: string) => {
  return `You are InkFlow AI, a transcript-to-handwritten-notes generator.
Convert the transcript into a JSON object matching the NoteResponse schema below.
Return only valid JSON, without any markdown, explanation, or wrapper text.
The blocks array MUST contain at least four items, and each item must be derived from the transcript.
Every block text must be a real summary, paraphrase, or quote from the transcript.
Do not return any placeholder text such as "empty", "no content", "TBD", or "not available."
If the transcript includes a sequence of facts, turn them into bullet_point blocks.
If it includes a key term or definition, use a definition block.
Highlight the most important concept with important_callout.

NoteResponse schema:
{
  "blocks": [
    {
      "id": "string",
      "type": "heading|subheading|body_text|bullet_point|definition|important_callout",
      "text": "string",
      "suggestedColor": "#RRGGBB",
      "hasHighlight": true|false
    }
  ]
}

Transcript:
${transcript}
`;
};

const safeJsonParse = (value: unknown) => {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value);
    } catch {
      return undefined;
    }
  }
  return value;
};

const extractJsonFromText = (text: string) => {
  const cleaned = text.replace(/```json|```/g, '').trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) return undefined;
  return safeJsonParse(match[0]);
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing Gemini API key on server.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Request body must be valid JSON.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!body || typeof body !== 'object' || body === null || typeof (body as any).transcript !== 'string') {
    return new Response(JSON.stringify({ error: 'Request JSON must include a transcript string.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const transcript = ((body as any).transcript as string).trim();
  if (!transcript) {
    return new Response(JSON.stringify({ error: 'Transcript cannot be empty.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: createPrompt(transcript),
      config: {
        temperature: 0,
      },
    });

    const text = typeof response.text === 'string' ? response.text : '';
    let rawOutput = safeJsonParse(text) ?? response.functionCalls?.[0]?.args;
    if (!rawOutput && text) {
      rawOutput = extractJsonFromText(text);
    }

    const parsed = noteResponseSchema.safeParse(rawOutput);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: 'Gemini response did not match expected NoteResponse schema.',
          details: parsed.error.format(),
          raw: rawOutput,
          text,
          functionCalls: response.functionCalls,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify(parsed.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown GenAI error.';
    return new Response(JSON.stringify({ error: 'Failed to generate notes.', details: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
