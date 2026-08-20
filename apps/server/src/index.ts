import { createContext } from "@ascend/api";
import { appRouter } from "@ascend/api";
import { auth } from "@ascend/auth/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const PORT = Number(Bun.env.PORT ?? 3001);

const ALLOWED_ORIGIN_PATTERNS = [
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/,
  /^exp:\/\/.*/,
];

function isAllowedOrigin(origin: string): boolean {
  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

function corsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
    "Access-Control-Allow-Credentials": "true",
    Vary: "Origin",
  };

  if (origin && isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
}

const server = Bun.serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    const origin = request.headers.get("origin");

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(origin),
      });
    }

    if (url.pathname.startsWith("/api/auth")) {
      const response = await auth.handler(request);
      const headers = new Headers(response.headers);
      for (const [key, value] of Object.entries(corsHeaders(origin))) {
        headers.set(key, value);
      }
      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    if (url.pathname === "/health") {
      return Response.json(
        { status: "ok", service: "ascend-server" },
        { headers: corsHeaders(origin) },
      );
    }

    if (url.pathname.startsWith("/trpc")) {
      const response = await fetchRequestHandler({
        endpoint: "/trpc",
        req: request,
        router: appRouter,
        createContext: () => createContext({ req: request }),
      });

      const headers = new Headers(response.headers);
      for (const [key, value] of Object.entries(corsHeaders(origin))) {
        headers.set(key, value);
      }

      return new Response(response.body, {
        status: response.status,
        headers,
      });
    }

    return Response.json(
      { error: "Not Found" },
      { status: 404, headers: corsHeaders(origin) },
    );
  },
});

console.log(`Ascend server listening on http://localhost:${server.port}`);

export { server };
