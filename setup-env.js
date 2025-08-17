#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🎬 Setting up environment variables for Movies Frontend...\n');

const envContent = `# Frontend Environment Variables
# This file contains environment variables for the React frontend

# Backend API URL (hosted on Render)
VITE_API_BASE_URL=our-backend-url-here


# Environment
VITE_NODE_ENV=production

# Note: All Vite environment variables must start with VITE_
# These variables will be available in the browser
`;

const envPath = path.join(__dirname, '.env');

try {
  // Check if .env already exists
  if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping creation.');
    console.log('   If you need to update it, please edit it manually.');
  } else {
    // Create .env file
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('   Location:', envPath);
  }
  
  console.log('\n📋 Next steps:');
  console.log('   1. Restart your development server (npm run dev)');
  console.log('   2. Clear your browser cache');
  console.log('   3. Refresh the page');
  console.log('\n🔍 To verify the setup:');
  console.log('   - Check browser console for "Environment check:"');
  console.log('   - Should show VITE_API_BASE_URL with your backend URL');
  
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
  console.log('\n📝 Please create the .env file manually with this content:');
  console.log(envContent);
}

console.log('\n🎯 If you still have issues, check the SOLUTION_GUIDE.md file for detailed instructions.');
