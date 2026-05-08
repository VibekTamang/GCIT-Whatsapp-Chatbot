from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
import jwt
from jwt import PyJWTError
from app.core.config import settings
from app.schemas.token import TokenPayload
from app.schemas.user import UserResponse
from app.core.database import get_db
from bson.objectid import ObjectId

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)) -> UserResponse:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        token_data = TokenPayload(**payload)
        
        # Verify this is an access token
        if token_data.type != "access":
            raise credentials_exception
            
        if token_data.sub is None:
            raise credentials_exception
    except PyJWTError:
        raise credentials_exception
        
    # Fetch user from DB
    try:
        user_doc = await db.users.find_one({"_id": ObjectId(token_data.sub)})
    except Exception:
        raise credentials_exception

    if user_doc is None:
        raise credentials_exception
        
    # Convert MongoDB _id to string for Pydantic
    user_doc["id"] = str(user_doc.pop("_id"))
    
    return UserResponse(**user_doc)

async def get_current_admin(current_user: UserResponse = Depends(get_current_user)) -> UserResponse:
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough privileges"
        )
    return current_user
