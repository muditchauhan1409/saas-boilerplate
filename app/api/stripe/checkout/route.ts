// app/api/stripe/checkout/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { orgId } = await req.json()

  const membership = await prisma.member.findFirst({
    where: { userId: session.user.id, orgId, role: 'ADMIN' },
    include: { org: { include: { subscription: true } } },
  })

  if (!membership)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const sub = membership.org.subscription

  let customerId = sub?.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email!,
      name: membership.org.name,
    })
    customerId = customer.id

    await prisma.subscription.update({
      where: { orgId },
      data: { stripeCustomerId: customerId },
    })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: process.env.STRIPE_PRO_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/billing?canceled=true`,
    metadata: { orgId },
  })

  return NextResponse.json({ url: checkoutSession.url })
}