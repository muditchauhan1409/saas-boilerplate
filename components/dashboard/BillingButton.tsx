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
      className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
    >
      {loading ? 'Redirecting...' : 'Upgrade to Pro'}
    </button>
  )
}