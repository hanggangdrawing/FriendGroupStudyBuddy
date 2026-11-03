Great idea for a learning project! Here's a solid tech stack recommendation that keeps **Python at the core** and is beginner-to-intermediate friendly for a friend group.

---

## 🛠️ Recommended Tech Stack

### **Backend — Python (FastAPI)**
**FastAPI** is the best choice for you because:
- Pure Python, modern, and fast
- Auto-generates API docs (Swagger UI) — great for learning
- Easy to understand for beginners vs Django
- Built-in support for async (needed for real-time chat)

```
pip install fastapi uvicorn sqlalchemy alembic python-jose passlib
```

### **Database**
- **PostgreSQL** — production-grade, free, widely used
- **SQLAlchemy** — Python ORM (no raw SQL needed)
- **Alembic** — database migrations

For local dev, you can start with **SQLite** (zero setup), then switch to PostgreSQL before deploying.

### **Real-Time Chat**
- **WebSockets** — built into FastAPI natively ✅
- No extra service needed for a small friend group

### **Frontend**
Since your goal is Python + GitHub skills, keep the frontend **simple**:
- **HTML + Tailwind CSS + Alpine.js** (lightweight, no build tools)
- OR **React** (if any of you want to learn JS too)

> Tip: Start with plain HTML/Tailwind — you can always upgrade later.

### **File/Image Storage (Shared Albums)**
- **Cloudinary** (free tier) — upload photos from Python easily
- OR store locally during dev, move to **AWS S3** later

### **Authentication**
- **JWT tokens** via `python-jose` + `passlib` for hashed passwords

---

## 📁 Suggested Project Structure

```
studygroupbuddy/
├── backend/
│   ├── main.py            # FastAPI app entry
│   ├── models/            # SQLAlchemy models
│   ├── routes/            # posts, chat, polls, flashcards...
│   ├── schemas/           # Pydantic request/response models
│   └── database.py
├── frontend/
│   ├── index.html
│   ├── static/
│   └── pages/
├── requirements.txt
├── .env
└── README.md
```

---

## 🚀 Deployment (Free Options)

| Service | What it hosts | Free tier |
|---|---|---|
| **Railway** | Backend (FastAPI) + PostgreSQL | ✅ Yes |
| **Render** | Backend + DB | ✅ Yes |
| **Vercel** | Frontend (if React) | ✅ Yes |
| **Supabase** | PostgreSQL + Auth | ✅ Yes |

**Recommended combo:** Railway (backend + DB) + Vercel (frontend)
> Railway is the easiest for Python beginners — push to GitHub and it auto-deploys. 🎉

---

## 🗺️ Feature → Python Module Mapping

| Feature | Python Tools |
|---|---|
| Posts & Timeline | FastAPI routes + SQLAlchemy |
| Shared Albums | Cloudinary Python SDK |
| Polls | FastAPI + simple DB model |
| Group Chat | FastAPI WebSockets |
| Flashcards/Quizzes | FastAPI + JSON storage |
| Pomodoro Timer | Pure frontend (JS) |
| Shared Notes | FastAPI + Markdown storage |

---

## 📌 GitHub Workflow Tips (for your org)

Since learning GitHub is also a goal:
- Use **branches** per feature (`feature/chat`, `feature/polls`)
- Use **Pull Requests** — review each other's code before merging
- Use **GitHub Projects** (kanban board) to track tasks
- Write a proper `README.md` with setup instructions
- Use **GitHub Actions** for auto-deploy to Railway on push to `main`

---

## 🧭 Suggested Build Order

1. **Auth** (register/login) — foundation for everything
2. **Posts feed** — basic CRUD, gets you comfortable with FastAPI
3. **Group Chat** — WebSockets, the fun part
4. **Polls** — simple and satisfying
5. **Flashcards/Quizzes** — study features
6. **Shared Albums** — file uploads
7. **Memories/Timeline** — pulls it all together

---

## 🚀 Run It Locally

### Backend (FastAPI + SQLite)

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:
- Windows: `.venv\Scripts\activate`
- macOS / Linux: `source .venv/bin/activate`

```bash
pip install -r requirements.txt
copy .env.example .env      # macOS / Linux: cp .env.example .env
alembic upgrade head        # creates dev.db and applies migrations
```

Start the API from the **repo root** (imports are `backend.*`):

```bash
uvicorn backend.main:app --reload
```

- Health check: http://localhost:8000/
- Swagger docs: http://localhost:8000/docs

### Tests

From the repo root:

```bash
python -m unittest discover -s backend/tests -t .
```

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — the backend already allows this origin via CORS.

Auth is wired to the API (`frontend/src/lib/api.js`). The base URL defaults to
`http://localhost:8000`; override it at build time:

```bash
VITE_API_URL=https://your-api.example.com npm run build
```

The screens themselves still render mock data from `frontend/src/data/seed.js`.
If the API is unreachable, the login screen offers **Continue offline (demo)**.

### Android demo APK

The `Android APK` GitHub Actions workflow builds `app-debug.apk` with Capacitor.
It runs on pushes to `main` or `feature/android-apk`, or on demand via **Actions → Android APK → Run workflow**.
Download the APK from the run's **Artifacts** section.

---

