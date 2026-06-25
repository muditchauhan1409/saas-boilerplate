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

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Billing</h1>
      <p className="text-gray-400 text-sm mb-8">Manage your subscription</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free Plan */}
        <div className={`bg-gray-900 border rounded-xl p-6 ${sub?.plan === 'FREE' ? 'border-violet-500' : 'border-gray-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Free</h2>
            {sub?.plan === 'FREE' && (
              <span className="text-xs px-2 py-1 rounded-full bg-violet-900 text-violet-300">Current</span>
            )}
          </div>
          <p className="text-3xl font-semibold text-white mb-1">₹0</p>
          <p className="text-gray-500 text-sm mb-4">per month</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>✓ 1 organization</li>
            <li>✓ Up to 3 members</li>
            <li>✓ Basic analytics</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className={`bg-gray-900 border rounded-xl p-6 ${sub?.plan === 'PRO' ? 'border-violet-500' : 'border-gray-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-medium">Pro</h2>
            {sub?.plan === 'PRO' && (
              <span className="text-xs px-2 py-1 rounded-full bg-violet-900 text-violet-300">Current</span>
            )}
          </div>
          <p className="text-3xl font-semibold text-white mb-1">₹99</p>
          <p className="text-gray-500 text-sm mb-4">per month</p>
          <ul className="space-y-2 text-sm text-gray-400 mb-6">
            <li>✓ Unlimited organizations</li>
            <li>✓ Unlimited members</li>
            <li>✓ AI insights</li>
            <li>✓ Priority support</li>
          </ul>
          {sub?.plan !== 'PRO' && membership?.role === 'ADMIN' && (
            <BillingButton orgId={membership.org.id} />
          )}
        </div>
      </div>
    </div>
  )
}