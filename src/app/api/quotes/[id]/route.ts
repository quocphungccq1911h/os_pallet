import { NextRequest, NextResponse } from 'next/server';
import { saveQuote, deleteQuote } from '@/lib/quotes-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const body = await request.json();
    const updated = await saveQuote({ ...body, id: params.id });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể cập nhật báo giá' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const success = await deleteQuote(params.id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa báo giá' }, { status: 500 });
  }
}
