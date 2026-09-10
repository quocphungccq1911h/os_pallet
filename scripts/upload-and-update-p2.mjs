import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const srcImgDir = path.join(process.cwd(), 'src', 'images', 'products');
  const pubImgDir = path.join(process.cwd(), 'public', 'images', 'products');
  fs.mkdirSync(pubImgDir, { recursive: true });

  const files = ['p2.1.jpg', 'p2.2.jpg', 'p2.3.jpg', 'p2.4.jpg', 'p2.5.jpg', 'p2.6.jpg', 'p2.7.jpg'];
  const uploadedUrls = [];

  console.log('--- Đang copy và upload 7 ảnh p2 lên Supabase Storage bucket product-images ---');
  for (const file of files) {
    const srcPath = path.join(srcImgDir, file);
    const pubPath = path.join(pubImgDir, file);

    if (fs.existsSync(srcPath)) {
      // Copy to public folder
      fs.copyFileSync(srcPath, pubPath);

      // Upload to Supabase Storage
      const buffer = fs.readFileSync(srcPath);
      const storageKey = `products/p2/${file}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(storageKey, buffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        console.warn(`Lỗi upload ảnh ${file} lên Supabase Storage:`, error.message);
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

  // Thêm banner_main.png ở cuối
  const finalGallery = [...uploadedUrls, '/images/banner_main.png'];
  const mainImage = uploadedUrls[0] || '/images/products/p2.1.jpg';

  const productP2 = {
    id: 'p2',
    slug: 'pallet-go-thong-do-khuyet-xuat-khau-ispm15-1200x1000',
    name: 'Pallet Gỗ Thông Đố Khuyết Xuất Khẩu ISPM 15 (1200 x 1000 x 120 mm)',
    category: 'Pallet Gỗ Thông & Tràm Mới',
    categorySlug: 'pallet-go-moi',
    dimensions: '1200 x 1000 x 120 mm (±5mm)',
    woodType: 'Gỗ Thông xẻ sấy cao cấp',
    materialGroup: 'go-thong',
    targetMarket: 'xuat-khau-ispm15',
    staticLoad: '2.000 - 2.500 kg',
    dynamicLoad: '1.000 - 1.500 kg',
    specification: 'Đố khoét khuyết 4 hướng nâng (1200x38x88.9mm, 3 thanh), nan mặt 7 thanh (1000x100x17mm), nan đáy 4 thanh (1000x100x17mm)',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Giá tại xưởng (Liên hệ)',
    description: 'Dòng pallet đố khuyết gỗ thông xẻ sấy cao cấp đã được trình mẫu thành công và chốt deal xuất khẩu cùng đối tác doanh nghiệp. Thiết kế đố khoét khuyết 4 hướng nâng linh hoạt cho xe nâng máy và xe nâng tay, gỗ thông ngoại nhập sấy đạt độ ẩm tiêu chuẩn < 18%, xử lý khử trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư xuất khẩu quốc tế. Kết cấu vững chãi, các mối ghép đinh xoắn chắc chắn, khả năng chịu tải hàng hóa nặng khi đóng container.',
    highlights: [
      'Quy cách chuẩn: Mặt 7 thanh (1000x100x17mm), 3 đố khoét khuyết (1200x38x88.9mm), đáy 4 thanh (1000x100x17mm)',
      'Chất liệu gỗ thông xẻ sấy chọn lọc, hạn chế cong vênh, chống mối mọt và nấm mốc',
      'Khử trùng nhiệt HT đạt chuẩn xuất khẩu ISPM 15, đầy đủ mộc dấu thông quan',
      'Thiết kế đố khuyết nâng 4 hướng tiện lợi cho cả xe nâng tay và xe nâng động cơ',
      'Đã được đối tác kiểm tra thực tế, đánh giá chất lượng cao và chốt deal số lượng lớn'
    ],
    imageUrl: mainImage,
    gallery: finalGallery,
    usagePurpose: 'Đóng hàng xuất khẩu container đường biển/đường hàng không, bốc dỡ kho vận logistics, lưu trữ pallet trên kệ racking',
    badges: [
      '🌲 Gỗ Thông Xẻ Sấy',
      'Sấy HT ISPM 15',
      'Nâng 4 Hướng',
      'Đã Chốt Deal'
    ],
    facebookProof: {
      title: 'Trình mẫu thành công & chính thức chốt deal đơn hàng pallet đố khuyết gỗ thông',
      description: 'Sau quá trình trao đổi, sản xuất mẫu và kiểm tra thực tế đạt chuẩn ISPM 15, Pallet Trường An đã hoàn tất trình mẫu và nhận được đánh giá cao từ đối tác, chính thức chốt hợp đồng cung ứng số lượng lớn.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    },
    updated_at: new Date().toISOString()
  };

  console.log('\n--- Đang cập nhật sản phẩm p2 lên Supabase Database ---');
  const { data, error } = await supabase
    .from('products')
    .upsert(productP2, { onConflict: 'id' });

  if (error) {
    console.error('Lỗi khi cập nhật sản phẩm lên Supabase:', error.message);
  } else {
    console.log('✓ Cập nhật thành công sản phẩm p2 lên Supabase Database (được ghim lên đầu tiên nhờ updated_at mới nhất)!');
  }

  // Cập nhật cả file local products.json để đồng bộ
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const updated = currentList.map(item => item.id === 'p2' ? productP2 : item);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('✓ Đã đồng bộ vào file local src/data/products.json');
  }
}

run();
