const endpoint = process.argv[2] || 'http://localhost:3000/api/generate-notes';

const transcript = process.argv[3] || `
Today we covered the structure of plant cells, photosynthesis, and the key differences between xylem and phloem. We also discussed how sunlight is converted into chemical energy and why stomata are important for gas exchange.
`;

async function main() {
  console.log(`Sending transcript to ${endpoint}...`);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ transcript }),
  });

  const payload = await response.json();

  if (!response.ok) {
    console.error('Request failed:', response.status, response.statusText);
    console.error(JSON.stringify(payload, null, 2));
    process.exit(1);
  }

  console.log('Response:');
  console.log(JSON.stringify(payload, null, 2));
}

main().catch((error) => {
  console.error('Request error:', error);
  process.exit(1);
});
