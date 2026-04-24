import PageLayout from '@/components/PageLayout'
import {
  Terminal,
  Plus,
  Link2,
  DollarSign,
  Table,
  MessageSquare,
  Brain,
  CheckCircle,
  AlertTriangle,
  Play,
  Settings,
  Zap,
} from 'lucide-react'

const integrations = [
  {
    name: 'Jobber API',
    description: 'Job management, client data, crew scheduling and invoicing',
    status: 'healthy' as const,
    latency: '120ms',
    authType: 'OAuth 2.0',
    lastSync: '2 min ago',
    Icon: Link2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    name: 'QuickBooks',
    description: 'Invoicing, payments, P&L reports and expense tracking',
    status: 'healthy' as const,
    latency: '240ms',
    authType: 'API Key',
    lastSync: '5 min ago',
    Icon: DollarSign,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    name: 'Google Sheets',
    description: 'Data exports, shared reports and team tracking dashboards',
    status: 'degraded' as const,
    latency: '520ms',
    authType: 'Service Account',
    lastSync: '12 min ago',
    Icon: Table,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    name: 'Discord Bot',
    description: 'Team notifications, agent alerts and slash command interface',
    status: 'healthy' as const,
    latency: '180ms',
    authType: 'Bot Token',
    lastSync: '1 min ago',
    Icon: MessageSquare,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10',
  },
  {
    name: 'Obsidian Vault',
    description: 'AI memory system, decision logs and agent checkpoints',
    status: 'healthy' as const,
    latency: '90ms',
    authType: 'Local Sync',
    lastSync: 'Just now',
    Icon: Brain,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
]

const tools = [
  {
    name: 'Invoice Processor',
    description: 'Automatically process and send invoices via Jobber → QuickBooks',
    status: 'active' as const,
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    runs: 42,
    lastRun: '2h ago',
    category: 'Finance',
  },
  {
    name: 'Quote Follow-up',
    description: 'Monitor pending quotes and trigger follow-up sequences at optimal intervals',
    status: 'active' as const,
    agent: 'Jerry',
    agentColor: 'bg-orange-500',
    runs: 18,
    lastRun: '2 days ago',
    category: 'Sales',
  },
  {
    name: 'Memory Sync',
    description: 'Sync agent decision logs and checkpoints to Obsidian vault via iCloud',
    status: 'active' as const,
    agent: 'Jarvis',
    agentColor: 'bg-blue-500',
    runs: 247,
    lastRun: '2 min ago',
    category: 'System',
  },
  {
    name: 'Schedule Coordinator',
    description: 'Cross-reference Jobber jobs with crew availability and notify teams',
    status: 'inactive' as const,
    agent: 'Donna',
    agentColor: 'bg-purple-500',
    runs: 12,
    lastRun: 'Yesterday',
    category: 'Scheduling',
  },
  {
    name: 'Financial Report',
    description: 'Generate weekly P&L summaries from QuickBooks and post digest to Discord',
    status: 'inactive' as const,
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    runs: 8,
    lastRun: '7 days ago',
    category: 'Finance',
  },
]

const statusConfig = {
  healthy: { label: 'Healthy', Icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10 text-green-700 dark:text-green-400' },
  degraded: { label: 'Degraded', Icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' },
  down: { label: 'Down', Icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10 text-red-700 dark:text-red-400' },
}

export default function ToolsPage() {
  const activeTools = tools.filter((t) => t.status === 'active').length
  const healthyIntegrations = integrations.filter((i) => i.status === 'healthy').length

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tools & Integrations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {integrations.length} integrations · {healthyIntegrations} healthy · {activeTools} tools active
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Build Tool
        </button>
      </div>

      {/* Build New Tool CTA */}
      <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-6 mb-8 flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-700 transition-colors group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Terminal className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Build a Custom Tool</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Create automation scripts, API connectors, or workflow triggers for your agents
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
          Get started
          <Zap className="h-4 w-4" />
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Connected Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {integrations.map((integration) => {
            const sc = statusConfig[integration.status]
            return (
              <div
                key={integration.name}
                className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:shadow-md dark:hover:shadow-xl transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${integration.bg}`}>
                      <integration.Icon className={`h-5 w-5 ${integration.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{integration.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{integration.authType}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${sc.bg}`}>
                    <sc.Icon className={`h-3 w-3 ${sc.color}`} />
                    {sc.label}
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  {integration.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-semibold ${
                        integration.status === 'degraded'
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {integration.latency}
                    </span>
                    <span className="text-gray-200 dark:text-gray-700">·</span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">{integration.lastSync}</span>
                  </div>
                  <button className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-1">
                    <Settings className="h-3.5 w-3.5" />
                    Config
                  </button>
                </div>
              </div>
            )
          })}

          {/* Add Integration card */}
          <div className="rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 p-4 flex items-center justify-center hover:border-gray-300 dark:hover:border-gray-600 transition-colors cursor-pointer group">
            <div className="text-center">
              <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-2 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                <Plus className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Add Integration</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Connect a new service</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools List */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Custom Tools</h2>
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
              >
                {/* Status indicator */}
                <div
                  className={`h-2 w-2 rounded-full shrink-0 ${
                    tool.status === 'active' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />

                {/* Main content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{tool.name}</p>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{tool.description}</p>
                </div>

                {/* Agent */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className={`h-5 w-5 rounded-full ${tool.agentColor} flex items-center justify-center`}>
                    <span className="text-[9px] font-bold text-white">{tool.agent[0]}</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{tool.agent}</span>
                </div>

                {/* Runs */}
                <div className="text-right shrink-0">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{tool.runs} runs</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{tool.lastRun}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <Play className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
