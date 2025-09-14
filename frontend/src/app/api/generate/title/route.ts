import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

export async function POST(request: Request) {
  // 1. 从中间件获取认证 cookie
  const token = (await cookies()).get('auth_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json() // { prompt: "..." }

    // 2. 调用受保护的 FastAPI 端点，【必须】附带 Bearer Token
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/generate/title`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 关键的认证头
      },
      body: JSON.stringify(body),
    })

    if (!apiRes.ok) {
      const errData = await apiRes.json()
      return NextResponse.json({ error: errData.detail }, { status: apiRes.status })
    }

    // 3. 成功，将 FastAPI 的 AI 结果转发回客户端
    const data = await apiRes.json()
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}