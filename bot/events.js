// Discord event handlers
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { client, AGENTS, conversations } = require('./bot.js');
const { getAgentResponse, agentToAgentCommunication } = require('./openai-setup.js');

// Handle slash commands
async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;
    
    const { commandName, options, user } = interaction;
    
    try {
        switch (commandName) {
            case 'talk':
                await handleTalkCommand(interaction, options);
                break;
                
            case 'agents':
                await handleAgentsCommand(interaction);
                break;
                
            case 'ask_all':
                await handleAskAllCommand(interaction, options);
                break;
                
            case 'meeting':
                await handleMeetingCommand(interaction, options);
                break;
                
            case 'clear':
                await handleClearCommand(interaction, options);
                break;
                
            case 'status':
                await handleStatusCommand(interaction);
                break;
                
            case 'help':
                await handleHelpCommand(interaction);
                break;
                
            case 'agent_chat':
                await handleAgentChatCommand(interaction, options);
                break;
                
            case 'daily_report':
                await handleDailyReportCommand(interaction, options);
                break;
                
            case 'suggest_improvement':
                await handleSuggestImprovementCommand(interaction, options);
                break;
                
            default:
                await interaction.reply({ 
                    content: 'Unknown command. Use `/help` to see available commands.', 
                    ephemeral: true 
                });
        }
    } catch (error) {
        console.error(`Error handling command ${commandName}:`, error);
        
        const errorEmbed = new EmbedBuilder()
            .setTitle('❌ Error')
            .setDescription('An error occurred while processing your command.')
            .setColor(0xe74c3c)
            .addFields(
                { name: 'Command', value: `/${commandName}`, inline: true },
                { name: 'Error', value: error.message.substring(0, 100), inline: true }
            )
            .setTimestamp();
        
        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}

// Individual command handlers
async function handleTalkCommand(interaction, options) {
    const agentName = options.getString('agent');
    const userMessage = options.getString('message');
    const agent = AGENTS[agentName.toUpperCase()];
    
    await interaction.deferReply();
    
    // Get or create conversation history
    const conversationKey = `${interaction.user.id}-${agentName}`;
    if (!conversations.has(conversationKey)) {
        conversations.set(conversationKey, []);
    }
    const history = conversations.get(conversationKey);
    
    // Get agent response
    const response = await getAgentResponse(agentName, userMessage, history);
    
    // Update conversation history
    history.push({ role: "user", content: userMessage });
    history.push({ role: "assistant", content: response });
    
    // Create embed response
    const embed = new EmbedBuilder()
        .setTitle(`${agent.icon} ${agent.name}`)
        .setDescription(response)
        .setColor(agent.color)
        .addFields(
            { name: 'Role', value: agent.role, inline: true },
            { name: 'Expertise', value: agent.expertise[0], inline: true },
            { name: 'Conversation ID', value: `\`${conversationKey.substring(0, 8)}...\``, inline: true }
        )
        .setFooter({ text: `Asked by ${interaction.user.username} • Use /clear to reset conversation` })
        .setTimestamp();
    
    // Add quick action buttons
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ask_again_${agentName}`)
                .setLabel('Ask Again')
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🔄'),
            new ButtonBuilder()
                .setCustomId(`clear_${agentName}`)
                .setLabel('Clear History')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🗑️')
        );
    
    await interaction.editReply({ 
        embeds: [embed],
        components: [row]
    });
    
    // Log the interaction
    logInteraction(interaction.user, agentName, userMessage, response);
}

async function handleAgentsCommand(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('🤖 Evergreen Landscaping AI Agents')
        .setDescription('Specialized AI agents ready to assist with different aspects of the business')
        .setColor(0x2ecc71)
        .setThumbnail('https://cdn.discordapp.com/attachments/your-logo-url/evergreen-logo.png')
        .setFooter({ text: 'Use /talk to start a conversation with any agent' });
    
    Object.values(AGENTS).forEach(agent => {
        embed.addFields({
            name: `${agent.icon} ${agent.name} - ${agent.role}`,
            value: `**Personality:** ${agent.personality}\n**Expertise:** ${agent.expertise.join(', ')}\n**Greeting:** "${agent.greeting}"\n**Command:** \`/talk agent:${agent.name.split(' ')[0].toLowerCase()} message:your_message\``,
            inline: false
        });
    });
    
    // Add usage examples
    embed.addFields({
        name: '💡 Usage Examples',
        value: '• `/talk agent:jordan message:"What\'s our current profit margin?"`\n• `/talk agent:donna message:"Schedule a client meeting for next week"`\n• `/talk agent:jerry message:"How many new leads this month?"`',
        inline: false
    });
    
    await interaction.reply({ embeds: [embed] });
}

