import { Cpu, Activity, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface AgentCardProps {
  name: string
  role: string
  status: 'active' | 'inactive' | 'error'
  lastActivity: string
  tasks: number
  icon: React.ReactNode
}

export default function AgentCard({ name, role, status, lastActivity, tasks, icon }: AgentCardProps) {
  const statusConfig = {
    active: { color: 'text-green-500', bg: 'bg-green-500/10', label: 'Active' },
    inactive: { color: 'text-gray-500', bg: 'bg-gray-500/10', label: 'Inactive' },
    error: { color: 'text-red-500', bg: 'bg-red-500/10', label: 'Error' },
  }

  const config = statusConfig[status]

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
          <div className={`h-1.5 w-1.5 rounded-full ${config.color.replace('text', 'bg')}`}></div>
          {config.label}
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Last activity</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{lastActivity}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Active tasks</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{tasks}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <button className="w-full py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          View details →
        </button>
      </div>
    </div>
  )
}