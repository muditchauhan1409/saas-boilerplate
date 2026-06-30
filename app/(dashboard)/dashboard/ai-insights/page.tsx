// app/(dashboard)/dashboard/ai-insights/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getChurnRisk(plan: string, createdAt: Date, memberCount: number) {
  const daysSinceCreation = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  )
  if (plan === 'FREE' && daysSinceCreation > 7)
    return { level: 'High', reason: 'On free plan for over 7 days with no upgrade', color: '#ef4444', bg: '#fef2f2', border: '#fecaca', score: 85 }
  if (plan === 'FREE' && memberCount === 1)
    return { level: 'Medium', reason: 'Solo user on free plan — low engagement signal', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', score: 55 }
  if (plan === 'PRO' && memberCount === 1)
    return { level: 'Low', reason: 'Pro plan but only 1 member — monitor activity', color: '#f59e0b', bg: '#fffbeb', border: '#fde68a', score: 30 }
  return { level: 'Low', reason: 'Active team on Pro plan — healthy engagement', color: '#22c55e', bg: '#f0fdf4', border: '#bbf7d0', score: 10 }
}

function getUpsellSignal(plan: string, memberCount: number) {
  if (plan === 'FREE' && memberCount >= 2)
    return { text: 'Team is growing — perfect time to upgrade to Pro', type: 'hot' }
  if (plan === 'FREE')
    return { text: 'Offer a 14-day Pro trial to increase conversion', type: 'warm' }
  if (plan === 'PRO' && memberCount >= 5)
    return { text: 'Large team — consider Enterprise plan outreach', type: 'hot' }
  return null
}

export default async function AIInsightsPage() {
  const session = await getServerSession(authOptions)

  const memberships = await prisma.member.findMany({
    where: { userId: session!.user.id },
    include: {
      org: {
        include: {
          subscription: true,
          members: true,
        },
      },
    },
  })

  const totalOrgs = memberships.length
  const highRisk = memberships.filter((m: typeof memberships[number]) => {
    const plan = m.org.subscription?.plan || 'FREE'
    const days = Math.floor((Date.now() - m.org.createdAt.getTime()) / (1000 * 60 * 60 * 24))
    return plan === 'FREE' && days > 7
  }).length

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
          AI Insights
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Intelligent analysis of your organization health and growth signals
        </p>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Organizations Tracked', value: totalOrgs, icon: '🏢', color: '#8b5cf6', bg: '#f3f0ff' },
          { label: 'High Churn Risk', value: highRisk, icon: '⚠️', color: '#ef4444', bg: '#fef2f2' },
          { label: 'Upsell Opportunities', value: memberships.filter(m => getUpsellSignal(m.org.subscription?.plan || 'FREE', m.org.members.length)).length, icon: '💡', color: '#f59e0b', bg: '#fffbeb' },
        ].map(stat => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '16px',
            padding: '20px 24px', border: '1px solid #f1f5f9',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', gap: '16px'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: stat.bg, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', flexShrink: 0
            }}>{stat.icon}</div>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '28px', fontWeight: '700', color: stat.color }}>{stat.value}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Org cards */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 16px' }}>
        Organization Analysis
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {memberships.map(({ org }) => {
          const plan = org.subscription?.plan || 'FREE'
          const memberCount = org.members.length
          const churn = getChurnRisk(plan, org.createdAt, memberCount)
          const upsell = getUpsellSignal(plan, memberCount)

          return (
            <div key={org.id} style={{
              background: 'white', borderRadius: '20px',
              border: '1px solid #f1f5f9', padding: '28px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
            }}>
              {/* Org header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
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
                    <p style={{ margin: '0 0 2px', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>{org.name}</p>
                    <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>{memberCount} member{memberCount !== 1 ? 's' : ''} · {plan} plan</p>
                  </div>
                </div>
                <span style={{
                  padding: '6px 14px', borderRadius: '100px',
                  background: plan === 'PRO' ? '#f3f0ff' : '#f8fafc',
                  color: plan === 'PRO' ? '#7c3aed' : '#64748b',
                  fontSize: '12px', fontWeight: '600'
                }}>
                  {plan === 'PRO' ? '✨ Pro' : '🆓 Free'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: upsell ? '1fr 1fr' : '1fr', gap: '16px' }}>
                {/* Churn Risk */}
                <div style={{
                  padding: '20px', borderRadius: '14px',
                  background: churn.bg, border: `1px solid ${churn.border}`
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Churn Risk
                    </p>
                    <span style={{
                      padding: '3px 10px', borderRadius: '100px',
                      background: churn.color + '20',
                      color: churn.color, fontSize: '12px', fontWeight: '700'
                    }}>
                      {churn.level} Risk
                    </span>
                  </div>

                  {/* Score bar */}
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${churn.score}%`,
                        background: churn.color, borderRadius: '3px',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#94a3b8' }}>
                      Risk score: {churn.score}/100
                    </p>
                  </div>

                  <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                    {churn.reason}
                  </p>
                </div>

                {/* Upsell */}
                {upsell && (
                  <div style={{
                    padding: '20px', borderRadius: '14px',
                    background: upsell.type === 'hot' ? '#fff7ed' : '#fefce8',
                    border: `1px solid ${upsell.type === 'hot' ? '#fed7aa' : '#fef08a'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Upsell Signal
                      </p>
                      <span style={{
                        padding: '3px 10px', borderRadius: '100px',
                        background: upsell.type === 'hot' ? '#fed7aa' : '#fef08a',
                        color: upsell.type === 'hot' ? '#c2410c' : '#a16207',
                        fontSize: '12px', fontWeight: '700'
                      }}>
                        {upsell.type === 'hot' ? '🔥 Hot' : '💡 Warm'}
                      </span>
                    </div>

                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px',
                      background: upsell.type === 'hot' ? '#fed7aa' : '#fef08a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', marginBottom: '12px'
                    }}>
                      {upsell.type === 'hot' ? '🔥' : '💡'}
                    </div>

                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
                      {upsell.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}