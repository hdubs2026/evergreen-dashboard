#!/bin/bash
echo "🚀 Launching Mission Control Dashboard..."
echo "=========================================="

cd /Users/jarvishstark/.openclaw/workspace/mission-control

# Check if already running
if lsof -ti:3000 &> /dev/null; then
    echo "⚠️  Dashboard already running on port 3000"
    echo "   To stop it: kill \$(lsof -ti:3000)"
    echo ""
    echo "📊 Dashboard available at: http://localhost:3000"
    exit 0
fi

echo "📦 Installing dependencies if needed..."
npm install --silent

echo "🔧 Building dashboard..."
npm run build

echo ""
echo "🎯 Starting Mission Control Dashboard..."
echo ""
echo "📊 Dashboard will be available at: http://localhost:3000"
echo "🖥️  Press Ctrl+C to stop"
echo ""
echo "Features:"
echo "  • Agent monitoring (Jarvis, Jordan, Donna, Jerry)"
echo "  • System health status"
echo "  • Task management"
echo "  • Obsidian memory tracking"
echo "  • Custom tools builder"
echo "  • Linear.app-inspired clean interface"
echo ""

# Start the dashboard
npm run dev