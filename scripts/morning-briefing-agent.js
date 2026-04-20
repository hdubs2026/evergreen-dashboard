#!/usr/bin/env node

/**
 * Morning Briefing Agent
 * 
 * This agent generates the morning briefing when triggered by cron job.
 * It reads tasks from todo.md and generates a comprehensive briefing.
 */

const fs = require('fs');
const path = require('path');

// Read the enhanced briefing script
const briefingScript = require('./morning-briefing-enhanced.js');

// Main function
async function generateMorningBriefing() {
    try {
        console.log('🔄 Generating morning briefing...');
        
        // Generate the briefing
        const briefing = briefingScript.generateBriefing();
        
        console.log('✅ Briefing generated successfully');
        console.log('📊 Briefing length:', briefing.length, 'characters');
        console.log('📋 Tasks included:', briefingScript.getUncompletedTasks().length);
        
        // Output the briefing (will be captured by OpenClaw)
        console.log('\n' + '='.repeat(60) + '\n');
        console.log(briefing);
        console.log('\n' + '='.repeat(60) + '\n');
        
        // Also save to file for record keeping
        const date = new Date().toISOString().split('T')[0];
        const briefingFile = path.join(__dirname, `../memory/briefing-${date}.md`);
        fs.writeFileSync(briefingFile, briefing);
        console.log('💾 Briefing saved to:', briefingFile);
        
        return briefing;
        
    } catch (error) {
        console.error('❌ Error generating briefing:', error);
        
        // Fallback briefing if something goes wrong
        const fallbackBriefing = `# 🌅 Morning Briefing - ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

*Generated at ${new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' })}*

## ⚠️ System Notice
The automated briefing system encountered an error. Please check the task tracking system manually.

## 📋 Manual Task Check
Please review \`/tasks/todo.md\` for uncompleted tasks from previous days.

## 🤖 AI Back Office Status
All systems operational. Agents are active and monitoring.

---

*Contact @OpenClaw for assistance with the briefing system.*`;
        
        console.log('\n' + '='.repeat(60) + '\n');
        console.log(fallbackBriefing);
        console.log('\n' + '='.repeat(60) + '\n');
        
        return fallbackBriefing;
    }
}

// Handle command line execution
if (require.main === module) {
    generateMorningBriefing().then(() => {
        process.exit(0);
    }).catch(error => {
        console.error('Fatal error:', error);
        process.exit(1);
    });
}

module.exports = { generateMorningBriefing };