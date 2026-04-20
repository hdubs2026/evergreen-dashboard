#!/bin/bash

# Evergreen Landscaping AI Dashboard Startup Script
# This script starts the interactive web dashboard

echo "🚀 Starting Evergreen Landscaping AI Dashboard..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "❌ Node.js version too old. Please upgrade to v14 or higher."
    exit 1
fi

# Change to dashboard directory
cd "$(dirname "$0")"

# Check if server.js exists
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found in current directory"
    exit 1
fi

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "❌ index.html not found in current directory"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ Dashboard files found"
echo ""

# Get local IP address
get_local_ip() {
    if command -v ip &> /dev/null; then
        ip -4 addr show | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '127.0.0.1' | head -1
    elif command -v ifconfig &> /dev/null; then
        ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1' | cut -d' ' -f2 | head -1
    else
        echo "localhost"
    fi
}

LOCAL_IP=$(get_local_ip)

echo "📊 DASHBOARD INFORMATION:"
echo "   Local URL:    http://localhost:8080"
echo "   Network URL:  http://$LOCAL_IP:8080"
echo ""
echo "🌐 ACCESS FROM OTHER DEVICES:"
echo "   On your phone/tablet/other computer, open browser and visit:"
echo "   http://$LOCAL_IP:8080"
echo ""
echo "🔧 FEATURES:"
echo "   • Virtual office with moving agent avatars"
echo "   • Live activity feed with real-time updates"
echo "   • Interactive metrics and progress tracking"
echo "   • Agent performance monitoring"
echo "   • Auto-refresh every 30 seconds"
echo ""
echo "⚡ Starting server..."

# Start the server
node server.js

# If server stops, show message
echo ""
echo "🛑 Dashboard server stopped"
echo "To restart, run: ./start-dashboard.sh"