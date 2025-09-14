# AI Content Assistant

一个现代化的 AI 内容生成助手，基于 Next.js 15 和 FastAPI 构建。提供用户认证、内容生成和历史记录管理功能。

## 🚀 功能特性

- **🔐 用户认证系统** - 安全的注册、登录和会话管理
- **📝 AI 内容生成** - 支持博客文章、产品描述、邮件内容等多种模板
- **📊 数据统计** - 实时显示使用统计和性能指标
- **🎨 现代化 UI** - 基于 shadcn/ui 的响应式设计
- **🌓 暗色主题** - 支持明暗主题切换
- **📱 响应式设计** - 完美适配桌面和移动设备

## 🛠 技术栈

### 前端
- **Next.js 15** - React 全栈框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS v4** - 原子化 CSS 框架
- **shadcn/ui** - 高质量 React 组件库
- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript 优先的模式验证
- **Sonner** - 现代化 Toast 通知

### 后端
- **FastAPI** - 现代、快速的 Python Web 框架
- **SQLAlchemy** - Python SQL 工具包和 ORM
- **AsyncIO** - 异步编程支持
- **JWT** - JSON Web Token 认证
- **PostgreSQL** - 关系型数据库（推荐）

## 📦 项目结构

```
ai-content-assistant/
├── backend/                 # FastAPI 后端
│   ├── app/
│   │   ├── api/v1/         # API 路由
│   │   │   ├── api.py      # 主路由配置
│   │   │   └── endpoints/  # 端点实现
│   │   ├── core/           # 核心功能（安全、配置等）
│   │   ├── db/             # 数据库模型和会话
│   │   └── schemas/        # Pydantic 模式
│   └── main.py            # FastAPI 应用入口
└── frontend/               # Next.js 前端
    ├── src/
    │   ├── app/            # Next.js 13+ App Router
    │   │   ├── (auth)/     # 认证相关页面
    │   │   └── (protected)/ # 受保护页面
    │   ├── components/     # React 组件
    │   └── lib/           # 工具函数
    └── package.json
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- Python 3.11+
- PostgreSQL 14+ (推荐)

### 后端设置

1. **导航到后端目录**
   ```bash
   cd backend
   ```

2. **创建虚拟环境**
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # 或 venv\Scripts\activate  # Windows
   ```

3. **安装依赖**
   ```bash
   pip install -r requirements.txt
   ```

4. **配置环境变量**
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，配置数据库连接等信息
   ```

5. **初始化数据库**
   ```bash
   alembic upgrade head
   ```

6. **启动后端服务器**
   ```bash
   uvicorn app.main:app --reload
   ```

### 前端设置

1. **导航到前端目录**
   ```bash
   cd frontend
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 pnpm
   pnpm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 或使用 pnpm
   pnpm dev
   ```

4. **访问应用**
   打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 🔧 开发命令

### 前端

```bash
# 开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

### 后端

```bash
# 启动开发服务器
uvicorn app.main:app --reload

# 数据库迁移
alembic upgrade head

# 创建新的迁移文件
alembic revision --autogenerate -m "描述"
```

## 📋 API 端点

### 认证

- `POST /api/v1/auth/register` - 用户注册
- `POST /api/v1/auth/token` - 获取访问令牌
- `POST /api/v1/auth/logout` - 用户登出

### 内容生成（规划中）

- `POST /api/v1/generate/blog` - 生成博客文章
- `POST /api/v1/generate/product` - 生成产品描述
- `POST /api/v1/generate/email` - 生成邮件内容

### 历史记录（规划中）

- `GET /api/v1/history` - 获取历史记录
- `DELETE /api/v1/history/{id}` - 删除历史记录

## 🎨 UI 组件

项目使用 shadcn/ui 组件库，提供：

- **表单组件** - Input, Button, Card, Form
- **布局组件** - Separator, Container
- **反馈组件** - Toast (Sonner)
- **导航组件** - Header, Navigation

所有组件都支持暗色主题和响应式设计。

## 🔒 安全特性

- JWT Token 认证
- 密码哈希存储
- CORS 配置
- 输入验证和清理
- SQL 注入防护

## 📈 性能优化

- 前端：Next.js 15 + Turbopack
- 后端：FastAPI 异步处理
- 数据库：AsyncIO 支持
- 静态资源：CDN 优化

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [FastAPI](https://fastapi.tiangolo.com/) - Python Web 框架
- [shadcn/ui](https://ui.shadcn.com/) - React 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

---

**注意**: 这是一个学习和演示项目。在生产环境中使用前，请确保进行充分的安全测试和性能优化。
