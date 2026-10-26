from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from backend.config import JWT_ALGORITHM, JWT_EXPIRE_MINUTES, JWT_SECRET
from backend.database import get_db
from backend.models.user import User
from backend.schemas.user import LoginRequest, UserCreate

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- Helper Functions ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


# --- Routes ---
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    db.add(
        User(
            id=user.username,
            username=user.username,
            email=user.email,
            password_hash=pwd_context.hash(user.password),
            display_name=user.username,
            role="Member",
            color="#C9924A",
        )
    )
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="User already exists")
    return {"message": "User registered successfully"}


@router.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()

    if not user or not pwd_context.verify(request.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}
