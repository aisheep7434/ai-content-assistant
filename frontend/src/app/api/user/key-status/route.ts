import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

// GET /api/user/key-status (检查密钥是否已设置)
export async function GET() {
  const token = (await cookies()).get('auth_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/user/me/api-key-status`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    })

    const data = await apiRes.json()
    if (!apiRes.ok) {
      return NextResponse.json({ error: data.detail }, { status: apiRes.status })
    }
    
    // 成功转发 { is_set: true/false }
    return NextResponse.json(data, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}