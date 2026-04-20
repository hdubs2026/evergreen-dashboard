import { Search, Bell, HelpCircle } from 'lucide-react'

export default function Header() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400 dark:text-gray-500 ml-3" />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-0 sm:text-sm bg-transparent"
            placeholder="Search agents, tasks, or tools..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
          </button>
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          >
            <span className="sr-only">Help</span>
            <HelpCircle className="h-6 w-6" />
          </button>
          <div className="hidden lg:block h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <div className="flex items-center gap-x-3">
            <div className="text-sm">
              <p className="font-semibold text-gray-900 dark:text-white">System Status</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-gray-500 dark:text-gray-400">All systems operational</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}