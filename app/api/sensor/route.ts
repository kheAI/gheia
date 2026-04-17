import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth0Token } from '@/lib/auth0';

export async function POST(req: NextRequest) {
  try {
    // 1. Extract Bearer token from the Auth header
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Missing or invalid Authorization header' },
        { status: 401 }
      );
    }
    const token = authHeader.split(' ')[1];

    // 2. Validate token against Auth0 JKWS
    const decodedToken = await verifyAuth0Token(token);

    // 3. Optional scope check: Zero-trust might verify the token has 'write:sensor_data' scope
    const scopes = ((decodedToken.scope as string) || '').split(' ');
    if (!scopes.includes('write:sensor_data')) {
      console.warn('[Sensor API] Warning: Valid token, but missing write:sensor_data scope. Strictly enforcing this now.');
      return NextResponse.json({ error: 'Insufficient scope: write:sensor_data required' }, { status: 403 });
    }

    // 4. Token is valid. Process the payload
    const data = await req.json();
    
    // In a real application, you might save data to a database here.
    console.log('[Sensor API] Received authenticated payload:', data);
    console.log('[Sensor API] From Client/App ID:', decodedToken.sub);

    return NextResponse.json({
      success: true,
      message: 'Sensor data received and verified securely.',
      recordedData: data
    }, { status: 201 });

  } catch (error: any) {
    // Standardize 401 error responses for validation failures
    return NextResponse.json(
      { error: error.message || 'Unauthorized' },
      { status: 401 }
    );
  }
}
