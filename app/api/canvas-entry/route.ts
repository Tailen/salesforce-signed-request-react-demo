import { NextRequest, NextResponse } from 'next/server';

/**
 * Bridge endpoint for Salesforce Canvas.
 * Accepts POST with signed_request from Salesforce and returns an HTML page
 * that stores the token in sessionStorage and redirects to /canvas.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const signedRequest = formData.get('signed_request');

    if (!signedRequest || typeof signedRequest !== 'string') {
      return new NextResponse('Missing signed_request', { status: 400 });
    }

    // Escape the token for safe embedding in JavaScript string
    const escapedToken = signedRequest
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r');

    // Return HTML bridge page that stores token and redirects
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Salesforce Canvas Bridge</title>
</head>
<body>
  <p>Initializing Canvas app...</p>
  <script>
    (function() {
      try {
        sessionStorage.setItem('sfdc_signed_request', '${escapedToken}');
        window.location.href = '/canvas';
      } catch (e) {
        document.body.innerHTML = '<p style="color: red;">Error: ' + e.message + '</p>';
      }
    })();
  </script>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error processing canvas entry:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}
