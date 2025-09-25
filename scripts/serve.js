#!/usr/bin/env node

/**
 * Server startup script with cache busting environment variables
 */

const { execSync } = require('child_process');
const crypto = require('crypto');
const path = require('path');

// Generate runtime build information
const buildTimestamp = Date.now();
const buildHash = crypto.randomBytes(8).toString('hex');

console.log('🚀 Starting SSR server with cache busting...');
console.log(`📅 Runtime Timestamp: ${buildTimestamp}`);
console.log(`🔑 Runtime Hash: ${buildHash}`);

// Set environment variables
process.env.BUILD_TIMESTAMP = buildTimestamp.toString();
process.env.BUILD_HASH = buildHash;
process.env.NODE_ENV = 'production';

// Start the server
const serverPath = path.join(__dirname, '../dist/vegastackit-website/server/server.mjs');

try {
  execSync(`node "${serverPath}"`, {
    stdio: 'inherit',
    env: process.env
  });
} catch (error) {
  console.error('❌ Server startup failed:', error.message);
  process.exit(1);
}