import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const FASTAPI_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000'

export async function POST(request: Request) {
  const token = (await cookies()).get('auth_token')?.value
  if (!token) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json() // { prompt: "..." }

    // 1. 调用后端的【流式】端点
    const apiRes = await fetch(`${FASTAPI_URL}/api/v1/generate/title/stream`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // @ts-ignore // Next.js 13/14 fetch 需要这个（或 duplex: 'half'）来处理流式 POST
      cache: 'no-store', 
    })
    
    // 2. 检查响应是否 OK
    if (!apiRes.ok) {
        const errData = await apiRes.json()
        return NextResponse.json({ error: errData.detail || "流式 API 错误"}, { status: apiRes.status });
    }

    // 3. 【关键】(来自原版教程阶段五)
    // 直接将 FastAPI 的可读流 (ReadableStream) 传回给客户端浏览器
    if (apiRes.body) {
      return new Response(apiRes.body, {
        status: apiRes.status,
        headers: { 'Content-Type': 'text/event-stream' },
      })
    }
    
    return NextResponse.json({ error: "响应体为空" }, { status: 500 });

  } catch (error: any) {
    return NextResponse.json({ error: '服务器内部错误', description: error.message }, { status: 500 })
  }
}