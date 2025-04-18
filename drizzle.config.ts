import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/core/drizzle/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})