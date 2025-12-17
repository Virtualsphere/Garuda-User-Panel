// /api/proxy.js - Serverless function to proxy API requests
export default async function handler(request) {
  // Get the target URL from the query parameter or request body
  const urlParam = new URL(request.url).searchParams.get('url');
  const targetUrl = urlParam || 'http://72.61.169.226';

  try {
    // Forward the request to the external API
    const apiResponse = await fetch(targetUrl + request.url.replace(/^.*\/api\/proxy/, ''), {
      method: request.method,
      headers: {
        'Content-Type': 'application/json',
        // Forward other headers as needed
      },
      body: request.method !== 'GET' ? await request.text() : undefined,
    });

    // Get the response data
    const data = await apiResponse.text();

    // Return the response with CORS headers
    return new Response(data, {
      status: apiResponse.status,
      statusText: apiResponse.statusText,
      headers: {
        'Content-Type': apiResponse.headers.get('Content-Type') || 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow your Vercel frontend domain
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Proxy failed', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}