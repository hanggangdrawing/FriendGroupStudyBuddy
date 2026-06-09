from pydantic_settings import BaseSettings
from fastapi.security import OAuth2PasswordBearer

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    # Define it here once
    oauth2_scheme: OAuth2PasswordBearer = OAuth2PasswordBearer(tokenUrl="/auth/login")

    class Config:
        env_file = ".env"

settings = Settings()