#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

// Helper to run jobber integration script
function runJobberCommand(command) {
    try {
        const scriptPath = path.join(__dirname, 'jobber-integration.js');
        const result = execSync(`node "${scriptPath}" ${command}`, { encoding: 'utf8' });
        return JSON.parse(result);
    } catch (error) {
        console.error(`Error running ${command}:`, error.message);
        return null;
    }
}

// Generate ASCII bar chart
function generateBarChart(value, max, width = 20) {
    const percentage = value / max;
    const filled = Math.round(percentage * width);
    let bar = '';
    
    for (let i = 0; i < width; i++) {
        if (i < filled) {
            bar += '█';
        } else {
            bar += '░';
        }
    }
    
    return bar;
}

// Main function
async function main() {
    console.log('📊 Generating daily Jobber report from real data...');
    
    // Get summary data
    const summary = runJobberCommand('summary');
    if (!summary) {
        console.log('❌ Failed to get summary data');
        return;
    }
    
    // Get jobs data
    const jobs = runJobberCommand('jobs');
    
    // Get today's date
    const today = new Date();
    const todayStr = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Calculate monthly target (based on $20k target)
    const monthlyTarget = 20000;
    const revenue = parseFloat(summary.totalRevenue.replace('$', '').replace(',', ''));
    const revenuePercentage = (revenue / monthlyTarget) * 100;
    
    // Determine revenue status
    let revenueIndicator = '🟢';
    let revenueTrend = '📈';
    if (revenuePercentage < 60) {
        revenueIndicator = '🔴';
        revenueTrend = '📉';
    } else if (revenuePercentage < 80) {
        revenueIndicator = '🟡';
    }
    
    // Analyze jobs for top clients
    let topClients = [];
    if (jobs && Array.isArray(jobs)) {
        const clientRevenue = {};
        
        jobs.forEach(job => {
            if (job.client && job.client.name && job.total) {
                const clientName = job.client.name;
                const jobValue = parseFloat(job.total) || 0;
                
                if (!clientRevenue[clientName]) {
                    clientRevenue[clientName] = 0;
                }
                clientRevenue[clientName] += jobValue;
            }
        });
        
        // Sort and get top 3
        topClients = Object.entries(clientRevenue)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([name, revenue]) => ({ name, revenue }));
    }
    
    // Generate report
    let report = `# 📊 DAILY BUSINESS DASHBOARD - ${todayStr}\n`;
    report += `*Generated at 8:00 AM from Jobber data*\n\n`;
    
    // Revenue Section
    report += `## 💰 MONTHLY REVENUE\n`;
    report += `**${summary.totalRevenue}** / $${monthlyTarget.toLocaleString()} target\n`;
    report += `${revenueIndicator} ${revenueTrend} ${revenuePercentage.toFixed(1)}% of target\n`;
    report += `${generateBarChart(revenue, monthlyTarget)}\n\n`;
    
    // Key Metrics
    report += `## 📈 KEY METRICS\n`;
    report += `┌──────────────────────┬─────────────┐\n`;
    report += `│ Total Clients        │ ${summary.totalClients.toString().padStart(11)} │\n`;
    report += `│ Active Jobs          │ ${summary.activeJobs.toString().padStart(11)} │\n`;
    report += `│ Outstanding Revenue  │ ${summary.outstandingRevenue.padStart(11)} │\n`;
    report += `└──────────────────────┴─────────────┘\n\n`;
    
    // Invoice Aging (simplified)
    report += `## 📅 INVOICE STATUS\n`;
    report += `🟢 **${summary.outstandingRevenue} total outstanding**\n\n`;
    report += `*Note: Detailed aging requires invoice API access*\n\n`;
    
    // Top Clients
    if (topClients.length > 0) {
        report += `## 👑 TOP 3 CLIENTS (Recent Jobs)\n`;
        topClients.forEach((client, i) => {
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉';
            report += `${medal} **${client.name}** - $${client.revenue.toLocaleString()}\n`;
        });
        report += `\n`;
    }
    
    // Profit Actions
    report += `## 🎯 TOP 3 PROFIT ACTIONS FOR TODAY\n\n`;
    
    // Action 1: Revenue focus
    if (revenuePercentage < 70) {
        report += `1. **🔴 BOOST REVENUE**\n`;
        report += `   *Only ${revenuePercentage.toFixed(1)}% of monthly target*\n`;
        report += `   → Contact 2 clients for upsells\n\n`;
    } else {
        report += `1. **🟢 MAINTAIN MOMENTUM**\n`;
        report += `   *Revenue on track (${revenuePercentage.toFixed(1)}% of target)*\n`;
        report += `   → Schedule next month's work\n\n`;
    }
    
    // Action 2: Job completion
    if (summary.activeJobs > 50) {
        report += `2. **🟡 MANAGE WORKLOAD**\n`;
        report += `   *${summary.activeJobs} active jobs*\n`;
        report += `   → Review crew scheduling\n\n`;
    } else {
        report += `2. **🟢 STRENGTHEN CLIENT RELATIONS**\n`;
        report += `   *${summary.activeJobs} active jobs - manageable*\n`;
        report += `   → Send 3 thank-you messages\n\n`;
    }
    
    // Action 3: Collections
    const outstanding = parseFloat(summary.outstandingRevenue.replace('$', '').replace(',', ''));
    if (outstanding > 1000) {
        report += `3. **⭐ COLLECT OUTSTANDING**\n`;
        report += `   *${summary.outstandingRevenue} outstanding*\n`;
        report += `   → Follow up on 2 oldest invoices\n`;
    } else if (topClients.length > 0) {
        const topClient = topClients[0];
        report += `3. **⭐ LEVERAGE TOP CLIENT**\n`;
        report += `   *${topClient.name} spent $${topClient.revenue.toLocaleString()}*\n`;
        report += `   → Ask for 1 referral\n`;
    } else {
        report += `3. **⭐ BUILD CLIENT BASE**\n`;
        report += `   *${summary.totalClients} total clients*\n`;
        report += `   → Contact 2 new leads\n`;
    }
    
    report += `\n---\n`;
    report += `*Next report: Tomorrow 8:00 AM*\n`;
    report += `*Data source: Jobber API - ${summary.totalClients} clients, ${summary.activeJobs} active jobs*\n`;
    
    console.log(report);
    return report;
}

// Run if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('Error:', error);
        process.exit(1);
    });
}

module.exports = { main };