import { createRemoteJWKSet, jwtVerify } from 'jose';

// Define the JWKS URI from our Auth0 tenant
function getJwksUri() {
  const domain = process.env.AUTH0_DOMAIN;
  if (!domain) throw new Error('AUTH0_DOMAIN is not set in environment or .env');
  // Ensure the domain is properly formatted
  const host = domain.startsWith('http') ? new URL(domain).host : domain;
  return `https://${host}/.well-known/jwks.json`;
}

// Caches the JWKS locally for performance so it doesn't hit Auth0 on every request
let JWKS: ReturnType<typeof createRemoteJWKSet>;

export async function verifyAuth0Token(token: string) {
  if (!JWKS) {
    JWKS = createRemoteJWKSet(new URL(getJwksUri()));
  }
  
  const audience = process.env.AUTH0_AUDIENCE;
  if (!audience) throw new Error('AUTH0_AUDIENCE is not set in environment or .env');

  const domain = process.env.AUTH0_DOMAIN;
  if (!domain) throw new Error('AUTH0_DOMAIN is not set in environment or .env');
  const issuer = `https://${domain.startsWith('http') ? new URL(domain).host : domain}/`;

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer,
      audience,
    });
    return payload; // The validated JWT payload
  } catch (error) {
    console.error('Failed to verify Auth0 token:', error);
    throw new Error('Unauthorized');
  }
}
