from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Hanggangdrawing API",
    description="Backend for the friend group study app",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev
        # Add the production frontend origin here once deployed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount routers here as they are created, e.g.:
# from backend.routes.auth import router as auth_router
# app.include_router(auth_router)


@app.get("/", tags=["health"])
def root():
    return {"status": "ok"}
