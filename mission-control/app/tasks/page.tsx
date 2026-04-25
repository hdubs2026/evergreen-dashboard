'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { Plus, Filter, Clock, CheckCircle2, ArrowRight } from 'lucide-react'

type Stage = 'queued' | 'assigned' | 'in-progress' | 'review' | 'done'
type Priority = 'low' | 'medium' | 'high' | 'critical'

interface Task {
  id: number
  title: string
  description: string
  agent: string
  agentColor: string
  stage: Stage
  priority: Priority
  createdAt: string
  dueAt: string
}

const stageOrder: Stage[] = ['queued', 'assigned', 'in-progress', 'review', 'done']

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Process overdue invoices',
    description: 'Run batch processing on 7 overdue client accounts in Jobber/QuickBooks',
    agent: 'Jordan',
    agentColor: 'bg-emerald-500',
    stage: 'in-progress',
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
    stage: 'assigned',
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
    stage: 'done',
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
    stage: 'done',
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
    stage: 'review',
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
    stage: 'queued',
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
    stage: 'queued',
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
    stage: 'in-progress',
    priority: 'high',
    createdAt: '6h ago',
    dueAt: 'Today 5PM',
  },
]

const priorityConfig = {
  critical: { label: 'Critical', bg: 'bg-red-100 dark:bg-red-900/20',    text: 'text-red-700 dark:text-red-400' },
  high:     { label: 'High',     bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400' },
  medium:   { label: 'Medium',   bg: 'bg-blue-100 dark:bg-blue-900/20',   text: 'text-blue-700 dark:text-blue-400' },
  low:      { label: 'Low',      bg: 'bg-gray-100 dark:bg-gray-800',      text: 'text-gray-600 dark:text-gray-400' },
}

const stageConfig: Record<Stage, { label: string; bg: string; text: string; dot: string }> = {
  queued:      { label: 'Queued',      bg: 'bg-gray-100 dark:bg-gray-800',        text: 'text-gray-600 dark:text-gray-400',    dot: 'bg-gray-400' },
  assigned:    { label: 'Assigned',    bg: 'bg-blue-100 dark:bg-blue-900/20',     text: 'text-blue-700 dark:text-blue-400',    dot: 'bg-blue-500' },
  'in-progress': { label: 'In Progress', bg: 'bg-indigo-100 dark:bg-indigo-900/20', text: 'text-indigo-700 dark:text-indigo-400', dot: 'bg-indigo-500' },
  review:      { label: 'Review',      bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
  done:        { label: 'Done',        bg: 'bg-green-100 dark:bg-green-900/20',   text: 'text-green-700 dark:text-green-400',  dot: 'bg-green-500' },
}

type TabKey = 'all' | Stage

const tabs: { key: TabKey; label: string }[] = [
  { key: 'all',         label: 'All' },
  { key: 'queued',      label: 'Queued' },
  { key: 'assigned',    label: 'Assigned' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'review',      label: 'Review' },
  { key: 'done',        label: 'Done' },
]

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  function advanceTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const idx = stageOrder.indexOf(t.stage)
        if (idx < stageOrder.length - 1) {
          return { ...t, stage: stageOrder[idx + 1] }
        }
        return t
      })
    )
  }

  const filtered = activeTab === 'all' ? tasks : tasks.filter((t) => t.stage === activeTab)

  const counts: Record<TabKey, number> = {
    all:           tasks.length,
    queued:        tasks.filter((t) => t.stage === 'queued').length,
    assigned:      tasks.filter((t) => t.stage === 'assigned').length,
    'in-progress': tasks.filter((t) => t.stage === 'in-progress').length,
    review:        tasks.filter((t) => t.stage === 'review').length,
    done:          tasks.filter((t) => t.stage === 'done').length,
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
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
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
        <button className="shrink-0 inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium px-3 py-2 transition-colors">
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
              const sc = stageConfig[task.stage]
              const isDone = task.stage === 'done'
              return (
                <div
                  key={task.id}
                  className="group flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* Stage dot */}
                  <div className="shrink-0">
                    <div className={`h-2.5 w-2.5 rounded-full ${sc.dot}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <p
                        className={`text-sm font-semibold ${
                          isDone
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-900 dark:text-white'
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-2">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
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

                      {/* Stage pill */}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${sc.bg} ${sc.text}`}>
                        {sc.label}
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

                  {/* Advance button */}
                  <div className="shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <button
                        onClick={() => advanceTask(task.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-700"
                      >
                        Advance
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    )}
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
