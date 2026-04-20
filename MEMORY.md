# MEMORY.md - Long-Term Memory

## Who I'm Working With
- **Hunter** (h-dubs47) — owner of Evergreen Landscaping & Design
- Non-technical but action-oriented. Wants things to work, not explanations.
- Communicates directly. Will say "fix this" with a screenshot. That's enough.
- Timezone: America/New_York (EDT)

## The Business
- **Evergreen Landscaping & Design** — residential & commercial landscaping
- **CRM**: Jobber — 152 clients, 64 active jobs, 18 invoices
- **AI transformation goal**: 60% reduction in manual admin tasks, $71k annual net benefit
- **Timeline**: 6-month plan started ~April 13, 2026. ~25% complete as of April 17.

## Agent Team
- **Jordan Belfort** 💰 — CFO AI (finance, invoices, profitability analysis)
- **Donna Paulsen** 📅 — Admin AI (scheduling, client comms, operations)
- **Jerry McGuire** 📞 — Sales AI (leads, appointments, conversions)
- All three have separate Discord bot accounts and dedicated workspaces

## Key Systems Built
- **Morning briefing**: Cron at 7 AM daily — weather, schedule, open quotes, tasks → #general
- **Jobber integration**: `/scripts/jobber-integration.js` — GraphQL API, auto-refreshes tokens
  - Commands: `today`, `clients`, `jobs`, `invoices`, `quotes`, `requests`, `summary`, `refresh`
  - Token auto-refreshes via system crontab every 30 min (completely silent)
- **Daily report**: `jobber-daily-report-auto` cron at 8 AM delivers to Discord
- **Secrets**: Jobber credentials at `~/.openclaw/secrets/jobber.json`

## What Hunter Wants / Preferences
- No technical jargon unless necessary
- Solutions that just work — not "here are your options"
- Hates when things show up unexpectedly in Discord chat (exec notifications, system messages)
- Wants agents to find data themselves, not ask for tokens or API keys
- Economic news in morning briefing: article links, NO bond information

## Issues Fixed (Don't Repeat These)
- Jerry was responding as Jordan — tokens were swapped. Fixed April 16.
- Jobber tokens expire every 60 min — now auto-refreshed via cron, never ask Hunter for tokens
- Ghost cron sessions were flooding main agent context — 51 removed April 17
- `integrations` is not a valid openclaw config key — use `secrets.providers` instead
- `agents.defaults.env` is not a valid openclaw config key
- SecretRefs require gateway running to resolve — use inline token strings instead

## Current Open Items (as of April 17, 2026)
- Jobber daily report cron (`jobber-daily-report-auto`) running at 8 AM ✅
- Morning briefing at 7 AM ✅
- Token auto-refresh every 30 min via system crontab ✅
- Revenue now shows correctly: `totalRevenue` = all billed, `outstandingRevenue` = unpaid balance. $0 outstanding is correct — all invoices are paid. ✅
- QuickBooks integration not yet started
- Dashboard not yet deployed publicly
