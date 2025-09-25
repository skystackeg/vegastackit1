#!/usr/bin/env node

/**
 * Comprehensive cache clearing utility
 * Clears all types of cache that might interfere with deployments
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Starting comprehensive cache clearing...');

const cacheDirs = [
  '.angular/cache',
  'node_modules/.cache',
  'dist',
  '.tmp'
];

// Clear Angular CLI cache
try {
  console.log('📦 Clearing Angular CLI cache...');
  execSync('ng cache clean', { stdio: 'inherit' });
  console.log('✅ Angular CLI cache cleared');
} catch (error) {
  console.log('⚠️  Angular CLI cache clean failed (may not exist)');
}

// Clear cache directories
cacheDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    try {
      console.log(`🗂️  Clearing ${dir}...`);
      // Use cross-platform delete
      if (process.platform === 'win32') {
        execSync(`rmdir /s /q "${fullPath}"`, { stdio: 'pipe' });
      } else {
        execSync(`rm -rf "${fullPath}"`, { stdio: 'pipe' });
      }
      console.log(`✅ Cleared ${dir}`);
    } catch (error) {
      console.log(`⚠️  Failed to clear ${dir}: ${error.message}`);
    }
  } else {
    console.log(`ℹ️  ${dir} does not exist`);
  }
});

// Clear npm cache (optional, but thorough)
try {
  console.log('📦 Clearing npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ npm cache cleared');
} catch (error) {
  console.log('⚠️  npm cache clean failed');
}

// Clear Node.js require cache if running in Node
if (require.cache) {
  console.log('🔄 Clearing Node.js require cache...');
  Object.keys(require.cache).forEach(key => {
    delete require.cache[key];
  });
  console.log('✅ Node.js require cache cleared');
}

console.log('🎉 Cache clearing completed!');
console.log('💡 Tip: Run this before each deployment to ensure fresh builds');