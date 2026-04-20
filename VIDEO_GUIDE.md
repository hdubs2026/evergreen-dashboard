# Evergreen Landscaping Discord AI Agents - Video Guide Companion

## 📺 Video Reference: https://youtu.be/_crWwyHuZ2E

This document complements the video tutorial with written steps and troubleshooting tips.

## 🎬 Video Timeline & Key Points

### Part 1: Introduction (0:00 - 2:00)
- **What you'll build**: Discord bot with 3 specialized AI agents
- **Use case**: Evergreen Landscaping business automation
- **Agents**: Jordan (CFO), Donna (Admin), Jerry (Sales)

### Part 2: Prerequisites (2:00 - 5:00)
**What you need before starting:**
1. Node.js 18+ installed
2. Discord account with server permissions
3. OpenAI account with API access
4. Code editor (VS Code recommended)

**Quick check:**
```bash
node --version  # Should show 18.x or higher
npm --version   # Should show 8.x or higher
```

### Part 3: Discord Bot Setup (5:00 - 10:00)
**Step-by-step Discord configuration:**

1. **Create Discord Application:**
   - Go to https://discord.com/developers/applications
   - Click "New Application"
   - Name: "Evergreen Landscaping AI Agents"

2. **Create Bot User:**
   - Go to "Bot" section
   - Click "Add Bot"
   - Click "Yes, do it!"

3. **Get Credentials:**
   - **Token**: Under "Bot" → "Click to Reveal Token"
   - **Client ID**: Under "General Information" → "Application ID"

4. **Enable Intents (CRITICAL):**
   Under "Bot" → "Privileged Gateway Intents":
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT  
   - ✅ MESSAGE CONTENT INTENT

5. **Create Discord Server Channels:**
   - `#agent-discussions` - For agents to talk
   - `#agent-logs` - For system logs (optional)
   - `#general` - For user interactions

6. **Get Channel IDs:**
   - Enable Developer Mode: Settings → Advanced → Developer Mode
   - Right-click each channel → "Copy ID"

### Part 4: OpenAI API Setup (10:00 - 15:00)
**Creating API keys for each agent:**

1. **Go to OpenAI Platform:**
   - https://platform.openai.com/api-keys

2. **Create 3 separate keys:**
   - **Jordan Agent** (for CFO AI)
   - **Donna Agent** (for Admin AI)  
   - **Jerry Agent** (for Sales AI)

3. **Set up billing:**
   - Go to https://platform.openai.com/account/billing
   - Add payment method
   - Set usage limits if desired

### Part 5: Project Setup (15:00 - 20:00)
**Local development setup:**

```bash
# 1. Clone/download the project
git clone https://github.com/your-username/evergreen-discord-agents.git
cd evergreen-discord-agents

# 2. Run setup wizard (easiest method)
node setup-wizard.js

# OR manually create .env file
cp .env.example .env
# Edit .env with your credentials

# 3. Install dependencies
npm install

# 4. Deploy Discord commands
npm run deploy-commands

# 5. Invite bot to server
# Use the generated invite URL
```

### Part 6: Bot Invitation (20:00 - 22:00)
**Invite URL format:**
```
https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=2147485696&scope=bot%20applications.commands
```

**Required permissions:**
- Read Messages
- Send Messages  
- Read Message History
- Use Slash Commands
- Embed Links
- Attach Files

### Part 7: Testing & Usage (22:00 - 25:00)
**Test commands in Discord:**

1. **Check bot status:**
   ```
   /status
   ```

2. **List all agents:**
   ```
   /agents
   ```

3. **Talk to an agent:**
   ```
   /talk agent:jordan message:"What's our profit margin?"
   ```

4. **Start agent meeting:**
   ```
   /meeting topic:"Weekly Business Review"
   ```

### Part 8: Troubleshooting (25:00 - 30:00)
**Common issues and solutions:**

#### Issue 1: Bot not responding
```bash
# Check if bot is running
ps aux | grep node

# Check logs
tail -f console_output.log

# Verify .env file
cat .env | grep DISCORD_TOKEN
```

#### Issue 2: Slash commands not showing
```bash
# Redeploy commands
npm run deploy-commands

# Check bot permissions
# Needs "applications.commands" scope in invite URL
```

#### Issue 3: OpenAI API errors
```bash
# Check API keys
echo $OPENAI_API_KEY_JORDAN

# Check billing status
# Visit https://platform.openai.com/account/billing

# Reduce token limit in .env
MAX_TOKENS=300
```

