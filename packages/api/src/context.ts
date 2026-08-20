import { auth } from "@ascend/auth/server";
import type { AuthSession, Context, CreateContextOptions } from "./context.types";

export type { AuthSession, AuthUser, Context, CreateContextOptions } from "./context.types";

export async function createContext(
  options: CreateContextOptions = {},
): Promise<Context> {
  const requestId = options.requestId ?? crypto.randomUUID();

  if (options.session !== undefined || options.user !== undefined) {
    return {
      requestId,
      session: options.session ?? null,
      user: options.user ?? options.session?.user ?? null,
    };
  }

  if (options.req) {
    const session = (await auth.api.getSession({
      headers: options.req.headers,
    })) as AuthSession | null;

    return {
      requestId,
      session,
      user: session?.user ?? null,
    };
  }

  return {
    requestId,
    session: null,
    user: null,
  };
}
