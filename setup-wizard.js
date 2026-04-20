#!/usr/bin/env node

// Interactive setup wizard for Evergreen Landscaping Discord AI Agents
// Inspired by common Discord bot tutorial best practices

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🎬 Evergreen Landscaping Discord AI Agents - Setup Wizard');
console.log('=' .repeat(60));
console.log('\nThis wizard will help you set up your AI agents system.');
console.log('Follow the steps below to configure everything.\n');

const questions = [
    {
        question: '📝 Step 1: What is your Discord Bot Token?',
        hint: 'Get this from Discord Developer Portal → Bot → Token',
        key: 'DISCORD_TOKEN',
        secret: true
    },
    {
        question: '📝 Step 2: What is your Discord Client ID?',
        hint: 'Get this from Discord Developer Portal → General Information → Application ID',
        key: 'DISCORD_CLIENT_ID'
    },
    {
        question: '📝 Step 3: Enter Jordan\'s OpenAI API Key (CFO AI):',
        hint: 'Create at platform.openai.com/api-keys',
        key: 'OPENAI_API_KEY_JORDAN',
        secret: true
    },
    {
        question: '📝 Step 4: Enter Donna\'s OpenAI API Key (Admin AI):',
        hint: 'Use a different key for each agent',
        key: 'OPENAI_API_KEY_DONNA',
        secret: true
    },
    {
        question: '📝 Step 5: Enter Jerry\'s OpenAI API Key (Sales AI):',
        hint: 'Three separate keys for distinct personalities',
        key: 'OPENAI_API_KEY_JERRY',
        secret: true
    },
    {
        question: '📝 Step 6: Enter Agent Discussion Channel ID:',
        hint: 'Enable Developer Mode in Discord, right-click channel → Copy ID',
        key: 'AGENT_CHANNEL_ID'
    },
    {
        question: '📝 Step 7: Enter Log Channel ID (optional, press Enter to skip):',
        hint: 'For system logs and audit trail',
        key: 'LOG_CHANNEL_ID',
        optional: true
    },
    {
        question: '📝 Step 8: Which OpenAI model to use? (default: gpt-4)',
        hint: 'Options: gpt-4, gpt-4-turbo-preview, gpt-3.5-turbo',
        key: 'OPENAI_MODEL',
        default: 'gpt-4'
    },
    {
        question: '📝 Step 9: Maximum tokens per response? (default: 600)',
        hint: 'Higher = longer responses, but more expensive',
        key: 'MAX_TOKENS',
        default: '600'
    }
];

const answers = {};

function askQuestion(index) {
    if (index >= questions.length) {
        finishSetup();
        return;
    }

    const q = questions[index];
    
    console.log(`\n${q.question}`);
    console.log(`💡 ${q.hint}`);
    
    if (q.default) {
        console.log(`📋 Default: ${q.default}`);
    }
    
    const prompt = q.optional ? '(Optional) > ' : '> ';
    
    rl.question(prompt, (answer) => {
        if (!answer.trim() && q.default) {
            answers[q.key] = q.default;
        } else if (!answer.trim() && q.optional) {
            answers[q.key] = '';
        } else if (!answer.trim() && !q.optional) {
            console.log('❌ This field is required. Please try again.');
            askQuestion(index);
            return;
        } else {
            answers[q.key] = answer.trim();
        }
        
        askQuestion(index + 1);
    });
}

function finishSetup() {
    console.log('\n' + '='.repeat(60));
    console.log('✅ Configuration Complete!');
    console.log('='.repeat(60));
    
    // Create .env file
    const envContent = Object.entries(answers)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');
    
    fs.writeFileSync('.env', envContent);
    console.log('\n📁 Created .env file with your configuration.');
    
    // Create backup of .env.example if it doesn't exist
    if (!fs.existsSync('.env.example')) {
        fs.copyFileSync('.env', '.env.example');
        console.log('📁 Created .env.example backup.');
    }
    
    // Show next steps
    console.log('\n' + '🚀 NEXT STEPS:'.padEnd(60, '='));
    console.log('\n1. Install dependencies:');
    console.log('   npm install');
    
    console.log('\n2. Deploy Discord commands:');
    console.log('   npm run deploy-commands');
    
    console.log('\n3. Invite bot to your server:');
    const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${answers.DISCORD_CLIENT_ID}&permissions=2147485696&scope=bot%20applications.commands`;
    console.log(`   ${inviteUrl}`);
    
    console.log('\n4. Start the bot:');
    console.log('   npm start');
    
    console.log('\n5. Test the system:');
    console.log('   Use /agents in your Discord server');
    
    console.log('\n' + '📚 ADDITIONAL RESOURCES:'.padEnd(60, '='));
    console.log('\n• Full documentation: README.md');
    console.log('• Detailed setup guide: SETUP_GUIDE.md');
    console.log('• System architecture: discord-agents-system.md');
    
    console.log('\n' + '🆘 NEED HELP?'.padEnd(60, '='));
    console.log('\n• Check the YouTube tutorial: https://youtu.be/_crWwyHuZ2E');
    console.log('• Review error messages in console');
    console.log('• Check Discord Developer Portal for token issues');
    console.log('• Verify OpenAI API keys are active and have credits');
    
    console.log('\n' + '🎉 SETUP COMPLETE!'.padEnd(60, '='));
    console.log('\nYour Evergreen Landscaping AI Agents are ready to deploy!');
    console.log('The agents will help with:');
    console.log('• 🤖 Jordan: Financial analysis & budgeting');
    console.log('• 📅 Donna: Operations & scheduling');
    console.log('• 📞 Jerry: Sales & lead generation');
    
    rl.close();
}

// Start the wizard
console.log('Press Ctrl+C at any time to cancel.\n');
askQuestion(0);

// Handle cleanup
rl.on('close', () => {
    console.log('\n👋 Setup wizard closed. Good luck with your AI agents!');
    process.exit(0);
});