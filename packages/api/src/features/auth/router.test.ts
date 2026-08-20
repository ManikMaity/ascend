import { TRPCError } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { createContext } from "../../context";
import { authRouter } from "./router";

const mockUser = {
  id: "user_123",
  name: "Hunter",
  email: "hunter@example.com",
  image: "https://example.com/avatar.png",
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockSession = {
  id: "session_123",
  userId: mockUser.id,
  expiresAt: new Date(Date.now() + 60_000),
  token: "token_123",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("authRouter", () => {
  it("returns the current user when session is present", async () => {
    const caller = authRouter.createCaller(
      await createContext({
        session: { session: mockSession, user: mockUser },
        user: mockUser,
      }),
    );

    const result = await caller.me();

    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      image: mockUser.image,
    });
  });

  it("throws UNAUTHORIZED without a session", async () => {
    const caller = authRouter.createCaller(await createContext());

    await expect(caller.me()).rejects.toBeInstanceOf(TRPCError);
    await expect(caller.me()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
