const https = require('https');
const url = 'https://localhost:8080/mcp';  // your mkcert HTTPS endpoint

https.get(url, { rejectUnauthorized: true }, (res) => {
  console.log('✅ SUCCESS: mkcert rootCA is trusted by Node!');
  console.log('Status:', res.statusCode);
}).on('error', (err) => {
  console.error('❌ FAIL: mkcert rootCA NOT trusted');
  console.error('Error:', err.message);
});
