'use client'

import PageLayout from '@/components/PageLayout'
import { Calendar, DollarSign } from 'lucide-react'

type ClientStatus = 'active' | 'at-risk' | 'inactive'

interface Client {
  id: number
  name: string
  serviceType: string
  lastJob: string
  totalSpend: number
  nextJob: string
  status: ClientStatus
  initials: string
  color: string
}

const clients: Client[] = [
  { id: 1,  name: 'James Hendricks',     serviceType: 'Lawn Maintenance',     lastJob: 'Apr 18, 2026', totalSpend: 9800,  nextJob: 'Apr 30, 2026', status: 'active',   initials: 'JH', color: 'bg-blue-500' },
  { id: 2,  name: 'The Gould Corp',      serviceType: 'Commercial Grounds',   lastJob: 'Apr 20, 2026', totalSpend: 41200, nextJob: 'May 5, 2026',  status: 'active',   initials: 'GC', color: 'bg-indigo-500' },
  { id: 3,  name: 'Lakeview Estates',    serviceType: 'HOA Full Service',     lastJob: 'Apr 15, 2026', totalSpend: 28400, nextJob: 'May 1, 2026',  status: 'active',   initials: 'LE', color: 'bg-emerald-500' },
  { id: 4,  name: 'Sandra Okafor',       serviceType: 'Seasonal Cleanup',     lastJob: 'Mar 30, 2026', totalSpend: 6400,  nextJob: 'May 10, 2026', status: 'active',   initials: 'SO', color: 'bg-purple-500' },
  { id: 5,  name: 'Tom & Cynthia Park',  serviceType: 'Lawn + Irrigation',    lastJob: 'Apr 10, 2026', totalSpend: 14200, nextJob: 'Apr 28, 2026', status: 'active',   initials: 'TP', color: 'bg-teal-500' },
  { id: 6,  name: 'Northgate Plaza',     serviceType: 'Commercial Grounds',   lastJob: 'Apr 5, 2026',  totalSpend: 31000, nextJob: 'May 5, 2026',  status: 'active',   initials: 'NP', color: 'bg-orange-500' },
  { id: 7,  name: 'Westbrook Community', serviceType: 'HOA Full Service',     lastJob: 'Mar 22, 2026', totalSpend: 19600, nextJob: 'Not Scheduled', status: 'at-risk',  initials: 'WC', color: 'bg-amber-500' },
  { id: 8,  name: 'Angela Ferris',       serviceType: 'Residential Weekly',   lastJob: 'Apr 12, 2026', totalSpend: 3800,  nextJob: 'Apr 26, 2026', status: 'active',   initials: 'AF', color: 'bg-pink-500' },
  { id: 9,  name: 'Derek Nguyen',        serviceType: 'One-Time Cleanup',     lastJob: 'Feb 14, 2026', totalSpend: 1200,  nextJob: 'Not Scheduled', status: 'at-risk',  initials: 'DN', color: 'bg-gray-500' },
  { id: 10, name: 'Pinnacle Office Pk',  serviceType: 'Monthly Maintenance',  lastJob: 'Apr 1, 2026',  totalSpend: 22000, nextJob: 'May 1, 2026',  status: 'active',   initials: 'PO', color: 'bg-cyan-500' },
  { id: 11, name: 'Cascade Park HOA',    serviceType: 'HOA Full Service',     lastJob: 'Jan 10, 2026', totalSpend: 4400,  nextJob: 'Not Scheduled', status: 'inactive', initials: 'CP', color: 'bg-red-400' },
  { id: 12, name: 'Martinez Family',     serviceType: 'Lawn + Mulch',         lastJob: 'Apr 20, 2026', totalSpend: 7200,  nextJob: 'May 3, 2026',  status: 'active',   initials: 'MF', color: 'bg-violet-500' },
]

const statusConfig: Record<ClientStatus, { label: string; bg: string; text: string }> = {
  active:   { label: 'Active',    bg: 'bg-green-100 dark:bg-green-900/20',  text: 'text-green-700 dark:text-green-400' },
  'at-risk':{ label: 'At Risk',   bg: 'bg-amber-100 dark:bg-amber-900/20',  text: 'text-amber-700 dark:text-amber-400' },
  inactive: { label: 'Inactive',  bg: 'bg-gray-100 dark:bg-gray-800',       text: 'text-gray-600 dark:text-gray-400' },
}

function formatCurrency(v: number) {
  return v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
}

export default function ClientsPage() {
  const activeCount = clients.filter((c) => c.status === 'active').length
  const atRiskCount = clients.filter((c) => c.status === 'at-risk').length

  return (
    <PageLayout>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {clients.length} clients · {activeCount} active · {atRiskCount} at risk
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          + Add Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {clients.map((client) => {
          const sc = statusConfig[client.status]
          return (
            <div
              key={client.id}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${client.color} flex items-center justify-center shrink-0`}>
                    <span className="text-xs font-bold text-white">{client.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{client.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{client.serviceType}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                  {sc.label}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Total Spend
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(client.totalSpend)}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Last Job
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{client.lastJob}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Next Job
                  </span>
                  <span className={client.nextJob === 'Not Scheduled' ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-gray-700 dark:text-gray-300'}>
                    {client.nextJob}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </PageLayout>
  )
}
