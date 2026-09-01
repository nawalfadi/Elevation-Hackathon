import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@backend/auth/constants";
import type { PublicUser, SessionPayload, UserRole } from "@backend/types";

export { SESSION_COOKIE };

function payloadFromUser(user: PublicUser): SessionPayload {
  return {
    user,
    session: {
      access_token: user.id,
      expires_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    },
  };
}

function readUserFromCookie(raw: string): PublicUser | null {
  try {
    const parsed = JSON.parse(raw) as { user?: PublicUser };
    if (parsed.user?.id && parsed.user.email && parsed.user.role) {
      return parsed.user;
    }
  } catch {
    return null;
  }
  return null;
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const user = readUserFromCookie(raw);
  if (!user) return null;
  return payloadFromUser(user);
}

export async function requireUser(roles?: UserRole[]): Promise<PublicUser> {
  const session = await getSession();
  if (!session) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
  if (roles && !roles.includes(session.user.role)) {
    throw Object.assign(new Error("Forbidden"), { status: 403 });
  }
  return session.user;
}

export async function setSessionCookie(user: PublicUser) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, JSON.stringify({ user }), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}
