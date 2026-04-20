# Discord AI Agents System for Evergreen Landscaping

## Overview
A Discord bot system where three specialized AI agents (Jordan, Donna, Jerry) can be interacted with individually, communicate with each other, and have distinct personalities and expertise.

## System Architecture

### 1. Discord Bot Setup
```javascript
// discord-bot.js
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { Configuration, OpenAIApi } = require('openai');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel]
});

// Agent Personalities
const AGENTS = {
    JORDAN: {
        name: "Jordan Belfort",
        role: "CFO AI",
        color: 0x3498db,
        icon: "💰",
        personality: "Analytical, data-driven, financially savvy. Speaks with confidence about numbers and strategy. Uses financial terminology naturally.",
        expertise: ["Financial analysis", "Budget optimization", "ROI calculations", "Cash flow management", "Cost reduction strategies"],
        greeting: "Let's talk numbers. What's the financial situation?",
        prompt: "You are Jordan Belfort, CFO AI for Evergreen Landscaping. You're analytical, financially savvy, and always thinking about ROI. You speak confidently about numbers, use financial terminology naturally, and focus on profitability and efficiency. You're direct but professional."
    },
    DONNA: {
        name: "Donna Paulsen",
        role: "Admin AI",
        color: 0x9b59b6,
        icon: "📅",
        personality: "Organized, efficient, detail-oriented. Speaks clearly about schedules and operations. Always thinking about optimization.",
        expertise: ["Scheduling", "Operations management", "Client coordination", "Team organization", "Process optimization"],
        greeting: "Ready to organize. What needs scheduling?",
        prompt: "You are Donna Paulsen, Admin AI for Evergreen Landscaping. You're highly organized, efficient, and detail-oriented. You speak clearly about schedules, operations, and coordination. You're always thinking about optimization and making processes run smoothly. You're helpful and proactive."
    },
    JERRY: {
        name: "Jerry McGuire",
        role: "Sales AI",
        color: 0xe74c3c,
        icon: "📞",
        personality: "Energetic, persuasive, relationship-focused. Speaks enthusiastically about leads and deals. Always looking for opportunities.",
        expertise: ["Lead generation", "Client acquisition", "Sales strategy", "Relationship building", "Market analysis"],
        greeting: "Show me the leads! What's our sales situation?",
        prompt: "You are Jerry McGuire, Sales AI for Evergreen Landscaping. You're energetic, persuasive, and relationship-focused. You speak enthusiastically about leads, deals, and opportunities. You're always looking for ways to grow the business and build client relationships. You're optimistic and driven."
    }
};

// Agent Communication Channel
const AGENT_CHANNEL_ID = "YOUR_AGENT_CHANNEL_ID";
const LOG_CHANNEL_ID = "YOUR_LOG_CHANNEL_ID";

// Initialize OpenAI for each agent
const configs = {
    jordan: new Configuration({ apiKey: process.env.OPENAI_API_KEY_JORDAN }),
    donna: new Configuration({ apiKey: process.env.OPENAI_API_KEY_DONNA }),
    jerry: new Configuration({ apiKey: process.env.OPENAI_API_KEY_JERRY })
};

const openaiAgents = {
    jordan: new OpenAIApi(configs.jordan),
    donna: new OpenAIApi(configs.donna),
    jerry: new OpenAIApi(configs.jerry)
};

// Conversation memory
const conversations = new Map();
const agentConversations = new Map();
```

### 2. Discord Commands Setup
```javascript
// commands.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    new SlashCommandBuilder()
        .setName('talk')
        .setDescription('Talk to a specific AI agent')
        .addStringOption(option =>
            option.setName('agent')
                .setDescription('Which agent to talk to')
                .setRequired(true)
                .addChoices(
                    { name: 'Jordan (CFO)', value: 'jordan' },
                    { name: 'Donna (Admin)', value: 'donna' },
                    { name: 'Jerry (Sales)', value: 'jerry' }
                ))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('What to say to the agent')
                .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName('agents')
        .setDescription('List all available AI agents'),
    
    new SlashCommandBuilder()
        .setName('ask_all')
        .setDescription('Ask all agents a question and get their perspectives')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Question for all agents')
                .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName('meeting')
        .setDescription('Start a meeting with all agents in the agent channel')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('Meeting topic')
                .setRequired(true)),
    
    new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear conversation history with an agent')
        .addStringOption(option =>
            option.setName('agent')
                .setDescription('Which agent to clear history with')
                .setRequired(true)
                .addChoices(
                    { name: 'Jordan', value: 'jordan' },
                    { name: 'Donna', value: 'donna' },
                    { name: 'Jerry', value: 'jerry' }
                )),
    
    new SlashCommandBuilder()
        .setName('status')
        .setDescription('Check agent status and recent activities')
];

module.exports = { commands };
```

