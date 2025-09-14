# 🤖 AI Content Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**一个现代化的 AI 内容生成平台** | *基于 Next.js 15 + FastAPI + DeepSeek 构建*

## 📖 简介

AI Content Assistant 是一个功能强大的全栈 AI 内容生成平台，集成了最新的 Web 技术栈和 DeepSeek AI 模型，为用户提供智能、安全、高效的内容创作体验。

### ✨ 主要特性

- **🤖 AI 内容生成** - 集成 DeepSeek API，支持实时流式响应
- **🔐 完整认证系统** - JWT Token 认证，支持注册、登录和权限验证
- **💾 数据持久化** - PostgreSQL 数据库，Alembic 迁移管理
- **🔒 安全加密** - API 密钥加密存储，保护用户隐私
- **🎨 现代化 UI** - 基于 shadcn/ui 和 Tailwind CSS v4
- **⚡ 高性能** - React 19 + Next.js 15，Turbopack 构建优化

---

## 🚀 快速开始

### 环境要求

- **Node.js** 18.0+
- **Python** 3.10+
- **PostgreSQL** 15+ (或使用 Docker)
- **Git**

### 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/aisheep7434/ai-content-assistant.git
cd ai-content-assistant
```

#### 2. 后端设置

```bash
cd backend

# 安装依赖
pip install fastapi sqlalchemy alembic asyncpg python-jose passlib bcrypt python-multipart openai

# 启动数据库 (Docker)
docker-compose up -d

# 运行数据库迁移
alembic upgrade head

# 启动后端服务
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. 前端设置

```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 4. 访问应用

- **前端地址**: http://localhost:3000
- **后端 API**: http://localhost:8000
- **API 文档**: http://localhost:8000/docs

### 使用流程

1. **注册账户** - 访问前端，创建新用户
2. **配置 API 密钥** - 在设置页面添加 DeepSeek API 密钥
3. **开始生成** - 输入提示词，实时查看 AI 生成内容
4. **管理历史** - 查看和管理所有生成记录

---

## 🏗️ 技术架构

### 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    前端 (Frontend)                          │
│                Next.js 15 + React 19                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   用户界面层    │  │   状态管理层    │  │   API 请求层    ││
│  │  (Pages/Views)  │  │ (React Query)   │  │ (API Routes)    ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/HTTPS 请求
                              │ JWT Token 认证
                              │
┌─────────────────────────────────────────────────────────────┐
│                    后端 (Backend)                           │
│                 FastAPI + SQLAlchemy                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   API 路由层    │  │   业务逻辑层    │  │   数据访问层    ││
│  │  (Endpoints)    │  │  (Services)     │  │  (Models/ORM)   ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
                              │
                              │ 数据库连接
                              │
┌─────────────────────────────────────────────────────────────┐
│                    数据库层 (Database)                      │
│                     PostgreSQL 15                          │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈

#### 前端技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| **[Next.js](https://nextjs.org/)** | 15 | React 全栈框架 |
| **[React](https://react.dev/)** | 19 | 用户界面库 |
| **[TypeScript](https://www.typescriptlang.org/)** | 5+ | 类型安全 |
| **[Tailwind CSS](https://tailwindcss.com/)** | v4 | 原子化 CSS 框架 |
| **[shadcn/ui](https://ui.shadcn.com/)** | Latest | 高质量组件库 |
| **[React Query](https://tanstack.com/query/)** | 5+ | 数据状态管理 |

#### 后端技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| **[FastAPI](https://fastapi.tiangolo.com/)** | 0.104+ | 现代 Web 框架 |
| **[SQLAlchemy](https://www.sqlalchemy.org/)** | 2.0+ | Python ORM |
| **[PostgreSQL](https://www.postgresql.org/)** | 15+ | 关系型数据库 |
| **[JWT](https://jwt.io/)** | - | 认证机制 |
| **[Alembic](https://alembic.sqlalchemy.org/)** | - | 数据库迁移 |
| **[DeepSeek](https://deepseek.com/)** | - | AI 模型提供商 |

---

## 📋 API 端点

### 认证相关

| 方法 | 端点 | 描述 |
|------|------|------|
| `POST` | `/api/v1/auth/register` | 用户注册 |
| `POST` | `/api/v1/auth/token` | 用户登录 (JWT OAuth2) |

### AI 内容生成

| 方法 | 端点 | 描述 |
|------|------|------|
| `POST` | `/api/v1/generate/title/stream` | 流式内容生成 (DeepSeek) |

### 文档管理

| 方法 | 端点 | 描述 |
|------|------|------|
| `GET` | `/api/v1/documents` | 获取用户文档历史 |
| `POST` | `/api/v1/documents` | 创建新文档 |

### 用户管理

| 方法 | 端点 | 描述 |
|------|------|------|
| `GET` | `/api/v1/user/me` | 获取当前用户信息 |
| `PUT` | `/api/v1/user/api-key` | 更新用户 API 密钥 |

---

## 📊 数据库设计

### 核心数据模型

#### User 表
- `id` - 主键
- `username` - 用户名 (唯一)
- `hashed_password` - 加密密码
- `encrypted_api_key` - 加密的 API 密钥
- `created_at` - 创建时间

#### Document 表
- `id` - 主键
- `owner_id` - 外键关联用户
- `prompt` - 用户输入的提示词
- `content` - AI 生成的内容
- `type` - 文档类型 (如 "deepseek-gen")
- `created_at` - 创建时间

### 数据库迁移

项目使用 Alembic 管理数据库迁移：

```bash
cd backend
# 运行迁移
alembic upgrade head

