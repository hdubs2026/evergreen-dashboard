'use client'

import { useState, useRef, useEffect } from 'react'
import PageLayout from '@/components/PageLayout'
import { Send, Terminal, Wifi, WifiOff } from 'lucide-react'

type Message = {
  id: number
  role: 'jarvis' | 'user'
  content: string
  timestamp: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'jarvis',
    content: 'JARVIS online. Connected to Evergreen Mission Control. All agent subsystems nominal. How can I assist?',
    timestamp: '09:14:02',
  },
  {
    id: 2,
    role: 'user',
    content: 'Give me a status summary for today.',
    timestamp: '09:14:18',
  },
  {
    id: 3,
    role: 'jarvis',
    content:
      'STATUS REPORT — 2026-04-24\n\n• Jordan: Processing 3 overdue invoices in QuickBooks. ETA 47 min.\n• Jerry: 2 open leads in follow-up stage. Reese R. quote at $4,200 — no response in 3 days. Flagged.\n• Donna: Crew notifications sent for April schedule. Weekly standup confirmed for Monday 07:30.\n• Memory vault: Last sync 6h ago. 14 new decision checkpoints logged.\n\nNo critical alerts. Revenue pipeline at $68,400 open value.',
    timestamp: '09:14:19',
  },
  {
    id: 4,
    role: 'user',
    content: 'Follow up on the Reese R quote automatically.',
    timestamp: '09:15:03',
  },
  {
    id: 5,
    role: 'jarvis',
    content:
      'Understood. Dispatching Jerry to send follow-up on Reese R. quote ($4,200 landscaping proposal).\n\nDraft: "Hi Reese, following up on the proposal we sent over — happy to answer any questions or adjust the scope. Let me know if you\'d like to schedule a quick call."\n\nTask created → assigned to Jerry → status: in-progress.\nYou\'ll be notified when a response is received.',
    timestamp: '09:15:04',
  },
]

export default function JarvisPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isConnected] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function handleSend() {
    const text = input.trim()
    if (!text) return
    const now = new Date()
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    const userMsg: Message = {
      id: messages.length + 1,
      role: 'user',
      content: text,
      timestamp: ts,
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        role: 'jarvis',
        content: `Received. Processing request: "${text}"\n\nThis interface will route to the live OpenClaw endpoint at http://localhost:18789 when connected. Standing by for your next command.`,
        timestamp: ts,
      }
      setMessages((prev) => [...prev, reply])
      setIsTyping(false)
    }, 1200)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <PageLayout>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jarvis</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Main agent — Evergreen Mission Control
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2">
          {isConnected ? (
            <Wifi className="h-4 w-4 text-green-500" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-400" />
          )}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 font-mono">
            localhost:18789
          </span>
          <span
            className={`h-1.5 w-1.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`}
          />
        </div>
      </div>

      {/* Terminal window */}
      <div className="rounded-xl border border-gray-800 bg-gray-950 overflow-hidden flex flex-col shadow-2xl" style={{ height: 'calc(100vh - 14rem)' }}>
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500/70" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <div className="h-3 w-3 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Terminal className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-xs font-mono text-gray-500">jarvis@mission-control ~ openclaw/v1</span>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs">{msg.timestamp}</span>
                <span
                  className={`text-xs font-semibold ${
                    msg.role === 'jarvis' ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {msg.role === 'jarvis' ? 'JARVIS' : 'YOU'}
                </span>
              </div>
              <div
                className={`pl-0 whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'jarvis'
                    ? 'text-blue-300'
                    : 'text-gray-100'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs">--:--:--</span>
                <span className="text-xs font-semibold text-blue-400">JARVIS</span>
              </div>
              <div className="text-blue-400 flex gap-1 items-center">
                <span className="animate-pulse">▋</span>
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input area */}
        <div className="border-t border-gray-800 bg-gray-900 px-4 py-3 flex items-center gap-3">
          <span className="text-green-400 font-mono text-sm shrink-0">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a command to Jarvis..."
            className="flex-1 bg-transparent font-mono text-sm text-gray-100 placeholder:text-gray-600 outline-none"
            autoFocus
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="shrink-0 p-1.5 rounded-md text-gray-500 hover:text-blue-400 disabled:opacity-30 transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
