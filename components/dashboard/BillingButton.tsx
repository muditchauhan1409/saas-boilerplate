// components/dashboard/BillingButton.tsx
'use client'

import { useState } from 'react'

export default function BillingButton({ orgId }: { orgId: string }) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    const res = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orgId }),
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
    else setLoading(false)
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      style={{
        padding: '12px 28px',
        background: 'white',
        border: 'none', borderRadius: '10px',
        color: '#7c3aed', fontSize: '14px', fontWeight: '700',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        transition: 'all 0.2s',
        display: 'inline-flex', alignItems: 'center', gap: '8px'
      }}
    >
      {loading ? 'Redirecting...' : ' Upgrade to Pro'}
    </button>
  )
}