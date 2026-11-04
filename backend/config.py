"""
Central configuration — reads from .env via python-dotenv.
Import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES from here in routes that need auth.
"""
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()


def default_database_url() -> str:
    """Absolute path so `alembic` and `uvicorn` hit backend/dev.db from any directory."""
    return f"sqlite:///{(Path(__file__).resolve().parent / 'dev.db').as_posix()}"


DATABASE_URL: str = os.getenv("DATABASE_URL", default_database_url())
JWT_SECRET: str = os.getenv("JWT_SECRET", "change-me-to-a-long-random-string")
JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "10080"))

# Comma-separated browser origins. `https://localhost` is the Capacitor APK WebView.
CORS_ORIGINS: list[str] = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "http://localhost:5173,https://localhost").split(",")
    if origin.strip()
]
