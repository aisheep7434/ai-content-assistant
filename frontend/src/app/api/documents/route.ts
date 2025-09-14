import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

// GET /api/documents (获取历史记录)
export async function GET(request: Request) {
  // 1. 获取 Token
  const token = (await cookies()).get('auth_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    // 2. 调用受保护的 FastAPI 端点 (GET 请求)
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/documents`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // 关键的认证头
      },
    })

    if (!apiRes.ok) {
      const errData = await apiRes.json()
      return NextResponse.json({ error: errData.detail }, { status: apiRes.status })
    }

    // 3. 成功，将 FastAPI 的历史记录数组转发回客户端
    const data = await apiRes.json()
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}