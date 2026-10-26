"""
Database setup — Ticket #2.

Exports:
  engine       — SQLAlchemy engine (SQLite in dev, PostgreSQL in prod)
  SessionLocal — sessionmaker factory
  Base         — declarative base for all ORM models
  get_db()     — FastAPI dependency that yields a DB session and closes it after the request
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from backend.config import DATABASE_URL

# Use check_same_thread=False only for SQLite (required for FastAPI's threading model)
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """
    FastAPI dependency — yields a DB session per request and guarantees close.

    Usage in a route:
        from backend.database import get_db
        from sqlalchemy.orm import Session
        from fastapi import Depends

        @router.get("/example")
        def example(db: Session = Depends(get_db)):
            ...
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
