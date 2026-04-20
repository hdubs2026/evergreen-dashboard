const { execSync } = require('child_process');
const fs = require('fs');

console.log('Testing Zapier SDK connections...\n');

// Test 1: Check profile
try {
  console.log('1. Checking Zapier profile...');
  const profile = execSync('npx zapier-sdk get-profile --json', { cwd: __dirname, encoding: 'utf8' });
  console.log('✅ Profile accessible:', JSON.parse(profile).email);
} catch (e) {
  console.log('❌ Profile check failed:', e.message);
}

// Test 2: Check connections
try {
  console.log('\n2. Checking existing connections...');
  const connections = execSync('npx zapier-sdk list-connections --json', { cwd: __dirname, encoding: 'utf8' });
  const connData = JSON.parse(connections);
  console.log(`✅ Found ${connData.length} connections`);
  connData.forEach((conn, i) => {
    console.log(`   ${i+1}. ${conn.name || 'Unnamed'} (${conn.id})`);
  });
} catch (e) {
  console.log('❌ Connections check failed:', e.message);
}

// Test 3: Check specific apps
const appsToTest = ['google-sheets', 'slack', 'discord', 'quickbooks'];
console.log('\n3. Testing specific app connections...');

appsToTest.forEach(app => {
  try {
    const result = execSync(`npx zapier-sdk find-first-connection ${app} --json 2>/dev/null || echo "{}"`, { 
      cwd: __dirname, 
      encoding: 'utf8' 
    });
    const data = JSON.parse(result);
    if (data && data.id) {
      console.log(`✅ ${app}: Connected (${data.id})`);
    } else {
      console.log(`❌ ${app}: No connection found`);
    }
  } catch (e) {
    console.log(`❌ ${app}: Error - ${e.message}`);
  }
});

console.log('\n✅ Zapier SDK test complete!');