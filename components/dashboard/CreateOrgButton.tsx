// components/dashboard/CreateOrgButton.tsx
'use client'

import { useRouter } from 'next/navigation'

export default function CreateOrgButton() {
  const router = useRouter()

  const handleCreate = async () => {
    await fetch('/api/orgs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    router.refresh()
  }

  return (
    <button
      onClick={handleCreate}
      className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-lg transition"
    >
      + Create Organization
    </button>
  )
}