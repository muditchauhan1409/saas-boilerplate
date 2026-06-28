// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', { email, password, redirect: false })
    if (res?.error) { setError('Invalid email or password'); setLoading(false); return }
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow circles */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
          borderRadius: '50%'
        }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '400px' }}>
          <div style={{
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 32px',
            fontSize: '24px', fontWeight: 'bold', color: 'white',
            boxShadow: '0 8px 32px rgba(139,92,246,0.4)'
          }}>S</div>

          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '700', margin: '0 0 16px', lineHeight: 1.2 }}>
            The SaaS foundation you've been looking for
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, margin: '0 0 48px' }}>
            Auth, organizations, billing, and AI insights — all wired up and ready to go.
          </p>

          {/* Feature pills */}
          {['🔐 Secure Authentication', '🏢 Multi-tenant Orgs', '💳 Stripe Billing', '🤖 AI Insights'].map(f => (
            <div key={f} style={{
              display: 'inline-block', margin: '4px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '100px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '13px'
            }}>{f}</div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 48px'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
          Welcome back 
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 36px' }}>
          Sign in to your account to continue
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%', padding: '12px 16px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px', fontSize: '15px',
                color: '#0f172a', outline: 'none',
                background: '#f8fafc',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = '#8b5cf6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Password</label>
              <a href="#" style={{ fontSize: '13px', color: '#8b5cf6', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', padding: '12px 16px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px', fontSize: '15px',
                color: '#0f172a', outline: 'none',
                background: '#f8fafc',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = '#8b5cf6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px 16px', marginBottom: '20px',
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: '10px', color: '#dc2626', fontSize: '14px'
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '13px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              border: 'none', borderRadius: '10px',
              color: 'white', fontSize: '15px', fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 4px 24px rgba(139,92,246,0.35)',
              transition: 'all 0.2s'
            }}
          >
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#64748b' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>
            Create one free
          </Link>
        </p>

        <div style={{
          marginTop: '48px', paddingTop: '24px',
          borderTop: '1px solid #f1f5f9',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}