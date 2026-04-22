#!/usr/bin/env python3
"""
Reads all OpenClaw data files and outputs data.json for the Mission Control dashboard.
Run by update-github.sh every 30 minutes.
"""
import json, re, os
from datetime import date, datetime

TODAY      = date.today().strftime('%Y-%m-%d')
WORKSPACE  = os.path.expanduser('~/.openclaw/workspace')
OBSIDIAN   = os.path.expanduser('~/Obsidian Vaults/OpenClaw')

# ── helpers ──────────────────────────────────────────────────────────────────
def read(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except:
        return ''

def extract_int(text, pattern, default=0):
    m = re.search(pattern, text, re.IGNORECASE)
    return int(m.group(1).replace(',', '')) if m else default

def extract_float(text, pattern, default=0.0):
    m = re.search(pattern, text, re.IGNORECASE)
    return float(m.group(1).replace(',', '')) if m else default

def parse_priorities(md):
    result, active = [], False
    for line in md.split('\n'):
        if 'Active Priorities' in line:
            active = True; continue
        if active and line.startswith('##'):
            break
        if active:
            m = re.match(r'\d+\.\s+(.+)', line.strip())
            if m:
                result.append(m.group(1).strip())
    return result

def parse_section(md, heading):
    """Return lines in a markdown section (## heading) as a list."""
    lines, active = [], False
    for line in md.split('\n'):
        if re.match(r'#{1,3}\s+' + re.escape(heading), line):
            active = True; continue
        if active and line.startswith('#'):
            break
        if active and line.strip():
            lines.append(line.strip())
    return lines

# ── Jordan briefing ──────────────────────────────────────────────────────────
briefing = read(f'{WORKSPACE}/memory/jordan-briefing-{TODAY}.md')
if not briefing:
    # Try yesterday
    from datetime import timedelta
    yesterday = (date.today() - timedelta(days=1)).strftime('%Y-%m-%d')
    briefing = read(f'{WORKSPACE}/memory/jordan-briefing-{yesterday}.md')

metrics = {
    'clients':           extract_int(briefing,   r'(\d[\d,]*)\s+clients',                  151),
    'active_jobs':       extract_int(briefing,   r'(\d[\d,]*)\s+active jobs',               64),
    'revenue':           extract_float(briefing, r'Total Revenue:\s*\$([0-9,]+\.?\d*)',  9757.44),
    'completed_jobs':    extract_int(briefing,   r'Completed Jobs\s+Today:\s*(\d+)',         50),
    'low_margin_alerts': extract_int(briefing,   r'Low Margin Alerts:\s*(\d+)',              40),
    'briefing_date':     TODAY,
    'automation_phase':  re.search(r'PHASE\s+\d+[^\n]+', briefing).group(0).strip() if re.search(r'PHASE\s+\d+[^\n]+', briefing) else 'PHASE 1',
}

# ── Low-margin alert list ─────────────────────────────────────────────────────
alert_raw = read(f'{WORKSPACE}/memory/alert-low-margin-{TODAY}.md')
low_margin_jobs = []
for line in alert_raw.split('\n'):
    m = re.match(r'[•\-\*]\s+(.+?):\s*(\d+|No amount)', line.strip())
    if m:
        service = m.group(1).strip()
        raw_amt = m.group(2).strip()
        low_margin_jobs.append({
            'service': service,
            'amount':  int(raw_amt) if raw_amt.isdigit() else 0,
        })

# Aggregate by service type
svc_totals = {}
for j in low_margin_jobs:
    svc = j['service']
    svc_totals[svc] = svc_totals.get(svc, {'count': 0, 'total': 0})
    svc_totals[svc]['count'] += 1
    svc_totals[svc]['total'] += j['amount']
service_breakdown = [{'service': k, **v} for k, v in sorted(svc_totals.items(), key=lambda x: -x[1]['count'])]

# ── Tasks ────────────────────────────────────────────────────────────────────
todo = read(f'{WORKSPACE}/tasks/todo-updated.md') or read(f'{WORKSPACE}/tasks/todo.md')

tasks, current_priority, tid = [], 'medium', 1
completed = []
for line in todo.split('\n'):
    if '🚨 CRITICAL' in line:      current_priority = 'critical'
    elif '🔥 HIGH' in line:         current_priority = 'high'
    elif '📅 MEDIUM' in line:       current_priority = 'medium'
    elif 'RECENTLY COMPLETED' in line: current_priority = 'done'

    m = re.match(r'\d+\.\s+\*\*(.+?)\*\*', line.strip())
    if m:
        title = m.group(1)
        # find description on next passes - just capture title for now
        status = 'done' if current_priority == 'done' else \
                 ('inprogress' if current_priority == 'critical' else 'backlog')
        (completed if current_priority == 'done' else tasks).append({
            'id':       tid,
            'title':    title,
            'priority': current_priority,
            'status':   status,
        })
        tid += 1

# Pull owner/action from lines after each task header
enriched_tasks = []
lines = todo.split('\n')
for i, t in enumerate(tasks):
    desc, owner, action = '', '', ''
    for line in lines:
        if f'**{t["title"]}**' in line:
            # Scan next few lines for metadata
            idx = lines.index(line)
            for j in range(idx+1, min(idx+6, len(lines))):
                l = lines[j].strip()
                if l.startswith('- **Description**:'):
                    desc = l.replace('- **Description**:', '').strip()
                elif l.startswith('- **Action**:'):
                    action = l.replace('- **Action**:', '').strip()
                elif l.startswith('- **Owner**:'):
                    owner = l.replace('- **Owner**:', '').strip()
            break
    enriched_tasks.append({**t, 'desc': desc, 'action': action, 'owner': owner})

# ── Agent working memory ──────────────────────────────────────────────────────
jordan_wm = read(f'{OBSIDIAN}/agents/jordan/working.md')
donna_wm  = read(f'{OBSIDIAN}/agents/donna/working.md')
jerry_wm  = read(f'{OBSIDIAN}/agents/jerry/working.md')

agents = {
    'jordan': {
        'name':       'Jordan Belfort',
        'role':       'CFO AI — Finance & Analytics',
        'status':     'active',
        'last_run':   f'{TODAY} 06:05 AM',
        'priorities': parse_priorities(jordan_wm) or [
            'Jobber sync — update client financial sections',
            'Flag accounts >14 days past due → handoff to Jarvis',
        ],
        'stats': {
            'clients':    metrics['clients'],
            'active_jobs':metrics['active_jobs'],
            'revenue':    metrics['revenue'],
            'alerts':     metrics['low_margin_alerts'],
        },
    },
    'donna': {
        'name':       'Donna Paulsen',
        'role':       'Admin AI — Operations & Scheduling',
        'status':     'pending',
        'last_run':   None,
        'priorities': parse_priorities(donna_wm) or [
            "Update jobs-in-flight.md with today's schedule",
            'Check crew-roster.md for availability changes',
        ],
        'stats': {},
    },
    'jerry': {
        'name':       'Jerry McGuire',
        'role':       'Sales AI — Lead Generation',
        'status':     'pending',
        'last_run':   None,
        'priorities': parse_priorities(jerry_wm) or [
            'Review leads.md — flag stale leads (>5 days)',
            'Follow up on qualified leads pending proposal',
        ],
        'stats': {},
    },
}

# ── Briefing sections ─────────────────────────────────────────────────────────
next_actions = []
blockers = []
in_section = None
for line in briefing.split('\n'):
    if 'NEXT ACTIONS' in line:   in_section = 'actions'; continue
    if 'BLOCKERS' in line:       in_section = 'blockers'; continue
    if line.startswith('---'):   in_section = None; continue
    if in_section == 'actions':
        m = re.match(r'\d+\.\s+(.+)', line.strip())
        if m: next_actions.append(m.group(1).strip())
    if in_section == 'blockers':
        l = line.lstrip('•').strip()
        if l: blockers.append(l)

# ── Knowledge files (raw for rendering) ──────────────────────────────────────
crew_roster = read(f'{OBSIDIAN}/shared/knowledge/crew-roster.md')
pricing     = read(f'{OBSIDIAN}/shared/knowledge/pricing.md')
biz_rules   = read(f'{OBSIDIAN}/shared/knowledge/business-rules.md')
svc_catalog = read(f'{OBSIDIAN}/shared/knowledge/service-catalog.md')

# ── Pipeline ─────────────────────────────────────────────────────────────────
leads_md     = read(f'{OBSIDIAN}/shared/pipeline/leads.md')
jobs_md      = read(f'{OBSIDIAN}/shared/pipeline/jobs-in-flight.md')
flags_md     = read(f'{OBSIDIAN}/shared/flags/_open.md')
handoffs_md  = read(f'{OBSIDIAN}/shared/handoffs/_open.md')

# ── Assemble ─────────────────────────────────────────────────────────────────
data = {
    'generated_at':      datetime.now().isoformat(),
    'date':              TODAY,
    'metrics':           metrics,
    'low_margin_jobs':   low_margin_jobs,
    'service_breakdown': service_breakdown,
    'tasks':             enriched_tasks,
    'completed_tasks':   completed,
    'agents':            agents,
    'next_actions':      next_actions,
    'blockers':          blockers,
    'integrations': {
        'quickbooks': {'status': 'connected',    'label': 'QuickBooks'},
        'jobber':     {'status': 'active',       'label': 'Jobber API'},
        'discord':    {'status': 'connected',    'label': 'Discord'},
        'zapier':     {'status': 'active',       'label': 'Zapier'},
        'google':     {'status': 'pending',      'label': 'Google Sheets'},
    },
    'knowledge': {
        'crew_roster': crew_roster,
        'pricing':     pricing,
        'biz_rules':   biz_rules,
        'svc_catalog': svc_catalog,
    },
    'pipeline': {
        'leads':       leads_md,
        'jobs':        jobs_md,
    },
    'flags':    flags_md,
    'handoffs': handoffs_md,
    'briefing': briefing,
}

# Write
out = f'{WORKSPACE}/data.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

total_revenue_at_risk = sum(j['amount'] for j in low_margin_jobs)
print(f'✅  data.json written → {out}')
print(f'    Clients: {metrics["clients"]}  |  Active jobs: {metrics["active_jobs"]}  |  Revenue: ${metrics["revenue"]:,.2f}')
print(f'    Low-margin jobs: {len(low_margin_jobs)}  |  Revenue at risk: ${total_revenue_at_risk:,}')
print(f'    Tasks: {len(enriched_tasks)} active, {len(completed)} completed')
