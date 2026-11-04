import json
import unittest
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.database import Base
from backend.models.question import Question
from backend.routes.study import list_questions


class StudyQuestionsTest(unittest.TestCase):
    def setUp(self):
        engine = create_engine("sqlite://")
        Base.metadata.create_all(engine)
        self.db = sessionmaker(bind=engine)()
        self.db.add_all([
            Question(id="numerical-01", category="numerical", prompt="1 + 1?",
                     choices=["1", "2", "3", "4"], answer_index=1, explanation="1 + 1 = 2."),
            Question(id="numerical-02", category="numerical", prompt="2 + 2?",
                     choices=["1", "2", "3", "4"], answer_index=3, explanation="2 + 2 = 4."),
            Question(id="verbal-01", category="verbal", prompt="Pick a synonym.",
                     choices=["a", "b", "c", "d"], answer_index=0, explanation="a"),
        ])
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_returns_only_requested_category(self):
        rows = list_questions("numerical", 10, self.db)
        self.assertEqual({q.category for q in rows}, {"numerical"})

    def test_respects_limit(self):
        rows = list_questions("numerical", 1, self.db)
        self.assertEqual(len(rows), 1)

    def test_unknown_category_returns_empty(self):
        self.assertEqual(list_questions("nope", 10, self.db), [])


class QuestionBankFileTest(unittest.TestCase):
    def test_bank_is_valid(self):
        path = Path(__file__).parent.parent / "scripts" / "questions.json"
        data = json.loads(path.read_text(encoding="utf-8"))

        categories = {"numerical", "analytical", "verbal", "clerical", "general"}
        self.assertEqual(len(data), 50)
        self.assertEqual(len({q["id"] for q in data}), len(data))
        for q in data:
            with self.subTest(q["id"]):
                self.assertIn(q["category"], categories)
                self.assertEqual(len(q["choices"]), 4)
                self.assertTrue(0 <= q["answer_index"] < 4)
                self.assertTrue(q["explanation"])


if __name__ == "__main__":
    unittest.main()
