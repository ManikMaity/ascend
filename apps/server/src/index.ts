import { createContext } from "@ascend/api";
import { appRouter } from "@ascend/api";
import { auth } from "@ascend/auth/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const PORT = Number(process.env.PORT ?? 3001);

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
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
        createContext: () => createContext(),
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
