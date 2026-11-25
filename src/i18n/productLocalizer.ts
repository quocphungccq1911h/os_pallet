import type { Product, Category } from '@/data/products';
import type { WorkshopSpecRow } from '@/data/workshopSpecs';
import type { Activity, ActivityCategoryInfo } from '@/data/activities';
import type { BlogPost } from '@/data/blogs';
import type { OrderNotificationItem } from '@/data/orderNotifications';
import type { Locale } from './translations';

// ============================================================================
// 1. CATEGORY TRANSLATIONS
// ============================================================================
const CATEGORY_MAP: Record<string, { en: { name: string; desc: string }; zh: { name: string; desc: string } }> = {
  'pallet-go-tram': {
    en: {
      name: 'Acacia Wood Pallets (Stringer & 9-Block)',
      desc: '26 standard Truong An Acacia hardwood pallet models (PTA-T01..T10, PTA-G01..G10 & heavy-duty builds), high load capacity at factory-direct prices.',
    },
    zh: {
      name: '相思木托盘（三纵梁与九脚）',
      desc: '长安工厂26款标准相思木硬木托盘（PTA-T01..T10、PTA-G01..G10及重型实单规格），木质坚硬承重高，源头工厂直供价。',
    },
  },
  'pallet-go-thong': {
    en: {
      name: 'Export Pine Pallets (ISPM 15)',
      desc: 'Kiln-dried pine pallets (<18–20% moisture), 4-side planed smooth, HT heat-treated with ISPM 15 certification for US, EU & Japan exports.',
    },
    zh: {
      name: '出口松木托盘 (ISPM 15)',
      desc: '进口烘干松木托盘（含水率<18–20%），四面刨光，配备ISPM 15国际HT热处理熏蒸证书，畅通欧美日海关。',
    },
  },
  'pallet-van-ep': {
    en: {
      name: 'Plywood Pallets (10–15mm)',
      desc: '34 smooth-deck 9-block plywood pallet sizes, lightweight and 100% exempt from ISPM 15 fumigation for international export.',
    },
    zh: {
      name: '免熏蒸胶合板托盘 (10–15mm)',
      desc: '常备34种标准尺寸九脚整面胶合板栈板，自重轻、面板平整，出口全球100%免除熏蒸检疫手续。',
    },
  },
  'pallet-theo-yeu-cau': {
    en: {
      name: 'Custom-Built Pallets per Drawing',
      desc: 'Single-deck & reversible double-deck wooden pallets custom-engineered to your CAD drawing (800×800 to 1600×1500 mm).',
    },
    zh: {
      name: '按图纸非标定制木托盘',
      desc: '承接单面、双面满铺及各类非标尺寸木托盘按CAD图纸定制（800×800至1600×1500 mm），24小时快速打样。',
    },
  },
  'pallet-nhua-moi': {
    en: {
      name: 'New Industrial Plastic Pallets',
      desc: '100% virgin HDPE mesh plastic pallets and lightweight 9-leg nestable export pallets, waterproof and cold-storage ready.',
    },
    zh: {
      name: '全新工业塑料托盘',
      desc: '100%全新HDPE一体网格塑料托盘与九脚可套叠出口轻型塑胶栈板，防水耐寒耐酸碱。',
    },
  },
  'pallet-nhua-cu': {
    en: {
      name: 'Used Plastic Pallets (85–95% New)',
      desc: 'Carefully inspected imported Japanese/Korean used HDPE pallets (85–95% condition), saving 30–40% warehousing costs.',
    },
    zh: {
      name: '精选二手塑料托盘 (85–95成新)',
      desc: '日韩进口严选二手HDPE塑料栈板（85–95成新，结构完好无裂纹），立省30–40%仓储投入成本。',
    },
  },
  'thung-go-dong-hang': {
    en: {
      name: 'Export Wooden Crates & Cases',
      desc: '7 standard cross-braced slatted wooden crates with lids plus on-site enclosed plywood machinery crating (ISPM 15 certified).',
    },
    zh: {
      name: '出口木箱与机械包装箱',
      desc: '涵盖7款标准斜撑带盖花格木箱及上门定制全封闭胶合板大型机械出口木箱（符合ISPM 15检疫标准）。',
    },
  },
  'thung-nhua': {
    en: {
      name: 'Industrial Plastic Crates & Bins',
      desc: 'Solid lidded HDPE tote boxes, ventilated agricultural crates, and stackable Eurobox component bins.',
    },
    zh: {
      name: '工业塑料周转箱与零件盒',
      desc: '全新HDPE带盖实心周转箱、透气网格周转箩及工厂货架可堆叠零件箱批发供应。',
    },
  },
};

export function localizeCategory(cat: Category, locale: Locale): Category {
  if (locale === 'vi') return cat;
  const mapped = CATEGORY_MAP[cat.slug]?.[locale];
  if (!mapped) return cat;
  return {
    ...cat,
    name: mapped.name,
    description: mapped.desc,
  };
}

