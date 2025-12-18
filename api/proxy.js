export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    const apiResponse = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && {
          Authorization: req.headers.authorization,
        }),
      },
    });

    const contentType = apiResponse.headers.get('content-type');
    const data = await apiResponse.text();

    res.status(apiResponse.status);
    res.setHeader(
      'Content-Type',
      contentType || 'application/json'
    );
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({
      error: 'Proxy failed',
      details: error.message,
    });
  }
}