#### Issue 4: Rate limiting
- Wait 60 seconds between commands
- Use fewer agents simultaneously
- Implement queuing in code

### Part 9: Advanced Features (30:00 - 35:00)
**Customizing your agents:**

1. **Edit agent personalities:**
   ```javascript
   // In bot/bot.js
   const AGENTS = {
       JORDAN: {
           name: "Jordan Belfort",
           personality: "Your custom personality here",
           expertise: ["Your custom expertise"],
           prompt: "Your custom system prompt"
       }
   };
   ```

2. **Add new commands:**
   - Edit `bot/commands.js`
   - Add handler in `bot/events.js`
   - Test thoroughly

3. **Modify scheduled meetings:**
   ```javascript
   // In bot/events.js - scheduleAgentDiscussions()
   cron.schedule('0 14 * * *', async () => {
       // 2 PM daily meetings
   });
   ```

### Part 10: Deployment Options (35:00 - 40:00)
**Where to host your bot:**

#### Option A: Local Machine (Development)
```bash
npm run dev  # Auto-restart on changes
```

#### Option B: Cloud Hosting (Production)
- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Replit**: Import and run

#### Option C: VPS (Advanced)
```bash
# Use PM2 for process management
npm install -g pm2
pm2 start index.js --name "evergreen-agents"
pm2 save
pm2 startup
```

### Part 11: Maintenance & Updates (40:00 - 45:00)
**Regular maintenance tasks:**

#### Daily:
- Check `/status` command
- Review agent discussions
- Monitor OpenAI usage

#### Weekly:
- Backup conversation logs
- Review system performance
- Update agent knowledge if needed

#### Monthly:
- Rotate API keys
- Update dependencies: `npm update`
- Review security settings

### 📋 Quick Reference Cheat Sheet

#### Environment Variables:
```env
DISCORD_TOKEN=bot_token_here
DISCORD_CLIENT_ID=client_id_here
OPENAI_API_KEY_JORDAN=sk-...jordan
OPENAI_API_KEY_DONNA=sk-...donna  
OPENAI_API_KEY_JERRY=sk-...jerry
AGENT_CHANNEL_ID=channel_id_here
```

#### Common Commands:
```bash
# Development
npm run dev          # Start with auto-restart
npm run deploy-commands  # Update Discord commands

# Production
npm start           # Start bot
npm test           # Run tests (if available)

# Troubleshooting
node test-structure.js  # Check project structure
node setup-wizard.js    # Interactive setup
```

#### Discord Commands:
```
/agents           - List all agents
/talk             - Talk to specific agent  
/ask_all          - Ask all agents
/meeting          - Start agent meeting
/agent_chat       - Make agents talk to each other
/status           - System status
/help             - Help guide
```

### 🆘 Emergency Troubleshooting

#### Bot won't start:
1. Check Node.js version: `node --version`
2. Check .env file exists: `ls -la .env`
3. Check dependencies: `npm list`
4. Check Discord token: Verify in Developer Portal

#### Agents not responding:
1. Check OpenAI keys: Verify in OpenAI dashboard
2. Check billing: Ensure credits available
3. Check rate limits: Wait 60 seconds
4. Check model: Try `gpt-3.5-turbo` instead of `gpt-4`

#### Commands not showing:
1. Redeploy: `npm run deploy-commands`
2. Check permissions: Re-invite bot with correct scope
3. Check cache: Restart Discord app
4. Check server: Bot needs to be in the server

### 🎓 Learning Resources

#### Documentation:
- [Discord.js Guide](https://discordjs.guide/)
- [OpenAI API Docs](https://platform.openai.com/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)

#### Community Support:
- Discord Developer Server
- OpenAI Community Forum  
- GitHub Issues for this project

#### Video Tutorials:
- Main tutorial: https://youtu.be/_crWwyHuZ2E
- Discord.js basics: Search "Discord.js tutorial"
- OpenAI integration: Search "OpenAI Discord bot"

### 📞 Support Contact

For issues with this specific system:
1. Check this VIDEO_GUIDE.md first
2. Review console logs for errors
3. Open GitHub issue with error details
4. Contact system administrator if urgent

---

**Video Timestamp**: Last updated to match tutorial at https://youtu.be/_crWwyHuZ2E  
**System Version**: 1.0  
**Compatibility**: Discord.js v14, OpenAI GPT-4/3.5  

*Note: Video content may be updated. Check video description for latest changes.*