### 3. Agent Response System
```javascript
// agent-responses.js
async function getAgentResponse(agentName, userMessage, conversationHistory = []) {
    const agent = AGENTS[agentName.toUpperCase()];
    
    // Build conversation context
    const messages = [
        { role: "system", content: agent.prompt },
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        { role: "user", content: userMessage }
    ];
    
    try {
        const response = await openaiAgents[agentName].createChatCompletion({
            model: "gpt-4",
            messages: messages,
            temperature: 0.7,
            max_tokens: 500
        });
        
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error(`Error getting response from ${agentName}:`, error);
        return `I'm having trouble processing that. ${agent.name} is currently unavailable.`;
    }
}

// Agent-to-agent communication
async function agentToAgentCommunication(sender, receiver, message) {
    const senderAgent = AGENTS[sender.toUpperCase()];
    const receiverAgent = AGENTS[receiver.toUpperCase()];
    
    const channel = await client.channels.fetch(AGENT_CHANNEL_ID);
    
    // Format message as if from sender to receiver
    const formattedMessage = `**${senderAgent.name} to ${receiverAgent.name}:** ${message}`;
    
    // Send to agent channel
    await channel.send(formattedMessage);
    
    // Get response from receiver
    const response = await getAgentResponse(receiver, message, []);
    
    // Format response
    const responseMessage = `**${receiverAgent.name} to ${senderAgent.name}:** ${response}`;
    
    // Send response to agent channel
    await channel.send(responseMessage);
    
    return { senderMessage: formattedMessage, receiverResponse: responseMessage };
}

// Multi-agent discussion
async function startAgentDiscussion(topic) {
    const channel = await client.channels.fetch(AGENT_CHANNEL_ID);
    
    // Announce discussion
    const embed = new EmbedBuilder()
        .setTitle('🤖 AI Agent Discussion Started')
        .setDescription(`**Topic:** ${topic}`)
        .setColor(0x2ecc71)
        .addFields(
            { name: 'Participants', value: 'Jordan (CFO), Donna (Admin), Jerry (Sales)', inline: true },
            { name: 'Purpose', value: 'Collaborative problem-solving', inline: true }
        )
        .setTimestamp();
    
    await channel.send({ embeds: [embed] });
    
    // Each agent gives initial perspective
    const perspectives = [];
    
    for (const [agentName, agent] of Object.entries(AGENTS)) {
        const perspective = await getAgentResponse(agentName, 
            `Give your professional perspective on: "${topic}". Focus on your area of expertise.`
        );
        
        perspectives.push({
            agent: agent.name,
            role: agent.role,
            perspective: perspective
        });
        
        // Post each perspective
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
    
    // Facilitate discussion
    await channel.send("**🤝 Discussion Phase:** Agents will now discuss and collaborate...");
    
    // Simulate discussion (can be expanded)
    const discussionPrompt = `Based on all perspectives shared about "${topic}", collaborate to find the best approach for Evergreen Landscaping.`;
    
    // Get collaborative response from each agent
    for (const [agentName, agent] of Object.entries(AGENTS)) {
        const collaboration = await getAgentResponse(agentName, 
            `${discussionPrompt} Consider the other agents' perspectives and suggest how your expertise can contribute.`
        );
        
        const collabEmbed = new EmbedBuilder()
            .setTitle(`${agent.icon} ${agent.name}'s Collaboration`)
            .setDescription(collaboration)
            .setColor(agent.color)
            .setFooter({ text: `Contributing: ${agent.expertise.join(', ')}` })
            .setTimestamp();
        
        await channel.send({ embeds: [collabEmbed] });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    return perspectives;
}
```

### 4. Discord Event Handlers
```javascript
// events.js
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Set bot status
    client.user.setActivity('with AI agents | /help', { type: 'PLAYING' });
    
    // Initialize agent channel
    const agentChannel = client.channels.cache.get(AGENT_CHANNEL_ID);
    if (agentChannel) {
        agentChannel.send('**🤖 AI Agents Online**\nJordan, Donna, and Jerry are ready to assist!');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    
    const { commandName, options } = interaction;
    
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
        }
    } catch (error) {
        console.error('Error handling command:', error);
        await interaction.reply({ 
            content: 'There was an error processing your command.', 
            ephemeral: true 
        });
    }
});

