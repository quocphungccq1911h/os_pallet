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
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function execute() {
  console.log('--- 1. UPLOAD 6 ẢNH P6 LÊN SUPABASE STORAGE ---');
  const sourceDir = path.join(__dirname, '..', 'public', 'images', 'products');
  const imgNames = ['p6.1.jpg', 'p6.2.jpg', 'p6.3.jpg', 'p6.4.jpg', 'p6.5.jpg', 'p6.6.jpg'];
  const productCdnUrls = [];
  const activityCdnUrls = [];

  for (const name of imgNames) {
    const filePath = path.join(sourceDir, name);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      
      // Upload vào products/
      const pPath = 'products/' + name;
      await supabase.storage.from('product-images').upload(pPath, buffer, { contentType: 'image/jpeg', upsert: true });
      const { data: pData } = supabase.storage.from('product-images').getPublicUrl(pPath);
      productCdnUrls.push(pData.publicUrl);
      console.log('✅ Uploaded to products:', name);

      // Upload vào activities/
      const aPath = 'activities/' + name;
      await supabase.storage.from('product-images').upload(aPath, buffer, { contentType: 'image/jpeg', upsert: true });
      const { data: aData } = supabase.storage.from('product-images').getPublicUrl(aPath);
      activityCdnUrls.push(aData.publicUrl);
      console.log('✅ Uploaded to activities:', name);
    }
  }

  console.log('\n--- 2. CẬP NHẬT SẢN PHẨM P6 (THÙNG GỖ / KIỆN GỖ) ---');
  const updatedP6 = {
    id: 'p6',
    slug: 'thung-go-kien-go-dong-hang-xuat-khau-lap-rap-tan-noi',
    name: 'Thùng Gỗ / Kiện Gỗ Đóng Hàng Xuất Khẩu (Dịch Vụ Lắp Ráp Tận Nơi)',
    category: 'Thùng Gỗ / Kiện Gỗ Đóng Hàng',
    categorySlug: 'thung-go-dong-hang',
    dimensions: 'Gia công theo kích thước & bản vẽ máy móc riêng',
    woodType: 'Gỗ Tràm tự nhiên, Gỗ Thông xẻ sấy tuyển chọn',
    materialGroup: 'go-tram',
    targetMarket: 'xuat-khau-ispm15',
    staticLoad: '3.000 - 5.000 kg',
    dynamicLoad: '1.500 - 2.500 kg',
    specification: 'Thùng gỗ nan thưa hoặc nan kín bọc lót bảo vệ máy móc, bắn đinh kiên cố',
    isExportStandard: true,
    isNew: true,
    priceDisplay: 'Liên hệ',
    description: 'Xưởng Pallet Trường An chuyên gia công và lắp ráp tận nơi thùng gỗ, kiện gỗ đóng hàng máy móc, thiết bị công nghiệp xuất khẩu. Đội ngũ thợ mộc mang đầy đủ máy móc, phôi gỗ và vật tư xuống tận xưởng khách hàng để đóng thùng trực tiếp, đảm bảo hoàn thiện nhanh chóng để kịp kéo container ra cảng đúng tiến độ.',
    highlights: [
      'Trực tiếp chở vật tư & thợ mộc xuống lắp ráp tận xưởng khách hàng',
      'Đóng thùng chuẩn theo kích thước từng loại máy móc, chống va đập tuyệt đối',
      'Gia công nhanh thần tốc, đáp ứng các đơn hàng gấp cần xuất trong ngày',
      'Xử lý sấy nhiệt HT và cấp chứng thư khử trùng ISPM 15 an tâm xuất khẩu đường biển',
      'Giá tận xưởng sản xuất trực tiếp tại Hóc Môn, không qua trung gian'
    ],
    imageUrl: productCdnUrls[0] || '/images/products/p6.1.jpg',
    gallery: [...productCdnUrls, '/images/banner_main.png'],
    usagePurpose: 'Bọc lót, đóng kiện bảo vệ máy móc cơ khí, thiết bị công nghiệp xuất khẩu đường biển',
    badges: [
      'LẮP RÁP TẬN NƠI',
      'CHỊU TẢI NẶNG',
      'CHUẨN ISPM 15',
      'XUẤT KHẨU MỸ & EU'
    ],
    facebookProof: {
      title: 'Sáng đầu tuần xuống tận nơi lắp ráp thùng gỗ cho đối tác kịp xuất hàng trong ngày',
      description: 'Đội ngũ Pallet Trường An giao pallet và vật tư xuống xưởng khách hàng, hoàn thiện nhanh để kịp đóng hàng lên container.',
      fbUrl: 'https://www.facebook.com/PalletTruongAn'
    },
    updated_at: new Date().toISOString()
  };

  // Lưu p6 lên Supabase
  const { error: p6Err } = await supabase.from('products').upsert(updatedP6, { onConflict: 'id' });
  if (p6Err) console.error('Lỗi lưu p6 Supabase:', p6Err);
  else console.log('✅ Đã cập nhật sản phẩm p6 lên Supabase Database!');

  // Lưu p6 vào products.json
  const productsJsonPath = path.join(__dirname, '..', 'src', 'data', 'products.json');
  let prods = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));
  prods = prods.map((p) => (p.id === 'p6' ? { ...p, ...updatedP6 } : p));
  fs.writeFileSync(productsJsonPath, JSON.stringify(prods, null, 2), 'utf8');
  console.log('✅ Đã cập nhật p6 vào src/data/products.json!');

  console.log('\n--- 3. TẠO BÀI HOẠT ĐỘNG XƯỞNG ACT3 ---');
  const newAct3 = {
    id: 'act3',
    slug: 'lap-rap-thung-go-tan-noi-kip-dong-hang-container-xuat-khau',
    title: 'Hành Trình Đóng Gói: Xuống Tận Nơi Lắp Ráp Thùng Gỗ Cho Đối Tác Kịp Xuất Hàng Trong Ngày',
    category: 'don-gap',
    summary: 'Sáng đầu tuần, đội ngũ thợ mộc Pallet Trường An trực tiếp xuống xưởng đối tác mang theo pallet và vật tư để lắp ráp thùng gỗ ngay tại chỗ, hoàn thiện thần tốc để kịp đóng hàng lên container xuất khẩu.',
    content: `## HÀNH TRÌNH ĐÓNG GÓI – ĐƯA HÀNG HÓA VIỆT RA THẾ GIỚI 🚢
### SÁNG ĐẦU TUẦN – XUỐNG TẬN NƠI LẮP RÁP THÙNG GỖ CHO ĐỐI TÁC KỊP XUẤT HÀNG TRONG NGÀY

Sáng nay, đội ngũ thợ lành nghề của **Pallet Trường An** đã trực tiếp có mặt tại nhà xưởng của đối tác doanh nghiệp để triển khai dịch vụ đóng gói trọn gói:
- 🚛 **Vận chuyển trực tiếp:** Giao pallet gỗ chịu tải nặng + phôi vách và toàn bộ vật tư đóng gói đến tận xưởng.
- 🔧 **Gia công lắp ráp tại chỗ:** Bắn đinh xoắn, đo ni giằng chống máy móc cố định ngay tại sàn xưởng đối tác.
- ⏱️ **Hoàn thiện thần tốc:** Đóng thùng gỗ kiên cố trong vòng vài giờ để kịp thời gian xe kéo container vào bốc hàng trong ngày.

Doanh nghiệp sản xuất luôn phải chạy đua với deadline đóng hàng và lịch tàu biển liên tục, vì vậy **Pallet Trường An luôn chủ động linh động hỗ trợ tận nơi để khách hàng tuyệt đối không bị trễ tiến độ!**

---

### 🛡️ Không chỉ bán pallet – Chúng tôi giải quyết trọn gói bài toán đóng gói xuất khẩu:
1. **Giao nhanh – Có mặt tận nơi khi cần:** Đội ngũ cơ động sẵn sàng phục vụ các KCN tại TP.HCM, Bình Dương, Long An, Đồng Nai.
2. **Lắp ráp trực tiếp:** Tiết kiệm tối đa thời gian và nhân lực cho khách hàng; doanh nghiệp không cần duy trì đội thợ mộc riêng.
3. **Đóng chuẩn xuất khẩu ISPM 15:** Gỗ được xử lý nhiệt khử trùng đạt chuẩn quốc tế, an tâm tuyệt đối khi vận chuyển đường biển đường dài.
4. **Nhận đơn gấp – Chạy theo tiến độ thực tế:** Chủ động nguồn gỗ phôi và nhân công, sẵn sàng tăng ca đáp ứng đơn hàng khẩn cấp.

---
📞 **Quý doanh nghiệp cần đối tác đóng thùng gỗ, kiện gỗ chuyên nghiệp, hỗ trợ lắp ráp tận nơi giá xưởng – Liên hệ ngay Pallet Trường An để được tư vấn & phục vụ nhanh nhất!**`,
    images: activityCdnUrls.length > 0 ? activityCdnUrls : [
      '/images/activity/p6.1.jpg',
      '/images/activity/p6.2.jpg',
      '/images/activity/p6.3.jpg',
      '/images/activity/p6.4.jpg',
      '/images/activity/p6.5.jpg',
      '/images/activity/p6.6.jpg'
    ],
    customerLocation: 'KCN TP. Hồ Chí Minh & Bình Dương',
    clientType: 'Doanh nghiệp chế tạo thiết bị & máy móc xuất khẩu',
    publishedAt: '2026-09-10',
    badges: [
      'Lắp Ráp Tận Nơi',
      'Đơn Hàng Gấp',
      'Đóng Thùng Gỗ',
      'Chuẩn ISPM 15'
    ],
    highlights: [
      'Chở pallet và vật tư gỗ xuống tận xưởng khách hàng lắp ráp trực tiếp',
      'Hoàn thiện nhanh trong ngày để kịp lịch đóng hàng lên container',
      'Đóng chuẩn bản vẽ kỹ thuật máy móc, chống va đập tuyệt đối',
      'Khử trùng sấy nhiệt HT đạt chuẩn xuất khẩu quốc tế ISPM 15',
      'Đội thợ mộc lành nghề cơ động tại Hóc Môn và các KCN lân cận'
    ],
    fbUrl: 'https://www.facebook.com/PalletTruongAn',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Lưu act3 lên Supabase
  const { createdAt, updatedAt, ...cleanAct3 } = newAct3;
  const { error: act3Err } = await supabase.from('activities').upsert({
    ...cleanAct3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }, { onConflict: 'id' });

  if (act3Err) console.error('Lỗi lưu act3 Supabase:', act3Err);
  else console.log('✅ Đã lưu bài hoạt động act3 lên Supabase Database!');

  // Lưu act3 vào activities.json
  const actJsonPath = path.join(__dirname, '..', 'src', 'data', 'activities.json');
  let acts = JSON.parse(fs.readFileSync(actJsonPath, 'utf8'));
  acts = acts.filter((a) => a.id !== 'act3');
  acts = [newAct3, ...acts];
  fs.writeFileSync(actJsonPath, JSON.stringify(acts, null, 2), 'utf8');
  console.log('✅ Đã lưu act3 vào src/data/activities.json!');
}

execute().catch(console.error);
