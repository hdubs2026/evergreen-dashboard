# Evergreen Landscaping Discord AI Agents - Setup Guide

## Overview
This system creates a Discord bot with three specialized AI agents (Jordan, Donna, Jerry) that can:
1. Be talked to individually via Discord commands
2. Communicate with each other in a dedicated channel
3. Have distinct personalities and specialized knowledge
4. Collaborate on business problems

## Prerequisites

### 1. Software Requirements
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git (for version control)

### 2. Accounts Required
- Discord account with server creation permissions
- OpenAI account with API access (3 separate API keys recommended)
- GitHub account (for deployment)

## Step-by-Step Setup

### Step 1: Clone the Repository
```bash
git clone https://github.com/your-username/evergreen-discord-agents.git
cd evergreen-discord-agents
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Set Up Discord Bot

#### 3.1 Create Discord Application
1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Name it "Evergreen Landscaping AI Agents"
4. Click "Create"

#### 3.2 Create Bot User
1. Go to "Bot" section in left sidebar
2. Click "Add Bot"
3. Click "Yes, do it!"

#### 3.3 Configure Bot Settings
Under "Bot" section:
- **Username**: Evergreen AI Agents
- **Profile Picture**: Upload landscaping-related image
- **Public Bot**: ✅ Enable
- **Require OAuth2 Code Grant**: ❌ Disable

#### 3.4 Enable Privileged Gateway Intents
Under "Bot" → "Privileged Gateway Intents":
- ✅ PRESENCE INTENT
- ✅ SERVER MEMBERS INTENT
- ✅ MESSAGE CONTENT INTENT

#### 3.5 Get Bot Token
1. Under "Bot" section, click "Reset Token"
2. Copy the token (save it for .env file)
3. **IMPORTANT**: Never share this token!

#### 3.6 Get Client ID
1. Go to "General Information"
2. Copy "Application ID" (this is your CLIENT_ID)

### Step 4: Set Up Discord Server

#### 4.1 Create Channels
Create these channels in your Discord server:
1. **#agent-discussions** - For agents to talk to each other
2. **#agent-logs** - For system logs (optional)
3. **#general** - For users to interact with agents

#### 4.2 Get Channel IDs
1. Enable Developer Mode in Discord:
   - Settings → Advanced → Developer Mode
2. Right-click each channel → "Copy ID"
3. Save these IDs for .env file

### Step 5: Set Up OpenAI API Keys

#### 5.1 Create API Keys
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create 3 separate API keys:
   - **Jordan Agent** (for CFO AI)
   - **Donna Agent** (for Admin AI)
   - **Jerry Agent** (for Sales AI)
3. Copy each key (save them for .env file)

#### 5.2 Set Up Billing
1. Go to [OpenAI Billing](https://platform.openai.com/account/billing)
2. Add payment method
3. Set usage limits if desired

### Step 6: Configure Environment Variables

#### 6.1 Create .env File
```bash
cp .env.example .env
```

#### 6.2 Edit .env File
Open `.env` and fill in:
```env
# Discord
DISCORD_TOKEN=your_bot_token_here
DISCORD_CLIENT_ID=your_client_id_here
AGENT_CHANNEL_ID=your_agent_channel_id
LOG_CHANNEL_ID=your_log_channel_id

# OpenAI (use 3 different keys)
OPENAI_API_KEY_JORDAN=sk-...jordan
OPENAI_API_KEY_DONNA=sk-...donna
OPENAI_API_KEY_JERRY=sk-...jerry

# Optional settings
OPENAI_MODEL=gpt-4
MAX_TOKENS=600
```

### Step 7: Deploy Commands to Discord

#### 7.1 Register Slash Commands
```bash
npm run deploy-commands
# or
node deploy-commands.js
```

#### 7.2 Invite Bot to Server
1. Generate OAuth2 URL:
   ```
   https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147485696&scope=bot%20applications.commands
   ```
2. Replace `YOUR_CLIENT_ID` with your actual client ID
3. Open the URL in browser
4. Select your server
5. Authorize the bot

**Required Permissions:**
- Read Messages
- Send Messages
- Read Message History
- Use Slash Commands
- Embed Links
- Attach Files

### Step 8: Start the Bot

#### 8.1 Development Mode
```bash
npm run dev
# or
nodemon index.js
```

#### 8.2 Production Mode
```bash
npm start
# or
node index.js
```

### Step 9: Test the System

#### 9.1 Verify Bot is Online
- Check Discord server member list
- Bot should show as "Online"
- Status: "with AI agents | /help"

#### 9.2 Test Basic Commands
1. `/agents` - List all agents
2. `/talk agent:jordan message:"Hello"` - Talk to Jordan
3. `/status` - Check system status

#### 9.3 Test Advanced Features
1. `/meeting topic:"Weekly Review"` - Start agent meeting
2. `/agent_chat agent1:jordan agent2:donna topic:"Budget Planning"` - Make agents chat
3. `/ask_all question:"How can we improve efficiency?"` - Get all perspectives

## Agent Personalities

### 🤖 Jordan Belfort (CFO AI)
- **Role**: Financial analysis and strategy
- **Personality**: Analytical, data-driven, financially savvy
- **Expertise**: Budgeting, ROI calculations, cash flow management
- **Greeting**: "Let's talk numbers. What's the financial situation?"

### 📅 Donna Paulsen (Admin AI)
- **Role**: Operations and scheduling
- **Personality**: Organized, efficient, detail-oriented
- **Expertise**: Scheduling, client coordination, process optimization
- **Greeting**: "Ready to organize. What needs scheduling?"

### 📞 Jerry McGuire (Sales AI)
- **Role**: Lead generation and sales
- **Personality**: Energetic, persuasive, relationship-focused
- **Expertise**: Lead generation, client acquisition, sales strategy
- **Greeting**: "Show me the leads! What's our sales situation?"

## Available Commands

### Basic Interaction
- `/talk` - Talk to a specific agent
- `/agents` - List all agents
- `/ask_all` - Ask all agents a question
- `/status` - Check agent status

### Collaboration Features
- `/meeting` - Start agent meeting
- `/agent_chat` - Make agents talk to each other
- `/daily_report` - Get daily reports
- `/suggest_improvement` - Get improvement suggestions

### Utility
- `/clear` - Clear conversation history
- `/help` - Show help guide

## Deployment Options

### Option A: Local Machine (Development)
```bash
# Run locally
npm start

