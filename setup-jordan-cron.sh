#!/bin/bash
# Setup Jordan's daily automation cron job

echo "🔄 Setting up Jordan's daily finance automation..."

# Get the full path to the script
SCRIPT_PATH="/Users/jarvishstark/.openclaw/workspace/jordan-daily.js"
CRON_JOB="0 6 * * * cd /Users/jarvishstark/.openclaw/workspace && /usr/local/bin/node $SCRIPT_PATH >> /Users/jarvishstark/.openclaw/workspace/logs/jordan-daily.log 2>&1"

echo "📋 Cron job to be added:"
echo "$CRON_JOB"
echo ""

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "jordan-daily.js"; then
    echo "✅ Cron job already exists"
else
    echo "📝 Adding cron job..."
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "✅ Cron job added"
fi

# Create logs directory
mkdir -p /Users/jarvishstark/.openclaw/workspace/logs
echo "✅ Logs directory created"

# Test the script
echo ""
echo "🧪 Testing Jordan's script..."
cd /Users/jarvishstark/.openclaw/workspace
if /usr/local/bin/node jordan-daily.js > /tmp/jordan-test.log 2>&1; then
    echo "✅ Script test successful"
    echo "📄 Briefing created in: /Users/jarvishstark/.openclaw/workspace/memory/jordan-briefing-*.md"
else
    echo "⚠️ Script test had issues, check /tmp/jordan-test.log"
fi

echo ""
echo "🎯 JORDAN'S DAILY AUTOMATION SETUP COMPLETE"
echo "⏰ Will run daily at 6:00 AM ET"
echo "📊 Briefing delivered to Jarvis at 6:05 AM"
echo ""
echo "To view cron jobs: crontab -l"
echo "To remove this job: crontab -e"