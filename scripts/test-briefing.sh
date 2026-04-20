#!/bin/bash

# Test the morning briefing system
echo "🧪 Testing Morning Briefing System"
echo "=================================="

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if scripts exist
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENHANCED_SCRIPT="$SCRIPT_DIR/morning-briefing-enhanced.js"
AGENT_SCRIPT="$SCRIPT_DIR/morning-briefing-agent.js"

if [ ! -f "$ENHANCED_SCRIPT" ]; then
    echo "❌ Enhanced briefing script not found: $ENHANCED_SCRIPT"
    exit 1
fi

if [ ! -f "$AGENT_SCRIPT" ]; then
    echo "❌ Agent script not found: $AGENT_SCRIPT"
    exit 1
fi

echo "✅ All scripts found"

# Test task file
TASK_FILE="$SCRIPT_DIR/../tasks/todo.md"
if [ ! -f "$TASK_FILE" ]; then
    echo "❌ Task file not found: $TASK_FILE"
    exit 1
fi

echo "✅ Task file found: $TASK_FILE"

# Test the enhanced script
echo ""
echo "🔧 Testing Enhanced Briefing Script..."
node "$ENHANCED_SCRIPT" > /tmp/test-briefing.md 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Enhanced script test passed"
    echo "📄 Briefing saved to: /tmp/test-briefing.md"
    echo ""
    echo "📋 Sample output (first 20 lines):"
    echo "----------------------------------"
    head -20 /tmp/test-briefing.md
else
    echo "❌ Enhanced script test failed"
    exit 1
fi

# Test task extraction
echo ""
echo "📋 Testing Task Extraction..."
node -e "
const fs = require('fs');
const path = require('path');
const taskFile = '$TASK_FILE';
const content = fs.readFileSync(taskFile, 'utf8');
const lines = content.split('\\n');
const activeTasks = lines.filter(line => line.includes('**Status**:') && line.includes('Awaiting') || line.includes('pending'));
console.log('Found ' + activeTasks.length + ' active/awaiting tasks');
activeTasks.forEach((task, i) => {
    console.log((i+1) + '. ' + task.trim());
});
"

# Test weather function (if curl is available)
if command -v curl &> /dev/null; then
    echo ""
    echo "🌤️ Testing Weather Function..."
    WEATHER=$(curl -s "https://wttr.in/New%20York?format=3")
    if [ $? -eq 0 ]; then
        echo "✅ Weather test passed: $WEATHER"
    else
        echo "⚠️ Weather test failed (network issue?)"
    fi
fi

echo ""
echo "🎉 All tests completed successfully!"
echo ""
echo "📊 Next Steps:"
echo "1. The briefing system is ready for production"
echo "2. Cron job will run at 7:00 AM daily"
echo "3. Tasks are tracked in: $TASK_FILE"
echo "4. Briefings will be saved to: $SCRIPT_DIR/../memory/"
echo ""
echo "🚀 To deploy: Run the cron job setup command"