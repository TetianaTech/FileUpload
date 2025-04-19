import { defineConfig } from "drizzle-kit";
import { getPostgresUrl } from "./src/core/utils/getPostgresUrl";

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/core/drizzle/schema',
  out: './drizzle',
  dbCredentials: {
    url: getPostgresUrl(),
  },
})