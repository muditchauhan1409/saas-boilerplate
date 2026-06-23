// prisma.config.ts
import path from 'node:path'
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      const connectionString = process.env.DIRECT_URL!
      return new PrismaPg({ connectionString })
    },
  },
  datasource: {
    url: process.env.DIRECT_URL!,
  },
})