'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, Users, Settings, FileText, Terminal, Brain, Database } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home, badge: null },
  { name: 'Agents', href: '/agents', icon: Brain, badge: '2' },
  { name: 'Tasks', href: '/tasks', icon: FileText, badge: '8' },
  { name: 'Analytics', href: '/analytics', icon: BarChart2, badge: null },
  { name: 'Memory', href: '/memory', icon: Database, badge: null },
  { name: 'Tools', href: '/tools', icon: Terminal, badge: null },
  { name: 'Team', href: '/team', icon: Users, badge: null },
  { name: 'Settings', href: '/settings', icon: Settings, badge: null },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col overflow-y-auto border-r border-gray-100 dark:border-gray-800/80 bg-white dark:bg-gray-950 px-4 pb-4">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center px-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-900 dark:text-white tracking-tight">Mission Control</h1>
              <p className="text-xs text-gray-400 dark:text-gray-500">Evergreen AI System</p>
            </div>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-y-6 mt-2">
          <div>
            <p className="px-3 mb-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Navigation
            </p>
            <ul role="list" className="space-y-0.5">
              {navigation.map((item) => {
                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-100 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 shrink-0 ${
                          isActive
                            ? 'text-blue-600 dark:text-blue-400'
                            : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        }`}
                      />
                      <span className="flex-1 leading-none">{item.name}</span>
                      {item.badge && (
                        <span
                          className={`ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                            isActive
                              ? 'bg-blue-600 dark:bg-blue-500 text-white'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="mt-auto">
            <div className="mb-3 px-3 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-gray-400 dark:text-gray-500">All systems operational</span>
            </div>
            <div className="rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">HW</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Hunter Warren</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 truncate">Evergreen Landscaping</p>
                </div>
                <Settings className="h-4 w-4 text-gray-400 dark:text-gray-500 shrink-0 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}
