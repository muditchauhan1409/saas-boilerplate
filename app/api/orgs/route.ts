// app/api/orgs/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const name = body.name || `${session.user.name}'s Org`
  const slug = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now()

  const org = await prisma.organization.create({
    data: {
      name,
      slug,
      members: {
        create: {
          userId: session.user.id,
          role: 'ADMIN',
        },
      },
      subscription: {
        create: {
          plan: 'FREE',
        },
      },
    },
  })

  return NextResponse.json({ org })
}