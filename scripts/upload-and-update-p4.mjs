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

  const files = ['p4.1.jpg', 'p4.2.jpg', 'p4.3.jpg'];
  const uploadedUrls = [];

  console.log('--- Đang copy và upload 3 ảnh p4 lên Supabase Storage bucket product-images ---');
  for (const file of files) {
    const srcPath = path.join(srcImgDir, file);
    const pubPath = path.join(pubImgDir, file);

    if (fs.existsSync(srcPath)) {
      // Copy to public folder
      fs.copyFileSync(srcPath, pubPath);

      // Upload to Supabase Storage
      const buffer = fs.readFileSync(srcPath);
      const storageKey = `products/p4/${file}`;

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
  const mainImage = uploadedUrls[0] || '/images/products/p4.1.jpg';

  const productP4 = {
    id: 'p4',
    slug: 'pallet-go-xuat-khau-kich-thuoc-lon-1400x1100',
    name: 'Pallet Gỗ Xuất Khẩu Kích Thước Lớn (1400 x 1100 x 140 mm)',
    category: 'Pallet Đóng Theo Yêu Cầu',
    categorySlug: 'pallet-theo-yeu-cau',
    dimensions: '1400 x 1100 x 140 mm (±5 mm)',
    woodType: 'Gỗ Thông / Gỗ Tràm mới xẻ sấy',
    materialGroup: 'go-thong',
    targetMarket: 'xuat-khau-ispm15',
    staticLoad: '2.500 - 3.500 kg',
    dynamicLoad: '1.200 - 1.800 kg',
    specification: 'Kích thước khổ lớn 1400x1100mm, đố chịu lực dày dặn liên kết đinh xoắn, nâng hạ xe nâng máy an toàn',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Giá tại xưởng (Liên hệ)',
    description: 'Pallet gỗ kích thước khổ lớn 1400 x 1100mm chuyên dụng đóng hàng máy móc, thiết bị công nghiệp khổ rộng và hàng hóa cồng kềnh xuất khẩu. Sản phẩm được sản xuất mới 100% từ nguồn gỗ chọn lọc, sấy độ ẩm đạt chuẩn, kết cấu đố giằng chịu lực cực khỏe, đáp ứng yêu cầu tải trọng cao khi cẩu hàng và xếp container. Xưởng Trường An hỗ trợ trọn gói xử lý nhiệt HT, hun trùng đạt tiêu chuẩn kiểm dịch ISPM 15, mộc dấu xuất khẩu đầy đủ và giao hàng nhanh đúng tiến độ sản xuất của khách hàng.',
    highlights: [
      'Quy cách khổ rộng 1400 x 1100 mm gia công chuẩn xác theo yêu cầu kỹ thuật của khách hàng',
      'Chất liệu gỗ mới 100%, nan đố dày dặn chịu tải trọng tĩnh lên tới 3.500 kg',
      'Đáp ứng tiêu chuẩn kiểm dịch thực vật quốc tế ISPM 15 (sấy nhiệt HT / hun trùng thông quan)',
      'Phù hợp đóng hàng máy móc, thiết bị công nghiệp khổ lớn xuất khẩu đường biển',
      'Xưởng sản xuất trực tiếp Hóc Môn, giá cạnh tranh, đáp ứng nhanh đơn hàng số lượng lớn'
    ],
    imageUrl: mainImage,
    gallery: finalGallery,
    usagePurpose: 'Đóng gói máy móc thiết bị khổ rộng, hàng công nghiệp nặng, bốc xếp cẩu hàng và đóng container xuất khẩu',
    badges: [
      'Khổ Rộng 1.4m',
      'Đóng Theo Yêu Cầu',
      'Chịu Tải 3.5 Tấn',
      'Sấy HT ISPM 15'
    ],
    facebookProof: {
      title: 'Hoàn thành đơn hàng pallet gỗ 1.400 x 1.100 mm giao khách xuất khẩu',
      description: 'Pallet Trường An vừa hoàn thiện và bàn giao thành công lô pallet gỗ kích thước 1.400 x 1.100 mm theo đúng quy cách yêu cầu, đạt chuẩn ISPM 15 phục vụ đóng hàng xuất khẩu cho đối tác.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn/'
    },
    updated_at: new Date().toISOString()
  };

  console.log('\n--- Đang cập nhật sản phẩm p4 lên Supabase Database ---');
  const { data, error } = await supabase
    .from('products')
    .upsert(productP4, { onConflict: 'id' });

  if (error) {
    console.error('Lỗi khi cập nhật sản phẩm lên Supabase:', error.message);
  } else {
    console.log('✓ Cập nhật thành công sản phẩm p4 lên Supabase Database (được ghim lên vị trí số 1 đầu tiên)!');
  }

  // Cập nhật cả file local products.json để đồng bộ
  const jsonPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (fs.existsSync(jsonPath)) {
    const currentList = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const updated = currentList.map(item => item.id === 'p4' ? productP4 : item);
    fs.writeFileSync(jsonPath, JSON.stringify(updated, null, 2), 'utf-8');
    console.log('✓ Đã đồng bộ vào file local src/data/products.json');
  }
}

run();
