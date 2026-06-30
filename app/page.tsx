// app/page.tsx
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0a0a0f', minHeight: '100vh' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 80px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(12px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '700', fontSize: '16px'
          }}>S</div>
          <span style={{ color: 'white', fontWeight: '700', fontSize: '18px' }}>SaaS Co.</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['Features', 'Pricing', 'Docs'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: 'rgba(255,255,255,0.6)', fontSize: '14px',
              textDecoration: 'none', transition: 'color 0.2s'
            }}>{item}</a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/login" style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '14px',
            textDecoration: 'none', padding: '8px 16px'
          }}>Sign in</Link>
          <Link href="/register" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: 'white', fontSize: '14px', fontWeight: '600',
            textDecoration: 'none', padding: '10px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 16px rgba(139,92,246,0.4)'
          }}>Get started free →</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        textAlign: 'center', padding: '120px 80px 80px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Glow effects */}
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px', borderRadius: '100px',
          background: 'rgba(139,92,246,0.1)',
          border: '1px solid rgba(139,92,246,0.3)',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '600' }}>✨ Now with AI-powered insights</span>
        </div>

        <h1 style={{
          fontSize: '72px', fontWeight: '800', color: 'white',
          margin: '0 0 24px', lineHeight: 1.1,
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          The SaaS foundation<br />you've been looking for
        </h1>

        <p style={{
          fontSize: '20px', color: 'rgba(255,255,255,0.5)',
          margin: '0 auto 48px', maxWidth: '560px', lineHeight: 1.7
        }}>
          Stop rebuilding auth, billing, and team management from scratch. Ship your SaaS product in days, not months.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <Link href="/register" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: 'white', fontSize: '16px', fontWeight: '600',
            textDecoration: 'none', padding: '14px 32px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(139,92,246,0.4)',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}>
            Start for free →
          </Link>
          <Link href="/login" style={{
            color: 'rgba(255,255,255,0.6)', fontSize: '16px',
            textDecoration: 'none', padding: '14px 32px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'inline-flex', alignItems: 'center', gap: '8px'
          }}>
            Sign in
          </Link>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '20px' }}>
          No credit card required · Free forever plan · Setup in 5 minutes
        </p>
      </section>

      {/* Stats */}
      <section style={{
        display: 'flex', justifyContent: 'center', gap: '64px',
        padding: '48px 80px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {[
          { value: '10x', label: 'Faster to ship' },
          { value: '100%', label: 'TypeScript' },
          { value: '5min', label: 'Setup time' },
          { value: 'Free', label: 'To get started' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '800', color: 'white' }}>{stat.value}</p>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '100px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#a78bfa', fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Everything you need
          </p>
          <h2 style={{ fontSize: '48px', fontWeight: '700', color: 'white', margin: '0 0 16px' }}>
            Built-in from day one
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', margin: 0 }}>
            Every feature you need to run a SaaS — already wired up and ready.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1100px', margin: '0 auto' }}>
          {[
            { icon: '🔐', title: 'Authentication + OTP', desc: 'Email/password login with 6-digit OTP verification for maximum security. Built on NextAuth.js.' },
            { icon: '🏢', title: 'Multi-tenant Orgs', desc: 'Full organization management with member invites, role-based access control, and data isolation.' },
            { icon: '💳', title: 'Stripe Billing', desc: 'Free and Pro plans with Stripe Checkout, webhook lifecycle management, and automatic DB sync.' },
            { icon: '🤖', title: 'AI Business Intelligence', desc: 'Churn risk scoring and upsell detection powered by intelligent signal analysis per organization.' },
            { icon: '📧', title: 'Email Notifications', desc: 'Beautiful transactional emails via Resend. OTP codes, invite emails, and more out of the box.' },
            { icon: '🚀', title: 'Production Ready', desc: 'Built with Next.js 14, TypeScript, Prisma, PostgreSQL, and Tailwind. Deploy to Vercel in minutes.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px', padding: '32px',
              transition: 'border-color 0.2s'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(139,92,246,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px', marginBottom: '20px'
              }}>{icon}</div>
              <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '600', margin: '0 0 10px' }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{
        padding: '100px 80px',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ color: '#a78bfa', fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Simple pricing
          </p>
          <h2 style={{ fontSize: '48px', fontWeight: '700', color: 'white', margin: '0 0 16px' }}>
            Start free, scale when ready
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
          {/* Free */}
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px', padding: '40px'
          }}>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: '0 0 8px' }}>Free</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '16px 0 24px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>₹0</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>/month</span>
            </div>
            {['1 organization', 'Up to 3 members', 'Basic analytics', 'Email OTP security', 'Community support'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ color: '#a78bfa', fontSize: '14px' }}>✓</span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{f}</span>
              </div>
            ))}
            <Link href="/register" style={{
              display: 'block', textAlign: 'center', marginTop: '32px',
              padding: '12px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600'
            }}>Get started free</Link>
          </div>

          {/* Pro */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.15))',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: '20px', padding: '40px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: '-12px', right: '24px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: 'white', fontSize: '11px', fontWeight: '700',
              padding: '4px 12px', borderRadius: '100px'
            }}>MOST POPULAR</div>
            <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', margin: '0 0 8px' }}>Pro</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '16px 0 24px' }}>
              <span style={{ fontSize: '48px', fontWeight: '800', color: 'white' }}>₹99</span>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>/month</span>
            </div>
            {['Unlimited organizations', 'Unlimited members', 'AI churn & upsell insights', 'Stripe billing', 'Priority support', 'Custom domains'].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ color: '#a78bfa', fontSize: '14px' }}>✓</span>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{f}</span>
              </div>
            ))}
            <Link href="/register" style={{
              display: 'block', textAlign: 'center', marginTop: '32px',
              padding: '12px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              color: 'white', textDecoration: 'none', fontSize: '14px', fontWeight: '600',
              boxShadow: '0 4px 16px rgba(139,92,246,0.4)'
            }}>Upgrade to Pro →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '100px 80px', textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.2))',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: '28px', padding: '80px',
          position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
            width: '400px', height: '300px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.3) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <h2 style={{ fontSize: '48px', fontWeight: '700', color: 'white', margin: '0 0 16px', position: 'relative' }}>
            Ready to ship faster?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '18px', margin: '0 0 40px', position: 'relative' }}>
            Join developers who stopped rebuilding the same foundation over and over.
          </p>
          <Link href="/register" style={{
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            color: 'white', fontSize: '16px', fontWeight: '600',
            textDecoration: 'none', padding: '16px 40px',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(139,92,246,0.5)',
            display: 'inline-block', position: 'relative'
          }}>
            Get started for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 80px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px',
            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '700', fontSize: '12px'
          }}>S</div>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>© 2026 SaaS Co. Built by Mudit Chauhan</span>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['Privacy', 'Terms', 'Contact'].map(item => (
            <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '13px', textDecoration: 'none' }}>{item}</a>
          ))}
        </div>
      </footer>

    </div>
  )
}