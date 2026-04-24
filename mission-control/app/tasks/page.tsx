'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { Plus, Filter, Clock, AlertCircle, CheckCircle2, Circle, ArrowUpRight } from 'lucide-react'

type Status = 'pending' | 'in-progress' | 'completed'
type Priority = 'low' | 'medium' | 'high' | 'critical'

interface Task {
  id: number
  title: string
  description: string
  agent: string
  agentColor: string
  status: Status
  priority: Priority
  createdAt: string
  dueAt: string
}

const tasks: Task[] = [
  {
    id: 1,
    title: 'Process overdue invoices',
    description: 'Run batch processing on 7 overdue client accounts in Jobber/QuickBooks',
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2h ago',
    dueAt: 'Today 5PM',
  },
  {
    id: 2,
    title: 'Follow up Reese R quote',
    description: 'Send follow-up on $4,200 landscaping proposal — 3 days without response',
    agent: 'Jerry',
    agentColor: 'bg-orange-500',
    status: 'pending',
    priority: 'critical',
    createdAt: '5m ago',
    dueAt: 'Today 3PM',
  },
  {
    id: 3,
    title: 'Schedule weekly team meeting',
    description: 'Coordinate crew schedules for Monday morning standup at the depot',
    agent: 'Donna',
    agentColor: 'bg-purple-500',
    status: 'completed',
    priority: 'medium',
    createdAt: '1d ago',
    dueAt: 'Completed',
  },
  {
    id: 4,
    title: 'Update Obsidian memory system',
    description: 'Sync latest agent logs and decision checkpoints to vault',
    agent: 'Jarvis',
    agentColor: 'bg-blue-500',
    status: 'completed',
    priority: 'high',
    createdAt: '1d ago',
    dueAt: 'Completed',
  },
  {
    id: 5,
    title: 'Test QuickBooks integration',
    description: 'Validate OAuth token refresh and invoice creation endpoint behavior',
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    status: 'in-progress',
    priority: 'medium',
    createdAt: '3h ago',
    dueAt: 'Tomorrow',
  },
  {
    id: 6,
    title: 'Send April crew notifications',
    description: 'Notify all field crew of updated April job schedule changes',
    agent: 'Donna',
    agentColor: 'bg-purple-500',
    status: 'pending',
    priority: 'medium',
    createdAt: '1h ago',
    dueAt: 'Today 6PM',
  },
  {
    id: 7,
    title: 'Qualify new commercial lead',
    description: 'Research and score new commercial property inquiry from Mercer St',
    agent: 'Jerry',
    agentColor: 'bg-orange-500',
    status: 'pending',
    priority: 'high',
    createdAt: '30m ago',
    dueAt: 'Tomorrow',
  },
  {
    id: 8,
    title: 'Run monthly financial report',
    description: 'Generate April P&L report from QuickBooks and post to Discord',
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    status: 'in-progress',
    priority: 'high',
    createdAt: '6h ago',
    dueAt: 'Today 5PM',
  },
]

const priorityConfig = {
  critical: { label: 'Critical', bg: 'bg-red-100 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400' },
  high: { label: 'High', bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400' },
  medium: { label: 'Medium', bg: 'bg-blue-100 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400' },
  low: { label: 'Low', bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400' },
}

const statusConfig = {
  pending: { label: 'Pending', Icon: Circle, color: 'text-yellow-500' },
  'in-progress': { label: 'In Progress', Icon: AlertCircle, color: 'text-blue-500' },
  completed: { label: 'Completed', Icon: CheckCircle2, color: 'text-green-500' },
}

type TabKey = 'all' | Status

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
]

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  const filtered = activeTab === 'all' ? tasks : tasks.filter((t) => t.status === activeTab)

  const counts: Record<TabKey, number> = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  }

  return (
    <PageLayout>
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {tasks.length} tasks · {counts['in-progress']} in progress
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </div>

      {/* Tabs + Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              <span
                className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  activeTab === tab.key
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    : 'bg-transparent text-gray-400 dark:text-gray-500'
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium px-3 py-2 transition-colors">
          <Filter className="h-4 w-4" />
          Filter
        </button>
      </div>

      {/* Task List */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <CheckCircle2 className="h-10 w-10 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No tasks here</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">All clear in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((task) => {
              const pc = priorityConfig[task.priority]
              const sc = statusConfig[task.status]
              return (
                <div
                  key={task.id}
                  className="group flex items-start gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  {/* Status Icon */}
                  <div className="mt-0.5 shrink-0">
                    <sc.Icon className={`h-5 w-5 ${sc.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            task.status === 'completed'
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-900 dark:text-white'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-300 dark:text-gray-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                    </div>

                    <div className="flex items-center gap-3 mt-2.5">
                      {/* Agent */}
                      <div className="flex items-center gap-1.5">
                        <div className={`h-4 w-4 rounded-full ${task.agentColor} flex items-center justify-center`}>
                          <span className="text-[9px] font-bold text-white">{task.agent[0]}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.agent}</span>
                      </div>

                      <span className="text-gray-200 dark:text-gray-700">·</span>

                      {/* Priority */}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${pc.bg} ${pc.text}`}>
                        {pc.label}
                      </span>

                      <span className="text-gray-200 dark:text-gray-700">·</span>

                      {/* Due */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
                        <Clock className="h-3 w-3" />
                        {task.dueAt}
                      </div>

                      <span className="text-gray-200 dark:text-gray-700">·</span>

                      <span className="text-xs text-gray-400 dark:text-gray-500">{task.createdAt}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
