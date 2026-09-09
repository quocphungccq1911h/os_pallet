import { NextResponse } from 'next/server';
import { resetProductsToDefault } from '@/lib/products-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const resetData = await resetProductsToDefault();
    return NextResponse.json({
      success: true,
      message: 'Đã khôi phục dữ liệu gốc thành công',
      count: resetData.length,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi khôi phục dữ liệu', details: String(error) }, { status: 500 });
  }
}
