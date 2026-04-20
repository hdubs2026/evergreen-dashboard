import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  description: string
}

export default function StatCard({ title, value, change, icon, description }: StatCardProps) {
  const isPositive = change > 0
  const isNegative = change < 0
  
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {icon}
        </div>
        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive 
            ? 'bg-green-500/10 text-green-700 dark:text-green-400' 
            : isNegative 
            ? 'bg-red-500/10 text-red-700 dark:text-red-400'
            : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'
        }`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : 
           isNegative ? <TrendingDown className="h-3 w-3" /> : 
           <Minus className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  )
}