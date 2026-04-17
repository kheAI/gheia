import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth0Token } from '@/lib/auth0';
import { insertSensorReading } from '@/lib/snowflake';

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
    
    // 5. Data Lake Ingest (Snowflake)
    // We run this asynchronously so we don't block the immediate 2xx response to the sensor
    const nodeId = data.nodeId || 'unknown-device';
    insertSensorReading(nodeId, data).catch(err => {
      console.error('[Sensor API] Failed to archive to Snowflake:', err);
    });

    // For this demo, we'll save it to our in-memory store so the UI can see it!
    import('@/lib/store').then(({ addReading }) => {
      addReading(data);
    });

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