// ============================================================================
// 2. PHRASE & PATTERN TRANSLATION PIPELINE FOR ALL 81+ PRODUCTS
// ============================================================================
const EN_REPLACEMENTS: [RegExp, string][] = [
  // 1. Full Material Sentences FIRST (prevent partial sub-rule collisions)
  [/Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15/gi, 'Selected natural Acacia hardwood, optional kiln-drying & ISPM 15 HT'],
  [/Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục\/mối/gi, 'Selected straight-grain Acacia hardwood, rot & borer-free'],
  [/Gỗ Tràm tự nhiên chịu lực cao/gi, 'High-strength natural Acacia hardwood'],
  [/Gỗ Tràm \/ Gỗ tự nhiên tươi, hun trùng HT ISPM 15/gi, 'Natural Acacia hardwood, ISPM 15 HT heat-treated'],
  [/Gỗ Tràm tự nhiên thanh dày 20mm \(độ ẩm tự nhiên\)/gi, '20mm thick natural Acacia hardwood'],
  [/Gỗ Tràm tự nhiên cứng chắc \(độ ẩm bình thường\)/gi, 'Heavy-duty natural Acacia hardwood'],
  [/Gỗ Tràm sấy đạt độ ẩm ≤ 19%, bào láng 4 mặt/gi, 'Kiln-dried Acacia (≤19% moisture), 4-side smooth planed'],
  [/Gỗ Tràm tươi tuyển chọn, hỗ trợ đóng mộc hun trùng/gi, 'Selected Acacia hardwood, optional ISPM 15 stamping'],
  [/Gỗ thông sấy khô dưới 18 độ, xử lý nhiệt HT ISPM 15/gi, 'Kiln-dried Pine (<18% moisture), ISPM 15 HT certified'],
  [/Gỗ Thông mới bào láng 4 mặt, sấy độ ẩm ≤ 20%/gi, 'New 4-side planed Pine wood, kiln-dried ≤20% moisture'],
  [/Gỗ Thông sấy độ ẩm ≤ 20%, hun trùng HT ISPM 15/gi, 'Kiln-dried Pine (≤20% moisture), ISPM 15 HT certified'],
  [/Gỗ tự nhiên \/ Gỗ thông bào láng mặt, độ ẩm ≤ 28%, hun trùng HT/gi, 'Smooth-planed Pine / Hardwood (≤28% moisture), ISPM 15 HT'],
  [/Ván ép Plywood 12mm \+ Tấm lót 9mm \+ 9 gù ép 100×100×100/gi, '12mm Plywood deck + 9mm underlayment + 9 compressed blocks (100×100×100)'],
  [/Ván ép Plywood 10mm siêu nhẹ \+ 9 cục gù 80×80×90/gi, 'Lightweight 10mm Plywood + 9 blocks (80×80×90mm)'],
  [/Ván ép Plywood dày 15mm \+ 4 thanh đỡ \+ 9 cục gù lớn/gi, '15mm Heavy-duty Plywood + 4 support battens + 9 large blocks'],
  [/Gỗ Tràm \/ Gỗ Thông \/ Ván Ép tùy chọn theo tải trọng/gi, 'Acacia / Pine / Plywood tailored to load requirement'],
  [/Nhựa HDPE nguyên sinh 100% chống tia UV/gi, '100% Virgin UV-stabilized HDPE'],
  [/Nhựa PP \/ HDPE tái sinh loại 1 siêu nhẹ/gi, 'Grade-A lightweight recycled PP / HDPE'],
  [/Nhựa HDPE nhập khẩu Nhật \/ Hàn tuyển chọn/gi, 'Selected imported Japan / Korea HDPE'],
  [/Gỗ Tràm \/ Gỗ Thông thanh chuẩn 70×16mm \+ 9 gù 90×90×90mm/gi, '70×16mm Acacia / Pine slats + 9 solid blocks (90×90×90mm)'],
  [/Ván ép Plywood 12–18mm \+ Khung xương gỗ Thông \/ Tràm/gi, '12–18mm Plywood panels + Pine / Acacia structural framing'],
  [/Nhựa HDPE nguyên sinh chịu lực cao/gi, 'High-impact 100% Virgin HDPE'],
  [/Nhựa HDPE nguyên sinh bền dẻo/gi, 'Durable 100% Virgin HDPE'],
  [/Nhựa PP \/ HDPE nguyên sinh chống va đập/gi, 'Impact-resistant Virgin PP / HDPE'],

  // 2. Product Titles & Key Phrases
  [/Pallet tràm đố bằng phổ thông/gi, 'Standard 3-Stringer Acacia Pallet'],
  [/Pallet tràm đố bằng xuất khẩu/gi, 'Export 3-Stringer Acacia Pallet'],
  [/Pallet tràm gù/gi, '9-Block 4-Way Acacia Pallet'],
  [/Pallet tràm/gi, '3-Stringer Acacia Pallet'],
  [/Pallet gỗ tràm/gi, 'Acacia Hardwood Pallet'],
  [/Pallet gỗ Thông mới/gi, 'New Kiln-Dried Pine Pallet'],
  [/Pallet gỗ thông/gi, 'Kiln-Dried Pine Pallet'],
  [/Pallet gỗ ép/gi, 'Smooth-Deck Plywood Pallet'],
  [/Pallet Ván Ép/gi, 'Plywood Pallet'],
  [/Gia Công Pallet Gỗ Theo Bản Vẽ Yêu Cầu Riêng \(Mọi Kích Thước\)/gi, 'Custom-Built Wooden Pallet per CAD Drawing (Any Size)'],
  [/Pallet Nhựa Mới Mặt Lưới Liền Khối HDPE/gi, 'New Heavy-Duty HDPE Mesh Plastic Pallet'],
  [/Pallet Nhựa Chân Cốc Siêu Nhẹ Xuất Khẩu 1 Chiều/gi, 'Lightweight 9-Leg Nestable Export Plastic Pallet'],
  [/Pallet Nhựa Cũ Đã Qua Sử Dụng Độ Mới 85–95%/gi, 'Selected Used HDPE Plastic Pallet (85–95% Condition)'],
  [/Thùng gỗ đóng theo yêu cầu \/ Thùng gỗ kín ván ép máy móc/gi, 'Custom Enclosed Plywood Machinery Wooden Crate'],
  [/Thùng Nhựa Đặc Công Nghiệp Có Nắp/gi, 'Heavy-Duty Solid HDPE Plastic Box with Lid'],
  [/Thùng Nhựa Hở \/ Sóng Nhựa Hở Công Nghiệp/gi, 'Ventilated Industrial HDPE Mesh Crate'],
  [/Khay Nhựa Linh Kiện Công Nghiệp Xếp Chồng Kho Xưởng/gi, 'Stackable Industrial Component Plastic Bin (Eurobox)'],
  [/Thùng gỗ/gi, 'Cross-Braced Slatted Wooden Crate'],
  [/Pallet gỗ/gi, 'Heavy-Duty Wooden Pallet'],

  // 3. Compound Title Tags & Custom CAD Spec Sentences (BEFORE short terms)
  [/4 đố · Ván dày 20mm/gi, '4-Stringer · 20mm Deck'],
  [/9 gù · Tải tĩnh 4\.000 kg/gi, '9-Block · 4,000kg Static'],
  [/9 gù · 11 nan mặt 17mm/gi, '9-Block · 11×17mm Slats'],
  [/9 gù · 11 nan mặt 16mm/gi, '9-Block · 11×16mm Slats'],
  [/Bào láng 4 mặt · Độ ẩm ≤ 19%/gi, '4-Side Planed · Moisture ≤ 19%'],
  [/Gỗ thông khô < 18° · ISPM 15/gi, 'Kiln-Dried Pine <18% · ISPM 15'],
  [/12 cục gù · ISPM 15/gi, '12-Block Heavy Duty · ISPM 15'],
  [/Gù đại 120×120 ISPM 15/gi, '120×120 Jumbo Blocks · ISPM 15'],
  [/Full 2 mặt · ISPM 15/gi, 'Full Double-Deck · ISPM 15'],
  [/1 mặt · 4 đố ISPM 15/gi, 'Single-Deck 4-Stringer · ISPM 15'],
  [/4 đố · Hun trùng ISPM 15/gi, '4-Stringer · ISPM 15 HT'],
  [/Thiết kế bản vẽ CAD miễn phí theo kích thước hàng hóa & kệ kho/gi, 'Free CAD engineering drawings tailored to your cargo & warehouse racks'],
  [/Tùy chọn kết cấu: 3–4 đố bằng, đố khuyết, 9–12 cục gù, 1 mặt hoặc 2 mặt/gi, 'Flexible structures: 3–4 stringers, notched, 9–12 blocks, single or double-deck'],
  [/Dung sai gia công chuẩn ±2mm ~ ±5mm/gi, 'Precision manufacturing tolerance ±2mm to ±5mm'],
  [/Lên mẫu thử tải trong 24 giờ/gi, 'Load-test sample prototyping within 24 hours'],
  [/Hỗ trợ bào láng, sấy khô, sơn cạnh logo & hun trùng HT ISPM 15/gi, 'Optional 4-side planing, kiln-drying, brand logo stenciling & ISPM 15 HT'],

  // 4. Specs & Technical Terms (Longer compound labels FIRST)
  [/Kết cấu:/gi, 'Structure:'],
  [/9 cục gù nâng 4 hướng/gi, '9 solid blocks, 4-way forklift entry'],
  [/3 gánh dọc nâng 2 hướng/gi, '3 longitudinal stringers, 2-way forklift entry'],
  [/Tấm mặt trên:/gi, 'Top plywood sheet:'],
  [/Ván mặt trên:/gi, 'Top plywood deck:'],
  [/Tấm lót trên:/gi, 'Reinforcing underlayment sheet:'],
  [/Thanh đỡ mặt trên:/gi, 'Upper support battens:'],
  [/Thanh gánh mặt trên:/gi, 'Upper stringer boards:'],
  [/Thanh gánh mặt trên/gi, 'Upper stringer boards'],
  [/Thanh gánh trên gù:/gi, 'Stringer boards over blocks:'],
  [/Thanh nan mặt trên:/gi, 'Top deck boards:'],
  [/Thanh nan mặt trên/gi, 'Top deck boards:'],
  [/Nan mặt trên:/gi, 'Top deck boards:'],
  [/Thanh mặt trên:/gi, 'Top deck boards:'],
  [/Mặt trên \(nắp\):/gi, 'Top lid:'],
  [/Mặt trên:/gi, 'Top deck:'],
  [/Ván gánh mặt:/gi, 'Upper stringer boards:'],
  [/Ván gánh:/gi, 'Stringer boards:'],
  [/Nan gánh:/gi, 'Stringer boards:'],
  [/Thanh gánh:/gi, 'Stringer boards:'],
  [/Ván mặt:/gi, 'Top deck boards:'],
  [/Thanh mặt:/gi, 'Top deck boards:'],
  [/Chân đỡ \(cục gù\):/gi, 'Support blocks:'],
  [/Chân đỡ bản lớn:/gi, 'Oversized corner blocks:'],
  [/Chân đỡ tiêu chuẩn:/gi, 'Standard blocks:'],
  [/Chân đỡ:/gi, 'Support blocks:'],
  [/Cục gù chịu lực:/gi, 'Load-bearing blocks:'],
  [/Cục gù đại:/gi, 'Heavy-duty blocks:'],
  [/Cục gù:/gi, 'Support blocks:'],
  [/Gù:/gi, 'Blocks:'],
  [/Đố thẳng chịu lực:/gi, 'Solid stringers:'],
  [/Đố chịu lực:/gi, 'Solid stringers:'],
  [/Đố dọc:/gi, 'Longitudinal stringers:'],
  [/Thanh đà dọc:/gi, 'Longitudinal stringers:'],
  [/Thanh đáy ngang:/gi, 'Bottom cross boards:'],
  [/Thanh mặt đáy:/gi, 'Bottom deck boards:'],
  [/Thanh nan mặt dưới:/gi, 'Bottom deck boards:'],
  [/Thanh nan mặt dưới/gi, 'Bottom deck boards:'],
  [/Nan đáy:/gi, 'Bottom boards:'],
  [/Ván đáy:/gi, 'Bottom boards:'],
  [/Thanh đáy dưới:/gi, 'Bottom deck boards:'],
  [/Thanh đáy:/gi, 'Bottom boards:'],
  [/Mặt đáy:/gi, 'Base pallet:'],
  [/Mặt dưới:/gi, 'Bottom deck:'],
  [/Mặt đứng dài:/gi, 'Long side walls:'],
  [/Mặt đứng rộng:/gi, 'Short end walls:'],
  [/Thể tích gỗ tiêu chuẩn:/gi, 'Standard timber volume:'],
  [/Kích thước:/gi, 'Dimensions:'],
  [/Quy cách chuẩn Mỹ:/gi, 'US GMA Spec:'],
  [/Quy cách:/gi, 'Spec:'],
  [/Tải trọng làm việc:/gi, 'Working load:'],
  [/Tải trọng:/gi, 'Load rating:'],
  [/tải động/gi, 'dynamic'],
  [/tải tĩnh/gi, 'static'],
  [/dùng cho xe nâng tay & xe nâng máy/gi, 'compatible with hand pallet jacks & forklifts'],
  [/Xử lý hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư/gi, 'ISPM 15 HT heat-treated with official phytosanitary certificate'],
  [/Xử lý nhiệt HT chuẩn quốc tế ISPM 15/gi, 'ISPM 15 HT heat-treated for global export'],
  [/Hun trùng HT ISPM 15/gi, 'ISPM 15 HT certified'],
  [/Hỗ trợ đóng mộc hun trùng ISPM 15/gi, 'ISPM 15 IPPC stamping available'],
  [/Gỗ thông khô dưới 18 độ/gi, 'Kiln-dried pine (<18% moisture)'],
  [/Bào láng 4 mặt/gi, '4-side planed smooth'],
  [/Bào láng mặt/gi, 'Smooth-planed top surface'],
  [/sấy khô/gi, 'kiln-dried'],
  [/độ ẩm/gi, 'moisture'],
  [/Độ ẩm/gi, 'Moisture'],
  [/Giao tại xưởng hoặc cảng Cát Lái/gi, 'Ex-works or direct Cat Lai Port delivery'],
  [/Sơn 4 cạnh theo yêu cầu/gi, 'Custom 4-side brand stencil painting'],
  [/Đinh (\d+[–-]\d+cm)/gi, '$1 spiral nails'],
  [/thiết kế full 2 mặt/gi, 'reversible full double-deck'],
  [/thiết kế 1 mặt/gi, 'single-deck design'],
  [/Ván 10mm gọn nhẹ/gi, '10mm Lightweight Deck'],
  [/Ván dày 15mm gia cố/gi, '15mm Heavy-Duty Reinforced'],
  [/Ván dày 20mm/gi, '20mm Thick Boards'],
  [/1 mặt lưới thoáng khí/gi, 'Ventilated anti-slip mesh deck'],
  [/3 chân suốt nâng 4 hướng/gi, '3-runner base, 4-way forklift entry'],
  [/Nút cao su chống trượt/gi, 'Anti-slip rubber grommets'],
  [/Dùng tốt trong kho lạnh/gi, 'Cold-storage rated (-20°C)'],
  [/9 chân cốc xếp lồng vào nhau \(Nestable\)/gi, '9-leg nestable space-saving design'],
  [/Nâng 4 hướng/gi, '4-way entry'],
  [/Trọng lượng nhẹ/gi, 'Ultra-lightweight'],
  [/Miễn ISPM 15/gi, 'ISPM 15 exempt'],
  [/Tuyển chọn kỹ không nứt gãy/gi, 'Inspected crack-free structural condition'],
  [/Độ mới 85–95%/gi, '85–95% like-new condition'],
  [/Đủ loại mặt lưới \/ mặt bít \/ chân giằng/gi, 'Available in mesh, solid & 3-runner styles'],
  [/Đế pallet chịu tải nặng/gi, 'Heavy-duty forklift pallet base'],
  [/Vách kín ván ép hoặc nan thưa theo bản vẽ/gi, 'Enclosed plywood or slatted walls per CAD drawing'],
  [/Hỗ trợ hút chân không & lắp ráp tận nơi/gi, 'Vacuum foil barrier & on-site factory crating available'],
  [/Thành kín chống bụi & ẩm ướt/gi, 'Dustproof & moisture-proof solid walls'],
  [/Gân tăng cứng xung quanh/gi, 'Reinforced structural ribs'],
  [/Tay cầm chịu lực/gi, 'Ergonomic load handles'],
  [/Kèm nắp đậy kín khít/gi, 'Includes tight-fitting lid'],
  [/Thành nan hở thoáng khí thoát nước nhanh/gi, 'Ventilated mesh walls for airflow & drainage'],
  [/Vành miệng gia cố chịu tải/gi, 'Reinforced rim for high stacking'],
  [/Tay cầm 2 đầu tiện bốc xếp/gi, 'Dual-end carry handles'],
  [/Thành đứng tối ưu thể tích chứa/gi, 'Vertical walls maximizing internal volume'],
  [/Đáy phẳng chạy mượt trên băng chuyền & kệ kho công nghiệp/gi, 'Smooth flat base for roller conveyors & warehouse racks'],

  // 5. Badges & Units (Longer uppercase badges FIRST)
  [/MÃ (PTA-[TG]\d+|TG-\d+)/g, 'CODE $1'],
  [/9 GÙ \/ 4 HƯỚNG/g, '9-BLOCK / 4-WAY'],
  [/3 GÁNH \/ 2 HƯỚNG/g, '3-STRINGER / 2-WAY'],
  [/GIÁ TẬN XƯỞNG/g, 'FACTORY DIRECT'],
  [/KHỔ LỚN/g, 'OVERSIZED'],
  [/KHỔ GỌN/g, 'COMPACT'],
  [/KHỔ /g, 'SIZE '],
  [/VUÔNG (\d+×\d+)/g, 'SQUARE $1'],
  [/11 NAN MẶT (\d+MM)/g, '11×$1 DECK SLATS'],
  [/11 NAN (\d+MM)/g, '11×$1 SLATS'],
  [/TẢI > 1\.500 KG/g, 'LOAD > 1,500 KG'],
  [/4 ĐỐ CHỊU LỰC/g, '4 SOLID STRINGERS'],
  [/4 ĐỐ THẲNG/g, '4 STRAIGHT STRINGERS'],
  [/4 ĐỐ DỌC/g, '4 STRINGERS'],
  [/ĐÁY KHUNG KÍN/g, 'PERIMETER BASE'],
  [/HỖ TRỢ HUN TRÙNG/g, 'ISPM 15 OPTIONAL'],
  [/GỖ THÔNG < 18°/g, 'PINE < 18% MC'],
  [/6 NAN TRÊN \+ 6 DƯỚI/g, '6 TOP + 6 BOTTOM'],
  [/12 CỤC GÙ/g, '12 HEAVY BLOCKS'],
  [/9 GÙ ĐẠI 120×120/g, '9 JUMBO BLOCKS'],
  [/SƠN CẠNH THEO YÊU CẦU/g, 'CUSTOM STENCILING'],
  [/FULL 2 MẶT \(22 NAN\)/g, 'DOUBLE-DECK (22 SLATS)'],
  [/TIẾT KIỆM CHI PHÍ/g, 'COST-EFFECTIVE'],
  [/MIỄN HUN TRÙNG/g, 'FUMIGATION FREE'],
  [/VÁN 12MM \+ LÓT 9MM/g, '12MM + 9MM DECK'],
  [/VÁN 10MM SIÊU NHẸ/g, '10MM LIGHTWEIGHT'],
  [/VÁN DÀY 15MM/g, '15MM HEAVY DECK'],
  [/VÁN DÀY 20MM/g, '20MM THICK BOARD'],
  [/GIA CỐ 4 THANH ĐỠ/g, '4 SUPPORT BATTENS'],
  [/CHỊU TẢI NẶNG/g, 'HEAVY DUTY'],
  [/BÀO LÁNG 4 MẶT/g, '4-SIDE PLANED'],
  [/TẢI TĨNH 4\.000 KG/g, '4,000KG STATIC'],
  [/CHUẨN MỸ/g, 'US GMA'],
  [/THEO BẢN VẼ RIÊNG/g, 'CUSTOM CAD'],
  [/LÊN MẪU 24 GIỜ/g, '24H SAMPLE'],
  [/MIỄN PHÍ THIẾT KẾ/g, 'FREE CAD DESIGN'],
  [/ĐẾ 9 GÙ \+ GIẰNG CHÉO/g, '9-BLOCK + BRACED'],
  [/CÓ NẮP ĐẬY/g, 'WITH TOP LID'],
  [/CÓ NẮP KÍN/g, 'SEALED LID'],
  [/ĐÓNG THEO YÊU CẦU/g, 'CUSTOM BUILT'],
  [/LẮP RÁP TẬN NƠI/g, 'ON-SITE CRATING'],
  [/CHUẨN ISPM 15/g, 'ISPM 15 CERTIFIED'],
  [/NHỰA HDPE NGUYÊN SINH/g, 'VIRGIN HDPE'],
  [/HDPE NGUYÊN SINH/g, 'VIRGIN HDPE'],
  [/NHỰA NGUYÊN SINH/g, 'VIRGIN RESIN'],
  [/CHỊU KHO LẠNH/g, 'COLD STORAGE'],
  [/4 HƯỚNG NÂNG/g, '4-WAY ENTRY'],
  [/CHÂN CỐC XẾP LỒNG/g, 'NESTABLE 9-LEG'],
  [/SIÊU NHẸ ~7KG/g, 'ULTRALIGHT ~7KG'],
  [/MIỄN ISPM 15/g, 'ISPM 15 EXEMPT'],
  [/TIẾT KIỆM 40%/g, 'SAVE 40%'],
  [/ĐỘ MỚI 85–95%/g, '85–95% NEW'],
  [/SẴN KHO LỚN/g, 'IN STOCK'],
  [/XẾP CHỒNG KHO/g, 'STACKABLE'],
  [/SÓNG NHỰA HỞ/g, 'VENTILATED CRATE'],
  [/THOÁNG KHÍ/g, 'BREATHABLE'],
  [/GIÁ SỈ KHO XƯỞNG/g, 'WHOLESALE'],
  [/GIÁ SỈ B2B/g, 'B2B WHOLESALE'],
  [/CHUẨN KỆ KHO/g, 'RACK STANDARD'],
  [/Liên hệ/gi, 'Contact Us'],
  [/Tùy biến/gi, 'Custom'],
  [/xếp chồng/gi, 'stacked'],
  [/thùng/gi, 'box'],
  [/khay/gi, 'bin'],
  [/(\d+)\s*thanh ngang dài/gi, '$1 long horizontal slats'],
  [/(\d+)\s*thanh dọc ngắn/gi, '$1 short vertical slats'],
  [/(\d+)\s*giằng chéo/gi, '$1 diagonal braces'],
  [/(\d+)\s*thanh bìa/gi, '$1 outer boards'],
  [/(\d+)\s*thanh giữa/gi, '$1 middle boards'],
  [/(\d+)\s*thanh tâm/gi, '$1 center boards'],
  [/(\d+)\s*thanh gánh/gi, '$1 stringer boards'],
  [/(\d+)\s*thanh đáy/gi, '$1 bottom boards'],
  [/(\d+)\s*cục gù/gi, '$1 support blocks'],
  [/(\d+)\s*ngang/gi, '$1 horizontal'],
  [/(\d+)\s*đứng/gi, '$1 vertical'],
  [/(\d+)\s*ván mặt/gi, '$1 deck boards'],
  [/(\d+)\s*tấm/gi, '$1 sheet'],
  [/(\d+)\s*thanh/gi, '$1 boards'],
  [/(\d+)\s*cục/gi, '$1 blocks'],
  [/cao (\d+)\s*mm/gi, 'height $1mm'],
];

