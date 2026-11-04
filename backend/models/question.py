from sqlalchemy import Column, Integer, JSON, String

from backend.database import Base


class Question(Base):
    __tablename__ = "questions"

    id = Column(String, primary_key=True)  # e.g. "numerical-01"
    category = Column(String, nullable=False, index=True)  # matches CSE_CATEGORIES ids
    prompt = Column(String, nullable=False)
    choices = Column(JSON, nullable=False)  # list[str]
    answer_index = Column(Integer, nullable=False)
    explanation = Column(String, nullable=False, default="")
