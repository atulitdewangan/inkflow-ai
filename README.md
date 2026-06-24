
# AI Note-Taking Tool UI

This repository contains the InkFlow AI note-taking UI, built with Next.js and Google Gemini GenAI.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- A Google Gemini API key for note generation

## Install

From the project root :

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with the following content:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

> This repository does not include any real API key. `.env` is ignored by Git.

## Run locally

Start the development server:

```bash
npm run dev
```

Then open the app in your browser at:

```text
http://localhost:3000
```

## Build and start for production

Build the app:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## API sample request

After the app is running, test the notes generation endpoint:

```bash
node scripts/sample-generate-notes-request.js
```

To target a different host or transcript:

```bash
node scripts/sample-generate-notes-request.js http://localhost:3000/api/generate-notes "Your transcript text here"
```

## Additional commands

- `npm run lint` — run Next.js lint checks
- `npm run sample-request` — run the sample transcript request script

## Notes

- The `GEMINI_API_KEY` environment variable is required for `/api/generate-notes` to work.
- Do not commit `.env` to source control.
  