import http from 'http';
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('BROWSER ERROR RECEIVED:', body);
      res.end('ok');
    });
  } else {
    res.end('Server running');
  }
});
server.listen(9999, () => {
  console.log('Listening on 9999');
});
