#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 Setting up Jordan cron job...');

const jordanCron = '0 6 * * * cd /Users/jarvishstark/.openclaw/workspace && /opt/homebrew/bin/node /Users/jarvishstark/.openclaw/workspace/jordan-daily.js >> /Users/jarvishstark/.openclaw/workspace/logs/jordan-daily.log 2>&1';

try {
  // Get current crontab
  let currentCron = '';
  try {
    currentCron = execSync('crontab -l 2>/dev/null', { encoding: 'utf8' });
  } catch (e) {
    // No crontab exists yet
    currentCron = '';
  }

  // Check if Jordan cron already exists
  if (currentCron.includes('jordan-daily.js')) {
    console.log('✅ Jordan cron job already exists');
  } else {
    // Add Jordan cron to existing jobs
    const newCron = currentCron.trim() + (currentCron ? '\n' : '') + jordanCron;
    
    // Write to temp file
    fs.writeFileSync('/tmp/jordan_cron', newCron);
    
    // Install new crontab
    execSync('crontab /tmp/jordan_cron', { stdio: 'inherit' });
    console.log('✅ Jordan cron job installed');
  }

  // Verify
  const verify = execSync('crontab -l', { encoding: 'utf8' });
  console.log('\n📋 Current cron jobs:');
  console.log(verify);

  // Create logs directory
  execSync('mkdir -p /Users/jarvishstark/.openclaw/workspace/logs');
  console.log('✅ Logs directory ready');

  // Test Jordan script
  console.log('\n🧪 Testing Jordan script...');
  execSync('cd /Users/jarvishstark/.openclaw/workspace && /opt/homebrew/bin/node jordan-daily.js', { stdio: 'inherit' });

  console.log('\n🎯 JORDAN CRON SETUP COMPLETE');
  console.log('⏰ Will run daily at 6:00 AM');
  console.log('📊 Briefing at 6:05 AM');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}