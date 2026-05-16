Love the idea! A combined **Study Group + Social App** is a great portfolio project. Since you want to learn Python and GitHub, here's what I'd suggest:

---

## 🐍 Recommended Stack

**Backend — Python (FastAPI)**
- FastAPI is modern, fast, and great for learning
- Built-in docs at `/docs` (Swagger UI) — perfect for a team
- Easy to connect to Supabase (you already know it!)
- WebSockets support for **real-time chat**

**Frontend — Next.js + TypeScript**
- You already know this from BytesDoc ✅
- Reuse what you've learned

**Database — Supabase (PostgreSQL)**
- You already have experience with it ✅
- Use Supabase Realtime for chat/notifications
- Supabase Storage for albums and file uploads

**Deployment**
- Backend → **Render** (you already know it ✅)
- Frontend → **Vercel** (you already know it ✅)
- Database → **Supabase** (free tier is enough)

---

## 📦 Python Libraries You'll Use

| Purpose | Library |
|---|---|
| Web framework | `fastapi` |
| Server | `uvicorn` |
| Database | `supabase-py` |
| Auth / JWT | `python-jose`, `passlib` |
| File uploads | `python-multipart` |
| WebSocket chat | built into FastAPI |
| Pomodoro/timers | frontend only |

---

## 🗂️ Feature Breakdown

**Social side**
- Posts with likes/comments
- Shared photo albums
- Polls
- Memories/timeline feed
- Group chat (WebSockets)

**Study side**
- Upload reviewers (PDF/DOCX)
- Flashcards
- Quizzes
- Pomodoro timer (frontend only)
- Shared notes

---

## 🤝 GitHub Workflow for Your Circle

Since the goal is also to **learn GitHub**, set these up:

1. **Branch protection** — no one pushes directly to `main`
2. **Pull Requests** — everyone reviews each other's code
3. **Issues** — assign features to each member
4. **Projects board** — Kanban board to track progress (free on GitHub)
5. **Conventional commits** — `feat:`, `fix:`, `docs:` etc.

---

## 👥 How to Split the Work

| Member | Area |
|---|---|
| 1 | Auth + Users + Groups |
| 2 | Posts + Albums + Polls |
| 3 | Chat (WebSockets) |
| 4 | Study features (flashcards, quizzes, notes) |
| Frontend lead | Next.js pages + UI |

---

Want me to **scaffold the full project structure** — FastAPI backend + Next.js frontend in a monorepo, with Supabase schema — so your group can just clone and start building?