// Handle individual agent conversations
async function handleTalkCommand(interaction, options) {
    const agentName = options.getString('agent');
    const userMessage = options.getString('message');
    const agent = AGENTS[agentName.toUpperCase()];
    
    // Defer reply since API call may take time
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
            { name: 'Expertise', value: agent.expertise[0], inline: true }
        )
        .setFooter({ text: `Asked by ${interaction.user.username}` })
        .setTimestamp();
    
    await interaction.editReply({ embeds: [embed] });
    
    // Log the interaction
    logInteraction(interaction.user, agentName, userMessage, response);
}

// List all agents
async function handleAgentsCommand(interaction) {
    const embed = new EmbedBuilder()
        .setTitle('🤖 Evergreen Landscaping AI Agents')
        .setDescription('Specialized AI agents ready to assist with different aspects of the business')
        .setColor(0x2ecc71);
    
    Object.values(AGENTS).forEach(agent => {
        embed.addFields({
            name: `${agent.icon} ${agent.name} - ${agent.role}`,
            value: `**Personality:** ${agent.personality}\n**Expertise:** ${agent.expertise.join(', ')}\n**Greeting:** "${agent.greeting}"\n**Command:** \`/talk agent:${agent.name.split(' ')[0].toLowerCase()} message:your_message\``,
            inline: false
        });
    });
    
    embed.setFooter({ text: 'Use /talk to start a conversation with any agent' });
    
    await interaction.reply({ embeds: [embed] });
}

// Ask all agents a question
async function handleAskAllCommand(interaction, options) {
    const question = options.getString('question');
    
    await interaction.deferReply();
    
    const responses = [];
    
    for (const [agentName, agent] of Object.entries(AGENTS)) {
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
        .setFooter({ text: 'All agents have responded' })
        .setTimestamp();
    
    responses.forEach(r => {
        summaryEmbed.addFields({
            name: `${r.icon} ${r.agent} (${r.role})`,
            value: r.response.length > 1024 ? r.response.substring(0, 1020) + '...' : r.response,
            inline: false
        });
    });
    
    await interaction.editReply({ embeds: [summaryEmbed] });
}

// Start agent meeting
async function handleMeetingCommand(interaction, options) {
    const topic = options.getString('topic');
    
    await interaction.deferReply();
    
    const perspectives = await startAgentDiscussion(topic);
    
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
        content: `Meeting started in <#${AGENT_CHANNEL_ID}>!`,
        embeds: [summaryEmbed] 
    });
}

// Clear conversation history
async function handleClearCommand(interaction, options) {
    const agentName = options.getString('agent');
    const conversationKey = `${interaction.user.id}-${agentName}`;
    
    if (conversations.has(conversationKey)) {
        conversations.delete(conversationKey);
        await interaction.reply({ 
            content: `✅ Conversation history with ${AGENTS[agentName.toUpperCase()].name} has been cleared.`,
            ephemeral: true 
        });
    } else {
        await interaction.reply({ 
            content: `No conversation history found with ${AGENTS[agentName.toUpperCase()].name}.`,
            ephemeral: true 
        });
    }
}

// Check agent status
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
        value: `**Total Conversations:** ${conversations.size}\n**Agent Channel:** <#${AGENT_CHANNEL_ID}>\n**Uptime:** ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n**Memory Usage:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`,
        inline: false
    });
    
    await interaction.reply({ embeds: [embed] });
}

// Log interactions
async function logInteraction(user, agentName, userMessage, agentResponse) {
    const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);
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

// Auto-agent discussions (scheduled)
async function scheduleAgentDiscussions() {
    // Schedule daily agent sync
    setInterval(async () => {
        const channel = await client.channels.fetch(AGENT_CHANNEL_ID);
        if (!channel) return;
        
        const topics = [
            "Weekly financial performance review",
            "Upcoming client appointments coordination",
            "Sales pipeline analysis and strategy",
            "Operational efficiency improvements",
            "Resource allocation optimization"
        ];
        
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        
        await startAgentDiscussion(randomTopic);
    }, 6 * 60 * 60 * 1000); // Every 6 hours
}

module.exports = {
    client,
    AGENTS,
    getAgentResponse,
    agentToAgentCommunication,
    startAgentDiscussion,
    handleTalkCommand,
    handleAgentsCommand,
    handleAskAllCommand,
    handleMeetingCommand,
    handleClearCommand,
    handleStatusCommand,
    logInteraction,
    scheduleAgentDiscussions
};
