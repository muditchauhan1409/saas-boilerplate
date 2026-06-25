// app/(dashboard)/dashboard/ai-insights/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function getChurnRisk(plan: string, createdAt: Date, memberCount: number) {
  const daysSinceCreation = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (plan === 'FREE' && daysSinceCreation > 7) {
    return { level: 'High', reason: 'On free plan for over 7 days with no upgrade', color: 'red' }
  }
  if (plan === 'FREE' && memberCount === 1) {
    return { level: 'Medium', reason: 'Solo user on free plan — low engagement signal', color: 'yellow' }
  }
  if (plan === 'PRO' && memberCount === 1) {
    return { level: 'Low', reason: 'Pro plan but only 1 member — potential churn if no team activity', color: 'yellow' }
  }
  return { level: 'Low', reason: 'Active team on Pro plan', color: 'green' }
}

function getUpsellSignal(plan: string, memberCount: number) {
  if (plan === 'FREE' && memberCount >= 2) {
    return 'Team is growing — ready to upgrade to Pro'
  }
  if (plan === 'FREE') {
    return 'Offer a 14-day Pro trial to increase conversion'
  }
  if (plan === 'PRO' && memberCount >= 5) {
    return 'Large team — consider Enterprise plan outreach'
  }
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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">AI Insights</h1>
      <p className="text-gray-400 text-sm mb-8">
        Intelligent analysis of your organization health
      </p>

      <div className="space-y-4">
        {memberships.map(({ org }) => {
          const plan = org.subscription?.plan || 'FREE'
          const memberCount = org.members.length
          const churn = getChurnRisk(plan, org.createdAt, memberCount)
          const upsell = getUpsellSignal(plan, memberCount)

          return (
            <div key={org.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-medium">{org.name}</h2>
                  <p className="text-gray-500 text-sm">{memberCount} member{memberCount !== 1 ? 's' : ''} · {plan} plan</p>
                </div>
              </div>

              {/* Churn Risk */}
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Churn Risk</p>
                <div className={`flex items-center gap-3 p-4 rounded-lg border ${
                  churn.color === 'red' ? 'bg-red-950 border-red-800' :
                  churn.color === 'yellow' ? 'bg-yellow-950 border-yellow-800' :
                  'bg-green-950 border-green-800'
                }`}>
                  <span className={`text-sm font-medium ${
                    churn.color === 'red' ? 'text-red-400' :
                    churn.color === 'yellow' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {churn.level} Risk
                  </span>
                  <span className="text-gray-400 text-sm">— {churn.reason}</span>
                </div>
              </div>

              {/* Upsell Signal */}
              {upsell && (
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Upsell Opportunity</p>
                  <div className="flex items-center gap-3 p-4 rounded-lg border bg-violet-950 border-violet-800">
                    <span className="text-violet-400 text-sm">💡 {upsell}</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}