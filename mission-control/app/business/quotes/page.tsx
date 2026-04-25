'use client'

import PageLayout from '@/components/PageLayout'
import { Clock } from 'lucide-react'

type QuoteStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'declined'

interface Quote {
  id: number
  client: string
  description: string
  amount: number
  sentDate: string
  status: QuoteStatus
  agent: string
  agentColor: string
  expiryDate: string
}

const quotes: Quote[] = [
  { id: 1,  client: 'Northgate Plaza',     description: 'Commercial grounds maintenance — annual contract',  amount: 31000, sentDate: 'Apr 17, 2026', status: 'viewed',    agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 17, 2026' },
  { id: 2,  client: 'Angela Ferris',        description: 'Residential weekly lawn service + edging',          amount: 3800,  sentDate: 'Apr 19, 2026', status: 'sent',      agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 19, 2026' },
  { id: 3,  client: 'Reese Robinson',       description: 'Spring landscaping & bed refresh',                  amount: 4200,  sentDate: 'Apr 21, 2026', status: 'sent',      agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 21, 2026' },
  { id: 4,  client: 'Westbrook Community',  description: 'HOA full-service grounds — 12 month agreement',    amount: 24500, sentDate: 'Apr 15, 2026', status: 'viewed',    agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 15, 2026' },
  { id: 5,  client: 'The Gould Corp',       description: 'Corporate campus grounds — Phase 2 expansion',     amount: 41200, sentDate: 'Apr 21, 2026', status: 'accepted',  agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 21, 2026' },
  { id: 6,  client: 'James Hendricks',      description: 'Annual lawn maintenance renewal',                   amount: 5100,  sentDate: 'Apr 10, 2026', status: 'accepted',  agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 10, 2026' },
  { id: 7,  client: 'Martinez Family',      description: 'Lawn + mulch refresh — spring package',            amount: 4100,  sentDate: 'Apr 22, 2026', status: 'draft',     agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 22, 2026' },
  { id: 8,  client: 'Marcus Webb',          description: 'Bi-weekly mowing + seasonal trim',                 amount: 3200,  sentDate: '—',             status: 'draft',     agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: '—' },
  { id: 9,  client: 'Cascade Park HOA',     description: 'HOA grounds management — Q2 renewal',              amount: 18600, sentDate: 'Mar 15, 2026', status: 'declined',  agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'Apr 15, 2026' },
  { id: 10, client: 'Lakeview Estates',     description: 'HOA full-service renewal + irrigation audit',      amount: 15800, sentDate: 'Apr 19, 2026', status: 'sent',      agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 19, 2026' },
  { id: 11, client: 'Tom & Cynthia Park',   description: 'Lawn + irrigation system tune-up package',         amount: 6200,  sentDate: 'Apr 16, 2026', status: 'viewed',    agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 16, 2026' },
  { id: 12, client: 'Pinnacle Office Pk',   description: 'Monthly exterior maintenance — 6 month contract',  amount: 22000, sentDate: 'Apr 22, 2026', status: 'draft',     agent: 'Jerry', agentColor: 'bg-orange-500', expiryDate: 'May 22, 2026' },
]

const statusConfig: Record<QuoteStatus, { label: string; bg: string; text: string }> = {
  draft:    { label: 'Draft',    bg: 'bg-gray-100 dark:bg-gray-800',        text: 'text-gray-600 dark:text-gray-400' },
  sent:     { label: 'Sent',     bg: 'bg-blue-100 dark:bg-blue-900/20',     text: 'text-blue-700 dark:text-blue-400' },
  viewed:   { label: 'Viewed',   bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400' },
  accepted: { label: 'Accepted', bg: 'bg-green-100 dark:bg-green-900/20',   text: 'text-green-700 dark:text-green-400' },
  declined: { label: 'Declined', bg: 'bg-red-100 dark:bg-red-900/20',       text: 'text-red-700 dark:text-red-400' },
}

function formatCurrency(v: number) {
  return `$${v.toLocaleString()}`
}

export default function QuotesPage() {
  const openCount = quotes.filter((q) => ['draft', 'sent', 'viewed'].includes(q.status)).length
  const totalOpen = quotes
    .filter((q) => ['sent', 'viewed'].includes(q.status))
    .reduce((s, q) => s + q.amount, 0)

  return (
    <PageLayout>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotes</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {openCount} open · ${totalOpen.toLocaleString()} pending acceptance
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          + New Quote
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="col-span-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Client</div>
          <div className="col-span-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Service</div>
          <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</div>
          <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sent</div>
          <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</div>
          <div className="col-span-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Agent</div>
          <div className="col-span-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expires</div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {quotes.map((quote) => {
            const sc = statusConfig[quote.status]
            return (
              <div
                key={quote.id}
                className="grid grid-cols-12 gap-4 px-6 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
              >
                <div className="col-span-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{quote.client}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{quote.description}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(quote.amount)}</p>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{quote.sentDate}</p>
                </div>
                <div className="col-span-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg} ${sc.text}`}>
                    {sc.label}
                  </span>
                </div>
                <div className="col-span-1">
                  <div className="flex items-center gap-1.5">
                    <div className={`h-4 w-4 rounded-full ${quote.agentColor} flex items-center justify-center`}>
                      <span className="text-[9px] font-bold text-white">{quote.agent[0]}</span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{quote.agent}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3 shrink-0" />
                    {quote.expiryDate}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}
