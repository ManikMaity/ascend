# Design System — Report

**Status:** Complete (v3)  
**Scope:** Mobile design system — tokens, components, showcase, docs

## Summary

Built Ascend's global mobile UI in three iterations. v3 (current) combines GoFit **component structure** with a **System terminal HUD** aesthetic: sharp corners, bordered surfaces, segmented progress, monospace metrics, white primary CTAs, and System blue accent.

## Iterations

| Version | Direction | Result |
|---------|-----------|--------|
| v1 | Flat terminal HUD | Too stark |
| v2 | GoFit pills, rounded cards, blue CTAs, SVG rings | Too generic |
| v3 | Terminal craft + GoFit structure | **Current** — distinctive System look |

## Delivered (v3)

- Tokens: `colors`, `typography`, `spacing`, `radius`, `shape` (mono font, system radius)
- 18 components in `src/components/`
- Segmented `ProgressBar` and square `ProgressRing` gauge
- White/black primary `Button`; sharp `Chip`, `DayPill`, `Badge`, `SurfaceCard`
- Dev showcase at `/design-system`
- Docs: [design-system.md](../../design-system.md), [README.md](./README.md) (agent guide)
- 27 mobile tests passing; typecheck clean

## Key files

| Path | Role |
|------|------|
| `apps/mobile/src/components/` | Global UI |
| `apps/mobile/src/lib/tokens/` | Design tokens |
| `apps/mobile/tailwind.config.js` | NativeWind token bridge |
| `apps/mobile/src/app/design-system.tsx` | Dev showcase |
| `docs/design-system.md` | Quick reference |
| `docs/features/design-system/README.md` | Agent guide |

## Verify

```bash
bun --filter @ascend/mobile typecheck
bun --filter @ascend/mobile test
```

Manual: Expo → `/design-system`

## Not in scope

- Light mode
- Icon library
- `HealthStatus` refactor (still uses legacy utility classes)
