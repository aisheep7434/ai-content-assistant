    import { NextResponse } from 'next/server'
    import { cookies } from 'next/headers'
    
    // 后端 API 的地址，从环境变量读取
    const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'
    
    export async function POST(request: Request) {
      try {
        // 1. 从客户端获取 json 数据 (username, password)
        const body = await request.json()
    
        // 2. FastAPI的 /token 路由需要 Form data, 我们需要转换它
        const formData = new URLSearchParams()
        formData.append('username', body.username)
        formData.append('password', body.password)
    
        // 3. 调用真正的 FastAPI 后端
        const apiRes = await fetch(`${FASTAPI_URL}/api/v1/auth/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString(),
        })
    
        if (!apiRes.ok) {
          const errorData = await apiRes.json()
          return NextResponse.json({ error: errorData.detail || '登录失败' }, { status: apiRes.status })
        }
    
        // 4. 成功！从 FastAPI 获取 JWT Token
        const data = await apiRes.json() // { access_token: "...", token_type: "bearer" }
        const token = data.access_token
    
        // 5. 【关键】将 Token 存入安全的、httpOnly 的 Cookie 中
        ;(await
              // 5. 【关键】将 Token 存入安全的、httpOnly 的 Cookie 中
              cookies()).set('auth_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // 生产环境应为 true
          maxAge: 60 * 60, // 1 小时 (应与 JWT 过期时间匹配)
          path: '/', // 全站可用
        })
    
        return NextResponse.json({ message: '登录成功' }, { status: 200 })
    
      } catch (error) {
        return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
      }
    }