#!/bin/bash
echo "🔧 Installing Jordan LaunchDaemon service..."

# Create logs directory
mkdir -p /Users/jarvishstark/.openclaw/workspace/logs

# Copy plist to LaunchAgents directory
cp /Users/jarvishstark/.openclaw/workspace/com.evergreen.jordan.plist ~/Library/LaunchAgents/

# Load the service
launchctl load ~/Library/LaunchAgents/com.evergreen.jordan.plist

# Start it now to test
launchctl start com.evergreen.jordan

# Check status
echo ""
echo "📋 Service Status:"
launchctl list | grep evergreen

# Test the script
echo ""
echo "🧪 Testing Jordan script..."
cd /Users/jarvishstark/.openclaw/workspace
/opt/homebrew/bin/node jordan-daily.js

echo ""
echo "✅ Jordan LaunchDaemon installed"
echo "⏰ Will run daily at 6:00 AM"
echo "📊 Logs: ~/.openclaw/workspace/logs/jordan-daily.log"
echo ""
echo "To manually trigger: launchctl start com.evergreen.jordan"
echo "To check logs: tail -f ~/.openclaw/workspace/logs/jordan-daily.log"
echo "To uninstall: launchctl unload ~/Library/LaunchAgents/com.evergreen.jordan.plist"