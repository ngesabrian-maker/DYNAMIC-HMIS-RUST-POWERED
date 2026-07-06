const http = require('http');

const server = http.createServer(async (_req, res) => {
  try {
    const apiResponse = await fetch('http://127.0.0.1:8080/api/health');
    const data = await apiResponse.json();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Web app connected to API', data }));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unable to reach API', error: error.message }));
  }
});

server.listen(3000, () => {
  console.log('Web app listening on http://127.0.0.1:3000');
});
