import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
    schema: "./db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DB_URL!,
    },
    verbose: true,
    strict: true,
});