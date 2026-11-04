import unittest
from pathlib import Path

from backend.config import default_database_url


class ConfigTest(unittest.TestCase):
    def test_default_database_url_is_absolute(self):
        url = default_database_url()
        path = Path(url.removeprefix("sqlite:///"))

        self.assertTrue(url.startswith("sqlite:///"))
        self.assertTrue(path.is_absolute())
        self.assertEqual(path.name, "dev.db")
        self.assertEqual(path.parent.name, "backend")


if __name__ == "__main__":
    unittest.main()
