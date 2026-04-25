#!/bin/bash

# Setup cron job for financial dashboard
# Run this script once to set up the 3am daily update

SCRIPT_PATH="/Users/jarvishstark/.openclaw/workspace/jerry/update_financial_dashboard.sh"
CRON_JOB="0 3 * * * $SCRIPT_PATH"

echo "Setting up financial dashboard cron job..."
echo "Script: $SCRIPT_PATH"
echo "Cron schedule: 0 3 * * * (3am daily)"

# Check if script exists and is executable
if [ ! -f "$SCRIPT_PATH" ]; then
    echo "ERROR: Script not found at $SCRIPT_PATH"
    exit 1
fi

if [ ! -x "$SCRIPT_PATH" ]; then
    echo "Making script executable..."
    chmod +x "$SCRIPT_PATH"
fi

# Add to crontab
echo "Adding to crontab..."
(crontab -l 2>/dev/null | grep -v "$SCRIPT_PATH"; echo "$CRON_JOB") | crontab -

# Verify
echo "Current crontab:"
crontab -l | grep "$SCRIPT_PATH"

echo ""
echo "✅ Cron job setup complete!"
echo "The financial dashboard will update daily at 3am."
echo ""
echo "To test manually: $SCRIPT_PATH"
echo "Output directory: /Users/jarvishstark/.openclaw/workspace/financial_reports/"