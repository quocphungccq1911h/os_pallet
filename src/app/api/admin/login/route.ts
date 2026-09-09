import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPassword, AUTH_COOKIE_NAME, generateToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Vui lòng nhập mật khẩu quản trị' }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!' }, { status: 401 });
    }

    const token = generateToken();
    const response = NextResponse.json({ success: true, message: 'Đăng nhập thành công' });

    // Đặt cookie HTTP-only sống trong 30 ngày
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Đã có lỗi xảy ra khi đăng nhập', details: String(error) }, { status: 500 });
  }
}
