import PageLayout from '@/components/PageLayout'
import { Brain, DollarSign, Calendar, Users, Activity, Clock, Settings, FileText, Play, Zap } from 'lucide-react'

const agents = [
  {
    name: 'Jarvis',
    role: 'Master Orchestrator',
    status: 'active' as const,
    lastSeen: '2 min ago',
    activeTasks: 3,
    totalActions: 2847,
    uptime: '99.9%',
    gradient: 'from-blue-500 to-indigo-600',
    glowColor: 'shadow-blue-500/20',
    textColor: 'text-blue-400',
    bgAccent: 'bg-blue-500/10',
    borderAccent: 'border-blue-500/20',
    Icon: Brain,
    capabilities: ['Orchestration', 'Planning', 'Memory Mgmt', 'Task Routing', 'Monitoring'],
    recentActivity: [
      { action: 'Processed invoice batch (7 items)', time: '2m ago' },
      { action: 'Updated Obsidian memory system', time: '15m ago' },
      { action: 'Ran QuickBooks sync handoff', time: '1h ago' },
    ],
    sparkline: 'M0,35 L14,28 L28,22 L42,26 L56,15 L70,18 L84,9 L100,11',
  },
  {
    name: 'Jordan',
    role: 'Finance Agent',
    status: 'active' as const,
    lastSeen: '6:05 AM',
    activeTasks: 5,
    totalActions: 1203,
    uptime: '99.7%',
    gradient: 'from-emerald-500 to-green-600',
    glowColor: 'shadow-emerald-500/20',
    textColor: 'text-emerald-400',
    bgAccent: 'bg-emerald-500/10',
    borderAccent: 'border-emerald-500/20',
    Icon: DollarSign,
    capabilities: ['QuickBooks Sync', 'Invoice Processing', 'Financial Reports', 'Expense Tracking'],
    recentActivity: [
      { action: 'Reconciled QuickBooks accounts', time: '6m ago' },
      { action: 'Generated April revenue report', time: '32m ago' },
      { action: 'Processed 7 overdue invoices', time: '2h ago' },
    ],
    sparkline: 'M0,30 L14,26 L28,14 L42,19 L56,7 L70,4 L84,2 L100,1',
  },
  {
    name: 'Donna',
    role: 'Scheduling Agent',
    status: 'inactive' as const,
    lastSeen: 'Yesterday',
    activeTasks: 0,
    totalActions: 847,
    uptime: '—',
    gradient: 'from-purple-500 to-violet-600',
    glowColor: 'shadow-purple-500/20',
    textColor: 'text-purple-400',
    bgAccent: 'bg-purple-500/10',
    borderAccent: 'border-purple-500/20',
    Icon: Calendar,
    capabilities: ['Calendar Mgmt', 'Meeting Scheduling', 'Crew Coordination', 'Reminders'],
    recentActivity: [
      { action: 'Scheduled weekly team standup', time: 'Yesterday' },
      { action: 'Sent reminder to field crew', time: 'Yesterday' },
      { action: 'Updated April job calendar', time: '2 days ago' },
    ],
    sparkline: 'M0,25 L14,22 L28,28 L42,20 L56,30 L70,24 L84,32 L100,29',
  },
  {
    name: 'Jerry',
    role: 'Sales Agent',
    status: 'inactive' as const,
    lastSeen: '2 days ago',
    activeTasks: 0,
    totalActions: 412,
    uptime: '—',
    gradient: 'from-orange-500 to-amber-500',
    glowColor: 'shadow-orange-500/20',
    textColor: 'text-orange-400',
    bgAccent: 'bg-orange-500/10',
    borderAccent: 'border-orange-500/20',
    Icon: Users,
    capabilities: ['Lead Qualification', 'Quote Generation', 'Follow-up Sequences', 'CRM Updates'],
    recentActivity: [
      { action: 'Followed up with Reese R on quote', time: '2 days ago' },
      { action: 'Updated 3 CRM records', time: '2 days ago' },
      { action: 'Generated landscaping estimate', time: '3 days ago' },
    ],
    sparkline: 'M0,30 L14,34 L28,27 L42,32 L56,24 L70,29 L84,26 L100,33',
  },
]

const statusConfig = {
  active: { label: 'Active', dot: 'bg-green-500', text: 'text-green-400', bg: 'bg-green-500/10' },
  inactive: { label: 'Sleeping', dot: 'bg-gray-400', text: 'text-gray-400', bg: 'bg-gray-500/10' },
  error: { label: 'Error', dot: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/10' },
}

export default function AgentsPage() {
  const activeCount = agents.filter((a) => a.status === 'active').length
  const totalTasks = agents.reduce((sum, a) => sum + a.activeTasks, 0)
  const totalActions = agents.reduce((sum, a) => sum + a.totalActions, 0)

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agents</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {agents.length} agents configured · {activeCount} active now
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          <Play className="h-4 w-4" />
          Deploy Agent
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Active Now', value: activeCount, icon: Activity, color: 'text-green-500' },
          { label: 'Running Tasks', value: totalTasks, icon: FileText, color: 'text-blue-500' },
          { label: 'Actions Today', value: totalActions.toLocaleString(), icon: Zap, color: 'text-purple-500' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4 flex items-center gap-4"
          >
            <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {agents.map((agent) => {
          const sc = statusConfig[agent.status]
          return (
            <div
              key={agent.name}
              className={`rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-lg dark:hover:shadow-xl ${agent.glowColor} transition-all duration-200`}
            >
              {/* Gradient Header */}
              <div className={`relative bg-gradient-to-br ${agent.gradient} p-5 overflow-hidden`}>
                {/* Sparkline background */}
                <svg
                  viewBox="0 0 100 40"
                  className="absolute bottom-0 left-0 right-0 w-full h-14 opacity-20"
                  preserveAspectRatio="none"
                >
                  <path
                    d={agent.sparkline}
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-1 ring-white/30">
                      <agent.Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                      <p className="text-sm text-white/70">{agent.role}</p>
                    </div>
                  </div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white`}>
                    <div
                      className={`h-1.5 w-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-300 animate-pulse' : 'bg-white/50'}`}
                    />
                    {sc.label}
                  </div>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 divide-x divide-gray-100 dark:divide-gray-800 border-b border-gray-100 dark:border-gray-800">
                {[
                  { label: 'Active Tasks', value: agent.activeTasks, Icon: Activity },
                  { label: 'Total Actions', value: agent.totalActions.toLocaleString(), Icon: Zap },
                  { label: 'Uptime', value: agent.uptime, Icon: Clock },
                ].map((metric) => (
                  <div key={metric.label} className="px-4 py-3 text-center">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{metric.label}</p>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Capabilities */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Capabilities
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${agent.bgAccent} ${agent.textColor} border ${agent.borderAccent}`}
                      >
                        {cap}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                    Recent Activity
                  </p>
                  <div className="space-y-2">
                    {agent.recentActivity.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${agent.textColor.replace('text', 'bg')}`} />
                        <p className="text-sm text-gray-700 dark:text-gray-300 flex-1 leading-snug">
                          {item.action}
                        </p>
                        <span className="text-xs text-gray-400 dark:text-gray-500 shrink-0 tabular-nums">
                          {item.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
                <button className="flex-1 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Logs
                </button>
                <button className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${agent.bgAccent} ${agent.textColor} hover:opacity-80`}>
                  <Settings className="h-4 w-4" />
                  Configure
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}
