// Deploy slash commands to Discord
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { commands } = require('./commands.js');

async function deployCommands() {
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
    
    try {
        console.log('🔄 Started refreshing application (/) commands...');
        
        // Register commands globally
        await rest.put(
            Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
            { body: commands.map(command => command.toJSON()) }
        );
        
        console.log('✅ Successfully reloaded application (/) commands!');
        console.log(`📋 Total commands deployed: ${commands.length}`);
        
        // List deployed commands
        commands.forEach((cmd, index) => {
            console.log(`  ${index + 1}. /${cmd.name} - ${cmd.description}`);
        });
        
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
        throw error;
    }
}

// Deploy to specific guild (for testing)
async function deployCommandsToGuild(guildId) {
    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
    
    try {
        console.log(`🔄 Deploying commands to guild ${guildId}...`);
        
        await rest.put(
            Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, guildId),
            { body: commands.map(command => command.toJSON()) }
        );
        
        console.log(`✅ Successfully deployed commands to guild ${guildId}!`);
        
    } catch (error) {
        console.error(`❌ Error deploying commands to guild ${guildId}:`, error);
        throw error;
    }
}

module.exports = { deployCommands, deployCommandsToGuild };