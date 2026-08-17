# Ascend

Full-stack monorepo foundation for the Ascend mobile application.

## Stack

- **Mobile**: Expo, React Native, Expo Router, NativeWind, tRPC, TanStack Query, Zustand
- **Server**: Bun, tRPC, Better Auth, Prisma, PostgreSQL
- **Monorepo**: Bun workspaces + Turborepo

## Getting Started

```bash
bun install
cp .env.example .env
bun run db:generate
```

Start the backend:

```bash
bun --filter @ascend/server dev
```

Start the mobile app:

```bash
bun --filter @ascend/mobile dev
```

## Verification

```bash
bun run typecheck
bun run lint
bun run test
bun run build
```

See `AGENTS.md` for AI agent instructions, `docs/architecture.md` for system design, and **`docs/developer-guide.md`** for a full walkthrough of the codebase.