async function handleAskAllCommand(interaction, options) {
    const question = options.getString('question');
    
    await interaction.deferReply();
    
    const responses = [];
    const agents = ['jordan', 'donna', 'jerry'];
    
    // Get responses from all agents
    for (const agentName of agents) {
        const agent = AGENTS[agentName.toUpperCase()];
        const response = await getAgentResponse(agentName, question);
        
        responses.push({
            agent: agent.name,
            role: agent.role,
            icon: agent.icon,
            color: agent.color,
            response: response
        });
    }
    
    // Create summary embed
    const summaryEmbed = new EmbedBuilder()
        .setTitle('🤔 Multi-Agent Response')
        .setDescription(`**Question:** ${question}`)
        .setColor(0x3498db)
        .setFooter({ text: 'All agents have responded with their expert perspectives' })
        .setTimestamp();
    
    responses.forEach(r => {
        const truncatedResponse = r.response.length > 800 ? r.response.substring(0, 797) + '...' : r.response;
        summaryEmbed.addFields({
            name: `${r.icon} ${r.agent} (${r.role})`,
            value: truncatedResponse,
            inline: false
        });
    });
    
    await interaction.editReply({ embeds: [summaryEmbed] });
}

async function handleMeetingCommand(interaction, options) {
    const topic = options.getString('topic');
    
    await interaction.deferReply();
    
    const channel = await client.channels.fetch(process.env.AGENT_CHANNEL_ID);
    if (!channel) {
        throw new Error('Agent channel not found. Please set AGENT_CHANNEL_ID in .env');
    }
    
    // Announce meeting
    const meetingEmbed = new EmbedBuilder()
        .setTitle('🏢 AI Agent Meeting Started')
        .setDescription(`**Topic:** ${topic}`)
        .setColor(0x2ecc71)
        .addFields(
            { name: 'Host', value: interaction.user.username, inline: true },
            { name: 'Channel', value: `<#${channel.id}>`, inline: true },
            { name: 'Participants', value: 'Jordan (CFO), Donna (Admin), Jerry (Sales)', inline: true }
        )
        .setTimestamp();
    
    await channel.send({ embeds: [meetingEmbed] });
    
    // Get perspectives from each agent
    const agents = ['jordan', 'donna', 'jerry'];
    const perspectives = [];
    
    for (const agentName of agents) {
        const agent = AGENTS[agentName.toUpperCase()];
        const perspective = await getAgentResponse(agentName, 
            `Give your professional perspective on this meeting topic: "${topic}". Focus on your area of expertise and provide actionable insights.`
        );
        
        perspectives.push({
            agent: agent.name,
            role: agent.role,
            perspective: perspective
        });
        
        // Post perspective to agent channel
        const perspectiveEmbed = new EmbedBuilder()
            .setTitle(`${agent.icon} ${agent.name}'s Perspective`)
            .setDescription(perspective)
            .setColor(agent.color)
            .setFooter({ text: `${agent.role} • ${agent.expertise[0]}` })
            .setTimestamp();
        
        await channel.send({ embeds: [perspectiveEmbed] });
        
        // Wait between agents
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    // Create meeting summary
    const summaryEmbed = new EmbedBuilder()
        .setTitle('📊 Meeting Summary')
        .setDescription(`**Topic:** ${topic}`)
        .setColor(0x2ecc71)
        .setFooter({ text: 'Meeting completed in agent channel' })
        .setTimestamp();
    
    perspectives.forEach(p => {
        summaryEmbed.addFields({
            name: `${p.agent} (${p.role})`,
            value: p.perspective.length > 500 ? p.perspective.substring(0, 497) + '...' : p.perspective,
            inline: false
        });
    });
    
    await interaction.editReply({ 
        content: `Meeting started in <#${channel.id}>!`,
        embeds: [summaryEmbed] 
    });
}

async function handleClearCommand(interaction, options) {
    const agentName = options.getString('agent');
    const conversationKey = `${interaction.user.id}-${agentName}`;
    const agent = AGENTS[agentName.toUpperCase()];
    
    if (conversations.has(conversationKey)) {
        conversations.delete(conversationKey);
        
        const embed = new EmbedBuilder()
            .setTitle('🗑️ Conversation Cleared')
            .setDescription(`Your conversation history with **${agent.name}** has been cleared.`)
            .setColor(0x2ecc71)
            .addFields(
                { name: 'Agent', value: agent.name, inline: true },
                { name: 'Role', value: agent.role, inline: true },
                { name: 'Status', value: '✅ Cleared', inline: true }
            )
            .setTimestamp();
        
        await interaction.reply({ embeds: [embed], ephemeral: true });
    } else {
        await interaction.reply({ 
            content: `No conversation history found with ${agent.name}.`,
            ephemeral: true 
        });
    }
}

async function handleStatusCommand(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('📊 Agent Status Dashboard')
        .setDescription('Real-time status of all AI agents')
        .setColor(0x2ecc71)
        .setTimestamp();
    
    Object.values(AGENTS).forEach(agent => {
        const conversationCount = Array.from(conversations.keys())
            .filter(key => key.includes(agent.name.split(' ')[0].toLowerCase()))
            .length;
        
        embed.addFields({
            name: `${agent.icon} ${agent.name}`,
            value: `**Status:** ✅ Online\n**Role:** ${agent.role}\n**Active Conversations:** ${conversationCount}\n**Last Active:** Just now\n**Expertise:** ${agent.expertise.slice(0, 2).join(', ')}`,
            inline: true
        });
    });
    
    embed.addFields({
        name: '📈 System Stats',
        value: `**Total Conversations:** ${conversations.size}\n**Agent Channel:** <#${process.env.AGENT_CHANNEL_ID}>\n**Uptime:** ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
        inline: false
    });
    
    await interaction.reply({ embeds: [embed] });
}

async function handleHelpCommand(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('❓ AI Agents Help Guide')
        .setDescription('How to use the Evergreen Landscaping AI Agents system')
        .setColor(0x3498db)
        .addFields(
            { 
                name: '🤖 Available Agents', 
                value: '• **Jordan** - CFO AI (Financial analysis, budgeting)\n• **Donna** - Admin AI (Scheduling, operations)\n• **Jerry** - Sales AI (Lead generation, sales strategy)', 
                inline: false 
            },
            { 
                name: '💬 Basic Commands', 
                value: '• `/talk` - Talk to a specific agent\n• `/agents` - List all agents\n• `/ask_all` - Ask all agents a question\n• `/status` - Check agent status', 
                inline: false 
            },
            { 
                name: '🏢 Advanced Features', 
                value: '• `/meeting` - Start agent meeting\n• `/agent_chat` - Make agents talk to each other\n• `/daily_report` - Get daily reports\n• `/suggest_improvement` - Get improvement suggestions', 
                inline: false 
            },
            { 
                name: '🔧 Utility Commands', 
                value: '• `/clear` - Clear conversation history\n• `/help` - Show this help message', 
                inline: false 
            }
        )
        .setFooter({ text: 'Need more help? Contact the system administrator.' })
        .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
}

async function handleAgentChatCommand(interaction, options) {
    const agent1 = options.getString('agent1');
    const agent2 = options.getString('agent2');
    const topic = options.getString('topic');
    
    if (agent1 === agent2) {
        await interaction.reply({ 
            content: 'Please select two different agents to chat with each other.', 
            ephemeral: true 
        });
        return;
    }
    
    await interaction.deferReply();
    
    try {
        const result = await agentToAgentCommunication(agent1, agent2, topic);
        
        const embed = new EmbedBuilder()
            .setTitle('💬 Agent Conversation')
            .setDescription(`**Topic:** ${topic}`)
            .setColor(0x9b59b6)
            .addFields(
                { name: 'Participants', value: `${AGENTS[agent1.toUpperCase()].name} ↔ ${AGENTS[agent2.toUpperCase()].name}`, inline: true },
                { name: 'Channel', value: `<#${process.env.AGENT_CHANNEL_ID}>`, inline: true }
            )
            .setFooter({ text: 'Check the agent channel for the full conversation' })
            .setTimestamp();
        
        await interaction.editReply({ embeds: [embed] });
        
    } catch (error) {
        throw new Error(`Failed to start agent chat: ${error.message}`);
    }
}

async function handleDailyReportCommand(interaction, options) {
    const date = options.getString('date') || new Date().toISOString().split('T')[0];
    
    await interaction.deferReply();
    
    const agents = ['jordan', 'donna', 'jerry'];
    const reports = [];
    
    for (const agentName of agents) {
        const agent = AGENTS[agentName.toUpperCase()];
        const report = await getAgentResponse(agentName, 
            `Generate a daily report for ${date}. Include key metrics, accomplishments, challenges, and recommendations for tomorrow. Focus on your area of expertise.`
        );
        
        reports.push({
            agent: agent.name,
            role: agent.role,
            icon: agent.icon,
            report: report
        });
    }
    
    const embed = new EmbedBuilder()
        .setTitle('📅 Daily Agent Reports')
        .setDescription(`**Date:** ${date}`)
        .setColor(0xf1c40f)
        .setTimestamp();
    
    reports.forEach(r => {
        const truncatedReport = r.report.length > 800 ? r.report.substring(0, 797) + '...' : r.report;
        embed.addFields({
            name: `${r.icon} ${r.agent} (${r.role})`,
            value: truncatedReport,
            inline: false
        });
    });
    
    await interaction.editReply({ embeds: [embed] });
}

async function handleSuggestImprovementCommand(interaction, options) {
    const area = options.getString('area');
    
    await interaction.deferReply();
    
    const agentsToAsk = area === 'all' ? ['jordan', 'donna', 'jerry'] : [area];
    const suggestions = [];
    
    for (const agentName of agentsToAsk) {
        const agent = AGENTS[agentName.toUpperCase()];
        const suggestion = await getAgentResponse(agentName, 
            `Provide 3 specific, actionable improvement suggestions for Evergreen Landscaping in your area of expertise. Focus on practical, implementable ideas that could increase efficiency, reduce costs, or boost revenue.`
        );
        
        suggestions.push({
            agent: agent.name,
            role: agent.role,
            icon: agent.icon,
            suggestion: suggestion
        });
    }
    
    const embed = new EmbedBuilder()
        .setTitle('💡 Improvement Suggestions')
// Complete the events.js file
const { EmbedBuilder } = require('discord.js');

async function handleSuggestImprovementCommand(interaction, options) {
    const area = options.getString('area');
    
    await interaction.deferReply();
    
    const agentsToAsk = area === 'all' ? ['jordan', 'donna', 'jerry'] : [area];
    const suggestions = [];
    
    for (const agentName of agentsToAsk) {
        const agent = AGENTS[agentName.toUpperCase()];
        const suggestion = await getAgentResponse(agentName, 
            `Provide 3 specific, actionable improvement suggestions for Evergreen Landscaping in your area of expertise. Focus on practical, implementable ideas that could increase efficiency, reduce costs, or boost revenue.`
        );
        
        suggestions.push({
            agent: agent.name,
            role: agent.role,
            icon: agent.icon,
            suggestion: suggestion
        });
    }
    
    const embed = new EmbedBuilder()
        .setTitle('💡 Improvement Suggestions')
        .setDescription(`**Area:** ${area === 'all' ? 'All Departments' : area.charAt(0).toUpperCase() + area.slice(1)}`)
        .setColor(0x2ecc71)
        .setTimestamp();
    
    suggestions.forEach(s => {
        const truncatedSuggestion = s.suggestion.length > 800 ? s.suggestion.substring(0, 797) + '...' : s.suggestion;
        embed.addFields({
            name: `${s.icon} ${s.agent} (${s.role})`,
            value: truncatedSuggestion,
            inline: false
        });
    });
    
    await interaction.editReply({ embeds: [embed] });
}

// Log interactions
async function logInteraction(user, agentName, userMessage, agentResponse) {
    const logChannel = await client.channels.fetch(process.env.LOG_CHANNEL_ID);
    if (!logChannel) return;
    
    const agent = AGENTS[agentName.toUpperCase()];
    
    const logEmbed = new EmbedBuilder()
        .setTitle('📝 Interaction Log')
        .setColor(0x95a5a6)
        .addFields(
            { name: 'User', value: user.username, inline: true },
            { name: 'Agent', value: agent.name, inline: true },
            { name: 'User Message', value: userMessage.length > 500 ? userMessage.substring(0, 497) + '...' : userMessage, inline: false },
            { name: 'Agent Response', value: agentResponse.length > 500 ? agentResponse.substring(0, 497) + '...' : agentResponse, inline: false }
        )
        .setTimestamp();
    
    await logChannel.send({ embeds: [logEmbed] });
}

// Schedule agent discussions
function scheduleAgentDiscussions() {
    // Schedule daily agent sync at 10 AM
    const cron = require('node-cron');
    
    cron.schedule('0 10 * * *', async () => {
        const channel = await client.channels.fetch(process.env.AGENT_CHANNEL_ID);
        if (!channel) return;
        
        const topics = [
            "Weekly financial performance review",
            "Upcoming client appointments coordination",
            "Sales pipeline analysis and strategy",
            "Operational efficiency improvements",
            "Resource allocation optimization",
            "Client satisfaction and feedback review",
            "Equipment maintenance and upgrade planning",
            "Seasonal business strategy adjustment"
        ];
        
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        const meetingEmbed = new EmbedBuilder()
            .setTitle('⏰ Scheduled Agent Discussion')
            .setDescription(`**Topic:** ${randomTopic}`)
            .setColor(0xf39c12)
            .addFields(
                { name: 'Type', value: 'Scheduled Daily Discussion', inline: true },
                { name: 'Time', value: '10:00 AM Daily', inline: true }
            )
            .setTimestamp();
        
        await channel.send({ embeds: [meetingEmbed] });
        
        // Start the discussion
        await startAgentDiscussion(randomTopic);
    }, {
        timezone: "America/New_York"
    });
    
    console.log('✅ Scheduled agent discussions configured');
}

// Start agent discussion (simplified version)
async function startAgentDiscussion(topic) {
    const channel = await client.channels.fetch(process.env.AGENT_CHANNEL_ID);
    if (!channel) return;
    
    const agents = ['jordan', 'donna', 'jerry'];
    
    for (const agentName of agents) {
        const agent = AGENTS[agentName.toUpperCase()];
        const perspective = await getAgentResponse(agentName, 
            `Give your professional perspective on: "${topic}". Focus on your area of expertise.`
        );
        
        const perspectiveEmbed = new EmbedBuilder()
            .setTitle(`${agent.icon} ${agent.name}'s Perspective`)
            .setDescription(perspective)
            .setColor(agent.color)
            .setFooter({ text: `${agent.role} • ${agent.expertise[0]}` })
            .setTimestamp();
        
        await channel.send({ embeds: [perspectiveEmbed] });
        
        // Wait between agents
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    // Discussion summary
    const summaryEmbed = new EmbedBuilder()
        .setTitle('📋 Discussion Summary')
        .setDescription(`**Topic:** ${topic}`)
        .setColor(0x2ecc71)
        .addFields(
            { name: 'Status', value: '✅ Completed', inline: true },
            { name: 'Participants', value: 'All 3 agents', inline: true },
            { name: 'Next Discussion', value: 'Tomorrow 10:00 AM', inline: true }
        )
        .setTimestamp();
    
    await channel.send({ embeds: [summaryEmbed] });
}

// Set up event listeners
function setupEventListeners() {
    client.on('ready', () => {
        console.log(`✅ Logged in as ${client.user.tag}!`);
        
        // Set bot status
        client.user.setPresence({
            activities: [{ name: 'with AI agents | /help', type: 0 }],
            status: 'online'
        });
        
        // Initialize agent channel
        const agentChannel = client.channels.cache.get(process.env.AGENT_CHANNEL_ID);
        if (agentChannel) {
            const welcomeEmbed = new EmbedBuilder()
                .setTitle('🤖 AI Agents Online')
                .setDescription('Jordan, Donna, and Jerry are ready to assist!')
                .setColor(0x2ecc71)
                .addFields(
                    { name: 'Jordan', value: 'CFO AI - Financial analysis', inline: true },
                    { name: 'Donna', value: 'Admin AI - Operations', inline: true },
                    { name: 'Jerry', value: 'Sales AI - Lead generation', inline: true }
                )
                .setFooter({ text: 'Use /agents to see all commands' })
                .setTimestamp();
            
            agentChannel.send({ embeds: [welcomeEmbed] });
        }
    });
    
    client.on('interactionCreate', handleInteraction);
    
    // Handle button interactions
    client.on('interactionCreate', async interaction => {
        if (!interaction.isButton()) return;
        
        const { customId, user } = interaction;
        
        if (customId.startsWith('ask_again_')) {
            const agentName = customId.replace('ask_again_', '');
            await interaction.reply({ 
                content: `What would you like to ask ${AGENTS[agentName.toUpperCase()].name}? Use \`/talk agent:${agentName} message:your_message\``, 
                ephemeral: true 
            });
        }
        
        if (customId.startsWith('clear_')) {
            const agentName = customId.replace('clear_', '');
            const conversationKey = `${user.id}-${agentName}`;
            
            if (conversations.has(conversationKey)) {
                conversations.delete(conversationKey);
                await interaction.reply({ 
                    content: `✅ Conversation history with ${AGENTS[agentName.toUpperCase()].name} cleared.`, 
                    ephemeral: true 
                });
            }
        }
    });
    
    console.log('✅ Event listeners configured');
}

module.exports = {
    handleInteraction,
    handleTalkCommand,
    handleAgentsCommand,
    handleAskAllCommand,
    handleMeetingCommand,
    handleClearCommand,
    handleStatusCommand,
    handleHelpCommand,
    handleAgentChatCommand,
    handleDailyReportCommand,
    handleSuggestImprovementCommand,
    logInteraction,
    scheduleAgentDiscussions,
    setupEventListeners,
    startAgentDiscussion
};