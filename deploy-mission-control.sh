#!/bin/bash
echo "🚀 DEPLOYING MISSION CONTROL - ALL TABS FUNCTIONAL"
echo "=================================================="
echo "Time: $(date)"
echo ""

echo "📁 Creating deployment package..."
mkdir -p /tmp/mission-control-deploy

# Create the complete HTML file
cat > /tmp/mission-control-deploy/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mission Control – Evergreen Landscaping</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
        :root {
            --primary: #10b981; --primary-dark: #059669; --secondary: #3b82f6;
            --danger: #ef4444; --warning: #f59e0b; --success: #10b981;
            --gray-50: #f9fafb; --gray-100: #f3f4f6; --gray-200: #e5e7eb;
            --gray-800: #1f2937; --gray-900: #111827;
        }
        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        
        /* Header */
        .header { background: white; border-radius: 20px; padding: 25px 30px; margin-bottom: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .logo { display: flex; align-items: center; gap: 12px; }
        .logo-icon { width: 40px; height: 40px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; }
        .logo-text h1 { font-size: 24px; font-weight: 800; }
        .logo-text p { color: var(--gray-600); font-size: 14px; }
        .status-badge { background: var(--success); color: white; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; }
        
        /* Tabs */
        .tabs { display: flex; gap: 5px; background: var(--gray-100); padding: 6px; border-radius: 10px; margin-top: 15px; overflow-x: auto; }
        .tab { padding: 10px 20px; border-radius: 8px; border: none; background: transparent; color: var(--gray-600); font-weight: 600; font-size: 14px; cursor: pointer; white-space: nowrap; }
        .tab:hover { background: var(--gray-200); }
        .tab.active { background: white; color: var(--primary); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        
        /* Content */
        .content { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); min-height: 500px; }
        .tab-content { display: none; }
        .tab-content.active { display: block; animation: fadeIn 0.3s; }
        
        /* Dashboard */
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat { background: var(--gray-50); border-radius: 12px; padding: 20px; border: 1px solid var(--gray-200); }
        .stat-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
        .stat-title { font-size: 14px; color: var(--gray-600); font-weight: 600; }
        .stat-value { font-size: 32px; font-weight: 800; color: var(--gray-900); }
        .stat-change { font-size: 13px; font-weight: 600; }
        .change-up { color: var(--success); }
        .change-down { color: var(--danger); }
        .alert { background: #fef3c7; border: 1px solid #fbbf24; color: #92400e; }
        
        /* Agents */
        .agents-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .agent { background: var(--gray-50); border-radius: 12px; padding: 20px; border: 1px solid var(--gray-200); }
        .agent-header { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
        .agent-avatar { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; }
        .agent-info h3 { font-size: 16px; font-weight: 700; }
        .agent-info p { font-size: 13px; color: var(--gray-600); }
        .agent-status { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .status-active { background: #d1fae5; color: #065f46; }
        .status-inactive { background: #f3f4f6; color: var(--gray-600); }
        
        /* Tasks */
        .task-list { display: flex; flex-direction: column; gap: 15px; }
        .task { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: var(--gray-50); border-radius: 10px; border: 1px solid var(--gray-200); }
        .task-content h4 { font-size: 15px; font-weight: 600; margin-bottom: 5px; }
        .task-content p { font-size: 13px; color: var(--gray-600); }
        .task-priority { padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .priority-critical { background: #fee2e2; color: #991b1b; }
        .priority-high { background: #fef3c7; color: #92400e; }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        
        @media (max-width: 768px) {
            .container { padding: 10px; }
            .header { padding: 20px; }
            .content { padding: 20px; }
            .tabs { padding: 4px; }
            .tab { padding: 8px 16px; font-size: 13px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-top">
                <div class="logo">
                    <div class="logo-icon">🌲</div>
                    <div class="logo-text">
                        <h1>Mission Control</h1>
                        <p>Evergreen Landscaping AI Operations</p>
                    </div>
                </div>
                <div class="status-badge">All Systems Operational ●</div>
            </div>
            
            <!-- Tabs -->
            <div class="tabs">
                <button class="tab active" data-tab="dashboard">📊 Dashboard</button>
                <button class="tab" data-tab="agents">🤖 Agents</button>
                <button class="tab" data-tab="tasks">📋 Tasks</button>
                <button class="tab" data-tab="analytics">📈 Analytics</button>
                <button class="tab" data-tab="memory">🧠 Memory</button>
                <button class="tab" data-tab="tools">🔧 Tools</button>
                <button class="tab" data-tab="team">👥 Team</button>
                <button class="tab" data-tab="settings">⚙️ Settings</button>
            </div>
        </div>
        
        <!-- Content -->
        <div class="content">
            <!-- Dashboard Tab -->
            <div id="dashboard" class="tab-content active">
                <h2 style="margin-bottom: 25px; font-size: 22px; font-weight: 800;">Business Overview</h2>
                
                <div class="stats-grid">
                    <div class="stat">
                        <div class="stat-header">
                            <div class="stat-title">Total Clients</div>
                            <div class="stat-change change-up">↑ 12%</div>
                        </div>
                        <div class="stat-value">151</div>
                        <p style="color: var(--gray-600); font-size: 13px; margin-top: 8px;">Evergreen Landscaping</p>
                    </div>
                    
                    <div class="stat">
                        <div class="stat-header">
                            <div class="stat-title">Active Jobs</div>
                            <div class="stat-change change-up">↑ 8%</div>
                        </div>
                        <div class="stat-value">64</div>
                        <p style="color: var(--gray-600); font-size: 13px; margin-top: 8px;">Currently in progress</p>
                    </div>
                    
                    <div class="stat">
                        <div class="stat-header">
                            <div class="stat-title">Monthly Revenue</div>
                            <div class="stat-change change-up">↑ 15%</div>
                        </div>
                        <div class="stat-value">$9,757</div>
                        <p style="color: var(--gray-600); font-size: 13px; margin-top: 8px;">This month</p>
                    </div>
                    
                    <div class="stat alert">
                        <div class="stat-header">
                            <div class="stat-title">Low Margin Alerts</div>
                            <div class="stat-change change-down">⚠️</div>
                        </div>
                        <div class="stat-value">40</div>
                        <p style="color: #92400e; font-size: 13px; margin-top: 8px;">Jobs below threshold</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 15px;">Recent Activity</h3>
                    <div style="background: var(--gray-50); border-radius: 10px; padding: 20px; border: 1px solid var(--gray-200);">
                        <p style="color: var(--gray-600); font-size: 14px;">✅ Jordan created daily briefing at 6:05 AM</p>
                        <p style="color: var(--gray-600); font-size: 14px; margin-top: 8px;">🚨 40 low-margin jobs identified - action required</p>
                        <p style="color: var(--gray-600); font-size: 14px; margin-top: 8px;">🤖 Donna agent ready for activation</p>
                        <p style="color: var(--gray-600); font-size: 14px; margin-top: 8px;">📊 Mission Control updated with real data</p>
                        <p style="color: var(--gray-600); font-size: 14px; margin-top: 8px;">⏰ 30-minute progress cron job active</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button onclick="refreshData()" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 14px;">
                        🔄 Refresh Live Data
                    </button>
                    <p id="timestamp" style="color: var(--gray-600); font-size: 13px; margin-top: 10px;">Last updated: Loading...</p>
                </div>
            </div>
            
            <!-- Agents Tab -->
            <div id="agents" class="tab-content">
                <h2 style="margin-bottom: 25px; font-size: 22px; font-weight: 800;">AI Agent Team</h2>
                
                <div class="agents-grid">
                    <div class="agent">
                        <div class="agent-header">
                            <div class="agent-avatar" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">J</div>
                            <div class="agent-info">
                                <h3>Jarvis 2.0</h3>
                                <p>Master Orchestrator</p>
                            </div>
                        </div>
                        <div class="agent-status status-active">Active</div>
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">3</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Active Tasks</div>
                            </div>
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">2m ago</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Last Activity</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="agent">
                        <div class="agent-header">
                            <div class="agent-avatar" style="background: linear-gradient(135deg, #10b981, #059669);">$</div>
                            <div class="agent-info">
                                <h3>Jordan</h3>
                                <p>Finance Agent</p>
                            </div>
                        </div>
                        <div class="agent-status status-active">Active</div>
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">5</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Tasks</div>
                            </div>
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">6:05 AM</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Last Run</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="agent">
                        <div class="agent-header">
                            <div class="agent-avatar" style="background: linear-gradient(135deg, #f59e0b, #d97706);">📅</div>
                            <div class="agent-info">
                                <h3>Donna</h3>
                                <p>Scheduling Agent</p>
                            </div>
                        </div>
                        <div class="agent-status status-inactive">Ready</div>
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">0</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Tasks</div>
                            </div>
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">Ready</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Status</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="agent">
                        <div class="agent-header">
                            <div class="agent-avatar" style="background: linear-gradient(135deg, #ef4444, #dc2626);">📞</div>
                            <div class="agent-info">
                                <h3>Jerry</h3>
                                <p>Sales Agent</p>
                            </div>
                        </div>
                        <div class="agent-status status-inactive">Inactive</div>
                        <div style="margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">0</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Tasks</div>
                            </div>
                            <div>
                                <div style="font-size: 18px; font-weight: 700;">2 days</div>
                                <div style="font-size: 12px; color: var(--gray-600);">Last Activity</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
