from sqlalchemy import Column, DateTime, String, func

from backend.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)  # e.g. "jho"
    username = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    display_name = Column(String, nullable=False)  # e.g. "Jho"
    role = Column(String, nullable=False)  # e.g. "Frontend / UI"
    color = Column(String, nullable=False)  # e.g. "#C9924A"
    created_at = Column(DateTime, server_default=func.now())
