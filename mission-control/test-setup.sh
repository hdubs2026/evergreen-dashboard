#!/bin/bash
echo "🚀 Mission Control Dashboard - Setup Test"
echo "=========================================="

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check project structure
echo ""
echo "📁 Project Structure Check:"
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json missing"
    exit 1
fi

if [ -f "next.config.js" ]; then
    echo "✅ next.config.js exists"
else
    echo "❌ next.config.js missing"
fi

if [ -d "app" ]; then
    echo "✅ app directory exists"
    if [ -f "app/page.tsx" ]; then
        echo "✅ app/page.tsx exists"
    else
        echo "❌ app/page.tsx missing"
    fi
else
    echo "❌ app directory missing"
    exit 1
fi

if [ -d "components" ]; then
    echo "✅ components directory exists"
    COMPONENT_COUNT=$(find components -name "*.tsx" | wc -l)
    echo "✅ Found $COMPONENT_COUNT components"
else
    echo "❌ components directory missing"
fi

echo ""
echo "📦 Installing dependencies..."
npm install --silent
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔧 Build test..."
npx next build --silent
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎯 READY TO LAUNCH!"
echo ""
echo "To start the dashboard:"
echo "  cd /Users/jarvishstark/.openclaw/workspace/mission-control"
echo "  npm run dev"
echo ""
echo "Then open: http://localhost:3000"
echo ""
echo "Dashboard features:"
echo "  • Agent monitoring (Jarvis, Jordan, Donna, Jerry)"
echo "  • System health status"
echo "  • Task management"
echo "  • Memory system tracking"
echo "  • Custom tools builder"
echo ""
echo "Design: Linear.app-inspired clean interface"
echo "Tech: Next.js 14, TypeScript, Tailwind CSS"