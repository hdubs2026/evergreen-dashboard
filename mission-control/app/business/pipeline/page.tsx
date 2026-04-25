'use client'

import { useState } from 'react'
import PageLayout from '@/components/PageLayout'
import { ArrowRight, Clock, DollarSign, User } from 'lucide-react'

type Stage = 'new-lead' | 'contacted' | 'estimate-scheduled' | 'quote-sent' | 'follow-up' | 'closed-won'

interface Lead {
  id: number
  name: string
  propertyType: string
  value: number
  daysInStage: number
  agent: string
  agentColor: string
  stage: Stage
  address: string
}

const stages: { key: Stage; label: string; color: string; bg: string; border: string; text: string }[] = [
  { key: 'new-lead',           label: 'New Lead',           color: '#6b7280', bg: 'bg-gray-500',   border: 'border-gray-500',   text: 'text-gray-600 dark:text-gray-400' },
  { key: 'contacted',          label: 'Contacted',          color: '#3b82f6', bg: 'bg-blue-500',   border: 'border-blue-500',   text: 'text-blue-600 dark:text-blue-400' },
  { key: 'estimate-scheduled', label: 'Estimate Scheduled', color: '#6366f1', bg: 'bg-indigo-500', border: 'border-indigo-500', text: 'text-indigo-600 dark:text-indigo-400' },
  { key: 'quote-sent',         label: 'Quote Sent',         color: '#8b5cf6', bg: 'bg-purple-500', border: 'border-purple-500', text: 'text-purple-600 dark:text-purple-400' },
  { key: 'follow-up',          label: 'Follow-up',          color: '#f59e0b', bg: 'bg-amber-500',  border: 'border-amber-500',  text: 'text-amber-600 dark:text-amber-400' },
  { key: 'closed-won',         label: 'Closed Won',         color: '#22c55e', bg: 'bg-green-500',  border: 'border-green-500',  text: 'text-green-600 dark:text-green-400' },
]

const stageOrder: Stage[] = ['new-lead', 'contacted', 'estimate-scheduled', 'quote-sent', 'follow-up', 'closed-won']

const initialLeads: Lead[] = [
  { id: 1,  name: 'Marcus Webb',         propertyType: 'Residential',  value: 3200,  daysInStage: 1,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'new-lead',           address: '412 Elm St' },
  { id: 2,  name: 'Sandra Okafor',       propertyType: 'Commercial',   value: 12400, daysInStage: 2,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'new-lead',           address: '88 Commerce Blvd' },
  { id: 3,  name: 'Cascade Park HOA',    propertyType: 'HOA',          value: 18600, daysInStage: 1,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'new-lead',           address: 'Cascade Park Dr' },
  { id: 4,  name: 'Derek Nguyen',        propertyType: 'Residential',  value: 2800,  daysInStage: 3,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'new-lead',           address: '217 Oak Ave' },
  { id: 5,  name: 'Martinez Family',     propertyType: 'Residential',  value: 4100,  daysInStage: 4,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'contacted',          address: '55 Maple Ln' },
  { id: 6,  name: 'Pinnacle Office Pk',  propertyType: 'Commercial',   value: 22000, daysInStage: 2,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'contacted',          address: '1000 Business Pkwy' },
  { id: 7,  name: 'Reese Robinson',      propertyType: 'Residential',  value: 4200,  daysInStage: 3,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'contacted',          address: '332 Birch Ct' },
  { id: 8,  name: 'Lakeview Estates',    propertyType: 'HOA',          value: 15800, daysInStage: 5,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'estimate-scheduled', address: 'Lakeview Dr Loop' },
  { id: 9,  name: 'Tom & Cynthia Park',  propertyType: 'Residential',  value: 6200,  daysInStage: 2,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'estimate-scheduled', address: '780 Willow Way' },
  { id: 10, name: 'Northgate Plaza',     propertyType: 'Commercial',   value: 31000, daysInStage: 7,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'quote-sent',         address: '5 Northgate Blvd' },
  { id: 11, name: 'Angela Ferris',       propertyType: 'Residential',  value: 3800,  daysInStage: 5,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'quote-sent',         address: '91 Cedar Pl' },
  { id: 12, name: 'Westbrook Community', propertyType: 'HOA',          value: 24500, daysInStage: 9,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'follow-up',          address: 'Westbrook Circle' },
  { id: 13, name: 'James Hendricks',     propertyType: 'Residential',  value: 5100,  daysInStage: 14, agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'closed-won',         address: '1204 Spruce Rd' },
  { id: 14, name: 'The Gould Corp',      propertyType: 'Commercial',   value: 41200, daysInStage: 3,  agent: 'Jerry', agentColor: 'bg-orange-500', stage: 'closed-won',         address: '290 Industrial Way' },
]

