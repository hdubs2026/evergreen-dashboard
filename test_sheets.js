// Simple test to check if we can interact with Google Sheets via Zapier
const { execSync } = require('child_process');

console.log('Testing Google Sheets connection via Zapier SDK...\n');

// First, let's see what actions are available for Google Sheets
try {
  console.log('1. Checking available Google Sheets actions...');
  const actions = execSync('npx zapier-sdk list-actions google-sheets --json 2>&1 | head -100', { 
    cwd: __dirname, 
    encoding: 'utf8' 
  });
  
  // Parse the output (it might have color codes)
  const cleanOutput = actions.replace(/\x1b\[[0-9;]*m/g, '');
  console.log('Available actions sample:', cleanOutput.substring(0, 500) + '...');
  
  // Look for specific actions
  if (cleanOutput.includes('create_spreadsheet_row')) {
    console.log('✅ Create row action available');
  }
  if (cleanOutput.includes('find_spreadsheet_row')) {
    console.log('✅ Find row action available');
  }
  
} catch (e) {
  console.log('Error checking actions:', e.message);
}

// Test if we can find a connection
try {
  console.log('\n2. Testing Google Sheets connection...');
  const connection = execSync('npx zapier-sdk find-first-connection google-sheets --json 2>&1', {
    cwd: __dirname,
    encoding: 'utf8'
  });
  
  const cleanOutput = connection.replace(/\x1b\[[0-9;]*m/g, '');
  console.log('Connection found:', cleanOutput.substring(0, 200) + '...');
  
} catch (e) {
  console.log('Error finding connection:', e.message);
}

console.log('\n✅ Test complete!');