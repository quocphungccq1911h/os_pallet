import { NextRequest, NextResponse } from 'next/server';
import { getProductById, saveProduct, deleteProduct } from '@/lib/products-store';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id);
    if (!product) {
      return NextResponse.json({ error: 'Không tìm thấy sản phẩm' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy chi tiết sản phẩm', details: String(error) }, { status: 500 });
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
    const updated = await saveProduct({ ...body, id: params.id });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Không thể cập nhật sản phẩm', details: String(error) }, { status: 500 });
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

    const success = await deleteProduct(params.id);
    if (!success) {
      return NextResponse.json({ error: 'Không tìm thấy sản phẩm cần xóa' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Xóa sản phẩm thành công', id: params.id });
  } catch (error) {
    return NextResponse.json({ error: 'Không thể xóa sản phẩm', details: String(error) }, { status: 500 });
  }
}
