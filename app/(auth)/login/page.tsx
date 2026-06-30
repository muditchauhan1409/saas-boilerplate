// app/(auth)/login/page.tsx
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Step = 'credentials' | 'otp'

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // First verify credentials
    const res = await signIn('credentials', {
      email, password, redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
      return
    }

    // Send OTP
    const otpRes = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    if (!otpRes.ok) {
      setError('Failed to send verification code')
      setLoading(false)
      return
    }

    setStep('otp')
    setLoading(false)
  }

  const handleOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code: otp }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  const handleResend = async () => {
    setResending(true)
    setError('')
    await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setResending(false)
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
            {step === 'credentials' ? 'The SaaS foundation you\'ve been looking for' : 'Check your inbox'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', lineHeight: 1.7, margin: '0 0 48px' }}>
            {step === 'credentials'
              ? 'Auth, organizations, billing, and AI insights — all wired up and ready to go.'
              : `We sent a 6-digit verification code to ${email}`}
          </p>

          {step === 'credentials' && ['🔐 Secure Authentication', '🏢 Multi-tenant Orgs', '💳 Stripe Billing', '🤖 AI Insights'].map(f => (
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

          {step === 'otp' && (
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '16px', padding: '24px'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '15px', margin: '0 0 8px', fontWeight: '600' }}>
                📧 Email sent!
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', margin: 0, lineHeight: 1.6 }}>
                The code expires in 10 minutes. Check your spam folder if you don't see it.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px', background: '#ffffff',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 48px'
      }}>
        {step === 'credentials' ? (
          <>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
              Welcome back 👋
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 36px' }}>
              Sign in to your account to continue
            </p>

            <form onSubmit={handleCredentials}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  Email address
                </label>
                <input
                  type="email" value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com" required
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '15px', color: '#0f172a', outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box' as const
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
                  type="password" value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '15px', color: '#0f172a', outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box' as const
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

              <button type="submit" disabled={loading} style={{
                width: '100%', padding: '13px',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                border: 'none', borderRadius: '10px',
                color: 'white', fontSize: '15px', fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                boxShadow: '0 4px 24px rgba(139,92,246,0.35)'
              }}>
                {loading ? 'Sending code...' : 'Continue →'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '14px', color: '#64748b' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>
                Create one free
              </Link>
            </p>
          </>
        ) : (
          <>
            <div style={{
              width: '56px', height: '56px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              borderRadius: '16px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', marginBottom: '24px',
              boxShadow: '0 8px 24px rgba(139,92,246,0.3)'
            }}>🔐</div>

            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
              Enter verification code
            </h1>
            <p style={{ color: '#64748b', fontSize: '15px', margin: '0 0 8px' }}>
              We sent a 6-digit code to
            </p>
            <p style={{ color: '#7c3aed', fontSize: '15px', fontWeight: '600', margin: '0 0 32px' }}>
              {email}
            </p>

            <form onSubmit={handleOTP}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  6-digit code
                </label>
                <input
                  type="text" value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000" required maxLength={6}
                  style={{
                    width: '100%', padding: '16px',
                    border: '1.5px solid #e2e8f0', borderRadius: '10px',
                    fontSize: '28px', color: '#0f172a', outline: 'none',
                    background: '#f8fafc', boxSizing: 'border-box' as const,
                    textAlign: 'center', letterSpacing: '12px', fontWeight: '700'
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

              <button type="submit" disabled={loading || otp.length !== 6} style={{
                width: '100%', padding: '13px',
                background: otp.length === 6
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : '#e2e8f0',
                border: 'none', borderRadius: '10px',
                color: otp.length === 6 ? 'white' : '#94a3b8',
                fontSize: '15px', fontWeight: '600',
                cursor: loading || otp.length !== 6 ? 'not-allowed' : 'pointer',
                boxShadow: otp.length === 6 ? '0 4px 24px rgba(139,92,246,0.35)' : 'none',
                transition: 'all 0.3s'
              }}>
                {loading ? 'Verifying...' : 'Verify & Sign in →'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px' }}>
                Didn't receive the code?
              </p>
              <button
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: 'none', border: 'none',
                  color: '#8b5cf6', fontSize: '14px', fontWeight: '600',
                  cursor: 'pointer', padding: 0
                }}
              >
                {resending ? 'Sending...' : 'Resend code'}
              </button>
            </div>

            <button
              onClick={() => { setStep('credentials'); setOtp(''); setError('') }}
              style={{
                background: 'none', border: 'none',
                color: '#94a3b8', fontSize: '14px',
                cursor: 'pointer', marginTop: '16px',
                textAlign: 'center', width: '100%'
              }}
            >
              ← Back to login
            </button>
          </>
        )}
      </div>
    </div>
  )
}