import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://rjjzuojpbtabzmqlxizx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqanp1b2pwYnRhYnptcWx4aXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODgxNjEsImV4cCI6MjEwNDU2NDE2MX0.EojgzaFGZ_ECmAYoqaLqyNPIfYj0H5l2HJskFcdN6gs';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const imgDir = path.join(process.cwd(), 'src', 'images', 'products');
  const files = ['p1.1.jpg', 'p1.2.jpg', 'p1.3.jpg', 'p1.4.jpg'];
  const uploadedUrls = [];

  console.log('--- Đang upload ảnh lên Supabase Storage bucket product-images ---');
  for (const file of files) {
    const filePath = path.join(imgDir, file);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      const storageKey = `products/p1/${file}`;
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(storageKey, buffer, {
          contentType: 'image/jpeg',
          upsert: true,
        });

      if (error) {
        console.warn(`Lỗi upload ảnh ${file} lên Supabase Storage:`, error.message);
        // Dùng đường dẫn local public
        uploadedUrls.push(`/images/products/${file}`);
      } else {
        const { data: publicData } = supabase.storage
          .from('product-images')
          .getPublicUrl(storageKey);
        console.log(`✓ Đã upload ${file} -> ${publicData.publicUrl}`);
        uploadedUrls.push(publicData.publicUrl);
      }
    } else {
      uploadedUrls.push(`/images/products/${file}`);
    }
  }

  const mainImage = uploadedUrls[0] || '/images/products/p1.1.jpg';

  const productP1 = {
    id: 'p1',
    slug: 'pallet-do-van-ep-xuat-khau-campuchia-1000x1200',
    name: 'Pallet Đố Ván Ép Xuất Khẩu Campuchia (1000 x 1200 x 140 mm)',
    category: 'Pallet Ván Ép (Plywood)',
    categorySlug: 'pallet-van-ep',
    dimensions: '1000 x 1200 x 140 mm',
    woodType: 'Ván ép Plywood công nghiệp cao cấp',
    materialGroup: 'van-ep',
    targetMarket: 'xuat-khau-campuchia',
    staticLoad: '1.500 - 2.000 kg',
    dynamicLoad: '1.000 - 1.200 kg',
    specification: '4 thanh đố chịu lực (1000x40x100mm), 9 thanh ván mặt (1200x120x20mm), 4 thanh đáy (1200x120x20mm)',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Giá tại xưởng (Liên hệ)',
    description: 'Pallet đố ván ép kích thước 1000 x 1200 x 140mm chuyên dụng đóng hàng xuất khẩu sang thị trường Campuchia và ASEAN. Kết cấu 4 thanh đố gia cường chắc chắn kết hợp 9 nan mặt dày dặn 20mm mang lại khả năng chịu tải vượt trội, bề mặt ván ép phẳng mịn tuyệt đối không làm rách hay hư hại thùng carton bao bì. Chất liệu ván ép Plywood đạt chuẩn xuất khẩu, miễn trừ hun trùng kiểm dịch thực vật theo chuẩn ISPM 15, tối ưu thời gian thông quan.',
    highlights: [
      'Quy cách chuẩn: Mặt 9 thanh (1200x120x20mm), 4 đố (1000x40x100mm), đáy 4 thanh (1200x120x20mm)',
      'Bề mặt ván ép Plywood phẳng mịn, không mắt gỗ, chống ẩm và mối mọt',
      'Miễn trừ thủ tục hun trùng kiểm dịch thực vật ISPM 15 khi thông quan xuất khẩu Campuchia',
      'Kết cấu 4 thanh đố chịu tải cực khỏe, phù hợp xe nâng tay và xe nâng động cơ'
    ],
    imageUrl: mainImage,
    gallery: uploadedUrls,
    usagePurpose: 'Chuyên dùng đóng kiện hàng, thùng carton xuất khẩu sang Campuchia, xếp kho lưu trữ và vận chuyển container',
    badges: [
      '🇰🇭 Xuất Khẩu Campuchia',
      'Ván Ép Chuẩn Xuất',
      'Giá Tận Xưởng'
    ],
    facebookProof: {
      title: 'Lô pallet đố ván ép 1000x1200x140mm xuất khẩu Campuchia',
      description: 'Những lô pallet đố ván ép (9 thanh mặt, 4 thanh đố, 4 thanh đáy) đang được xưởng Pallet Trường An sản xuất và hoàn thiện xuất sang Campuchia. Uy tín – Chất lượng – Đúng tiến độ.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    }
  };

  console.log('\n--- Đang cập nhật sản phẩm p1 lên Supabase Database ---');
  const { data, error } = await supabase
    .from('products')
    .upsert(productP1, { onConflict: 'id' });

  if (error) {
    console.error('Lỗi khi cập nhật sản phẩm lên Supabase:', error.message);
  } else {
    console.log('✓ Cập nhật thành công sản phẩm p1 lên Supabase Database!');
  }

  // Cập nhật cả file local products.json để đồng bộ
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const updated = currentList.map(item => item.id === 'p1' ? productP1 : item);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('✓ Đã đồng bộ vào file local src/data/products.json');
  }
}

run();
