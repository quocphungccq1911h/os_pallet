-- ============================================================================
-- SUPABASE RESTORE SCRIPT FOR TRUONG AN PALLET
-- Run this entire script in Supabase SQL Editor of your new project
-- ============================================================================

-- 1. TẠO CÁC BẢNG PUBLIC
CREATE TABLE IF NOT EXISTS public.activities (
    id text NOT NULL PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    title text NOT NULL,
    category text NOT NULL,
    summary text,
    content text,
    images jsonb DEFAULT '[]'::jsonb,
    "customerLocation" text,
    "clientType" text,
    "publishedAt" text,
    badges jsonb DEFAULT '[]'::jsonb,
    highlights jsonb DEFAULT '[]'::jsonb,
    "fbUrl" text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.orders (
    id text NOT NULL PRIMARY KEY,
    "orderCode" text NOT NULL,
    customer text NOT NULL,
    phone text,
    "productName" text,
    dimensions text,
    quantity numeric DEFAULT 0,
    "woodType" text,
    "isExportISPM" boolean DEFAULT false,
    deadline text,
    "totalAmount" text,
    status text DEFAULT 'cho_duyet'::text,
    "progressPercent" numeric DEFAULT 0,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.products (
    id text NOT NULL PRIMARY KEY,
    slug text NOT NULL UNIQUE,
    name text NOT NULL,
    category text NOT NULL,
    "categorySlug" text NOT NULL,
    dimensions text,
    "woodType" text,
    "materialGroup" text,
    "targetMarket" text,
    "staticLoad" text,
    "dynamicLoad" text,
    specification text,
    "isExportStandard" boolean DEFAULT false,
    "isNew" boolean DEFAULT true,
    "priceDisplay" text DEFAULT 'Liên hệ'::text,
    description text,
    highlights jsonb DEFAULT '[]'::jsonb,
    "imageUrl" text,
    gallery jsonb DEFAULT '[]'::jsonb,
    "usagePurpose" text,
    badges jsonb DEFAULT '[]'::jsonb,
    "facebookProof" jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.quotes (
    id text NOT NULL PRIMARY KEY,
    "customerName" text NOT NULL,
    phone text NOT NULL,
    email text,
    "productTitle" text,
    dimensions text,
    quantity text,
    note text,
    status text DEFAULT 'moi'::text,
    "estimatedPrice" text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. DỮ LIỆU BẢNG ACTIVITIES
INSERT INTO public.activities (id, slug, title, category, summary, content, images, "customerLocation", "clientType", "publishedAt", badges, highlights, "fbUrl", created_at, updated_at) VALUES ('act1', 'gia-cong-pallet-theo-yeu-cau-xuat-khau-may-moc', 'Gia Công Pallet Đóng Theo Yêu Cầu – Giải Pháp An Toàn Cho Hàng Xuất Khẩu Máy Móc', 'don-gap', 'Xưởng Pallet Trường An tiếp nhận và gia công thần tốc lô pallet chuyên dụng cho khách hàng xuất khẩu máy móc nặng. Đơn hàng gấp nhưng xử lý chuẩn xác theo bản vẽ kỹ thuật, khử trùng đạt chuẩn quốc tế.', 'Hiện tại xưởng Pallet Trường An đang trực tiếp gia công mẫu pallet chuyên dụng cho đối tác khách hàng xuất khẩu máy móc công nghiệp nặng. Đặc biệt, đây là đơn hàng tiến độ gấp để kịp lịch tàu và đóng container, nhưng khách hàng hoàn toàn yên tâm vì xưởng đã chủ động lo từ A–Z.

### 📌 Vì sao pallet xuất khẩu máy móc cần làm đúng ngay từ đầu?
- **Tránh hư hỏng máy móc:** Thiết bị máy móc có giá trị cao, trọng tâm lệch nên kết cấu pallet phải gia cố đặc biệt để tránh rung lắc, nứt gãy trong suốt hành trình vận chuyển đường biển dài ngày.
- **Đáp ứng tiêu chuẩn quốc tế:** Tuân thủ tuyệt đối quy định kiểm dịch thực vật ISPM 15 tại các cảng đến (Mỹ, Châu Âu, Nhật Bản...).
- **Tối ưu chi phí logistics:** Thiết kế vừa vặn lòng container giúp khách hàng tận dụng tối đa không gian, hạn chế tối đa rủi ro phát sinh.
- **Dễ dàng bốc xếp:** Bố trí quy cách lối nâng phù hợp cho cả xe nâng tay và xe nâng máy chuyên dụng bốc xếp an toàn.

### ⚡ Khách Cần Gấp – Đã Có Trường An Lo!
- **Nhận đơn gấp – Xử lý nhanh:** Đội ngũ thợ lành nghề tăng ca liên tục để đảm bảo tiến độ bàn giao đúng hẹn.
- **Chủ động vật tư:** Kho xưởng luôn dự trữ sẵn nguồn phôi gỗ tràm, gỗ thông chất lượng, không bị động nguyên liệu.
- **Gia công chuẩn bản vẽ:** Từng chi tiết nan mặt, thanh đố, gù chịu lực được xẻ mộng và đóng đinh xoắn kiên cố theo đúng thông số kỹ thuật.

### ✅ Cam kết từ xưởng Pallet Trường An:
1. Đóng pallet theo kích thước & bản vẽ riêng của từng loại máy móc thiết bị.
2. Chịu tải trọng nặng, kết cấu vững chắc, không cong vênh.
3. Hỗ trợ khử trùng HT đạt chuẩn xuất khẩu ISPM 15 kèm chứng thư đầy đủ.
4. Tư vấn giải pháp gia cố tối ưu và tiết kiệm chi phí nhất cho doanh nghiệp.', '["/images/products/p4.1.jpg", "/images/products/p4.2.jpg", "/images/products/p4.3.jpg", "/images/pallet_factory_43.jpg"]'::jsonb, 'KCN Hóc Môn & TP. Hồ Chí Minh', 'Doanh nghiệp chế tạo & xuất khẩu máy móc', '2026-09-08', '["Đơn Hàng Gấp", "Đóng Theo Bản Vẽ", "Chịu Tải Trọng Nặng", "Chuẩn Xuất Khẩu"]'::jsonb, '["Nhận đơn gấp – xử lý nhanh theo tiến độ xuất hàng", "Chủ động vật tư gỗ xẻ sấy – không lo trễ hẹn", "Gia công chuẩn 100% theo bản vẽ kỹ thuật máy móc", "Kết cấu kiên cố chịu tải nặng, bốc xếp xe nâng an toàn", "Hỗ trợ khử trùng hun trùng HT đạt tiêu chuẩn ISPM 15"]'::jsonb, 'https://www.facebook.com/pallet.truongan', '2026-09-08 08:00:00+00'::timestamptz, '2026-09-10 06:15:38.151+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, title = EXCLUDED.title, content = EXCLUDED.content, images = EXCLUDED.images;
INSERT INTO public.activities (id, slug, title, category, summary, content, images, "customerLocation", "clientType", "publishedAt", badges, highlights, "fbUrl", created_at, updated_at) VALUES ('act2', 'hoan-thien-mau-pallet-go-thong-1000x1200-xuat-khau-vip', 'Hoàn Thiện Mẫu Pallet Gỗ Thông 1000 x 1200 x 150mm VIP Trình Khách Hàng Xuất Khẩu', 'trinh-mau', 'Sáng nay xưởng Pallet Trường An đã hoàn tất gia công mẫu pallet gỗ thông 1000 x 1200 x 150mm VIP chuẩn xuất khẩu đường biển, sẵn sàng trình quý đối tác kiểm tra thực tế trước khi triển khai đơn hàng số lượng lớn.', 'Sáng nay, xưởng **Pallet Trường An** đã hoàn thiện mẫu pallet gỗ thông kích thước **1000 x 1200 x 150mm dòng VIP** để trình khách hàng kiểm tra thực tế trước khi chính thức triển khai đơn hàng xuất khẩu số lượng lớn 🚢.

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
🤝 **Anh/Chị cần đối tác sản xuất pallet chuyên nghiệp, làm mẫu nhanh – đúng chuẩn – giá cạnh tranh tận xưởng, Pallet Trường An luôn sẵn sàng đồng hành!**', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.4.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.5.jpg"]'::jsonb, 'TP. Hồ Chí Minh & Cảng Cát Lái', 'Doanh nghiệp sản xuất & xuất khẩu đường biển', '2026-09-10', '["Trình Mẫu VIP", "Gỗ Thông Chọn Lọc", "Chuẩn Xuất Khẩu Tàu Biển", "Độ Bền Cao"]'::jsonb, '["Chọn lọc gỗ thông mới đạt chuẩn, vân sáng đẹp, bền chắc", "Gia công chuẩn xác từng nan đố, sai số cực thấp", "Kết cấu kiên cố, chịu tải nặng vận chuyển đường biển", "Trình mẫu thực tế trước khi chốt đơn hàng loạt", "Hỗ trợ chứng thư hun trùng ISPM 15 chuẩn quốc tế"]'::jsonb, 'https://www.facebook.com/pallet.truongan', '2026-09-10 06:54:24.899+00'::timestamptz, '2026-09-10 06:54:24.899+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, title = EXCLUDED.title, content = EXCLUDED.content, images = EXCLUDED.images;
INSERT INTO public.activities (id, slug, title, category, summary, content, images, "customerLocation", "clientType", "publishedAt", badges, highlights, "fbUrl", created_at, updated_at) VALUES ('act3', 'lap-rap-thung-go-tan-noi-kip-dong-hang-container-xuat-khau', 'Hành Trình Đóng Gói: Xuống Tận Nơi Lắp Ráp Thùng Gỗ Cho Đối Tác Kịp Xuất Hàng Trong Ngày', 'don-gap', 'Sáng đầu tuần, đội ngũ thợ mộc Pallet Trường An trực tiếp xuống xưởng đối tác mang theo pallet và vật tư để lắp ráp thùng gỗ ngay tại chỗ, hoàn thiện thần tốc để kịp đóng hàng lên container xuất khẩu.', '## HÀNH TRÌNH ĐÓNG GÓI – ĐƯA HÀNG HÓA VIỆT RA THẾ GIỚI 🚢
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
📞 **Quý doanh nghiệp cần đối tác đóng thùng gỗ, kiện gỗ chuyên nghiệp, hỗ trợ lắp ráp tận nơi giá xưởng – Liên hệ ngay Pallet Trường An để được tư vấn & phục vụ nhanh nhất!**', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.4.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.5.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/p6.6.jpg"]'::jsonb, 'KCN TP. Hồ Chí Minh & Bình Dương', 'Doanh nghiệp chế tạo thiết bị & máy móc xuất khẩu', '2026-09-10', '["Lắp Ráp Tận Nơi", "Đơn Hàng Gấp", "Đóng Thùng Gỗ", "Chuẩn ISPM 15"]'::jsonb, '["Chở pallet và vật tư gỗ xuống tận xưởng khách hàng lắp ráp trực tiếp", "Hoàn thiện nhanh trong ngày để kịp lịch đóng hàng lên container", "Đóng chuẩn bản vẽ kỹ thuật máy móc, chống va đập tuyệt đối", "Khử trùng sấy nhiệt HT đạt chuẩn xuất khẩu quốc tế ISPM 15", "Đội thợ mộc lành nghề cơ động tại Hóc Môn và các KCN lân cận"]'::jsonb, 'https://www.facebook.com/PalletTruongAn', '2026-09-10 07:15:21.284+00'::timestamptz, '2026-09-10 07:15:21.284+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, title = EXCLUDED.title, content = EXCLUDED.content, images = EXCLUDED.images;

-- 3. DỮ LIỆU BẢNG ORDERS
INSERT INTO public.orders (id, "orderCode", customer, phone, "productName", dimensions, quantity, "woodType", "isExportISPM", deadline, "totalAmount", status, "progressPercent", notes, created_at, updated_at) VALUES ('ord-001', 'TA-2609-01', 'Công Ty CP Chế Tạo Cơ Khí & Máy May Xuất Khẩu', '0945 888 111', 'Pallet Chuyên Dụng Đóng Máy Xuất Khẩu (Đơn Gấp)', '1400 x 1100 x 150 mm', 120, 'Gỗ Tràm xẻ sấy tuyển chọn', TRUE, '2026-09-14', '28.800.000 đ', 'dang_san_xuat', 65, 'Khách cần gấp để kịp lịch kéo cont ra cảng Cát Lái ngày 15/09. Đã hun trùng HT.', '2026-09-08 09:00:00+00'::timestamptz, '2026-09-10 10:00:00+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.orders (id, "orderCode", customer, phone, "productName", dimensions, quantity, "woodType", "isExportISPM", deadline, "totalAmount", status, "progressPercent", notes, created_at, updated_at) VALUES ('ord-002', 'TA-2609-02', 'Tập Đoàn May Mặc Việt Thắng KCN Tân Bình', '0908 333 777', 'Pallet Gỗ Thông Mới Đố Khuyết 4 Hướng Nâng', '1200 x 1000 x 120 mm', 500, 'Gỗ Thông nhập khẩu mới 100%', TRUE, '2026-09-18', '72.500.000 đ', 'dong_mau', 20, 'Đã trình 2 mẫu thử tải thành công, xưởng đang chuẩn bị phôi gỗ sản xuất hàng loạt.', '2026-09-09 08:00:00+00'::timestamptz, '2026-09-10 11:00:00+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.orders (id, "orderCode", customer, phone, "productName", dimensions, quantity, "woodType", "isExportISPM", deadline, "totalAmount", status, "progressPercent", notes, created_at, updated_at) VALUES ('ord-003', 'TA-2609-03', 'Công Ty Logistics Quốc Tế Sóng Thần', '0918 222 444', 'Pallet Đố Ván Ép Plywood Mặt Phẳng Kín', '1000 x 1200 x 140 mm', 350, 'Ván Ép Plywood + Chân gù gỗ keo', FALSE, '2026-09-11', '43.750.000 đ', 'da_giao', 100, 'Đã bàn giao xe tải 3 đợt tận kho Sóng Thần, khách đã ký biên bản bàn giao đầy đủ.', '2026-09-05 07:30:00+00'::timestamptz, '2026-09-08 16:00:00+00'::timestamptz) ON CONFLICT (id) DO NOTHING;

-- 4. DỮ LIỆU BẢNG PRODUCTS
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p2', 'pallet-go-thong-do-khuyet-xuat-khau-ispm15-1200x1000', 'Pallet Gỗ Thông Đố Khuyết Xuất Khẩu ISPM 15 (1200 x 1000 x 120 mm)', 'Pallet Gỗ Thông & Tràm Mới', 'pallet-go-moi', '1200 x 1000 x 120 mm (±5mm)', 'Gỗ Thông xẻ sấy cao cấp', 'go-thong', 'xuat-khau-ispm15', '2.000 - 2.500 kg', '1.000 - 1.500 kg', 'Đố khoét khuyết 4 hướng nâng (1200x38x88.9mm, 3 thanh), nan mặt 7 thanh (1000x100x17mm), nan đáy 4 thanh (1000x100x17mm)', TRUE, TRUE, 'Giá tại xưởng (Liên hệ)', 'Dòng pallet đố khuyết gỗ thông xẻ sấy cao cấp đã được trình mẫu thành công và chốt deal xuất khẩu cùng đối tác doanh nghiệp. Thiết kế đố khoét khuyết 4 hướng nâng linh hoạt cho xe nâng máy và xe nâng tay, gỗ thông ngoại nhập sấy đạt độ ẩm tiêu chuẩn < 18%, xử lý khử trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư xuất khẩu quốc tế. Kết cấu vững chãi, các mối ghép đinh xoắn chắc chắn, khả năng chịu tải hàng hóa nặng khi đóng container.', '["Quy cách chuẩn: Mặt 7 thanh (1000x100x17mm), 3 đố khoét khuyết (1200x38x88.9mm), đáy 4 thanh (1000x100x17mm)", "Chất liệu gỗ thông xẻ sấy chọn lọc, hạn chế cong vênh, chống mối mọt và nấm mốc", "Khử trùng nhiệt HT đạt chuẩn xuất khẩu ISPM 15, đầy đủ mộc dấu thông quan", "Thiết kế đố khuyết nâng 4 hướng tiện lợi cho cả xe nâng tay và xe nâng động cơ", "Đã được đối tác kiểm tra thực tế, đánh giá chất lượng cao và chốt deal số lượng lớn"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.4.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.5.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.6.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.7.jpg", "/images/banner_main.png"]'::jsonb, 'Đóng hàng xuất khẩu container đường biển/đường hàng không, bốc dỡ kho vận logistics, lưu trữ pallet trên kệ racking', '["🌲 Gỗ Thông Xẻ Sấy", "Sấy HT ISPM 15", "Nâng 4 Hướng", "Đã Chốt Deal"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn/", "title": "Trình mẫu thành công & chính thức chốt deal đơn hàng pallet đố khuyết gỗ thông", "description": "Sau quá trình trao đổi, sản xuất mẫu và kiểm tra thực tế đạt chuẩn ISPM 15, Pallet Trường An đã hoàn tất trình mẫu và nhận được đánh giá cao từ đối tác, chính thức chốt hợp đồng cung ứng số lượng lớn."}'::jsonb, '2026-09-10 02:03:12.372245+00'::timestamptz, '2026-09-10 04:00:31.859+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p5', 'pallet-go-chan-gu-chuan-4-huong-nang-1219x1016', 'Pallet Gỗ Chân Gù Chuẩn 4 Hướng Nâng (1219 x 1016 x 140 mm)', 'Pallet Gỗ Thông & Tràm Mới', 'pallet-go-moi', '1219 x 1016 x 140 mm (±5mm) - Chuẩn 48x40 inch', 'Gỗ Thông / Gỗ Tràm xẻ sấy cao cấp', 'go-thong', 'xuat-khau-ispm15', '2.500 - 3.500 kg', '1.200 - 1.800 kg', 'Pallet chân gù 4 hướng nâng: 9 khối gù (4 gù góc 190.5x127x90mm, 5 gù 95x127x90mm), 3 ván gánh (1219x127x17.5mm)', TRUE, TRUE, 'Giá tại xưởng (Liên hệ)', 'Dòng pallet chân gù (Block Pallet 4-Way) kích thước chuẩn 1219 x 1016 x 140mm (48x40 inch) được hoàn thiện để trình mẫu thực tế cho đối tác doanh nghiệp kiểm tra độ chịu tải và kết cấu. Cung cấp 2 phiên bản: Gỗ Thông xẻ sấy (sáng đẹp, nhẹ, chuẩn xuất khẩu) và Gỗ Tràm tự nhiên (cứng cáp, chịu tải va đập cực khỏe, tối ưu chi phí). Cấu tạo 9 khối gù liên kết đinh xoắn chắc chắn, cho phép xe nâng tay và xe nâng động cơ thao tác linh hoạt từ cả 4 phía. Xưởng cam kết tính toán tải trọng chuẩn xác, không làm hàng mỏng yếu kém an toàn.', '["Kết cấu pallet chân gù (9 khối gù chịu lực) chịu tải trọng tĩnh lên tới 3.500 kg, nâng 4 hướng tuyệt đối", "Cung cấp 2 tùy chọn chất liệu: Gỗ Thông (xuất khẩu thẩm mỹ cao) và Gỗ Tràm (chịu lực cực khỏe)", "Quy cách chuẩn: Ván gánh 3 thanh (1219x127x17.5mm), nan mặt & đáy dày dặn 17.5mm", "Đầy đủ tiêu chuẩn xử lý sấy nhiệt HT & hun trùng kiểm dịch ISPM 15 xuất khẩu container", "Hỗ trợ test tải trọng thực tế tận kho và điều chỉnh quy cách theo đúng yêu cầu của khách hàng"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.4.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.5.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.6.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.7.jpg", "/images/banner_main.png"]'::jsonb, 'Lưu trữ kho tự động, xếp pallet kệ racking đa tầng, đóng hàng container xuất khẩu đi Mỹ, châu Âu và đóng gói công nghiệp nặng', '["Chân Gù 4 Hướng", "Gỗ Thông & Tràm", "Chịu Tải 3.5 Tấn", "Sấy HT ISPM 15"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn/", "title": "Pallet mẫu chân gù 1219x1016mm – Trình quý đối tác kiểm tra thực tế", "description": "Hoàn thiện pallet mẫu chân gù kết cấu 9 khối gù chịu lực vững chãi (2 dòng gỗ thông và gỗ tràm) sẵn sàng test tải thực tế và chốt đơn hàng số lượng lớn."}'::jsonb, '2026-09-10 02:03:12.623531+00'::timestamptz, '2026-09-10 04:27:31.016+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p1', 'pallet-do-van-ep-xuat-khau-campuchia-1000x1200', 'Pallet Đố Ván Ép Xuất Khẩu Campuchia (1000 x 1200 x 140 mm)', 'Pallet Ván Ép (Plywood)', 'pallet-van-ep', '1000 x 1200 x 140 mm', 'Ván ép Plywood công nghiệp cao cấp', 'van-ep', 'xuat-khau-campuchia', '1.500 - 2.000 kg', '1.000 - 1.200 kg', '4 thanh đố chịu lực (1000x40x100mm), 9 thanh ván mặt (1200x120x20mm), 4 thanh đáy (1200x120x20mm)', TRUE, TRUE, 'Giá tại xưởng (Liên hệ)', 'Pallet đố ván ép kích thước 1000 x 1200 x 140mm chuyên dụng đóng hàng xuất khẩu sang thị trường Campuchia và ASEAN. Kết cấu 4 thanh đố gia cường chắc chắn kết hợp 9 nan mặt dày dặn 20mm mang lại khả năng chịu tải vượt trội, bề mặt ván ép phẳng mịn tuyệt đối không làm rách hay hư hại thùng carton bao bì. Chất liệu ván ép Plywood đạt chuẩn xuất khẩu, miễn trừ hun trùng kiểm dịch thực vật theo chuẩn ISPM 15, tối ưu thời gian thông quan.', '["Quy cách chuẩn: Mặt 9 thanh (1200x120x20mm), 4 đố (1000x40x100mm), đáy 4 thanh (1200x120x20mm)", "Bề mặt ván ép Plywood phẳng mịn, không mắt gỗ, chống ẩm và mối mọt", "Miễn trừ thủ tục hun trùng kiểm dịch thực vật ISPM 15 khi thông quan xuất khẩu Campuchia", "Kết cấu 4 thanh đố chịu tải cực khỏe, phù hợp xe nâng tay và xe nâng động cơ"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg", "/images/banner_main.png"]'::jsonb, 'Chuyên dùng đóng kiện hàng, thùng carton xuất khẩu sang Campuchia, xếp kho lưu trữ và vận chuyển container', '["🇰🇭 XUẤT KHẨU CAMPUCHIA", "VÁN ÉP CHUẨN XUẤT", "GIÁ TẬN XƯỞNG"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn", "title": "Lô pallet đố ván ép 1000x1200x140mm xuất khẩu Campuchia", "description": "Những lô pallet đố ván ép (9 thanh mặt, 4 thanh đố, 4 thanh đáy) đang được xưởng Pallet Trường An sản xuất và hoàn thiện xuất sang Campuchia. Uy tín – Chất lượng – Đúng tiến độ."}'::jsonb, '2026-09-10 02:03:12.152317+00'::timestamptz, '2026-09-10 03:35:43.381+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p3', 'pallet-go-thong-moi-xuat-khau-chuan-my-1219x1016', 'Pallet Gỗ Thông Mới 100% Xuất Khẩu Chuẩn Mỹ GMA (1219 x 1016 x 140 mm)', 'Pallet Gỗ Thông & Tràm Mới', 'pallet-go-moi', '1219 x 1016 x 140 mm (±5mm) - Chuẩn 48x40 inch', 'Gỗ Thông mới 100% xẻ sấy sáng đẹp', 'go-thong', 'xuat-khau-my', '2.500 - 3.000 kg', '1.200 - 1.500 kg', 'Kích thước chuẩn xuất Mỹ GMA (1219x1016x140mm), nan đố dày dặn liên kết đinh xoắn, nâng 4 hướng', TRUE, TRUE, 'Giá tại xưởng (Liên hệ)', 'Lô pallet gỗ thông mới 100% quy cách chuẩn 1219 x 1016 x 140mm (chuẩn 48 x 40 inch GMA) chuyên dụng cho các doanh nghiệp đóng hàng container xuất khẩu sang thị trường Mỹ, châu Âu và quốc tế. Gỗ thông mới xẻ sấy đạt độ ẩm dưới 20%, vân gỗ sáng đẹp, liên kết đinh xoắn chắc chắn, khả năng chịu lực va đập cao. Sản phẩm được hỗ trợ đầy đủ chứng từ hun trùng, xử lý nhiệt HT theo tiêu chuẩn ISPM 15 giúp khách hàng thông quan dễ dàng, giá cạnh tranh trực tiếp từ xưởng Trường An.', '["Kích thước chuẩn 48 x 40 inch (1219 x 1016 x 140 mm) chuyên đóng container xuất khẩu thị trường Mỹ", "Chất liệu gỗ thông mới 100% sáng đẹp, xử lý sấy đạt độ ẩm dưới 20% chống ẩm mốc", "Hỗ trợ xử lý nhiệt HT và cấp chứng thư hun trùng ISPM 15 đầy đủ mộc dấu xuất khẩu", "Gia công chuẩn quy cách, chịu tải trọng tĩnh lên đến 3.000 kg", "Giá gốc cạnh tranh nhất thị trường từ xưởng sản xuất trực tiếp Hóc Môn"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.3.jpg", "/images/banner_main.png"]'::jsonb, 'Đóng hàng máy móc, thiết bị điện tử, nông sản, hàng tiêu dùng xuất khẩu sang thị trường Mỹ và quốc tế, lưu kho kệ racking', '["🇺🇸 Chuẩn Xuất Mỹ", "Gỗ Thông Mới 100%", "Độ Ẩm < 20%", "Sấy HT ISPM 15"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn/", "title": "Hoàn thành đơn hàng pallet gỗ thông mới 100% giao khách xuất khẩu", "description": "Xưởng Pallet Trường An vừa hoàn thiện và bàn giao lô pallet gỗ thông mới 100% quy cách chuẩn 1219 x 1016 x 140mm độ ẩm dưới 20% kèm chứng từ hun trùng HT ISPM 15 cho khách hàng xuất khẩu."}'::jsonb, '2026-09-10 02:03:12.461838+00'::timestamptz, '2026-09-10 04:17:24.622+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p4', 'pallet-go-xuat-khau-kich-thuoc-lon-1400x1100', 'Pallet Gỗ Xuất Khẩu Kích Thước Lớn (1400 x 1100 x 140 mm)', 'Pallet Đóng Theo Yêu Cầu', 'pallet-theo-yeu-cau', '1400 x 1100 x 140 mm (±5 mm)', 'Gỗ Thông / Gỗ Tràm mới xẻ sấy', 'go-thong', 'xuat-khau-ispm15', '2.500 - 3.500 kg', '1.200 - 1.800 kg', 'Kích thước khổ lớn 1400x1100mm, đố chịu lực dày dặn liên kết đinh xoắn, nâng hạ xe nâng máy an toàn', TRUE, TRUE, 'Giá tại xưởng (Liên hệ)', 'Pallet gỗ kích thước khổ lớn 1400 x 1100mm chuyên dụng đóng hàng máy móc, thiết bị công nghiệp khổ rộng và hàng hóa cồng kềnh xuất khẩu. Sản phẩm được sản xuất mới 100% từ nguồn gỗ chọn lọc, sấy độ ẩm đạt chuẩn, kết cấu đố giằng chịu lực cực khỏe, đáp ứng yêu cầu tải trọng cao khi cẩu hàng và xếp container. Xưởng Trường An hỗ trợ trọn gói xử lý nhiệt HT, hun trùng đạt tiêu chuẩn kiểm dịch ISPM 15, mộc dấu xuất khẩu đầy đủ và giao hàng nhanh đúng tiến độ sản xuất của khách hàng.', '["Quy cách khổ rộng 1400 x 1100 mm gia công chuẩn xác theo yêu cầu kỹ thuật của khách hàng", "Chất liệu gỗ mới 100%, nan đố dày dặn chịu tải trọng tĩnh lên tới 3.500 kg", "Đáp ứng tiêu chuẩn kiểm dịch thực vật quốc tế ISPM 15 (sấy nhiệt HT / hun trùng thông quan)", "Phù hợp đóng hàng máy móc, thiết bị công nghiệp khổ lớn xuất khẩu đường biển", "Xưởng sản xuất trực tiếp Hóc Môn, giá cạnh tranh, đáp ứng nhanh đơn hàng số lượng lớn"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.3.jpg", "/images/banner_main.png"]'::jsonb, 'Đóng gói máy móc thiết bị khổ rộng, hàng công nghiệp nặng, bốc xếp cẩu hàng và đóng container xuất khẩu', '["Khổ Rộng 1.4m", "Đóng Theo Yêu Cầu", "Chịu Tải 3.5 Tấn", "Sấy HT ISPM 15"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn/", "title": "Hoàn thành đơn hàng pallet gỗ 1.400 x 1.100 mm giao khách xuất khẩu", "description": "Pallet Trường An vừa hoàn thiện và bàn giao thành công lô pallet gỗ kích thước 1.400 x 1.100 mm theo đúng quy cách yêu cầu, đạt chuẩn ISPM 15 phục vụ đóng hàng xuất khẩu cho đối tác."}'::jsonb, '2026-09-10 02:03:12.542563+00'::timestamptz, '2026-09-10 04:21:45.422+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p6', 'thung-go-kien-go-dong-hang-xuat-khau-lap-rap-tan-noi', 'Thùng Gỗ / Kiện Gỗ Đóng Hàng Xuất Khẩu (Dịch Vụ Lắp Ráp Tận Nơi)', 'Thùng Gỗ / Kiện Gỗ Đóng Hàng', 'thung-go-dong-hang', 'Gia công theo kích thước & bản vẽ máy móc riêng', 'Gỗ Tràm tự nhiên, Gỗ Thông xẻ sấy tuyển chọn', 'go-tram', 'xuat-khau-ispm15', '3.000 - 5.000 kg', '1.500 - 2.500 kg', 'Thùng gỗ nan thưa hoặc nan kín bọc lót bảo vệ máy móc, bắn đinh kiên cố', TRUE, TRUE, 'Liên hệ', 'Xưởng Pallet Trường An chuyên gia công và lắp ráp tận nơi thùng gỗ, kiện gỗ đóng hàng máy móc, thiết bị công nghiệp xuất khẩu. Đội ngũ thợ mộc mang đầy đủ máy móc, phôi gỗ và vật tư xuống tận xưởng khách hàng để đóng thùng trực tiếp, đảm bảo hoàn thiện nhanh chóng để kịp kéo container ra cảng đúng tiến độ.', '["Trực tiếp chở vật tư & thợ mộc xuống lắp ráp tận xưởng khách hàng", "Đóng thùng chuẩn theo kích thước từng loại máy móc, chống va đập tuyệt đối", "Gia công nhanh thần tốc, đáp ứng các đơn hàng gấp cần xuất trong ngày", "Xử lý sấy nhiệt HT và cấp chứng thư khử trùng ISPM 15 an tâm xuất khẩu đường biển", "Giá tận xưởng sản xuất trực tiếp tại Hóc Môn, không qua trung gian"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.3.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.6.jpg", "/images/banner_main.png"]'::jsonb, 'Bọc lót, đóng kiện bảo vệ máy móc cơ khí, thiết bị công nghiệp xuất khẩu đường biển', '["LẮP RÁP TẬN NƠI", "CHỊU TẢI NẶNG", "CHUẨN ISPM 15", "XUẤT KHẨU MỸ & EU"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn", "title": "Sáng đầu tuần xuống tận nơi lắp ráp thùng gỗ cho đối tác kịp xuất hàng trong ngày", "description": "Đội ngũ Pallet Trường An giao pallet và vật tư xuống xưởng khách hàng, hoàn thiện nhanh để kịp đóng hàng lên container."}'::jsonb, '2026-09-10 02:03:12.708889+00'::timestamptz, '2026-09-10 07:15:20.993+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;
INSERT INTO public.products (id, slug, name, category, "categorySlug", dimensions, "woodType", "materialGroup", "targetMarket", "staticLoad", "dynamicLoad", specification, "isExportStandard", "isNew", "priceDisplay", description, highlights, "imageUrl", gallery, "usagePurpose", badges, "facebookProof", created_at, updated_at) VALUES ('p7', 'pallet-go-dong-theo-yeu-cau', 'Gia Công Pallet Gỗ Đóng Theo Bản Vẽ & Kích Thước Riêng', 'Pallet Đóng Theo Yêu Cầu', 'pallet-theo-yeu-cau', 'Kích thước theo bản vẽ kỹ thuật', 'Gỗ Tràm / Thông / Ván ép theo lựa chọn', 'go-thong', 'noi-dia', 'Tùy biến theo yêu cầu', 'Tùy biến theo yêu cầu', 'Sản xuất chuẩn xác dung sai ±2mm', TRUE, TRUE, 'Liên hệ', 'Xưởng Trường An nhận đóng mọi quy cách pallet theo bản vẽ: 2 hướng nâng, 4 hướng nâng, đố bằng, đố khoét, mặt kín, mặt thưa, pallet gù... Tư vấn kết cấu chịu tải tối ưu chi phí cho doanh nghiệp.', '["Nhận đóng cả đơn hàng nhỏ lẻ lẫn đơn hàng dự án số lượng lớn", "Thiết kế mẫu chạy thử nghiệm thực tế trước khi chốt đơn", "Khử trùng sấy HT chuẩn ISPM 15 cho các đơn hàng xuất khẩu", "Giao hàng đúng tiến độ hẹn, bảo hành đổi trả nếu sai quy cách"]'::jsonb, 'https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p7/p4.1.jpg', '["https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p7/p4.1.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p7/p4.2.jpg", "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p7/p4.3.jpg", "/images/banner_main.png"]'::jsonb, 'Đóng gói hàng hóa xuất khẩu, kê hàng kho bãi, nâng hạ theo tiêu chuẩn riêng', '["THEO BẢN VẼ RIÊNG", "LÊN MẪU 24 GIỜ"]'::jsonb, '{"fbUrl": "https://www.facebook.com/PalletTruongAn/", "title": "Gia công pallet phi tiêu chuẩn cho nhà xưởng", "description": "Nhận đóng mọi quy cách kích thước lẻ và thiết kế mẫu trước cho khách hàng."}'::jsonb, '2026-09-10 02:03:12.793398+00'::timestamptz, '2026-09-10 07:59:36.99+00'::timestamptz) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, "imageUrl" = EXCLUDED."imageUrl", gallery = EXCLUDED.gallery;

-- 5. DỮ LIỆU BẢNG QUOTES
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-1789030876459', 'phụng 2222', '0383455781', '', 'Yêu cầu tư vấn kích thước riêng', '', '100', 'dddddd', 'moi', 'Liên hệ', '2026-09-10 09:01:16.459+00'::timestamptz, '2026-09-10 09:01:16.459+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-1789029698673', 'Phụng', '0383455781', '', 'Yêu cầu tư vấn kích thước riêng', '', '100', 'abc', 'moi', 'Liên hệ', '2026-09-10 08:41:38.673+00'::timestamptz, '2026-09-10 08:41:38.673+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-001', 'Anh Tuấn - Logistics Tân Bình', '0903 123 456', 'tuan.logistics@gmail.com', 'Pallet Gỗ Thông Mới 100% Xuất Khẩu Mỹ (1219 x 1016 x 140 mm)', '1219 x 1016 x 140 mm', '300 cái', 'Cần giao gấp trong tuần sau đóng container hàng may mặc, cần giấy chứng thư hun trùng ISPM 15.', 'thanh_cong', '145.000 đ', '2026-09-10 08:30:00+00'::timestamptz, '2026-09-10 06:48:09.05+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-002', 'Chị Mai - Công Ty Cơ Khí Chính Xác Hóc Môn', '0988 654 321', '', 'Pallet Đóng Theo Yêu Cầu Chịu Tải Nặng', '1400 x 1100 x 150 mm', '50 cái', 'Kê máy dập khuôn tải trọng tĩnh 3 tấn, cần đố đặc chịu lực cao.', 'da_goi', '210.000 đ', '2026-09-09 14:15:00+00'::timestamptz, '2026-09-09 15:00:00+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-003', 'Anh Hùng - Kho Vận Sóng Thần Bình Dương', '0912 789 999', '', 'Pallet Đố Ván Ép Plywood (1000 x 1200 x 140 mm)', '1000 x 1200 x 140 mm', '500 cái', 'Xuất hàng sang Campuchia, lấy hàng định kỳ mỗi tháng.', 'da_bao_gia', '125.000 đ', '2026-09-08 10:00:00+00'::timestamptz, '2026-09-08 16:20:00+00'::timestamptz) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.quotes (id, "customerName", phone, email, "productTitle", dimensions, quantity, note, status, "estimatedPrice", created_at, updated_at) VALUES ('quote-1789048151268', 'Chị Dung', '0333333333', '', 'Yêu cầu tư vấn kích thước riêng', '', '100', '', 'moi', 'Liên hệ', '2026-09-10 13:49:11.268+00'::timestamptz, '2026-09-10 13:49:11.268+00'::timestamptz) ON CONFLICT (id) DO NOTHING;

-- 6. PHÂN QUYỀN & RLS POLICIES
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Xóa policies cũ nếu đã tồn tại để tránh trùng lặp
DROP POLICY IF EXISTS "Allow public read" ON public.products;
DROP POLICY IF EXISTS "Allow public write" ON public.products;
DROP POLICY IF EXISTS "Enable All for Activities" ON public.activities;
DROP POLICY IF EXISTS "Public Read Activities" ON public.activities;
DROP POLICY IF EXISTS "Enable All for Orders" ON public.orders;
DROP POLICY IF EXISTS "Enable All for Quotes" ON public.quotes;

CREATE POLICY "Allow public read" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow public write" ON public.products USING (true) WITH CHECK (true);
CREATE POLICY "Enable All for Activities" ON public.activities USING (true) WITH CHECK (true);
CREATE POLICY "Public Read Activities" ON public.activities FOR SELECT USING (true);
CREATE POLICY "Enable All for Orders" ON public.orders USING (true) WITH CHECK (true);
CREATE POLICY "Enable All for Quotes" ON public.quotes USING (true) WITH CHECK (true);

GRANT ALL ON TABLE public.activities TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.orders TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.products TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.quotes TO anon, authenticated, service_role;

-- 7. KHỞI TẠO STORAGE BUCKET 'product-images'
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Storage Policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Allow upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow update" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete" ON storage.objects;

CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Allow upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
CREATE POLICY "Allow update" ON storage.objects FOR UPDATE USING (bucket_id = 'product-images');
CREATE POLICY "Allow delete" ON storage.objects FOR DELETE USING (bucket_id = 'product-images');
