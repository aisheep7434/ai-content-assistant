from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import AsyncSessionLocal
from app.db import models
from app.core.security import SECRET_KEY, ALGORITHM
from app.schemas.token import TokenData # (你需要创建这个 Pydantic schema，只包含 user_id: int)

# 这个 "tokenUrl" 告诉 Swagger UI 去哪里获取 token 来测试受保护的路由
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/token")

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

async def get_current_user(token: str = Depends(oauth2_scheme), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        # 1. 解码 JWT
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        # (你可能需要一个 TokenData Schema 来验证 payload 结构)
    except JWTError:
        raise credentials_exception

    # 2. 从数据库中获取用户
    user = await db.get(models.User, user_id)
    if user is None:
        raise credentials_exception
    # 3. 返回用户模型对象
    return user