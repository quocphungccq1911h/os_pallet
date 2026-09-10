const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// Đọc biến môi trường từ .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...vals] = trimmed.split('=');
      if (key && vals.length > 0 && !process.env[key]) {
        process.env[key] = vals.join('=');
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const s = createClient(supabaseUrl, supabaseAnonKey);

const newAct = {
  id: 'act2',
  slug: 'hoan-thien-mau-pallet-go-thong-1000x1200-xuat-khau-vip',
  title: 'Hoàn Thiện Mẫu Pallet Gỗ Thông 1000 x 1200 x 150mm VIP Trình Khách Hàng Xuất Khẩu',
  category: 'trinh-mau',
  summary: 'Sáng nay xưởng Pallet Trường An đã hoàn tất gia công mẫu pallet gỗ thông 1000 x 1200 x 150mm VIP chuẩn xuất khẩu đường biển, sẵn sàng trình quý đối tác kiểm tra thực tế trước khi triển khai đơn hàng số lượng lớn.',
  content: `Sáng nay, xưởng **Pallet Trường An** đã hoàn thiện mẫu pallet gỗ thông kích thước **1000 x 1200 x 150mm dòng VIP** để trình khách hàng kiểm tra thực tế trước khi chính thức triển khai đơn hàng xuất khẩu số lượng lớn 🚢.

Với bên em, mỗi đơn hàng không chỉ là sản phẩm – mà là cam kết về chất lượng và uy tín tuyệt đối với đối tác!

### 🔍 Từng chi tiết của mẫu đều được xưởng kiểm soát chặt chẽ:
- **Chọn lọc gỗ thông đạt chuẩn:** 100% gỗ thông mới xẻ sấy, vân gỗ sáng đẹp, đảm bảo độ bền cơ học và độ ổn định cao khi lưu kho dài ngày.
- **Gia công đúng quy cách:** Từng thanh nan, đố chịu lực được cắt gọt chuẩn xác với sai số cực thấp (±2mm).
- **Kết cấu kiên cố:** Đóng đinh xoắn chuyên dụng chống bung nứt, chịu tải trọng tĩnh và động vượt trội trong suốt hành trình vận chuyển container đường biển.
- **Hoàn thiện sạch sẽ:** Bề mặt được bào nhẵn mịn, xử lý góc cạnh an toàn, đáp ứng đầy đủ tiêu chuẩn kiểm dịch thực vật xuất khẩu ISPM 15.

### 🎯 Ý nghĩa của việc trình mẫu thực tế tại Pallet Trường An:
Việc làm mẫu trước không chỉ để “xem thử”, mà là để khách hàng:
1. **Kiểm chứng chất lượng thật:** Đo đạc kích thước thực tế, sờ tận tay chất gỗ và kiểm tra độ vững chắc.
2. **Thử tải thực tế trên hàng hóa:** Đặt thử sản phẩm/máy móc lên pallet và test nâng hạ xe nâng trước khi sản xuất hàng loạt.
3. **Hoàn toàn an tâm về tiến độ:** Nắm rõ năng lực gia công thực tế của xưởng để tự tin ký hợp đồng lớn.

Bên em hiểu rằng, với hàng xuất khẩu, **uy tín – tiến độ – chất lượng** là yếu tố sống còn. Vì vậy, mỗi pallet xuất xưởng đều là sự đảm bảo để Quý khách hàng có thể tin tưởng đồng hành lâu dài.

---
🤝 **Anh/Chị cần đối tác sản xuất pallet chuyên nghiệp, làm mẫu nhanh – đúng chuẩn – giá cạnh tranh tận xưởng, Pallet Trường An luôn sẵn sàng đồng hành!**`,
  images: [
    'https://rjjzuojpbtabzmqlxizx.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg',
    'https://rjjzuojpbtabzmqlxizx.supabase.co/storage/v1/object/public/product-images/activities/a1.2.jpg',
    'https://rjjzuojpbtabzmqlxizx.supabase.co/storage/v1/object/public/product-images/activities/a1.3.jpg',
    'https://rjjzuojpbtabzmqlxizx.supabase.co/storage/v1/object/public/product-images/activities/a1.4.jpg',
    'https://rjjzuojpbtabzmqlxizx.supabase.co/storage/v1/object/public/product-images/activities/a1.5.jpg'
  ],
  customerLocation: 'TP. Hồ Chí Minh & Cảng Cát Lái',
  clientType: 'Doanh nghiệp sản xuất & xuất khẩu đường biển',
  publishedAt: '2026-09-10',
  badges: [
    'Trình Mẫu VIP',
    'Gỗ Thông Chọn Lọc',
    'Chuẩn Xuất Khẩu Tàu Biển',
    'Độ Bền Cao'
  ],
  highlights: [
    'Chọn lọc gỗ thông mới đạt chuẩn, vân sáng đẹp, bền chắc',
    'Gia công chuẩn xác từng nan đố, sai số cực thấp',
    'Kết cấu kiên cố, chịu tải nặng vận chuyển đường biển',
    'Trình mẫu thực tế trước khi chốt đơn hàng loạt',
    'Hỗ trợ chứng thư hun trùng ISPM 15 chuẩn quốc tế'
  ],
  fbUrl: 'https://www.facebook.com/pallet.truongan',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

async function run() {
  console.log('Đang đồng bộ act2 lên Supabase Database...');
  const { createdAt, updatedAt, ...cleanAct } = newAct;
  const { data, error } = await s.from('activities').upsert({
    ...cleanAct,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });

  if (error) {
    console.error('❌ Lỗi Supabase:', error);
  } else {
    console.log('✅ Đã lưu act2 lên Supabase Database!');
  }

  // Backup to local activities.json
  const jsonPath = path.join(__dirname, '..', 'src', 'data', 'activities.json');
  let current = [];
  try {
    current = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  } catch {}
  current = current.filter((a) => a.id !== newAct.id);
  current = [newAct, ...current];
  fs.writeFileSync(jsonPath, JSON.stringify(current, null, 2), 'utf8');
  console.log('✅ Đã backup act2 vào src/data/activities.json!');
}

run();
