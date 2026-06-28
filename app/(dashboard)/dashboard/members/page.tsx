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
          members: { include: { user: true } },
        },
      },
    },
  })

  if (!membership) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '60vh', flexDirection: 'column', gap: '16px'
      }}>
        <p style={{ fontSize: '40px' }}>🏢</p>
        <p style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>No organization found</p>
        <p style={{ color: '#94a3b8' }}>Create an organization first from the Overview page</p>
      </div>
    )
  }

  const { org, role } = membership

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
            Team Members
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
            Manage your team for <strong>{org.name}</strong>
          </p>
        </div>
        {role === 'ADMIN' && <InviteMemberForm orgId={org.id} />}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Total Members', value: org.members.length, icon: '👥' },
          { label: 'Admins', value: org.members.filter(m => m.role === 'ADMIN').length, icon: '👑' },
          { label: 'Members', value: org.members.filter(m => m.role === 'MEMBER').length, icon: '👤' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '16px',
            padding: '20px 24px', border: '1px solid #f1f5f9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: '16px'
          }}>
            <span style={{ fontSize: '28px' }}>{stat.icon}</span>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 120px',
          padding: '14px 24px',
          background: '#f8fafc',
          borderBottom: '1px solid #f1f5f9'
        }}>
          {['Member', 'Email', 'Role'].map(h => (
            <p key={h} style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</p>
          ))}
        </div>

        {org.members.map(({ user, role }, index) => (
          <div key={user.id} style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 120px',
            padding: '16px 24px',
            alignItems: 'center',
            borderBottom: index < org.members.length - 1 ? '1px solid #f8fafc' : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px', height: '38px',
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: '600', fontSize: '14px', flexShrink: 0
              }}>
                {user.name?.charAt(0).toUpperCase() || '?'}
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{user.name}</p>
                {user.id === session!.user.id && (
                  <span style={{ fontSize: '11px', color: '#8b5cf6', fontWeight: '500' }}>You</span>
                )}
              </div>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>{user.email}</p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '12px', fontWeight: '600',
              padding: '4px 12px', borderRadius: '100px',
              background: role === 'ADMIN' ? '#f3f0ff' : '#f0f9ff',
              color: role === 'ADMIN' ? '#7c3aed' : '#0369a1',
              width: 'fit-content'
            }}>
              {role === 'ADMIN' ? '👑' : '👤'} {role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}