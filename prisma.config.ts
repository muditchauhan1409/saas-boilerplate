// prisma.config.ts
import path from 'node:path'
import { defineConfig } from 'prisma/config'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DIRECT_URL!,
  },
})