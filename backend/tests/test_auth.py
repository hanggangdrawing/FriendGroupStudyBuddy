import unittest

from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.database import Base
from backend.models.user import User  # noqa: F401 - registers the table on Base.metadata
from backend.routes.auth import login, register
from backend.schemas.user import LoginRequest, UserCreate
from backend.security import get_current_user


class AuthTest(unittest.TestCase):
    def setUp(self):
        engine = create_engine("sqlite://")
        Base.metadata.create_all(engine)
        self.db = sessionmaker(bind=engine)()

    def tearDown(self):
        self.db.close()

    def test_register_then_login(self):
        register(UserCreate(username="jho", email="jho@example.com", password="secret123"), self.db)

        result = login(LoginRequest(email="jho@example.com", password="secret123"), self.db)

        self.assertIn("access_token", result)

    def test_register_returns_user_id(self):
        result = register(UserCreate(username="jho", email="jho@example.com", password="secret123"), self.db)

        self.assertEqual(result["user_id"], "jho")

    def test_duplicate_register_rejected(self):
        user = UserCreate(username="jho", email="jho@example.com", password="secret123")
        register(user, self.db)

        with self.assertRaises(HTTPException) as raised:
            register(user, self.db)

        self.assertEqual(raised.exception.status_code, 400)

    def test_current_user_resolves_from_token(self):
        register(UserCreate(username="jho", email="jho@example.com", password="secret123"), self.db)
        token = login(LoginRequest(email="jho@example.com", password="secret123"), self.db)["access_token"]

        user = get_current_user(HTTPAuthorizationCredentials(scheme="Bearer", credentials=token), self.db)

        self.assertEqual(user.id, "jho")

    def test_current_user_rejects_bad_token(self):
        with self.assertRaises(HTTPException) as raised:
            get_current_user(HTTPAuthorizationCredentials(scheme="Bearer", credentials="not-a-jwt"), self.db)

        self.assertEqual(raised.exception.status_code, 401)


if __name__ == "__main__":
    unittest.main()
