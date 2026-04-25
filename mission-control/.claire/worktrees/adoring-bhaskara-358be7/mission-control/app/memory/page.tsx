import PageLayout from '@/components/PageLayout'
import { Brain, Database, FileText, RefreshCw, Clock, Layers, HardDrive, CheckCircle } from 'lucide-react'

const vaultStats = [
  { label: 'Total Notes', value: '482', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Daily Logs', value: '7', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: "Today's Checkpoints", value: '42', icon: CheckCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { label: 'Vault Size', value: '3.2 MB', icon: HardDrive, color: 'text-orange-500', bg: 'bg-orange-500/10' },
]

const agentMemory = [
  {
    name: 'Jarvis',
    role: 'Master Orchestrator',
    entries: 184,
    lastUpdated: '2m ago',
    gradient: 'from-blue-500 to-indigo-600',
    textColor: 'text-blue-400',
    topics: ['Orchestration Logs', 'System Health', 'Decision History'],
  },
  {
    name: 'Jordan',
    role: 'Finance Agent',
    entries: 156,
    lastUpdated: '6m ago',
    gradient: 'from-emerald-500 to-green-600',
    textColor: 'text-emerald-400',
    topics: ['Invoice Records', 'QB Sync Logs', 'Financial Reports'],
  },
  {
    name: 'Donna',
    role: 'Scheduling Agent',
    entries: 78,
    lastUpdated: 'Yesterday',
    gradient: 'from-purple-500 to-violet-600',
    textColor: 'text-purple-400',
    topics: ['Schedule Logs', 'Crew Coordination', 'Reminders'],
  },
  {
    name: 'Jerry',
    role: 'Sales Agent',
    entries: 64,
    lastUpdated: '2 days ago',
    gradient: 'from-orange-500 to-amber-500',
    textColor: 'text-orange-400',
    topics: ['Lead Pipeline', 'Quote History', 'CRM Updates'],
  },
]

const activityFeed = [
  {
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    type: 'checkpoint',
    typeColor: 'text-emerald-500 bg-emerald-500/10',
    content: 'QuickBooks reconciliation complete. April totals: $8,292 revenue, $3,140 expenses. Net margin 62%.',
    time: '2:14 PM',
    timeAgo: '2m ago',
  },
  {
    agent: 'Jarvis',
    agentColor: 'bg-blue-500',
    type: 'decision',
    typeColor: 'text-blue-500 bg-blue-500/10',
    content: 'Orchestration priority update: Jordan handling invoice batch first, then QB sync. Donna standby for scheduling conflict at 4PM.',
    time: '1:58 PM',
    timeAgo: '18m ago',
  },
  {
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    type: 'log',
    typeColor: 'text-gray-500 bg-gray-500/10',
    content: 'Invoice batch 7 of 12 processed. $2,800 in outstanding flagged. Payment reminders sent to 3 clients.',
    time: '1:22 PM',
    timeAgo: '54m ago',
  },
  {
    agent: 'Jarvis',
    agentColor: 'bg-blue-500',
    type: 'checkpoint',
    typeColor: 'text-emerald-500 bg-emerald-500/10',
    content: 'System health check passed. All 5 integrations operational. Google Sheets latency elevated at 520ms — monitoring closely.',
    time: '12:00 PM',
    timeAgo: '2h ago',
  },
  {
    agent: 'Jerry',
    agentColor: 'bg-orange-500',
    type: 'log',
    typeColor: 'text-gray-500 bg-gray-500/10',
    content: 'CRM update: Reese R quote follow-up scheduled for today 3PM. Added note to contact record. Priority: critical.',
    time: '11:45 AM',
    timeAgo: '2h ago',
  },
  {
    agent: 'Donna',
    agentColor: 'bg-purple-500',
    type: 'log',
    typeColor: 'text-gray-500 bg-gray-500/10',
    content: 'Team standup scheduled Monday 8AM. Crew confirmed: Marcus, Sarah, Kyle. Location: Depot. Added to all calendars.',
    time: '10:00 AM',
    timeAgo: '4h ago',
  },
]

export default function MemoryPage() {
  return (
    <PageLayout>
      {/* Page Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Memory System</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Obsidian vault · iCloud sync active
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium px-4 py-2 transition-colors">
          <RefreshCw className="h-4 w-4" />
          Sync Now
        </button>
      </div>

      {/* Vault Status Banner */}
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Obsidian Vault</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Synced
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Hunter Warren's AI memory system · iCloud Drive
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500">Last synced</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1 justify-end mt-0.5">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              2 min ago
            </p>
          </div>
        </div>
      </div>

      {/* Vault Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {vaultStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Agent Memory Breakdown */}
        <div className="lg:col-span-2">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">Agent Memory</h2>
          <div className="space-y-3">
            {agentMemory.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">{agent.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{agent.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{agent.role}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className={`text-sm font-bold ${agent.textColor}`}>{agent.entries}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">entries</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {agent.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-0.5 rounded bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Updated {agent.lastUpdated}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Recent Memory Writes</h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">Today · Apr 24</span>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="divide-y divide-gray-50 dark:divide-gray-800">
              {activityFeed.map((entry, i) => (
                <div key={i} className="p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  {/* Agent dot */}
                  <div className={`mt-1 h-6 w-6 rounded-full ${entry.agentColor} flex items-center justify-center shrink-0`}>
                    <span className="text-[9px] font-bold text-white">{entry.agent[0]}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{entry.agent}</span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${entry.typeColor}`}>
                        {entry.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-snug">{entry.content}</p>
                  </div>

                  <div className="shrink-0 text-right ml-2">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tabular-nums">{entry.time}</p>
                    <p className="text-xs text-gray-300 dark:text-gray-600">{entry.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800">
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                View full vault history →
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
