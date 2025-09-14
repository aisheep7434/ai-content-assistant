import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

export async function PUT(request: Request) {
  const token = (await cookies()).get('auth_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json() // { api_key: "..." }

    // 调用FastAPI后端更新API密钥
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/user/me/api-key`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ api_key: body.api_key }),
    })

    if (!apiRes.ok) {
      const errorData = await apiRes.json()
      return NextResponse.json({ error: errorData.detail || '更新API密钥失败' }, { status: apiRes.status })
    }

    // 成功更新，返回用户信息
    const data = await apiRes.json()
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}