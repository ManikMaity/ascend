# Design System — Agent Guide

**Audience:** AI agents and developers building Ascend mobile UI  
**Status:** Current (v3 — System terminal aesthetic)  
**Quick reference:** [design-system.md](../../design-system.md)  
**History:** [plan.md](./plan.md) (v2 GoFit iteration) · [report.md](./report.md)

---

## What this is

Ascend's mobile design system is a **global UI layer** — tokens, typography, and reusable components in `apps/mobile/src/components/`. Feature screens import from `@/components`; they do not redefine buttons, cards, or progress indicators.

The visual identity is **dark-first, System/terminal-inspired, fitness-data forward**: sharp corners, bordered HUD panels, segmented progress, monospace metrics, uppercase micro-labels, and **white primary actions** on a near-black canvas with System blue (`#1A7AFF`) as the accent.

---

## Iteration history (read this before building)

Understanding why the system looks the way it does prevents regressions.

| Version | Direction | Outcome |
|---------|-----------|---------|
| **v1** | Flat terminal HUD — 4px corners, uppercase labels, ghost buttons, minimal color | Too stark; felt unfinished |
| **v2** | GoFit case-study patterns — pill buttons, `rounded-r-20` cards, blue fill CTAs, SVG donut rings | Felt **generic** — indistinguishable from a template fitness app |
| **v3 (current)** | Hybrid: GoFit **structure** (spacing, component set, Barlow) + **terminal/System craft** (sharp `r-4`, borders, segmented progress, white CTAs, mono metrics) | Distinctive AI-system aesthetic while keeping workout-app usability |

**Lesson for agents:** Do not revert to v1's border-only flatness or v2's pill/generic shapes. v3 is intentional — sharp, bordered, segmented, uppercase labels on metadata only.

---

## Visual thesis (current)

1. **Canvas** `#1D1E1A` — near-black, not pure black  
2. **Surfaces** `#272727` / `#323232` — depth via fill + border, not soft shadows  
3. **Primary CTA** — **white background, black text** (`bg-neutral-0`, `text-black`)  
4. **Secondary CTA** — white stroke, transparent fill  
5. **Accent** — System blue `#1A7AFF` for progress fill, section chip borders, left card accents, status OK  
6. **Corners** — `rounded-r-4` (4px) everywhere; **no** `rounded-full` pills  
7. **Labels** — uppercase + letter-spacing on captions, chips, badges, stat rows, input labels  
8. **Metrics** — monospace font (`monoFontFamily` from `@/lib/tokens/shape`)  
9. **Progress** — **segmented blocks**, not smooth rounded bars or SVG donut charts  
10. **Copy voice** — System/hunter product language; visual tone is terminal HUD, not corporate SaaS

---

## File map

```
apps/mobile/
  src/
    components/          # 18 global components — import via @/components
    lib/tokens/
      colors.ts          # primitive + semantic color maps
      typography.ts      # Barlow scale
      spacing.ts         # s-4 … s-64
      radius.ts          # r-4, r-8, r-16, r-20, r-24, r-full
      shape.ts           # systemRadius, monoFontFamily
    global.css           # NativeWind base
    app/design-system.tsx  # dev showcase (delete before production)
  tailwind.config.js     # token → className bridge
```

---

## Import rules

```ts
// Components
import { Button, SurfaceCard, Text, ProgressBar } from "@/components";

// Tokens (when className tokens are not enough)
import { colors } from "@/lib/tokens/colors";
import { monoFontFamily } from "@/lib/tokens/shape";
```

- **Do** import global UI from `@/components` in feature code  
- **Do** use NativeWind `className` with token strings (`bg-surface`, `rounded-r-4`, `p-s-16`)  
- **Don't** create duplicate `Button` / `Card` in `features/` unless it is feature-specific and cannot use the system  
- **Don't** put business logic in `app/design-system.tsx` or route files  

---

## Tokens

### Colors

| Role | Token / hex | Use |
|------|-------------|-----|
| Canvas | `bg-canvas` / `#1D1E1A` | Screen background |
| Surface | `bg-surface` / `#272727` | Cards, list rows |
| Raised | `bg-surface-raised` / `#323232` | Progress track segments |
| Text primary | `text-neutral-0` / `#FEFFF9` | Body, titles |
| Text muted | `text-neutral-300` / `#C7C7C7` | Subtitles, captions |
| Accent | `primary-500` / `#1A7AFF` | Progress fill, borders, OK state |
| Error | `error-500` / `#F95D25` | Error button, missed status |
| Border | `border-border-subtle` | `rgba(255,255,255,0.08)` |

Semantic map lives in `colors.ts` → `colors.semantic.*` (button, card, input, progress, status).

### Typography

| Variant | Size | Font | Use |
|---------|------|------|-----|
| `headline-1` | 32px | Barlow Bold | Screen titles |
| `headline-2` | 24px | Barlow Bold | Section titles |
| `title` | 18px | Barlow Medium | Card / row titles |
| `body-1` | 16px | Barlow Regular | Default body |
| `body-2` | 14px | Barlow Regular | Metadata |
| `caption` | 12px | Barlow Medium | Uppercase labels |
| `metric` | 24px | **Monospace** | XP, reps, kcal, stats |

```tsx
<Text variant="headline-2">Training protocol</Text>
<Text variant="caption" muted style={{ letterSpacing: 1 }}>DURATION</Text>
<Text variant="metric">12,450</Text>
```

### Spacing & radius

