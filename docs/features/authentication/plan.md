# Authentication — Implementation Plan

**Status:** Implemented  
**Feature:** Google-only sign-in, session management, protected mobile routes, protected tRPC APIs  
**Scope:** Mobile UI + server auth + database migrations + local Docker Postgres  
**Skills:** Follow [better-auth-best-practices](../../../.agents/skills/better-auth-best-practices/SKILL.md), [better-auth-security-best-practices](../../../.agents/skills/better-auth-security-best-practices/SKILL.md), and [create-auth](../../../.agents/skills/create-auth/SKILL.md) during implementation.

---

## Goal

Ship end-to-end authentication so a user can:

1. Open the app and land on a **System-styled sign-in screen**
2. Sign in with **Google only** (no email/password)
3. Receive a persisted session (SecureStore on mobile, DB on server)
4. Access **protected app routes** only when authenticated
5. Call **protected tRPC procedures** that resolve the current user from the session cookie
6. Sign out and return to the sign-in screen

Run everything locally: **Docker Compose Postgres** + Bun server + Expo mobile.

This unblocks hunter profile, onboarding, and all future user-scoped features.

---

## Current State (baseline)

| Area | Today |
|------|--------|
| Better Auth server | `packages/auth/src/server.ts` — Prisma adapter, **email/password enabled**, no Google, no Expo plugin |
| Better Auth client | `packages/auth/src/client.ts` — bare `createAuthClient`, no Expo plugin |
| Mobile auth client | `apps/mobile/src/lib/auth-client.ts` — points at server, unused in UI |
| Prisma schema | Better Auth tables (`User`, `Session`, `Account`, `Verification`) — **no migrations applied** |
| tRPC | Only `publicProcedure`; context has `requestId` only, no session |
| Mobile routes | Single unprotected `index.tsx` dev hub |
| Docker | **Not set up** |
| App scheme | `ascend` in `app.json` |

---

## Approach

### Auth provider: Better Auth + Expo plugin

Use Better Auth (already in the monorepo) with the official **`@better-auth/expo`** integration:

- **Server:** add `expo()` plugin, configure Google OAuth, disable email/password
- **Mobile:** add `expoClient()` plugin with `expo-secure-store` for cookie/session persistence
- **Sign-in flow (v1):** `authClient.signIn.social({ provider: "google", callbackURL: "/(app)" })` — OAuth in Expo web browser, deep link back via `ascend://` scheme

**Why browser OAuth for v1 (not native Google Sign-In):**

