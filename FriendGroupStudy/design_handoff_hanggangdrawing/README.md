# Handoff: Hanggangdrawing — Friend Group Study App

## Overview

**Hanggangdrawing** ("still at the planning stage" — a self-aware Filipino-slang name) is a private study clubhouse for a group of 19 friends preparing for coding interviews, the Philippine Civil Service Exam, mock exams, and shared assignments. The app combines a social timeline, group chat, flashcards, an AI study buddy, a Pomodoro timer with co-study rooms, polls, shared notes, a photo album, and a project Kanban board.

This handoff covers the **complete UI design across 14 distinct screens**, the design system (tokens, type, color, components), and behavior specs needed to implement the app in the real codebase.

---

## About the Design Files

The HTML files in `prototype/` are **design references** — high-fidelity working prototypes implemented in React + inline JSX inside a single HTML file. They are **not production code to ship as-is.** Your job is to **recreate these designs in the target codebase using its established patterns.**

The team's planned stack (see the team brief in this folder for full context):
- **Backend**: Python · FastAPI · SQLAlchemy · Alembic · PostgreSQL (SQLite for early dev) · JWT (python-jose + passlib)
- **Frontend**: Either **HTML + Tailwind CSS + Alpine.js** (no build tools) or **React** — team decision pending
- **Real-time chat**: FastAPI native WebSockets
- **File/image storage**: Cloudinary (free tier)
- **Deploy**: Railway (backend + DB), Vercel (frontend if React)

Whichever frontend stack the team picks, use this design as the **visual + interaction spec**. Component names and structure in the prototype map roughly to what the production app needs but don't copy the file structure verbatim.

---

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, animations, and component states are committed. Recreate pixel-fairly in the chosen frontend stack. Where this README and the prototype HTML differ, the **prototype is the source of truth** — open `prototype/Hanggangdrawing.html` in a browser to interact with the live design.

---

## Brand & Tone

- **Cozy, journal-like, programmer-friendly.** Warm + clean.
- **Mobile-first** but every layout must scale gracefully to desktop.
- **Filipino-friendly copywriting** — light bilingual sprinkles welcome (e.g. the login quote "*Plano, plano, plano — tara, gawin na natin.*"). Never required, just permitted.
- **Character mascot** drives the auth and profile screens. Current SVG is a **placeholder** — the team has an artist who will replace it. See "Assets → Character" for swap instructions.

---

## Design Tokens

