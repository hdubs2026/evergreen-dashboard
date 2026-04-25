#!/bin/bash
echo "🔧 Fixing Jordan cron job..."

# Create logs directory
mkdir -p /Users/jarvishstark/.openclaw/workspace/logs

# Get current cron
CURRENT_CRON=$(crontab -l 2>/dev/null)

# Check if Jordan cron already exists
if echo "$CURRENT_CRON" | grep -q "jordan-daily.js"; then
    echo "✅ Jordan cron already exists"
else
    # Add Jordan cron
    JORDAN_CRON="0 6 * * * cd /Users/jarvishstark/.openclaw/workspace && /opt/homebrew/bin/node /Users/jarvishstark/.openclaw/workspace/jordan-daily.js >> /Users/jarvishstark/.openclaw/workspace/logs/jordan-daily.log 2>&1"
    
    # Write to temp file
    echo "$CURRENT_CRON" > /tmp/fixed_cron
    echo "$JORDAN_CRON" >> /tmp/fixed_cron
    
    # Install
    crontab /tmp/fixed_cron
    echo "✅ Jordan cron added"
fi

# Verify
echo ""
echo "📋 Current cron jobs:"
crontab -l

# Test Jordan script
echo ""
echo "🧪 Testing Jordan script..."
cd /Users/jarvishstark/.openclaw/workspace
/opt/homebrew/bin/node jordan-daily.js

echo ""
echo "🎯 JORDAN CRON FIXED"
echo "⏰ Will run daily at 6:00 AM"
echo "📊 Briefing at 6:05 AM"