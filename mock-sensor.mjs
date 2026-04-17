/*
  Mock Sensor utility.
  Run via: npm run mock-sensor
*/
import assert from 'assert';

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

// Using port 3000 locally, but adjust as needed
const API_URL = 'http://localhost:3000/api/sensor';

async function generateM2MToken() {
  if (!AUTH0_DOMAIN || !AUTH0_CLIENT_ID || !AUTH0_CLIENT_SECRET || !AUTH0_AUDIENCE) {
    throw new Error('Missing Auth0 configuration in environment variables.');
  }

  // Ensure domain doesn't end in a trailing slash
  const domainUrl = AUTH0_DOMAIN.startsWith('http') ? AUTH0_DOMAIN : `https://${AUTH0_DOMAIN}`;
  const tokenEndpoint = `${domainUrl}/oauth/token`;
  
  console.log(`[Sensor] Fetching M2M access token from ${tokenEndpoint}...`);

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[Sensor] Error fetching token:', data);
    process.exit(1);
  }

  console.log('[Sensor] Successfully retrieved access token!');
  return data.access_token;
}

// Emulate a sensor reading
function generateMockPayload() {
  return {
    nodeId: 'urban-farm-node-42',
    timestamp: new Date().toISOString(),
    metrics: {
      soilMoisture: (Math.random() * 100).toFixed(2) + '%',
      temperatureC: (20 + Math.random() * 10).toFixed(2),
      humidity: (40 + Math.random() * 20).toFixed(2) + '%',
      lightLevelLux: Math.floor(Math.random() * 5000),
    }
  };
}

async function transmitData(token, payload) {
  console.log(`[Sensor] Transmitting payload to ${API_URL}...`);
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const responseBody = await response.json();

    if (response.ok) {
      console.log(`[Sensor] Success! Server responded:`);
      console.dir(responseBody, { depth: null, colors: true });
    } else {
      console.log(`[Sensor] Failed. Server responded with status ${response.status}:`);
      console.dir(responseBody, { depth: null, colors: true });
    }
  } catch(error) {
    console.error(`[Sensor] Could not connect to the API at ${API_URL}`, error);
  }
}

async function run() {
  console.log('=== Starting Auth0 M2M Zero-Trust Mock Sensor ===');
  try {
    const accessToken = await generateM2MToken();
    const payload = generateMockPayload();
    await transmitData(accessToken, payload);
  } catch (error) {
    console.error('Sensor error:', error);
  }
}

run();
