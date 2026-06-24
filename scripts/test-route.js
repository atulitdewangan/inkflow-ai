import { POST } from '../src/app/api/generate-notes/route.ts';

const req = new Request('http://localhost/api/generate-notes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ transcript: 'Test transcript about biology and plant cells.' }),
});

const res = await POST(req);
console.log('status', res.status);
console.log(await res.text());
