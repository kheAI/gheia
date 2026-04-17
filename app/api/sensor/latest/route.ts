import { NextResponse } from 'next/server';
import { getLatestReadings } from '@/lib/store';

export async function GET() {
  const readings = getLatestReadings();
  return NextResponse.json({ readings });
}
