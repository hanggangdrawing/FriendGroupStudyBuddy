import unittest

from backend.models.user import User
from backend.schemas.user import UserPublic


class UserPublicTest(unittest.TestCase):
    def test_matches_friends_item_shape(self):
        user = User(
            id="jho",
            username="jho",
            email="jho@example.com",
            password_hash="x",
            display_name="Jho",
            role="Frontend / UI",
            color="#C9924A",
        )
        self.assertEqual(
            UserPublic.model_validate(user).model_dump(),
            {"id": "jho", "name": "Jho", "role": "Frontend / UI", "color": "#C9924A"},
        )


if __name__ == "__main__":
    unittest.main()
