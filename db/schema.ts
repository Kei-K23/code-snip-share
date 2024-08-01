import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createInsertSchema } from "drizzle-zod"
import { z } from 'zod';

export const topics = pgTable("topics", {
    id: text('id').primaryKey(),
    name: text("name").notNull(),
});

export const users = pgTable("users", {
    id: text('id').primaryKey(),
    username: text("username").notNull(),
    imageUrl: text("image_url"),
    email: text("email").notNull()
});

export const notes = pgTable("notes", {
    id: text('id').primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    code: text("code").notNull(),
    userId: text('userId').notNull().references(() => users.id),
    language: text('language').notNull(),
    isPreDeleted: boolean("is_pre_deleted").default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const topicsToNotes = pgTable('topics_to_notes', {
    id: text('id').primaryKey(),
    topicId: text('topic_id').notNull().references(() => topics.id),
    noteId: text('note_id').notNull().references(() => notes.id),
    userId: text('userId').notNull().references(() => users.id),
});

export const favorites = pgTable('favorites', {
    id: text('id').primaryKey(),
    noteId: text('note_id').notNull().references(() => notes.id),
    userId: text('userId').notNull().references(() => users.id),
});
// export const accountsRelations = relations(accounts, ({ many }) => ({
//     transactions: many(transactions)
// }));

// export const categories = pgTable("categories", {
//     id: text('id').primaryKey(),
//     name: text("name").notNull(),
//     plaidId: text("plaid_id"),
//     userId: text("user_id").notNull(),
// });

// export const categoriesRelations = relations(categories, ({ many }) => ({
//     transactions: many(transactions)
// }));

// export const transactions = pgTable("transactions", {
//     id: text('id').primaryKey(),
//     amount: integer("amount").notNull(),
//     payee: text("payee").notNull(),
//     notes: text("notes"),
//     date: timestamp("date", { mode: "date" }).notNull(),
//     accountId: text("account_id").references(() => accounts.id, {
//         onDelete: "cascade"
//     }).notNull(),
//     categoryId: text("category_id").references(() => categories.id, { onDelete: "set null" })
// });

// export const transactionsRelations = relations(transactions, ({ one }) => ({
//     account: one(accounts, {
//         fields: [transactions.id],
//         references: [accounts.id]
//     }),
//     category: one(categories, {
//         fields: [transactions.id],
//         references: [categories.id]
//     })
// }));

export const insertTopicsSchema = createInsertSchema(topics);
export const insertNotesWithTopicsSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2),
    code: z.string().min(2),
    language: z.string().min(2),
    topics: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
        })
    ),
});
export const insertNotesSchema = createInsertSchema(notes);
export const insertUsersSchema = createInsertSchema(users);
export const insertFavoritesSchema = createInsertSchema(favorites);
export const insertTopicsToNotesSchema = createInsertSchema(topicsToNotes);
// export const insertCategorySchema = createInsertSchema(categories);
// export const insertTransactionSchema = createInsertSchema(transactions, {
//     date: z.coerce.date()
// });