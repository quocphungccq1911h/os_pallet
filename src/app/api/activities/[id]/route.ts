import { NextRequest, NextResponse } from 'next/server';
import { getActivityById, saveActivity, deleteActivity } from '@/lib/activities-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const activity = await getActivityById(params.id);
    if (!activity) {
      return NextResponse.json({ error: 'Không tìm thấy hoạt động xưởng' }, { status: 404 });
    }
    return NextResponse.json(activity);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy chi tiết hoạt động', details: String(error) }, { status: 500 });
  }
}

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
    const updated = await saveActivity({ ...body, id: params.id });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể cập nhật hoạt động', details: String(error) }, { status: 500 });
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

    const success = await deleteActivity(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Không tìm thấy hoạt động cần xóa' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Xóa hoạt động thành công', id: params.id });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa hoạt động', details: String(error) }, { status: 500 });
  }
}
