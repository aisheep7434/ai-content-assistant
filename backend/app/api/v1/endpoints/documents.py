from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc # 用于排序
import typing as t

from app.api.deps import get_db, get_current_user
from app.db import models
from app.schemas.document import DocumentOut # 你需要创建这个 Schema

router = APIRouter()

# 这是一个新的 GET 路由，用于获取当前用户的所有文档
@router.get("/", response_model=t.List[DocumentOut])
async def get_user_documents(
    db: AsyncSession = Depends(get_db), 
    current_user: models.User = Depends(get_current_user) # 同样受保护
):
    """
    获取当前登录用户的所有文档历史记录 (按时间倒序)。
    """
    query = (
        select(models.Document)
        .where(models.Document.owner_id == current_user.id)
        .order_by(desc(models.Document.created_at))
    )
    result = await db.execute(query)
    documents = result.scalars().all()
    return documents