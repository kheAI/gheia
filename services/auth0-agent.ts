"use server";

/**
 * Mock Service: Auth0 Machine-to-Machine (M2M) Authentication
 * 
 * In a real-world scenario, each IoT sensor (Agent) would use its 
 * Client ID and Client Secret to authenticate against the Auth0 endpoint 
 * and receive an Access Token to interact with our central API securely.  
 */

export async function authenticateIoTSensor(
  clientId: string,
  clientSecret: string
): Promise<{ accessToken: string; expiresIn: number }> {
  console.log(`[Auth0] Authenticating IoT Sensor Agent: ${clientId}`);
  
  // Real implementation would look like:
  /*
  const response = await fetch(`https://YOUR_DOMAIN/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'https://api.gaiagrid.cloud',
      grant_type: 'client_credentials'
    })
  });
  const data = await response.json();
  return { accessToken: data.access_token, expiresIn: data.expires_in };
  */

  // Mock implementation for DEV Weekend Challenge
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network latency

  return {
    accessToken: `mock_m2m_token_gaia_${Math.random().toString(36).substring(7)}`,
    expiresIn: 86400, // 24 hours
  };
}
