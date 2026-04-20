# Evergreen Landscaping Discord AI Agents System

## 🌟 Overview
A sophisticated Discord bot system featuring three specialized AI agents (Jordan, Donna, Jerry) that can interact with users individually, communicate with each other, and collaborate on business problems for Evergreen Landscaping & Design.

## 🎯 Features

### 🤖 Three Specialized AI Agents
- **Jordan Belfort** (CFO AI): Financial analysis, budgeting, ROI calculations
- **Donna Paulsen** (Admin AI): Operations, scheduling, process optimization  
- **Jerry McGuire** (Sales AI): Lead generation, sales strategy, client acquisition

### 💬 Interactive Capabilities
- **Individual Conversations**: Talk to each agent via Discord commands
- **Agent-to-Agent Communication**: Agents can discuss topics with each other
- **Collaborative Meetings**: All three agents can participate in structured discussions
- **Multi-Agent Responses**: Get perspectives from all agents simultaneously

### 🎨 Distinct Personalities
Each agent has a unique personality, speech style, and area of expertise:
- **Jordan**: Analytical, data-driven, financially savvy
- **Donna**: Organized, efficient, detail-oriented  
- **Jerry**: Energetic, persuasive, relationship-focused

### 🛠️ Technical Features
- Discord slash commands for easy interaction
- Real-time agent discussions in dedicated channels
- Conversation memory for context-aware responses
- Scheduled daily agent meetings
- Comprehensive logging and monitoring
- Mobile-responsive design

## 📁 Project Structure
```
evergreen-discord-agents/
├── index.js                 # Main application entry point
├── package.json            # Dependencies and scripts
├── .env.example           # Environment variables template
├── README.md              # This file
├── SETUP_GUIDE.md         # Detailed setup instructions
├── discord-agents-system.md # System architecture documentation
│
├── bot/                   # Bot core functionality
│   ├── bot.js            # Discord client and agent configurations
│   ├── commands.js       # Slash command definitions
│   ├── events.js         # Event handlers and command logic
│   ├── openai-setup.js   # OpenAI configuration for each agent
│   └── deploy-commands.js # Command deployment utilities
│
└── logs/                  # Log files (created at runtime)
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- Discord account with server permissions
- OpenAI account with API access

### 2. Installation
```bash
# Clone repository
git clone https://github.com/your-username/evergreen-discord-agents.git
cd evergreen-discord-agents

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Deploy Discord commands
npm run deploy-commands

# Start the bot
npm start
```

### 3. Basic Usage
1. Invite bot to your Discord server
2. Use `/agents` to see available agents
3. Use `/talk` to start a conversation
4. Use `/meeting` to start agent discussions

## 📋 Available Commands

### Basic Interaction
| Command | Description | Example |
|---------|-------------|---------|
| `/talk` | Talk to a specific agent | `/talk agent:jordan message:"What's our profit margin?"` |
| `/agents` | List all agents and capabilities | `/agents` |
| `/ask_all` | Ask all agents a question | `/ask_all question:"How can we improve efficiency?"` |
| `/status` | Check system status | `/status` |

### Collaboration Features
| Command | Description | Example |
|---------|-------------|---------|
| `/meeting` | Start agent meeting | `/meeting topic:"Weekly Review"` |
| `/agent_chat` | Make agents talk | `/agent_chat agent1:jordan agent2:donna topic:"Budget"` |
| `/daily_report` | Get daily reports | `/daily_report date:2026-04-15` |
| `/suggest_improvement` | Get improvement ideas | `/suggest_improvement area:financial` |

### Utility Commands
| Command | Description |
|---------|-------------|
| `/clear` | Clear conversation history |
| `/help` | Show help guide |

## 🔧 Configuration

### Environment Variables (.env)
```env
# Discord Configuration
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_client_id
AGENT_CHANNEL_ID=channel_for_agent_discussions
LOG_CHANNEL_ID=channel_for_logs

