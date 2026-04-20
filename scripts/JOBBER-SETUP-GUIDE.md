# Jobber API Integration Setup Guide

## 🚀 QUICK START (5 Steps)

### Step 1: Get Your Access Token
1. **Edit** `jobber-auth.js`:
   ```javascript
   // Replace these lines:
   clientId: 'YOUR_CLIENT_ID_HERE',      // ← Your actual Client ID
   clientSecret: 'YOUR_CLIENT_SECRET_HERE', // ← Your actual Client Secret
   ```
2. **Run**: `node jobber-auth.js`
3. **Follow** the OAuth flow in browser
4. **Copy** the access token

### Step 2: Test the Connection
1. **Edit** `jobber-test.js`:
   ```javascript
   accessToken: 'YOUR_ACCESS_TOKEN_HERE', // ← Paste your token here
   ```
2. **Run**: `node jobber-test.js`
3. **Verify** you see ✅ success messages

### Step 3: Configure OpenClaw
```bash
# Store your credentials in OpenClaw
openclaw config set integrations.jobber.clientId "YOUR_CLIENT_ID"
openclaw config set integrations.jobber.clientSecret "YOUR_CLIENT_SECRET"
openclaw config set integrations.jobber.accessToken "YOUR_ACCESS_TOKEN"
```

### Step 4: Run Daily Automation
```bash
# Test the integration
node jobber-integration.js
```

### Step 5: Schedule Daily Run
```bash
# Create cron job for 8:00 AM daily
openclaw cron add --name "jobber-daily" --cron "0 8 * * *" \
  --command "node /path/to/jobber-integration.js" \
  --channel discord --to "channel:1493317177871171707"
```

## 🔧 TROUBLESHOOTING

### Problem: "Invalid credentials"
**Solution:**
1. Double-check Client ID and Secret
2. Make sure they're from Jobber Developer App
3. Remove any extra spaces or quotes

### Problem: "Authorization code invalid"
**Solution:**
1. Get a fresh authorization code
2. Codes expire quickly (minutes)
3. Run `node jobber-auth.js` again

### Problem: "No permission" errors
**Solution:**
1. You need proper OAuth scopes
2. Request: `read write` scopes
3. Contact Jobber support if needed

### Problem: "Token expired"
**Solution:**
1. Tokens expire after some time
2. Use refresh token to get new one
3. Or run `node jobber-auth.js` again

## 📋 WHAT YOU'LL AUTOMATE

### Daily (8:00 AM)
- ✅ Check overdue invoices
- ✅ Review upcoming jobs (next 3 days)
- ✅ Process new leads (last 7 days)
- ✅ Add notes to Jobber
- ✅ Generate daily report

### Real-time (When triggered)
- Invoice reminders
- Client follow-ups
- Schedule optimization
- Lead qualification

## 🎯 EXPECTED RESULTS

### After Setup:
1. **Daily report** in Discord at 8:00 AM
2. **Automated notes** added to Jobber
3. **No manual data entry** needed
4. **Real-time sync** between systems

### Sample Report:
```
📊 DAILY JOBBER REPORT
• Overdue Invoices: 3
• Upcoming Jobs: 5  
• New Leads: 2
• Actions Taken: 3 notes added
```

## ⚙️ ADVANCED CONFIGURATION

### Environment Variables (Optional)
```bash
# Set in your shell or OpenClaw config
export JOBBER_CLIENT_ID="your_id"
export JOBBER_CLIENT_SECRET="your_secret"
export JOBBER_ACCESS_TOKEN="your_token"
```

### Custom Automation Rules
Edit `jobber-integration.js` to:
- Change report timing
- Add custom workflows
- Integrate with other systems
- Send different notifications

## 📞 SUPPORT

### Jobber API Docs
- https://developer.getjobber.com/docs
- https://api.getjobber.com/api/v1

### OpenClaw Help
- Contact @OpenClaw in Discord
- Check OpenClaw logs: `openclaw logs`

### Common Issues
1. **Rate limiting**: Jobber has API limits
2. **Scope issues**: Need correct permissions
3. **Token expiry**: Set up refresh logic
4. **Network issues**: Check firewall/proxy

## 🚀 READY TO START?

### Quick Command Summary:
```bash
# 1. Get token
node jobber-auth.js

# 2. Test
node jobber-test.js

# 3. Configure
openclaw config set integrations.jobber.accessToken "YOUR_TOKEN"

# 4. Run
node jobber-integration.js

# 5. Schedule
openclaw cron add --name "jobber-daily" --cron "0 8 * * *" --command "node jobber-integration.js"
```

**Start with Step 1 and I'll help with any issues!** 🎯