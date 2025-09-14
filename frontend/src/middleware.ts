import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. 从请求中获取我们设置的 auth token cookie
  const authToken = request.cookies.get('auth_token')?.value

  const { pathname } = request.nextUrl

  // 2. 定义受保护的路由
  const protectedPaths = ['/dashboard', '/history'] // 所有 (protected) 组下的路由
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path))

  // 3. 保护逻辑
  if (isProtectedRoute && !authToken) {
    // 如果访问受保护页面且没有 token，重定向到登录页
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // 4. 如果已登录，阻止访问登录/注册页
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && authToken) {
     return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // 其他情况，放行
  return NextResponse.next()
}

// 5. 配置 Matcher，让中间件只在需要的路由上运行
export const config = {
  matcher: ['/dashboard/:path*', '/history/:path*', '/login', '/register'],
}