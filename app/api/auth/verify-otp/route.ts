// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { email, code } = await req.json()

  if (!email || !code)
    return NextResponse.json({ error: 'Email and code are required' }, { status: 400 })

  const otp = await prisma.oTP.findFirst({
    where: { email, code, verified: false }
  })

  if (!otp)
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 })

  if (new Date() > otp.expiresAt)
    return NextResponse.json({ error: 'Code has expired. Please request a new one.' }, { status: 400 })

  await prisma.oTP.update({
    where: { id: otp.id },
    data: { verified: true }
  })

  return NextResponse.json({ success: true })
}