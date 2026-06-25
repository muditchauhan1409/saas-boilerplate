// components/dashboard/InviteMemberForm.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function InviteMemberForm({ orgId }: { orgId: string }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(false)

  const handleInvite = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    const res = await fetch('/api/orgs/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, orgId }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
    } else {
      setSuccess('Member added successfully!')
      setEmail('')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div>
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition"
        >
          + Invite Member
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="member@example.com"
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
          />
          <button
            onClick={handleInvite}
            disabled={loading}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button
            onClick={() => setOpen(false)}
            className="px-3 py-2 text-gray-400 hover:text-white text-sm"
          >
            Cancel
          </button>
        </div>
      )}
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      {success && <p className="text-green-400 text-xs mt-2">{success}</p>}
    </div>
  )
}