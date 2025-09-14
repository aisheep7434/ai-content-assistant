# 🤖 AI Content Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**一个现代化的 AI 内容生成平台** | *基于 Next.js 15 + FastAPI + DeepSeek 构建*

[快速开始](#-快速开始) • [功能特性](#-功能特性) • [技术栈](#-技术栈) • [项目预览](#-项目预览)

</div>

---

## 🌟 项目概览

**AI Content Assistant** 是一个功能强大的全栈 AI 内容生成平台，集成了最新的 Web 技术栈和 DeepSeek AI 模型，为用户提供智能、安全、高效的内容创作体验。

### 🎯 核心功能

- **🤖 AI 内容生成**: 集成 DeepSeek API，支持实时流式响应
- **🔐 完整认证系统**: JWT Token 认证，支持注册、登录和权限验证
- **💾 数据持久化**: PostgreSQL 数据库，Alembic 迁移管理
- **🔒 安全加密**: API 密钥加密存储，保护用户隐私
- **🎨 现代化 UI**: 基于 shadcn/ui 和 Tailwind CSS v4
- **⚡ 高性能**: React 19 + Next.js 15，Turbopack 构建优化

---

## 📋 使用指南

### 🚀 首次使用流程

#### 1. 环境准备
确保你的系统已安装：
- **Node.js** 18.0+
- **Python** 3.10+
- **PostgreSQL** 15+ (或使用Docker)

#### 2. 项目启动

**后端启动**:
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

**前端启动**:
```bash
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

#### 3. 应用使用

**步骤 1: 用户注册**
1. 访问 http://localhost:3000
2. 点击"注册"按钮
3. 填写用户名和密码
4. 完成注册后自动登录

**步骤 2: 配置 API 密钥**
1. 登录后进入仪表盘
2. 滚动到页面底部的"API密钥设置"区域
3. 输入你的 DeepSeek API 密钥
4. 点击"保存密钥"

**步骤 3: 开始内容生成**
1. 在仪表盘的文本框中输入提示词
2. 例如："写一篇关于人工智能的博客文章标题"
3. 点击"立即生成 (Stream)"按钮
4. 实时查看 AI 生成的内容
5. 生成的内容会自动保存到历史记录

### 💡 功能详解

#### 🔐 用户认证系统
- **注册**: 创建新账户，用户名唯一
- **登录**: JWT Token 认证，支持自动登录
- **会话管理**: Token 有效期 60 分钟
- **安全保护**: bcrypt 密码哈希存储

#### 🤖 AI 内容生成
- **流式响应**: 实时显示 AI 生成过程
- **支持模型**: DeepSeek Chat 模型
- **内容类型**: 支持各种文本内容生成
- **自动保存**: 生成结果自动保存到数据库

#### 📊 历史记录管理
- **查看历史**: 浏览所有生成记录
- **详细信息**: 显示提示词和生成内容
- **时间排序**: 按创建时间倒序排列
- **分页支持**: 大量记录时的分页显示

#### 🔧 设置管理
- **API 密钥**: 安全的密钥存储和管理
- **密钥验证**: 实时验证密钥有效性
- **更新功能**: 支持密钥的更新和重置

---

## 🏗️ 系统架构

### 📐 整体架构设计

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
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   Users 表      │  │  Documents 表   │  │   迁移历史      ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 🎯 前端架构

#### 技术组件
- **Next.js 15**: React 全栈框架，使用 App Router
- **React 19**: 用户界面库，支持最新特性
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS v4**: 原子化 CSS 框架
- **shadcn/ui**: 高质量组件库
- **React Query**: 数据状态管理和缓存
- **React Hook Form**: 高性能表单处理
- **Zod**: 数据验证库

#### 目录结构
```
frontend/src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # 认证相关页面组
│   │   ├── layout.tsx      # 认证布局
│   │   ├── login/          # 登录页面
│   │   └── register/       # 注册页面
│   ├── (protected)/        # 受保护页面组
│   │   ├── layout.tsx      # 受保护布局
│   │   ├── dashboard/      # 仪表盘页面
│   │   └── settings/       # 设置页面
│   ├── api/                # API 路由
│   │   ├── auth/           # 认证相关 API
│   │   ├── documents/      # 文档管理 API
│   │   ├── generate/       # AI 生成 API
│   │   └── user/           # 用户管理 API
│   ├── layout.tsx          # 根布局
│   └── globals.css         # 全局样式
├── components/             # React 组件
│   └── ui/                 # shadcn/ui 组件
├── lib/                    # 工具函数
└── providers/              # React Providers
    └── query-provider.tsx  # React Query Provider
```

#### 核心功能模块

**1. 认证系统**
- JWT Token 管理
- 客户端路由保护
- 自动登录和登出
- 安全的 Token 存储

**2. 内容生成**
- 流式响应处理
- 实时内容显示
- 错误处理和重试
- 生成历史管理

**3. 数据管理**
- React Query 缓存策略
- 自动数据同步
- 离线数据支持
- 乐观更新

### 🔧 后端架构

#### 技术组件
- **FastAPI**: 现代异步 Web 框架
- **SQLAlchemy**: Python ORM 框架
- **Alembic**: 数据库迁移工具
- **PostgreSQL**: 关系型数据库
- **JWT**: JSON Web Token 认证
- **Passlib**: 密码哈希库
- **Cryptography**: 数据加密库
- **OpenAI**: DeepSeek API 客户端

#### 目录结构
```
backend/app/
├── api/                    # API 路由
│   └── v1/                 # API 版本 1
│       ├── api.py          # 路由注册
│       └── endpoints/      # 端点实现
│           ├── auth.py      # 认证端点
│           ├── generate.py  # AI 生成端点
│           ├── documents.py # 文档管理端点
│           └── user.py      # 用户管理端点
├── core/                   # 核心功能
│   ├── config.py           # 配置管理
│   ├── security.py         # 安全相关
│   └── encryption.py       # 加密工具
├── db/                     # 数据库相关
│   ├── models.py           # 数据模型
│   └── session.py          # 数据库会话
├── schemas/                # Pydantic 模式
│   ├── user.py             # 用户模式
│   ├── document.py         # 文档模式
│   └── token.py            # Token 模式
└── main.py                 # 应用入口
```

#### 核心功能模块

**1. 认证模块**
- 用户注册和登录
- JWT Token 生成和验证
- 密码哈希和验证
- 权限控制

**2. AI 生成模块**
- DeepSeek API 集成
- 流式响应处理
- 错误处理和重试
- 内容验证

**3. 数据管理模块**
- 用户数据管理
- 文档数据管理
- 数据库事务处理
- 查询优化

### 🔄 数据流架构

#### 请求流程
```
用户操作 → 前端组件 → React Query → API 路由 → FastAPI → 业务逻辑 → 数据库 → 响应返回
```

#### 认证流程
```
1. 用户登录 → 后端验证 → 生成 JWT Token
2. 前端存储 Token → 附加到请求头 → 后端验证 Token
3. Token 过期 → 自动登出 → 重新登录
```

#### AI 生成流程
```
1. 用户输入 → 前端验证 → 发送请求
2. 后端认证 → 调用 DeepSeek API → 流式响应
3. 实时返回 → 前端显示 → 保存到数据库
```

### 🛡️ 安全架构

#### 前端安全
- **JWT Token 管理**: 安全的 Token 存储和验证
- **输入验证**: Zod 模式验证所有用户输入
- **XSS 防护**: React 内置 XSS 防护
- **CSRF 防护**: SameSite Cookie 策略

#### 后端安全
- **密码安全**: bcrypt 哈希算法
- **数据加密**: Fernet 加密敏感数据
- **SQL 注入防护**: SQLAlchemy ORM
- **CORS 配置**: 严格的跨域策略
- **请求限流**: 防止 API 滥用

#### 数据库安全
- **访问控制**: 基于用户权限的数据访问
- **数据加密**: 敏感数据加密存储
- **备份策略**: 定期数据备份
- **审计日志**: 关键操作日志记录

### 🔄 项目工作流程

#### 📋 开发工作流程

**1. 环境搭建**
```bash
# 克隆项目
git clone <repository-url>
cd ai-content-assistant

# 启动数据库
docker-compose up -d

# 后端设置
cd backend
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload

# 前端设置 (新终端)
cd frontend
npm install
npm run dev
```

**2. 开发模式**
- **后端**: 自动重载，代码更改即时生效
- **前端**: 热重载，组件状态保持
- **数据库**: Alembic 自动管理迁移
- **API 文档**: http://localhost:8000/docs

**3. 调试流程**
- **前端调试**: 浏览器开发者工具 + React DevTools
- **后端调试**: Python logging + FastAPI 内置错误页面
- **数据库调试**: PostgreSQL 日志 + 查询分析
- **API 测试**: FastAPI 自动文档 + Postman

#### 🚀 部署工作流程

**1. 生产环境准备**
```bash
# 环境变量配置
# backend/.env
DATABASE_URL="postgresql+asyncpg://user:password@prod-db:5432/prod_db"
JWT_SECRET_KEY="production-secret-key"
ENCRYPTION_KEY="production-encryption-key"

# frontend/.env.local
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"
```

**2. 构建和部署**
```bash
# 前端构建
cd frontend
npm run build
npm run start

# 后端部署 (使用 Gunicorn)
cd backend
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**3. 数据库迁移**
```bash
cd backend
# 生产环境迁移
alembic upgrade head

# 创建备份
pg_dump $DATABASE_URL > backup.sql
```

#### 📊 用户操作流程

**1. 首次使用流程**
```
访问网站 → 注册账户 → 登录系统 → 配置API密钥 → 开始使用
```

**2. 日常使用流程**
```
登录系统 → 输入提示词 → 选择生成类型 → 查看实时结果 → 保存到历史 → 管理文档
```

**3. 内容生成流程**
```
用户输入 → 前端验证 → 发送请求 → 后端认证 → 调用AI API → 流式返回 → 实时显示 → 保存结果
```

#### 🔧 维护工作流程

**1. 代码维护**
- **依赖更新**: 定期更新前端和后端依赖
- **安全补丁**: 及时应用安全更新
- **性能优化**: 监控和优化性能瓶颈
- **代码重构**: 保持代码质量和可维护性

**2. 数据库维护**
- **备份策略**: 定期备份重要数据
- **索引优化**: 优化查询性能
- **清理工作**: 清理过期数据和日志
- **监控告警**: 监控数据库性能和错误

**3. 系统监控**
- **应用监控**: 监控应用性能和错误率
- **API 监控**: 监控 API 响应时间和成功率
- **数据库监控**: 监控查询性能和连接状态
- **服务器监控**: 监控 CPU、内存、磁盘使用率

#### 🤝 团队协作流程

**1. 开发协作**
- **代码分支**: 功能分支开发模式
- **代码审查**: Pull Request 审查
- **自动化测试**: CI/CD 自动化测试
- **部署流程**: 自动化部署到生产环境

**2. 文档维护**
- **API 文档**: 保持 API 文档的及时更新
- **用户文档**: 更新用户使用指南
- **开发文档**: 维护开发文档和架构说明
- **部署文档**: 更新部署和维护文档

---

## 🛠 技术栈

### 前端技术栈
<div align="center">

| 技术 | 版本 | 描述 |
|------|------|------|
| **[Next.js](https://nextjs.org/)** | 15 | React 全栈框架 |
| **[React](https://react.dev/)** | 19 | 用户界面库 |
| **[TypeScript](https://www.typescriptlang.org/)** | 5+ | 类型安全 |
| **[Tailwind CSS](https://tailwindcss.com/)** | v4 | 原子化 CSS 框架 |
| **[shadcn/ui](https://ui.shadcn.com/)** | Latest | 高质量组件库 |
| **[Radix UI](https://www.radix-ui.com/)** | Latest | 无头组件库 |
| **[React Hook Form](https://react-hook-form.com/)** | 7+ | 高性能表单 |
| **[Zod](https://zod.dev/)** | 4+ | 类型验证 |

</div>

### 后端技术栈
<div align="center">

| 技术 | 版本 | 描述 |
|------|------|------|
| **[FastAPI](https://fastapi.tiangolo.com/)** | 0.104+ | 现代 Web 框架 |
| **[SQLAlchemy](https://www.sqlalchemy.org/)** | 2.0+ | Python ORM |
| **[PostgreSQL](https://www.postgresql.org/)** | 14+ | 关系型数据库 |
| **[JWT](https://jwt.io/)** | - | 认证机制 |
| **[Alembic](https://alembic.sqlalchemy.org/)** | - | 数据库迁移 |
| **[Passlib](https://passlib.readthedocs.io/)** | - | 密码加密 |
| **[Python](https://www.python.org/)** | 3.11+ | 编程语言 |

</div>

---

## 📦 项目结构

```
ai-content-assistant/
├── backend/                          # FastAPI 后端
│   ├── app/
│   │   ├── api/v1/                   # API v1 路由
│   │   │   ├── api.py                # 主路由配置
│   │   │   └── endpoints/            # 端点实现
│   │   │       ├── auth.py           # 认证相关端点
│   │   │       ├── generate.py       # AI 生成端点
│   │   │       └── documents.py      # 文档管理端点
│   │   ├── core/                     # 核心功能
│   │   │   └── security.py          # 安全相关功能
│   │   ├── db/                       # 数据库相关
│   │   │   ├── models.py             # 数据库模型
│   │   │   └── session.py            # 数据库会话
│   │   └── schemas/                  # Pydantic 模式
│   │       ├── user.py               # 用户模式
│   │       ├── document.py           # 文档模式
│   │       └── token.py              # Token 模式
│   └── main.py                       # FastAPI 应用入口
├── frontend/                         # Next.js 前端
│   ├── src/
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── (auth)/               # 认证相关页面
│   │   │   │   ├── layout.tsx        # 认证布局
│   │   │   │   ├── login/page.tsx     # 登录页面
│   │   │   │   └── register/page.tsx  # 注册页面
│   │   │   ├── (protected)/          # 受保护页面
│   │   │   │   ├── layout.tsx        # 受保护布局
│   │   │   │   └── dashboard/page.tsx # 仪表盘页面
│   │   │   ├── layout.tsx            # 根布局
│   │   │   └── globals.css           # 全局样式
│   │   ├── components/               # React 组件
│   │   │   └── ui/                   # shadcn/ui 组件
│   │   ├── providers/                # React Providers
│   │   │   └── query-provider.tsx    # TanStack Query Provider
│   │   └── lib/                      # 工具函数
│   └── package.json                  # 前端依赖
├── CLAUDE.md                         # Claude Code 开发指南
└── README.md                         # 项目文档
```

---

## 🚀 快速开始

### 环境要求

- **Node.js** 18.0+
- **Python** 3.10+
- **PostgreSQL** 15+
- **Docker & Docker Compose** (可选)

### 📋 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd ai-content-assistant
```

#### 2. 后端设置

##### 使用 Docker (推荐)

```bash
# 启动数据库
docker-compose up -d

# 进入后端目录
cd backend

# 安装 Python 依赖
pip install fastapi sqlalchemy alembic asyncpg python-jose passlib bcrypt python-multipart openai

# 运行数据库迁移
alembic upgrade head

# 启动后端服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

##### 手动安装

1. 安装 PostgreSQL 并创建数据库
2. 配置环境变量
3. 安装依赖并运行迁移

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

#### 5. 首次使用

1. 访问前端注册账户
2. 登录后在设置页面配置 DeepSeek API 密钥
3. 开始使用 AI 内容生成功能

---

## 🔧 开发命令

### 前端开发

```bash
# 开发服务器 (使用 Turbopack)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查和格式化
npm run lint

# 类型检查
npx tsc --noEmit
```

### 后端开发

```bash
# 启动开发服务器
uvicorn app.main:app --reload

# 运行数据库迁移
alembic upgrade head

# 创建新的迁移文件
alembic revision --autogenerate -m "描述更改"

# 运行测试 (如果存在)
pytest

# 代码检查
flake8 app/
black app/
```

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

### 🔒 安全特性

- **JWT Token 认证** - 无状态认证机制
- **bcrypt 密码哈希** - 安全的密码存储
- **API 密钥加密** - Fernet 加密存储用户密钥
- **CORS 配置** - 跨域请求保护
- **输入验证** - Zod 和 Pydantic 模式验证
- **SQL 注入防护** - SQLAlchemy ORM
- **XSS 防护** - React 内置保护

---

## 📊 数据库架构

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

- **TypeScript**: 严格类型检查
- **ESLint**: 代码质量和一致性
- **Prettier**: 代码格式化
- **命名约定**: 使用有意义的变量名
- **注释**: 为复杂逻辑添加注释

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

## 🧪 测试

### 后端测试

```bash
cd backend
pytest
```

### 前端测试

```bash
cd frontend
npm run test
```

---

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 开发规范

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 编写清晰的提交信息
- 确保测试覆盖率
- 遵循现有代码风格

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