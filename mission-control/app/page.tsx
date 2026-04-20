import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import AgentCard from '@/components/AgentCard'
import StatCard from '@/components/StatCard'
import { Cpu, Users, FileText, DollarSign, Zap, Clock, Activity, BarChart, Terminal, Brain, Calendar, Settings } from 'lucide-react'

export default function Home() {
  const agents = [
    {
      name: 'Jarvis',
      role: 'Master Orchestrator',
      status: 'active' as const,
      lastActivity: '2 min ago',
      tasks: 3,
      icon: <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
    },
    {
      name: 'Jordan',
      role: 'Finance Agent',
      status: 'active' as const,
      lastActivity: '6:05 AM',
      tasks: 5,
      icon: <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
    },
    {
      name: 'Donna',
      role: 'Scheduling Agent',
      status: 'inactive' as const,
      lastActivity: 'Yesterday',
      tasks: 0,
      icon: <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
    },
    {
      name: 'Jerry',
      role: 'Sales Agent',
      status: 'inactive' as const,
      lastActivity: '2 days ago',
      tasks: 0,
      icon: <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
    },
  ]

  const stats = [
    {
      title: 'Total Clients',
      value: '151',
      change: 12,
      icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      description: 'Evergreen Landscaping'
    },
    {
      title: 'Active Jobs',
      value: '64',
      change: 8,
      icon: <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />,
      description: 'Currently in progress'
    },
    {
      title: 'Revenue',
      value: '$8,292',
      change: 15,
      icon: <DollarSign className="h-5 w-5 text-purple-600 dark:text-purple-400" />,
      description: 'This month'
    },
    {
      title: 'Automation Rate',
      value: '42%',
      change: 25,
      icon: <Zap className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      description: 'Tasks handled by AI'
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
    <>
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Good afternoon, Hunter</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Your AI agents are monitoring 64 active jobs and $8,292 in revenue.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Agents */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI Agents</h2>
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View all →
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agents.map((agent, index) => (
                    <AgentCard key={index} {...agent} />
                  ))}
                </div>
              </div>

              {/* Recent Tasks */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Tasks</h2>
                  <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Create new →
                  </button>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                        {recentTasks.map((task) => (
                          <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500 dark:text-gray-400">{task.agent}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.status === 'completed' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : task.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}>
                                {task.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.priority === 'critical'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                  : task.priority === 'high'
                                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              }`}>
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

            {/* Right Column - System Health & Quick Actions */}
            <div className="space-y-8">
              {/* System Health */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Health</h2>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                  <div className="space-y-4">
                    {systemHealth.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${
                            item.status === 'healthy' ? 'bg-green-500' :
                            item.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.component}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.latency}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last updated</span>
                      <span className="font-medium text-gray-900 dark:text-white">Just now</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition-shadow text-left group">
                    <Terminal className="h-5 w-5 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">New Tool</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Build custom automation</p>
                  </button>
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition-shadow text-left group">
                    <BarChart className="h-5 w-5 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Report</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generate insights</p>
                  </button>
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition-shadow text-left group">
                    <Settings className="h-5 w-5 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Configure</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">System settings</p>
                  </button>
                  <button className="rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition-shadow text-left group">
                    <Zap className="h-5 w-5 text-gray-400 dark:text-gray-500 mb-2" />
                    <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Automate</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create workflow</p>
                  </button>
                </div>
              </div>

              {/* Memory Status */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Memory System</h2>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Obsidian Vault</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">iCloud sync active</p>
                      </div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Daily logs</span>
                      <span className="font-medium text-gray-900 dark:text-white">7 files</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Checkpoints</span>
                      <span className="font-medium text-gray-900 dark:text-white">42 today</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last sync</span>
                      <span className="font-medium text-gray-900 dark:text-white">2 min ago</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                    View vault →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}