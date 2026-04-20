#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Get current date
const now = new Date();
const dateStr = now.toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});
const timeStr = now.toLocaleTimeString('en-US', { 
  hour: '2-digit', 
  minute: '2-digit',
  hour12: true 
});

// Get data from jobber-integration.js
console.log('📊 Generating daily Jobber report...');

try {
  // Get summary data
  const summaryOutput = execSync('node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js summary', { encoding: 'utf8' });
  const summary = JSON.parse(summaryOutput);
  
  // Get today's visits
  const todayOutput = execSync('node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js today', { encoding: 'utf8' });
  const todayVisits = JSON.parse(todayOutput);
  
  // Get clients (first 5 for top clients)
  const clientsOutput = execSync('node /Users/jarvishstark/.openclaw/workspace/scripts/jobber-integration.js clients', { encoding: 'utf8' });
  const clients = JSON.parse(clientsOutput);
  
  // Calculate metrics
  const totalClients = summary.totalClients || 0;
  const activeJobs = summary.activeJobs || 0;
  const totalInvoices = summary.totalInvoices || 0;
  const totalRevenue = summary.totalRevenue || "$0.00";
  const outstandingRevenue = summary.outstandingRevenue || "$0.00";
  const todaysJobs = todayVisits.length || 0;

  // Monthly target
  const monthlyTarget = 20000;
  const currentRevenue = parseFloat((summary.totalRevenue || "$0").replace(/[^0-9.]/g, ''));
  const percentOfTarget = Math.round((currentRevenue / monthlyTarget) * 100);
  
  // Generate ASCII progress bar
  const barLength = 20;
  const filledBars = Math.round((percentOfTarget / 100) * barLength);
  const progressBar = '█'.repeat(filledBars) + '░'.repeat(barLength - filledBars);
  
  // Determine status emoji
  let statusEmoji = '🟢';
  if (percentOfTarget < 50) statusEmoji = '🔴';
  else if (percentOfTarget < 75) statusEmoji = '🟡';
  
  // Generate report
  const report = `
==================================================
# 📊 DAILY BUSINESS DASHBOARD - ${dateStr}
*Generated at ${timeStr} from Jobber data*

## 📈 BUSINESS OVERVIEW
**Total Clients:** ${totalClients}
**Active Jobs:** ${activeJobs}
**Open Invoices:** ${totalInvoices}
**Total Billed (All Invoices):** ${totalRevenue}
**Outstanding (Unpaid):** ${outstandingRevenue}
**Today's Scheduled Jobs:** ${todaysJobs}

## 💰 REVENUE STATUS
**Current:** $${currentRevenue.toLocaleString()} / $${monthlyTarget.toLocaleString()} target
${statusEmoji} **${percentOfTarget}%** of monthly target
${progressBar}

## 📅 TODAY'S SCHEDULE
${todaysJobs === 0 ? 'No jobs scheduled for today' : todayVisits.map((visit, i) => {
  const start = new Date(visit.startAt);
  const end = new Date(visit.endAt);
  const timeStr = start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${i+1}. **${visit.job.client.name}** - ${visit.job.title} (${timeStr})`;
}).join('\n')}

## 🎯 TOP 3 PROFIT ACTIONS FOR TODAY

1. **${todaysJobs > 0 ? '🟢 EXECUTE TODAY\'S JOBS' : '🔴 FIND NEW WORK'}**
   ${todaysJobs > 0 
     ? `*${todaysJobs} job${todaysJobs > 1 ? 's' : ''} scheduled today*`
     : '*No jobs scheduled for today*'}
   → ${todaysJobs > 0 
     ? 'Focus on quality execution and client satisfaction'
     : 'Reach out to 3 potential clients from leads list'}

2. **${parseFloat(outstandingRevenue.replace(/[^0-9.]/g, '')) > 1000 ? '🔴 COLLECT OUTSTANDING' : '🟢 MANAGE INVOICES'}**
   *${outstandingRevenue} outstanding*
   → ${parseFloat(outstandingRevenue.replace(/[^0-9.]/g, '')) > 1000 
     ? 'Follow up on 2 oldest invoices'
     : 'Send reminders for any invoices due this week'}

3. **${activeJobs > 30 ? '🟢 LEVERAGE WORKLOAD' : '🔴 BUILD PIPELINE'}**
   *${activeJobs} active jobs in progress*
   → ${activeJobs > 30 
     ? 'Ask top 3 clients for referrals'
     : 'Follow up on 2 pending quotes'}

---
*Data source: Jobber API - Real-time business data*
*Next report: Tomorrow 8:00 AM*
==================================================
`;

  console.log(report);
  
} catch (error) {
  console.error('❌ Error generating report:', error.message);
  
  // Fallback report if API fails
  const fallbackReport = `
==================================================
# 📊 DAILY BUSINESS DASHBOARD - ${dateStr}
*Generated at ${timeStr}*

## ⚠️ DATA UNAVAILABLE
Jobber API connection failed. Please check:
1. Token refresh status
2. Internet connection
3. Jobber service status

## 🎯 RECOMMENDED ACTIONS

1. **CHECK API CONNECTION**
   → Verify Jobber integration is working
   → Refresh authentication tokens

2. **MANUAL BUSINESS REVIEW**
   → Review today's scheduled jobs
   → Check outstanding invoices
   → Follow up with active clients

3. **SYSTEM MAINTENANCE**
   → Update integration scripts
   → Verify credential files
   → Test API connectivity

---
*Action required: Fix Jobber API connection*
*Contact: System administrator*
==================================================
`;
  
  console.log(fallbackReport);
}