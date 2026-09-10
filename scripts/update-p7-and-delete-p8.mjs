import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('--- 1. Xóa sản phẩm p8 (Pallet cũ) khỏi Supabase Database ---');
  const { error: delError } = await supabase
    .from('products')
    .delete()
    .eq('id', 'p8');

  if (delError) {
    console.error('Lỗi khi xóa p8 trên Supabase:', delError.message);
  } else {
    console.log('✓ Đã xóa thành công sản phẩm p8 khỏi Supabase Database!');
  }

  console.log('\n--- 2. Lấy danh sách ảnh p4 để gán cho p7 ---');
  const srcImgDir = path.join(process.cwd(), 'src', 'images', 'products');
  const files = ['p4.1.jpg', 'p4.2.jpg', 'p4.3.jpg'];
  const uploadedUrls = [];

  for (const file of files) {
    const srcPath = path.join(srcImgDir, file);
    if (fs.existsSync(srcPath)) {
      const buffer = fs.readFileSync(srcPath);
      const storageKey = `products/p7/${file}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(storageKey, buffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        console.warn(`Lỗi upload ảnh ${file} sang p7:`, error.message);
        uploadedUrls.push(`/images/products/${file}`);
      } else {
        const { data: publicData } = supabase.storage
          .from('product-images')
          .getPublicUrl(storageKey);
        console.log(`✓ Đã upload ${file} -> ${publicData.publicUrl}`);
        uploadedUrls.push(publicData.publicUrl);
      }
    }
  }

  const finalGallery = [...uploadedUrls, '/images/banner_main.png'];
  const mainImage = uploadedUrls[0] || '/images/products/p4.1.jpg';

  console.log('\n--- 3. Cập nhật sản phẩm p7 trên Supabase ---');
  const { data: currentP7Data } = await supabase
    .from('products')
    .select('*')
    .eq('id', 'p7')
    .single();

  const updatedP7 = {
    ...(currentP7Data || {}),
    id: 'p7',
    slug: 'pallet-go-dong-theo-yeu-cau',
    name: 'Gia Công Pallet Gỗ Đóng Theo Bản Vẽ & Kích Thước Riêng',
    category: 'Pallet Đóng Theo Yêu Cầu',
    categorySlug: 'pallet-theo-yeu-cau',
    dimensions: 'Kích thước theo bản vẽ kỹ thuật',
    woodType: 'Gỗ Tràm / Thông / Ván ép theo lựa chọn',
    materialGroup: 'go-thong',
    targetMarket: 'noi-dia',
    staticLoad: 'Tùy biến theo yêu cầu',
    dynamicLoad: 'Tùy biến theo yêu cầu',
    specification: 'Sản xuất chuẩn xác dung sai ±2mm',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Liên hệ',
    description: 'Xưởng Trường An nhận đóng mọi quy cách pallet theo bản vẽ: 2 hướng nâng, 4 hướng nâng, đố bằng, đố khoét, mặt kín, mặt thưa, pallet gù... Tư vấn kết cấu chịu tải tối ưu chi phí cho doanh nghiệp.',
    highlights: [
      'Nhận đóng cả đơn hàng nhỏ lẻ lẫn đơn hàng dự án số lượng lớn',
      'Thiết kế mẫu chạy thử nghiệm thực tế trước khi chốt đơn',
      'Khử trùng sấy HT chuẩn ISPM 15 cho các đơn hàng xuất khẩu',
      'Giao hàng đúng tiến độ hẹn, bảo hành đổi trả nếu sai quy cách'
    ],
    imageUrl: mainImage,
    gallery: finalGallery,
    usagePurpose: 'Đóng gói hàng hóa xuất khẩu, kê hàng kho bãi, nâng hạ theo tiêu chuẩn riêng',
    badges: ['THEO BẢN VẼ RIÊNG', 'LÊN MẪU 24 GIỜ'],
    facebookProof: {
      title: 'Gia công pallet phi tiêu chuẩn cho nhà xưởng',
      description: 'Nhận đóng mọi quy cách kích thước lẻ và thiết kế mẫu trước cho khách hàng.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    },
    updated_at: new Date().toISOString()
  };

  const { error: upsertError } = await supabase
    .from('products')
    .upsert(updatedP7, { onConflict: 'id' });

  if (upsertError) {
    console.error('Lỗi khi cập nhật p7:', upsertError.message);
  } else {
    console.log('✓ Đã cập nhật thành công p7 trên Supabase!');
  }

  console.log('\n--- 4. Cập nhật local file src/data/products.json ---');
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const list = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    // Lọc bỏ p8 và cập nhật p7
    const filtered = list
      .filter(item => item.id !== 'p8')
      .map(item => item.id === 'p7' ? updatedP7 : item);

    fs.writeFileSync(jsonPath, JSON.stringify(filtered, null, 2), 'utf-8');
    console.log('✓ Đã xóa p8 và cập nhật p7 trong src/data/products.json');
  }
}

run();
