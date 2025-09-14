# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a full-stack AI Content Assistant application with a **frontend/backend separation** architecture:

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS v4, and shadcn/ui components
- **Backend**: FastAPI with SQLAlchemy, AsyncIO, JWT authentication, and PostgreSQL
- **Communication**: Frontend communicates with backend via API calls to `/api/v1/*` endpoints

## Development Commands

### Frontend (in `frontend/` directory)
```bash
# Development with Turbopack (recommended)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

### Backend (in `backend/` directory)
```bash
# Development server with auto-reload
uvicorn app.main:app --reload

# Database migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"
```

## Key Technology Stack

### Frontend Dependencies
- **Next.js 15** with React 19 and Turbopack
- **shadcn/ui** components with Radix UI primitives
- **Tailwind CSS v4** with CSS variables for theming
- **React Hook Form** with Zod validation
- **Sonner** for toast notifications
- **Lucide React** for icons

### Backend Dependencies
- **FastAPI** with async/await support
- **SQLAlchemy** with async sessions
- **JWT** authentication via `python-jose`
- **Passlib** with bcrypt for password hashing
- **Alembic** for database migrations

## API Architecture

### Route Structure
- Main app in `backend/app/main.py`
- V1 API routes organized in `backend/app/api/v1/api.py`
- Endpoint modules in `backend/app/api/v1/endpoints/`
- Current endpoints: `/api/v1/auth/*` for authentication

### Authentication Flow
1. User registers via `POST /api/v1/auth/register`
2. User logs in via `POST /api/v1/auth/token` (OAuth2 password flow)
3. JWT token returned with user ID and username
4. Frontend stores token and sends in Authorization header

### Database Models
- **User**: Basic user authentication with username and hashed password
- **Document**: Content generation records linked to users (prepared for future features)

## Frontend Architecture

### App Router Structure
- `(auth)/` route group: Login and register pages
- `(protected)/` route group: Dashboard and other authenticated pages
- Layout system: Auth layout centers content, protected layout adds navigation

### Component System
- **shadcn/ui** components in `src/components/ui/`
- Custom components follow shadcn/ui patterns
- **Radix UI** primitives for accessibility
- **Tailwind CSS** with custom design tokens

### State Management
- React hooks for local state
- Next.js App Router for routing and data fetching
- Client components for interactivity (`'use client'`)

## Database Configuration

### Environment Variables
Backend expects these environment variables (`.env` file):
- `JWT_SECRET_KEY`: JWT signing secret
- `JWT_ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration in minutes
- Database connection string for PostgreSQL

### Migration System
- **Alembic** for database schema migrations
- Async SQLAlchemy models
- Models defined in `backend/app/db/models.py`

## Security Considerations

### Backend Security
- JWT tokens with expiration
- bcrypt password hashing
- CORS configured for frontend development
- SQL injection prevention via SQLAlchemy ORM

### Frontend Security
- Client-side route protection
- Secure token storage (localStorage for demo)
- Input validation with Zod schemas
- XSS prevention via React's built-in protections

## UI/UX Patterns

### Design System
- **shadcn/ui** component library
- **Tailwind CSS** utility classes
- Dark/light theme support via `next-themes`
- Responsive design with mobile-first approach

### Common Patterns
- Card-based layouts for content sections
- Gradient backgrounds for visual hierarchy
- Consistent spacing and typography scales
- Loading states and error handling with Sonner toasts

## Development Workflow

### Adding New Backend Features
1. Add new endpoint in `backend/app/api/v1/endpoints/`
2. Register endpoint in `backend/app/api/v1/api.py`
3. Create/modify database models if needed
4. Create Alembic migration for schema changes
5. Update frontend to consume new API

### Adding New Frontend Pages
1. Create page in appropriate route group
2. Use existing layout or create new one
3. Import required shadcn/ui components
4. Follow established UI patterns and spacing

### Component Development
- Use shadcn/ui CLI for new components: `npx shadcn@latest add [component]`
- Follow the established component structure
- Maintain consistent TypeScript typing
- Ensure responsive design and accessibility