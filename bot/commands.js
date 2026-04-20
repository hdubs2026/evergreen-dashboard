// Discord slash commands definitions
const { SlashCommandBuilder } = require('@discordjs/builders');

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
                .setRequired(true)
                .setMaxLength(1000)),
    
    new SlashCommandBuilder()
        .setName('agents')
        .setDescription('List all available AI agents and their capabilities'),
    
    new SlashCommandBuilder()
        .setName('ask_all')
        .setDescription('Ask all agents a question and get their perspectives')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Question for all agents')
                .setRequired(true)
                .setMaxLength(500)),
    
    new SlashCommandBuilder()
        .setName('meeting')
        .setDescription('Start a meeting with all agents in the agent channel')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('Meeting topic')
                .setRequired(true)
                .setMaxLength(200)),
    
    new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear your conversation history with an agent')
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
        .setDescription('Check agent status and recent activities'),
    
    new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help with using the AI agents system'),
    
    new SlashCommandBuilder()
        .setName('agent_chat')
        .setDescription('Make two agents talk to each other')
        .addStringOption(option =>
            option.setName('agent1')
                .setDescription('First agent')
                .setRequired(true)
                .addChoices(
                    { name: 'Jordan', value: 'jordan' },
                    { name: 'Donna', value: 'donna' },
                    { name: 'Jerry', value: 'jerry' }
                ))
        .addStringOption(option =>
            option.setName('agent2')
                .setDescription('Second agent')
                .setRequired(true)
                .addChoices(
                    { name: 'Jordan', value: 'jordan' },
                    { name: 'Donna', value: 'donna' },
                    { name: 'Jerry', value: 'jerry' }
                ))
        .addStringOption(option =>
            option.setName('topic')
                .setDescription('What they should discuss')
                .setRequired(true)
                .setMaxLength(300)),
    
    new SlashCommandBuilder()
        .setName('daily_report')
        .setDescription('Get a daily report from all agents')
        .addStringOption(option =>
            option.setName('date')
                .setDescription('Date for report (YYYY-MM-DD)')
                .setRequired(false)),
    
    new SlashCommandBuilder()
        .setName('suggest_improvement')
        .setDescription('Get improvement suggestions from agents')
        .addStringOption(option =>
            option.setName('area')
                .setDescription('Area to improve')
                .setRequired(true)
                .addChoices(
                    { name: 'Financial', value: 'financial' },
                    { name: 'Operations', value: 'operations' },
                    { name: 'Sales', value: 'sales' },
                    { name: 'All Areas', value: 'all' }
                ))
];

module.exports = { commands };