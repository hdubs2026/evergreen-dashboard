@echo off
echo ========================================
echo Evergreen Landscaping AI Agents - Setup
echo ========================================
echo.
echo This script will help you set up everything.
echo.

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please download from: https://nodejs.org
    echo Then run this script again.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
echo.

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file...
    echo # Discord Configuration > .env
    echo DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN_HERE >> .env
    echo DISCORD_CLIENT_ID=YOUR_DISCORD_CLIENT_ID_HERE >> .env
    echo. >> .env
    echo # OpenAI API Keys (get from https://platform.openai.com/api-keys) >> .env
    echo OPENAI_API_KEY_JORDAN=sk-...jordan_key_here >> .env
    echo OPENAI_API_KEY_DONNA=sk-...donna_key_here >> .env
    echo OPENAI_API_KEY_JERRY=sk-...jerry_key_here >> .env
    echo. >> .env
    echo # Discord Channel IDs (enable Developer Mode to get these) >> .env
    echo AGENT_CHANNEL_ID=YOUR_AGENT_CHANNEL_ID_HERE >> .env
    echo LOG_CHANNEL_ID=YOUR_LOG_CHANNEL_ID_HERE >> .env
    echo. >> .env
    echo # Optional Settings >> .env
    echo OPENAI_MODEL=gpt-4 >> .env
    echo MAX_TOKENS=600 >> .env
    echo ✅ .env file created!
    echo.
    echo IMPORTANT: Open .env in a text editor and fill in your credentials.
    echo.
) else (
    echo ✅ .env file already exists
    echo.
)

REM Install dependencies
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed
echo.

REM Deploy Discord commands
echo Deploying Discord commands...
call npm run deploy-commands
if %errorlevel% neq 0 (
    echo ⚠️ Command deployment may have issues
    echo This is normal if you haven't filled in .env yet
    echo.
)

echo ========================================
echo 🎉 SETUP COMPLETE!
echo ========================================
echo.
echo NEXT STEPS:
echo 1. Open .env file and fill in your credentials
echo 2. Run: npm run deploy-commands
echo 3. Run: npm start
echo.
echo Need help? Check SETUP_GUIDE.md or VIDEO_GUIDE.md
echo.
pause