All tokens live in `prototype/tokens.css`. Re-implement as CSS variables (or Tailwind theme extension / your codebase's equivalent).

### Color — Light mode (default)

| Token | Value | Use |
|---|---|---|
| `--paper` | `#f8fafc` | App background |
| `--paper-soft` | `#eef2f7` | Subtle fills, tab tracks |
| `--card` | `#ffffff` | Card surfaces |
| `--card-edge` | `#e2e8f0` | Card borders |
| `--ink` | `#0f172a` | Primary text |
| `--ink-soft` | `#334155` | Secondary text |
| `--ink-mute` | `#64748b` | Tertiary text, labels |
| `--line` | `#cbd5e1` | Dividers, input borders |
| `--line-soft` | `#e2e8f0` | Subtle dividers |
| `--accent` | `#2563eb` | Primary brand blue (links, CTAs) |
| `--accent-soft` | `#3b82f6` | Lighter blue (gradient partner) |
| `--terra` | `#2563eb` | (alias of accent for legacy refs) |
| `--sage` | `#0ea371` | Success / studying-now / "done" |
| `--ochre` | `#d97706` | Warnings, ochre tags |
| `--berry` | `#7c3aed` | Tertiary accent |
| `--tint-terra` | `rgba(37,99,235,0.12)` | Blue pill background |
| `--tint-sage` | `rgba(14,163,113,0.12)` | Green pill background |
| `--tint-ochre` | `rgba(217,119,6,0.12)` | Amber pill background |
| `--tint-berry` | `rgba(124,58,237,0.12)` | Violet pill background |
| `--tint-strong` | `rgba(37,99,235,0.18)` | Blue progress bar fill |
| `--shadow-ink` | `rgba(15,23,42,0.18)` | Card shadow |
| `--shadow-ink-soft` | `rgba(15,23,42,0.04)` | Subtle inner shadow |
| (yellow CTA) | `#fbbf24` | Auth/profile primary action ("SIGN IN", "CUSTOMIZE") |

### Color — Dark mode (programmer)

| Token | Value |
|---|---|
| `--paper` | `#0b1220` |
| `--paper-soft` | `#111a2c` |
| `--card` | `#131c30` |
| `--card-edge` | `#1f2a44` |
| `--ink` | `#e2e8f0` |
| `--ink-soft` | `#cbd5e1` |
| `--ink-mute` | `#7a8aa3` |
| `--line` | `#1f2a44` |
| `--line-soft` | `#182238` |
| `--accent` | `#60a5fa` |
| `--accent-soft` | `#3b82f6` |
| `--sage` | `#34d399` |
| `--ochre` | `#fbbf24` |
| `--berry` | `#a78bfa` |
| `--tint-terra` | `rgba(96,165,250,0.18)` |
| `--tint-sage` | `rgba(52,211,153,0.18)` |
| `--tint-ochre` | `rgba(251,191,36,0.18)` |
| `--tint-berry` | `rgba(167,139,250,0.18)` |
| `--shadow-ink` | `rgba(0,0,0,0.5)` |

Dark mode is selected by `data-theme="dark"` on `<html>` (or your equivalent).

### Avatar colors (assigned per friend, see `data.jsx`)

19 deterministic colors from this palette, cycled by index:
```
#B8553A #6E7B4F #C9924A #8A3E58 #5C7B8A
#A05A3B #7B6E4F #946C8E #4F7B6E #C46B4A
#8E7AAA #6A8E5C #B8895A #7A5A6E #5A7A8E
#A87B4A #6E4F7B #946E5A #5A946E
```
These produce warm-but-distinct circular initials avatars. Initials = first letter of first name + first letter of last name (or just first letter if single).

### Typography

| Family | Source | Use |
|---|---|---|
| **Plus Jakarta Sans** | Google Fonts | Display + body (everything) |
| Instrument Serif | Google Fonts | Optional "Journal" type theme (tweak option) |
| JetBrains Mono | Google Fonts | Optional "Lab" theme + any code/inline mono |
| Caveat | Google Fonts | Original handwritten accent (no longer default; kept as fallback for `.hand`) |

- **Display weight**: 700 (or 800 for `SIGN IN` / `PROFILE` lockups)
- **Body**: 400 / 500 (mid-emphasis labels) / 600 (titles, names)
- **Letter-spacing**: `-0.02em` for large display headlines (28px+); `0` for body; `+0.2` to `+0.4` for ALL-CAPS labels.
- **Line height**: 1 for headlines, 1.4–1.55 for body, 1.1 for tight name/title rows.

### Spacing scale (CSS custom properties)

```
--s1: 4px   --s2: 8px   --s3: 12px   --s4: 16px
--s5: 20px  --s6: 24px  --s8: 32px   --s10: 40px
```
Common card padding: 16–22px. Common gap between stacked cards: 12px. Common horizontal screen padding: 22px.

### Radii

- 8 — small pills, input pill chips
- 10–12 — secondary buttons, small inputs
- 14 — primary pill buttons, larger inputs
- 18 — most cards (`.j-card`)
- 22 — flashcard faces
- 24 — sheet/modal top edge
- 32 → 36 — top-of-screen rounded curved-header bottom corners
- 999 — fully rounded pills (rounded fields, tag chips, primary CTAs)

### Shadows

- Card: `0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px var(--shadow-ink-soft), 0 8px 24px -16px var(--shadow-ink)`
- Floating CTA (yellow button): `0 8px 20px -8px rgba(251,191,36,0.7)`
- Header cover (gradient): no shadow, just `border-radius: 0 0 36px 36px`
- Bottom-tab card: same as card.

### Motion

- Easing: `cubic-bezier(.25,.85,.35,1)` for fades and flips; `cubic-bezier(.2,.8,.3,1)` for sheet slide-up; `0.08s` linear for button press scale.
- Fade-up entry animation: `opacity 0→1, translateY 6px→0` over 0.4s. Staggered by ~40ms × index for lists.
- Flashcard flip: `transform 0.55s cubic-bezier(.25,.85,.35,1)` on the parent; both faces use `backface-visibility: hidden`.
- Timer ring: `stroke-dashoffset 1s linear` per tick.

### Density

Three options exposed in the Tweaks panel — affects `--row-h` (48 / 56 / 64) and `--card-pad` (14 / 18 / 22). Default: `regular`.

---

## Screens

### 1. Sign In / Sign Up — `AuthStep` (in `screens-a.jsx`)

**Purpose**: New & returning users authenticate via Facebook, Google, Apple, or email/password.

**Layout** (mobile, 402×874 reference; scale up gracefully):
- **Top half (~360px)**: curved blue gradient header (`linear-gradient(155deg, var(--accent), var(--accent-soft))`, rounded `0 0 36px 36px`). Two soft white blob accents (160px and 120px circles at ~8% / 6% opacity).
- **Top-left of header**: yellow rounded square back button (`#fbbf24`, 36×36, radius 12, with a left-chevron icon).
- **Center of header (overlapping bottom edge)**:
  - **Speech bubble** — white card, 10×16 padding, 18px radius, font 14/700, with a 14×14 tail rotated 45° pointing down-left at the character. Text: **"Welcome back!"** on Sign In, **"Let's get started!"** on Sign Up.
  - **Character mascot** — 170px SVG (placeholder; see Assets section). Sits below the bubble.
- **Bottom half (overlapping with `border-radius: 32px 32px 0 0`)**: white card.
  - **Segmented tabs**: `SIGN IN` | `SIGN UP`. Inactive = `--ink-mute`. Active = `--ink` + 3px ink underline (centered 60% of tab width).
  - **Fields** (all pill-shaped, `border-radius: 999px`, `1.5px solid var(--line)`, 18px horizontal padding, 13px vertical padding):
    - "User name" (text)
    - "Password" (password, with show/hide eye toggle)
    - "Confirm password" (sign-up only)
  - **Forgotten password?** link (sign-in only) — right-aligned, `--ink-mute`, 12px, font-weight 500.
  - **Primary CTA**: full-width yellow pill (`#fbbf24` enabled / `#fde68a` disabled), `#1f2937` text, 14px/800, letter-spacing 1, label "SIGN IN" or "SIGN UP".
  - **"OR"** divider: 11px / 700 / `--ink-mute`, centered.
  - **Social row**: 3 circular buttons (54×54, radius 50%, shadow `0 4px 12px -4px var(--shadow-ink)`), centered with 16px gap:
    - Facebook (`#1877F2` bg, white f-icon)
    - Google (white bg with `--line` border, multicolor G logo)
    - Apple (`--ink` bg, paper-colored Apple logo)
  - **Terms footer**: 11px / `--ink-mute`, "By [signing up/continuing] you agree to our **terms** & **privacy**."

**State**: `mode` (signin / signup), per-mode field values, `busy` flag for the 800ms simulated auth delay.

**Validation**: username length ≥ 2, password length ≥ 6, confirm matches (sign-up).

**Behavior**: any of the four auth methods (Facebook / Google / Apple / submit-with-valid-form) triggers the same dummy 800ms loading state, then advances to the friend picker. In production, replace with the real OAuth callback handlers and email/password POST to FastAPI.

### 2. Friend picker — `PickerStep` (in `screens-a.jsx`)

**Purpose**: After successful auth, the user identifies which of the 19 cabin members they are. (In production, this could be skipped if the auth provider's email matches a pre-registered member.)

**Layout**:
- Top bar: 62px top padding (clears iOS status bar), back button, no title.
- **Headline**: "Who's logging in?" — 26px / 700.
- **Body**: "Pick yourself from the cabin. We'll remember next time." — 13px / `--ink-mute`.
- **Grid**: 4-column, 10px gap. Each cell = 46px avatar + 11px name. Selected cell has `--card` background, 1px `--accent` border, ring on avatar.
- **Footer CTA**: "Enter as [Name]" — full-width yellow pill (matches sign-in button), disabled when nothing picked.

**Behavior**: selection calls `onLogin(friendId)`. Persist to `localStorage` under key `hd.user`. On app boot, if the key matches a friend, skip auth entirely.

### 3. Home — `HomeScreen` (in `screens-a.jsx`)

**Purpose**: Daily landing — streak, who's studying now, today's poll, timeline feed.

**Layout** (scrollable, bottom-tab visible):
- **Nav bar**: leading "Day 14 streak" eyebrow with leaf icon (`--sage`), trailing bell with badge count. Title "Hi, [Name]." (38px / 700, italic-feel via Plus Jakarta), subtitle = today's date formatted "Monday, May 21".
- **Studying-now card** (card with washi tape decoration at top-left):
  - "studying now" label in display weight + "5 people · pomodoro in progress" subline.
  - "Join" button (dark pill, play icon + "Join").
  - Avatar row with 5 friends, each showing `--sage` status dot + minutes-left below.
- **Today's poll preview** (card, `--paper-soft` background):
  - "Live poll · closes today" tag pill (`--tint-terra` bg, `--terra` fg).
  - Vote count, large italic question, top 2 options with horizontal `--tint-sage` bars.
- **"Timeline" section head** with "All posts" action link.
- **Post cards** (one per post):
  - Avatar + name + role · time, optional tag pill on the right.
  - Big italic title (22px, line-height 1.15).
  - Body (14px / 1.5, `--ink-soft`).
  - Reaction row: each emoji+count chip is a button (clickable, increments count). Reply count on the right with reply icon.

**State**: posts array (5 seeded), reaction increments local-only.

### 4. Group Chat — `ChatScreen` (in `screens-a.jsx`)

**Purpose**: Real-time group chat for all 19 members.

**Layout**:
- **Custom header** (62px top padding): back button, room name "The Study Cabin" (20px display), subtitle "19 members · 5 studying", avatar stack on the right.
- **Message area** (scrollable, auto-scrolls to bottom on new messages):
  - "Today · [date]" centered marker at top.
  - Bubbles:
    - **Mine**: right-aligned, `--ink` background, `--paper-soft` text, 18px/18px/4px/18px radius (right tail), max 78% width.
    - **Theirs**: left-aligned with 28px avatar slot. Avatar shown only on first message in a streak from same author. Author name above bubble in author's color (12px / 600). Bubble: `--card` bg, `--card-edge` border, 4px/18px/18px/18px radius (left tail).
    - Time below each bubble in 10px `--ink-mute`. Reaction chips under "their" bubbles.
  - Typing indicator: bouncing 3-dot animation, "[user] is typing".
- **Composer** (sticky bottom, above home indicator):
  - Pill-shaped card with text input + photo icon.
  - Send button (42×42 circle), `--accent` when input has text, `--paper-soft` otherwise.

**State**: messages array. On send, append user message and (for prototype) a randomized fake reply 1.1s later. In production, wire to WebSocket `/ws/{room_id}`.

### 5. Study hub — `StudyScreen` (in `screens-b.jsx`)

**Purpose**: Index of study features.

**Layout**:
- Nav bar with search icon.
- **AI Buddy CTA** (top): full-width gradient button (`linear-gradient(135deg, --accent, --accent-soft)`), 18px padding, radius 18. Includes white-on-blue ✦ icon block, "Study buddy" title, "Generate flashcards or ask anything · powered by AI" subline, chevron.
- **Tile grid** (2 columns, 12px gap, each ~110px tall): Notes, Polls, Tasks (Kanban), Album. Each tile has a colored 38×38 icon block, label, count.
- **Flashcard decks section** (Section head + "New deck" action). Each deck card:
  - Stacked-card illustration on left (3 layers of the deck's accent color).
  - Title (19px display), subtitle (12px), owner avatar + name (11px).
  - Right chevron.

### 6. Flashcards player — `FlashcardScreen` (in `screens-b.jsx`)

**Purpose**: Drill a flashcard deck.

**Layout**:
- Header: back, deck title (18px display) + "[idx+1] of [total]", more icon.
- **Progress bar** (4px, `--line-soft` bg, fills with deck color).
- **Card area** (centered, aspect-ratio 3/4):
  - 3D flip via CSS class (`.flip-scene` parent has `perspective: 1400px`; `.flip-card` toggles `is-flipped` class; faces use `backface-visibility: hidden`).
  - Front face: `--card` bg, "question" eyebrow, big italic question text.
  - Back face: deck color bg, white text, "answer" eyebrow, italic answer text.
  - "by [owner]" footer in 11px / 50% opacity.
- **Tap card** to flip. Caption below: "Tap to flip back" / "Tap card to reveal".
- **Bottom actions**:
  - When not on last card OR after flipping last: **"Again"** (paper-soft pill) + **"Got it"** (sage pill, primary).
  - On last card after flip: **"Done · X/Y known"** full-width yellow pill that resets the deck.

**State**: `idx`, `flipped`, `knownCount`.

### 7. AI Study Buddy — `AIBuddyScreen` (in `screens-c.jsx`)

**Purpose**: Either generate flashcards from a topic, or chat with a tutor. Powered by Claude API (use Claude Haiku or Sonnet; prompt details below).

**Two modes** toggled via a segmented pill in the trailing nav slot ("Make" / "Ask"):

#### Make mode (default) — `BuddyGenerator`
- **Topic card** (`.j-card`, 18px padding):
  - "TOPIC OR CONTEXT" eyebrow, 3-row textarea, default value "Python list comprehensions".
  - Divider, then row: "Cards" label + numeric stepper (3–10, default 5) + "Generate" CTA (blue pill with ✨ icon).
  - When generating: button shows spinner + "Thinking…".
- **Quick starts list** (visible when no cards yet): 5 buttons with ✦ icon, blue background tint, suggesting topics.
- **Generated cards** (after API returns):
  - "Save as deck" action in section head — promotes generated cards into a custom deck.
  - Each card displayed as a tappable `MiniFlash` — flips between question and answer in place. "Card N · Question/Answer" eyebrow + body text.
- **Error state**: red-on-blue-tint card with "Couldn't generate cards — try again or rephrase".

**Prompt** sent to Claude (matches `BuddyGenerator.generate`):
```
Generate {count} concise flashcards for studying: "{topic}".
Return ONLY a JSON array, no prose, no markdown fences. Each item:
{"q": "question (one short sentence)", "a": "answer (1-2 sentences, plain text)"}.
Make the questions varied — definitions, applications, common pitfalls, comparisons.
```
Parse with a regex that strips anything before the first `[`/`{` and after the last `]`/`}` to tolerate stray prose.

#### Ask mode — `BuddyTutor`
- Chat thread with assistant + user bubbles. Assistant has a gradient ✦ avatar (28px circle, `linear-gradient(135deg, --accent, --accent-soft)`).
- Composer pill + send button, same as group chat.
- System context prepended to first user message:
  > You are a friendly, concise study tutor for a Filipino friend group preparing for coding interviews and the Philippine Civil Service Exam. Be encouraging, use plain examples, and keep replies under 6 sentences unless code requires more. The student's name is [name].
- Typing dots while waiting.

### 8. Kanban — `KanbanScreen` (in `screens-c.jsx`)

**Purpose**: Project board for building the app itself (sprint 3).

**Layout**:
- Nav bar with "+" trailing.
- **Filter chips**: "All · N" / "Mine · N" (pill toggles, `--ink` bg when on).
- **Columns** (horizontal scroll, scroll-snap-aligned): three cards 84%-width each (max 320px):
  - **To do** (`--ink-mute` dot)
  - **In progress** (`--accent` dot)
  - **Shipped** (`--sage` dot)
  - Each column header: dot + uppercase label + count chip + "+" add button.
  - **Task card**: 3px colored left border (priority: red=high, ochre=med, mute=low). Title, tag pill, assignee avatar. "Mine" indicator = blue dot top-right. Bottom: "← back" / "move →" buttons (no buttons on terminal columns).

**State**: `tasks` (object with todo / doing / done arrays). `move(id, from, to)` rearranges. `filter` = `all` or `mine`.

### 9. Pomodoro / Timer — `PomodoroScreen` (in `screens-b.jsx`)

**Purpose**: 25-minute focus timer with co-study rooms.

**Layout**:
- Nav bar with "Day 14" fire-icon eyebrow + settings trailing. Title "Focus", subtitle "25-minute deep work" or "5-minute break".
- **Topic input card** (pill, with book icon + text input).
- **Timer dial** (280×280):
  - SVG ring: 120px radius, 14px stroke, base track `--line-soft`, progress `--accent` with rounded line cap.
  - Center: 72px display number `MM:SS` (tabular nums, letter-spacing -0.02), italic "focusing"/"taking a break" label in `--accent`, "X% complete" caption.
- **Controls**: reset (small circle), play/pause (80px ink circle, primary), phase toggle (small leaf circle).
- **Co-study Rooms strip** — `RoomsStrip` from `screens-c.jsx`:
  - Section head with "+ New room" action.
  - Horizontal scroll-snap row of 3 room cards. Each card: 3px top border in room accent color, room name (15px / 700), host line, topic (12px / `--ink-soft`), avatar stack + "● X min left" + Join/Leave button (ink pill / paper-soft pill).
- **"Also studying right now" list** of 5 friends with avatar + status dot + topic + remaining minutes.

**State**: `remaining` (seconds), `running`, `topic`, `phase` (focus / break), `joinedRoom` (room id or null). Joining a room sets remaining = room's minLeft × 60, starts the timer, updates topic, and locks the timer to that room.

### 10. Polls — `PollsScreen` (in `screens-a.jsx`)

**Purpose**: Group polls with live voting.

**Layout**:
- Nav bar with "+" trailing.
- Each poll card:
  - Author avatar + "asked · time" + status pill (terra for "closes today", default for "Closed").
  - Italic question (22px display).
  - Options: full-width pills, each with a colored bar showing percent. Selected option = 1.5px `--accent` border + circle check icon. Vote count avatar stack + percent on right.
  - Footer: total votes + "See discussion →" action.

**Behavior**: Tapping an option toggles your vote (one option max per poll); closed polls are read-only.

### 11. Notes — `NotesScreen` + `NoteDetail` (in `screens-b.jsx`)

**Purpose**: Shared markdown notes.

**List view**:
- Nav bar with "+" trailing.
- Note cards: pin icon (if pinned), italic title (20px display), 2-line preview from body, author avatar + name + "Edited Xh ago".

**Detail view**:
- Nav bar with edit + more icons.
- Author row.
- Big display title.
- **Ruled-paper card** rendering markdown:
  - `## ` → 20px italic display heading.
  - `- [ ]` / `- [x]` → checkbox / filled checkbox with strikethrough.
  - `- ` → bullet with `--accent` dot.
  - `1.` / `2.` → numbered list with `--accent` numerals.
  - Plain lines → body 14px / 1.55.
- Background uses repeating linear-gradient for ruled lines (`background-size: 100% 1.55em`).

### 12. Album — `AlbumScreen` (in `screens-b.jsx`)

**Purpose**: Shared photo collection from study sessions.

**Layout**:
- Nav bar with "+" trailing.
- **Hero photo**: full-width 4:3, gradient placeholder using poster's tone colors, washi tape decoration, white gradient overlay at bottom with handwritten label.
- **Mosaic grid**: 3-column, 6px gap, square tiles. Each is a gradient placeholder with dot-pattern overlay and small label at bottom-left.

In production: replace gradient placeholders with `<img>` tags pointing at Cloudinary URLs. Maintain aspect-ratio.

### 13. Profile — `ProfileScreen` (in `screens-b.jsx`)

**Purpose**: User identity, stats, character, settings, member list.

**Layout**:
- **Curved cover** (280px tall, same blue gradient as login). Decorative blobs (160px / 120px). Top bar: yellow back chip, "PROFILE" centered (16/800/letter-spacing 1, white), settings icon trailing in translucent white square. Character mascot (180px) centered overlapping bottom. **Yellow "CUSTOMIZE" chip** in bottom-right with edit icon — entry point for future character editor.
- **Name + role** (28px / 800) + Edit ghost button.
- **3-up Stats grid**: streak / pomodoros / decks. Each stat = colored 10px-uppercase label + 28px display value + tiny unit.
- **Quick access list** (`SettingRow` components): Shared album / My notes / Notifications / Dark mode (or Light mode if dark).
- **The cabin · 19 members**: card with 6-column grid of avatars + names.
- **Group settings**: Cabin settings / Privacy / Sign out (danger).

### 14. Bottom tabs (persistent across main tabs 3–13)

5 tabs: **Home / Chat / Study / Timer / You.**
- Floating glass card 8px from screen bottom.
- Each tab: icon (19px, weight 2 active / 1.6 inactive) inside a 36×26 rounded rectangle that gets `--paper-soft` bg when active. 10px label below.
- Active = `--ink`, inactive = `--ink-mute`.
- Hide on Flashcards player and AI Buddy screens.

---

## Interactions & Behavior

### Auth
- All four auth methods (FB, Google, Apple, email) currently simulate an 800ms request. In production:
  - Real OAuth flows for FB/Google/Apple — redirect to provider, handle callback, POST to FastAPI `/auth/oauth/[provider]/callback`.
  - Email: POST `/auth/signup` or `/auth/login` with username + password.
  - On success: receive JWT, store in HTTP-only cookie or localStorage, then redirect to home.
- Validation client-side: username ≥ 2 chars, password ≥ 6, confirm matches on sign-up.

### Session
- `localStorage.hd.user` = friend id. On app boot, if present, skip auth and pick up where the user left off.
- Sign out clears `hd.user` and routes to login.

### Chat
- WebSocket connection on chat-screen mount: `ws://.../ws/study-cabin` (one shared room for the 19 of us — no per-pair DMs in v1).
- Messages are JSON `{id, author, text, time, reactions?}`. Persist to Postgres on every send.
- Typing indicator: emit `{type: "typing"}` on input change (debounced 1s). Display for 3s after last received.
- Auto-scroll to bottom on new message.

### Polls
- One vote per user per poll, replaces previous vote in same poll. Backend POST `/polls/{id}/vote` with `option_id`.
- "Closed" polls reject votes. Auto-close at `closes_at` timestamp.

### Pomodoro
- Local 1s interval ticks. On hitting 0, transition phase, send notification (browser Notification API or push).
- Joining a room: POST `/rooms/{id}/join`. Server tracks active members. Broadcast member changes via WebSocket so other clients see who's in.

### Flashcards
- "Got it" increments local known count. Optionally persist per-user per-card recall stats for spaced repetition later.
- "Save as deck" (from AI generator): POST `/decks` with `{title, cards: [{q, a}]}`.

### Kanban
- "Move" buttons update task status. POST `/tasks/{id}` with new column. Broadcast via WebSocket so other viewers see the move in real time.

### AI Buddy
- Generate: POST `/ai/generate-flashcards` with `{topic, count}`. Backend forwards to Claude API with the prompt. Returns parsed JSON or 422 with error.
- Tutor chat: POST `/ai/tutor` with conversation history + user message. Backend forwards to Claude API, streams response back (use SSE or WebSocket for streaming).
- Rate limit: 20 generate-calls per user per day, 50 tutor messages per day (configurable). Show usage banner if approaching limit.

### Animations
- Lists fade-up entrance staggered by index × 40ms.
- Cards transition shadow on hover (desktop).
- Buttons scale to 0.97 on `:active`.
- Theme toggle should NOT animate the recolor — instant swap is fine.

### Responsive
- Mobile-first. Design width 402px.
- Tablet: same content, max-width 500–600px, centered.
- Desktop: consider a 2-column shell — keep the phone-width content on the left, show a sidebar with quick-access widgets (today's poll, who's studying, recent posts) on the right. Or scale the phone to a slightly wider 480px max width with comfortable margins.
- Bottom tab bar should remain at the bottom on mobile; on desktop, optionally convert to a left vertical sidebar.

---

## State Management

For React app:
- `user` (current friend) — global.
- `theme` (light/dark) + tweak prefs — global, persisted to localStorage.
- `tab` (active bottom tab) + `route` (sub-route into polls/notes/album/deck/ai/kanban) — global. Replace this prototype's local state with React Router (`/home`, `/chat`, `/study`, etc.) once wired up.

For Alpine.js app:
- Use Alpine stores for `user`, `theme`, `messages`.
- Each page is a standalone HTML doc; cross-page state via localStorage + an Alpine `init()` to rehydrate.

Backend state lives in Postgres tables (suggested):
- `users (id, name, email, avatar_color, joined_at, oauth_provider)`
- `posts (id, author_id, title, body, tag, created_at)`
- `reactions (post_id, user_id, emoji)`
- `messages (id, room_id, author_id, text, created_at)`
- `polls (id, author_id, question, closes_at)` + `poll_options (id, poll_id, label)` + `poll_votes (poll_id, option_id, user_id)`
- `decks (id, owner_id, title, subtitle, color)` + `cards (id, deck_id, q, a, position)`
- `notes (id, author_id, title, body_md, pinned, edited_at)`
- `albums (id, photo_url, label, posted_by, created_at)`
- `pomodoro_sessions (id, user_id, topic, started_at, completed_at, room_id?)`
- `rooms (id, name, topic, host_id, started_at, ends_at)` + `room_members (room_id, user_id)`
- `tasks (id, title, tag, assignee_id, priority, status)`

---

## Assets

### Character mascot

Currently a placeholder SVG in `prototype/character.jsx` (`Character` component). Built from primitive shapes: beanie with pompom, skin face, glasses, hoodie/backpack straps, hands holding a book.

**Swap instructions** for the team's artist:
1. Export character art as **SVG** (preferred) or **PNG with transparency at 2× resolution** (e.g. 360×400 for 180px render).
2. Replace the body of the `Character` component:
   - SVG path approach: replace the `<svg>...</svg>` JSX with the new SVG, keeping the `width={size} height={size}` props.
   - Image approach: replace with `<img src="/character.svg" width={size} height={size} alt="..." />`.
3. Keep the prop signature `({ size, accent, variant, mood })` so consumers don't break.
4. Profile uses `accent={user.color}` to tint the character to the user's avatar color — keep at least one fill on the new character bound to this prop so per-user variation works.

### Icons

All UI icons are SVG, defined in `prototype/ui.jsx` (`Icon` component). 24×24 viewbox, 1.7 stroke. List: `home, chat, book, timer, user, plus, send, search, back, more, heart, reply, poll, photo, note, play, pause, reset, settings, check, x, sun, moon, lock, leaf, fire, bell, edit, pin`. Re-export in your codebase or replace with **Lucide** (one-to-one swap, identical visual style).

### OAuth provider logos

`SocialCircle` in `character.jsx` ships inline SVGs for Facebook, Google (multicolor), Apple. Keep these or load from a vetted icon library — but the colors must remain exact (`#1877F2`, Google's official multicolor, Apple's monochrome).

### Avatars

For v1: SVG-rendered initials with deterministic color from the 19-color palette. For v2: support uploaded photos via Cloudinary, fall back to initials. Store `avatar_url` (nullable) on the user.

### Photos for the Album

The prototype uses gradient placeholders with labels. Production: real uploads via Cloudinary, with `label`, `poster_id`, and `created_at`. Show in a 3-column responsive grid with one hero card at the top.

### Fonts

Load from Google Fonts:
```
Plus Jakarta Sans:wght@400;500;600;700;800
Instrument Serif:ital@0;1                 (optional theme)
JetBrains Mono:wght@400;500                (optional theme)
Caveat:wght@500;600                        (legacy handwritten accent)
```

---

## Files in this bundle

Everything is in `prototype/`:

- `Hanggangdrawing.html` — entry point; open in a browser to interact with the live design.
- `tokens.css` — design tokens (colors, fonts, spacing, shadows). Reuse 1:1 as CSS variables.
- `data.jsx` — seed data (friends, posts, messages, polls, decks, notes, album, studying-now).
- `ui.jsx` — shared UI primitives: `Icon`, `Avatar`, `AvatarStack`, `IconButton`, `AppNavBar`, `BottomTabs`, `Sheet`, `SectionHead`, `Tag`.
- `character.jsx` — `Character` mascot, `SpeechBubble`, `SocialCircle` (FB/Google/Apple).
- `screens-a.jsx` — `Login` (auth + picker), `HomeScreen`, `ChatScreen`, `PollsScreen`.
- `screens-b.jsx` — `StudyScreen`, `FlashcardScreen`, `PomodoroScreen`, `NotesScreen`, `AlbumScreen`, `ProfileScreen`.
- `screens-c.jsx` — `AIBuddyScreen`, `KanbanScreen`, `RoomsStrip`.
- `app.jsx` — root shell, navigation, theming, `PhoneStage` wrapper (mobile frame for the prototype only — don't ship this).
- `ios-frame.jsx` / `tweaks-panel.jsx` — prototype tooling only, not for production.

To run the prototype locally:
```bash
cd prototype/
python3 -m http.server 8000
# open http://localhost:8000/Hanggangdrawing.html
```

---

## Out of scope for v1 (suggested for v2)

These were discussed but not built into the prototype — still good roadmap:
- Real avatar upload + crop (Cloudinary).
- Character customization editor (hat/glasses/color presets).
- Streak heatmap on profile.
- Whiteboard / Excalidraw-style canvas.
- Voice huddle (WebRTC).
- Search across notes + chat.
- Weekly digest auto-summary.
- Push notifications.
- Language toggle (English ↔ Tagalog for civil-service drills).

---

## Implementation order suggested by the team's original spec

1. **Auth** (sign in / sign up / picker) — foundation for everything.
2. **Posts feed** — basic CRUD, gets you comfortable with FastAPI + your frontend.
3. **Group chat** — WebSockets, the fun part.
4. **Polls** — simple and satisfying.
5. **Flashcards & decks** — study features.
6. **AI Study Buddy** — plug Claude API in once the deck/card persistence exists.
7. **Pomodoro + co-study rooms**.
8. **Notes** — markdown editor + storage.
9. **Album** — Cloudinary upload.
10. **Kanban** — for the project itself (also doubles as your GitHub workflow lesson).
11. **Profile + character customization**.

Use feature branches (`feature/auth`, `feature/chat`, etc.), open PRs, review each other's code. The project board IS the lesson.
