/**
 * Minimal static file server for cPanel Node.js app.
 * Serves the Next.js static export (output: 'export').
 * No external dependencies — uses only Node.js built-ins.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.pdf':  'application/pdf',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.webp': 'image/webp',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function getMime(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

const SECURITY_HEADERS = {
  // Clickjacking: solo permite embeber desde el mismo origen
  'X-Frame-Options': 'SAMEORIGIN',
  // Evita que el navegador adivine el MIME type
  'X-Content-Type-Options': 'nosniff',
  // Envía solo el origen (sin path ni query) al navegar a otros sitios
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Fuerza HTTPS durante 1 año
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  // Deshabilita funciones del navegador que no se usan
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  // CSP: restringe orígenes de recursos
  // - unsafe-inline necesario: Next.js estático inyecta scripts inline (JSON-LD, hidratación)
  // - connect-src incluye LinkedIn/GitHub por los <link rel="preconnect"> del layout
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    "frame-src 'self'",
    "connect-src 'self' https://www.linkedin.com https://github.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
};

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      serve404(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': getMime(filePath), ...SECURITY_HEADERS });
    res.end(data);
  });
}

function serve404(res) {
  const notFoundPath = path.join(ROOT, '404.html');
  fs.readFile(notFoundPath, (err, data) => {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS });
    res.end(err ? '404 Not Found' : data);
  });
}

// Referers that identify traffic coming from X / Twitter
const X_REFERER_RE = /\b(x\.com|twitter\.com|t\.co)\b/i;

const server = http.createServer((req, res) => {
  // Redirect visitors arriving from X to the no-x notice page
  const referer = req.headers['referer'] || req.headers['referrer'] || '';
  if (X_REFERER_RE.test(referer) && !req.url.startsWith('/no-x')) {
    res.writeHead(302, { Location: '/no-x', ...SECURITY_HEADERS });
    res.end();
    return;
  }

  // Strip query string and decode URI
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch {
    res.writeHead(400);
    res.end('Bad Request');
    return;
  }

  // Prevent path traversal
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  fs.stat(filePath, (err, stat) => {
    if (err) {
      // Try appending .html
      const htmlPath = filePath + '.html';
      fs.stat(htmlPath, (err2) => {
        if (err2) {
          serve404(res);
        } else {
          serveFile(res, htmlPath);
        }
      });
      return;
    }

    if (stat.isDirectory()) {
      // Try index.html inside the directory
      const indexPath = path.join(filePath, 'index.html');
      fs.stat(indexPath, (err2) => {
        if (err2) {
          serve404(res);
        } else {
          serveFile(res, indexPath);
        }
      });
      return;
    }

    serveFile(res, filePath);
  });
});

server.listen(PORT, () => {
  console.log(`CV server running on port ${PORT}`);
});
