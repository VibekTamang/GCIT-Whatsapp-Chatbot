from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import get_db
from app.core.security import verify_password, create_access_token, create_refresh_token
from app.schemas.token import Token
from app.schemas.user import UserResponse
from app.api.dependencies import get_current_user
import jwt
from jwt import PyJWTError
from app.core.config import settings

router = APIRouter()

@router.post("/login", response_model=Token)
async def login(
    response: Response,
    db = Depends(get_db), 
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, getting an access token and setting a refresh token in HTTP-only cookie.
    """
    # Find user
    user = await db.users.find_one({"email": form_data.username})
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create tokens
    access_token = create_access_token(subject=str(user["_id"]))
    refresh_token = create_refresh_token(subject=str(user["_id"]))
    
    # Set HTTP-only cookie for refresh token
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        max_age=settings.REFRESH_TOKEN_EXPIRE_MINUTES * 60,
        samesite="lax",
        secure=False  # Set to True in Production with HTTPS
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh", response_model=Token)
async def refresh_token(request: Request, response: Response, db = Depends(get_db)):
    """
    Refresh access token using the HTTP-only refresh_token cookie.
    """
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token missing")
        
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
            
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
            
        # Verify user still exists
        from bson.objectid import ObjectId
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
             raise HTTPException(status_code=401, detail="User not found")
             
        # Create new access token
        new_access_token = create_access_token(subject=str(user_id))
        return {"access_token": new_access_token, "token_type": "bearer"}
        
    except PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired refresh token")

@router.post("/logout")
async def logout(response: Response):
    """
    Logout by clearing the refresh_token cookie.
    """
    response.delete_cookie("refresh_token")
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UserResponse = Depends(get_current_user)):
    """
    Get current logged in user details.
    """
    return current_user
