# Design System — Implementation Plan (v2)

> **Current system is v3 (terminal HUD).** For up-to-date rules, read [README.md](./README.md) and [design-system.md](../../design-system.md). This plan documents the v2 GoFit iteration (historical).

**Status:** Superseded by v3  
**Feature:** Ascend global design system (mobile v1)  
**Visual reference:** [GoFit Fitness App UX/UI Case Study](https://www.behance.net/gallery/249457125/GoFit-Fitness-App-UXUI-Case-Study) (Behance #249457125)  
**Scope:** Mobile only — tokens, typography, global CSS, reusable components. No server, API, or database.

---

## Goal

Replace the current v1 design system (flat terminal/HUD aesthetic) with a **workout-app-native** UI layer modeled on GoFit's case-study system — pill buttons, elevated dark surfaces, Barlow typography, semantic tokens, and fitness-specific components.

Ascend keeps its **System blue** (`#1A7AFF`) as the primary accent everywhere GoFit uses lime green. Everything else follows GoFit's **structure and component patterns**, not Ascend's previous "three colors / sharp 4px / uppercase HUD" rules.

A dev-only `/design-system` route remains a single scrollable showcase. Delete that file before production; keep `components/`, `lib/tokens/`, `global.css`, and `tailwind.config.js`.

---

## What We Learned From GoFit (Extract Only)

GoFit is a **dark-first fitness app** with a proper Figma-style design system. We adopt **how** it is built, not its feature screens or copy.

### System architecture (from case study)

| Layer | GoFit pattern | Ascend adoption |
|-------|---------------|-----------------|
| **Primitive tokens** | Color scales (Primary, Neutral, Error) with weights 25–950; spacing `S-*`; radius `R-*` | Same structure; Primary scale = System blue |
| **Semantic tokens** | Component paths like `Workouts card/background`, `Button/active` | Map primitives → component roles |
| **Typography** | **Barlow** — Regular / Medium / Bold; fixed type scale | Same font + scale via `expo-font` |
| **Layout grid** | 375×812, 4 columns, **24px side margins**, **16px gutter** | Screen horizontal padding = 24px |
| **Modes** | Light + Dark variable tables | **Dark-first v1**; token tables structured for future light mode |

### Visual language (from case study)

| Element | GoFit pattern | Ascend rule |
|---------|---------------|-------------|
| **Canvas** | Near-black `#1D1E1A` (Pastel Black), not pure `#000` | `bg-canvas` = `#1D1E1A` |
| **Surfaces** | Cards `#272727` (Transparent neutral) on darker canvas | `bg-surface` = `#272727` |
| **Primary CTA** | Neon lime fill, **black text**, pill shape | System blue fill, **black text**, pill shape |
| **Secondary CTA** | Stroke only — white border, no fill | Same |
| **Corner radius** | Large — cards **16–24px**, buttons **pill (full)** | `rounded-card` 20px, buttons `rounded-full` |
| **Section headers** | Small **pill chip** on card top-left (primary bg + dark text) | `SectionChip` component |
| **Inputs** | Dark surface, **12–16px** radius, label above, left icon slot | Not bordered-outline boxes |
| **Lists** | Thumbnail left → title + meta → chevron/action right | `ListRow` pattern |
| **Progress** | Thick **circular rings** + thin **rounded linear bars** | Both, not flat 1px bordered bars |
| **Spacing** | Generous — **16–20px** card padding, **24–32px** between sections | Follow GoFit rhythm, not cramped HUD |

### What we do NOT copy from GoFit

- Nutrition/meal-specific screens and flows
- Arabic/Tajawal localization (English + Barlow only in v1)
- Social login, chat coach, or onboarding wireframes
- GoFit's lime green, gold browns, or brand name
- Light mode implementation (defer; keep token shape ready)

---

## Ascend Visual Thesis (Revised)

- **Workout app that feels designed**, not generated — rounded, layered, tactile
- **Dark canvas + elevated surfaces** — depth via surface color, not borders-only flat panels
- **System blue** as the single energetic accent (replaces GoFit green)
- **Barlow** for all UI text — bold headlines, medium labels, regular body
- **Pill buttons and chips** — no sharp 4px rectangles, no uppercase tracking-widest HUD labels
- **Fitness data forward** — rings, metric tiles, workout rows, status cards
- Copy stays System-voice (product vision); **visual tone** follows GoFit component craft

---

## Architecture

Unchanged folder layout:

```
apps/mobile/
  src/
    global.css
    lib/tokens/
      colors.ts          # primitive + semantic exports
      typography.ts
      spacing.ts
      radius.ts
    components/
      ...
      index.ts
    app/
      design-system.tsx  # single showcase file
  tailwind.config.js
```

**Import convention:**

```ts
import { Button, WorkoutCard, Text } from "@/components";
import { colors, spacing } from "@/lib/tokens/colors";
```

---

## Tokens

### Primitive colors

GoFit uses weighted scales. Ascend maps **Primary → System blue** and keeps GoFit's neutral/error structure.

#### Primary (System blue scale)

Base anchor: `#1A7AFF` at weight **500**. Generate lighter/darker steps for hover, pressed, and subtle fills.

| Weight | Role (dark mode) |
|--------|------------------|
| 50–100 | Subtle primary tint backgrounds |
| 200 | **Button active fill** (GoFit `Primary/Dark/200` equivalent) |
| 500 | Base System blue `#1A7AFF` |
| 700–800 | Pressed / emphasis |
| 900–950 | Deep primary shade |

#### Neutral (from GoFit palette — keep values)

| Token | Hex | Role |
|-------|-----|------|
| `neutral-0` | `#FEFFF9` | Baby Powder — primary text on dark |
| `neutral-300` | `#C7C7C7` | Glossy — secondary text |
| `neutral-500` | `#616161` | Storm Dust — disabled text/icons |
| `neutral-650` | `#525252` | Mid disabled (light-mode ref) |
| `neutral-950` | `#1D1E1A` | Pastel Black — **inverse text on primary buttons** |
| `canvas` | `#1D1E1A` | App background |
| `surface` | `#272727` | Card / input background |
| `surface-raised` | `#323232` | Optional elevated surface |
| `border-subtle` | `rgba(255,255,255,0.08)` | Hairline separators |

#### Error (from GoFit — workout apps need missed/failed states)

| Token | Hex | Role |
|-------|-----|------|
| `error-500` | `#F95D25` | Flamingo — missed workout, validation |
| `error-800` | `#BD261B` | Vintage Red — destructive emphasis |

No rainbow rank colors, no success green. Completed = primary blue; missed = error red; waiting = neutral surface.

### Semantic colors (component mapping)

Follow GoFit's `Component/Property` naming in TS + Tailwind:

| Semantic token | Dark mode maps to |
|----------------|-------------------|
| `button/active/bg` | `primary-200` |
| `button/active/text` | `neutral-950` |
| `button/stroke/border` | `neutral-0` |
| `button/stroke/text` | `neutral-0` |
| `button/disabled/bg` | `neutral-500` |
| `button/disabled/text` | `neutral-500` |
| `button/error/bg` | `error-500` |
| `button/error/text` | `neutral-950` |
| `card/bg` | `surface` |
| `card/title` | `neutral-0` |
| `card/subtitle` | `neutral-300` |
| `input/bg` | `surface` |
| `input/text` | `neutral-0` |
| `input/placeholder` | `neutral-500` |
| `input/focus/border` | `primary-500` |
| `progress/track` | `surface-raised` |
| `progress/fill` | `primary-500` |
| `status/completed` | `primary-500` |
| `status/missed` | `error-500` |
| `status/waiting` | `neutral-500` |

### Typography — Barlow

GoFit type scale (English). Load via `@expo-google-fonts/barlow` + `expo-font`.

| Token | Size | Weight | Line height | Use |
|-------|------|--------|-------------|-----|
| `headline-1` | 24px | Bold (700) | 32px | Screen titles |
| `headline-2` | 20px | Bold (700) | 28px | Section titles |
| `title` | 16px | Medium (500) | 24px | Card titles, list primary |
| `body-1` | 14px | Regular (400) | 20px | Default body |
| `body-2` | 12px | Regular (400) | 16px | Metadata, captions |
| `caption` | 9px | Medium (500) | 12px | Badges, tiny labels |
| `metric` | 20px | Bold (700) | 28px | XP, reps, kcal — tabular nums |

**Drop** old variants: `display`, `label` (uppercase), `mono` as separate voice. Use `metric` for numbers.

### Spacing (GoFit `S-*` primitives)

| Token | px |
|-------|-----|
| `s-0` | 0 |
| `s-4` | 4 |
| `s-8` | 8 |
| `s-16` | 16 |
| `s-24` | 24 |
| `s-32` | 32 |
| `s-40` | 40 |
| `s-48` | 48 |
| `s-56` | 56 |
| `s-64` | 64 |

**Screen horizontal padding:** `s-24` (matches GoFit grid margins).  
**Card internal padding:** `s-16` to `s-20` (use `s-16` default).  
**Section gap:** `s-24` to `s-32`.

### Radius (GoFit `R-*` primitives)

| Token | px | Use |
|-------|-----|-----|
| `r-8` | 8 | Small chips |
| `r-16` | 16 | Inputs, small cards |
| `r-20` | 20 | Default cards |
| `r-24` | 24 | Hero cards, bottom sheets |
| `r-full` | 9999 | **Buttons, day pills, section chips** |

### Motion

| Token | Value | Use |
|-------|-------|-----|
| `duration-fast` | 150ms | Press opacity |
| `duration-normal` | 250ms | Progress width / ring |

Allowed: opacity, width/stroke-dashoffset on progress. No glow, bounce, or shimmer.

---

## Global CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    @apply bg-canvas text-neutral-0 antialiased;
  }
}
```

Barlow applied via `Text` component + `useFonts` in root layout providers.

---

## Components (GoFit-Derived)

Replace the current flat component set. Names reflect **workout app** usage; implementation follows GoFit specs.

### Primitives

| Component | GoFit source | Spec |
|-----------|--------------|------|
| `Screen` | Layout grid §6 | Safe area, `bg-canvas`, horizontal `px-24` (s-24), no default vertical padding |
| `Text` | Typography §2 | Barlow variants from scale; `muted` → `neutral-300` |
| `Divider` | Subtle separators | 1px `border-subtle`, horizontal inset optional |
| `Spacer` | Spacing §8 | Fixed-height gap using `S-*` tokens |

### Interactive

| Component | GoFit source | Spec |
|-----------|--------------|------|
| `Button` | Buttons §5 (Dark & Light token table) | **Pill** (`rounded-full`), min-h **48px**, full-width option. Variants: `active` (primary fill + dark text), `stroke` (outline), `disabled`, `error`. Pressed: opacity 0.85. **Not** ghost/link style in v1. |
| `Input` | Auth / form screens | `bg-surface`, `rounded-16`, h-52px, label above (`body-2` muted), optional `leftIcon` / `rightIcon` slots. Focus: `border-primary-500` 1px. No focus ring. |
| `Chip` | Filter tabs, day pills | Pill, `active` = primary fill + dark text, `inactive` = surface + white text |
| `DayPill` | Workouts day selector | Circle or pill for SUN–SAT; selected = solid primary |

### Data / display (workout-focused)

| Component | GoFit source | Spec |
|-----------|--------------|------|
| `SurfaceCard` | Card containers | `bg-surface`, `rounded-20`, `p-16`. Optional `SectionChip` slot at top. No 1px border-only flat panel. |
| `SectionChip` | Green pill section labels | Small pill, `bg-primary-200`, `text-neutral-950`, `rounded-full`, `px-12` `py-4`, `text-caption` |
| `ListRow` | Workout / meal list items | Horizontal: optional 48px thumb → title (`title`) + subtitle (`body-2` muted) → trailing chevron or action. `bg-surface`, `rounded-16`, `p-12`, min-h 72px |
| `WorkoutCard` | Workout program cards | `ListRow` + optional duration/kcal `MetricTile` row; thumbnail 64px rounded-16 |
| `StatusCard` | Completed / Missed / Waiting | 3-up grid of square tiles (~100px), icon + label, state color top stripe or icon tint |
| `MetricTile` | Dashboard mini stats | Small surface tile: icon + `metric` value + `body-2` label (e.g. "230 Kcal") |
| `ProgressBar` | Linear progress | H-6–8px, `rounded-full`, track `surface-raised`, fill `primary-500` |
| `ProgressRing` | Calorie / task rings | SVG or RN circular stroke, thick (8–12px), primary fill on dark track, center `metric` text |
| `StatRow` | Body profile stats | GoFit list style — label left (`body-1`), value right (`metric`), inside `SurfaceCard` |
| `Badge` | Tags | Small pill, `bg-surface-raised`, `text-body-2`, optional primary dot — rank letters E–S same style |

### Removed / renamed from v1

| Old | Action |
|-----|--------|
| `Card` | → `SurfaceCard` |
| `SystemMessage` | **Remove** — use `SurfaceCard` + `Text` |
| `Button` ghost variant | **Remove** — GoFit uses stroke, not ghost |
| `Text` display/label/mono | **Replace** with Barlow scale |
| Sharp `rounded-sm` (4px) | **Remove** — use `r-16`/`r-20`/`r-full` |

---

## Showcase Route (`app/design-system.tsx`)

Single file, inline section functions. Sections mirror GoFit's design-system pages:

1. **Header** — "Design System v2" + Barlow note
2. **Color primitives** — Primary (blue) scale swatches + Neutral + Error
3. **Semantic tokens** — Button + Card token table (dark mode)
4. **Typography** — Full Barlow scale samples
5. **Spacing & radius** — Visual rulers for S-* and R-*
6. **Buttons** — active / stroke / disabled / error × default / pressed
7. **Inputs** — empty, filled, focused, error
8. **Chips & day pills** — filter + week selector
9. **Surface cards** — with `SectionChip`, nested content
10. **List rows & workout cards** — sample exercises
11. **Status cards** — completed / missed / waiting
12. **Progress** — linear bar + ring at 25/60/100%
13. **Metric tiles & stat rows** — STR/VIT/AGI/INT/SENSE
14. **Composition** — mini dashboard panel (GoFit home-screen density, Ascend copy)

Copy stays System-voice. Layout/spacing follows GoFit screenshots.

---

## Files

### Create / replace

| Path | Purpose |
|------|---------|
| `lib/tokens/colors.ts` | Primitive + semantic color maps |
| `lib/tokens/typography.ts` | Barlow scale |
| `lib/tokens/spacing.ts` | S-* scale |
| `lib/tokens/radius.ts` | R-* scale |
| `components/Text.tsx` | Barlow variants |
| `components/Button.tsx` | Pill button — active/stroke/disabled/error |
| `components/Input.tsx` | Labeled field with icon slots |
| `components/Screen.tsx` | Canvas + 24px margins |
| `components/SurfaceCard.tsx` | Elevated card |
| `components/SectionChip.tsx` | Pill section label |
| `components/Chip.tsx` | Filter chip |
| `components/DayPill.tsx` | Week day selector cell |
| `components/ListRow.tsx` | Generic list item |
| `components/WorkoutCard.tsx` | Exercise/program row |
| `components/StatusCard.tsx` | Completed/missed/waiting tile |
| `components/MetricTile.tsx` | Small stat block |
| `components/ProgressBar.tsx` | Rounded linear |
| `components/ProgressRing.tsx` | Circular gauge |
| `components/StatRow.tsx` | Label + value row |
| `components/Badge.tsx` | Pill tag |
| `components/Divider.tsx` | Hairline rule |
| `components/Spacer.tsx` | Tokenized gap |
| `components/index.ts` | Barrel |
| `components/*.test.tsx` | Updated tests |
| `app/design-system.tsx` | Rebuilt showcase |
| `docs/design-system.md` | Rewritten for v2 |

### Modify

| Path | Change |
|------|--------|
| `tailwind.config.js` | Full GoFit-style token theme |
| `global.css` | Canvas + Barlow base |
| `src/lib/providers.tsx` | Load Barlow via `useFonts` |
| `apps/mobile/package.json` | Add `@expo-google-fonts/barlow`, `expo-font` |
| `docs/architecture.md` | Update design system section |
| `docs/developer-guide.md` | Link + component list |

### Delete (from v1 implementation)

| Path | Reason |
|------|--------|
| `components/Card.tsx` | Replaced by `SurfaceCard` |
| `components/SystemMessage.tsx` | Not in GoFit pattern |

---

## Dependencies

| Package | Needed | Why |
|---------|--------|-----|
| `expo-font` | Yes | Load Barlow |
| `@expo-google-fonts/barlow` | Yes | GoFit typography |
| New icon library | No | Icon slots accept `ReactNode`; defer icon pack |

---

## Testing

| File | Covers |
|------|--------|
| `Text.test.tsx` | Barlow variants render |
| `Button.test.tsx` | active/stroke/disabled/error, onPress, disabled blocks |
| `ProgressBar.test.tsx` | Clamps 0–100 |
| `Badge.test.tsx` | Label text |
| `StatusCard.test.tsx` | State variants render |
| `SurfaceCard.test.tsx` | Children + optional chip |

```bash
bun run typecheck
bun --filter @ascend/mobile test
```

Manual: Expo → `/design-system` → compare against GoFit PDF: pill buttons, rounded cards, surface depth, 24px margins, blue accent.

---

## Migration From Current v1

The existing implementation is a full replace, not a patch:

1. **Tokens** — expand to primitive + semantic; change canvas to `#1D1E1A`
2. **Typography** — add Barlow; remove uppercase label variant
3. **Button** — pill shape, stroke variant instead of ghost, semantic colors
4. **Cards** — surface elevation, 20px radius, section chips
5. **New** — `ProgressRing`, `MetricTile`, `StatusCard`, `WorkoutCard`, `Chip`, `DayPill`
6. **Showcase** — rebuild all sections to match GoFit layout density
7. **Docs** — rewrite `design-system.md`

`HealthStatus` on home stays untouched.

---

## Implementation Order

1. Dependencies (`expo-font`, Barlow) + font loading in providers
2. Tokens (`colors`, `typography`, `spacing`, `radius`) + `tailwind.config.js`
3. `global.css` base layer
4. Primitives: `Screen`, `Text`, `Divider`, `Spacer`
5. Interactive: `Button`, `Input`, `Chip`, `DayPill`
6. Display: `SurfaceCard`, `SectionChip`, `ListRow`, `WorkoutCard`, `StatusCard`, `MetricTile`, `ProgressBar`, `ProgressRing`, `StatRow`, `Badge`
7. `components/index.ts` barrel
8. `app/design-system.tsx` showcase
9. Tests
10. `docs/design-system.md` + architecture updates
11. Verify

---

## Open Decisions

| Item | Default | Notes |
|------|---------|-------|
| Primary accent | `#1A7AFF` (System blue) | Replaces GoFit lime green |
| Canvas | `#1D1E1A` | GoFit Pastel Black — not pure black |
| Font | Barlow | Matches GoFit case study |
| Light mode | Deferred | Token tables structured for it |
| Icon library | Deferred | Slot-based components first |

---

## Approval

**Do not implement until this plan is reviewed and approved.**

After approval → implement → `docs/features/design-system/report.md`.
