# Discord AI Agents Setup Guide

## 🚀 QUICK START (Webhook Method - 10 Minutes)

### Step 1: Create Webhooks in Discord
1. **Open** your Discord server
2. **Go to** #teamchat channel (ID: 1493596752882831512)
3. **Click** ⚙️ Settings (gear icon)
4. **Select** "Integrations" → "Webhooks"
5. **Create 3 webhooks**:
   - **Name**: "Jordan Belfort AI"
   - **Name**: "Donna Paulsen AI"  
   - **Name**: "Jerry McGuire AI"
6. **Copy** each webhook URL (click "Copy Webhook URL")

### Step 2: Update the Script
1. **Open** `send-as-agent.js`
2. **Find** these lines (around line 8-10):
   ```javascript
   const WEBHOOKS = {
     jordan: 'YOUR_JORDAN_WEBHOOK_URL',
     donna: 'YOUR_DONNA_WEBHOOK_URL',
     jerry: 'YOUR_JERRY_WEBHOOK_URL'
   };
   ```
3. **Replace** with your actual webhook URLs:
   ```javascript
   const WEBHOOKS = {
     jordan: 'https://discord.com/api/webhooks/123456/abcdef',
     donna: 'https://discord.com/api/webhooks/789012/ghijkl',
     jerry: 'https://discord.com/api/webhooks/345678/mnopqr'
   };
   ```

### Step 3: Test the Agents
```bash
# Test Jordan
node send-as-agent.js jordan "Hello, I'm Jordan Belfort, CFO AI for Evergreen Landscaping!"

# Test Donna
node send-as-agent.js donna "Hi, I'm Donna Paulsen, Administrative Assistant AI!"

# Test Jerry  
node send-as-agent.js jerry "Hey there! Jerry McGuire, Sales Director AI here!"

# Test team message
node send-as-agent.js team "Good morning team! Ready for another productive day?"

# Test daily standup
node send-as-agent.js standup
```

## 🎯 WHAT YOU'LL SEE IN DISCORD

### In #teamchat:
```
[Jordan Belfort AI] Hello, I'm Jordan Belfort, CFO AI for Evergreen Landscaping!
[Donna Paulsen AI] Hi, I'm Donna Paulsen, Administrative Assistant AI!
[Jerry McGuire AI] Hey there! Jerry McGuire, Sales Director AI here!
```

### Each agent will have:
- ✅ **Different name** in Discord
- ✅ **Different avatar** (finance, calendar, phone icons)
- ✅ **Different color** messages (blue, purple, red)
- ✅ **Appear in sidebar** as separate webhook users

## 🔧 ADVANCED SETUP (Bot Method - 30 Minutes)

If you want **full bot functionality** (typing indicators, presence, etc.):

### Step 1: Create Discord Bot Applications
1. **Go to**: https://discord.com/developers/applications
2. **Create 3 applications**:
   - Jordan Belfort AI
   - Donna Paulsen AI
   - Jerry McGuire AI

### Step 2: Get Bot Tokens
For each application:
1. **Go to** "Bot" section
2. **Click** "Reset Token"
3. **Copy** token
4. **Enable** Privileged Intents:
   - ✅ PRESENCE INTENT
   - ✅ SERVER MEMBERS INTENT
   - ✅ MESSAGE CONTENT INTENT

### Step 3: Invite Bots to Server
For each bot:
1. **Go to** "OAuth2" → "URL Generator"
2. **Scopes**: `bot` + `applications.commands`
3. **Permissions**:
   - Read Messages
   - Send Messages
   - Send Messages in Threads
   - Embed Links
   - Read Message History
4. **Open** generated URL
5. **Select** your server
6. **Authorize**

### Step 4: Configure OpenClaw
```bash
# Create agent directories
mkdir -p ~/.openclaw/agents/{jordan,donna,jerry}

# Create config files (see examples below)
```

## 📁 AGENT CONFIGURATION FILES

