// app/api/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password)
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists)
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    return NextResponse.json({ user: { id: user.id, email: user.email } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}