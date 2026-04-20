# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## Jobber CRM Integration

Jobber is the CRM/field service platform for Evergreen Landscaping & Design. Use the integration script to query live data — do NOT use env vars or stored tokens directly, they expire every hour. The script handles token refresh automatically.

**Script location:** `/Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js`

**Commands (use via exec tool):**
```
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js today      # Today's scheduled jobs/visits + client names
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js clients    # All 152 clients
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js jobs       # All active jobs
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js invoices   # All invoices
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js quotes     # Open quotes
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js requests   # Service requests
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js summary    # Account totals
node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js client <id>  # Single client detail
```

**Output:** JSON. Parse it to answer questions about clients, jobs, schedules, and invoices.

**Token issues:** If you see "token expired", run the script anyway — it auto-refreshes from `~/.openclaw/secrets/jobber.json`. Do not ask the user for a token.
