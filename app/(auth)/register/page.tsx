// app/(auth)/register/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function checkPassword(password: string) {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[%&$#@!]/.test(password),
  }
}

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showConditions, setShowConditions] = useState(false)

  const checks = checkPassword(password)
  const allPassed = Object.values(checks).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!allPassed) { setError('Please meet all password requirements'); return }
    setLoading(true)
    setError('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Something went wrong'); setLoading(false); return }
    router.push('/login')
  }

  const conditions = [
    { key: 'minLength', label: 'Minimum 8 characters' },
    { key: 'hasUpper', label: 'At least one uppercase letter (A-Z)' },
    { key: 'hasNumber', label: 'At least one number (0-9)' },
    { key: 'hasSpecial', label: 'At least one special character (% & $ # @ !)' },
  ]

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '10px', fontSize: '15px',
    color: '#0f172a', outline: 'none',
    background: '#f8fafc',
    boxSizing: 'border-box' as const
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, sans-serif' }}>

      {/* Left Panel */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
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
            Start building your SaaS today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, margin: '0 0 48px' }}>
            Join thousands of developers who ship faster with our production-ready boilerplate.
          </p>

          {[
            { icon: '✅', text: 'Free to get started' },
            { icon: '⚡', text: 'Set up in under 5 minutes' },
            { icon: '🔒', text: 'Enterprise-grade security' },
            { icon: '🚀', text: 'Deploy to production instantly' },
          ].map(item => (
            <div key={item.text} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              marginBottom: '16px', textAlign: 'left'
            }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px', background: '#ffffff',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 48px',
        overflowY: 'auto'
      }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
          Create your account 🎉
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 36px' }}>
          Get started for free — no credit card required
        </p>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Name"
              required
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#8b5cf6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Email */}
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
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#8b5cf6'}
              onBlur={e => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setShowConditions(true) }}
              onFocus={() => setShowConditions(true)}
              placeholder="Create a strong password"
              required
              style={{
                ...inputStyle,
                borderColor: password && allPassed ? '#22c55e' : password && showConditions ? '#f97316' : '#e2e8f0'
              }}
            />
          </div>

          {/* Password strength bar */}
          {showConditions && password && (
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {[0, 1, 2, 3].map(i => {
                  const passed = Object.values(checks).filter(Boolean).length
                  const color = passed <= 1 ? '#ef4444' : passed === 2 ? '#f97316' : passed === 3 ? '#eab308' : '#22c55e'
                  return (
                    <div key={i} style={{
                      flex: 1, height: '4px', borderRadius: '2px',
                      background: i < passed ? color : '#e2e8f0',
                      transition: 'background 0.3s'
                    }} />
                  )
                })}
              </div>
              <p style={{
                fontSize: '12px', margin: 0,
                color: Object.values(checks).filter(Boolean).length <= 1 ? '#ef4444' :
                       Object.values(checks).filter(Boolean).length === 2 ? '#f97316' :
                       Object.values(checks).filter(Boolean).length === 3 ? '#eab308' : '#22c55e'
              }}>
                {Object.values(checks).filter(Boolean).length <= 1 ? 'Weak' :
                 Object.values(checks).filter(Boolean).length === 2 ? 'Fair' :
                 Object.values(checks).filter(Boolean).length === 3 ? 'Good' : '✓ Strong'}
              </p>
            </div>
          )}

          {/* Password conditions */}
          {showConditions && (
            <div style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: '10px', padding: '14px 16px', marginBottom: '20px'
            }}>
              {conditions.map(({ key, label }) => {
                const passed = checks[key as keyof typeof checks]
                return (
                  <div key={key} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginBottom: '8px', transition: 'all 0.2s'
                  }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%',
                      background: passed ? '#22c55e' : '#e2e8f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'background 0.3s'
                    }}>
                      {passed && <span style={{ color: 'white', fontSize: '11px', fontWeight: 'bold' }}>✓</span>}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: passed ? '#16a34a' : '#94a3b8',
                      fontWeight: passed ? '500' : '400',
                      transition: 'color 0.3s'
                    }}>
                      {label}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px 16px', marginBottom: '20px',
              background: '#fef2f2', border: '1px solid #fecaca',
              borderRadius: '10px', color: '#dc2626', fontSize: '14px'
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !allPassed}
            style={{
              width: '100%', padding: '13px',
              background: allPassed
                ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                : '#e2e8f0',
              border: 'none', borderRadius: '10px',
              color: allPassed ? 'white' : '#94a3b8',
              fontSize: '15px', fontWeight: '600',
              cursor: loading || !allPassed ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              boxShadow: allPassed ? '0 4px 24px rgba(139,92,246,0.35)' : 'none',
              transition: 'all 0.3s'
            }}
          >
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#64748b' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f1f5f9', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}