- Works in Expo Go and local dev without a custom dev client
- Documented first-class path in [Better Auth Expo docs](https://better-auth.com/docs/integrations/expo)
- Native `@react-native-google-signin/google-signin` + idToken can be a follow-up if we want in-app Google UI later

### Protected routes: Expo Router groups + session gate

Restructure `app/` into route groups:

```
apps/mobile/src/app/
  _layout.tsx              # Providers + root Stack
  (auth)/
    _layout.tsx            # Unauthenticated stack
    sign-in.tsx            # Google sign-in screen
  (app)/
    _layout.tsx            # Auth gate — redirect to sign-in if no session
    index.tsx              # Protected home (current dev hub moves here)
    design-system.tsx      # Protected dev showcase (move from root)
```

Gate logic in `(app)/_layout.tsx`:

- `authClient.useSession()` → while `isPending`, show loading screen (same pattern as font loading in `Providers`)
- If `!session`, `<Redirect href="/(auth)/sign-in" />`
- If `session`, render `<Stack />` for child routes

Inverse redirect in `(auth)/sign-in.tsx` or `(auth)/_layout.tsx`: if session exists, redirect to `/(app)`.

### Protected API: tRPC `protectedProcedure`

1. Server passes raw `Request` into `createContext({ req })`
2. Context calls `auth.api.getSession({ headers: req.headers })` and attaches `session` / `user`
3. Add `protectedProcedure` middleware — throws `UNAUTHORIZED` if no session
4. Add `auth.me` query as smoke test: returns `{ id, name, email, image }`

### Authenticated tRPC from mobile

Per Better Auth Expo docs, forward session cookies on every tRPC request:

```ts
// apps/mobile/src/lib/trpc.ts — httpBatchLink headers()
const cookies = authClient.getCookie();
if (cookies) headers.set("Cookie", cookies);
```

Use `credentials: "omit"` on the link (cookies set manually in headers).

### Local database: Docker Compose

Add `docker-compose.yml` at repo root:

- **Postgres 16** on `localhost:5432`
- DB `ascend`, user/password `postgres` (matches existing `.env.example`)
- Named volume for data persistence

Add root scripts: `db:up`, `db:down`, `db:migrate` (Prisma migrate dev).

### CORS fix (required for cookies)

Current server sets `Access-Control-Allow-Origin: *` with `Allow-Credentials: true` — browsers reject this combination.

**Fix:** reflect the request `Origin` when it is in an allowlist (localhost, LAN IP, `exp://` in dev), and set `Vary: Origin`. Required for web testing; mobile sends cookies via explicit `Cookie` header.

---

## UI Design — Sign-In Screen

### Visual reference

Two reference images inform this screen (stored in repo for implementation):

| Asset | Role |
|-------|------|
| `docs/features/authentication/reference/layout-reference.webp` | **Layout reference** — full-bleed hero image, text in lower third, single full-width CTA pinned to bottom (fitness onboarding pattern) |
| `apps/mobile/assets/images/auth/sign-in-hero.jpg` | **Hero background** — anime hunter character (Solo Leveling–style); full-screen `cover` image behind a dark overlay |

### Design type

**Hero-image auth gate** — not a form or card-based screen.

- Full-screen background photo (anime character)
- Dark gradient overlay so text and button stay readable (background **darker than the raw photo**, especially toward the bottom)
- Copy anchored in the **lower third** of the screen (above the button)
- **One** primary action pinned to the bottom with safe-area padding
- **No subheading** — headline block only
- Minimal chrome — no `SurfaceCard`, no input fields, no secondary links in v1

Matches the reference layout structure; Ascend identity comes from **System / Hunter copy**, terminal HUD typography, and design-system button styling.

### Layout (top → bottom)

```
┌─────────────────────────────────┐
│                                 │
│   [Full-bleed hero image]       │  ← sign-in-hero.jpg, resizeMode: cover
│   [Dark gradient overlay]       │  ← transparent → ~85% canvas black at bottom
│                                 │
│                                 │
│   SYSTEM                        │  ← micro-label (mono, uppercase, letter-spaced)
│   AWAKENING                     │  ← headline-1, white
│   REQUIRED, HUNTER.             │  ← headline-1 or headline-2, white
│                                 │
│   ┌─────────────────────────┐   │
│   │ [G] Continue with Google│   │  ← pinned bottom, px-s-24, safe area
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

Use `flex-1` spacer or `justify-end` column so text + button sit in the lower portion like the layout reference — not vertically centered on the full screen.

### Element specs

| Element | Spec |
|---------|------|
| **Background image** | `Image` / `expo-image` full-screen, `contentFit: "cover"`, source `@/assets/images/auth/sign-in-hero.jpg` |
| **Overlay** | `LinearGradient` (expo-linear-gradient) or stacked `View`: top `transparent` → bottom `rgba(29, 30, 26, 0.92)` (`#1D1E1A` at ~92%). Optional extra `bg-black/40` on entire image to darken globally |
| **System label** | `Text` — uppercase, letter-spaced, monospace (`monoFontFamily`), `text-neutral-300`, small caption size. Example: **`SYSTEM`** |
| **Headline** | `Text variant="headline-1"` — white, left-aligned, `px-s-24`. Hunter + System voice, 2–3 lines max. Example: **`AWAKENING REQUIRED, HUNTER.`** |
| **Subheading** | **None** — do not render body/subtitle copy on this screen |
| **Google CTA** | Pinned bottom, `px-s-24`, `pb` includes safe area. Custom `GoogleSignInButton` (see below) |
| **Loading** | Semi-transparent overlay on hero (`bg-black/60`) + `ActivityIndicator` System blue `#1A7AFF` while OAuth in flight |
| **Error** | Single line below button area — `text-error-500`, terse System copy: *"Authentication failed. Retry."* |

### Copy voice

From [product-vision.md](../../product-vision.md) — **System talking to the hunter**, not generic fitness app copy:

| Avoid | Use |
|-------|-----|
| "Workout for health" | System / hunter framing |
| "Get Started" | "Continue with Google" (button label stays clear for OAuth) |
| Body paragraph under headline | **Omit** — headline carries the message |

Suggested headline options (pick one during implementation):

- `SYSTEM` + `AWAKENING REQUIRED, HUNTER.`
- `SYSTEM` + `IDENTIFY YOURSELF, HUNTER.`
- `THE SYSTEM AWAITS.` (single headline line, no separate SYSTEM label)

### Google sign-in button

New component: `GoogleSignInButton` in `features/auth/components/`.

| Property | Value |
|----------|-------|
| Base | Design system `Button variant="active" fullWidth` behavior — white fill (`bg-neutral-0`), black label (`text-black`), `rounded-r-4`, `min-h-14` |
| Layout | `Pressable` row: **Google "G" logo** (left) + label (centered in remaining space) |
| Logo | SVG asset `apps/mobile/assets/icons/google-g.svg` (official multicolor G, ~20×20) via `react-native-svg` — **no** third-party icon library |
| Label | **Continue with Google** |
| Disabled / loading | `variant="disabled"` styling; show spinner instead of logo when `isLoading` |

Do not use the default blue Google branded button — Ascend white CTA with Google logo mark only.

### Implementation notes

- Sign-in screen may **not** use the standard `Screen` canvas background alone — it is image-first. Still use safe-area handling (`react-native-safe-area-context`).
- `SignInScreen` composes: `HeroBackground` → overlay → text block → `GoogleSignInButton`.
- Route file `(auth)/sign-in.tsx` only wires session redirect + `SignInScreen`.
- Component tests: assert headline text renders, Google button label + logo present, **no** subheading element.

### Protected home (minimal changes)

Move existing `index.tsx` content to `(app)/index.tsx`. Add session-aware header:

- Greeting: `Welcome, {session.user.name}` (or email fallback)
- `Button variant="stroke"` — **Sign out** → `authClient.signOut()` → redirect to sign-in

---

## API & Data

### Better Auth server config changes

`packages/auth/src/server.ts`:

```ts
import { expo } from "@better-auth/expo";

export const auth = betterAuth({
  // ...existing baseURL, basePath, prisma adapter
  emailAndPassword: { enabled: false },
  socialProviders: {
    google: {
      clientId: Bun.env.GOOGLE_CLIENT_ID!,
      clientSecret: Bun.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [expo()],
  trustedOrigins: [
    Bun.env.BETTER_AUTH_URL ?? "http://localhost:3001",
    "ascend://",
    "ascend://*",
    ...(Bun.env.NODE_ENV === "development"
      ? ["exp://", "exp://**", "exp://192.168.*.*:*/**"]
      : []),
  ],
});
```

### Prisma / schema

- Existing Better Auth models are sufficient for Google OAuth (Account stores `providerId: "google"`)
- Run initial migration: `prisma migrate dev --name init_auth`
- Re-run `@better-auth/cli generate` only if Expo plugin adds fields (verify after adding plugin)

### New tRPC router: `auth`

`packages/api/src/features/auth/router.ts`:

| Procedure | Auth | Input | Output |
|-----------|------|-------|--------|
| `auth.me` | protected | none | `{ id, name, email, image }` |

`packages/validators/src/auth.ts`:

- `authUserSchema` — Zod shape for `auth.me` response

### Context changes

`packages/api/src/context.ts`:

```ts
export type Context = {
  requestId: string;
  session: Session | null;
  user: User | null;
};

export async function createContext(opts: { req: Request }): Promise<Context> { ... }
```

`apps/server/src/index.ts` — pass `request` into `createContext({ req: request })`.

---

## Files — Creates & Changes

### New files

| Path | Purpose |
|------|---------|
| `docker-compose.yml` | Local Postgres |
| `docs/features/authentication/plan.md` | This plan |
| `packages/validators/src/auth.ts` | Auth response schemas |
| `packages/validators/src/auth.test.ts` | Validator tests |
| `packages/api/src/features/auth/router.ts` | `auth.me` |
| `packages/api/src/features/auth/router.test.ts` | Router unit tests |
| `docs/features/authentication/reference/layout-reference.webp` | Layout reference image (from `.temp/image1.webp`) |
| `apps/mobile/assets/images/auth/sign-in-hero.jpg` | Hero background — anime hunter character |
| `apps/mobile/assets/icons/google-g.svg` | Google "G" logo for sign-in button |
| `apps/mobile/src/features/auth/components/sign-in-screen.tsx` | Hero-image sign-in UI |
| `apps/mobile/src/features/auth/components/hero-background.tsx` | Full-bleed image + dark gradient overlay |
| `apps/mobile/src/features/auth/components/google-sign-in-button.tsx` | Design-system CTA + Google logo |
| `apps/mobile/src/features/auth/components/auth-loading-screen.tsx` | Session loading state |
| `apps/mobile/src/features/auth/components/sign-in-screen.test.tsx` | Component tests |
| `apps/mobile/src/features/auth/hooks/use-auth-session.ts` | Thin wrapper over `authClient.useSession()` (optional) |
| `apps/mobile/src/app/(auth)/_layout.tsx` | Auth stack layout |
| `apps/mobile/src/app/(auth)/sign-in.tsx` | Sign-in route |
| `apps/mobile/src/app/(app)/_layout.tsx` | Protected route guard |
| `apps/mobile/src/app/(app)/index.tsx` | Protected home |
| `apps/mobile/src/app/(app)/design-system.tsx` | Move from `app/design-system.tsx` |

### Modified files

| Path | Change |
|------|--------|
| `packages/auth/package.json` | Add `@better-auth/expo` |
| `packages/auth/src/server.ts` | Google OAuth, Expo plugin, disable email/password, trusted origins |
| `packages/auth/src/client.ts` | Export shared client factory (unchanged signature; Expo opts passed from mobile) |
| `packages/api/src/trpc.ts` | Add `protectedProcedure` |
| `packages/api/src/context.ts` | Session resolution from request |
| `packages/api/src/root.ts` | Register `authRouter` |
| `packages/db/package.json` | Add `db:migrate`, `db:push` scripts |
| `apps/server/src/index.ts` | Pass request to context; fix CORS for credentials |
| `apps/mobile/package.json` | Add `@better-auth/expo`, `expo-secure-store`, `expo-network`, `expo-web-browser`, `expo-image`, `expo-linear-gradient` |
| `apps/mobile/src/lib/auth-client.ts` | Wire `expoClient` + SecureStore, scheme `ascend` |
| `apps/mobile/src/lib/trpc.ts` | Forward auth cookies in headers |
| `apps/mobile/src/lib/providers.tsx` | No structural change unless auth provider wrapper needed |
| `apps/mobile/app.json` | Confirm `scheme: "ascend"` (already set) |
| `.env.example` | Add Google OAuth vars |
| `package.json` (root) | Add `db:up`, `db:down`, `db:migrate` scripts |
| `docs/architecture.md` | Document auth flow + protected routes (brief) |
| `docs/developer-guide.md` | Update "NOT Built Yet" section after implementation |

### Deleted / moved

| Path | Action |
|------|--------|
| `apps/mobile/src/app/index.tsx` | Replace with redirect or remove (entry becomes route groups) |
| `apps/mobile/src/app/design-system.tsx` | Move to `(app)/design-system.tsx` |

---

## Dependencies

### New packages

| Package | Where | Why |
|---------|-------|-----|
| `@better-auth/expo` | `@ascend/auth`, `@ascend/mobile` | Expo OAuth + secure cookies |
| `expo-secure-store` | mobile | Session/cookie storage |
| `expo-network` | mobile | Required by Better Auth Expo client |
| `expo-web-browser` | mobile | OAuth browser flow |
| `expo-image` | mobile | Performant full-screen hero background |
| `expo-linear-gradient` | mobile | Dark overlay gradient on hero image |

Install with Bun: `bunx expo install <pkg>` in `apps/mobile` for Expo packages.

### Environment variables

Add to `.env.example`:

```env
# Google OAuth (create at https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Existing (keep)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ascend?schema=public"
BETTER_AUTH_SECRET=""          # openssl rand -base64 32
BETTER_AUTH_URL="http://localhost:3001"
EXPO_PUBLIC_API_URL="http://localhost:3001"
EXPO_PUBLIC_AUTH_URL="http://localhost:3001"
```

**Google Cloud Console setup (manual, documented in report):**

| Setting | Value |
|---------|-------|
| OAuth client type | Web application |
| Authorized redirect URI | `http://localhost:3001/api/auth/callback/google` |
| Authorized JavaScript origins | `http://localhost:3001` (for web testing) |

For physical device testing, use your machine's LAN IP in `EXPO_PUBLIC_*` and `BETTER_AUTH_URL`, and add `http://<LAN-IP>:3001` to Google origins + Better Auth `trustedOrigins`.

---

## Security (from better-auth-security skill)

| Item | v1 decision |
|------|-------------|
| `BETTER_AUTH_SECRET` | Required, 32+ chars, never committed |
| Email/password | **Disabled** |
| CSRF | Keep enabled (default) |
| `trustedOrigins` | `ascend://`, dev `exp://` wildcards, server URL |
| Rate limiting | Default production behavior (no override in dev) |
| OAuth token encryption | Defer `encryptOAuthTokens` unless we need Google API access on behalf of user |
| Secure cookies | Auto in production; local HTTP uses non-secure cookies (expected) |

---

## Testing

| Layer | What to test |
|-------|----------------|
| Validators | `authUserSchema` parses valid user, rejects invalid |
| API router | `auth.me` returns user when session present; throws `UNAUTHORIZED` without |
| API context | Session extracted from mock request headers (unit test with mocked `auth.api.getSession`) |
| Mobile component | `SignInScreen` renders hero + System/Hunter headline (no subheading) + `GoogleSignInButton` with logo; loading/error states |
| Mobile store | N/A for v1 |
| Manual E2E | See checklist below |

**Manual verification checklist:**

1. `bun run db:up` — Postgres healthy
2. `bun run db:migrate` — tables created
3. `GET http://localhost:3001/api/auth/ok` → `{ status: "ok" }`
4. Expo → sign-in screen (unauthenticated)
5. Google sign-in → redirects back → lands on `/(app)`
6. Home shows user name; `auth.me` succeeds (optional debug display)
7. Sign out → back to sign-in
8. `bun run typecheck && bun run lint && bun run test`

---

## Implementation Steps (ordered)

1. **Docker + DB** — `docker-compose.yml`, root scripts, run migration
2. **Server auth config** — Google provider, Expo plugin, disable email/password, trusted origins
3. **Packages** — install `@better-auth/expo` and mobile deps
4. **tRPC auth layer** — context session, `protectedProcedure`, `auth.me` router
5. **Server CORS** — credential-safe origin handling
6. **Mobile auth client** — `expoClient` + SecureStore + cookie forwarding in tRPC
7. **Route restructure** — `(auth)` and `(app)` groups with guards
8. **Sign-in UI** — hero background asset, gradient overlay, System/Hunter headline (no subheading), `GoogleSignInButton` with logo
9. **Protected home** — move dev hub, add sign-out
10. **Tests** — validators, router, component
11. **Docs** — update `architecture.md`, `developer-guide.md`
12. **Verify** — full manual checklist

---

## Impact on existing code

- `health.ping` stays **public** (no auth required) — useful for connectivity checks before login
- Current `index.tsx` dev hub moves behind auth; developers sign in to access it
- `HealthStatus` on home continues to work post-login
- No hunter profile / onboarding models in this feature — auth only

---

## Out of scope (v1)

- Email/password, magic link, Apple sign-in
- Native `@react-native-google-signin/google-signin` (idToken flow)
- Email verification flows
- 2FA, organizations, bearer tokens
- Hunter profile schema (next feature)
- Onboarding / Awakening flow
- CI/CD pipeline
- Production deployment / HTTPS cookie config

---

## Risks & mitigations

| Risk | Mitigation |
|------|------------|
| OAuth redirect fails on physical device | Document LAN IP setup; add dev `exp://` trusted origins |
| CORS blocks cookies on web | Fix origin reflection before testing Expo web |
| Expo Go vs dev client differences | v1 uses browser OAuth (Expo Go compatible) |
| Google OAuth consent screen in testing | Add test users in Google Cloud Console |
| Session not forwarded to tRPC | Explicit `getCookie()` in link headers; test `auth.me` |

---

## Success criteria

- [ ] User can sign in with Google locally
- [ ] Unauthenticated users cannot access `/(app)/*` routes
- [ ] Authenticated users cannot access sign-in (redirected to app)
- [ ] `auth.me` protected procedure returns current user
- [ ] Session persists across app reload (SecureStore cache)
- [ ] Sign out clears session and blocks protected routes
- [ ] All automated tests pass; typecheck clean
- [ ] Docker Compose Postgres documented and working
- [ ] Sign-in screen matches hero-image layout reference (full-bleed art, dark overlay, bottom Google CTA)
- [ ] No subheading on sign-in; copy uses System/Hunter voice only

---

## Approval

**Stop here.** Do not implement until this plan is reviewed and approved.

After approval, implementation follows [feature-implementation.md](../../feature-implementation.md) and the Better Auth skills listed at the top. A `report.md` will be created on completion.