# 创建新迁移
alembic revision --autogenerate -m "描述变更"
```

---

## 🔧 环境配置

### 后端环境变量 (.env)

```bash
# 数据库连接
DATABASE_URL="postgresql+asyncpg://user:password@localhost:5432/dbname"

# JWT 配置
JWT_SECRET_KEY="your-super-secret-key"
JWT_ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=60

# 加密密钥
ENCRYPTION_KEY="your-encryption-key"
```

### Docker 配置

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: cjy
      POSTGRES_PASSWORD: 1766984956
      POSTGRES_DB: ai_assistant_dev
    ports:
      - "5432:5432"
    volumes:
      - ai_data:/var/lib/postgresql/data
```

---

## 🛡️ 安全特性

### 前端安全
- **JWT Token 管理** - 安全的 Token 存储和验证
- **输入验证** - Zod 模式验证所有用户输入
- **XSS 防护** - React 内置 XSS 防护
- **CSRF 防护** - SameSite Cookie 策略

### 后端安全
- **密码安全** - bcrypt 哈希算法
- **数据加密** - Fernet 加密敏感数据
- **SQL 注入防护** - SQLAlchemy ORM
- **CORS 配置** - 严格的跨域策略

### 数据库安全
- **访问控制** - 基于用户权限的数据访问
- **数据加密** - 敏感数据加密存储
- **备份策略** - 定期数据备份

---

## 🚀 部署指南

### Docker 部署

```bash
# 构建并启动所有服务
docker-compose up -d --build
```

### 生产环境配置

1. **后端配置**:
   - 使用生产数据库
   - 设置强密码的 JWT 密钥
   - 配置 CORS 白名单
   - 启用 HTTPS

2. **前端配置**:
   - 设置生产环境变量
   - 构建优化：`npm run build`
   - 配置域名和 SSL

3. **安全措施**:
   - 定期更新依赖
   - 监控日志和错误
   - 备份数据库

---

## 🛠️ 开发指南

### 添加新功能

#### 后端开发

1. **创建新的 API 端点**:
   ```python
   # backend/app/api/v1/endpoints/new_feature.py
   from fastapi import APIRouter, Depends
   from app.api.deps import get_db, get_current_user

   router = APIRouter()

   @router.post("/new-endpoint")
   async def new_endpoint(
       current_user = Depends(get_current_user),
       db = Depends(get_db)
   ):
       # 实现逻辑
       pass
   ```

2. **注册路由**:
   ```python
   # backend/app/api/v1/api.py
   from .endpoints import new_feature
   api_router.include_router(new_feature.router, prefix="/new-feature", tags=["New Feature"])
   ```

3. **数据库变更**:
   ```bash
   cd backend
   alembic revision --autogenerate -m "Add new feature"
   alembic upgrade head
   ```

#### 前端开发

1. **添加新页面**:
   ```tsx
   // frontend/src/app/(protected)/new-feature/page.tsx
   'use client'

   import React from 'react'
   import { Card } from '@/components/ui/card'

   export default function NewFeaturePage() {
       return (
           <div className="container mx-auto py-8">
               <Card>New Feature</Card>
           </div>
       )
   }
   ```

2. **使用 shadcn/ui 组件**:
   ```bash
   npx shadcn@latest add [component-name]
   ```

### 代码规范

- **TypeScript** - 严格类型检查
- **ESLint** - 代码质量和一致性
- **Prettier** - 代码格式化
- **命名约定** - 使用有意义的变量名
- **注释** - 为复杂逻辑添加注释

---

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

---

## 📄 许可证

本项目采用 **MIT 许可证** 开源。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

详情请查看 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

感谢以下优秀的开源项目：

| 项目 | 描述 |
|------|------|
| [Next.js](https://nextjs.org/) | React 全栈框架 |
| [FastAPI](https://fastapi.tiangolo.com/) | 现代 Python Web 框架 |
| [shadcn/ui](https://ui.shadcn.com/) | 现代化 React 组件库 |
| [Tailwind CSS](https://tailwindcss.com/) | 实用优先的 CSS 框架 |
| [SQLAlchemy](https://www.sqlalchemy.org/) | Python SQL 工具包 |
| [PostgreSQL](https://www.postgresql.org/) | 开源关系型数据库 |
| [DeepSeek](https://deepseek.com/) | AI 模型提供商 |

---

## 📞 支持

如果你觉得这个项目对你有帮助，请给个 ⭐️ **Star**！

- 📧 **问题反馈**: [GitHub Issues](https://github.com/aisheep7434/ai-content-assistant/issues)
- 💬 **功能建议**: [GitHub Discussions](https://github.com/aisheep7434/ai-content-assistant/discussions)
- 🐛 **Bug 报告**: [Bug Tracker](https://github.com/aisheep7434/ai-content-assistant/issues)

---

<div align="center">

**Made with ❤️ by [AI Content Assistant Team](https://github.com/aisheep7434)**

[⬆️ 回到顶部](#-ai-content-assistant)

</div>