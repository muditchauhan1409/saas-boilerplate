// app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const orgId = session.metadata.orgId

    await prisma.subscription.update({
      where: { orgId },
      data: {
        plan: 'PRO',
        stripeSubId: session.subscription,
        status: 'active',
      },
    })
  }

  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as any
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubId: sub.id },
    })
    if (subscription) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { plan: 'FREE', status: 'canceled' },
      })
    }
  }

  return NextResponse.json({ received: true })
}