const ZH_REPLACEMENTS: [RegExp, string][] = [
  // 1. Full Material Sentences FIRST (prevent partial sub-rule collisions)
  [/Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15/gi, '严选天然相思木硬木，支持烘干及ISPM 15热处理熏蒸'],
  [/Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục\/mối/gi, '严选笔直无腐无虫天然相思木硬木'],
  [/Gỗ Tràm tự nhiên chịu lực cao/gi, '高强度天然相思木硬木'],
  [/Gỗ Tràm \/ Gỗ tự nhiên tươi, hun trùng HT ISPM 15/gi, '优质相思木实木，配套ISPM 15 HT热处理熏蒸'],
  [/Gỗ Tràm tự nhiên thanh dày 20mm \(độ ẩm tự nhiên\)/gi, '20mm加厚天然相思木板材'],
  [/Gỗ Tràm tự nhiên cứng chắc \(độ ẩm bình thường\)/gi, '高密度坚硬相思木实木'],
  [/Gỗ Tràm sấy đạt độ ẩm ≤ 19%, bào láng 4 mặt/gi, '烘干相思木（含水率≤19%），四面精细刨光'],
  [/Gỗ Tràm tươi tuyển chọn, hỗ trợ đóng mộc hun trùng/gi, '精选相思木实木，支持加盖ISPM 15熏蒸印章'],
  [/Gỗ thông sấy khô dưới 18 độ, xử lý nhiệt HT ISPM 15/gi, '烘干进口松木（含水率<18%），ISPM 15 HT认证'],
  [/Gỗ Thông mới bào láng 4 mặt, sấy độ ẩm ≤ 20%/gi, '全新四面刨光进口松木（烘干含水率≤20%）'],
  [/Gỗ Thông sấy độ ẩm ≤ 20%, hun trùng HT ISPM 15/gi, '烘干进口松木（含水率≤20%），ISPM 15热处理认证'],
  [/Gỗ tự nhiên \/ Gỗ thông bào láng mặt, độ ẩm ≤ 28%, hun trùng HT/gi, '面板刨光松木/硬木（含水率≤28%），ISPM 15热处理'],
  [/Ván ép Plywood 12mm \+ Tấm lót 9mm \+ 9 gù ép 100×100×100/gi, '12mm免熏蒸胶合板 + 9mm加固衬板 + 9个100×100×100压缩脚墩'],
  [/Ván ép Plywood 10mm siêu nhẹ \+ 9 cục gù 80×80×90/gi, '10mm超轻免熏蒸胶合板 + 9个80×80×90脚墩'],
  [/Ván ép Plywood dày 15mm \+ 4 thanh đỡ \+ 9 cục gù lớn/gi, '15mm加厚胶合板 + 4根支撑条 + 9个大号脚墩'],
  [/Gỗ Tràm \/ Gỗ Thông \/ Ván Ép tùy chọn theo tải trọng/gi, '相思木 / 进口松木 / 胶合板（按承重要求选配）'],
  [/Nhựa HDPE nguyên sinh 100% chống tia UV/gi, '100%全新抗紫外线高密度聚乙烯 (HDPE)'],
  [/Nhựa PP \/ HDPE tái sinh loại 1 siêu nhẹ/gi, '一级轻量化环保再生 PP / HDPE 材质'],
  [/Nhựa HDPE nhập khẩu Nhật \/ Hàn tuyển chọn/gi, '严选日韩进口高强度 HDPE 材质'],
  [/Gỗ Tràm \/ Gỗ Thông thanh chuẩn 70×16mm \+ 9 gù 90×90×90mm/gi, '70×16mm相思木/松木标准木条 + 9个90×90×90实心脚墩'],
  [/Ván ép Plywood 12–18mm \+ Khung xương gỗ Thông \/ Tràm/gi, '12–18mm高强胶合板箱壁 + 松木/相思木承重框架'],
  [/Nhựa HDPE nguyên sinh chịu lực cao/gi, '高抗冲100%全新HDPE原料'],
  [/Nhựa HDPE nguyên sinh bền dẻo/gi, '高韧性100%全新HDPE原料'],
  [/Nhựa PP \/ HDPE nguyên sinh chống va đập/gi, '耐冲击全新 PP / HDPE 工业原料'],

  // 2. Product Titles & Key Phrases
  [/Pallet tràm đố bằng phổ thông/gi, '通用平纵梁相思木托盘'],
  [/Pallet tràm đố bằng xuất khẩu/gi, '出口型三纵梁相思木托盘'],
  [/Pallet tràm gù/gi, '四向进叉九脚相思木托盘'],
  [/Pallet tràm/gi, '三纵梁相思木托盘'],
  [/Pallet gỗ tràm/gi, '相思木重型木托盘'],
  [/Pallet gỗ Thông mới/gi, '全新烘干进口松木托盘'],
  [/Pallet gỗ thông/gi, '进口烘干松木托盘'],
  [/Pallet gỗ ép/gi, '免熏蒸胶合板木托盘'],
  [/Pallet Ván Ép/gi, '免熏蒸胶合板托盘'],
  [/Gia Công Pallet Gỗ Theo Bản Vẽ Yêu Cầu Riêng \(Mọi Kích Thước\)/gi, '按客户CAD图纸非标定制实木托盘（全尺寸）'],
  [/Pallet Nhựa Mới Mặt Lưới Liền Khối HDPE/gi, '全新HDPE一体网格塑料托盘'],
  [/Pallet Nhựa Chân Cốc Siêu Nhẹ Xuất Khẩu 1 Chiều/gi, '九脚可套叠超轻出口一次性塑料托盘'],
  [/Pallet Nhựa Cũ Đã Qua Sử Dụng Độ Mới 85–95%/gi, '精选日韩二手HDPE塑料托盘 (85–95成新)'],
  [/Thùng gỗ đóng theo yêu cầu \/ Thùng gỗ kín ván ép máy móc/gi, '非标定制重型机械全封闭胶合板出口木箱'],
  [/Thùng Nhựa Đặc Công Nghiệp Có Nắp/gi, '工业级带盖实心HDPE塑料周转箱'],
  [/Thùng Nhựa Hở \/ Sóng Nhựa Hở Công Nghiệp/gi, '工业透气网格HDPE塑料周转箩'],
  [/Khay Nhựa Linh Kiện Công Nghiệp Xếp Chồng Kho Xưởng/gi, '可堆叠仓库货架塑料零件箱 (Eurobox)'],
  [/Thùng gỗ/gi, '斜撑加固带盖出口花格木箱'],
  [/Pallet gỗ/gi, '出口承重实木托盘'],

  // 3. Compound Title Tags & Custom CAD Spec Sentences (BEFORE short terms)
  [/4 đố · Ván dày 20mm/gi, '四纵梁 · 20mm厚板'],
  [/9 gù · Tải tĩnh 4\.000 kg/gi, '九脚 · 静载4000kg'],
  [/9 gù · 11 nan mặt 17mm/gi, '九脚 · 11根17mm顶板'],
  [/9 gù · 11 nan mặt 16mm/gi, '九脚 · 11根16mm顶板'],
  [/Bào láng 4 mặt · Độ ẩm ≤ 19%/gi, '四面刨光 · 含水率 ≤ 19%'],
  [/Gỗ thông khô < 18° · ISPM 15/gi, '烘干松木 <18% · ISPM 15'],
  [/12 cục gù · ISPM 15/gi, '12脚墩重型 · ISPM 15'],
  [/Gù đại 120×120 ISPM 15/gi, '120×120大脚墩 · ISPM 15'],
  [/Full 2 mặt · ISPM 15/gi, '双面满铺 · ISPM 15'],
  [/1 mặt · 4 đố ISPM 15/gi, '单面四纵梁 · ISPM 15'],
  [/4 đố · Hun trùng ISPM 15/gi, '四纵梁 · ISPM 15熏蒸'],
  [/Thiết kế bản vẽ CAD miễn phí theo kích thước hàng hóa & kệ kho/gi, '按货物尺寸与立体货架免费提供专业CAD工程图纸设计'],
  [/Tùy chọn kết cấu: 3–4 đố bằng, đố khuyết, 9–12 cục gù, 1 mặt hoặc 2 mặt/gi, '结构灵活定制：3–4根纵梁、缺口梁、9–12脚墩、单面或双面结构'],
  [/Dung sai gia công chuẩn ±2mm ~ ±5mm/gi, '精密裁切加工公差 ±2mm ~ ±5mm'],
  [/Lên mẫu thử tải trong 24 giờ/gi, '24小时内快速打样并实测承重'],
  [/Hỗ trợ bào láng, sấy khô, sơn cạnh logo & hun trùng HT ISPM 15/gi, '支持四面刨光、烘干防霉、四边喷印Logo及ISPM 15热处理熏蒸'],

  // 4. Specs & Technical Terms (Longer compound labels FIRST)
  [/Kết cấu:/gi, '进叉结构：'],
  [/9 cục gù nâng 4 hướng/gi, '9个实心脚墩 · 四向进叉'],
  [/3 gánh dọc nâng 2 hướng/gi, '3根纵梁 · 双向进叉'],
  [/Tấm mặt trên:/gi, '顶面胶合板：'],
  [/Ván mặt trên:/gi, '顶面胶合板：'],
  [/Tấm lót trên:/gi, '上层加固衬板：'],
  [/Thanh đỡ mặt trên:/gi, '面板加固横条：'],
  [/Thanh gánh mặt trên:/gi, '上层承重横梁：'],
  [/Thanh gánh mặt trên/gi, '上层承重横梁'],
  [/Thanh gánh trên gù:/gi, '脚墩上承重梁：'],
  [/Thanh nan mặt trên:/gi, '顶板木条：'],
  [/Thanh nan mặt trên/gi, '顶板木条：'],
  [/Nan mặt trên:/gi, '顶板木条：'],
  [/Thanh mặt trên:/gi, '顶板木条：'],
  [/Mặt trên \(nắp\):/gi, '顶部箱盖：'],
  [/Mặt trên:/gi, '顶面用料：'],
  [/Ván gánh mặt:/gi, '面板承重横梁：'],
  [/Ván gánh:/gi, '承重横梁：'],
  [/Nan gánh:/gi, '承重横梁：'],
  [/Thanh gánh:/gi, '承重横梁：'],
  [/Ván mặt:/gi, '顶面木板：'],
  [/Thanh mặt:/gi, '顶面木板：'],
  [/Chân đỡ \(cục gù\):/gi, '承重脚墩：'],
  [/Chân đỡ bản lớn:/gi, '加宽承重脚墩：'],
  [/Chân đỡ tiêu chuẩn:/gi, '标准脚墩：'],
  [/Chân đỡ:/gi, '承重脚墩：'],
  [/Cục gù chịu lực:/gi, '承重脚墩：'],
  [/Cục gù đại:/gi, '加厚大脚墩：'],
  [/Cục gù:/gi, '承重脚墩：'],
  [/Gù:/gi, '脚墩：'],
  [/Đố thẳng chịu lực:/gi, '承重直纵梁：'],
  [/Đố chịu lực:/gi, '承重纵梁：'],
  [/Đố dọc:/gi, '纵向承重梁：'],
  [/Thanh đà dọc:/gi, '纵向承重梁：'],
  [/Thanh đáy ngang:/gi, '底部横板：'],
  [/Thanh mặt đáy:/gi, '底面木板：'],
  [/Thanh nan mặt dưới:/gi, '底面木条：'],
  [/Thanh nan mặt dưới/gi, '底面木条：'],
  [/Nan đáy:/gi, '底板木条：'],
  [/Ván đáy:/gi, '底面木板：'],
  [/Thanh đáy dưới:/gi, '底面满铺木板：'],
  [/Thanh đáy:/gi, '底部拉板：'],
  [/Mặt đáy:/gi, '底座结构：'],
  [/Mặt dưới:/gi, '底面用料：'],
  [/Mặt đứng dài:/gi, '长侧箱壁：'],
  [/Mặt đứng rộng:/gi, '短端箱壁：'],
  [/Thể tích gỗ tiêu chuẩn:/gi, '单只标准木材材积：'],
  [/Kích thước:/gi, '外形尺寸：'],
  [/Quy cách chuẩn Mỹ:/gi, '美国GMA标准规格：'],
  [/Quy cách:/gi, '产品规格：'],
  [/Tải trọng làm việc:/gi, '额定工作承重：'],
  [/Tải trọng:/gi, '承重能力：'],
  [/tải động/gi, '动载'],
  [/tải tĩnh/gi, '静载'],
  [/dùng cho xe nâng tay & xe nâng máy/gi, '兼容手动液压车与机动叉车'],
  [/Xử lý hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư/gi, '符合ISPM 15国际HT热处理熏蒸标准（附官方检疫证书）'],
  [/Xử lý nhiệt HT chuẩn quốc tế ISPM 15/gi, '符合国际ISPM 15热处理出口标准'],
  [/Hun trùng HT ISPM 15/gi, 'ISPM 15 热处理熏蒸认证'],
  [/Hỗ trợ đóng mộc hun trùng ISPM 15/gi, '支持加盖ISPM 15 IPPC熏蒸章'],
  [/Gỗ thông khô dưới 18 độ/gi, '烘干松木（含水率 < 18%）'],
  [/Bào láng 4 mặt/gi, '四面精细刨光'],
  [/Bào láng mặt/gi, '面板刨光平整'],
  [/sấy khô/gi, '烘干处理'],
  [/độ ẩm/gi, '含水率'],
  [/Độ ẩm/gi, '含水率'],
  [/Giao tại xưởng hoặc cảng Cát Lái/gi, '支持工厂自提或专车直送吉来港(Cat Lai)'],
  [/Sơn 4 cạnh theo yêu cầu/gi, '支持四边喷涂企业标识Logo'],
  [/Đinh (\d+[–-]\d+cm)/gi, '$1防脱螺纹钢钉'],
  [/thiết kế full 2 mặt/gi, '双面满铺加固结构'],
  [/thiết kế 1 mặt/gi, '单面经济型结构'],
  [/Ván 10mm gọn nhẹ/gi, '10mm轻型空运款'],
  [/Ván dày 15mm gia cố/gi, '15mm加厚重型加固款'],
  [/Ván dày 20mm/gi, '20mm加厚实木板'],
  [/1 mặt lưới thoáng khí/gi, '单面透气防滑网格'],
  [/3 chân suốt nâng 4 hướng/gi, '川字三底脚 · 四向进叉'],
  [/Nút cao su chống trượt/gi, '配防滑橡胶垫'],
  [/Dùng tốt trong kho lạnh/gi, '耐受-20°C冷库低温'],
  [/9 chân cốc xếp lồng vào nhau \(Nestable\)/gi, '九脚杯可套叠设计（省65%空间）'],
  [/Nâng 4 hướng/gi, '四向进叉'],
  [/Trọng lượng nhẹ/gi, '超轻自重'],
  [/Miễn ISPM 15/gi, '免熏蒸出口'],
  [/Tuyển chọn kỹ không nứt gãy/gi, '逐一严选无裂纹破损'],
  [/Độ mới 85–95%/gi, '85–95成新优质品相'],
  [/Đủ loại mặt lưới \/ mặt bít \/ chân giằng/gi, '网格/平板/川字/田字规格齐全'],
  [/Đế pallet chịu tải nặng/gi, '底部重型叉车托盘底座'],
  [/Vách kín ván ép hoặc nan thưa theo bản vẽ/gi, '按图纸定制全封闭胶合板或花格箱壁'],
  [/Hỗ trợ hút chân không & lắp ráp tận nơi/gi, '支持铝箔抽真空防潮及木工上门打箱'],
  [/Thành kín chống bụi & ẩm ướt/gi, '全封闭箱壁防尘防潮'],
  [/Gân tăng cứng xung quanh/gi, '四周密集加强筋抗冲击'],
  [/Tay cầm chịu lực/gi, '人性化加固提手'],
  [/Kèm nắp đậy kín khít/gi, '配密封防尘箱盖'],
  [/Thành nan hở thoáng khí thoát nước nhanh/gi, '网格透气箱壁，排水通风快'],
  [/Vành miệng gia cố chịu tải/gi, '箱口加厚加固，多层堆码稳固'],
  [/Tay cầm 2 đầu tiện bốc xếp/gi, '两端防滑搬运把手'],
  [/Thành đứng tối ưu thể tích chứa/gi, '垂直箱壁最大化内部容积'],
  [/Đáy phẳng chạy mượt trên băng chuyền & kệ kho công nghiệp/gi, '平底加固设计，顺畅适配流水线滚筒与货架'],

  // 5. Badges & Units (Longer uppercase badges FIRST)
  [/MÃ (PTA-[TG]\d+|TG-\d+)/g, '型号 $1'],
  [/9 GÙ \/ 4 HƯỚNG/g, '九脚 / 四向进叉'],
  [/3 GÁNH \/ 2 HƯỚNG/g, '三纵梁 / 双向进叉'],
  [/GIÁ TẬN XƯỞNG/g, '工厂直供价'],
  [/KHỔ LỚN/g, '大尺寸重型'],
  [/KHỔ GỌN/g, '紧凑轻巧款'],
  [/KHỔ /g, '规格 '],
  [/VUÔNG (\d+×\d+)/g, '方形 $1'],
  [/11 NAN MẶT (\d+MM)/g, '11根$1顶板'],
  [/11 NAN (\d+MM)/g, '11根$1木条'],
  [/TẢI > 1\.500 KG/g, '承重 > 1500KG'],
  [/4 ĐỐ CHỊU LỰC/g, '四纵梁高承重'],
  [/4 ĐỐ THẲNG/g, '四根直纵梁'],
  [/4 ĐỐ DỌC/g, '四根纵梁'],
  [/ĐÁY KHUNG KÍN/g, '田字全封闭底'],
  [/HỖ TRỢ HUN TRÙNG/g, '支持热处理熏蒸'],
  [/GỖ THÔNG < 18°/g, '烘干松木 <18%'],
  [/6 NAN TRÊN \+ 6 DƯỚI/g, '上6根+下6根'],
  [/12 CỤC GÙ/g, '12个重型脚墩'],
  [/9 GÙ ĐẠI 120×120/g, '9个120×120大脚墩'],
  [/SƠN CẠNH THEO YÊU CẦU/g, '支持喷印标识'],
  [/FULL 2 MẶT \(22 NAN\)/g, '双面满铺(22根)'],
  [/TIẾT KIỆM CHI PHÍ/g, '高性价比'],
  [/MIỄN HUN TRÙNG/g, '出口免熏蒸'],
  [/VÁN 12MM \+ LÓT 9MM/g, '12mm面板+9mm衬板'],
  [/VÁN 10MM SIÊU NHẸ/g, '10mm空运轻型'],
  [/VÁN DÀY 15MM/g, '15mm加厚面板'],
  [/VÁN DÀY 20MM/g, '20mm加厚实木'],
  [/GIA CỐ 4 THANH ĐỠ/g, '4根加固横条'],
  [/CHỊU TẢI NẶNG/g, '重型高承重'],
  [/BÀO LÁNG 4 MẶT/g, '四面精细刨光'],
  [/TẢI TĨNH 4\.000 KG/g, '静载4吨'],
  [/CHUẨN MỸ/g, '美国GMA标准'],
  [/THEO BẢN VẼ RIÊNG/g, '按图非标定制'],
  [/LÊN MẪU 24 GIỜ/g, '24小时快速打样'],
  [/MIỄN PHÍ THIẾT KẾ/g, '免费CAD设计'],
  [/ĐẾ 9 GÙ \+ GIẰNG CHÉO/g, '九脚底座+斜撑加固'],
  [/CÓ NẮP ĐẬY/g, '配齐顶盖'],
  [/CÓ NẮP KÍN/g, '密封带盖'],
  [/ĐÓNG THEO YÊU CẦU/g, '按设备尺寸定制'],
  [/LẮP RÁP TẬN NƠI/g, '上门驻厂打箱'],
  [/CHUẨN ISPM 15/g, 'ISPM 15 认证'],
  [/NHỰA HDPE NGUYÊN SINH/g, '全新HDPE原料'],
  [/HDPE NGUYÊN SINH/g, '100%全新HDPE'],
  [/NHỰA NGUYÊN SINH/g, '全新原生塑料'],
  [/CHỊU KHO LẠNH/g, '耐冷库低温'],
  [/4 HƯỚNG NÂNG/g, '四向进叉'],
  [/CHÂN CỐC XẾP LỒNG/g, '九脚可套叠'],
  [/SIÊU NHẸ ~7KG/g, '超轻约7kg'],
  [/MIỄN ISPM 15/g, '免熏蒸检疫'],
  [/TIẾT KIỆM 40%/g, '立省40%成本'],
  [/ĐỘ MỚI 85–95%/g, '85–95成新'],
  [/SẴN KHO LỚN/g, '大量现货'],
  [/XẾP CHỒNG KHO/g, '多层稳固堆码'],
  [/SÓNG NHỰA HỞ/g, '透气周转箩'],
  [/THOÁNG KHÍ/g, '通风沥水'],
  [/GIÁ SỈ KHO XƯỞNG/g, '源头批发价'],
  [/GIÁ SỈ B2B/g, 'B2B批发直供'],
  [/CHUẨN KỆ KHO/g, '标准货架尺寸'],
  [/Liên hệ/gi, '联系询价'],
  [/Tùy biến/gi, '按需定制'],
  [/xếp chồng/gi, '堆码承重'],
  [/thùng/gi, '箱'],
  [/khay/gi, '盒'],
  [/(\d+)\s*thanh ngang dài/gi, '$1根长横条'],
  [/(\d+)\s*thanh dọc ngắn/gi, '$1根短纵条'],
  [/(\d+)\s*giằng chéo/gi, '$1根斜撑木条'],
  [/(\d+)\s*thanh bìa/gi, '$1根边板'],
  [/(\d+)\s*thanh giữa/gi, '$1根中间板'],
  [/(\d+)\s*thanh tâm/gi, '$1根中心板'],
  [/(\d+)\s*thanh gánh/gi, '$1根横梁'],
  [/(\d+)\s*thanh đáy/gi, '$1根底板'],
  [/(\d+)\s*cục gù/gi, '$1个脚墩'],
  [/(\d+)\s*ngang/gi, '$1根横条'],
  [/(\d+)\s*đứng/gi, '$1根立柱'],
  [/(\d+)\s*ván mặt/gi, '$1块面板'],
  [/(\d+)\s*tấm/gi, '$1张'],
  [/(\d+)\s*thanh/gi, '$1根'],
  [/(\d+)\s*cục/gi, '$1个'],
  [/cao (\d+)\s*mm/gi, '高$1mm'],
];

