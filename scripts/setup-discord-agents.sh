#!/bin/bash

# Discord Bot Tokens Setup Script
# Run this once to set up all agents

echo "🔧 Setting up Discord AI Agents for Evergreen Landscaping..."

# Set environment variables (replace with your actual tokens)
export DISCORD_BOT_TOKEN_DONNA="your_donna_bot_token"
export DISCORD_BOT_TOKEN_JERRY="your_jerry_bot_token"
export DISCORD_BOT_TOKEN_JORDAN="your_jordan_bot_token"

# Add to shell profile for persistence
echo "" >> ~/.zshrc
echo "# Discord AI Agents for Evergreen Landscaping" >> ~/.zshrc
echo 'export DISCORD_BOT_TOKEN_DONNA="your_donna_bot_token"' >> ~/.zshrc
echo 'export DISCORD_BOT_TOKEN_JERRY="your_jerry_bot_token"' >> ~/.zshrc
echo 'export DISCORD_BOT_TOKEN_JORDAN="your_jordan_bot_token"' >> ~/.zshrc

echo "✅ Environment variables set"
echo "📝 Added to ~/.zshrc for persistence"

# Restart OpenClaw gateway
echo "🔄 Restarting OpenClaw gateway..."
openclaw gateway restart

echo "🎉 Setup complete! Agents should now appear as separate users in Discord."
echo ""
echo "📋 Next steps:"
echo "1. Replace 'your_donna_bot_token' with actual Donna bot token"
echo "2. Replace 'your_jerry_bot_token' with actual Jerry bot token"
echo "3. Replace 'your_jordan_bot_token' with actual Jordan bot token"
echo "4. Run this script again after updating tokens"
echo ""
echo "👥 Agents will appear in Discord as:"
echo "   • @Jordan Belfort AI"
echo "   • @Donna Paulsen AI"
echo "   • @Jerry McGuire AI"