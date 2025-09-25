# Deployment Guide with Cache Busting

This guide explains how to deploy your Angular SSR application with automatic cache busting to ensure users always receive the latest version.

## 🚀 Quick Deployment

For a complete deployment with cache busting:

```bash
npm run deploy:prod
```

This single command will:
- Clear all caches
- Generate unique build hashes
- Build the application with production optimizations
- Start the SSR server with cache busting headers

## 📋 Available Scripts

### Cache Management
- `npm run clear-cache` - Clears all build and dependency caches
- `ng cache clean` - Clears Angular CLI cache only

### Building
- `npm run build:deploy` - Production build with automatic cache busting
- `npm run build:ssr` - Standard SSR production build
- `npm run build` - Standard build

### Serving
- `npm run serve:ssr` - Starts SSR server with cache busting
- `npm run deploy:prod` - Full deployment: build + serve

## 🛠️ How Cache Busting Works

### 1. Build-Time Cache Busting
- Each build generates a unique timestamp and hash
- File names are automatically hashed by Angular (`outputHashing: "all"`)
- Environment variables contain build information

### 2. Server-Side Headers
The server automatically sets appropriate cache headers:

- **HTML files**: `no-cache, no-store, must-revalidate` (always fetch fresh)
- **Hashed assets** (JS/CSS): `max-age=31536000, immutable` (1 year cache)
- **Non-hashed assets**: `max-age=3600, must-revalidate` (1 hour cache)

### 3. Build Information Headers
Every response includes:
- `X-Build-Timestamp`: Unix timestamp of the build
- `X-Build-Hash`: Unique hash for this deployment

## 🔧 Manual Deployment Steps

If you prefer to run steps individually:

```bash
# 1. Clear all caches
npm run clear-cache

# 2. Build with cache busting
npm run build:deploy

# 3. Start server
npm run serve:ssr
```

## 📱 Verifying Cache Busting

### Check Build Information
Open browser developer tools and check response headers for any request:
- Look for `X-Build-Timestamp` and `X-Build-Hash` headers
- These should change with each deployment

### Check File Hashing
Built files in `dist/` should have hashes in their names:
- `main-[hash].js`
- `styles-[hash].css`

### Service Integration
Use the `BuildInfoService` in your components:

```typescript
import { BuildInfoService } from './services/build-info.service';

constructor(private buildInfo: BuildInfoService) {
  // Log build info (useful for debugging)
  this.buildInfo.logBuildInfo();

  // Get cache-busted URLs
  const cacheBustedUrl = this.buildInfo.getCacheBustedUrl('/api/data');
}
```

## 🌐 Production Deployment Checklist

Before deploying to production:

- [ ] Run `npm run clear-cache` to ensure clean build
- [ ] Test the build locally with `npm run deploy:prod`
- [ ] Verify cache headers in browser dev tools
- [ ] Check that static assets have unique hashes
- [ ] Confirm `X-Build-*` headers are present

## 🐛 Troubleshooting

### Cache Not Clearing?
1. Check that `X-Build-Timestamp` header changes between deployments
2. Ensure HTML responses have `no-cache` headers
3. Clear browser cache manually if needed

### Build Failing?
1. Run `npm run clear-cache` first
2. Check that Node.js version is compatible
3. Ensure all dependencies are installed

### Old Content Still Showing?
1. Verify `outputHashing: "all"` is in angular.json
2. Check that file names include hashes
3. Confirm CDN/proxy cache settings if applicable

## 📊 Build Information

The deployment creates a `build-info.json` file containing:
```json
{
  "timestamp": 1640995200000,
  "hash": "abc123def456",
  "version": "1.0.0",
  "date": "2021-12-31T12:00:00.000Z",
  "nodeVersion": "v18.0.0",
  "platform": "win32"
}
```

This file can be used by monitoring tools or for debugging purposes.

## 🔄 CI/CD Integration

For automated deployments, use:

```bash
# In your CI/CD pipeline
export BUILD_VERSION=$CI_COMMIT_SHA
npm run deploy:prod
```

The build system will automatically use environment variables:
- `BUILD_VERSION`: Version identifier
- `BUILD_HASH`: Unique deployment hash
- `BUILD_TIMESTAMP`: Build timestamp