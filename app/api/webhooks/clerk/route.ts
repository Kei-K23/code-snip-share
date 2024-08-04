import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.NEXT_PUBLIC_CLERK_WEBHOOK_SECRET_KEY;

    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add NEXT_PUBLIC_CLERK_WEBHOOK_SECRET_KEY from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const eventType = evt.type;
    const userFullName = payload.data.last_name ? `${payload.data.first_name} ${payload.data.last_name}` : payload.data.first_name;

    // create user
    if (eventType === "user.created") {
        await db.insert(users).values({
            id: payload.data.id,
            username: userFullName ? userFullName : payload.data.email_addresses[0]?.email_address.split('@')[0],
            imageUrl: payload.data.image_url,
            email: payload.data.email_addresses[0]?.email_address
        });
    }

    // update user
    if (eventType === "user.updated") {
        await db.update(users).set({
            username: userFullName ? userFullName : payload.data.email_addresses[0]?.email_address.split('@')[0],
            imageUrl: payload.data.image_url,
            email: payload.data.email_addresses[0]?.email_address
        });
    }

    // delete user
    if (eventType === "user.deleted") {
        await db.delete(users).where(eq(
            users.id, payload.data.id,
        ))

        return NextResponse.redirect(new URL("/", req.url));
    }

    return new Response("", { status: 200 });
}