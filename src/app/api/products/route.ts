import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, saveProduct } from '@/lib/products-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const q = searchParams.get('q');

    let products = await getAllProducts();

    if (category && category !== 'all') {
      products = products.filter((p) => p.categorySlug === category);
    }

    if (q) {
      const lower = q.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.dimensions.toLowerCase().includes(lower) ||
          p.woodType.toLowerCase().includes(lower) ||
          (p.badges && p.badges.some((b) => b.toLowerCase().includes(lower)))
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể đọc danh sách sản phẩm', details: String(error) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.name || !body.categorySlug) {
      return NextResponse.json({ error: 'Vui lòng điền tên sản phẩm và chọn danh mục' }, { status: 400 });
    }

    const saved = await saveProduct(body);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể lưu sản phẩm', details: String(error) }, { status: 500 });
  }
}
