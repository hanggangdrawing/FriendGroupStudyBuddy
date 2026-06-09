from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta, timezone
from backend.database import get_db_connection
from backend.schemas import UserCreate, LoginRequest 
from backend.config import settings

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Helper Functions ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

# --- Routes ---
@router.post("/register")
def register(user: UserCreate):
    hashed_pw = pwd_context.hash(user.password)
    conn = get_db_connection()
    try:
        conn.execute(
            "INSERT INTO users (username, email, hashed_password) VALUES (?, ?, ?)",
            (user.username, user.email, hashed_pw)
        )
        conn.commit()
    except Exception:
        raise HTTPException(status_code=400, detail="User already exists")
    finally:
        conn.close()
    return {"message": "User registered successfully"}

@router.post("/login")
def login(request: LoginRequest):
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (request.email,)).fetchone()
    conn.close()

    if not user or not pwd_context.verify(request.password, user['hashed_password']):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(data={"sub": user['email']})
    return {"access_token": token, "token_type": "bearer"}