import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth"
import { zValidator } from "@hono/zod-validator"
import { favorites, insertFavoritesSchema, notes, topics, topicsToNotes } from "@/db/schema";
import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { and, desc, eq } from "drizzle-orm";
import { Note, Topic } from "@/types";
import { z } from "zod";

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
            .leftJoin(favorites, eq(topicsToNotes.noteId, favorites.noteId))
            .where(
                and(
                    eq(topicsToNotes.userId, auth.userId),
                )
            )
            .orderBy(desc(notes.createdAt));

        const uniqueNotesMap: { [key: string]: Note } = {};
        // Iterate through each item in the array
        data.forEach(item => {
            if (!item || !item?.notes || !item?.topics || !item?.topics_to_notes || item.favorites === null || !item.favorites) {
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
                    topics: [topic],
                    favorite: item.favorites
                };
            } else {
                // If the noteId is already in the map, just add the topic to the topics array
                uniqueNotesMap[noteId].topics.push(topic);
            }
        });

        // Convert the map to an array
        const uniqueNotesArray: Note[] = Object.values(uniqueNotesMap).filter(i => i.isPreDeleted === false);
        return c.json({ data: uniqueNotesArray }, 200);
    })
    .post("/", clerkMiddleware(), zValidator("json", insertFavoritesSchema.omit({
        id: true,
        userId: true
    })), async (c) => {
        const auth = getAuth(c);
        const values = c.req.valid("json");

        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        const [existingData] = await db.select().from(favorites).where(and(
            eq(favorites.userId, auth.userId),
            eq(favorites.noteId, values.noteId)
        ));

        if (existingData) {
            return c.json({
                error: "Item is already favorite"
            }, 400);
        }

        const [data] = await db.insert(favorites).values({
            id: createId(),
            userId: auth.userId,
            noteId: values.noteId
        }).returning();

        return c.json({ data }, 201);
    })
    .delete("/:id", clerkMiddleware(), zValidator("param", z.object({
        id: z.string()
    })), async (c) => {
        const auth = getAuth(c);
        const { id } = c.req.valid('param');

        if (!auth?.userId) {
            return c.json({
                error: "Unauthorize user"
            }, 401);
        }

        if (!id) {
            return c.json({
                error: "Missing id"
            }, 400);
        }

        const [data] = await db.delete(favorites).where(and(
            eq(favorites.userId, auth.userId),
            eq(favorites.id, id)
        )).returning();

        return c.json({ data }, 200);
    });

export default app;