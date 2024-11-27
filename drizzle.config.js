import { defineConfig } from "drizzle-kit";

//TODO: replace with variable from env file - DATABASE_URL
export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './db/schema.ts',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  }
})
