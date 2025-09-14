from fastapi import APIRouter

# 导入你刚刚创建的 auth 路由模块
from .endpoints import auth

from .endpoints import generate 

from .endpoints import documents 

from .endpoints import user

# 创建一个给 V1 使用的主路由
api_router = APIRouter()

# "包含" auth.py 中定义的路由，并给它们统一加上 /auth 的 URL 前缀
# 这样，auth.py 中的 /register 就变成了 /api/v1/auth/register
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

api_router.include_router(generate.router, prefix="/generate", tags=["AI Generation"])

api_router.include_router(documents.router, prefix="/documents", tags=["Documents"])

api_router.include_router(user.router, prefix="/user", tags=["User"])
# --- 占位符 ---
# 当你未来创建了 generate.py (如项目阶段四所示)，你只需要在这里添加一行:
# from .endpoints import generate
# api_router.include_router(generate.router, prefix="/generate", tags=["AI Generation"])