#!/usr/bin/env node

/**
 * Send messages as different AI agents via Discord webhooks
 */

const https = require('https');

// Webhook URLs - UPDATE THESE WITH YOUR WEBHOOKS
const WEBHOOKS = {
  jordan: 'YOUR_JORDAN_WEBHOOK_URL',
  donna: 'YOUR_DONNA_WEBHOOK_URL',
  jerry: 'YOUR_JERRY_WEBHOOK_URL'
};

// Agent configurations
const AGENTS = {
  jordan: {
    name: 'Jordan Belfort',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    color: 0x3498db // Blue
  },
  donna: {
    name: 'Donna Paulsen',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
    color: 0x9b59b6 // Purple
  },
  jerry: {
    name: 'Jerry McGuire',
    avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png',
    color: 0xe74c3c // Red
  }
};

async function sendAsAgent(agentName, message) {
  const agent = AGENTS[agentName];
  const webhookUrl = WEBHOOKS[agentName];
  
  if (!agent || !webhookUrl) {
    console.error(`❌ Agent ${agentName} not configured`);
    return false;
  }
  
  // Parse webhook URL
  const url = new URL(webhookUrl);
  const path = url.pathname + url.search;
  
  const payload = {
    username: agent.name,
    avatar_url: agent.avatar,
    content: message,
    embeds: message.length > 2000 ? [{
      title: `${agent.name} says:`,
      description: message,
      color: agent.color,
      timestamp: new Date().toISOString()
    }] : undefined
  };
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      port: 443,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ ${agent.name}: Message sent`);
          resolve(true);
        } else {
          console.error(`❌ ${agent.name}: Failed (${res.statusCode})`);
          resolve(false);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`❌ ${agent.name}: Network error`, error.message);
      resolve(false);
    });
    
    req.write(JSON.stringify(payload));
    req.end();
  });
}

async function sendTeamMessage(message) {
  console.log('👥 Sending team message...');
  
  const results = await Promise.all([
    sendAsAgent('jordan', message),
    sendAsAgent('donna', message),
    sendAsAgent('jerry', message)
  ]);
  
  const successCount = results.filter(r => r).length;
  console.log(`📊 Sent: ${successCount}/3 successful`);
  return successCount === 3;
}

async function sendIndividualMessages(messages) {
  console.log('💬 Sending individual messages...');
  
  for (const [agentName, message] of Object.entries(messages)) {
    await sendAsAgent(agentName, message);
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function dailyStandup() {
  console.log('📅 Starting daily standup...');
  
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Send header
  await sendAsAgent('jordan', `# 📊 Daily Standup - ${date}\n*AI Team Status Report*`);
  
  // Individual updates
  await new Promise(resolve => setTimeout(resolve, 2000));
  await sendAsAgent('jordan', '**Jordan Belfort (CFO AI):**\n• Analyzing Q2 financial projections\n• Reviewing 3 overdue invoices\n• Optimizing payment terms for 15 clients\n• Status: 94% success rate, 15 tasks today');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  await sendAsAgent('donna', '**Donna Paulsen (Admin AI):**\n• Scheduled 8 client appointments\n• Optimized tomorrow\'s crew assignments\n• Sent 12 follow-up reminders\n• Status: 96% success rate, 22 tasks today');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  await sendAsAgent('jerry', '**Jerry McGuire (Sales AI):**\n• Contacted 5 new leads from Jobber\n• Scheduled 2 estimator meetings\n• Following up on 3 proposals\n• Status: 88% success rate, 12 tasks today');
  
  await new Promise(resolve => setTimeout(resolve, 2000));
  await sendAsAgent('jordan', '**🎯 Today\'s Focus:**\n1. Jordan: Complete cash flow analysis\n2. Donna: Finalize weekly schedule\n3. Jerry: Follow up on all new leads\n\n**📈 Overall Progress: 25% complete**');
}

// Command line interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node send-as-agent.js [agent] [message]');
    console.log('  node send-as-agent.js team [message]');
    console.log('  node send-as-agent.js standup');
    console.log('\nAgents: jordan, donna, jerry');
    process.exit(1);
  }
  
  const command = args[0].toLowerCase();
  
  // Check if webhooks are configured
  if (WEBHOOKS.jordan.includes('YOUR_')) {
    console.log('❌ Webhooks not configured');
    console.log('\n📋 Setup:');
    console.log('1. Create 3 webhooks in Discord #teamchat');
    console.log('2. Name them: Jordan Belfort AI, Donna Paulsen AI, Jerry McGuire AI');
    console.log('3. Update this script with the webhook URLs');
    console.log('4. Run again');
    process.exit(1);
  }
  
  if (command === 'standup') {
    await dailyStandup();
  } else if (command === 'team') {
    const message = args.slice(1).join(' ');
    await sendTeamMessage(message);
  } else if (['jordan', 'donna', 'jerry'].includes(command)) {
    const message = args.slice(1).join(' ');
    await sendAsAgent(command, message);
  } else {
    console.log(`❌ Unknown agent: ${command}`);
    console.log('Available agents: jordan, donna, jerry, team, standup');
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { sendAsAgent, sendTeamMessage, dailyStandup };