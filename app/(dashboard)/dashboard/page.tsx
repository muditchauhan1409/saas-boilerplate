// app/(dashboard)/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CreateOrgButton from '@/components/dashboard/CreateOrgButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const orgs = await prisma.member.findMany({
    where: { userId: session!.user.id },
    include: { org: { include: { subscription: true, members: true } } },
  })

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
          Welcome back, {session?.user?.name?.split(' ')[0]} 
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Here's what's happening with your organizations.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Organizations', value: orgs.length, icon: '🏢', color: '#8b5cf6' },
          { label: 'Total Members', value: orgs.reduce((acc, m) => acc + m.org.members.length, 0), icon: '👥', color: '#6366f1' },
          { label: 'Active Plans', value: orgs.filter(m => m.org.subscription?.plan === 'PRO').length, icon: '💳', color: '#06b6d4' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white',
            borderRadius: '16px',
            padding: '24px',
            border: '1px solid #f1f5f9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>{stat.icon}</span>
              <span style={{
                fontSize: '12px', fontWeight: '600',
                color: stat.color,
                background: stat.color + '15',
                padding: '4px 10px', borderRadius: '100px'
              }}>Active</span>
            </div>
            <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>{stat.value}</p>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Orgs section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: 0 }}>Your Organizations</h2>
        <CreateOrgButton />
      </div>

      {orgs.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '2px dashed #e2e8f0',
          padding: '60px', textAlign: 'center'
        }}>
          <p style={{ fontSize: '40px', margin: '0 0 16px' }}>🏢</p>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 8px' }}>No organizations yet</p>
          <p style={{ color: '#94a3b8', margin: '0 0 24px' }}>Create your first organization to get started</p>
          <CreateOrgButton />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
          {orgs.map(({ org, role }) => (
            <div key={org.id} style={{
              background: 'white', borderRadius: '16px',
              border: '1px solid #f1f5f9',
              padding: '24px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              transition: 'box-shadow 0.2s'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px',
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '700', fontSize: '18px'
                  }}>
                    {org.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '600', color: '#0f172a' }}>{org.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>/{org.slug.split('-')[0]}</p>
                  </div>
                </div>
                <span style={{
                  fontSize: '11px', fontWeight: '600',
                  padding: '4px 10px', borderRadius: '100px',
                  background: role === 'ADMIN' ? '#f3f0ff' : '#f0f9ff',
                  color: role === 'ADMIN' ? '#7c3aed' : '#0369a1'
                }}>{role}</span>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ textAlign: 'center', flex: 1, padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{org.members.length}</p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Members</p>
                </div>
                <div style={{ textAlign: 'center', flex: 1, padding: '12px', background: '#f8fafc', borderRadius: '10px' }}>
                  <p style={{ margin: '0 0 2px', fontSize: '20px', fontWeight: '700', color: org.subscription?.plan === 'PRO' ? '#7c3aed' : '#0f172a' }}>
                    {org.subscription?.plan || 'FREE'}
                  </p>
                  <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>Plan</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}