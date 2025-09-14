<div align="center">

# 🤖 AI Content Assistant

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104.0-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

**一个现代化的 AI 内容生成助手** | *基于 Next.js 15 + FastAPI 构建*

[快速开始](#-快速开始) • [功能特性](#-功能特性) • [技术栈](#-技术栈) • [项目预览](#-项目预览)

</div>

---

## 🌟 项目预览

![Dashboard Preview](https://via.placeholder.com/1200x600?text=AI+Content+Assistant+Dashboard+Preview)

**AI Content Assistant** 是一个功能强大的智能内容创作平台，集成了最新的 Web 技术栈，为用户提供流畅的内容生成体验。

---

## 🚀 功能特性

### 🔐 安全认证系统
- ✅ JWT Token 认证机制
- ✅ bcrypt 密码加密存储
- ✅ 安全的用户会话管理
- ✅ CORS 跨域保护

### 🎨 现代化用户界面
- ✅ 基于 shadcn/ui 的精美组件库
- ✅ 完全响应式设计 (移动端优化)
- ✅ 深色/浅色主题切换
- ✅ 流畅的动画和过渡效果

### 📊 智能数据统计
- ✅ 实时使用数据统计
- ✅ 性能指标监控
- ✅ 可视化数据展示
- ✅ 用户行为分析

### 🛠️ 开发者友好
- ✅ 完整的 TypeScript 支持
- ✅ 现代化开发工具链
- ✅ 清晰的项目结构
- ✅ 详细的 API 文档

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

确保你的系统已安装：

- **Node.js** 18.0+
- **Python** 3.11+
- **PostgreSQL** 14+ (推荐)
- **Git** (版本控制)

### 📋 安装步骤

#### 1. 克隆项目

```bash
git clone https://github.com/aisheep7434/ai-content-assistant.git
cd ai-content-assistant
```

#### 2. 后端设置

```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Linux/Mac:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置数据库连接和 JWT 密钥

# 初始化数据库
alembic upgrade head

# 启动后端服务器
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 3. 前端设置

```bash
# 新开终端，进入前端目录
cd frontend

# 安装依赖
npm install

# 配置环境变量（如果需要）
cp .env.example .env

# 启动开发服务器
npm run dev
```

#### 4. 访问应用

打开浏览器访问：[http://localhost:3000](http://localhost:3000)

- **前端地址**: http://localhost:3000
- **后端 API**: http://localhost:8000
- **API 文档**: http://localhost:8000/docs

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
| `POST` | `/api/v1/auth/token` | 用户登录 (OAuth2) |
| `POST` | `/api/v1/auth/logout` | 用户登出 |

### 内容生成

| 方法 | 端点 | 描述 |
|------|------|------|
| `POST` | `/api/v1/generate/title` | 生成标题 |
| `POST` | `/api/v1/generate/blog` | 生成博客文章 |
| `POST` | `/api/v1/generate/product` | 生成产品描述 |

### 历史记录

| 方法 | 端点 | 描述 |
|------|------|------|
| `GET` | `/api/v1/documents` | 获取文档历史 |
| `DELETE` | `/api/v1/documents/{id}` | 删除文档 |

---

## 🔒 安全特性

- ✅ **JWT Token 认证** - 无状态认证机制
- ✅ **密码哈希存储** - bcrypt 加密算法
- ✅ **CORS 配置** - 跨域请求保护
- ✅ **输入验证** - Zod 模式验证
- ✅ **SQL 注入防护** - SQLAlchemy ORM
- ✅ **XSS 防护** - React 内置保护

---

## 🎨 UI 组件库

项目使用 **[shadcn/ui](https://ui.shadcn.com/)** 组件库，提供：

- **表单组件**: Input, Button, Card, Form, Label
- **布局组件**: Separator, Container, Grid
- **反馈组件**: Toast (Sonner), Alert
- **导航组件**: Header, Navigation, Breadcrumb
- **数据展示**: Table, Badge, Avatar

所有组件都支持：
- 🌓 深色/浅色主题
- 📱 响应式设计
- ♿ 无障碍访问
- 🎨 自定义样式

---

## 🚀 性能优化

### 前端优化
- **Next.js 15** - App Router + 服务端渲染
- **Turbopack** - 快速的打包工具
- **图片优化** - Next.js Image 组件
- **代码分割** - 动态导入和懒加载

### 后端优化
- **异步处理** - FastAPI + AsyncIO
- **数据库优化** - 连接池和查询优化
- **缓存策略** - Redis 集成准备
- **API 文档** - 自动生成 OpenAPI 文档

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

1. **Fork 项目**
   ```bash
   # Fork 并克隆到本地
   git clone https://github.com/YOUR_USERNAME/ai-content-assistant.git
   cd ai-content-assistant
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **提交更改**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **推送到分支**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **创建 Pull Request**
   - 详细描述更改内容
   - 包含相关测试
   - 确保代码风格一致

### 开发规范

- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 和 Prettier 配置
- 编写清晰的提交信息
- 确保测试覆盖率

---

## 📄 许可证

本项目采用 **MIT 许可证** 开源。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

详情请查看 [LICENSE](LICENSE) 文件。

---

## 🙏 致谢

感谢以下优秀的开源项目：

<div align="center">

| 项目 | 描述 |
|------|------|
| [Next.js](https://nextjs.org/) | React 全栈框架 |
| [FastAPI](https://fastapi.tiangolo.com/) | 现代 Python Web 框架 |
| [shadcn/ui](https://ui.shadcn.com/) | 现代化 React 组件库 |
| [Tailwind CSS](https://tailwindcss.com/) | 实用优先的 CSS 框架 |
| [SQLAlchemy](https://www.sqlalchemy.org/) | Python SQL 工具包 |
| [PostgreSQL](https://www.postgresql.org/) | 开源关系型数据库 |

</div>

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