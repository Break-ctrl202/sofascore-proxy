const fetch = require('node-fetch');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { endpoint } = req.query;
  
  if (!endpoint) {
    res.status(400).json({ error: 'Paramètre "endpoint" manquant' });
    return;
  }
  
  const sofascoreUrl = `https://www.sofascore.com/api/v1/${endpoint}`;
  
  try {
    const response = await fetch(sofascoreUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.sofascore.com/'
      },
      timeout: 10000
    });
    
    const data = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(data);
    
  } catch (error) {
    res.status(500).json({ error: 'Erreur proxy', message: error.message });
  }
};
