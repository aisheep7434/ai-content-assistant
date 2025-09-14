from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse # 导入流式响应
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from openai import OpenAI # 导入 OpenAI 库
import asyncio # 用于数据库异步操作

from app.api.deps import get_db, get_current_user
from app.db import models
from app.core.encryption import decrypt_data # 导入解密工具

router = APIRouter()

class PromptRequest(BaseModel):
    prompt: str

async def stream_and_save(prompt: str, user: models.User, db: AsyncSession):
    """
    核心函数：调用 DeepSeek 流式 API，yield 数据块，并在结束后异步保存到数据库
    """

    # 1. 检查并解密密钥
    if not user.encrypted_api_key:
        yield "data: [ERROR] API Key 未设置。请先在设置页面保存您的 DeepSeek 密钥。\n\n"
        return

    try:
        api_key = decrypt_data(user.encrypted_api_key)
    except Exception:
        yield "data: [ERROR] API Key 解密失败。请重新设置您的密钥。\n\n"
        return

    # 2. 动态创建 DeepSeek 客户端
    client = OpenAI(
        api_key=api_key,
        base_url="https://api.deepseek.com"
    )

    full_content = []
    try:
        # 3. (来自原版教程阶段五) 调用 AI API (stream=True)
        stream = client.chat.completions.create(
            model="deepseek-chat", # 使用 DeepSeek Chat 模型
            messages=[
                {"role": "system", "content": "你是一个有用的助手。"},
                {"role": "user", "content": prompt}
            ],
            stream=True
        )

        # 4. (来自原版教程阶段五) 迭代数据块并返回给前端
        for chunk in stream:
            content_chunk = chunk.choices[0].delta.content or ""
            if content_chunk:
                full_content.append(content_chunk)
                # 必须使用 Server-Sent Event (SSE) 格式: "data: ...\n\n"
                yield f"data: {content_chunk}\n\n"

    except Exception as e:
        yield f"data: [ERROR] DeepSeek API 调用失败: {str(e)}\n\n"
        return # AI调用失败，不保存

    # 5. (来自原版教程阶段五) 流结束！现在异步保存完整结果到数据库
    final_text = "".join(full_content)

    if final_text: # 确保我们有内容才保存
        try:
            new_doc = models.Document(
                prompt=prompt, 
                content=final_text, 
                owner_id=user.id,
                type="deepseek-gen"
            )
            db.add(new_doc)
            await db.commit()
        except Exception as db_error:
            # 注意：即使保存失败，流也已经结束了。我们只能在流中发送一个错误信号
            # 真实的生产应用会在这里添加更复杂的重试或错误日志
            print(f"数据库保存失败: {db_error}") # 在服务器上打印日志

    # 告诉客户端流已正常结束
    yield "data: [DONE]\n\n"


# 重构我们的路由，使其返回 StreamingResponse
@router.post("/title/stream")
async def generate_title_stream(
    request_data: PromptRequest,
    db: AsyncSession = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return StreamingResponse(
        stream_and_save(request_data.prompt, current_user, db), 
        media_type="text/event-stream" # 必须是这个 media type
    )