import { NextResponse } from 'next/server';

export async function GET() {
  // Get package.json version
  const { version } = await import('../../../../package.json');
  
  return NextResponse.json({
    status: 'ok',
    version,
    timestamp: new Date().toISOString(),
  });
} 