import { Home, BarChart, Users, Settings, FileText, Terminal, Cpu, Zap } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', icon: Home, current: true },
  { name: 'Agents', icon: Cpu, current: false },
  { name: 'Tasks', icon: FileText, current: false },
  { name: 'Analytics', icon: BarChart, current: false },
  { name: 'Memory', icon: Zap, current: false },
  { name: 'Tools', icon: Terminal, current: false },
  { name: 'Team', icon: Users, current: false },
  { name: 'Settings', icon: Settings, current: false },
]

export default function Sidebar() {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Terminal className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mission Control</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Evergreen AI System</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                        ${item.current
                          ? 'bg-gray-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold">HW</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Hunter Warren</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Evergreen Landscaping</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}