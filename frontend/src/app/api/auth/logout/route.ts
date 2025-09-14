import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST /api/auth/logout
export async function POST() {
  try {
    // 登出的关键操作：清除 httpOnly cookie
    (await
          // 登出的关键操作：清除 httpOnly cookie
          cookies()).set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0), // 设置一个过去的日期让 cookie 立即失效
      path: '/',
    })

    return NextResponse.json({ message: '登出成功' }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ error: '服务器内部错误' }, { status: 500 })
  }
}