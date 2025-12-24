import axios from 'axios';

// This will be proxied to your Laravel backend
// Update LARAVEL_API_URL to your deployed Laravel instance
const LARAVEL_API_URL = process.env.LARAVEL_API_URL || 'http://127.0.0.1:8000/api';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { articleId } = req.query;
    
    if (req.method === 'GET') {
      let url = `${LARAVEL_API_URL}/articles`;
      if (articleId) {
        url += `/${articleId}`;
      }
      
      const response = await axios.get(url);
      return res.status(200).json(response.data);
    }
    
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error.message);
    return res.status(error.response?.status || 500).json({
      message: error.message,
      error: error.response?.data,
    });
  }
}
