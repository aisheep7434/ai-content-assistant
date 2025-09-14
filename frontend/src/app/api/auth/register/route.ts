import { NextResponse } from 'next/server'

// 从环境变量读取后端 API 地址
const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

export async function POST(request: Request) {
  try {
    // 1. 从客户端获取 json 数据 (username, password)
    const body = await request.json()

    // 2. 直接将 JSON 转发到 FastAPI 的 /register 端点
    // (FastAPI 的 /register 端点需要 JSON，而 /token 需要 Form Data)
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!apiRes.ok) {
      const errorData = await apiRes.json()
      return NextResponse.json({ error: errorData.detail || '注册失败' }, { status: apiRes.status })
    }

    // 3. 注册成功，将 FastAPI 的成功响应 (用户信息) 转发回客户端
    const data = await apiRes.json()
    return NextResponse.json(data, { status: 200 })

    // 注意：注册成功后我们 *不会* 在这里设置 Cookie。我们要求用户去登录页面重新登录。

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}