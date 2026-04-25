#!/usr/bin/env python3
import json, subprocess, sys
from collections import Counter

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True, shell=True)
    return json.loads(r.stdout) if r.stdout.strip() else {}

summary = run("node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js summary")
today_visits = run("node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js today")
jobs = run("node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js jobs")
quotes = run("node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js quotes")

total_revenue = float(summary.get('totalRevenue', '$0').replace('$','').replace(',',''))
outstanding = float(summary.get('outstandingRevenue', '$0').replace('$','').replace(',',''))
total_clients = summary.get('totalClients', 0)
active_jobs = summary.get('activeJobs', 0)
total_invoices = summary.get('totalInvoices', 0)
total_quotes = summary.get('totalQuotes', 0)

jobs_list = jobs if isinstance(jobs, list) else []
quotes_list = quotes if isinstance(quotes, list) else []

requires_invoicing = [j for j in jobs_list if j.get('jobStatus') == 'requires_invoicing']
archived = [j for j in jobs_list if j.get('jobStatus') == 'archived']
upcoming = [j for j in jobs_list if j.get('jobStatus') == 'upcoming']

completed_this_month = len(archived) + len(requires_invoicing)
completed_revenue = sum(float(j.get('total',0) or 0) for j in archived + requires_invoicing)

client_revenue = {}
for j in jobs_list:
    name = j.get('client', {}).get('name', 'Unknown')
    val = float(j.get('total',0) or 0)
    client_revenue[name] = client_revenue.get(name, 0) + val
top_clients = sorted(client_revenue.items(), key=lambda x: -x[1])[:3]

pending_quotes = [q for q in quotes_list if q.get('quoteStatus') in ['draft', 'awaiting_response', 'sent']]
draft_quotes = [q for q in quotes_list if q.get('quoteStatus') == 'draft']
awaiting_quotes = [q for q in quotes_list if q.get('quoteStatus') == 'awaiting_response']

report = []
report.append("📊 **EVERGREEN DAILY — THU APR 23**")
report.append(f"*153 clients | 66 active jobs*\n")

# Schedule
report.append("━" * 35)
report.append("**🗓️  TODAY'S WORK**")
if today_visits:
    for v in today_visits:
        jt = v.get('job',{}).get('title','')
        cn = v.get('job',{}).get('client',{}).get('name','')
        report.append(f"  🕐 **{jt}** @ {cn}")
else:
    report.append("  *No visits scheduled today*")
report.append("")

# Financials
report.append("━" * 35)
report.append("**💰 APRIL FINANCIALS**")
report.append(f"  Revenue: **${total_revenue:,.2f}**")
report.append(f"  Outstanding: **${outstanding:,.2f}**")
report.append(f"  Invoices: {total_invoices} | Quotes: {total_quotes}")

target = 20000
pct = (total_revenue / target) * 100
bars_filled = int(pct / 5)
bar = '█' * min(bars_filled, 20) + '░' * max(20 - bars_filled, 0)
emoji = '🟢' if pct >= 75 else '🟡' if pct >= 50 else '🔴'
report.append(f"  {emoji} {pct:.1f}% of ${target:,} target")
report.append(f"  `{bar}`")
report.append("")

# Operations
report.append("━" * 35)
report.append("**🔧 OPERATIONS**")
report.append(f"  Active: {active_jobs} | Completed: {completed_this_month}")
report.append(f"  Needs invoicing: {len(requires_invoicing)} jobs")
report.append(f"  Upcoming: {len(upcoming)} scheduled")
report.append("")

# Top Clients
if top_clients:
    report.append("━" * 35)
    report.append("**🏆 TOP CLIENTS**")
    medals = ['🥇','🥈','🥉']
    for i, (name, rev) in enumerate(top_clients):
        report.append(f"  {medals[i]} {name} — ${rev:,.2f}")
    report.append("")

# Open Quotes
if draft_quotes or awaiting_quotes:
    report.append("━" * 35)
    report.append("**📋 OPEN QUOTES**")
    pending_total = sum(float(q.get('amounts',{}).get('total',0) or 0) for q in pending_quotes)
    report.append(f"  {len(draft_quotes)} draft + {len(awaiting_quotes)} awaiting = ${pending_total:,.2f}")
    report.append("")

# 3 Actions
report.append("━" * 35)
report.append("**🎯 3 PROFIT ACTIONS**")
report.append("")

if outstanding > 1000:
    report.append("**1. 🔴 Collect overdue payments**")
    report.append(f"   ${outstanding:,.2f} outstanding — prioritize collections")
elif draft_quotes or awaiting_quotes:
    rnames = [q.get('client',{}).get('name','') for q in (draft_quotes + awaiting_quotes)[:2]]
    report.append("**1. 📝 Close open quotes**")
    report.append(f"   {len(pending_quotes)} quotes pending — follow up on {', '.join(rnames)}")
else:
    report.append("**1. 🟢 Maintain pace**")
    report.append(f"   {pct:.1f}% of target — upsell existing clients")

report.append("")

if requires_invoicing:
    names = [j.get('title','') for j in requires_invoicing[:3]]
    report.append("**2. 🟡 Invoice completed work**")
    report.append(f"   {len(requires_invoicing)} jobs unpaid — invoice {', '.join(names)}")
else:
    report.append("**2. 🟢 Check quote pipeline**")
    report.append(f"   All jobs invoiced — review upcoming work")

report.append("")

if len(awaiting_quotes) > 0:
    anames = [q.get('client',{}).get('name','') for q in awaiting_quotes]
    report.append("**3. ⭐ Follow up awaiting quotes**")
    report.append(f"   {len(awaiting_quotes)} awaiting response — reach {', '.join(anames)}")
else:
    report.append("**3. ⭐ Generate new leads**")
    report.append(f"   Check service requests & past clients")

report.append("")
report.append("━" * 35)
report.append("*Next: Tomorrow 8 AM | Jobber CRM*")

print('\n'.join(report))
