// components/dashboard/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Sparkles,
  LogOut,
} from 'lucide-react'

const links = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/members', label: 'Members', icon: Users },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/ai-insights', label: 'AI Insights', icon: Sparkles },
]

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-gray-800 flex flex-col py-6 px-4">
      <div className="mb-8 px-2">
        <h1 className="text-white font-semibold text-lg">SaaS Co.</h1>
        <p className="text-gray-500 text-xs mt-1">{user?.email}</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  )
}