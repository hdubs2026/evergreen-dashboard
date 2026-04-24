import PageLayout from '@/components/PageLayout'
import AgentCard from '@/components/AgentCard'
import StatCard from '@/components/StatCard'
import {
  Cpu,
  Users,
  FileText,
  DollarSign,
  Zap,
  Activity,
  BarChart,
  Terminal,
  Brain,
  Calendar,
  Settings,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'

export default function Home() {
  const agents = [
    {
      name: 'Jarvis',
      role: 'Master Orchestrator',
      status: 'active' as const,
      lastActivity: '2 min ago',
      tasks: 3,
      icon: <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
    },
    {
      name: 'Jordan',
      role: 'Finance Agent',
      status: 'active' as const,
      lastActivity: '6:05 AM',
      tasks: 5,
      icon: <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      name: 'Donna',
      role: 'Scheduling Agent',
      status: 'inactive' as const,
      lastActivity: 'Yesterday',
      tasks: 0,
      icon: <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
    },
    {
      name: 'Jerry',
      role: 'Sales Agent',
      status: 'inactive' as const,
      lastActivity: '2 days ago',
      tasks: 0,
      icon: <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
    },
  ]

  const stats = [
    {
      title: 'Total Clients',
      value: '151',
      change: 12,
      icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      description: 'Evergreen Landscaping',
    },
    {
      title: 'Active Jobs',
      value: '64',
      change: 8,
      icon: <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
      description: 'Currently in progress',
    },
    {
      title: 'Revenue',
      value: '$8,292',
      change: 15,
      icon: <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      description: 'This month',
    },
    {
      title: 'Automation Rate',
      value: '42%',
      change: 25,
      icon: <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      description: 'Tasks handled by AI',
    },
  ]

  const recentTasks = [
    { id: 1, title: 'Process overdue invoices', agent: 'Jordan', status: 'in-progress', priority: 'high' },
    { id: 2, title: 'Follow up Reese R quote', agent: 'Jerry', status: 'pending', priority: 'critical' },
    { id: 3, title: 'Schedule weekly team meeting', agent: 'Donna', status: 'completed', priority: 'medium' },
    { id: 4, title: 'Update Obsidian memory system', agent: 'Jarvis', status: 'completed', priority: 'high' },
    { id: 5, title: 'Test QuickBooks integration', agent: 'Jordan', status: 'in-progress', priority: 'medium' },
  ]

  const systemHealth = [
    { component: 'Jobber API', status: 'healthy', latency: '120ms' },
    { component: 'QuickBooks', status: 'healthy', latency: '240ms' },
    { component: 'Google Sheets', status: 'degraded', latency: '520ms' },
    { component: 'Discord Bot', status: 'healthy', latency: '180ms' },
    { component: 'Obsidian Vault', status: 'healthy', latency: '90ms' },
  ]

  return (
    <PageLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Good afternoon, Hunter</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              2 agents active · 8 tasks running · $8,292 revenue this month
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">+15% vs last month</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-7">
          {/* Agents */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">AI Agents</h2>
              <a
                href="/agents"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {agents.map((agent, index) => (
                <AgentCard key={index} {...agent} />
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
              <a
                href="/tasks"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-800">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50">
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-3 text-left text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                    {recentTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{task.agent}</div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              task.status === 'completed'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : task.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                            }`}
                          >
                            {task.status}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              task.priority === 'critical'
                                ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                : task.priority === 'high'
                                ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400'
                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-7">
          {/* System Health */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">System Health</h2>
              <a
                href="/tools"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                All tools
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <div className="space-y-3.5">
                {systemHealth.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.status === 'healthy'
                            ? 'bg-green-500'
                            : item.status === 'degraded'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.component}</span>
                    </div>
                    <span
                      className={`text-xs font-mono font-semibold ${
                        item.status === 'degraded'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {item.latency}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-gray-400 dark:text-gray-500">Last checked</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">Just now</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Terminal, label: 'New Tool', desc: 'Build automation', href: '/tools' },
                { icon: BarChart, label: 'Report', desc: 'Generate insights', href: '#' },
                { icon: Settings, label: 'Configure', desc: 'System settings', href: '/settings' },
                { icon: Zap, label: 'Automate', desc: 'Create workflow', href: '/tools' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all text-left group block"
                >
                  <action.icon className="h-4 w-4 text-gray-400 dark:text-gray-500 mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{action.label}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{action.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Memory Status */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">Memory System</h2>
              <a
                href="/memory"
                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
              >
                Open vault
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Obsidian Vault</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">iCloud sync active</p>
                  </div>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-2.5">
                {[
                  { label: 'Daily logs', value: '7 files' },
                  { label: 'Checkpoints', value: '42 today' },
                  { label: 'Last sync', value: '2 min ago' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm">
                    <span className="text-gray-400 dark:text-gray-500">{row.label}</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
