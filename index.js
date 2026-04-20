// Evergreen Landscaping Discord AI Agents System
// Main Application File

require('dotenv').config();
const { client } = require('./bot/bot.js');
const { scheduleAgentDiscussions } = require('./bot/events.js');
const { deployCommands } = require('./bot/deploy-commands.js');

// Environment variables validation
const requiredEnvVars = [
    'DISCORD_TOKEN',
    'DISCORD_CLIENT_ID',
    'OPENAI_API_KEY_JORDAN',
    'OPENAI_API_KEY_DONNA', 
    'OPENAI_API_KEY_JERRY',
    'AGENT_CHANNEL_ID',
    'LOG_CHANNEL_ID'
];

const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnvVars.forEach(varName => {
        console.error(`   - ${varName}`);
    });
    console.error('\nPlease create a .env file with these variables.');
    process.exit(1);
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down AI agents system...');
    
    try {
        // Notify in agent channel
        const agentChannel = await client.channels.fetch(process.env.AGENT_CHANNEL_ID);
        if (agentChannel) {
            await agentChannel.send('**🔴 AI Agents Going Offline**\nSystem maintenance in progress. Back soon!');
        }
        
        // Destroy client
        client.destroy();
        console.log('✅ Discord client destroyed');
        
        process.exit(0);
    } catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
});

// Error handling
process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});

// Initialize and start the bot
async function startBot() {
    try {
        console.log('🚀 Starting Evergreen Landscaping AI Agents System...');
        
        // Deploy slash commands
        console.log('📋 Deploying slash commands...');
        await deployCommands();
        
        // Login to Discord
        console.log('🔐 Logging in to Discord...');
        await client.login(process.env.DISCORD_TOKEN);
        
        // Schedule agent discussions
        console.log('⏰ Scheduling agent discussions...');
        scheduleAgentDiscussions();
        
        console.log('✅ AI Agents System is now running!');
        console.log('🤖 Agents: Jordan (CFO), Donna (Admin), Jerry (Sales)');
        console.log('💬 Use /agents to see available commands');
        
    } catch (error) {
        console.error('Failed to start bot:', error);
        process.exit(1);
    }
}

// Start the application
startBot();

// Export for testing
module.exports = { client, startBot };