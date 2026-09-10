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

  const files = ['p5.1.jpg', 'p5.2.jpg', 'p5.3.jpg', 'p5.4.jpg', 'p5.5.jpg', 'p5.6.jpg', 'p5.7.jpg'];
  const uploadedUrls = [];

  console.log('--- Đang copy và upload 7 ảnh p5 lên Supabase Storage bucket product-images ---');
  for (const file of files) {
    const srcPath = path.join(srcImgDir, file);
    const pubPath = path.join(pubImgDir, file);

    if (fs.existsSync(srcPath)) {
      // Copy to public folder
      fs.copyFileSync(srcPath, pubPath);

      // Upload to Supabase Storage
      const buffer = fs.readFileSync(srcPath);
      const storageKey = `products/p5/${file}`;

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
  const mainImage = uploadedUrls[0] || '/images/products/p5.1.jpg';

  const productP5 = {
    id: 'p5',
    slug: 'pallet-go-chan-gu-chuan-4-huong-nang-1219x1016',
    name: 'Pallet Gỗ Chân Gù Chuẩn 4 Hướng Nâng (1219 x 1016 x 140 mm)',
    category: 'Pallet Gỗ Thông & Tràm Mới',
    categorySlug: 'pallet-go-moi',
    dimensions: '1219 x 1016 x 140 mm (±5mm) - Chuẩn 48x40 inch',
    woodType: 'Gỗ Thông / Gỗ Tràm xẻ sấy cao cấp',
    materialGroup: 'go-thong',
    targetMarket: 'xuat-khau-ispm15',
    staticLoad: '2.500 - 3.500 kg',
    dynamicLoad: '1.200 - 1.800 kg',
    specification: 'Pallet chân gù 4 hướng nâng: 9 khối gù (4 gù góc 190.5x127x90mm, 5 gù 95x127x90mm), 3 ván gánh (1219x127x17.5mm)',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Giá tại xưởng (Liên hệ)',
    description: 'Dòng pallet chân gù (Block Pallet 4-Way) kích thước chuẩn 1219 x 1016 x 140mm (48x40 inch) được hoàn thiện để trình mẫu thực tế cho đối tác doanh nghiệp kiểm tra độ chịu tải và kết cấu. Cung cấp 2 phiên bản: Gỗ Thông xẻ sấy (sáng đẹp, nhẹ, chuẩn xuất khẩu) và Gỗ Tràm tự nhiên (cứng cáp, chịu tải va đập cực khỏe, tối ưu chi phí). Cấu tạo 9 khối gù liên kết đinh xoắn chắc chắn, cho phép xe nâng tay và xe nâng động cơ thao tác linh hoạt từ cả 4 phía. Xưởng cam kết tính toán tải trọng chuẩn xác, không làm hàng mỏng yếu kém an toàn.',
    highlights: [
      'Kết cấu pallet chân gù (9 khối gù chịu lực) chịu tải trọng tĩnh lên tới 3.500 kg, nâng 4 hướng tuyệt đối',
      'Cung cấp 2 tùy chọn chất liệu: Gỗ Thông (xuất khẩu thẩm mỹ cao) và Gỗ Tràm (chịu lực cực khỏe)',
      'Quy cách chuẩn: Ván gánh 3 thanh (1219x127x17.5mm), nan mặt & đáy dày dặn 17.5mm',
      'Đầy đủ tiêu chuẩn xử lý sấy nhiệt HT & hun trùng kiểm dịch ISPM 15 xuất khẩu container',
      'Hỗ trợ test tải trọng thực tế tận kho và điều chỉnh quy cách theo đúng yêu cầu của khách hàng'
    ],
    imageUrl: mainImage,
    gallery: finalGallery,
    usagePurpose: 'Lưu trữ kho tự động, xếp pallet kệ racking đa tầng, đóng hàng container xuất khẩu đi Mỹ, châu Âu và đóng gói công nghiệp nặng',
    badges: [
      'Chân Gù 4 Hướng',
      'Gỗ Thông & Tràm',
      'Chịu Tải 3.5 Tấn',
      'Sấy HT ISPM 15'
    ],
    facebookProof: {
      title: 'Pallet mẫu chân gù 1219x1016mm – Trình quý đối tác kiểm tra thực tế',
      description: 'Hoàn thiện pallet mẫu chân gù kết cấu 9 khối gù chịu lực vững chãi (2 dòng gỗ thông và gỗ tràm) sẵn sàng test tải thực tế và chốt đơn hàng số lượng lớn.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    },
    updated_at: new Date().toISOString()
  };

  console.log('\n--- Đang cập nhật sản phẩm p5 lên Supabase Database ---');
  const { data, error } = await supabase
    .from('products')
    .upsert(productP5, { onConflict: 'id' });

  if (error) {
    console.error('Lỗi khi cập nhật sản phẩm lên Supabase:', error.message);
  } else {
    console.log('✓ Cập nhật thành công sản phẩm p5 lên Supabase Database (được ghim lên vị trí số 1 đầu tiên)!');
  }

  // Cập nhật cả file local products.json để đồng bộ
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const updated = currentList.map(item => item.id === 'p5' ? productP5 : item);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('✓ Đã đồng bộ vào file local src/data/products.json');
  }
}

run();
