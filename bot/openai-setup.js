// OpenAI setup for each agent
const { Configuration, OpenAIApi } = require('openai');

// Individual API configurations for each agent
const jordanConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_JORDAN,
    organization: process.env.OPENAI_ORG_ID_JORDAN
});

const donnaConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_DONNA,
    organization: process.env.OPENAI_ORG_ID_DONNA
});

const jerryConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY_JERRY,
    organization: process.env.OPENAI_ORG_ID_JERRY
});

// Create individual OpenAI instances for each agent
const openaiAgents = {
    jordan: new OpenAIApi(jordanConfig),
    donna: new OpenAIApi(donnaConfig),
    jerry: new OpenAIApi(jerryConfig)
};

// Agent response function
async function getAgentResponse(agentName, userMessage, conversationHistory = []) {
    const agent = require('./bot.js').AGENTS[agentName.toUpperCase()];
    
    if (!agent) {
        throw new Error(`Agent ${agentName} not found`);
    }
    
    if (!openaiAgents[agentName]) {
        throw new Error(`OpenAI client for ${agentName} not configured`);
    }
    
    // Build conversation context
    const messages = [
        { 
            role: "system", 
            content: `${agent.prompt}\n\nCurrent date: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}\n\nRemember to stay in character as ${agent.name}, the ${agent.role}.` 
        },
        ...conversationHistory.slice(-8), // Keep last 8 messages for context
        { role: "user", content: userMessage }
    ];
    
    try {
        console.log(`🤖 ${agent.name} processing request...`);
        
        const response = await openaiAgents[agentName].createChatCompletion({
            model: process.env.OPENAI_MODEL || "gpt-4",
            messages: messages,
            temperature: agentName === 'jerry' ? 0.8 : 0.7, // Jerry is more creative/energetic
            max_tokens: parseInt(process.env.MAX_TOKENS) || 600,
            presence_penalty: 0.1,
            frequency_penalty: 0.1
        });
        
        const agentResponse = response.data.choices[0].message.content;
        console.log(`✅ ${agent.name} response generated`);
        
        return agentResponse;
        
    } catch (error) {
        console.error(`❌ Error getting response from ${agentName}:`, error.message);
        
        // Fallback responses based on agent personality
        const fallbackResponses = {
            jordan: "I'm currently reviewing some complex financial data. Could you rephrase your question about the numbers?",
            donna: "I'm organizing schedules at the moment. Could you clarify what you need help with regarding operations?",
            jerry: "I'm following up on some hot leads! Could you repeat your sales-related question?"
        };
        
        return fallbackResponses[agentName] || `I'm having trouble processing that. ${agent.name} is currently unavailable.`;
    }
}

// Agent-to-agent communication
async function agentToAgentCommunication(sender, receiver, message) {
    const { AGENTS } = require('./bot.js');
    const { client } = require('./bot.js');
    
    const senderAgent = AGENTS[sender.toUpperCase()];
    const receiverAgent = AGENTS[receiver.toUpperCase()];
    
    if (!senderAgent || !receiverAgent) {
        throw new Error('Invalid agent specified');
    }
    
    const channel = await client.channels.fetch(process.env.AGENT_CHANNEL_ID);
    if (!channel) {
        throw new Error('Agent channel not found');
    }
    
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
    
    // Log the interaction
    logAgentInteraction(sender, receiver, message, response);
    
    return { senderMessage: formattedMessage, receiverResponse: responseMessage };
}

// Log agent interactions
function logAgentInteraction(sender, receiver, message, response) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        sender,
        receiver,
        message,
        response
    };
    
    // In production, save to database
    console.log(`📝 Agent Interaction: ${sender} → ${receiver}`);
    console.log(`   Message: ${message.substring(0, 100)}...`);
    console.log(`   Response: ${response.substring(0, 100)}...`);
}

module.exports = {
    openaiAgents,
    getAgentResponse,
    agentToAgentCommunication
};