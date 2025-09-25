import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import compression from 'compression';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();
const commonEngine = new CommonEngine();

/**
 * Enable gzip compression for all responses
 */
app.use(compression({
  // Compress all responses
  filter: (req, res) => {
    // Don't compress responses if the client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression filter function
    return compression.filter(req, res);
  },
  // Compression level (1-9, 6 is default)
  level: 6,
  // Minimum response size to compress (in bytes)
  threshold: 1024,
}));

/**
 * Security and performance headers with cache busting
 */
app.use((req, res, next) => {
  // Cache busting for HTML files (force revalidation)
  if (req.url.match(/\.html?$/) || req.url === '/' || !req.url.includes('.')) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
  }
  // Long-term caching for hashed assets (JS, CSS with hashes)
  else if (req.url.match(/\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  // Short-term caching for other static assets (non-hashed)
  else if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
  }

  // Add build information headers for cache validation
  const buildTimestamp = process.env['BUILD_TIMESTAMP'] || Date.now().toString();
  const buildHash = process.env['BUILD_HASH'] || 'unknown';
  res.setHeader('X-Build-Timestamp', buildTimestamp);
  res.setHeader('X-Build-Hash', buildHash);

  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  next();
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser with optimized settings
 */
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
    // Enable etag for better caching
    etag: true,
    // Set immutable cache control for hashed files
    setHeaders: (res, path) => {
      if (path.match(/\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    }
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => {
      // Set headers for HTML responses with cache busting
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');

      // Add ETag based on build info for proper cache invalidation
      const buildInfo = `${process.env['BUILD_TIMESTAMP']}-${process.env['BUILD_HASH']}`;
      res.setHeader('ETag', `"${buildInfo}"`);

      res.send(html);
    })
    .catch((err) => next(err));
});

/**
 * Error handling middleware
 */
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
    console.log(`Compression: enabled`);
    console.log(`Environment: ${process.env['NODE_ENV'] || 'development'}`);
  });
}

export default app;