- Spacing: `s-4` … `s-64` — e.g. `gap-s-16`, `p-s-20`, `px-s-24` (screen margins)  
- Radius: **`rounded-r-4`** is the system default; larger radii exist but use sparingly  
- Touch targets: buttons and inputs are **56px** min height (`min-h-14`)

---

## Components (when to use which)

| Component | Use for | Notes |
|-----------|---------|-------|
| `Screen` | Page wrapper | Safe area, canvas bg, horizontal padding |
| `Text` | All text | Always pass `variant`; use `muted` for secondary |
| `Button` | Actions | `active` = white/black; `stroke` = outline; `error` = abandon/destructive outline |
| `Input` | Form fields | Label auto-uppercases; field uses monospace |
| `Chip` | Filters | Uppercase labels; active = white fill |
| `DayPill` | Week selector | Square `56×56`, mono day code |
| `SectionChip` | Section tag | Blue border box, uppercase |
| `SurfaceCard` | Grouped content | Left blue accent border; optional `chipLabel` |
| `ListRow` | Tappable row | Thumbnail + title + trailing |
| `WorkoutCard` | Exercise block | ListRow + metric tiles |
| `StatusCard` | Quest state | `completed` / `missed` / `waiting`; mono icon |
| `MetricTile` | Stat block | Mono value, uppercase label |
| `ProgressBar` | Linear progress | 24 segments; `value` 0–100 |
| `ProgressRing` | Gauge | Square frame, corner ticks, segmented bottom bar |
| `StatRow` | Label + value | Uppercase label, mono value |
| `Badge` | Rank / tag | Uppercase, optional dot |
| `Divider` / `Spacer` | Layout | Standard gaps |

**Before adding a new component:** check if composition of existing ones suffices. New globals go in `src/components/` with a test and a showcase section.

---

## Do / Don't (for AI agents)

### Do

- Match **v3 terminal aesthetic** — sharp corners, borders, segmented progress, white primary buttons  
- Use **full string literals** in NativeWind ternaries (no `` `bg-${color}` `` interpolation)  
- Uppercase **metadata labels** (captions, chip text, stat labels, input labels)  
- Use **monospace** for numbers, codes, and terminal-style status (`OK`, `X`, `--`)  
- Use **System blue** for accent only — progress, borders, status OK — not for primary button fill  
- Compose feature UI from `@/components` + feature-specific layout in `features/<name>/components/`  
- Add a section to `/design-system` when introducing a new global component  
- Run `bun --filter @ascend/mobile typecheck` and `test` after UI changes  

### Don't

- **Don't** use `rounded-full` or pill shapes for buttons, chips, or badges  
- **Don't** use smooth rounded progress bars or standard donut/circle SVG charts  
- **Don't** make primary CTAs blue-filled (v2 pattern — rejected)  
- **Don't** use pure `#000` background or ad-hoc gray hex outside token scales  
- **Don't** use Barlow for metric numbers — use `variant="metric"` (mono)  
- **Don't** copy GoFit lime green, gold palette, or their pill-heavy generic look  
- **Don't** revert to v1's border-only flat panels with no surface fill  
- **Don't** add new npm dependencies for UI without user approval (v2 added `expo-font`, `react-native-svg`; ring is now View-based)  
- **Don't** put global components in `features/` folders  

---

## NativeWind constraints

1. **Static class strings** — build variant maps with complete class names per branch  
2. **Token classes** — defined in `tailwind.config.js`; prefer `bg-surface` over inline hex  
3. **Font families** — Barlow loaded via `expo-font` in `providers.tsx`; reference as `Barlow_700Bold` etc. in `style` when needed  
4. **Monospace** — import `monoFontFamily` from `@/lib/tokens/shape` for custom `style` overrides  

---

## Building a new feature screen

1. Wrap in `<Screen>`  
2. Use `<Text variant="headline-1">` for title; `<SectionChip>` for context tag if needed  
3. Group content in `<SurfaceCard chipLabel="...">`  
4. Actions: `<Button variant="active" fullWidth>` (white) for primary; `stroke` for secondary  
5. Lists: `<ListRow>` / `<WorkoutCard>`  
6. Stats: `<StatRow>`, `<MetricTile>`, `<ProgressBar>`, `<ProgressRing>`  
7. Route file in `app/` only imports and renders — logic in `features/<name>/`  

Example skeleton:

```tsx
import { Screen, Text, SurfaceCard, Button, StatRow, ProgressRing } from "@/components";

export function HunterDashboard() {
  return (
    <Screen>
      <Text variant="headline-1">Hunter dashboard</Text>
      <SurfaceCard chipLabel="Daily quest">
        <StatRow label="STR" value={12} />
        <ProgressRing value={60} size={112} />
        <Button variant="active" fullWidth>Begin training</Button>
      </SurfaceCard>
    </Screen>
  );
}
```

---

## Verification

```bash
bun --filter @ascend/mobile typecheck
bun --filter @ascend/mobile test
```

Manual: Expo dev → home → **Design System** (`/design-system`). Compare against the rules above — sharp corners, white CTA, segmented progress, mono metrics.

---

## Related docs

- [design-system.md](../../design-system.md) — concise token/component reference  
- [plan.md](./plan.md) — v2 implementation plan (historical)  
- [report.md](./report.md) — delivery notes per iteration  
- [architecture.md](../../architecture.md) — where components live in the repo  
- [developer-guide.md](../../developer-guide.md) — feature implementation patterns  
- [feature-implementation.md](../../feature-implementation.md) — plan/approve workflow for large changes
