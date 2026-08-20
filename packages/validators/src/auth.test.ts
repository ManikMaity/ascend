import { describe, expect, it } from "vitest";
import { authUserSchema } from "./auth";

describe("authUserSchema", () => {
  it("parses a valid auth user", () => {
    const result = authUserSchema.parse({
      id: "user_123",
      name: "Hunter",
      email: "hunter@example.com",
      image: "https://example.com/avatar.png",
    });

    expect(result.id).toBe("user_123");
    expect(result.name).toBe("Hunter");
    expect(result.email).toBe("hunter@example.com");
    expect(result.image).toBe("https://example.com/avatar.png");
  });

  it("accepts null image", () => {
    const result = authUserSchema.parse({
      id: "user_123",
      name: "Hunter",
      email: "hunter@example.com",
      image: null,
    });

    expect(result.image).toBeNull();
  });

  it("rejects invalid email", () => {
    expect(() =>
      authUserSchema.parse({
        id: "user_123",
        name: "Hunter",
        email: "not-an-email",
        image: null,
      }),
    ).toThrow();
  });
});
