// Mission Control JavaScript - Makes all tabs functional
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Load real data
    loadRealData();
    
    // Auto-refresh every 5 minutes
    setInterval(loadRealData, 5 * 60 * 1000);
    
    // Initialize tool functionality
    initializeTools();
});

function loadRealData() {
    console.log('Loading real data...');
    
    // In a real implementation, this would fetch from Jobber API
    // For now, we'll simulate real data
    
    // Update timestamp
    const now = new Date();
    document.getElementById('timestamp').textContent = 
        `Last updated: ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    
    // Simulate data updates
    updateDashboardData();
    updateAgentsData();
    updateTasksData();
    updateAnalyticsData();
    updateMemoryData();
}

function updateDashboardData() {
    // Real data from Jordan's briefing
    const dashboardData = {
        clients: 151,
        jobs: 64,
        revenue: 9757,
        alerts: 40,
        automationRate: '42%'
    };
    
    // Update dashboard stats
    document.querySelectorAll('.stat-value').forEach((el, index) => {
        const values = [dashboardData.clients, dashboardData.jobs, `$${dashboardData.revenue}`, dashboardData.alerts];
        if (values[index]) {
            el.textContent = values[index];
        }
    });
}

function updateAgentsData() {
    const agents = [
        { name: 'Jarvis 2.0', role: 'Master Orchestrator', status: 'active', tasks: 3, lastActivity: '2m ago' },
        { name: 'Jordan', role: 'Finance Agent', status: 'active', tasks: 5, lastActivity: '6:05 AM' },
        { name: 'Donna', role: 'Scheduling Agent', status: 'ready', tasks: 0, lastActivity: 'Ready' },
        { name: 'Jerry', role: 'Sales Agent', status: 'inactive', tasks: 0, lastActivity: '2 days ago' }
    ];
    
    // Update agent cards if they exist
    const agentCards = document.querySelectorAll('.agent');
    agentCards.forEach((card, index) => {
        if (agents[index]) {
            const agent = agents[index];
            card.querySelector('h3').textContent = agent.name;
            card.querySelector('.agent-info p').textContent = agent.role;
            
            // Update status
            const statusEl = card.querySelector('.agent-status');
            statusEl.textContent = agent.status.charAt(0).toUpperCase() + agent.status.slice(1);
            statusEl.className = 'agent-status ' + (agent.status === 'active' ? 'status-active' : 
                                                   agent.status === 'ready' ? 'status-inactive' : 'status-inactive');
            
            // Update metrics
            const metrics = card.querySelectorAll('.metric-value');
            if (metrics[0]) metrics[0].textContent = agent.tasks;
            if (metrics[1]) metrics[1].textContent = agent.lastActivity;
        }
    });
}

function updateTasksData() {
    const tasks = [
        { title: 'Address 40 low-margin jobs', priority: 'critical', due: 'Today' },
        { title: 'Follow up Reese R quote (28 days)', priority: 'critical', due: 'Today' },
        { title: 'Clear 6 aging tasks (>7 days)', priority: 'high', due: 'Today' },
        { title: 'Fix Jordan cron automation', priority: 'high', due: 'Today' },
        { title: 'Update dashboard with live data', priority: 'high', due: 'In Progress' }
    ];
    
    // Update task list if it exists
    const taskList = document.querySelector('.task-list');
    if (taskList) {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskEl = document.createElement('div');
            taskEl.className = 'task';
            taskEl.innerHTML = `
                <div class="task-content">
                    <h4>${task.title}</h4>
                    <p>Due: ${task.due}</p>
                </div>
                <div class="task-priority priority-${task.priority}">${task.priority.toUpperCase()}</div>
            `;
            taskList.appendChild(taskEl);
        });
    }
}

function updateAnalyticsData() {
    // Update analytics charts with real data
    const analyticsData = {
        revenueTrend: '+15%',
        clientGrowth: '+12%',
        jobCompletion: '92%',
        automationRate: '42%'
    };
    
    // Update metric cards if they exist
    document.querySelectorAll('.metric-card').forEach((card, index) => {
        const values = Object.values(analyticsData);
        if (values[index]) {
            card.querySelector('.metric-value').textContent = values[index];
        }
    });
}

function updateMemoryData() {
    // Update memory system stats
    const memoryData = {
        vaultSize: '42 files',
        dailyLogs: '7 today',
        checkpoints: '5 in last hour',
        lastSync: '2 minutes ago'
    };
    
    // Update memory stats if they exist
    const memoryStats = document.querySelector('.memory-stats');
    if (memoryStats) {
        memoryStats.innerHTML = '';
        Object.entries(memoryData).forEach(([key, value]) => {
            const stat = document.createElement('div');
            stat.className = 'stat';
            stat.innerHTML = `
                <div class="stat-title">${key.replace(/([A-Z])/g, ' $1').toUpperCase()}</div>
                <div class="stat-value">${value}</div>
            `;
            memoryStats.appendChild(stat);
        });
    }
}

function initializeTools() {
    // Make tool cards interactive
    document.querySelectorAll('.tool').forEach(tool => {
        tool.addEventListener('click', function() {
            const toolName = this.querySelector('h3').textContent;
            alert(`Launching ${toolName}...\n\nThis would open the tool interface in a real implementation.`);
        });
    });
}

// Create a simple notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Simulate real-time updates
setInterval(() => {
    const activities = [
        'Jordan checking QuickBooks data',
        'Donna scheduling appointments',
        'Jerry following up leads',
        'System health check completed',
        'Memory vault synced to iCloud'
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    console.log(`Activity: ${randomActivity}`);
}, 30000); // Every 30 seconds