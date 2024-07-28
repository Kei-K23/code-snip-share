import { db } from "@/db/drizzle";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { and, desc, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator"
import { createId } from "@paralleldrive/cuid2"
import { z } from "zod";
import { insertNotesWithTopicsSchema, notes, topics, topicsToNotes } from "@/db/schema";
import { Note, Topic } from "@/types";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);
        // If user is not authenticated
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const data = await db.select().from(topicsToNotes)
            .leftJoin(notes, eq(topicsToNotes.noteId, notes.id))
            .leftJoin(topics, eq(topicsToNotes.topicId, topics.id))
            .orderBy(desc(notes.createdAt));

        const uniqueNotesMap: { [key: string]: Note } = {};

        // Iterate through each item in the array
        data.forEach(item => {
            if (!item || !item?.notes || !item?.topics || !item?.topics_to_notes) {
                return;
            }
            const noteId = item.notes.id;
            const topic: Topic = {
                id: item.topics.id,
                name: item.topics.name
            };

            // If the noteId is not in the map, add it with the note and topic
            if (!uniqueNotesMap[noteId]) {
                uniqueNotesMap[noteId] = {
                    ...item.notes,
                    topics: [topic]
                };
            } else {
                // If the noteId is already in the map, just add the topic to the topics array
                uniqueNotesMap[noteId].topics.push(topic);
            }
        });

        // Convert the map to an array
        const uniqueNotesArray: Note[] = Object.values(uniqueNotesMap);

        return c.json({ data: uniqueNotesArray }, 200);
    })
    .get("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.param();

        if (!id) {
            return c.json({
                error: "Missing id"
            }, 400);
        }

        // If user is not authenticated'
        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const data = await db.select().from(topicsToNotes)
            .leftJoin(notes, eq(topicsToNotes.noteId, notes.id))
            .leftJoin(topics, eq(topicsToNotes.topicId, topics.id))
            .where(eq(topicsToNotes.noteId, id))
            .orderBy(desc(notes.createdAt));

        const uniqueNotesMap: { [key: string]: Note } = {};

        // Iterate through each item in the array
        data.forEach(item => {
            if (!item || !item?.notes || !item?.topics || !item?.topics_to_notes) {
                return;
            }
            const noteId = item.notes.id;
            const topic: Topic = {
                id: item.topics.id,
                name: item.topics.name
            };

            // If the noteId is not in the map, add it with the note and topic
            if (!uniqueNotesMap[noteId]) {
                uniqueNotesMap[noteId] = {
                    ...item.notes,
                    topics: [topic]
                };
            } else {
                // If the noteId is already in the map, just add the topic to the topics array
                uniqueNotesMap[noteId].topics.push(topic);
            }
        });

        // Convert the map to an array
        const uniqueNotesArray: Note[] = Object.values(uniqueNotesMap);

        return c.json({ data: uniqueNotesArray }, 200);
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
            title: values.title.trim(),
            language: values.language.trim(),
            description: values.description.trim(),
            code: values.code.trim(),
            id: createId(),
            userId: auth.userId
        }).returning();

        // Create many to many relationship between notes and topics
        await db.insert(topicsToNotes).values(values.topics.map(t => ({
            id: createId(),
            topicId: t.value,
            noteId: data.id,
            userId: auth.userId
        })));

        return c.json({ data }, 201);
    })
    .put("/:id", clerkMiddleware(), zValidator("json", insertNotesWithTopicsSchema), zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");
        const { id } = c.req.valid("param");

        if (!id) {
            return c.json({
                error: "Missing id"
            }, 400);
        }

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

        // Update the note data
        const [data] = await db.update(notes).set(
            {
                title: values.title.trim(),
                language: values.language.trim(),
                description: values.description.trim(),
                code: values.code.trim(),
            }
        ).where(and(
            eq(notes.id, id),
            eq(notes.userId, auth.userId)
        )).returning();

        // To update the topics, first delete existing all topics notes relationships data, then create newly data that send from user
        // Delete topics notes relationship data
        await db.delete(topicsToNotes).where(and
            (
                eq(topicsToNotes.topicId, id),
                eq(topicsToNotes.userId, auth.userId)
            )
        );

        // Create many to many relationship between notes and topics
        await db.insert(topicsToNotes).values(values.topics.map(t => ({
            id: createId(),
            topicId: t.value,
            noteId: data.id,
            userId: auth.userId
        })));

        return c.json({ data }, 200);
    });

export default app;