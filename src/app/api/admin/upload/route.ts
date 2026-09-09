import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { checkIsAdminAuthenticated } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = checkIsAdminAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Chưa đăng nhập hoặc phiên hết hạn' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy tệp ảnh tải lên' }, { status: 400 });
    }

    // Kiểm tra định dạng tệp
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Chỉ chấp nhận tệp hình ảnh định dạng JPG, PNG hoặc WEBP' },
        { status: 400 }
      );
    }

    // Giới hạn 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'Dung lượng ảnh vượt quá 10MB. Vui lòng chọn ảnh nhỏ hơn!' },
        { status: 400 }
      );
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Đặt tên tệp an toàn
    const ext = path.extname(file.name) || '.jpg';
    const cleanBaseName = path
      .basename(file.name, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '')
      .toLowerCase();
    const fileName = `pallet-${Date.now()}-${cleanBaseName.slice(0, 30)}${ext}`;
    const filePath = path.join(uploadsDir, fileName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/products/${fileName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName,
      size: file.size,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tải ảnh lên', details: String(error) }, { status: 500 });
  }
}
