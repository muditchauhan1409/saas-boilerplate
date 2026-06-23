// app/(dashboard)/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CreateOrgButton from '@/components/dashboard/CreateOrgButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const orgs = await prisma.member.findMany({
    where: { userId: session!.user.id },
    include: { org: true },
  })

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Overview</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, {session?.user?.name}</p>

      {orgs.length === 0 ? (
        <div className="border border-dashed border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 mb-4">You don't have any organizations yet.</p>
          <CreateOrgButton />
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-medium">Your Organizations</h2>
            <CreateOrgButton />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orgs.map(({ org, role }) => (
              <div key={org.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-white font-medium">{org.name}</h2>
                  <span className="text-xs px-2 py-1 rounded-full bg-violet-900 text-violet-300">
                    {role}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">/{org.slug}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}