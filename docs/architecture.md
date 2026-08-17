# Architecture

This document describes the actual architecture of the Ascend monorepo.

> **New to the project?** Start with [developer-guide.md](./developer-guide.md) for a detailed walkthrough of what was built, how data flows, and how to implement features.

## Overview

```
Expo Mobile App
    ↓ tRPC + TanStack Query
Bun Server (/trpc)
    ↓
@ascend/api (tRPC routers)
    ↓
@ascend/db (Prisma)
    ↓
PostgreSQL

Auth path:
Mobile → Better Auth client → /api/auth → @ascend/auth → Prisma → PostgreSQL
```

## Monorepo Structure

| Path | Purpose |
|------|---------|
| `apps/mobile` | Expo React Native app |
| `apps/server` | Bun HTTP server |
| `packages/api` | tRPC API contract and routers |
| `packages/auth` | Better Auth server + client setup |
| `packages/db` | Prisma schema and client |
| `packages/validators` | Shared Zod validation schemas |
| `packages/config` | Shared TypeScript configurations |

Managed with **Bun workspaces** and **Turborepo** for task orchestration.

## Mobile Application

- **Framework**: Expo SDK 53, React Native 0.79, Expo Router 5
- **Styling**: NativeWind 4 (Tailwind CSS for React Native)
- **Data fetching**: tRPC React Query integration + TanStack Query
- **State**: Zustand for client state
- **Forms**: React Hook Form + Zod (available, not yet used in foundation)
- **Auth**: Better Auth client configured in `src/lib/auth-client.ts`

### Directory Structure

```
apps/mobile/src/
  app/           # Expo Router routes and layouts only
  features/      # Feature modules (components, hooks, logic)
  lib/           # Shared utilities (tRPC, auth, providers)
  stores/        # Zustand stores
```

### Feature Module Pattern

Each feature lives under `src/features/<name>/`:

```
features/health/
  components/    # UI components
  hooks/         # Data hooks (tRPC queries/mutations)
```

## Backend Server

- **Runtime**: Bun
- **API**: tRPC via `@trpc/server` fetch adapter at `/trpc`
- **Auth**: Better Auth handler at `/api/auth`
- **Health**: REST endpoint at `/health`

### Server Endpoints

| Endpoint | Handler |
|----------|---------|
| `/trpc/*` | tRPC (health.ping) |
| `/api/auth/*` | Better Auth |
| `/health` | Server health check |

## Packages

### @ascend/api

Defines the tRPC application router and types. Both server and mobile import from this package for type-safe API contracts.

Current routers:
- `health.ping` — Returns validated health response

### @ascend/validators

Shared Zod schemas used by API routers and (future) form validation.

Current schemas:
- `healthResponseSchema` — Health check response shape

### @ascend/db

Prisma client with PostgreSQL. Schema includes Better Auth models (User, Session, Account, Verification).

### @ascend/auth

Better Auth configuration:
- Server: `packages/auth/src/server.ts` — Prisma adapter, email/password enabled
- Client: `packages/auth/src/client.ts` — React auth client factory

### @ascend/config

Shared TypeScript configs:
- `tsconfig.base.json` — Base strict settings
- `tsconfig.node.json` — Node/Bun packages
- `tsconfig.react-native.json` — Mobile app

## Data Flow: Health Check

1. Mobile `HealthStatus` component calls `useHealthQuery()`
2. Hook uses `trpc.health.ping.useQuery()`
3. tRPC client sends HTTP request to `{API_URL}/trpc/health.ping`
4. Server `fetchRequestHandler` routes to `appRouter.health.ping`
5. Router returns validated `HealthResponse` via Zod schema
6. TanStack Query caches and renders the response

## Authentication Boundary

Better Auth is structurally connected but has no UI in the foundation:

- Server mounts auth handler with Prisma adapter
- Mobile creates auth client pointing to server
- Prisma schema includes auth tables
- No login/signup screens yet

## Testing Strategy

| Layer | Tool | Location |
|-------|------|----------|
| Validators | Vitest | `packages/validators/src/*.test.ts` |
| API routers | Vitest | `packages/api/src/features/*/router.test.ts` |
| Server | Vitest | `apps/server/src/*.test.ts` |
| Mobile stores | Vitest | `apps/mobile/src/stores/*.test.ts` |
| Mobile components | Vitest + RNTL | `apps/mobile/src/features/**/*.test.tsx` |

No E2E testing infrastructure.

## Dependency Boundaries

- Mobile imports: `@ascend/api` (types), `@ascend/auth` (client), `@ascend/validators`
- Mobile must NOT import: `@ascend/db`, `@ascend/auth/server`
- Server imports: `@ascend/api`, `@ascend/auth/server`, `@ascend/db`
- API imports: `@ascend/validators` only (no direct DB access)
- Validators: no internal dependencies beyond Zod
