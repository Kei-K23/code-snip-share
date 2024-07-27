import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";
import { insertNotesSchema, notes } from "@/db/schema";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }
        return c.json({ data: "" }, 200);
    })
    .post("/", clerkMiddleware(), zValidator("json", insertNotesSchema.pick({
        title: true,
        description: true,
        code: true,
        language: true
    })), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const [data] = await db.insert(notes).values({
            ...values,
            id: createId(),
            userId: auth.userId
        }).returning();

        return c.json({ data }, 201);
    });

export default app;