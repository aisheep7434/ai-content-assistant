# AI Content Assistant - Frontend Architecture

## Project Structure Overview

```
frontend/
├── 📁 public/                    # Static Assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── 📁 src/
│   ├── 📁 app/                   # Next.js App Router
│   │   ├── 📁 api/              # API Routes
│   │   │   └── 📁 auth/         # Authentication APIs
│   │   │       ├── 📁 login/
│   │   │       │   └── 📄 route.ts    # Login API endpoint
│   │   │       └── 📁 register/
│   │   │           └── 📄 route.ts    # Register API endpoint
│   │   │
│   │   ├── 📁 auth/             # Auth Pages Layout
│   │   │   └── 📄 layout.tsx
│   │   │
│   │   ├── 📁 dashboard/        # Dashboard Page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 login/            # Login Page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 📁 register/         # Register Page
│   │   │   └── 📄 page.tsx
│   │   │
│   │   ├── 🎯 favicon.ico
│   │   ├── 🎨 globals.css      # Global Styles
│   │   ├── 🏗️ layout.tsx        # Root Layout
│   │   └── 🏠 page.tsx          # Homepage
│   │
│   ├── 📁 components/
│   │   └── 📁 ui/               # shadcn/ui Component Library
│   │       ├── 🔘 button.tsx
│   │       ├── 🃏 card.tsx
│   │       ├── 📝 form.tsx
│   │       ├── 📥 input.tsx
│   │       ├── 🏷️ label.tsx
│   │       ├── ➖ separator.tsx
│   │       ├── 🔔 sonner.tsx
│   │       └── 📄 textarea.tsx
│   │
│   ├── 📁 lib/
│   │   └── 🔧 utils.ts          # Utility Functions
│   │
│   └── 🛡️ middleware.ts         # Route Protection Middleware
│
├── 📦 .next/                     # Next.js Build Output (auto-generated)
├── ⚙️ components.json            # shadcn/ui Configuration
├── ⚙️ next.config.ts             # Next.js Configuration
├── 📦 package.json               # Project Dependencies
├── ⚙️ tsconfig.json              # TypeScript Configuration
└── 🎨 tailwind.config.js         # Tailwind CSS Configuration
```

## Architecture Flow

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser App   │    │   Next.js App   │    │   FastAPI Backend│
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Login Page   │ │◄──►│ │Login API    │ │◄──►│ │/token       │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Register Page│ │◄──►│ │Register API │ │◄──►│ │/register    │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Dashboard    │ │◄──►│ │Protected    │ │◄──►│ │Protected    │ │
│ │Page         │ │    │ │Routes       │ │    │ │Routes       │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │Route Middleware│
                    │(Auth Check)    │
                    └─────────────────┘
```

## Key Technologies

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Hooks
- **Form Handling**: React Hook Form + Zod
- **Authentication**: JWT + HTTP-only Cookies
- **TypeScript**: Full type safety
- **Routing**: File-based routing with middleware protection

## Page Flow

1. **Home Page** (`/`) → Landing page
2. **Auth Pages** (`/login`, `/register`) → Authentication forms
3. **Protected Routes** (`/dashboard/*`) → Require authentication
4. **API Routes** (`/api/auth/*`) → Backend communication

## Security Features

- HTTP-only cookies for JWT tokens
- Route protection middleware
- CSRF protection
- Input validation with Zod
- Secure environment variables