const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;

const mime = {
  '.html' : 'text/html; charset=utf-8',
  '.css'  : 'text/css',
  '.js'   : 'text/javascript',
  '.jpg'  : 'image/jpeg',
  '.jpeg' : 'image/jpeg',
  '.png'  : 'image/png',
  '.gif'  : 'image/gif',
  '.svg'  : 'image/svg+xml',
  '.ico'  : 'image/x-icon',
  '.woff2': 'font/woff2',
  '.mp4'  : 'video/mp4',
  '.webm' : 'video/webm',
  '.pdf'  : 'application/pdf',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  const filePath    = path.join(__dirname, urlPath);
  const ext         = path.extname(filePath).toLowerCase();
  const contentType = mime[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stat) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 — Arquivo não encontrado');
      return;
    }

    const fileSize = stat.size;
    const range    = req.headers.range;

    if (range) {
      // Suporte a Range requests (necessário para vídeo no mobile/iOS)
      const [startStr, endStr] = range.replace(/bytes=/, '').split('-');
      const start = parseInt(startStr, 10);
      const end   = endStr ? parseInt(endStr, 10) : fileSize - 1;
      const chunk = end - start + 1;

      res.writeHead(206, {
        'Content-Range'  : `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges'  : 'bytes',
        'Content-Length' : chunk,
        'Content-Type'   : contentType,
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length' : fileSize,
        'Content-Type'   : contentType,
        'Accept-Ranges'  : 'bytes',
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });

}).listen(PORT, () => {
  console.log(`✓ Site rodando em http://localhost:${PORT}`);
});
