import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import topics from './topics'
import notes from './notes'

const app = new Hono().basePath('/api');

const routes = app.route("/topics", topics)
    .route("/notes", notes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);

export type AppType = typeof routes;