# OpenAI Configuration (3 separate keys)
OPENAI_API_KEY_JORDAN=sk-...jordan
OPENAI_API_KEY_DONNA=sk-...donna
OPENAI_API_KEY_JERRY=sk-...jerry

# Optional Settings
OPENAI_MODEL=gpt-4
MAX_TOKENS=600
```

### Agent Personalities (Customizable in `bot/bot.js`)
Each agent has configurable:
- Personality traits
- Expertise areas
- Greeting messages
- System prompts
- Color schemes
- Icons

## 🏗️ Architecture

### System Components
1. **Discord Bot Client**: Handles Discord API communication
2. **OpenAI Integration**: Separate instances for each agent
3. **Command Handler**: Processes slash commands
4. **Event System**: Manages bot events and interactions
5. **Memory System**: Maintains conversation context
6. **Scheduler**: Automates daily agent discussions

### Data Flow
```
User Command → Discord API → Command Handler → 
→ OpenAI API (Specific Agent) → Response Formatter → 
→ Discord Embed → User Response
```

## 📊 Monitoring & Logging

### Log Channels
- **Console Output**: Development debugging
- **Discord Log Channel**: User-agent interactions
- **File Logs**: System events and errors

### Status Monitoring
- Use `/status` command for real-time stats
- Monitor OpenAI usage in dashboard
- Track conversation counts and system uptime

## 🔒 Security

### Best Practices
- Use separate OpenAI keys for each agent
- Implement rate limiting
- Regular key rotation
- Minimal Discord permissions
- Secure environment variable storage

### Data Privacy
- Conversation history stored in memory (volatile)
- Optional database persistence
- Audit logging for compliance

## 🚢 Deployment Options

### Local Development
```bash
npm run dev  # With nodemon for auto-restart
```

### Production Hosting
- **Heroku**: Easy cloud deployment
- **Railway**: Simple Git-based deployment
- **VPS**: Full control with PM2/Systemd
- **Replit**: Browser-based development

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["node", "index.js"]
```

## 🛠️ Development

### Adding New Features
1. Add command definition in `bot/commands.js`
2. Implement handler in `bot/events.js`
3. Update help documentation
4. Test thoroughly

### Customizing Agents
Edit `bot/bot.js` to modify:
- Agent personalities
- Expertise areas
- Response styles
- Knowledge base

### Testing
```bash
# Run tests (if implemented)
npm test

# Check code quality
npm run lint

# Test specific commands
# Use Discord test server
```

## 📈 Performance

### Optimization Tips
- Adjust `MAX_TOKENS` for response length
- Implement conversation pruning
- Use GPT-3.5-turbo for cost efficiency
- Add caching for frequent queries

### Scaling Considerations
- Database for conversation persistence
- Queue system for high traffic
- Load balancing for multiple instances
- CDN for static assets

## 🤝 Contributing

### Development Process
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request
5. Code review and merge

### Code Standards
- Follow existing code style
- Add comments for complex logic
- Update documentation
- Include tests for new features

## 📚 Documentation

### Additional Resources
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup instructions
- [discord-agents-system.md](discord-agents-system.md) - System architecture
- Code comments for implementation details

### External Links
- [Discord.js Documentation](https://discordjs.guide/)
- [OpenAI API Reference](https://platform.openai.com/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🆘 Support

### Troubleshooting
1. Check `SETUP_GUIDE.md` for common issues
2. Review console logs
3. Verify environment variables
4. Test with simple commands first

### Getting Help
- Open GitHub issue for bugs
- Check Discord developer community
- Consult OpenAI support for API issues

## 📄 License
MIT License - See LICENSE file for details

## 🙏 Acknowledgments
- Discord.js team for excellent library
- OpenAI for powerful AI models
- Evergreen Landscaping for the use case

---
**Version**: 1.0  
**Last Updated**: April 15, 2026  
**Status**: Production Ready  

For questions or support, contact the system administrator.