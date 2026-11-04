from pydantic import BaseModel, ConfigDict


class QuestionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    category: str
    prompt: str
    choices: list[str]
    answer_index: int
    explanation: str