function applyReplacements(text: string, rules: [RegExp, string][]): string {
  let out = text;
  for (const [pattern, rep] of rules) {
    out = out.replace(pattern, rep);
  }
  return out;
}

/**
 * Generate crisp, native B2B description, highlights & usagePurpose for EN & ZH
 * so long prose paragraphs never look semi-translated!
 */
function generateLocalizedProse(
  p: Product,
  locale: 'en' | 'zh',
  localizedName: string,
  localizedSpec: string,
  localizedStatic: string,
  localizedDynamic: string
): {
  description: string;
  highlights: string[];
  usagePurpose: string;
  fbTitle: string;
  fbDesc: string;
} {
  const specBullets = localizedSpec
    .split(/[\u00b7\u2022\n]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (locale === 'en') {
    const isPlywood = p.categorySlug === 'pallet-van-ep';
    const isPlasticPallet = p.categorySlug === 'pallet-nhua-moi' || p.categorySlug === 'pallet-nhua-cu';
    const isPlasticBox = p.categorySlug === 'thung-nhua';
    const isCrate = p.categorySlug === 'thung-go-dong-hang';

    const description = isPlywood
      ? `${localizedName} manufactured directly at Truong An Pallet Factory (Ba Diem, Ho Chi Minh City). Built with smooth multi-ply industrial plywood and high-density compressed blocks for 4-way forklift entry — lightweight, splinter-free, and 100% exempt from ISPM 15 fumigation for fast global customs clearance.`
      : isPlasticPallet
        ? `${localizedName} supplied at factory-direct B2B wholesale pricing. Engineered from high-impact HDPE/PP resin for waterproof durability, zero mold or insect risk, easy washdown, and smooth 4-way forklift & pallet-jack handling.`
        : isPlasticBox
          ? `${localizedName} molded from heavy-duty virgin HDPE/PP resin for industrial warehousing, electronics components, agricultural produce, and cold-chain logistics. Designed to stack securely on standard 1200×1000mm pallets.`
          : isCrate
            ? `${localizedName} fabricated at Truong An Wooden Crate Factory. Engineered with a heavy-duty forklift pallet base, diagonal structural bracing, and full ISPM 15 HT export certification to safeguard industrial machinery and export cargo.`
            : `${localizedName} manufactured in-house at Truong An Pallet Factory (Ba Diem, Ho Chi Minh City). Precision-cut timber fastened with industrial spiral nails to deliver reliable static (${localizedStatic}) and dynamic (${localizedDynamic}) load performance for factory warehousing and export container shipping.`;

    const highlights = [
      ...specBullets.slice(0, 3),
      p.isExportStandard
        ? 'Full export compliance (ISPM 15 HT certified / fumigation-free) with fast HCMC & Southern IP delivery'
        : 'Direct factory-gate pricing with custom dimension adjustments & 24h sample prototyping',
    ];

    const usagePurpose = isPlywood
      ? 'Air Cargo, ocean container exports to US/EU/Cambodia/Japan, electronics & carton packaging'
      : isPlasticPallet
        ? 'Cold storage, food & pharma GMP warehouses, racking systems & one-way export shipments'
        : isPlasticBox
          ? 'Component sorting, electronics, garment factories, cold-chain food & warehouse shelving'
          : isCrate
            ? 'Heavy CNC machinery, electrical cabinets, auto parts & ocean freight export crating'
            : p.isExportStandard
              ? 'Export container loading (US, EU, Asia), heavy warehouse stacking & industrial logistics'
              : 'Factory floor warehousing, domestic distribution, packaging & industrial racking';

    return {
      description,
      highlights,
      usagePurpose,
      fbTitle: `Workshop production: ${localizedName}`,
      fbDesc: 'Precision-cut materials, strict load & moisture inspection prior to direct truck delivery.',
    };
  }

  // Simplified Chinese (ZH)
  const isPlywood = p.categorySlug === 'pallet-van-ep';
  const isPlasticPallet = p.categorySlug === 'pallet-nhua-moi' || p.categorySlug === 'pallet-nhua-cu';
  const isPlasticBox = p.categorySlug === 'thung-nhua';
  const isCrate = p.categorySlug === 'thung-go-dong-hang';

  const description = isPlywood
    ? `${localizedName} 由胡志明市巴点区长安木托盘厂源头直产。采用高强度多层胶合板面板搭配高密度压缩脚墩，支持四向叉车进叉；表面平整无毛刺、自重轻，出口欧美日韩及东盟100%免除ISPM 15熏蒸检疫手续，通关极速便捷。`
    : isPlasticPallet
      ? `${localizedName} 源头仓库大宗批发直供。采用高强度HDPE/PP原料一体注塑成型，防水防潮、无虫蛀发霉风险、耐冷库低温且易冲洗清洁，完美适配机动叉车与手动液压搬运车四向进叉。`
      : isPlasticBox
        ? `${localizedName} 采用优质全新HDPE/PP工业原料制造，抗冲击性强、多层堆码稳固，广泛适用于五金电子零件分类、生鲜果蔬水产周转及现代化工厂货架配套。`
        : isCrate
          ? `${localizedName} 由长安包装厂严格按标准开料精工制作。底部自带重型叉车托盘底座，四面箱壁配抗扭斜撑加固（或全封闭胶合板防护），可配套ISPM 15热处理熏蒸证书及上门驻厂打箱服务，全方位保障出口机械设备安全。`
          : `${localizedName} 由胡志明市长安木托盘源头工厂直接开料生产。严选无腐优质实木板材，采用工业防脱螺纹钢钉加固，静载 (${localizedStatic}) 与动载 (${localizedDynamic}) 表现优异，广泛适用于工厂仓储周转与海运集装箱出口。`;

  const highlights = [
    ...specBullets.slice(0, 3),
    p.isExportStandard
      ? '符合国际出口检疫规范（支持ISPM 15热处理证书 / 免熏蒸通关），专车极速送达厂区'
      : '源头工厂一手批发价，支持按客户图纸微调尺寸并在24小时内快速打样测载',
  ];

  const usagePurpose = isPlywood
    ? '国际空运(Air Cargo)、海运出口欧美/柬埔寨/日韩、电子精密仪器与纸箱包装'
    : isPlasticPallet
      ? '水产冷库、食品医药GMP洁净车间、立体货架周转及一次性出口装柜'
      : isPlasticBox
        ? '五金电子物料分类、服装鞋帽厂、果蔬农产品周转与标准货架存储'
        : isCrate
          ? 'CNC数控机床、配电柜、五金模具及大型工业设备海运出口包装'
          : p.isExportStandard
            ? '出口集装箱装柜（欧美、日韩、东盟）、重型货物多层堆码与工厂立体仓周转'
            : '工厂车间垫仓、国内物流周转、纸箱包装材料及重物堆放';

  return {
    description,
    highlights,
    usagePurpose,
    fbTitle: `长安工厂车间实产：${localizedName}`,
    fbDesc: '板材足尺开料，出厂前严格核验结构承重与含水率，自有货车队准时送达。',
  };
}

function autoLocalizeProduct(p: Product, locale: 'en' | 'zh'): Product {
  const rules = locale === 'en' ? EN_REPLACEMENTS : ZH_REPLACEMENTS;
  const catMapped = CATEGORY_MAP[p.categorySlug]?.[locale];

  const localizedName = applyReplacements(p.name, rules);
  const localizedWood = applyReplacements(p.woodType, rules);
  const localizedSpec = applyReplacements(p.specification || '', rules);
  const localizedStatic = applyReplacements(p.staticLoad || '', rules);
  const localizedDynamic = applyReplacements(p.dynamicLoad || '', rules);
  const localizedPrice = applyReplacements(p.priceDisplay || 'Liên hệ', rules);
  const localizedBadges = (p.badges || []).map((b) => applyReplacements(b, rules));

  const prose = generateLocalizedProse(
    p,
    locale,
    localizedName,
    localizedSpec,
    localizedStatic,
    localizedDynamic
  );

  return {
    ...p,
    name: localizedName,
    category: catMapped ? catMapped.name : p.category,
    woodType: localizedWood,
    staticLoad: localizedStatic,
    dynamicLoad: localizedDynamic,
    priceDisplay: localizedPrice,
    specification: localizedSpec,
    description: prose.description,
    highlights: prose.highlights,
    usagePurpose: prose.usagePurpose,
    badges: localizedBadges,
    facebookProof: p.facebookProof
      ? {
          ...p.facebookProof,
          title: prose.fbTitle,
          description: prose.fbDesc,
        }
      : undefined,
  };
}

/**
 * Tạo tự động bộ translations { en, zh } để lưu thẳng vào cột JSONB trên Supabase khi Admin thêm/sửa sản phẩm
 */
export function buildAutoProductTranslations(p: Product): NonNullable<Product['translations']> {
  const { translations: _ignore, ...base } = p;
  const en = autoLocalizeProduct(base as Product, 'en');
  const zh = autoLocalizeProduct(base as Product, 'zh');
  return {
    en: {
      name: en.name,
      category: en.category,
      woodType: en.woodType,
      staticLoad: en.staticLoad,
      dynamicLoad: en.dynamicLoad,
      specification: en.specification,
      priceDisplay: en.priceDisplay,
      description: en.description,
      highlights: en.highlights,
      usagePurpose: en.usagePurpose,
      badges: en.badges,
      facebookProof: en.facebookProof,
    },
    zh: {
      name: zh.name,
      category: zh.category,
      woodType: zh.woodType,
      staticLoad: zh.staticLoad,
      dynamicLoad: zh.dynamicLoad,
      specification: zh.specification,
      priceDisplay: zh.priceDisplay,
      description: zh.description,
      highlights: zh.highlights,
      usagePurpose: zh.usagePurpose,
      badges: zh.badges,
      facebookProof: zh.facebookProof,
    },
  };
}

export function localizeProduct(p: Product, locale: Locale): Product {
  if (locale === 'vi') return p;

  const auto = autoLocalizeProduct(p, locale);
  const dbTrans = p.translations?.[locale];
  if (!dbTrans) return auto;

  return {
    ...auto,
    ...(dbTrans.name ? { name: dbTrans.name } : {}),
    ...(dbTrans.category ? { category: dbTrans.category } : {}),
    ...(dbTrans.woodType ? { woodType: dbTrans.woodType } : {}),
    ...(dbTrans.staticLoad ? { staticLoad: dbTrans.staticLoad } : {}),
    ...(dbTrans.dynamicLoad ? { dynamicLoad: dbTrans.dynamicLoad } : {}),
    ...(dbTrans.specification ? { specification: dbTrans.specification } : {}),
    ...(dbTrans.priceDisplay ? { priceDisplay: dbTrans.priceDisplay } : {}),
    ...(dbTrans.description ? { description: dbTrans.description } : {}),
    ...(dbTrans.highlights?.length ? { highlights: dbTrans.highlights } : {}),
    ...(dbTrans.usagePurpose ? { usagePurpose: dbTrans.usagePurpose } : {}),
    ...(dbTrans.badges?.length ? { badges: dbTrans.badges } : {}),
    ...(dbTrans.facebookProof ? { facebookProof: dbTrans.facebookProof } : {}),
  };
}

// ============================================================================
// 3. WORKSHOP SPECS TABLE ROW LOCALIZER
// ============================================================================
export function localizeWorkshopRow(row: WorkshopSpecRow, locale: Locale): WorkshopSpecRow {
  if (locale === 'vi') return row;
  if (locale === 'en') {
    return {
      ...row,
      structure: row.structure
        .replace('3 gánh / nâng 2 hướng', '3-stringer / 2-way')
        .replace('9 gù / nâng 4 hướng', '9-block / 4-way')
        .replace('Mặt kín 9 gù / 4 hướng', 'Solid deck 9-block / 4-way')
        .replace('Mặt kín 9 gù gọn nhẹ', 'Lightweight 9-block / 4-way')
        .replace('Mặt dày 15mm + 4 thanh đỡ', '15mm deck + 4 support battens')
        .replace('Đế 9 gù + vách giằng chéo + nắp', '9-block base + braced walls + lid'),
      topDeck: row.topDeck
        .replace(/(\d+)\s*nan/g, '$1 slats')
        .replace(/1 tấm/g, '1 sheet')
        .replace(/\+ lót 9mm/g, '+ 9mm liner')
        .replace(/\+ 4 thanh đỡ/g, '+ 4 battens')
        .replace(/Nắp:/g, 'Lid:')
        .replace(/thanh/g, 'slats'),
      support: row.support
        .replace(/3 gánh dọc cao/g, '3 stringers H=')
        .replace(/(\d+)\s*gù/g, '$1 blocks')
        .replace(/Đứng/g, 'Posts')
        .replace(/thanh/g, 'pcs')
        .replace(/Chéo/g, 'Braces'),
    };
  }
  return {
    ...row,
    structure: row.structure
      .replace('3 gánh / nâng 2 hướng', '三纵梁 / 双向进叉')
      .replace('9 gù / nâng 4 hướng', '九脚墩 / 四向进叉')
      .replace('Mặt kín 9 gù / 4 hướng', '整面九脚 / 四向进叉')
      .replace('Mặt kín 9 gù gọn nhẹ', '轻型整面九脚')
      .replace('Mặt dày 15mm + 4 thanh đỡ', '15mm厚板 + 4根支撑条')
      .replace('Đế 9 gù + vách giằng chéo + nắp', '九脚底座 + 四面斜撑 + 顶盖'),
    topDeck: row.topDeck
      .replace(/(\d+)\s*nan/g, '$1根顶板')
      .replace(/1 tấm/g, '1张面板')
      .replace(/\+ lót 9mm/g, '+ 9mm衬板')
      .replace(/\+ 4 thanh đỡ/g, '+ 4根支撑条')
      .replace(/Nắp:/g, '箱盖:')
      .replace(/thanh/g, '根'),
    support: row.support
      .replace(/3 gánh dọc cao/g, '3根纵梁 高')
      .replace(/(\d+)\s*gù/g, '$1个脚墩')
      .replace(/Đứng/g, '立柱')
      .replace(/thanh/g, '根')
      .replace(/Chéo/g, '斜撑'),
  };
}

// ============================================================================
// 4. ACTIVITIES LOCALIZER (/hoat-dong)
// ============================================================================
const ACTIVITY_CAT_MAP: Record<string, { en: { name: string; desc: string }; zh: { name: string; desc: string } }> = {
  'ban-giao': {
    en: { name: 'Fleet Delivery & Handover', desc: 'On-time pallet & crate deliveries to B2B factory warehouses.' },
    zh: { name: '专车出货与交付', desc: '成品托盘与木箱按期专车送达各大企业仓库实录。' },
  },
  'don-gap': {
    en: { name: 'Urgent Custom Fabrication', desc: 'Fast-track custom orders built to meet tight vessel cutoffs.' },
    zh: { name: '加急定制赶柜单', desc: '快速响应紧急船期，按图纸加班精工赶制重型托盘与木箱。' },
  },
  'trinh-mau': {
    en: { name: 'Prototype & Load Testing', desc: 'Physical sample prototyping and forklift load verification with clients.' },
    zh: { name: '实物打样与测载', desc: '大批量投产前制作实物样板供客户现场核验尺寸与叉车承重。' },
  },
  ispm15: {
    en: { name: 'ISPM 15 Kiln & Heat Treatment', desc: 'Certified HT heat treatment (<20% moisture) for US & EU exports.' },
    zh: { name: 'ISPM 15 热处理烘干', desc: '规范执行HT高温除虫烘干（含水率<20%），护航欧美出口通关。' },
  },
};

export function localizeActivityCategory(cat: ActivityCategoryInfo, locale: Locale): ActivityCategoryInfo {
  if (locale === 'vi') return cat;
  const m = ACTIVITY_CAT_MAP[cat.id]?.[locale];
  return m ? { ...cat, name: m.name, description: m.desc } : cat;
}

const CURATED_ACTIVITIES: Record<
  string,
  {
    en: Pick<Activity, 'title' | 'summary' | 'content' | 'customerLocation' | 'clientType' | 'badges' | 'highlights'>;
    zh: Pick<Activity, 'title' | 'summary' | 'content' | 'customerLocation' | 'clientType' | 'badges' | 'highlights'>;
  }
> = {
  act2: {
    en: {
      title: 'Completed VIP 1000 × 1200 × 150mm Kiln-Dried Pine Sample Pallet for Export Buyer Approval',
      summary:
        'This morning Truong An Factory completed a VIP-grade 1000 × 1200 × 150mm ocean-export pine pallet prototype for physical inspection and forklift load testing prior to mass production.',
      content: `This morning, **Truong An Pallet Factory** completed a **VIP 1000 × 1200 × 150mm kiln-dried pine pallet prototype** for client inspection ahead of a major ocean-export contract.\n\n### Strict Quality Control on Every Detail:\n- **Selected kiln-dried pine:** 100% new kiln-dried timber with bright grain and long-term dimensional stability.\n- **Precision tolerances:** Every deck board, stringer, and block is cut within ±2mm accuracy.\n- **Heavy-duty fastening:** Industrial spiral nails prevent loosening during long-haul sea container transit.\n- **Smooth finish & ISPM 15 ready:** 4-side planed smooth, chamfered edges, ready for HT heat treatment and IPPC stamping.\n\n### Why Physical Prototyping Matters:\n1. **Verify real build quality:** Measure dimensions and inspect timber grade firsthand.\n2. **Real cargo load testing:** Test actual product stacking and forklift handling at your warehouse.\n3. **100% confidence before bulk production:** Confirm our factory capacity and craftsmanship before signing.`,
      customerLocation: 'Ho Chi Minh City & Cat Lai Port',
      clientType: 'Ocean Export Manufacturing Enterprise',
      badges: ['VIP Sample Prototype', 'Selected Pine Wood', 'Ocean Export Grade', 'Heavy-Duty Build'],
      highlights: [
        '100% new kiln-dried pine wood with clean, bright grain',
        'Precision ±2mm cutting across all deck boards and blocks',
        'Reinforced spiral-nail structure built for ocean container freight',
        'Physical sample approved prior to bulk contract production',
        'Full ISPM 15 HT phytosanitary certification available',
      ],
    },
    zh: {
      title: '完成 VIP 款 1000 × 1200 × 150mm 出口级进口松木托盘实物打样送检',
      summary: '今日上午，长安木托盘厂顺利完成 1000 × 1200 × 150mm 高端海运出口松木托盘样品制作，交付客户仓库进行现场尺寸核验与叉车承重测试。',
      content: `今日上午，**长安木托盘厂**圆满完成 **1000 × 1200 × 150mm VIP款进口烘干松木托盘**实物样板，供出口合作企业在正式大批量排产前进行实测验收。\n\n### 严控每一个工艺细节：\n- **精选烘干松木：** 100%采用全新烘干松木板材，木纹清晰洁净，长期仓储不易变形发霉。\n- **精准开料公差：** 每一块面板、横梁与脚墩均严格控制在 ±2mm 极小误差范围内。\n- **坚固防脱连接：** 全程采用工业级防脱螺纹钢钉枪打钉，确保长途海运集装箱颠簸不松动。\n- **四面刨光整洁：** 表面光滑无毛刺，全面符合 ISPM 15 国际植物检疫出口标准。\n\n### 实物打样的三大价值：\n1. **眼见为实的品质：** 现场实测长宽高厚度，亲手检验木材干湿度与做工。\n2. **真实货物压载测试：** 直接放上贵司产品并用叉车实地进叉搬运测试。\n3. **安心签订大宗订单：** 直观了解源头工厂加工实力，保障后续大货100%一致。`,
      customerLocation: '胡志明市 & 吉来港 (Cát Lái)',
      clientType: '海运出口制造企业',
      badges: ['VIP实物打样', '精选烘干松木', '海运出口标准', '高强承重'],
      highlights: [
        '严选全新烘干进口松木，纹理洁净、结构稳定',
        '各部件精准裁切，尺寸公差严控在 ±2mm 以内',
        '螺纹钢钉加固结构，轻松胜任远洋货柜运输',
        '支持大批量下单前先看实物样板再投产',
        '配套齐全 ISPM 15 热处理熏蒸通关证书',
      ],
    },
  },
  act1: {
    en: {
      title: 'Urgent Custom-Engineered Pallets — Safe Export Packaging for Heavy Machinery',
      summary:
        'Truong An Factory fast-tracked a batch of custom heavy-duty pallets engineered specifically for off-center industrial machinery exports, complete with ISPM 15 certification.',
      content: `Truong An Pallet Factory recently fast-tracked a custom batch of heavy-duty wooden pallets for an industrial machinery exporter facing a tight vessel cutoff.\n\n### Why Machinery Export Pallets Require Custom Engineering:\n- **Protect high-value equipment:** Off-center heavy machinery requires reinforced runners and thick deck boards to eliminate flexing during ocean transit.\n- **Strict global compliance:** Full adherence to ISPM 15 phytosanitary rules for US, EU, and Japanese ports.\n- **Container space optimization:** Tailored footprints maximize 20ft/40ft container utilization.\n\n### Urgent Deadlines Handled Smoothly:\n- **Overtime production shifts:** Skilled carpenters work extended shifts to guarantee on-time delivery.\n- **In-stock timber reserves:** Abundant Acacia and Pine lumber ready for immediate cutting.\n- **Built strictly to CAD drawing:** Reinforced spiral-nail construction inspected before dispatch.`,
      customerLocation: 'Ho Chi Minh City Industrial Zone',
      clientType: 'Heavy Machinery Manufacturer & Exporter',
      badges: ['Urgent Rush Order', 'Built to CAD Drawing', 'Heavy Machinery Load', 'ISPM 15 Export'],
      highlights: [
        'Fast-track rush production aligned with vessel cutoff schedules',
        'Large raw timber stock ensures zero material delays',
        '100% faithful fabrication to client machinery CAD drawings',
        'Reinforced heavy-load base safe for cranes and forklifts',
        'Includes ISPM 15 HT heat treatment and certificates',
      ],
    },
    zh: {
      title: '加急按图定制重型机械专用木托盘 — 护航大型设备安全出口装柜',
      summary: '长安木托盘厂高效承接并火速交付一批重型机械出口专用定制托盘，严格按CAD工程图纸加固结构并完成ISPM 15热处理检疫，准时赶上船期。',
      content: `近日，长安木托盘厂直接承制了一批重型工业机械出口专用非标托盘。面对紧迫的截关装柜时间，本厂从木材开料、结构加固到热处理盖章全程高效衔接，确保客户按时出运。\n\n### 为什么重型机械出口托盘必须专业定制？\n- **杜绝设备受损：** 机械设备价值高且重心往往不均，底盘必须针对性加密横梁与厚板，防止吊装及海运途中变形断裂。\n- **符合国际检疫法规：** 100%满足美国、欧盟、日本等目的港严苛的 ISPM 15 植物检疫要求。\n- **最大化集装箱利用率：** 精准匹配货柜内径设计尺寸，降低海运物流成本。\n\n### 急单交付保障：\n- **弹性加班排产：** 资深木工班组连班作业，全力配合客户装柜时间表。\n- **原木库存充足：** 常备大量优质相思木与进口松木板材，随下随切不待料。\n- **严格按图施工：** 采用加长螺纹钉紧固连接，出厂前逐一核验尺寸。`,
      customerLocation: '胡志明市工业园区',
      clientType: '机械设备制造与出口企业',
      badges: ['紧急赶船期单', '按CAD图纸定制', '重型设备承重', 'ISPM 15出口标准'],
      highlights: [
        '快速响应紧急交期，全力配合集装箱装柜时间',
        '自有充足烘干木材库存，绝不因缺料延误工期',
        '100%严格按照客户设备CAD图纸尺寸定制加工',
        '加密承重底盘设计，保障重型叉车安全搬运',
        '配套完成 ISPM 15 热处理盖章与检疫出证',
      ],
    },
  },
  act3: {
    en: {
      title: 'On-Site Crating Dispatch: Same-Day Wooden Crate Assembly at Client Factory for Container Loading',
      summary:
        'Our mobile carpentry team traveled directly to our partner’s plant with pre-cut timber and plywood panels to pack, brace, and seal heavy machinery in time for same-day container stuffing.',
      content: `For oversized industrial machinery that cannot be moved prior to packaging, **Truong An Factory** dispatches our mobile carpentry crew directly to your facility.\n\n### End-to-End On-Site Crating Workflow:\n- **Pre-cut components at our workshop:** Pallet bases, structural frames, and plywood walls are precision-cut in advance to save time on site.\n- **Moisture & shock protection:** Equipment is wrapped in PE film / vacuum foil with anti-slip blocking and diagonal bracing.\n- **Fast same-day completion:** Pneumatic nailers and experienced carpenters complete assembly right beside your loading dock ahead of container seal time.`,
      customerLocation: 'Binh Duong & Ho Chi Minh City',
      clientType: 'FDI Industrial Equipment Factory',
      badges: ['On-Site Crating', 'Same-Day Completion', 'Machinery Protection', 'ISPM 15 Certified'],
      highlights: [
        'Mobile carpentry crew dispatched directly to client factory floor',
        'Heavy-duty pallet base + diagonal bracing prevents transit shifting',
        'Completed within the same day to meet container loading cutoff',
        'Full ISPM 15 HT stamped lumber and export documentation',
      ],
    },
    zh: {
      title: '机动木工驻厂实录：携料上门现场组装重型机械出口木箱，当日顺利封柜',
      summary: '长安机动木工团队携带预裁实木底座与胶合板箱壁直接前往合作工厂车间，现场完成设备定位、防震斜撑加固与木箱封盖，保障当日准时集装箱出运。',
      content: `针对体积庞大、不便裸机转运的大型工业设备，**长安木托盘与木箱包装厂**提供省心的**木工团队上门驻厂打木箱服务**。\n\n### 标准化上门打箱流程：\n- **工厂预制组件：** 提前在本厂车间精准裁切好九脚/纵梁重型底座与箱板，大幅缩短在客户现场的施工时间。\n- **多重防潮防震加固：** 配合缠绕膜、铝箔真空包装、底座定位木方及四面抗扭斜撑，彻底消除海运晃动隐患。\n- **当日高效完工封柜：** 专业木工携带气动工具现场快速合箱封盖，无缝衔接集装箱拖车装柜。`,
      customerLocation: '平阳省工业区 & 胡志明市',
      clientType: '外资FDI机械制造企业',
      badges: ['上门驻厂打箱', '当日完工装柜', '重型设备防护', 'ISPM 15熏蒸认证'],
      highlights: [
        '专业木工团队携带板材工具直接上门驻厂作业',
        '重型承重底盘搭配防震定位木方，杜绝设备移位',
        '当日高效完成打包合箱，绝不耽误拖车封柜时间',
        '全套木材符合 ISPM 15 出口检疫标准并配齐证书',
      ],
    },
  },
};

export function localizeActivity(act: Activity, locale: Locale): Activity {
  if (locale === 'vi') return act;
  const dbTrans = act.translations?.[locale];
  if (dbTrans && dbTrans.title) {
    return {
      ...act,
      ...dbTrans,
    };
  }
  const curated = CURATED_ACTIVITIES[act.id]?.[locale];
  if (curated) {
    return { ...act, ...curated };
  }
  const rules = locale === 'en' ? EN_REPLACEMENTS : ZH_REPLACEMENTS;
  return {
    ...act,
    title: applyReplacements(act.title, rules),
    summary: applyReplacements(act.summary, rules),
    badges: (act.badges || []).map((b) => applyReplacements(b, rules)),
  };
}

// ============================================================================
// 5. BLOG POSTS LOCALIZER (/tin-tuc)
// ============================================================================
const BLOG_MAP: Record<
  string,
  {
    en: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'imageUrl'>;
    zh: Omit<BlogPost, 'id' | 'slug' | 'publishedAt' | 'imageUrl'>;
  }
> = {
  b1: {
    en: {
      title: 'How to Safely Crate Heavy Industrial Machinery for US, EU & ASEAN Exports',
      summary:
        'Practical engineering guidelines from Truong An Factory on heavy-duty pallet bases, diagonal cross-bracing, and moisture barrier protection for ocean and cross-border machinery shipments.',
      category: 'Export Machinery Crating',
      readTime: '6 min read',
      content: `
        <h2>1. Why Heavy Machinery Requires Engineered Wooden Crates</h2>
        <p>CNC machines, electrical control cabinets, and precision production lines are high-value assets vulnerable to crane impact, vessel roll, and salt-air humidity during long sea voyages to the US, EU, or Cambodia. Combining a heavy-duty bolted pallet base with enclosed plywood or diagonally braced walls ensures 100% cargo safety.</p>
        <h2>2. Standard Crating Specifications at Truong An Factory</h2>
        <ul>
          <li><strong>Heavy-Duty Pallet Base:</strong> Built from 20–25mm thick Acacia or Pine lumber with solid runners engineered for both forklifts and crane slings.</li>
          <li><strong>Diagonal Cross-Bracing:</strong> Prevents structural racking and twisting during rough ocean transit.</li>
          <li><strong>Enclosed Plywood Walls & Vacuum Foil:</strong> Shields sensitive electronics from rain, dust, and marine moisture.</li>
          <li><strong>ISPM 15 HT Compliance:</strong> All solid wood components undergo certified 56°C/30-min Heat Treatment with clear IPPC stamping.</li>
        </ul>
        <h2>3. Mobile On-Site Crating Service</h2>
        <p>Our skilled carpentry team travels directly to factories across Ho Chi Minh City, Binh Duong, Dong Nai, and Long An to measure, block, brace, and crate machinery right beside your container loading bay.</p>
      `,
    },
    zh: {
      title: '出口美国、欧盟及东盟的大型机械设备木箱安全打包技术规范',
      summary: '来自长安包装厂的一线实战经验：详解重型托盘底座设计、四面斜撑抗扭结构及铝箔防潮包装要点，确保高价值机械长途海运万无失。',
      category: '出口木箱技术',
      readTime: '阅读需 6 分钟',
      content: `
        <h2>1. 为什么精密机械出口必须定制专业工程木箱？</h2>
        <p>CNC数控机床、配电控制柜及自动化产线属于高价值设备，在发往美国、欧洲或柬埔寨的海运与陆运途中极易受到吊装碰撞、船体颠簸与海上高湿盐雾侵蚀。采用高强承重底座配合封闭式胶合板木箱是最安全可靠的防护方案。</p>
        <h2>2. 长安工厂标准出口木箱工艺规范</h2>
        <ul>
          <li><strong>重型承重托盘底座：</strong> 选用20–25mm加厚相思木或松木及加固纵梁，同时满足重型叉车铲运与钢丝绳吊装要求。</li>
          <li><strong>四面斜撑抗扭框架 (Bracing)：</strong> 增强箱体整体刚性，防止多层堆码及风浪颠簸引发变形。</li>
          <li><strong>防潮封闭胶合板与抽真空包装：</strong> 阻隔雨水灰尘，配合铝箔真空袋与干燥剂杜绝设备生锈。</li>
          <li><strong>ISPM 15 热处理熏蒸：</strong> 所有实木部件均完成HT高温除虫处理并加盖IPPC国际检疫章。</li>
        </ul>
        <h2>3. 专业木工团队上门驻厂打箱服务</h2>
        <p>本厂可派遣经验丰富的木工班组直接前往胡志明、平阳、同奈、隆安等客户工厂车间现场测量打包，无缝衔接货柜出运。</p>
      `,
    },
  },
  b2: {
    en: {
      title: 'Plywood Pallets vs. Solid Hardwood Pallets: Which Is Best for Your Export Cargo?',
      summary:
        'A clear side-by-side comparison of fumigation-free Plywood pallets versus Acacia and Pine solid wood pallets to help B2B buyers optimize cost and customs speed.',
      category: 'Pallet Selection Guide',
      readTime: '5 min read',
      content: `
        <h2>1. What Is a Plywood Pallet?</h2>
        <p>Plywood pallets are fabricated from engineered multi-layer wood veneer sheets bonded under high heat and pressure. Because of this thermal manufacturing process, plywood pallets are automatically exempt from ISPM 15 phytosanitary inspection at international ports.</p>
        <h2>2. Key Differences at a Glance</h2>
        <ul>
          <li><strong>Deck Surface:</strong> Plywood pallets offer a 100% continuous smooth deck that protects fragile cartons; solid wood pallets feature spaced slats with superior point-load stiffness.</li>
          <li><strong>Tare Weight:</strong> Plywood pallets are 20–30% lighter, significantly reducing Air Cargo freight charges.</li>
          <li><strong>Customs Speed:</strong> Zero fumigation waiting time for urgent export shipments.</li>
        </ul>
        <h2>3. Factory Recommendation</h2>
        <p>Choose Plywood Pallets for air freight, electronics, garments, pharma, and clean-room cartons. Choose Solid Acacia or Pine Pallets for heavy loads (1.5 – 4 tons), high warehouse racking, and humid or outdoor storage.</p>
      `,
    },
    zh: {
      title: '免熏蒸胶合板托盘 vs 天然实木托盘：出口企业该如何选择？',
      summary: '全面对比免熏蒸胶合板栈板与相思木/松木实木托盘在承重、自重、报关时效及采购成本上的优劣势，助您精准选型。',
      category: '托盘选型指南',
      readTime: '阅读需 5 分钟',
      content: `
        <h2>1. 什么是免熏蒸胶合板托盘？</h2>
        <p>胶合板托盘采用多层原木旋切单板经高温高压胶合板材裁切组装而成。由于板材生产过程已完成高温灭菌处理，全球绝大多数进口国海关均免除其 ISPM 15 植物检疫熏蒸手续。</p>
        <h2>2. 核心性能对比</h2>
        <ul>
          <li><strong>面板平整度：</strong> 胶合板托盘为100%整张平滑面板，绝不刮伤纸箱或软包袋；实木托盘为木条铺设，抗集中重载能力更强。</li>
          <li><strong>托盘自重：</strong> 胶合板托盘比实木轻 20–30%，特别适合国际空运 (Air Cargo) 节省高昂运费。</li>
          <li><strong>通关速度：</strong> 免熏蒸即装即走，非常适合交期紧迫的出口急单。</li>
        </ul>
        <h2>3. 长安工厂选型建议</h2>
        <p>电子产品、服装医药、纸箱轻货及空运出口首选免熏蒸胶合板托盘；而针对 1.5–4 吨重型货物、立体高架库或潮湿环境，推荐选用高强度相思木或HT烘干松木托盘。</p>
      `,
    },
  },
  b3: {
    en: {
      title: 'What Is ISPM 15? Complete Guide to Heat-Treated Export Wooden Pallets',
      summary:
        'Everything exporters need to know about ISPM 15 regulations, 56°C/30-minute HT treatment, IPPC stamps, and phytosanitary certificates for US, EU & Japanese customs.',
      category: 'ISPM 15 Compliance',
      readTime: '5 min read',
      content: `
        <h2>1. Understanding ISPM 15 International Regulations</h2>
        <p>ISPM 15 (International Standards for Phytosanitary Measures No. 15) is a mandatory global regulation governing solid wood packaging material (pallets, crates, dunnage) in international trade to prevent the spread of timber pests across borders.</p>
        <h2>2. Certified HT (Heat Treatment) Process at Truong An</h2>
        <p>We utilize eco-friendly Heat Treatment (HT) chambers where the wood core temperature is maintained at a minimum of 56°C for at least 30 continuous minutes — eliminating wood-boring insects while reducing moisture below 18–20% to prevent mold.</p>
        <h2>3. Official IPPC Stamp & Documentation</h2>
        <p>Every compliant pallet is clearly branded with the official IPPC wheat-ear mark displaying country code VN, facility registration code, and HT designation, accompanied by full phytosanitary certificates for smooth customs clearance.</p>
      `,
    },
    zh: {
      title: '什么是 ISPM 15 国际标准？出口实木托盘热处理熏蒸全解析',
      summary: '详解出口欧美、日本、韩国及澳大利亚时强制要求的 ISPM 15 木质包装检疫规定、HT热处理流程与IPPC印章规范。',
      category: 'ISPM 15 出口标准',
      readTime: '阅读需 5 分钟',
      content: `
        <h2>1. 什么是 ISPM 15 国际木质包装检疫标准？</h2>
        <p>ISPM 15（国际植物检疫措施标准第15号）是国际贸易中针对实木包装材料（实木托盘、木箱、垫木）的强制性检疫规定，旨在防止林木害虫随海运货柜跨国传播。</p>
        <h2>2. 长安工厂环保 HT 热处理烘干工艺</h2>
        <p>本厂采用国际通用的环保热处理（Heat Treatment，简称 HT）：将木托盘送入专业温控烘房，使木材中心温度达到至少 56°C 并持续保持 30 分钟以上，既100%杀灭虫卵，又将木材含水率降至 18–20% 以下防止海运发霉。</p>
        <h2>3. 正规 IPPC 麦穗章与通关证书</h2>
        <p>出厂的每一块出口木托盘均清晰烙印国际标准 IPPC 标识（含越南国家代码 VN、检疫机构编号及 HT 字样），并随单出具正规植物检疫热处理证书，保障目的港零延误清关。</p>
      `,
    },
  },
};

export function localizeBlogPost(post: BlogPost, locale: Locale): BlogPost {
  if (locale === 'vi') return post;
  const m = BLOG_MAP[post.id]?.[locale];
  return m ? { ...post, ...m } : post;
}

// ============================================================================
// 6. LIVE ORDER NOTIFICATION TOAST LOCALIZER
// ============================================================================
function localizeToastLocation(location: string, locale: 'en' | 'zh'): string {
  const lower = location.toLowerCase();
  const entries: Array<[string, string, string]> = [
    ['cát lái', 'Cat Lai Port', '吉来港'],
    ['tân bình', 'Tan Binh IP', '新平工业区'],
    ['sóng thần', 'Song Than IP', '神浪工业区'],
    ['vĩnh lộc', 'Vinh Loc IP', '永禄工业区'],
    ['tân tạo', 'Tan Tao IP', '新造工业区'],
    ['đức hòa', 'Duc Hoa, Long An', '隆安德和'],
    ['bến lức', 'Ben Luc, Long An', '隆安滨沥'],
    ['biên hòa', 'Bien Hoa, Dong Nai', '同奈边和'],
    ['hóc môn', 'Hoc Mon, HCMC', '胡志明霍门'],
    ['thủ đức', 'Thu Duc, HCMC', '胡志明守德'],
    ['củ chi', 'Cu Chi, HCMC', '胡志明古芝'],
    ['bình dương', 'Binh Duong', '平阳省'],
    ['đồng nai', 'Dong Nai', '同奈省'],
    ['long an', 'Long An', '隆安省'],
    ['tây ninh', 'Tay Ninh', '西宁省'],
  ];
  for (const [key, en, zh] of entries) {
    if (lower.includes(key)) return locale === 'en' ? en : zh;
  }
  return locale === 'en' ? 'HCMC' : '胡志明市';
}

function localizeToastCustomer(customerLabel: string, locale: 'en' | 'zh'): string {
  const lower = customerLabel.toLowerCase();
  const entries: Array<[RegExp, string, string]> = [
    [/cơ khí|chế tạo/, 'Precision Mechanical Co.', '精密机械制造企业'],
    [/may mặc|dệt/, 'Garment & Textile Group', '出口服装纺织集团'],
    [/logistics|kho vận/, 'International Logistics Hub', '国际仓储物流中心'],
    [/thực phẩm/, 'Food Processing Plant', '食品加工厂'],
    [/điện tử|linh kiện/, 'Electronics & Parts Factory', '电子零部件工厂'],
    [/nông sản/, 'Agro-Export Warehouse', '出口农产品仓库'],
    [/bao bì|in ấn|nhựa/, 'Packaging & Printing Co.', '包装印刷企业'],
    [/thủy sản|kho lạnh/, 'Cold-Chain Seafood Plant', '水产冷链加工厂'],
    [/nội thất|gỗ việt/, 'Export Furniture Factory', '出口家具木艺厂'],
    [/hóa chất|sơn/, 'Chemical & Coatings Co.', '化工涂料实业公司'],
    [/y tế|dược/, 'Medical Equipment Corp.', '医疗设备制造企业'],
    [/phân phối|tiêu dùng/, 'FMCG Distribution Center', '快消品配送中心'],
    [/xnk|xuất khẩu/, 'Export-Import Enterprise', '进出口贸易企业'],
  ];
  for (const [pattern, en, zh] of entries) {
    if (pattern.test(lower)) return locale === 'en' ? en : zh;
  }
  return locale === 'en' ? 'Industrial B2B Partner' : '工业合作企业';
}

function localizeToastAction(actionText: string, locale: 'en' | 'zh'): string {
  const lower = actionText.toLowerCase();
  if (lower.includes('xác nhận') || lower.includes('chốt đơn')) {
    return locale === 'en' ? 'Confirmed' : '已确认订单';
  }
  if (lower.includes('gia công') || lower.includes('đặt đóng')) {
    return locale === 'en' ? 'Custom-ordered' : '定制下单';
  }
  return locale === 'en' ? 'Ordered' : '刚刚订购';
}

function localizeToastProduct(productLabel: string, locale: 'en' | 'zh'): string {
  const qtyMatch = productLabel.match(/^(\d[\d.,]*)\s+(.+)$/);
  const qty = qtyMatch ? `${qtyMatch[1]} ` : '';
  const rawName = qtyMatch ? qtyMatch[2] : productLabel;
  const lower = rawName.toLowerCase();

  const entries: Array<[RegExp, string, string]> = [
    [/thùng gỗ kín.*cnc|bọc lót máy/, 'Enclosed CNC Machinery Wooden Crates', '封闭式CNC机械包装木箱'],
    [/kiện gỗ thưa|thùng gỗ thưa/, 'Open Slatted Export Wooden Crates (EU)', '出口欧盟防震条格木箱'],
    [/thùng gỗ|kiện gỗ/, 'Export Industrial Wooden Crates (ISPM 15)', 'ISPM 15出口工业木箱'],
    [/đóng máy xuất khẩu/, 'Heavy-Duty Export Machinery Pallets', '重型出口机械专用木托盘'],
    [/gỗ thông.*gma|xuất khẩu mỹ/, 'New Pine Export Pallets (US GMA)', '全新松木出口美国GMA托盘'],
    [/gỗ thông.*2\.5 tấn/, 'Heavy-Duty 2.5T Notched Pine Pallets', '2.5吨重载缺口松木托盘'],
    [/gỗ thông.*đố khuyết|gỗ thông mới/, '4-Way Notched New Pine Pallets', '全新四向进叉缺口松木托盘'],
    [/ván ép.*campuchia/, 'Export Plywood Pallets (Cambodia)', '出口柬埔寨免熏蒸胶合板托盘'],
    [/ván ép|plywood/, 'Solid-Deck 9-Block Plywood Pallets', '9脚墩整板免熏蒸胶合板托盘'],
    [/chân gù|9 gù/, '4-Way 9-Block Hardwood Pallets', '四向进叉9脚墩实木托盘'],
    [/bản vẽ|kích thước lớn/, 'Custom-Engineered Wooden Pallets', '按图纸定制重型木托盘'],
    [/gỗ tràm/, 'Export Acacia Hardwood Pallets', '出口相思木实木托盘'],
    [/pallet nhựa/, 'New HDPE Industrial Plastic Pallets', '全新HDPE工业塑料托盘'],
    [/thùng nhựa đặc|có nắp/, 'Solid Cold-Storage Plastic Crates w/ Lid', '冷库带盖密封工业塑料箱'],
    [/thùng nhựa hở|nông sản/, 'Ventilated Agro-Logistics Plastic Crates', '镂空透气农产品周转箱'],
    [/thùng nhựa|sóng nhựa/, 'Heavy-Duty Stackable Plastic Crates', '工业级可堆叠塑料周转箱'],
  ];

  for (const [pattern, en, zh] of entries) {
    if (pattern.test(lower)) {
      return `${qty}${locale === 'en' ? en : zh}`;
    }
  }
  return `${qty}${locale === 'en' ? 'Export Wooden Pallets' : '出口实木托盘'}`;
}

export function localizeOrderNotification(
  item: OrderNotificationItem,
  locale: Locale
): OrderNotificationItem {
  if (locale === 'vi') return item;

  const timeLocalized =
    locale === 'en'
      ? item.timeAgo
          .replace(/Vừa xong/i, 'Just now')
          .replace(/(\d+)\s*phút trước/i, '$1m ago')
          .replace(/(\d+)\s*giờ trước/i, '$1h ago')
          .replace(/Hôm nay/i, 'Today')
      : item.timeAgo
          .replace(/Vừa xong/i, '刚刚')
          .replace(/(\d+)\s*phút trước/i, '$1分钟前')
          .replace(/(\d+)\s*giờ trước/i, '$1小时前')
          .replace(/Hôm nay/i, '今日订单');

  return {
    ...item,
    customerLabel: localizeToastCustomer(item.customerLabel, locale),
    location: localizeToastLocation(item.location, locale),
    actionText: localizeToastAction(item.actionText, locale),
    productLabel: localizeToastProduct(item.productLabel, locale),
    timeAgo: timeLocalized,
  };
}
