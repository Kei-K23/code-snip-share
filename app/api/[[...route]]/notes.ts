import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, desc, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";
import { insertNotesWithTopicsSchema, notes, topicsToNotes } from "@/db/schema";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const data = await db.select().from(notes).orderBy(desc(notes.createdAt));

        return c.json({ data: data }, 200);
    })
    .post("/", clerkMiddleware(), zValidator("json", insertNotesWithTopicsSchema), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        if (!values.topics.length) {
            return c.json({
                error: "Required value"
            }, 400);
        }

        // Create notes
        const [data] = await db.insert(notes).values({
            title: values.title,
            language: values.language,
            description: values.description,
            code: values.code,
            id: createId(),
            userId: auth.userId
        }).returning();

        // Create many to many relationship between notes and topics
        await db.insert(topicsToNotes).values(values.topics.map(t => ({
            topicId: t.value,
            noteId: data.id
        })));

        return c.json({ data }, 201);
    });

export default app;