### Jordan Belfort (`~/.openclaw/agents/jordan/config.json`):
```json
{
  "name": "Jordan Belfort",
  "model": "deepseek/deepseek-chat",
  "systemPrompt": "You are Jordan Belfort, CFO AI for Evergreen Landscaping...",
  "discord": {
    "token": "JORDAN_BOT_TOKEN",
    "channel": "1493596752882831512",
    "status": "Analyzing Financials"
  }
}
```

### Donna Paulsen (`~/.openclaw/agents/donna/config.json`):
```json
{
  "name": "Donna Paulsen",
  "model": "deepseek/deepseek-chat",
  "systemPrompt": "You are Donna Paulsen, Administrative Assistant AI...",
  "discord": {
    "token": "DONNA_BOT_TOKEN",
    "channel": "1493596752882831512",
    "status": "Managing Schedule"
  }
}
```

### Jerry McGuire (`~/.openclaw/agents/jerry/config.json`):
```json
{
  "name": "Jerry McGuire",
  "model": "deepseek/deepseek-chat",
  "systemPrompt": "You are Jerry McGuire, Sales Director AI...",
  "discord": {
    "token": "JERRY_BOT_TOKEN",
    "channel": "1493596752882831512",
    "status": "Contacting Leads"
  }
}
```

## ⚙️ AUTOMATION EXAMPLES

### Daily Standup Cron Job:
```bash
# 9:00 AM daily standup
openclaw cron add --name "ai-standup" --cron "0 9 * * 1-5" \
  --command "node send-as-agent.js standup" \
  --channel discord --to "channel:1493596752882831512"
```

### Invoice Reminder Automation:
```bash
# 8:00 AM invoice check
openclaw cron add --name "invoice-reminders" --cron "0 8 * * 1-5" \
  --command "node send-as-agent.js jordan 'Checking overdue invoices... Found 3 needing follow-up.'" \
  --channel discord --to "channel:1493596752882831512"
```

### Lead Follow-up Automation:
```bash
# 10:00 AM lead follow-up
openclaw cron add --name "lead-followup" --cron "0 10 * * 1-5" \
  --command "node send-as-agent.js jerry 'Following up on 5 new leads from yesterday...'" \
  --channel discord --to "channel:1493596752882831512"
```

## 🎨 CUSTOMIZATION

### Change Avatars:
Update the avatar URLs in `send-as-agent.js`:
```javascript
avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
```

### Change Colors:
```javascript
color: 0x3498db // Blue (Jordan)
color: 0x9b59b6 // Purple (Donna)
color: 0xe74c3c // Red (Jerry)
```

### Add More Agents:
1. Add to `WEBHOOKS` object
2. Add to `AGENTS` object
3. Update command handling

## 🚨 TROUBLESHOOTING

### Webhook Not Working:
1. **Check URL** is correct
2. **Verify** webhook still exists in Discord
3. **Test** with: `curl -X POST -H "Content-Type: application/json" -d '{"content":"test"}' WEBHOOK_URL`

### Bot Not Showing:
1. **Check** bot is invited to server
2. **Verify** token is correct
3. **Ensure** OpenClaw is running the agent

### Rate Limiting:
1. **Add delays** between messages
2. **Use** `setTimeout` in scripts
3. **Check** Discord rate limits

## 🎯 RECOMMENDATION

**Start with Webhook Method** because:
1. ✅ **10 minutes** vs 30+ minutes
2. ✅ **No bot tokens** to manage
3. ✅ **Same visual effect** in Discord
4. ✅ **Easier to debug**
5. ✅ **Works immediately**

## 🚀 READY TO START?

### Quick Commands:
```bash
# 1. Create webhooks in Discord (2 minutes)
# 2. Update send-as-agent.js with URLs (2 minutes)
# 3. Test: node send-as-agent.js jordan "Test message" (1 minute)
# 4. Set up automation (5 minutes)

# Total: 10 minutes to live AI agents!
```

**Begin with Step 1 (create webhooks) and I'll help with each step!** 🎉