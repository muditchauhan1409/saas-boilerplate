// app/(dashboard)/dashboard/billing/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import BillingButton from '@/components/dashboard/BillingButton'

export default async function BillingPage() {
  const session = await getServerSession(authOptions)

  const membership = await prisma.member.findFirst({
    where: { userId: session!.user.id },
    include: { org: { include: { subscription: true } } },
  })

  const sub = membership?.org.subscription
  const plan = sub?.plan || 'FREE'

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#0f172a', margin: '0 0 8px' }}>
          Billing & Plans
        </h1>
        <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
          Manage your subscription and billing details
        </p>
      </div>

      {/* Current plan banner */}
      <div style={{
        background: plan === 'PRO'
          ? 'linear-gradient(135deg, #4f46e5, #7c3aed)'
          : 'linear-gradient(135deg, #0f172a, #1e293b)',
        borderRadius: '20px', padding: '32px',
        marginBottom: '32px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', right: '100px',
          width: '120px', height: '120px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px', borderRadius: '100px',
            background: 'rgba(255,255,255,0.15)',
            color: 'white', fontSize: '12px', fontWeight: '600',
            marginBottom: '12px'
          }}>
            {plan === 'PRO' ? '✨ Current Plan' : '🆓 Current Plan'}
          </span>
          <h2 style={{ color: 'white', fontSize: '36px', fontWeight: '700', margin: '0 0 8px' }}>
            {plan === 'PRO' ? 'Pro Plan' : 'Free Plan'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', margin: '0 0 24px' }}>
            {plan === 'PRO'
              ? 'You have access to all Pro features including AI Insights and unlimited members.'
              : 'You are on the free plan. Upgrade to unlock all features.'}
          </p>
          {plan !== 'PRO' && membership?.role === 'ADMIN' && (
            <BillingButton orgId={membership.org.id} />
          )}
          {plan === 'PRO' && (
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Unlimited members', 'AI Insights', 'Priority support', 'Custom domains'].map(f => (
                <span key={f} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
                  ✓ {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Plans comparison */}
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', margin: '0 0 16px' }}>
        Compare Plans
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        {/* Free Plan */}
        <div style={{
          background: 'white', borderRadius: '20px',
          border: plan === 'FREE' ? '2px solid #8b5cf6' : '1px solid #f1f5f9',
          padding: '28px',
          boxShadow: plan === 'FREE' ? '0 0 0 4px rgba(139,92,246,0.08)' : '0 1px 4px rgba(0,0,0,0.04)'
        }}>
          {plan === 'FREE' && (
            <span style={{
              display: 'inline-block', padding: '3px 10px',
              background: '#f3f0ff', color: '#7c3aed',
              borderRadius: '100px', fontSize: '11px', fontWeight: '600',
              marginBottom: '16px'
            }}>Current Plan</span>
          )}
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>Free</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '12px 0 20px' }}>
            <span style={{ fontSize: '40px', fontWeight: '700', color: '#0f172a' }}>₹0</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>/month</span>
          </div>
          {[
            '1 organization',
            'Up to 3 members',
            'Basic analytics',
            'Community support',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: '#f0fdf4', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '10px', flexShrink: 0
              }}>✓</span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Pro Plan */}
        <div style={{
          background: plan === 'PRO' ? 'white' : 'linear-gradient(135deg, #faf5ff, #f0f9ff)',
          borderRadius: '20px',
          border: plan === 'PRO' ? '2px solid #8b5cf6' : '1px solid #e9d5ff',
          padding: '28px',
          boxShadow: plan === 'PRO' ? '0 0 0 4px rgba(139,92,246,0.08)' : '0 1px 4px rgba(0,0,0,0.04)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute', top: '-12px', right: '24px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: 'white', fontSize: '11px', fontWeight: '700',
            padding: '4px 12px', borderRadius: '100px',
            boxShadow: '0 4px 12px rgba(139,92,246,0.4)'
          }}>
            MOST POPULAR
          </div>
          {plan === 'PRO' && (
            <span style={{
              display: 'inline-block', padding: '3px 10px',
              background: '#f3f0ff', color: '#7c3aed',
              borderRadius: '100px', fontSize: '11px', fontWeight: '600',
              marginBottom: '16px'
            }}>Current Plan</span>
          )}
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>Pro</h3>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '12px 0 20px' }}>
            <span style={{ fontSize: '40px', fontWeight: '700', color: '#0f172a' }}>₹99</span>
            <span style={{ color: '#94a3b8', fontSize: '14px' }}>/month</span>
          </div>
          {[
            'Unlimited organizations',
            'Unlimited members',
            'AI churn & upsell insights',
            'Stripe billing management',
            'Priority support',
            'Custom domains',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: '#f3f0ff', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '10px', flexShrink: 0, color: '#7c3aed'
              }}>✓</span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{f}</span>
            </div>
          ))}
          {plan !== 'PRO' && membership?.role === 'ADMIN' && (
            <div style={{ marginTop: '20px' }}>
              <BillingButton orgId={membership.org.id} />
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #f1f5f9', padding: '28px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0f172a', margin: '0 0 20px' }}>
          Frequently asked questions
        </h3>
        {[
          { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. Your access continues until the end of the billing period.' },
          { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, debit cards, and UPI through Stripe.' },
          { q: 'Is there a free trial?', a: 'Our free plan gives you access to core features indefinitely. Upgrade to Pro when you need more.' },
        ].map(({ q, a }) => (
          <div key={q} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f8fafc' }}>
            <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{q}</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b', lineHeight: 1.6 }}>{a}</p>
          </div>
        ))}
      </div>
    </div>
  )
}