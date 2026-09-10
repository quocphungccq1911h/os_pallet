import { NextRequest, NextResponse } from 'next/server';
import { getAllActivities, saveActivity } from '@/lib/activities-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    let activities = await getAllActivities();

    if (category && category !== 'all') {
      activities = activities.filter((a) => a.category === category);
    }

    if (q) {
      const lower = q.toLowerCase();
      activities = activities.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.summary.toLowerCase().includes(lower) ||
          (a.customerLocation && a.customerLocation.toLowerCase().includes(lower)) ||
          (a.badges && a.badges.some((b) => b.toLowerCase().includes(lower)))
      );
    }

    return NextResponse.json(activities);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc danh sách hoạt động xưởng', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title) {
      return NextResponse.json({ error: 'Vui lòng nhập tiêu đề hoạt động' }, { status: 400 });
    }

    const saved = await saveActivity(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu hoạt động', details: String(error) }, { status: 500 });
  }
}
