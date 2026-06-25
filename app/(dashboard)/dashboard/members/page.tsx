// app/(dashboard)/dashboard/members/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import InviteMemberForm from '@/components/dashboard/InviteMemberForm'

export default async function MembersPage() {
  const session = await getServerSession(authOptions)

  const membership = await prisma.member.findFirst({
    where: { userId: session!.user.id },
    include: {
      org: {
        include: {
          members: {
            include: { user: true },
          },
        },
      },
    },
  })

  if (!membership) {
    return (
      <div className="text-gray-400">
        You don't belong to any organization yet.
      </div>
    )
  }

  const { org, role } = membership

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Members</h1>
          <p className="text-gray-400 text-sm">{org.name}</p>
        </div>
        {role === 'ADMIN' && <InviteMemberForm orgId={org.id} />}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-xs text-gray-500 px-6 py-4">Name</th>
              <th className="text-left text-xs text-gray-500 px-6 py-4">Email</th>
              <th className="text-left text-xs text-gray-500 px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {org.members.map(({ user, role }) => (
              <tr key={user.id} className="border-b border-gray-800 last:border-0">
                <td className="px-6 py-4 text-white text-sm">{user.name}</td>
                <td className="px-6 py-4 text-gray-400 text-sm">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    role === 'ADMIN'
                      ? 'bg-violet-900 text-violet-300'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}