import { NextRequest, NextResponse } from 'next/server';
import { getAllQuotes, saveQuote } from '@/lib/quotes-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const quotes = await getAllQuotes();
    return NextResponse.json(quotes);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc danh sách báo giá' }, { status: 500 });
  }
}

// Khách hàng gửi form từ website (không cần auth)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.phone || !body.customerName) {
      return NextResponse.json({ error: 'Vui lòng cung cấp họ tên và số điện thoại' }, { status: 400 });
    }

    const saved = await saveQuote(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu yêu cầu báo giá' }, { status: 500 });
  }
}
