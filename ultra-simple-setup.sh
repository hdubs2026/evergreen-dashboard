#!/bin/bash

echo "========================================"
echo "Evergreen Landscaping AI Agents - Setup"
echo "========================================"
echo ""
echo "This script will help you set up everything."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please download from: https://nodejs.org"
    echo "Then run this script again."
    exit 1
fi

echo "✅ Node.js is installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Discord Configuration
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE
DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID_HERE

# OpenAI API Keys (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY_JORDAN=sk-...jordan_key_here
OPENAI_API_KEY_DONNA=sk-...donna_key_here
OPENAI_API_KEY_JERRY=sk-...jerry_key_here

# Discord Channel IDs (enable Developer Mode to get these)
AGENT_CHANNEL_ID=YOUR_AGENT_CHANNEL_ID_HERE
LOG_CHANNEL_ID=YOUR_LOG_CHANNEL_ID_HERE

# Optional Settings
OPENAI_MODEL=gpt-4
MAX_TOKENS=600
EOF
    echo "✅ .env file created!"
    echo ""
    echo "IMPORTANT: Open .env in a text editor and fill in your credentials."
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Install dependencies
echo "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Deploy Discord commands
echo "Deploying Discord commands..."
npm run deploy-commands
if [ $? -ne 0 ]; then
    echo "⚠️ Command deployment may have issues"
    echo "This is normal if you haven't filled in .env yet"
    echo ""
fi

echo "========================================"
echo "🎉 SETUP COMPLETE!"
echo "========================================"
echo ""
echo "NEXT STEPS:"
echo "1. Open .env file and fill in your credentials"
echo "2. Run: npm run deploy-commands"
echo "3. Run: npm start"
echo ""
echo "Need help? Check SETUP_GUIDE.md or VIDEO_GUIDE.md"
echo ""