// app/api/orgs/invite/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { email, orgId } = body

  console.log('Invite request:', { email, orgId })

  if (!email || !orgId)
    return NextResponse.json({ error: 'Email and orgId are required' }, { status: 400 })

  const adminCheck = await prisma.member.findFirst({
    where: { userId: session.user.id, orgId, role: 'ADMIN' },
  })

  if (!adminCheck)
    return NextResponse.json({ error: 'Only admins can invite members' }, { status: 403 })

  const userToInvite = await prisma.user.findUnique({ where: { email } })
  if (!userToInvite)
    return NextResponse.json({ error: 'User not found. They must register first.' }, { status: 404 })

  const alreadyMember = await prisma.member.findUnique({
    where: { userId_orgId: { userId: userToInvite.id, orgId } },
  })
  if (alreadyMember)
    return NextResponse.json({ error: 'User is already a member' }, { status: 400 })

  await prisma.member.create({
    data: { userId: userToInvite.id, orgId, role: 'MEMBER' },
  })

  return NextResponse.json({ success: true })
}