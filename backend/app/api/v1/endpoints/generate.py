from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps import get_db, get_current_user
from app.db import models
from pydantic import BaseModel
# 导入你的 AI 客户端 (例如: from app.services.ai_service import get_title_from_ai)

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

@router.post("/generate/title")
async def generate_title(
    request_data: PromptRequest, 
    db: AsyncSession = Depends(get_db), 
    current_user: models.User = Depends(get_current_user) # 重点!
):
    # 1. 因为有 Depends(get_current_user)，如果 token 无效，代码根本不会执行到这里。
    # 2. 调用 AI 服务 (这里是伪代码)
    try:
        # ai_content = await openai.ChatCompletion.create(...)
        ai_content = f"这是关于 '{request_data.prompt}' 的一个很棒的标题" # (替换为真实 AI 调用)
    except Exception as e:
        raise HTTPException(status_code=500, detail="AI 服务调用失败")

    # 3. 将结果存入数据库，并关联当前登录的用户
    new_document = models.Document(
        prompt=request_data.prompt,
        content=ai_content,
        type="title",
        owner_id=current_user.id  # 关键的关联!
    )
    db.add(new_document)
    await db.commit()
    await db.refresh(new_document)

    # 4. 将生成的内容返回
    return {"id": new_document.id, "content": new_document.content}