import { cookies } from "next/headers";
import crypto from "crypto";

export const GUEST_COOKIE = "guest_cart_id";

export async function getOrCreateGuestId(): Promise<string> {
  const store = await cookies(); // ✅ Next.js 15+
  let guestId = store.get(GUEST_COOKIE)?.value;

  if (!guestId) {
    guestId = crypto.randomUUID();

    store.set(GUEST_COOKIE, guestId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return guestId;
}
