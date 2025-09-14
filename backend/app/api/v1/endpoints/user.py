from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_user
from app.db import models
from app.schemas.user import ApiKeyUpdate, ApiKeyStatus, UserOut
from app.core.encryption import encrypt_data # 导入我们的加密工具

router = APIRouter()

@router.put("/me/api-key", response_model=UserOut)
async def update_api_key(
    key_data: ApiKeyUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """用户设置或更新他们自己的 API Key"""
    if not key_data.api_key:
        raise HTTPException(status_code=400, detail="API key 不能为空")

    # 加密密钥后再存入数据库
    current_user.encrypted_api_key = encrypt_data(key_data.api_key)
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return current_user

@router.get("/me/api-key-status", response_model=ApiKeyStatus)
async def get_api_key_status(
    current_user: models.User = Depends(get_current_user)
):
    """检查当前用户是否已经设置了 API Key"""
    return {"is_set": current_user.encrypted_api_key is not None}