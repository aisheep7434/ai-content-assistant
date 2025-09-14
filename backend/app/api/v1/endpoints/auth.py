from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import AsyncSessionLocal
from app.db import models
from app.schemas.user import UserCreate, UserOut
from app.core.security import hash_password, verify_password, create_access_token
from sqlalchemy.future import select

router = APIRouter()

# 依赖项：获取数据库会话
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session

# 装饰器 (@router...) 必须单独占一行
@router.post("/register", response_model=UserOut)
# 函数定义 (async def...) 必须在新的一行
async def register_user(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    # 检查用户是否已存在 (函数体内的代码必须正确缩进)
    result = await db.execute(select(models.User).where(models.User.username == user_in.username))
    db_user = result.scalars().first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")

    hashed_pass = hash_password(user_in.password)
    new_user = models.User(username=user_in.username, hashed_password=hashed_pass)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user


# 装饰器 (@router...) 必须单独占一行
@router.post("/token")
# 函数定义 (async def...) 必须在新的一行
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).where(models.User.username == form_data.username))
    user = result.scalars().first()

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_data = {"sub": user.username, "user_id": user.id}
    access_token = create_access_token(data=access_token_data)
    return {"access_token": access_token, "token_type": "bearer"}