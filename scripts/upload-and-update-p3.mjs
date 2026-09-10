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

  const files = ['p3.1.jpg', 'p3.2.jpg', 'p3.3.jpg'];
  const uploadedUrls = [];

  console.log('--- Đang copy và upload 3 ảnh p3 lên Supabase Storage bucket product-images ---');
  for (const file of files) {
    const srcPath = path.join(srcImgDir, file);
    const pubPath = path.join(pubImgDir, file);

    if (fs.existsSync(srcPath)) {
      // Copy to public folder
      fs.copyFileSync(srcPath, pubPath);

      // Upload to Supabase Storage
      const buffer = fs.readFileSync(srcPath);
      const storageKey = `products/p3/${file}`;

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
  const mainImage = uploadedUrls[0] || '/images/products/p3.1.jpg';

  const productP3 = {
    id: 'p3',
    slug: 'pallet-go-thong-moi-xuat-khau-chuan-my-1219x1016',
    name: 'Pallet Gỗ Thông Mới 100% Xuất Khẩu Chuẩn Mỹ GMA (1219 x 1016 x 140 mm)',
    category: 'Pallet Gỗ Thông & Tràm Mới',
    categorySlug: 'pallet-go-moi',
    dimensions: '1219 x 1016 x 140 mm (±5mm) - Chuẩn 48x40 inch',
    woodType: 'Gỗ Thông mới 100% xẻ sấy sáng đẹp',
    materialGroup: 'go-thong',
    targetMarket: 'xuat-khau-my',
    staticLoad: '2.500 - 3.000 kg',
    dynamicLoad: '1.200 - 1.500 kg',
    specification: 'Kích thước chuẩn xuất Mỹ GMA (1219x1016x140mm), nan đố dày dặn liên kết đinh xoắn, nâng 4 hướng',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Giá tại xưởng (Liên hệ)',
    description: 'Lô pallet gỗ thông mới 100% quy cách chuẩn 1219 x 1016 x 140mm (chuẩn 48 x 40 inch GMA) chuyên dụng cho các doanh nghiệp đóng hàng container xuất khẩu sang thị trường Mỹ, châu Âu và quốc tế. Gỗ thông mới xẻ sấy đạt độ ẩm dưới 20%, vân gỗ sáng đẹp, liên kết đinh xoắn chắc chắn, khả năng chịu lực va đập cao. Sản phẩm được hỗ trợ đầy đủ chứng từ hun trùng, xử lý nhiệt HT theo tiêu chuẩn ISPM 15 giúp khách hàng thông quan dễ dàng, giá cạnh tranh trực tiếp từ xưởng Trường An.',
    highlights: [
      'Kích thước chuẩn 48 x 40 inch (1219 x 1016 x 140 mm) chuyên đóng container xuất khẩu thị trường Mỹ',
      'Chất liệu gỗ thông mới 100% sáng đẹp, xử lý sấy đạt độ ẩm dưới 20% chống ẩm mốc',
      'Hỗ trợ xử lý nhiệt HT và cấp chứng thư hun trùng ISPM 15 đầy đủ mộc dấu xuất khẩu',
      'Gia công chuẩn quy cách, chịu tải trọng tĩnh lên đến 3.000 kg',
      'Giá gốc cạnh tranh nhất thị trường từ xưởng sản xuất trực tiếp Hóc Môn'
    ],
    imageUrl: mainImage,
    gallery: finalGallery,
    usagePurpose: 'Đóng hàng máy móc, thiết bị điện tử, nông sản, hàng tiêu dùng xuất khẩu sang thị trường Mỹ và quốc tế, lưu kho kệ racking',
    badges: [
      '🇺🇸 Chuẩn Xuất Mỹ',
      'Gỗ Thông Mới 100%',
      'Độ Ẩm < 20%',
      'Sấy HT ISPM 15'
    ],
    facebookProof: {
      title: 'Hoàn thành đơn hàng pallet gỗ thông mới 100% giao khách xuất khẩu',
      description: 'Xưởng Pallet Trường An vừa hoàn thiện và bàn giao lô pallet gỗ thông mới 100% quy cách chuẩn 1219 x 1016 x 140mm độ ẩm dưới 20% kèm chứng từ hun trùng HT ISPM 15 cho khách hàng xuất khẩu.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    },
    updated_at: new Date().toISOString()
  };

  console.log('\n--- Đang cập nhật sản phẩm p3 lên Supabase Database ---');
  const { data, error } = await supabase
    .from('products')
    .upsert(productP3, { onConflict: 'id' });

  if (error) {
    console.error('Lỗi khi cập nhật sản phẩm lên Supabase:', error.message);
  } else {
    console.log('✓ Cập nhật thành công sản phẩm p3 lên Supabase Database (được ghim lên vị trí số 1 đầu tiên)!');
  }

  // Cập nhật cả file local products.json để đồng bộ
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const updated = currentList.map(item => item.id === 'p3' ? productP3 : item);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('✓ Đã đồng bộ vào file local src/data/products.json');
  }
}

run();
