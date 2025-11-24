import { NextRequest, NextResponse } from 'next/server';

/**
 * Mock backend API for Canvas data.
 * Validates the X-Signed-Request header and returns mock data.
 */
export async function GET(request: NextRequest) {
  const signedRequest = request.headers.get('X-Signed-Request');

  if (!signedRequest) {
    return NextResponse.json(
      { error: 'Missing X-Signed-Request header' },
      { status: 401 }
    );
  }

  // Return mock data with some info about the signed request
  const mockData = {
    status: 'ok',
    message: 'Mock canvas data loaded',
    signedRequestFirst20Chars: signedRequest.substring(0, 20),
    timestamp: new Date().toISOString(),
    mockUser: {
      userId: '005xx000001X8Uz',
      userName: 'mock.user@example.com',
      fullName: 'Mock User',
    },
    mockContext: {
      organizationId: '00Dxx0000001gPL',
      instanceUrl: 'https://mock-instance.salesforce.com',
      environment: 'PRODUCTION',
    },
  };

  return NextResponse.json(mockData, { status: 200 });
}
