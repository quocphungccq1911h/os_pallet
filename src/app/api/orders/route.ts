import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, saveOrder } from '@/lib/orders-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const orders = await getAllOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc danh sách đơn hàng' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.customer || !body.productName) {
      return NextResponse.json({ error: 'Vui lòng cung cấp tên khách hàng và tên sản phẩm' }, { status: 400 });
    }

    const saved = await saveOrder(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu đơn hàng' }, { status: 500 });
  }
}
