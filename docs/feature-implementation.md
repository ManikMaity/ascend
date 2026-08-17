# Feature Implementation Workflow

How AI agents should approach feature development in this repository.

> **Step-by-step examples** (validators → API → mobile → tests) are in [developer-guide.md](./developer-guide.md#how-to-implement-an-end-to-end-feature).

## Judging Change Size

### Small/Medium (no formal plan)

- Bug fixes
- Minor refactors
- Small UI changes
- Single-feature additions with clear scope
- Configuration changes

**Workflow**: Inspect → Implement → Test → Verify

### Large/Significant (formal plan required)

- New major features spanning mobile + server + database
- Architectural changes
- New package creation
- Auth flow implementation
- Database schema migrations with business logic
- Multi-feature refactors

**Workflow**: Inspect → Plan → **Stop for approval** → Implement → Test → Report

If the user explicitly asks for a plan, use the formal workflow regardless of size.

## Formal Planning Workflow

### 1. Understand

Inspect the existing codebase. Read relevant feature modules, API routers, schemas, and docs.

### 2. Create Plan

Create directory and plan file:

```
docs/features/<feature-name>/
  plan.md
```

The plan should cover:

- **Goal**: What will be implemented and why
- **Approach**: Architectural decisions
- **Files**: Expected creates/changes with paths
- **Dependencies**: New packages, env vars, migrations
- **API/Data**: tRPC procedures, Prisma models, Zod schemas
- **Testing**: What tests to add
- **Impact**: What existing code is affected

### 3. Stop

Do not implement until the user reviews and approves the plan.

### 4. Implement

Follow the approved plan. Match existing conventions in `AGENTS.md` and `docs/architecture.md`.

Place code in the correct locations:

- Mobile features: `apps/mobile/src/features/<name>/`
- Server features: `apps/server/src/features/<name>/` (when needed)
- API routers: `packages/api/src/features/<name>/`
- Validators: `packages/validators/src/<name>.ts`
- Prisma models: `packages/db/prisma/schema.prisma`

### 5. Test and Verify

Run appropriate checks:

```bash
bun run typecheck
bun run lint
bun run test
```

For features touching the full stack, also verify server startup and tRPC connectivity.

### 6. Create Report

After successful implementation, create:

```
docs/features/<feature-name>/report.md
```

Requirements:

- Under 100 lines
- Plain language, understandable to non-technical readers
- Cover: what changed, what was added, key files, impact, testing, limitations

## Feature Module Checklist

When adding a new feature, typically create:

**Mobile** (`apps/mobile/src/features/<name>/`):
- [ ] Components in `components/`
- [ ] Data hooks in `hooks/` (tRPC queries/mutations)
- [ ] Component tests in `components/*.test.tsx`
- [ ] Route in `src/app/` that renders feature components

**API** (`packages/api/src/features/<name>/`):
- [ ] Router in `router.ts`
- [ ] Register in `packages/api/src/root.ts`
- [ ] Unit test in `router.test.ts`

**Validators** (`packages/validators/src/`):
- [ ] Zod schemas for inputs/outputs
- [ ] Unit tests

**Database** (if needed):
- [ ] Prisma model changes in `packages/db/prisma/schema.prisma`
- [ ] Run `bun run db:generate`

**Server** (if feature-specific logic needed):
- [ ] Feature module in `apps/server/src/features/<name>/`

**Documentation**:
- [ ] Update `docs/architecture.md` if architecture changes

## Anti-Patterns

- Do not put business logic in Expo Router `app/` files
- Do not access Prisma from mobile or api packages
- Do not create plan/report for trivial changes
- Do not skip testing for new behavior
- Do not add E2E testing infrastructure
