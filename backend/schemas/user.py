from pydantic import AliasChoices, BaseModel, ConfigDict, EmailStr, Field


class UserPublic(BaseModel):
    """Shape consumed by frontend FRIENDS items: {id, name, role, color}."""

    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str = Field(validation_alias=AliasChoices("display_name", "name"))
    role: str
    color: str


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
