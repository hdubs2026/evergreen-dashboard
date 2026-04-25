# Cron Job Setup Instructions for Financial Dashboard

## Files Created:
1. `financial_dashboard_template.tsv` - Template for Google Sheets import
2. `update_financial_dashboard.sh` - Automated update script
3. `financial_reports/` - Directory for daily reports and logs

## To Set Up the 3am Daily Cron Job:

### Option 1: Using crontab (Recommended)
Run this command to edit your crontab:
```bash
crontab -e
```

Add this line to run the script daily at 3am:
```
0 3 * * * /Users/jarvishstark/.openclaw/workspace/jerry/update_financial_dashboard.sh
```

### Option 2: Using launchd (macOS)
Create a plist file at `~/Library/LaunchAgents/com.evergreen.financialdashboard.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.evergreen.financialdashboard</string>
    <key>ProgramArguments</key>
    <array>
        <string>/Users/jarvishstark/.openclaw/workspace/jerry/update_financial_dashboard.sh</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>3</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/Users/jarvishstark/.openclaw/workspace/financial_reports/cron.log</string>
    <key>StandardErrorPath</key>
    <string>/Users/jarvishstark/.openclaw/workspace/financial_reports/cron_error.log</string>
</dict>
</plist>
```

Load and start the job:
```bash
launchctl load ~/Library/LaunchAgents/com.evergreen.financialdashboard.plist
launchctl start com.evergreen.financialdashboard
```

## Manual Test Command:
To test the script manually:
```bash
/Users/jarvishstark/.openclaw/workspace/jerry/update_financial_dashboard.sh
```

## Output Location:
Daily reports are saved to:
- `/Users/jarvishstark/.openclaw/workspace/financial_reports/financial_dashboard_YYYY-MM-DD.tsv`
- `/Users/jarvishstark/.openclaw/workspace/financial_reports/update_log_YYYY-MM-DD.log`

## Google Sheets Integration:
To automatically upload to Google Sheets, you'll need to:

1. **Enable Google Sheets API** in Google Cloud Console
2. **Create Service Account** and download credentials JSON
3. **Update the script** to include Google Sheets upload functionality
4. **Share your Google Sheet** with the service account email

## Next Steps:
1. Set up the cron job using one of the methods above
2. Create a Google Sheet and import the template
3. Set up Google Sheets API for automatic updates
4. Review the daily financial reports

## Notes:
- The script automatically cleans up logs older than 7 days
- Dashboard files are kept for 30 days
- All calculations use real data from Jobber CRM
- Assumptions (50% COGS, 30% operating expenses) can be adjusted in the script