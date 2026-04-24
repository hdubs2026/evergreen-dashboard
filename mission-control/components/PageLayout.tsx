import Sidebar from './Sidebar'
import Header from './Header'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="lg:pl-72">
        <Header />
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  )
}
