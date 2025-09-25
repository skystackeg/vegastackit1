#!/usr/bin/env node

/**
 * Deployment script with automatic cache busting
 * This script sets up build variables and ensures cache clearing on every deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Generate build information
const buildTimestamp = Date.now();
const buildHash = crypto.randomBytes(8).toString('hex');
const buildVersion = process.env.BUILD_VERSION || '1.0.0';

console.log('🚀 Starting deployment with cache busting...');
console.log(`📅 Build Timestamp: ${buildTimestamp}`);
console.log(`🔑 Build Hash: ${buildHash}`);
console.log(`📦 Build Version: ${buildVersion}`);

// Set environment variables for the build
process.env.BUILD_TIMESTAMP = buildTimestamp.toString();
process.env.BUILD_HASH = buildHash;
process.env.BUILD_VERSION = buildVersion;

// Update production environment file with build info
const prodEnvPath = path.join(__dirname, '../src/environments/environment.prod.ts');
const prodEnvContent = `export const environment = {
  production: true,
  apiUrl: 'https://vegastack-backend.onrender.com',
  buildTimestamp: ${buildTimestamp},
  version: '${buildVersion}',
  cacheBuster: '${buildHash}'
};`;

try {
  // Write updated environment file
  fs.writeFileSync(prodEnvPath, prodEnvContent);
  console.log('✅ Updated production environment with build info');

  // Clear Angular build cache
  try {
    execSync('npx ng cache clean', { stdio: 'inherit' });
    console.log('✅ Cleared Angular build cache');
  } catch (error) {
    console.log('⚠️  Angular cache clean failed (may not exist)');
  }

  // Clean previous build output
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    execSync(`rimraf "${distPath}"`, { stdio: 'inherit' });
    console.log('✅ Cleaned previous build output');
  }

  // Run production build with cache busting environment variables
  console.log('🔨 Building application with cache busting...');
  execSync(`ng build --configuration=production`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_TIMESTAMP: buildTimestamp.toString(),
      BUILD_HASH: buildHash,
      BUILD_VERSION: buildVersion
    }
  });

  console.log('✅ Build completed successfully');

  // Create build info file for reference
  const buildInfoPath = path.join(__dirname, '../dist/vegastackit-website/build-info.json');
  const buildInfo = {
    timestamp: buildTimestamp,
    hash: buildHash,
    version: buildVersion,
    date: new Date(buildTimestamp).toISOString(),
    nodeVersion: process.version,
    platform: process.platform
  };

  // Ensure dist directory exists
  const buildInfoDir = path.dirname(buildInfoPath);
  if (!fs.existsSync(buildInfoDir)) {
    fs.mkdirSync(buildInfoDir, { recursive: true });
  }

  fs.writeFileSync(buildInfoPath, JSON.stringify(buildInfo, null, 2));
  console.log('✅ Created build info file');

  console.log('🎉 Deployment completed successfully!');
  console.log('📋 Build Information:');
  console.log(`   - Timestamp: ${buildTimestamp}`);
  console.log(`   - Hash: ${buildHash}`);
  console.log(`   - Version: ${buildVersion}`);
  console.log(`   - Date: ${new Date(buildTimestamp).toISOString()}`);

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}