function formatCurrency(v: number) {
  return v >= 1000 ? `$${(v / 1000).toFixed(1)}k` : `$${v}`
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedStage, setSelectedStage] = useState<Stage>('new-lead')

  const counts = stages.map((s) => leads.filter((l) => l.stage === s.key).length)
  const values = stages.map((s) => leads.filter((l) => l.stage === s.key).reduce((sum, l) => sum + l.value, 0))
  const totalValue = leads.reduce((sum, l) => sum + l.value, 0)

  const visibleLeads = leads.filter((l) => l.stage === selectedStage)

  function moveToNextStage(leadId: number) {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== leadId) return l
        const idx = stageOrder.indexOf(l.stage)
        if (idx < stageOrder.length - 1) {
          return { ...l, stage: stageOrder[idx + 1], daysInStage: 0 }
        }
        return l
      })
    )
  }

  const selectedStageConfig = stages.find((s) => s.key === selectedStage)!

  // SVG funnel geometry: 6 trapezoid sections
  const W = 780
  const H = 140
  const n = stages.length
  const sectionW = W / n
  const topTaper = 10
  const bottomTaper = 10

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pipeline</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {leads.length} leads · {formatCurrency(totalValue)} total value
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm">
          + New Lead
        </button>
      </div>

      {/* Funnel */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 mb-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H + 60}`} className="w-full min-w-[600px]" style={{ maxHeight: 220 }}>
          {stages.map((stage, i) => {
            const isSelected = selectedStage === stage.key
            const x0 = i * sectionW
            const x1 = (i + 1) * sectionW
            const y0top = i * topTaper
            const y1top = (i + 1) * topTaper
            const y0bot = H - i * bottomTaper
            const y1bot = H - (i + 1) * bottomTaper
            const gap = 3
            const points = [
              `${x0 + gap},${y0top + gap}`,
              `${x1 - gap},${y1top + gap}`,
              `${x1 - gap},${y1bot - gap}`,
              `${x0 + gap},${y0bot - gap}`,
            ].join(' ')

            const midX = (x0 + x1) / 2
            const midY = (y0top + y0bot) / 2

            return (
              <g key={stage.key} onClick={() => setSelectedStage(stage.key)} style={{ cursor: 'pointer' }}>
                <polygon
                  points={points}
                  fill={stage.color}
                  opacity={isSelected ? 1 : 0.35}
                  stroke={isSelected ? 'white' : 'transparent'}
                  strokeWidth={isSelected ? 2 : 0}
                  rx={4}
                />
                {/* Count */}
                <text
                  x={midX}
                  y={midY - 8}
                  textAnchor="middle"
                  fill="white"
                  fontSize={14}
                  fontWeight="bold"
                  opacity={isSelected ? 1 : 0.6}
                >
                  {counts[i]}
                </text>
                {/* Value */}
                <text
                  x={midX}
                  y={midY + 10}
                  textAnchor="middle"
                  fill="white"
                  fontSize={10}
                  opacity={isSelected ? 0.9 : 0.5}
                >
                  {formatCurrency(values[i])}
                </text>
                {/* Stage label below */}
                <text
                  x={midX}
                  y={H + 32}
                  textAnchor="middle"
                  fill={isSelected ? stage.color : '#9ca3af'}
                  fontSize={10}
                  fontWeight={isSelected ? '600' : '400'}
                >
                  {stage.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Selected stage leads */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${selectedStageConfig.bg}`} />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedStageConfig.label}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">
              {visibleLeads.length} lead{visibleLeads.length !== 1 ? 's' : ''}
            </span>
          </div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {formatCurrency(values[stages.findIndex((s) => s.key === selectedStage)])}
          </span>
        </div>

        {visibleLeads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">No leads in this stage</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {visibleLeads.map((lead) => {
              const isLastStage = lead.stage === 'closed-won'
              return (
                <div
                  key={lead.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.name}</p>
                      <span className="text-xs text-gray-400 dark:text-gray-500">— {lead.address}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {lead.propertyType}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <DollarSign className="h-3 w-3" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">{formatCurrency(lead.value)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        {lead.daysInStage}d in stage
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <div className={`h-3.5 w-3.5 rounded-full ${lead.agentColor} flex items-center justify-center`}>
                          <User className="h-2 w-2 text-white" />
                        </div>
                        {lead.agent}
                      </div>
                    </div>
                  </div>

                  {isLastStage ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                      ✓ Closed Won
                    </span>
                  ) : (
                    <button
                      onClick={() => moveToNextStage(lead.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors whitespace-nowrap"
                    >
                      Move Forward
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageLayout>
  )
}
