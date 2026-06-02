"""
Central configuration — reads from .env via python-dotenv.
Import JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRE_MINUTES from here in routes that need auth.
"""
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./dev.db")
JWT_SECRET: str = os.getenv("JWT_SECRET", "change-me-to-a-long-random-string")
JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "10080"))
