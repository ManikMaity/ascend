# Design System

Ascend's global mobile UI layer — **System terminal aesthetic**: sharp corners, bordered HUD panels, segmented progress, monospace metrics, white primary actions, System blue accent.

**Agent guide (iterations, do/don't, examples):** [features/design-system/README.md](./features/design-system/README.md)

## Import paths

```ts
import { Button, SurfaceCard, WorkoutCard, Text, ProgressBar } from "@/components";
import { colors } from "@/lib/tokens/colors";
import { monoFontFamily } from "@/lib/tokens/shape";
```

## Visual language

- **Canvas** `#1D1E1A` — near-black app background
- **Surface** `#272727` — cards and list rows; **raised** `#323232` for progress tracks
- **Primary CTA** — white fill (`neutral-0`), black text — not blue
- **Accent** — System blue `#1A7AFF` (`primary-500`) for progress, borders, status OK
- **Corners** — `rounded-r-4` (4px) system default; no pill shapes
- **Labels** — uppercase + letter-spacing on captions, chips, badges, stat rows
- **Metrics** — monospace via `variant="metric"`
- **Font** — Barlow (Regular, Medium, Bold) for UI text

## Typography

| Variant | Size | Weight / font | Use |
|---------|------|---------------|-----|
| `headline-1` | 32px | Barlow Bold | Screen titles |
| `headline-2` | 24px | Barlow Bold | Section titles |
| `title` | 18px | Barlow Medium | Card titles |
| `body-1` | 16px | Barlow Regular | Default body |
| `body-2` | 14px | Barlow Regular | Metadata |
| `caption` | 12px | Barlow Medium | Uppercase labels |
| `metric` | 24px | Monospace | XP, reps, kcal |

```tsx
<Text variant="headline-2">Training protocol</Text>
<Text variant="caption" muted style={{ letterSpacing: 1 }}>DURATION</Text>
<Text variant="metric">12,450</Text>
```

## Spacing & radius

Spacing: `s-4` through `s-64` (e.g. `p-s-16`, `gap-s-24`, `px-s-24` for screen margins).

Radius: **`rounded-r-4`** default; `r-8`, `r-16`, `r-20`, `r-24` available but use sparingly.

## Components

| Component | Purpose |
|-----------|---------|
| `Screen` | Safe area, canvas bg, 24px horizontal padding |
| `Text` | Typography variants (metric = mono) |
| `Button` | `active` (white/black), `stroke`, `disabled`, `error` |
| `Input` | Uppercase label, monospace field |
| `Chip` / `DayPill` | Filter chips and week selector (square, sharp) |
| `SurfaceCard` | Bordered card with left blue accent; optional `chipLabel` |
| `SectionChip` | Uppercase section tag with blue border |
| `ListRow` | Thumbnail + title + trailing action |
| `WorkoutCard` | Exercise row with metric tiles |
| `StatusCard` | Completed / missed / waiting HUD tile |
| `MetricTile` | Small stat block |
| `ProgressBar` | 24-segment linear progress |
| `ProgressRing` | Square gauge with corner ticks + segmented bar |
| `StatRow` | Uppercase label + metric value |
| `Badge` | Uppercase tag for ranks |
| `Divider` / `Spacer` | Layout utilities |

## Do

- Import from `@/components` in feature code
- Use semantic tokens (`bg-surface`, `bg-neutral-0`, `text-neutral-300`, `border-border-subtle`)
- Use sharp `rounded-r-4` corners and bordered surfaces
- Use white primary buttons and segmented progress indicators
- Use full string literals in NativeWind ternaries (no template interpolation)

## Don't

- Use pill shapes (`rounded-full`) or generic smooth progress bars / donut charts
- Use blue-filled primary buttons (old v2 pattern)
- Add ad-hoc hex colors outside token scales
- Put global UI in `features/` folders

## Dev showcase

Navigate to `/design-system` in Expo dev. Delete `apps/mobile/src/app/design-system.tsx` before production.

## Reference

- **Agent guide:** [features/design-system/README.md](./features/design-system/README.md)
- **Visual inspiration:** GoFit structure + terminal/System HUD craft (not GoFit pills or lime green)
