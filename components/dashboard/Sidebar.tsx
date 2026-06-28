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
  ChevronRight,
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
    <aside style={{
      width: '260px',
      background: 'white',
      borderRight: '1px solid #f1f5f9',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      boxShadow: '2px 0 12px rgba(0,0,0,0.04)'
    }}>
      {/* Logo */}
      <div style={{ padding: '8px 12px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '700', fontSize: '16px',
            boxShadow: '0 4px 12px rgba(139,92,246,0.3)'
          }}>S</div>
          <div>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>SaaS Co.</p>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Workspace</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div style={{
        padding: '12px',
        background: '#f8fafc',
        borderRadius: '12px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: '600', fontSize: '14px',
          flexShrink: 0
        }}>
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.name}
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Nav label */}
      <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0 12px', marginBottom: '8px' }}>
        Navigation
      </p>

      {/* Nav links */}
      <nav style={{ flex: 1 }}>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                background: active ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                color: active ? 'white' : '#64748b',
                fontWeight: active ? '600' : '400',
                fontSize: '14px',
                transition: 'all 0.2s',
                boxShadow: active ? '0 4px 12px rgba(139,92,246,0.3)' : 'none',
              }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
              {active && <ChevronRight size={14} />}
            </Link>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: '1px', background: '#f1f5f9', margin: '16px 0' }} />

      {/* Sign out */}
      <button
        onClick={() => signOut({ callbackUrl: '/login' })}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '10px 12px',
          borderRadius: '10px',
          border: 'none',
          background: 'transparent',
          color: '#94a3b8',
          fontSize: '14px',
          cursor: 'pointer',
          width: '100%',
          transition: 'all 0.2s'
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#fef2f2'
          e.currentTarget.style.color = '#ef4444'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = '#94a3b8'
        }}
      >
        <LogOut size={16} />
        Sign out
      </button>
    </aside>
  )
}