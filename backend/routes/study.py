from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models.question import Question
from backend.schemas.study import QuestionOut

router = APIRouter()


@router.get("/questions", response_model=list[QuestionOut])
def list_questions(
    category: str,
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
):
    # shortcut: answer_index is sent to the client and scoring happens there; move
    # grading to the server if scores ever need to be trustworthy.
    return (
        db.query(Question)
        .filter(Question.category == category)
        .order_by(func.random())
        .limit(limit)
        .all()
    )
