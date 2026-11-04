"""Seed the CSE question bank. Idempotent: safe to run on every deploy."""
import json
from pathlib import Path

from backend.database import SessionLocal
from backend.models.question import Question


def seed() -> int:
    data = json.loads(Path(__file__).with_name("questions.json").read_text(encoding="utf-8"))
    with SessionLocal() as db:
        for item in data:
            db.merge(Question(**item))
        db.commit()
    return len(data)


if __name__ == "__main__":
    print(f"seeded {seed()} questions")