# Keep running with PM2
npm install -g pm2
pm2 start index.js --name "evergreen-agents"
pm2 save
pm2 startup
```

### Option B: Cloud Hosting (Production)

#### Heroku
```bash
# Create Heroku app
heroku create evergreen-discord-agents

# Set environment variables
heroku config:set DISCORD_TOKEN=your_token
heroku config:set OPENAI_API_KEY_JORDAN=your_key
# ... set all other env vars

# Deploy
git push heroku main
```

#### Railway
```bash
# Connect GitHub repo
# Set environment variables in Railway dashboard
# Deploy automatically on push
```

#### Replit
```bash
# Import GitHub repo
# Set environment variables in Secrets
# Run in background
```

### Option C: VPS (Advanced)
```bash
# SSH into VPS
ssh user@your-server

# Clone repo
git clone https://github.com/your-username/evergreen-discord-agents.git
cd evergreen-discord-agents

# Install dependencies
npm install --production

# Set up systemd service
sudo nano /etc/systemd/system/evergreen-agents.service

# Start service
sudo systemctl start evergreen-agents
sudo systemctl enable evergreen-agents
```

## Troubleshooting

### Common Issues

#### 1. Bot Not Responding
```bash
# Check if bot is running
ps aux | grep node

# Check logs
tail -f logs/bot.log

# Verify token
echo $DISCORD_TOKEN
```

#### 2. Slash Commands Not Showing
```bash
# Redeploy commands
npm run deploy-commands

# Check permissions
# Bot needs "applications.commands" scope
```

#### 3. OpenAI API Errors
```bash
# Check API keys
echo $OPENAI_API_KEY_JORDAN

# Check billing
# Visit https://platform.openai.com/account/billing

# Check rate limits
# Reduce MAX_TOKENS in .env
```

#### 4. Memory Issues
```bash
# Clear conversation history
# Use /clear command

# Restart bot
pm2 restart evergreen-agents
```

### Logs Location
- Console output (development)
- `logs/bot.log` (if configured)
- Discord log channel (if LOG_CHANNEL_ID set)

### Monitoring
```bash
# Check bot status
pm2 status

# View logs
pm2 logs evergreen-agents

# Monitor resources
htop
```

## Security Considerations

### 1. API Keys
- Never commit `.env` to version control
- Use different keys for each agent
- Rotate keys periodically
- Set usage limits in OpenAI dashboard

### 2. Discord Permissions
- Use minimal required permissions
- Don't grant "Administrator" permission
- Restrict to specific channels if needed

### 3. Data Privacy
- Conversation history stored in memory (clears on restart)
- Consider database for persistence (optional)
- Log interactions for audit trail

### 4. Rate Limiting
- OpenAI has rate limits
- Discord has rate limits
- Implement queuing if needed

## Maintenance

### Daily Tasks
1. Check `/status` command
2. Review agent discussions
3. Monitor OpenAI usage

### Weekly Tasks
1. Backup conversation logs
2. Review system performance
3. Update agent knowledge if needed

### Monthly Tasks
1. Rotate API keys
2. Update dependencies
3. Review security settings

## Support

### Documentation
- [Discord.js Guide](https://discordjs.guide/)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

### Community
- Discord Developer Server
- OpenAI Community Forum
- GitHub Issues

### Contact
For issues with this system:
1. Check troubleshooting guide
2. Review logs
3. Open GitHub issue
4. Contact system administrator

## License
This system is provided under MIT License for Evergreen Landscaping internal use.

---
**Last Updated**: April 15, 2026  
**Version**: 1.0  
**Status**: Ready for Deployment