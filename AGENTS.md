# Ascend Agent Instructions

Primary rules for AI agents working in this repository. Keep this file under **150 lines**.

## Core Principles

1. Use **Bun** for all package management and scripts. Never use npm, pnpm, or yarn.
2. Follow **feature-based architecture**. Business logic lives in `src/features/`, not route files.
3. Keep changes **minimal and focused**. Do not over-engineer or add unrelated code.
4. **Verify before claiming success**. Run relevant checks after changes.
5. Do not implement product features unless explicitly requested.

## Repository Layout

```
apps/mobile/     Expo + React Native (Expo Router, NativeWind)
apps/server/     Bun backend (tRPC, Better Auth)
packages/api/    tRPC router contract
packages/auth/   Better Auth server + client
packages/db/     Prisma + PostgreSQL
packages/validators/  Shared Zod schemas
packages/config/ Shared TypeScript configs
docs/            Architecture and workflow docs
```

## Architecture Boundaries

- **Mobile → Server**: tRPC client + TanStack Query → `/trpc`
- **Auth**: Better Auth client → `/api/auth` → Prisma
- **Validation**: Shared Zod schemas in `@ascend/validators`
- **Database**: All Prisma access through `@ascend/db`
- **API contract**: tRPC routers defined in `@ascend/api`, consumed by server and mobile

## Feature Development

### Small/Medium Changes

Inspect → implement → test → verify. No formal plan required.

### Large/Significant Changes

1. Inspect existing system
2. Create `docs/features/<name>/plan.md`
3. **Stop and wait for user approval**
4. Implement after approval
5. Test and verify
6. Create `docs/features/<name>/report.md` (under 100 lines)

See `docs/feature-implementation.md` for details.

## Code Conventions

### Mobile (`apps/mobile`)

- Routes/layouts only in `src/app/`
- Feature code in `src/features/<feature>/`
- Shared utilities in `src/lib/`, global state in `src/stores/`
- Use NativeWind (`className`) for styling
- Use tRPC hooks via `@/lib/trpc` and TanStack Query

### Server (`apps/server`)

- Entry point: `src/index.ts`
- Feature handlers in `src/features/` (when added)
- Mount tRPC at `/trpc`, Better Auth at `/api/auth`

### Packages

- `@ascend/api`: tRPC routers and types only
- `@ascend/validators`: Zod schemas shared across apps
- `@ascend/db`: Prisma client singleton
- `@ascend/auth`: Better Auth configuration

## Testing

- **Vitest** for unit tests
- **React Native Testing Library** for component tests
- No E2E testing (Detox, Maestro, Playwright)
- Add tests for meaningful behavior, not trivial assertions

## Commands

```bash
bun install                  # Install dependencies
bun run typecheck            # TypeScript check all packages
bun run lint                 # Lint all packages
bun run test                 # Run all tests
bun run build                # Build all packages
bun run db:generate          # Generate Prisma client
bun --filter @ascend/server dev    # Start backend
bun --filter @ascend/mobile dev     # Start Expo
```

## Environment

Copy `.env.example` to `.env`. Required variables:

- `DATABASE_URL` — PostgreSQL connection string
- `BETTER_AUTH_SECRET` — Auth secret key
- `BETTER_AUTH_URL` — Server auth URL
- `EXPO_PUBLIC_API_URL` — API URL for mobile client
- `EXPO_PUBLIC_AUTH_URL` — Auth URL for mobile client

## Documentation Maintenance

- Update `docs/architecture.md` when architecture changes
- Keep `AGENTS.md` under 150 lines — consolidate or remove rules before adding
- Feature plans/reports go in `docs/features/<name>/`

## Do Not

- Add npm/pnpm/yarn lockfiles or scripts
- Put business logic in Expo Router `app/` files
- Access Prisma directly from mobile or api packages
- Create fake features to populate architecture
- Skip verification and claim things work
- Exceed 150 lines in this file
