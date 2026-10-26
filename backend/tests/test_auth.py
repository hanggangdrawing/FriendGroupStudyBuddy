import unittest

from fastapi import HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.database import Base
from backend.models.user import User  # noqa: F401 - registers the table on Base.metadata
from backend.routes.auth import login, register
from backend.schemas.user import LoginRequest, UserCreate


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

    def test_duplicate_register_rejected(self):
        user = UserCreate(username="jho", email="jho@example.com", password="secret123")
        register(user, self.db)

        with self.assertRaises(HTTPException) as raised:
            register(user, self.db)

        self.assertEqual(raised.exception.status_code, 400)


if __name__ == "__main__":
    unittest.main()
