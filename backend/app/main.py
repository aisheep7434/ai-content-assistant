from dotenv import load_dotenv
load_dotenv() # 这会自动加载位于当前工作目录 (backend/) 下的 .env 文件
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware  # 导入 CORS 中间件

# 导入我们在步骤 1 中创建的 V1 主路由
from app.api.v1.api import api_router

# 创建 FastAPI 应用实例
app = FastAPI(title="AI 助手后端 API")


# --- 配置 CORS ---
# 这是项目阶段三要求的关键步骤，我们现在就加上
# 允许来自 Next.js 开发服务器 (localhost:3000) 的跨域请求
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 你的 Next.js 前端地址
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 挂载 V1 路由 ---
# 将我们组合好的所有 V1 路由，统一挂载到 /api/v1 这个前缀下
app.include_router(api_router, prefix="/api/v1")


# (可选) 添加一个根路径用于健康检查
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "欢迎访问 AI 助手 API"}