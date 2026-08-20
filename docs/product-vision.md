# Ascend — Product Vision

Ascend is an anime/manhwa-themed fitness and self-improvement app inspired by Solo Leveling-style **Systems**. Real-world workouts and habits are framed as a game: the user **Awakens** as a weak hunter, receives stats, and levels from **Rank E** to **Rank S** through consistent real effort.

This document defines what Ascend is, who it is for, and the product principles that guide feature decisions. For technical architecture, see [architecture.md](./architecture.md). For implementation workflow, see [feature-implementation.md](./feature-implementation.md).

---

## One-Line Pitch

**Turn your real-life grind into the underdog-to-strongest story you already love.**

---

## Target Audience

Ascend is intentionally narrow:

- **Anime and manhwa fans**, especially Solo Leveling readers
- People who are **currently unfit or inconsistent** with training
- Users who want self-improvement to **feel like the fiction** they consume — not like another generic fitness app

We are not competing on workout-tracking accuracy. Apps like Nike Training Club, Freeletics, and Habitica already own that space. Ascend wins on **fantasy, voice, and meaningful progression**.

---

## Core Differentiator

The **System's voice** and the **rank-up fantasy** are the product. Tracking reps and habits is the mechanism; the story is the hook.

| Others optimize for | Ascend optimizes for |
|---------------------|----------------------|
| Precision and metrics | Narrative and identity |
| Generic encouragement | System-voice copy |
| Arbitrary streaks | Rank that means something |
| One-size programs | Hunter progression fantasy |

---

## The System Fantasy

Users are not "clients" or "athletes." They are **hunters** who have been chosen by the System.

- **Awakening** — onboarding is a narrative sequence, not a form wizard
- **Stats** — five attributes that grow from real behavior
- **Rank** — a public identity tier (E → D → C → B → A → S) earned through effort and trials
- **Quests** — structured challenges with predefined difficulty, not random daily tasks
- **Trials** — gate rank advancement so progression cannot be faked

The UI should feel like a dark System interface — sharp, minimal, authoritative — not a bright wellness app.

---

## Core Mechanics

### Five Stats

Each stat maps to a real training category and levels **independently**:

| Stat | Domain | Examples |
|------|--------|----------|
| **STR** | Strength | Push-ups, squats, resistance work |
| **VIT** | Cardio / endurance | Running, cycling, sustained effort |
| **AGI** | Mobility / agility | Stretching, yoga, dynamic movement |
| **INT** | Discipline / habits | Consistency, scheduled training, habit streaks |
| **SENSE** | Sleep / recovery | Rest, sleep quality, recovery habits |

### XP and Leveling

- Users earn **XP per exercise or activity**
- XP is **split across stats** based on what that activity trains (defined in System metadata, not guessed at runtime)
- Stat levels increase from accumulated XP in that stat alone
- **Rank** requires **balanced growth** across all stats plus a **rank-up trial** — maxing one stat does not carry the user

### Quests

- **Rule-based** with predefined difficulty progression
- Not live AI-generated in v1 — predictable, fair, and testable
- Quests drive the daily loop: complete activities → earn XP → advance quests → unlock rank trials

### Rank Placement and Integrity

Rank must stay **meaningful** and **hard to game**:

| Path | Max starting / early rank |
|------|---------------------------|
| Self-report only | **E-rank** |
| Photo verification | Can unlock **D-rank** |
| In-app performance trial | Required for higher ranks |
| Earned over time | Sustained real effort unlocks advancement |

Self-report alone never grants high rank. Claiming ability is not enough — the System verifies.

---

## Onboarding — The Awakening

Onboarding is framed as a **System Awakening sequence**, not account setup.

Collected information:

1. Basic physical info
2. Available equipment
3. Training focus / domain
4. Fitness goal (cut / bulk / endurance)
5. Training history
6. Self-reported capability (max push-ups, squats, etc.)
7. Optional photo verification

Flow ends with:

1. **Animated reveal** of starting rank and stats
2. Assignment of the **first quest**

The user should feel chosen, assessed, and launched — not registered.

---

## Data Model (Conceptual)

Two layers of exercise content:

### 1. Exercise content (base layer)

Sourced from an existing open exercise dataset:

- Name, muscle group, equipment
- Instructions, media

### 2. System metadata (Ascend layer)

Added on top of base content:

- Which stats the exercise feeds
- XP value
- Difficulty tier
- Rank unlock requirements

### User activity

Logged per exercise with:

- XP earned
- How XP splits across stats
- Timestamp and session context

---

## Tone and Copy

All user-facing copy should read as **the System talking to the hunter** — not generic app encouragement.

**System voice:** authoritative, terse, slightly ominous, rewarding when earned

| Avoid | Prefer |
|-------|--------|
| "Great job! Keep it up!" | "Quest complete. XP allocated." |
| "Let's get moving!" | "Training protocol initiated." |
| "You're doing amazing!" | "Stat growth detected. Continue." |

Visual direction: **dark System-interface aesthetic** — high contrast, sharp typography, minimal chrome, Solo Leveling UI energy.

---

## Out of Scope for v1

These are planned for later versions, not the first release:

- **AI personalization** — adaptive programming beyond rule-based quests
- **System-voice chatbot** — conversational System agent
- **Camera-based rep counting** — vision-assisted exercise logging

v1 proves the core loop: Awaken → train → earn XP → level stats → complete quests → rank up.

---

## Product Principles

When evaluating any feature, ask:

1. **Does it strengthen the System fantasy?** If it feels like a generic fitness app, reconsider.
2. **Does rank stay meaningful?** If users can skip effort and still advance, reject it.
3. **Are stats balanced?** One-dimensional grinding should not dominate rank.
4. **Is the copy System-voice?** Generic wellness language breaks immersion.
5. **Is v1 scope honest?** Rule-based systems before AI; earned progression before shortcuts.

---

## Success Looks Like

A Solo Leveling fan opens Ascend, goes through Awakening, sees their E-rank stats with a sting of truth, accepts their first quest, and trains because **leveling up feels like the story** — not because another app nagged them to drink water.

They tell a friend: *"It's like the System from Solo Leveling, but for real life."*

That sentence is the north star.
