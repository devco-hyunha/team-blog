import { Outlet } from 'react-router-dom'
import NaviBar from './NaviBar'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <NaviBar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <p className="mx-auto max-w-5xl px-4 py-4 text-sm text-slate-500">
          &copy; {new Date().getFullYear()} AX Academy Team
        </p>
      </footer>
    </div>
  )
}
