// app/api/auth/send-otp/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email)
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user)
    return NextResponse.json({ error: 'No account found with this email' }, { status: 404 })

  // Delete old OTPs for this email
  await prisma.oTP.deleteMany({ where: { email } })

  const code = generateOTP()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  await prisma.oTP.create({
    data: { email, code, expiresAt }
  })

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your login verification code',
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <div style="background: linear-gradient(135deg, #8b5cf6, #6366f1); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px;">
          <h1 style="color: white; font-size: 32px; font-weight: 700; margin: 0 0 8px;">🔐</h1>
          <h2 style="color: white; font-size: 20px; font-weight: 600; margin: 0;">Verification Code</h2>
        </div>
        <p style="color: #374151; font-size: 15px; margin: 0 0 24px;">
          Use the code below to complete your login. This code expires in <strong>10 minutes</strong>.
        </p>
        <div style="background: #f8fafc; border: 2px dashed #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="font-size: 42px; font-weight: 700; letter-spacing: 12px; color: #7c3aed; margin: 0;">${code}</p>
        </div>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">
          If you didn't request this code, you can safely ignore this email.
        </p>
      </div>
    `
  })

  return NextResponse.json({ success: true })
}