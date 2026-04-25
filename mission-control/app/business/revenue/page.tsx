import PageLayout from '@/components/PageLayout'
import { TrendingUp, DollarSign, Users, Calendar } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', revenue: 28400 },
  { month: 'Feb', revenue: 31200 },
  { month: 'Mar', revenue: 29800 },
  { month: 'Apr', revenue: 35600 },
  { month: 'May', revenue: 38200 },
  { month: 'Jun', revenue: 42100 },
  { month: 'Jul', revenue: 39800 },
  { month: 'Aug', revenue: 44300 },
  { month: 'Sep', revenue: 41200 },
  { month: 'Oct', revenue: 46800 },
  { month: 'Nov', revenue: 43900 },
  { month: 'Dec', revenue: 51200 },
]

const topClients = [
  { name: 'The Gould Corp',       amount: 41200, pct: 80 },
  { name: 'Northgate Plaza',      amount: 31000, pct: 60 },
  { name: 'Lakeview Estates',     amount: 28400, pct: 55 },
  { name: 'Westbrook Community',  amount: 24500, pct: 48 },
  { name: 'Pinnacle Office Park', amount: 22000, pct: 43 },
]

const recentTransactions = [
  { id: 1, client: 'The Gould Corp',      description: 'April grounds service',     amount: 3433,  date: 'Apr 22, 2026', type: 'paid' },
  { id: 2, client: 'Lakeview Estates',    description: 'HOA monthly retainer',      amount: 2367,  date: 'Apr 20, 2026', type: 'paid' },
  { id: 3, client: 'James Hendricks',     description: 'Spring cleanup + edging',   amount: 480,   date: 'Apr 18, 2026', type: 'paid' },
  { id: 4, client: 'Angela Ferris',       description: 'Bi-weekly lawn service',    amount: 320,   date: 'Apr 16, 2026', type: 'paid' },
  { id: 5, client: 'Northgate Plaza',     description: 'April maintenance visit',   amount: 2583,  date: 'Apr 14, 2026', type: 'paid' },
  { id: 6, client: 'Reese Robinson',      description: 'Spring landscaping quote',  amount: 4200,  date: 'Apr 12, 2026', type: 'pending' },
]

function formatCurrency(v: number) {
  return v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
}

export default function RevenuePage() {
  const currentMonth = monthlyData[3] // April
  const prevMonth = monthlyData[2]
  const growth = (((currentMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100).toFixed(1)
  const ytdRevenue = monthlyData.slice(0, 4).reduce((s, d) => s + d.revenue, 0)
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue))

  // SVG chart constants
  const SVG_W = 600
  const SVG_H = 160
  const LABEL_H = 28
  const BAR_W = 32
  const n = monthlyData.length
  const spacing = SVG_W / n

  return (
    <PageLayout>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Revenue</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Evergreen Landscaping financial overview
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-medium px-4 py-2 transition-colors">
          Export Report
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'April Revenue',  value: formatCurrency(currentMonth.revenue), sub: `+${growth}% vs March`,        icon: DollarSign, accent: 'text-green-500' },
          { label: 'YTD Revenue',    value: formatCurrency(ytdRevenue),            sub: 'Jan – Apr 2026',             icon: TrendingUp,  accent: 'text-blue-500' },
          { label: 'Active Clients', value: '9',                                   sub: '2 at risk',                  icon: Users,       accent: 'text-purple-500' },
          { label: 'Open Pipeline',  value: '$68.4k',                              sub: '12 quotes in flight',        icon: Calendar,    accent: 'text-amber-500' },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
              <card.icon className={`h-4 w-4 ${card.accent}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Monthly Revenue — 2026</p>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H + LABEL_H}`}
              className="w-full min-w-[360px]"
              style={{ height: SVG_H + LABEL_H + 8 }}
            >
              {monthlyData.map((d, i) => {
                const barH = Math.max(4, (d.revenue / maxRevenue) * SVG_H)
                const x = i * spacing + (spacing - BAR_W) / 2
                const y = SVG_H - barH
                const isCurrentMonth = i === 3
                return (
                  <g key={d.month}>
                    <rect
                      x={x}
                      y={y}
                      width={BAR_W}
                      height={barH}
                      rx={4}
                      fill={isCurrentMonth ? '#3b82f6' : '#6366f1'}
                      opacity={isCurrentMonth ? 1 : 0.45}
                    />
                    <text
                      x={x + BAR_W / 2}
                      y={SVG_H + 18}
                      textAnchor="middle"
                      fill="#9ca3af"
                      fontSize={10}
                      fontWeight={isCurrentMonth ? '600' : '400'}
                    >
                      {d.month}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>
        </div>

        {/* Top clients */}
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Top Clients by Revenue</p>
          <div className="space-y-3">
            {topClients.map((client) => (
              <div key={client.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 dark:text-gray-300 truncate max-w-[140px]">{client.name}</span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-white">{formatCurrency(client.amount)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-1.5 rounded-full bg-blue-500"
                    style={{ width: `${client.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mt-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Recent Transactions</p>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{txn.client}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{txn.description}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs text-gray-400 dark:text-gray-500">{txn.date}</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    txn.type === 'paid'
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : 'bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                  }`}
                >
                  {txn.type === 'paid' ? 'Paid' : 'Pending'}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white w-16 text-right">
                  {formatCurrency(txn.amount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
