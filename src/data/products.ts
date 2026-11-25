export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  dimensions: string;
  woodType: string;
  materialGroup: 'go-thong' | 'go-tram' | 'van-ep' | 'go-cu' | 'nhua';
  targetMarket: 'xuat-khau-my' | 'xuat-khau-campuchia' | 'xuat-khau-ispm15' | 'noi-dia';
  staticLoad: string;
  dynamicLoad: string;
  specification: string;
  isExportStandard: boolean;
  isNew: boolean;
  priceDisplay: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  gallery?: string[];
  usagePurpose: string;
  badges: string[];
  facebookProof?: {
    title: string;
    description: string;
    fbUrl?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'pallet-go-tram',
    name: 'Pallet Gỗ Tràm (3 Gánh & 9 Gù)',
    slug: 'pallet-go-tram',
    description: '26 mẫu pallet gỗ tràm chuẩn xưởng Trường An (PTA-T01..T10, PTA-G01..G10 & các quy cách chịu tải thực tế), gỗ cứng bền, giá tận xưởng.',
  },
  {
    id: 'pallet-go-thong',
    name: 'Pallet Gỗ Thông Xuất Khẩu (ISPM 15)',
    slug: 'pallet-go-thong',
    description: 'Pallet gỗ thông sấy khô độ ẩm < 18–20%, bào láng 4 mặt, xử lý nhiệt HT kèm chứng thư ISPM 15 xuất khẩu Mỹ, EU, Nhật.',
  },
  {
    id: 'pallet-van-ep',
    name: 'Pallet Ván Ép (Plywood 10–15mm)',
    slug: 'pallet-van-ep',
    description: '34 kích thước pallet gỗ ép mặt kín 9 cục gù (ván 10mm – 12mm – 15mm) siêu nhẹ, phẳng mịn, miễn thủ tục hun trùng xuất khẩu.',
  },
  {
    id: 'pallet-theo-yeu-cau',
    name: 'Pallet Đóng Theo Bản Vẽ',
    slug: 'pallet-theo-yeu-cau',
    description: 'Gia công pallet gỗ 1 mặt & full 2 mặt theo bản vẽ kỹ thuật riêng (1300×1100 mm & mọi quy cách từ 800×800 đến 1600×1500 mm).',
  },
  {
    id: 'pallet-nhua-moi',
    name: 'Pallet Nhựa Mới Công Nghiệp',
    slug: 'pallet-nhua-moi',
    description: 'Pallet nhựa HDPE nguyên sinh mặt lưới liền khối & pallet nhựa 9 chân cốc xuất khẩu 1 chiều, kháng nước và hóa chất.',
  },
  {
    id: 'pallet-nhua-cu',
    name: 'Pallet Nhựa Cũ (Độ Mới 85–95%)',
    slug: 'pallet-nhua-cu',
    description: 'Pallet nhựa đã qua sử dụng tuyển chọn kỹ, kết cấu nguyên vẹn độ mới 85–95%, tiết kiệm 30–40% chi phí lưu kho.',
  },
  {
    id: 'thung-go-dong-hang',
    name: 'Thùng Gỗ / Kiện Gỗ Đóng Hàng',
    slug: 'thung-go-dong-hang',
    description: 'Đầy đủ 7 mẫu thùng gỗ nan thưa có nắp đế 9 gù giằng chéo (650–1090 mm) và dịch vụ đóng thùng gỗ kín ván ép máy móc chuẩn ISPM 15.',
  },
  {
    id: 'thung-nhua',
    name: 'Thùng Nhựa Công Nghiệp',
    slug: 'thung-nhua',
    description: 'Thùng nhựa đặc có nắp, sóng nhựa hở đựng nông sản & khay nhựa linh kiện xếp chồng kho xưởng.',
  },
];

export const PALLET_GO_SLUGS = [
  'pallet-go-tram',
  'pallet-go-thong',
  'pallet-van-ep',
  'pallet-theo-yeu-cau',
];

export const PALLET_NHUA_SLUGS = [
  'pallet-nhua-moi',
  'pallet-nhua-cu',
];

export const THUNG_SLUGS = [
  'thung-go-dong-hang',
  'thung-nhua',
];

export const CATEGORY_PRIORITY: Record<string, number> = {
  'pallet-go-tram': 1,
  'pallet-go-thong': 2,
  'pallet-van-ep': 3,
  'pallet-theo-yeu-cau': 4,
  'pallet-nhua-moi': 5,
  'pallet-nhua-cu': 6,
  'thung-go-dong-hang': 7,
  'thung-nhua': 8,
};

function productSubOrder(id: string): string {
  if (id.startsWith('pta-t')) return '01-' + id;
  if (id.startsWith('pta-g')) return '02-' + id;
  if (id.startsWith('pt-r')) return '03-' + id;
  return '10-' + id;
}

export function sortProductsByPriority(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    const prioA = CATEGORY_PRIORITY[a.categorySlug] ?? 99;
    const prioB = CATEGORY_PRIORITY[b.categorySlug] ?? 99;
    if (prioA !== prioB) return prioA - prioB;
    return productSubOrder(a.id).localeCompare(productSubOrder(b.id), undefined, { numeric: true });
  });
}

export const products: Product[] = [
  {
    "id": "pta-t01",
    "slug": "pallet-tram-do-bang-pho-thong-pta-t01-1200x1000x120",
    "name": "Pallet tràm đố bằng phổ thông — PTA-T01 (1200 × 1000 × 120 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 1000 x 120 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 86 mm) · Nan mặt trên: 7 thanh (1200×90×17 mm) · Nan đáy: 3 thanh (1200×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.0297 m³",
    "isExportStandard": false,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm đố bằng phổ thông mã chuẩn PTA-T01 kích thước 1200 × 1000 × 120 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 86mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1200×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T01 — kích thước 1200 × 1000 × 120 mm",
      "Kết cấu 3 gánh dọc cao 86 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1200×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-T01",
      "3 GÁNH / 2 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm đố bằng phổ thông (PTA-T01) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t02",
    "slug": "pallet-tram-do-bang-xuat-khau-pta-t02-1200x1000x140",
    "name": "Pallet tràm đố bằng xuất khẩu — PTA-T02 (1200 × 1000 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 1000 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 104 mm) · Nan mặt trên: 7 thanh (1200×90×18 mm) · Nan đáy: 3 thanh (1200×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.03564 m³",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm đố bằng xuất khẩu mã chuẩn PTA-T02 kích thước 1200 × 1000 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 104mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1200×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T02 — kích thước 1200 × 1000 × 140 mm",
      "Kết cấu 3 gánh dọc cao 104 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1200×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-T02",
      "3 GÁNH / 2 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm đố bằng xuất khẩu (PTA-T02) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t03",
    "slug": "pallet-tram-1219x1016-pta-t03-1219x1016x145",
    "name": "Pallet tràm 1219×1016 — PTA-T03 (1219 × 1016 × 145 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1219 x 1016 x 145 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-my",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 109 mm) · Nan mặt trên: 7 thanh (1219×100×18 mm) · Nan đáy: 3 thanh (1219×100×18 mm) · Thể tích gỗ tiêu chuẩn: 0.04206 m³",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1219×1016 mã chuẩn PTA-T03 kích thước 1219 × 1016 × 145 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 109mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1219×100×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T03 — kích thước 1219 × 1016 × 145 mm",
      "Kết cấu 3 gánh dọc cao 109 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1219×100×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-T03",
      "3 GÁNH / 2 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1219×1016 (PTA-T03) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t04",
    "slug": "pallet-tram-1100x1000-pta-t04-1100x1000x110",
    "name": "Pallet tràm 1100×1000 — PTA-T04 (1100 × 1000 × 110 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1000 x 110 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 78 mm) · Nan mặt trên: 7 thanh (1100×90×16 mm) · Nan đáy: 3 thanh (1100×90×16 mm) · Thể tích gỗ tiêu chuẩn: 0.0295 m³",
    "isExportStandard": false,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1100×1000 mã chuẩn PTA-T04 kích thước 1100 × 1000 × 110 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 78mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1100×90×16 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T04 — kích thước 1100 × 1000 × 110 mm",
      "Kết cấu 3 gánh dọc cao 78 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1100×90×16 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-T04",
      "3 GÁNH / 2 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1100×1000 (PTA-T04) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t05",
    "slug": "pallet-tram-1100x1100-pta-t05-1100x1100x140",
    "name": "Pallet tràm 1100×1100 — PTA-T05 (1100 × 1100 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1100 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 104 mm) · Nan mặt trên: 8 thanh (1100×90×18 mm) · Nan đáy: 3 thanh (1100×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.0361 m³",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1100×1100 mã chuẩn PTA-T05 kích thước 1100 × 1100 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 104mm nâng 2 hướng vững chắc kết hợp 8 thanh nan mặt (1100×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T05 — kích thước 1100 × 1100 × 140 mm",
      "Kết cấu 3 gánh dọc cao 104 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 8 thanh nan (1100×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-T05",
      "3 GÁNH / 2 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1100×1100 (PTA-T05) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t06",
    "slug": "pallet-tram-1200x800-pta-t06-1200x800x120",
    "name": "Pallet tràm 1200×800 — PTA-T06 (1200 × 800 × 120 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 800 x 120 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 86 mm) · Nan mặt trên: 6 thanh (1200×90×17 mm) · Nan đáy: 3 thanh (1200×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.02786 m³",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1200×800 mã chuẩn PTA-T06 kích thước 1200 × 800 × 120 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 86mm nâng 2 hướng vững chắc kết hợp 6 thanh nan mặt (1200×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T06 — kích thước 1200 × 800 × 120 mm",
      "Kết cấu 3 gánh dọc cao 86 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 6 thanh nan (1200×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-T06",
      "3 GÁNH / 2 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1200×800 (PTA-T06) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t07",
    "slug": "pallet-tram-1170x1080-pta-t07-1170x1080x140",
    "name": "Pallet tràm 1170×1080 — PTA-T07 (1170 × 1080 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1170 x 1080 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 104 mm) · Nan mặt trên: 8 thanh (1170×90×18 mm) · Nan đáy: 3 thanh (1170×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.0384 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1170×1080 mã chuẩn PTA-T07 kích thước 1170 × 1080 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 104mm nâng 2 hướng vững chắc kết hợp 8 thanh nan mặt (1170×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T07 — kích thước 1170 × 1080 × 140 mm",
      "Kết cấu 3 gánh dọc cao 104 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 8 thanh nan (1170×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-T07",
      "3 GÁNH / 2 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1170×1080 (PTA-T07) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t08",
    "slug": "pallet-tram-1260x1005-pta-t08-1260x1005x143",
    "name": "Pallet tràm 1260×1005 — PTA-T08 (1260 × 1005 × 143 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1260 x 1005 x 143 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 107 mm) · Nan mặt trên: 7 thanh (1260×100×18 mm) · Nan đáy: 3 thanh (1260×100×18 mm) · Thể tích gỗ tiêu chuẩn: 0.04347 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1260×1005 mã chuẩn PTA-T08 kích thước 1260 × 1005 × 143 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 107mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1260×100×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T08 — kích thước 1260 × 1005 × 143 mm",
      "Kết cấu 3 gánh dọc cao 107 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1260×100×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-T08",
      "3 GÁNH / 2 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1260×1005 (PTA-T08) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t09",
    "slug": "pallet-tram-1550x1000-pta-t09-1550x1000x127",
    "name": "Pallet tràm 1550×1000 — PTA-T09 (1550 × 1000 × 127 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1550 x 1000 x 127 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 93 mm) · Nan mặt trên: 7 thanh (1550×90×17 mm) · Nan đáy: 3 thanh (1550×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.04087 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 1550×1000 mã chuẩn PTA-T09 kích thước 1550 × 1000 × 127 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 93mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (1550×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T09 — kích thước 1550 × 1000 × 127 mm",
      "Kết cấu 3 gánh dọc cao 93 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (1550×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-T09",
      "3 GÁNH / 2 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 1550×1000 (PTA-T09) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-t10",
    "slug": "pallet-tram-820x980-pta-t10-820x980x127",
    "name": "Pallet tràm 820×980 — PTA-T10 (820 × 980 × 127 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "820 x 980 x 127 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 3 gánh dọc nâng 2 hướng (cao 93 mm) · Nan mặt trên: 7 thanh (820×90×17 mm) · Nan đáy: 3 thanh (820×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.02162 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm 820×980 mã chuẩn PTA-T10 kích thước 820 × 980 × 127 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 3 gánh dọc cao 93mm nâng 2 hướng vững chắc kết hợp 7 thanh nan mặt (820×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-T10 — kích thước 820 × 980 × 127 mm",
      "Kết cấu 3 gánh dọc cao 93 mm chịu uốn tốt, lọt càng xe nâng dễ dàng",
      "Mặt trên 7 thanh nan (820×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-T10",
      "3 GÁNH / 2 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm 820×980 (PTA-T10) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g01",
    "slug": "pallet-tram-gu-1000x1200-pta-g01-1200x1000x140",
    "name": "Pallet tràm gù 1000×1200 — PTA-G01 (1200 × 1000 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 1000 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×104 mm) · Nan mặt trên: 7 thanh (1200×90×18 mm) · Nan đáy: 3 thanh (1200×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.02702 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1000×1200 mã chuẩn PTA-G01 kích thước 1200 × 1000 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×104mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1200×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G01 — kích thước 1200 × 1000 × 140 mm",
      "Kết cấu 9 cục gù (90×90×104 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1200×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G01",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1000×1200 (PTA-G01) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g02",
    "slug": "pallet-tram-gu-1100x1100-pta-g02-1100x1100x140",
    "name": "Pallet tràm gù 1100×1100 — PTA-G02 (1100 × 1100 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1100 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×104 mm) · Nan mặt trên: 8 thanh (1100×90×18 mm) · Nan đáy: 3 thanh (1100×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.02718 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1100×1100 mã chuẩn PTA-G02 kích thước 1100 × 1100 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×104mm nâng 4 hướng linh hoạt kết hợp 8 thanh nan mặt (1100×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G02 — kích thước 1100 × 1100 × 140 mm",
      "Kết cấu 9 cục gù (90×90×104 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 8 thanh nan (1100×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G02",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1100×1100 (PTA-G02) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g03",
    "slug": "pallet-tram-gu-1200x1000-pta-g03-1200x1000x140",
    "name": "Pallet tràm gù 1200×1000 — PTA-G03 (1200 × 1000 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 1000 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×104 mm) · Nan mặt trên: 7 thanh (1200×100×18 mm) · Nan đáy: 3 thanh (1200×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.02853 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1200×1000 mã chuẩn PTA-G03 kích thước 1200 × 1000 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×104mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1200×100×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G03 — kích thước 1200 × 1000 × 140 mm",
      "Kết cấu 9 cục gù (90×90×104 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1200×100×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G03",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1200×1000 (PTA-G03) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g04",
    "slug": "pallet-tram-gu-1219x1016-pta-g04-1219x1016x145",
    "name": "Pallet tràm gù 1219×1016 — PTA-G04 (1219 × 1016 × 145 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1219 x 1016 x 145 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-my",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×109 mm) · Nan mặt trên: 7 thanh (1219×100×18 mm) · Nan đáy: 3 thanh (1219×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.02923 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1219×1016 mã chuẩn PTA-G04 kích thước 1219 × 1016 × 145 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×109mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1219×100×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G04 — kích thước 1219 × 1016 × 145 mm",
      "Kết cấu 9 cục gù (90×90×109 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1219×100×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G04",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1219×1016 (PTA-G04) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g05",
    "slug": "pallet-tram-gu-1100x1000-pta-g05-1100x1000x120",
    "name": "Pallet tràm gù 1100×1000 — PTA-G05 (1100 × 1000 × 120 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1000 x 120 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×86 mm) · Nan mặt trên: 7 thanh (1100×90×17 mm) · Nan đáy: 3 thanh (1100×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.0231 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1100×1000 mã chuẩn PTA-G05 kích thước 1100 × 1000 × 120 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×86mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1100×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G05 — kích thước 1100 × 1000 × 120 mm",
      "Kết cấu 9 cục gù (90×90×86 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1100×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-G05",
      "9 GÙ / 4 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1100×1000 (PTA-G05) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g06",
    "slug": "pallet-tram-gu-1200x800-pta-g06-1200x800x120",
    "name": "Pallet tràm gù 1200×800 — PTA-G06 (1200 × 800 × 120 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1200 x 800 x 120 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×86 mm) · Nan mặt trên: 6 thanh (1200×90×17 mm) · Nan đáy: 3 thanh (1200×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.02279 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1200×800 mã chuẩn PTA-G06 kích thước 1200 × 800 × 120 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×86mm nâng 4 hướng linh hoạt kết hợp 6 thanh nan mặt (1200×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G06 — kích thước 1200 × 800 × 120 mm",
      "Kết cấu 9 cục gù (90×90×86 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 6 thanh nan (1200×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G06",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1200×800 (PTA-G06) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g07",
    "slug": "pallet-tram-gu-1260x1005-pta-g07-1260x1005x143",
    "name": "Pallet tràm gù 1260×1005 — PTA-G07 (1260 × 1005 × 143 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1260 x 1005 x 143 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×107 mm) · Nan mặt trên: 7 thanh (1260×100×18 mm) · Nan đáy: 3 thanh (1260×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.0298 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1260×1005 mã chuẩn PTA-G07 kích thước 1260 × 1005 × 143 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×107mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1260×100×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G07 — kích thước 1260 × 1005 × 143 mm",
      "Kết cấu 9 cục gù (90×90×107 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1260×100×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G07",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1260×1005 (PTA-G07) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g08",
    "slug": "pallet-tram-gu-1170x1080-pta-g08-1170x1080x140",
    "name": "Pallet tràm gù 1170×1080 — PTA-G08 (1170 × 1080 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1170 x 1080 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×104 mm) · Nan mặt trên: 8 thanh (1170×90×18 mm) · Nan đáy: 3 thanh (1170×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.02843 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1170×1080 mã chuẩn PTA-G08 kích thước 1170 × 1080 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×104mm nâng 4 hướng linh hoạt kết hợp 8 thanh nan mặt (1170×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G08 — kích thước 1170 × 1080 × 140 mm",
      "Kết cấu 9 cục gù (90×90×104 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 8 thanh nan (1170×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-G08",
      "9 GÙ / 4 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1170×1080 (PTA-G08) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g09",
    "slug": "pallet-tram-gu-1550x1000-pta-g09-1550x1000x140",
    "name": "Pallet tràm gù 1550×1000 — PTA-G09 (1550 × 1000 × 140 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1550 x 1000 x 140 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, hỗ trợ sấy & hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×104 mm) · Nan mặt trên: 8 thanh (1550×90×18 mm) · Nan đáy: 3 thanh (1550×90×18 mm) · Thể tích gỗ tiêu chuẩn: 0.0352 m³",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1550×1000 mã chuẩn PTA-G09 kích thước 1550 × 1000 × 140 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×104mm nâng 4 hướng linh hoạt kết hợp 8 thanh nan mặt (1550×90×18 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G09 — kích thước 1550 × 1000 × 140 mm",
      "Kết cấu 9 cục gù (90×90×104 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 8 thanh nan (1550×90×18 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu container, xếp kệ kho xưởng & vận chuyển tải nặng",
    "badges": [
      "MÃ PTA-G09",
      "9 GÙ / 4 HƯỚNG",
      "ISPM 15"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1550×1000 (PTA-G09) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pta-g10",
    "slug": "pallet-tram-gu-1000x1000-pta-g10-1000x1000x120",
    "name": "Pallet tràm gù 1000×1000 — PTA-G10 (1000 × 1000 × 120 mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1000 x 1000 x 120 mm",
    "woodType": "Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "2.000 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Kết cấu: 9 cục gù nâng 4 hướng (90×90×86 mm) · Nan mặt trên: 7 thanh (1000×90×17 mm) · Nan đáy: 3 thanh (1000×90×17 mm) · Thể tích gỗ tiêu chuẩn: 0.02157 m³",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet tràm gù 1000×1000 mã chuẩn PTA-G10 kích thước 1000 × 1000 × 120 mm sản xuất trực tiếp tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Thiết kế 9 cục gù đặc 90×90×86mm nâng 4 hướng linh hoạt kết hợp 7 thanh nan mặt (1000×90×17 mm) và 3 thanh nan đáy, phù hợp kê hàng kho xưởng và đóng container xuất khẩu.",
    "highlights": [
      "Mã thiết kế chuẩn xưởng PTA-G10 — kích thước 1000 × 1000 × 120 mm",
      "Kết cấu 9 cục gù (90×90×86 mm) cho phép xe nâng ra vào cả 4 hướng",
      "Mặt trên 7 thanh nan (1000×90×17 mm), đóng đinh xoắn công nghiệp chống bung",
      "Nhận điều chỉnh khe hở nan, hun trùng nhiệt HT ISPM 15 và làm mẫu thử tải thực tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg"
    ],
    "usagePurpose": "Kê hàng kho xưởng, vận chuyển nội địa, nhà máy sản xuất & bao bì",
    "badges": [
      "MÃ PTA-G10",
      "9 GÙ / 4 HƯỚNG",
      "GIÁ TẬN XƯỞNG"
    ],
    "facebookProof": {
      "title": "Sản xuất lô Pallet tràm gù 1000×1000 (PTA-G10) tại Xưởng Pallet Trường An",
      "description": "Phôi gỗ tràm xẻ đều đẹp, kiểm tra kỹ kích thước và tải trọng trước khi giao xe tải tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r23",
    "slug": "pallet-go-tram-1400-x-1100-x-130-mm-9-gu-11-nan-mat-17mm-pt-r23",
    "name": "Pallet gỗ tràm 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 17mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1400 x 1100 x 130 mm",
    "woodType": "Gỗ Tràm tự nhiên chịu lực cao",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "3.000 - 3.500 kg",
    "dynamicLoad": "> 1.500 kg",
    "specification": "Tải trọng làm việc: > 1.500 kg (dùng cho xe nâng tay & xe nâng máy) · Thanh nan mặt trên: 1400 × 70 × 17 mm (11 thanh) · Thanh gánh mặt trên: 1100 × 70 × 17 mm (03 thanh) · Cục gù: 70 × 70 × 90 mm (09 cục) · Thanh nan mặt dưới: 1400 × 70 × 17 mm (03 thanh)",
    "isExportStandard": false,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ tràm 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 17mm) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (> 1.500 kg động / 3.000 - 3.500 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Tải trọng làm việc: > 1.500 kg (dùng cho xe nâng tay & xe nâng máy)",
      "Thanh nan mặt trên: 1400 × 70 × 17 mm (11 thanh)",
      "Thanh gánh mặt trên: 1100 × 70 × 17 mm (03 thanh)",
      "Cục gù: 70 × 70 × 90 mm (09 cục)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg"
    ],
    "usagePurpose": "Kê máy móc, bao tải nặng, kiện hàng khổ lớn dùng cả xe nâng tay & nâng máy",
    "badges": [
      "KHỔ LỚN 1400×1100",
      "11 NAN MẶT 17MM",
      "TẢI > 1.500 KG"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ tràm 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 17mm) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r24",
    "slug": "pallet-go-1100-x-1100-x-130-mm-4-do-hun-trung-ispm-15-pt-r24",
    "name": "Pallet gỗ 1100 × 1100 × 130 mm (4 đố · Hun trùng ISPM 15)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1100 x 130 mm (±5mm)",
    "woodType": "Gỗ Tràm / Gỗ tự nhiên tươi, hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 kg",
    "dynamicLoad": "1.200 - 1.500 kg",
    "specification": "Quy cách: 1100 × 1100 × 130 mm (±5mm) · Thanh mặt trên: 1100 × 80 × 18 mm (8 thanh) · Đố chịu lực: 1100 × 35 × 90 mm (4 thanh) · Thanh đáy: 1100 × 80 × 18 mm (3 thanh) · Xử lý hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ 1100 × 1100 × 130 mm (4 đố · Hun trùng ISPM 15) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (1.200 - 1.500 kg động / 3.000 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Quy cách: 1100 × 1100 × 130 mm (±5mm)",
      "Thanh mặt trên: 1100 × 80 × 18 mm (8 thanh)",
      "Đố chịu lực: 1100 × 35 × 90 mm (4 thanh)",
      "Thanh đáy: 1100 × 80 × 18 mm (3 thanh)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Châu Á, Nhật Bản, Hàn Quốc & xếp container",
    "badges": [
      "VUÔNG 1100×1100",
      "4 ĐỐ CHỊU LỰC",
      "ISPM 15 / HT"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ 1100 × 1100 × 130 mm (4 đố · Hun trùng ISPM 15) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r29",
    "slug": "pallet-go-tram-1100-x-1100-x-150-mm-4-do-van-day-20mm-pt-r29",
    "name": "Pallet gỗ tràm 1100 × 1100 × 150 mm (4 đố · Ván dày 20mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1100 x 150 mm (±5mm)",
    "woodType": "Gỗ Tràm tự nhiên thanh dày 20mm (độ ẩm tự nhiên)",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách: 1100 × 1100 × 150 mm (±5mm) · Ván mặt: 1100 × 80 × 20 mm (9 thanh) · Đố dọc: 1100 × 35 × 90 mm (4 thanh) · Ván đáy: 1100 × 80 × 20 mm (3 thanh) · Tải trọng: tải động 1.500 kg / tải tĩnh 4.000 kg",
    "isExportStandard": false,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ tràm 1100 × 1100 × 150 mm (4 đố · Ván dày 20mm) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (1.500 kg động / 4.000 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Quy cách: 1100 × 1100 × 150 mm (±5mm)",
      "Ván mặt: 1100 × 80 × 20 mm (9 thanh)",
      "Đố dọc: 1100 × 35 × 90 mm (4 thanh)",
      "Ván đáy: 1100 × 80 × 20 mm (3 thanh)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p2/p2.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p4/p4.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Lưu kho hàng nặng 1.5 – 4 tấn, nhà máy hóa chất, bao bì, thức ăn chăn nuôi",
    "badges": [
      "VÁN DÀY 20MM",
      "TẢI TĨNH 4.000 KG",
      "4 ĐỐ DỌC"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ tràm 1100 × 1100 × 150 mm (4 đố · Ván dày 20mm) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r30",
    "slug": "pallet-go-tram-1100-x-1100-x-150-mm-9-gu-tai-tinh-4-000-kg-pt-r30",
    "name": "Pallet gỗ tràm 1100 × 1100 × 150 mm (9 gù · Tải tĩnh 4.000 kg)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1100 x 1100 x 150 mm (±5mm)",
    "woodType": "Gỗ Tràm tự nhiên cứng chắc (độ ẩm bình thường)",
    "materialGroup": "go-tram",
    "targetMarket": "noi-dia",
    "staticLoad": "4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách: 1100 × 1100 × 150 mm (±5mm) · Ván mặt: 1100 × 70 × 17 mm (9 thanh) · Ván gánh: 1100 × 90 × 20 mm (3 thanh) · Cục gù: 90 × 90 × 90 mm (9 cục) · Ván đáy: 960 × 90 × 20 mm (3 thanh) + 1100 × 70 × 20 mm (2 thanh) · Tải trọng: tải động 1.500 kg / tải tĩnh 4.000 kg",
    "isExportStandard": false,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ tràm 1100 × 1100 × 150 mm (9 gù · Tải tĩnh 4.000 kg) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (1.500 kg động / 4.000 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Quy cách: 1100 × 1100 × 150 mm (±5mm)",
      "Ván mặt: 1100 × 70 × 17 mm (9 thanh)",
      "Ván gánh: 1100 × 90 × 20 mm (3 thanh)",
      "Cục gù: 90 × 90 × 90 mm (9 cục)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Xếp chồng nhiều tầng trong kho, nâng hạ 4 hướng tải nặng đến 4 tấn",
    "badges": [
      "9 GÙ / 4 HƯỚNG",
      "TẢI TĨNH 4.000 KG",
      "ĐÁY KHUNG KÍN"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ tràm 1100 × 1100 × 150 mm (9 gù · Tải tĩnh 4.000 kg) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r32",
    "slug": "pallet-go-tram-1219-x-1016-x-140-mm-bao-lang-4-mat-do-am-19-pt-r32",
    "name": "Pallet gỗ Tràm 1219 × 1016 × 140 mm (Bào láng 4 mặt · Độ ẩm ≤ 19%)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1219 x 1016 x 140 mm (±5mm)",
    "woodType": "Gỗ Tràm sấy đạt độ ẩm ≤ 19%, bào láng 4 mặt",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-my",
    "staticLoad": "4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách chuẩn Mỹ: 1219 × 1016 × 140 mm (±5mm) · Ván mặt: 1016 × 90 × 17.5 mm (6 thanh) + 3 thanh 1016 × 140 × 17.5 mm · Ván gánh: 1219 × 90 × 17.5 mm (3 thanh) · Cục gù: 190.5 × 90 × 90 mm (6 cục) + 90 × 90 × 90 mm (3 cục) · Ván đáy: 1040 × 90 × 17.5 mm (3 thanh) + 1016 × 90 × 17.5 mm (2 thanh) · Bào láng 4 mặt, sấy khô độ ẩm ≤ 19%, tải động 1.500 kg / tải tĩnh 4.000 kg",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ Tràm 1219 × 1016 × 140 mm (Bào láng 4 mặt · Độ ẩm ≤ 19%) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (1.500 kg động / 4.000 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Quy cách chuẩn Mỹ: 1219 × 1016 × 140 mm (±5mm)",
      "Ván mặt: 1016 × 90 × 17.5 mm (6 thanh) + 3 thanh 1016 × 140 × 17.5 mm",
      "Ván gánh: 1219 × 90 × 17.5 mm (3 thanh)",
      "Cục gù: 190.5 × 90 × 90 mm (6 cục) + 90 × 90 × 90 mm (3 cục)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-eur-2019.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg"
    ],
    "usagePurpose": "Xuất khẩu sang Mỹ, Canada, hàng nội thất, thực phẩm & thiết bị yêu cầu độ ẩm thấp",
    "badges": [
      "CHUẨN MỸ 1219×1016",
      "BÀO LÁNG 4 MẶT",
      "ĐỘ ẨM ≤ 19%"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ Tràm 1219 × 1016 × 140 mm (Bào láng 4 mặt · Độ ẩm ≤ 19%) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pt-r35",
    "slug": "pallet-go-1400-x-1100-x-130-mm-9-gu-11-nan-mat-16mm-pt-r35",
    "name": "Pallet gỗ 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 16mm)",
    "category": "Pallet Gỗ Tràm (3 Gánh & 9 Gù)",
    "categorySlug": "pallet-go-tram",
    "dimensions": "1400 x 1100 x 130 mm (±5mm)",
    "woodType": "Gỗ Tràm tươi tuyển chọn, hỗ trợ đóng mộc hun trùng",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách: 1400 × 1100 × 130 mm (±5mm) · Thanh mặt: 1400 × 70 × 16 mm (11 thanh) · Nan gánh: 1100 × 70 × 16 mm (3 thanh) · Cục gù: 70 × 70 × 80 mm (9 cục) · Thanh đáy: 1400 × 70 × 16 mm (3 thanh) · Tải động 1.500 kg · Hỗ trợ đóng mộc hun trùng ISPM 15",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 16mm) được sản xuất theo thông số đơn hàng thực tế tại Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh). Kết cấu tính toán chuẩn tải trọng (1.500 kg động / 3.000 kg tĩnh), gia công tỉ mỉ từng thanh mặt, gánh/đố và chân gù, đáp ứng tốt nhu cầu lưu kho và xuất khẩu B2B.",
    "highlights": [
      "Quy cách: 1400 × 1100 × 130 mm (±5mm)",
      "Thanh mặt: 1400 × 70 × 16 mm (11 thanh)",
      "Nan gánh: 1100 × 70 × 16 mm (3 thanh)",
      "Cục gù: 70 × 70 × 80 mm (9 cục)"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p5/p5.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p5.jpg"
    ],
    "usagePurpose": "Đóng kiện hàng khổ lớn 1.4m, bao bì công nghiệp, xuất khẩu & lưu kho",
    "badges": [
      "KHỔ LỚN 1400×1100",
      "11 NAN 16MM",
      "HỖ TRỢ HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Gia công thực tế Pallet gỗ 1400 × 1100 × 130 mm (9 gù · 11 nan mặt 16mm) tại Xưởng Trường An",
      "description": "Đóng đúng quy cách bản vẽ, kiểm tra tải trọng và độ ẩm kỹ lưỡng trước khi xuất xưởng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pth-01",
    "slug": "pallet-go-1200x1000x120-go-thong-kho-ispm15",
    "name": "Pallet gỗ 1200 × 1000 × 120 mm (Gỗ thông khô < 18° · ISPM 15)",
    "category": "Pallet Gỗ Thông Xuất Khẩu (ISPM 15)",
    "categorySlug": "pallet-go-thong",
    "dimensions": "1200 x 1000 x 120 mm (±5mm)",
    "woodType": "Gỗ thông sấy khô dưới 18 độ, xử lý nhiệt HT ISPM 15",
    "materialGroup": "go-thong",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.500 - 3.000 kg",
    "dynamicLoad": "1.200 - 1.500 kg",
    "specification": "Kích thước: 1200 × 1000 × 120 mm (±5 mm) · Mặt trên: 1000 × 101.6 × 17 mm × 6 thanh · Mặt dưới: 1000 × 101.6 × 17 mm × 6 thanh · Thanh đà dọc: 1200 × 38 × 88.9 mm (3 thanh) · Gỗ thông khô dưới 18 độ · Xử lý nhiệt HT chuẩn quốc tế ISPM 15",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Mẫu Pallet gỗ 1200 × 1000 × 120 mm sử dụng gỗ thông sấy khô đạt độ ẩm dưới 18%, thiết kế 6 thanh mặt trên + 6 thanh mặt dưới bản 101.6mm kết hợp thanh đà dọc 1200×38×88.9mm. Đã xử lý nhiệt HT đáp ứng đầy đủ tiêu chuẩn xuất khẩu quốc tế ISPM 15.",
    "highlights": [
      "Gỗ thông sấy khô độ ẩm < 18% chống nấm mốc tuyệt đối khi vận chuyển đường biển",
      "Kết cấu đối xứng 6 thanh mặt trên & 6 thanh mặt dưới bản 101.6 × 17 mm vững chãi",
      "Thanh đà dọc 1200 × 38 × 88.9 mm chịu uốn cao",
      "Xử lý nhiệt HT kèm dấu mộc IPPC và chứng thư xuất khẩu ISPM 15"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p3/p3.1.jpg"
    ],
    "usagePurpose": "Xuất khẩu Mỹ, EU, Nhật Bản, hàng dược phẩm, thực phẩm & điện tử",
    "badges": [
      "GỖ THÔNG < 18°",
      "ISPM 15 / HT",
      "6 NAN TRÊN + 6 DƯỚI"
    ],
    "facebookProof": {
      "title": "Xuất xưởng lô pallet gỗ thông sấy khô < 18% chuẩn ISPM 15",
      "description": "Bề mặt sáng sạch, đo độ ẩm đạt chuẩn trước khi đóng container xuất khẩu.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pth-02",
    "slug": "pallet-go-thong-moi-1200x1000x150-bao-lang-4-mat-ispm15",
    "name": "Pallet gỗ Thông mới 1200 × 1000 × 150 mm (Bào láng 4 mặt · ISPM 15)",
    "category": "Pallet Gỗ Thông Xuất Khẩu (ISPM 15)",
    "categorySlug": "pallet-go-thong",
    "dimensions": "1200 x 1000 x 150 mm (±5mm)",
    "woodType": "Gỗ Thông mới bào láng 4 mặt, sấy độ ẩm ≤ 20%",
    "materialGroup": "go-thong",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách: 1200 × 1000 × 150 mm (±5mm) · Ván mặt: 1000 × 80 × 20 mm (12 thanh) · Ván gánh: 1200 × 90 × 25 mm (3 thanh) · Gù: 150 × 90 × 85 mm (6 cục) + 120 × 90 × 85 mm (3 cục) · Ván đáy: 1200 × 80 × 20 mm (2 thanh) + 1040 × 90 × 20 mm (3 thanh) · Bào láng 4 mặt (độ ẩm ≤ 20%) · Hun trùng HT ISPM 15 · Giao tại xưởng hoặc cảng Cát Lái",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ Thông mới 1200 × 1000 × 150 mm cao cấp chịu tải nặng (tải động 1.500 kg / tải tĩnh 4.000 kg): 12 thanh ván mặt dày 20mm, 3 ván gánh dày 25mm, 9 cục gù lớn, bào láng mịn cả 4 mặt và sấy đạt độ ẩm ≤ 20%. Linh hoạt giao tại xưởng hoặc giao trực tiếp ra cảng Cát Lái.",
    "highlights": [
      "12 thanh ván mặt dày 20mm + 3 ván gánh dày 25mm siêu cứng vững, tải tĩnh 4.000 kg",
      "Bào láng 4 mặt sạch mịn, kiểm soát độ ẩm ≤ 20% đạt chuẩn kho sạch FDI",
      "Hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư đầy đủ",
      "Hỗ trợ giao tại Xưởng Trường An hoặc giao thẳng tại cảng Cát Lái theo yêu cầu"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-epal.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Xuất khẩu đường biển qua cảng Cát Lái, hàng nặng 1.5–4 tấn, kho tiêu chuẩn cao",
    "badges": [
      "TẢI TĨNH 4.000 KG",
      "BÀO LÁNG 4 MẶT",
      "ĐỘ ẨM ≤ 20%"
    ],
    "facebookProof": {
      "title": "Gia công & bàn giao lô pallet gỗ thông mới 1200×1000×150 bào 4 mặt",
      "description": "Chuẩn từng milimet, hỗ trợ vận chuyển thẳng ra cảng Cát Lái kịp lịch đóng cont.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pth-03",
    "slug": "pallet-go-thong-1000x1000x150-12-cuc-gu-ispm15",
    "name": "Pallet gỗ thông 1000 × 1000 × 150 mm (12 cục gù · ISPM 15)",
    "category": "Pallet Gỗ Thông Xuất Khẩu (ISPM 15)",
    "categorySlug": "pallet-go-thong",
    "dimensions": "1000 x 1000 x 150 mm (±5mm)",
    "woodType": "Gỗ Thông sấy độ ẩm ≤ 20%, hun trùng HT ISPM 15",
    "materialGroup": "go-thong",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "4.000 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Quy cách: 1000 × 1000 × 150 mm (±5mm) · Ván mặt: 1000 × 80 × 20 mm (8 thanh) · Ván gánh mặt: 1000 × 80 × 20 mm (8 thanh) · Cục gù chịu lực: 100 × 80 × 90 mm (12 cục) · Ván đáy: 1000 × 80 × 20 mm (3 thanh) · Độ ẩm ≤ 20% · Tải động 1.500 kg / tải tĩnh 4.000 kg · Hun trùng HT ISPM 15",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Mẫu Pallet gỗ thông vuông 1000 × 1000 × 150 mm thiết kế đặc biệt với 12 cục gù (100×80×90mm) kết hợp hệ đan 8 thanh ván mặt + 8 thanh ván gánh dày 20mm cực kỳ kiên cố. Đạt tải động 1.500 kg, tải tĩnh 4.000 kg, độ ẩm ≤ 20% và hun trùng HT chuẩn ISPM 15.",
    "highlights": [
      "Kết cấu 12 cục gù phân bổ lực vượt trội cho khổ vuông 1000 × 1000 mm",
      "Hệ kép 8 ván mặt + 8 ván gánh dày 20mm chịu tải tĩnh lên tới 4.000 kg",
      "Kiểm soát độ ẩm gỗ thông ≤ 20%, hạn chế cong vênh & nấm mốc",
      "Đạt chuẩn hun trùng nhiệt HT ISPM 15 xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Kê phuy hóa chất, bao Jumbo, hàng xuất khẩu khổ vuông 1m×1m tải nặng",
    "badges": [
      "12 CỤC GÙ",
      "VUÔNG 1000×1000",
      "TẢI TĨNH 4.000 KG"
    ],
    "facebookProof": {
      "title": "Đóng pallet gỗ thông 1000×1000 kết cấu 12 cục gù siêu chắc",
      "description": "Đáp ứng yêu cầu chịu tải khắc nghiệt và xuất khẩu chính ngạch ISPM 15.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pth-04",
    "slug": "pallet-go-1200x1000x170-gu-dai-120x120-ispm15",
    "name": "Pallet gỗ 1200 × 1000 × 170 mm (±5mm · Gù đại 120×120 ISPM 15)",
    "category": "Pallet Gỗ Thông Xuất Khẩu (ISPM 15)",
    "categorySlug": "pallet-go-thong",
    "dimensions": "1200 x 1000 x 170 mm (±5mm)",
    "woodType": "Gỗ tự nhiên / Gỗ thông bào láng mặt, độ ẩm ≤ 28%, hun trùng HT",
    "materialGroup": "go-thong",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "4.000 - 4.500 kg",
    "dynamicLoad": "1.500 - 2.000 kg",
    "specification": "Quy cách: 1200 × 1000 × 170 mm (±5mm) · Mặt trên: 2 thanh bìa 1200×120×20 + 4 thanh giữa 1200×90×20 + 2 thanh tâm 1200×80×20 mm · Thanh gánh trên gù: 1000 × 120 × 20 mm (3 thanh) · Cục gù đại: 120 × 120 × 90 mm (9 cục) · Mặt dưới: 3 thanh 1200×120×20 + 3 thanh 1000×120×20 + 3 thanh 320×120×90 mm · Bào láng mặt · Đinh 5–7cm · Sơn 4 cạnh theo yêu cầu · Hun trùng HT ISPM 15",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Mẫu Pallet gỗ 1200 × 1000 × 170 mm (±5mm) siêu chịu tải chuyên dùng cho các nhà máy nước giải khát, bia, thực phẩm và kho kệ công nghiệp nặng. Trang bị 9 cục gù đại 120×120×90mm, ván dày 20mm bản rộng 120mm, bào láng mặt, hỗ trợ sơn màu / in tên thương hiệu trên 4 cạnh và hun trùng HT ISPM 15.",
    "highlights": [
      "Chiều cao 170mm với 9 cục gù đại 120×120×90 mm siêu bền cho tần suất nâng hạ liên tục",
      "Toàn bộ thanh bìa, thanh gánh và mặt dưới bản rộng 120mm dày 20mm đóng đinh 5–7cm",
      "Bào láng mặt phẳng đẹp, hỗ trợ sơn nhận diện thương hiệu trên 4 cạnh pallet",
      "Đạt độ ẩm tiêu chuẩn và cấp chứng thư hun trùng nhiệt HT ISPM 15"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ispm-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-vn-ippc.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Nhà máy nước đóng chai, đồ uống, FMCG, luân chuyển nội bộ cường độ cao & xuất khẩu",
    "badges": [
      "CAO 170MM",
      "9 GÙ ĐẠI 120×120",
      "SƠN CẠNH THEO YÊU CẦU"
    ],
    "facebookProof": {
      "title": "Sản xuất pallet cao 170mm gù đại 120×120 chuẩn nhà máy đồ uống",
      "description": "Đóng đinh xoắn 5–7cm siêu chắc, bào láng mặt và sơn cạnh nhận diện theo đơn đặt hàng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-01",
    "slug": "pallet-go-ep-1200x1000x120-mm",
    "name": "Pallet gỗ ép 1200 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-02",
    "slug": "pallet-go-ep-1350x950x120-mm",
    "name": "Pallet gỗ ép 1350 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1350 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1350 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1350 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1350 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1350 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1350×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1350 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1350×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1350 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-03",
    "slug": "pallet-go-ep-1000x1000x120-mm",
    "name": "Pallet gỗ ép 1000 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1000 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1000 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1000 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1000 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1000 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1000×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1000 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1000×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1000 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-04",
    "slug": "pallet-go-ep-1250x950x120-mm",
    "name": "Pallet gỗ ép 1250 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-05",
    "slug": "pallet-go-ep-1150x1100x120-mm",
    "name": "Pallet gỗ ép 1150 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-06",
    "slug": "pallet-go-ep-1200x800x120-mm",
    "name": "Pallet gỗ ép 1200 × 800 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 800 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 800 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 800 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 800 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 800 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×800",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 800 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-07",
    "slug": "pallet-go-ep-1200x1100x120-mm",
    "name": "Pallet gỗ ép 1200 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-08",
    "slug": "pallet-go-ep-1180x1150x120-mm",
    "name": "Pallet gỗ ép 1180 × 1150 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1180 x 1150 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1180 × 1150 × 12 mm = 1 tấm · Tấm lót trên: 1180 × 1150 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1180 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1180 × 1150 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1180×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1180 × 1150 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1180×1150",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1180 × 1150 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-09",
    "slug": "pallet-go-ep-1180x1100x120-mm",
    "name": "Pallet gỗ ép 1180 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1180 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1180 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1180 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1180 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1180 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1180×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1180 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1180×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1180 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-10",
    "slug": "pallet-go-ep-1250x1000x120-mm",
    "name": "Pallet gỗ ép 1250 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-11",
    "slug": "pallet-go-ep-1200x900x120-mm",
    "name": "Pallet gỗ ép 1200 × 900 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 900 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 900 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 900 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 900 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 900 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×900",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 900 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-12",
    "slug": "pallet-go-ep-1250x1100x120-mm",
    "name": "Pallet gỗ ép 1250 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-13",
    "slug": "pallet-go-ep-1320x950x120-mm",
    "name": "Pallet gỗ ép 1320 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1320 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1320 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1320 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1320 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1320 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1320×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1320 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1320×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1320 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-14",
    "slug": "pallet-go-ep-950x950x120-mm",
    "name": "Pallet gỗ ép 950 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "950 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 950 × 950 × 12 mm = 1 tấm · Tấm lót trên: 950 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 950 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 950 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 950×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 950 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 950×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 950 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-15",
    "slug": "pallet-go-ep-1300x1100x120-mm",
    "name": "Pallet gỗ ép 1300 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1300 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1300 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1300 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1300 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1300 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1300×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1300 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1300×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1300 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-16",
    "slug": "pallet-go-ep-1100x1050x120-mm",
    "name": "Pallet gỗ ép 1100 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1100 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1100 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1100 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1100 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1100 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1100×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1100 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1100×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1100 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-17",
    "slug": "pallet-go-ep-1180x1050x120-mm",
    "name": "Pallet gỗ ép 1180 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1180 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1180 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1180 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1180 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1180 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1180×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1180 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1180×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1180 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-18",
    "slug": "pallet-go-ep-1150x1150x120-mm",
    "name": "Pallet gỗ ép 1150 × 1150 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 1150 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 1150 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 1150 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 1150 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 1150 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×1150",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 1150 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-19",
    "slug": "pallet-go-ep-1250x1050x120-mm",
    "name": "Pallet gỗ ép 1250 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-20",
    "slug": "pallet-go-ep-1150x950x120-mm",
    "name": "Pallet gỗ ép 1150 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-21",
    "slug": "pallet-go-ep-1100x1100x120-mm",
    "name": "Pallet gỗ ép 1100 × 1100 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1100 x 1100 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1100 × 1100 × 12 mm = 1 tấm · Tấm lót trên: 1100 × 1100 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1100 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1100 × 1100 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1100×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1100 × 1100 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1100×1100",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1100 × 1100 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-22",
    "slug": "pallet-go-ep-1200x950x120-mm",
    "name": "Pallet gỗ ép 1200 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-23",
    "slug": "pallet-go-ep-1180x950x120-mm",
    "name": "Pallet gỗ ép 1180 × 950 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1180 x 950 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1180 × 950 × 12 mm = 1 tấm · Tấm lót trên: 1180 × 950 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1180 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1180 × 950 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1180×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1180 × 950 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1180×950",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1180 × 950 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-24",
    "slug": "pallet-go-ep-1100x1000x120-mm",
    "name": "Pallet gỗ ép 1100 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1100 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1100 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1100 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1100 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1100 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1100×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1100 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1100×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1100 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-25",
    "slug": "pallet-go-ep-1150x1050x120-mm",
    "name": "Pallet gỗ ép 1150 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-26",
    "slug": "pallet-go-ep-1150x1000x120-mm",
    "name": "Pallet gỗ ép 1150 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-27",
    "slug": "pallet-go-ep-1250x900x120-mm",
    "name": "Pallet gỗ ép 1250 × 900 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 900 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 900 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 900 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 900 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 900 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×900",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 900 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-28",
    "slug": "pallet-go-ep-1150x850x120-mm",
    "name": "Pallet gỗ ép 1150 × 850 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1150 x 850 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1150 × 850 × 12 mm = 1 tấm · Tấm lót trên: 1150 × 850 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1150 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1150 × 850 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1150×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1150 × 850 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1150×850",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1150 × 850 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-29",
    "slug": "pallet-go-ep-1050x1050x120-mm",
    "name": "Pallet gỗ ép 1050 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1050 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1050 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1050 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1050 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1050 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1050×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1050 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1050×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1050 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-30",
    "slug": "pallet-go-ep-1250x850x120-mm",
    "name": "Pallet gỗ ép 1250 × 850 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1250 x 850 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1250 × 850 × 12 mm = 1 tấm · Tấm lót trên: 1250 × 850 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1250 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1250 × 850 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1250×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1250 × 850 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1250×850",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1250 × 850 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-31",
    "slug": "pallet-go-ep-1200x1050x120-mm",
    "name": "Pallet gỗ ép 1200 × 1050 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1200 x 1050 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-campuchia",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1200 × 1050 × 12 mm = 1 tấm · Tấm lót trên: 1200 × 1050 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1200 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1200 × 1050 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1200×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1200 × 1050 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-move.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1200×1050",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1200 × 1050 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-32",
    "slug": "pallet-go-ep-1050x1000x120-mm",
    "name": "Pallet gỗ ép 1050 × 1000 × 120 mm",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1050 x 1000 x 120 mm",
    "woodType": "Ván ép Plywood 12mm + Tấm lót 9mm + 9 gù ép 100×100×100",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 2.500 kg",
    "dynamicLoad": "1.000 - 1.200 kg",
    "specification": "Tấm mặt trên: 1050 × 1000 × 12 mm = 1 tấm · Tấm lót trên: 1050 × 1000 × 9 mm = 1 tấm · Chân đỡ (cục gù): 100 × 100 × 100 mm = 9 cục · Thanh đáy ngang: 1050 × 100 × 12 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1050 × 1000 × 120 mm mặt kín 9 cục gù gia công chuẩn xác tại Xưởng Pallet Trường An. Cấu tạo gồm 1 tấm mặt ván ép dày 12mm kết hợp 1 tấm lót tăng cứng 9mm, 9 cục gù 100×100×100mm nâng 4 hướng và 3 thanh đáy ngang 1050×100×12mm. Bề mặt phẳng mịn, nhẹ và miễn hoàn toàn thủ tục hun trùng xuất khẩu ISPM 15.",
    "highlights": [
      "Kích thước chuẩn 1050 × 1000 × 120 mm — mặt phẳng kín bảo vệ đáy thùng carton",
      "Kết cấu kép: tấm mặt trên 12mm + tấm lót 9mm tăng độ cứng chống võng",
      "9 cục gù 100×100×100 mm nâng 4 hướng thuận tiện cho xe nâng tay & nâng máy",
      "Vật liệu gỗ ép công nghiệp miễn hun trùng ISPM 15 khi xuất khẩu quốc tế"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg"
    ],
    "usagePurpose": "Đóng hàng xuất khẩu Mỹ, EU, Campuchia, Nhật Bản, hàng Air Cargo, điện tử & bao bì",
    "badges": [
      "KHỔ 1050×1000",
      "VÁN 12MM + LÓT 9MM",
      "MIỄN HUN TRÙNG"
    ],
    "facebookProof": {
      "title": "Sản xuất Pallet gỗ ép 1050 × 1000 × 120 mm mặt kín 9 gù giao nhanh cho khách xuất khẩu",
      "description": "Cắt tấm phẳng đẹp đúng kích thước, miễn thủ tục hun trùng thông quan nhanh chóng.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-33",
    "slug": "pallet-go-ep-1000x760x110-mm-van-10mm",
    "name": "Pallet gỗ ép 1000 × 760 × 110 mm (Ván 10mm gọn nhẹ)",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "1000 x 760 x 110 mm",
    "woodType": "Ván ép Plywood 10mm siêu nhẹ + 9 cục gù 80×80×90",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 kg",
    "dynamicLoad": "800 kg",
    "specification": "Ván mặt trên: 1000 × 760 × 10 mm = 1 tấm · Chân đỡ (cục gù): 80 × 80 × 90 mm = 9 cục · Mặt đáy: 1000 × 80 × 10 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 1000 × 760 × 110 mm sử dụng tấm ván ép dày 10mm gọn nhẹ kết hợp 9 chân đỡ 80×80×90mm và 3 thanh mặt đáy 1000×80×10mm. Tối ưu trọng lượng để tiết kiệm cước vận chuyển hàng không (Air Cargo) và kê kiện hàng vừa & nhỏ.",
    "highlights": [
      "Khổ gọn 1000 × 760 × 110 mm dễ luồn lách trong kho hẹp & thang nâng hàng",
      "Ván mặt 10mm siêu nhẹ giúp giảm tối đa cước phí gửi hàng Air Cargo",
      "9 chân đỡ 80×80×90 mm cho phép nâng hạ 4 hướng linh hoạt",
      "Miễn 100% thủ tục hun trùng kiểm dịch ISPM 15 khi xuất khẩu"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg"
    ],
    "usagePurpose": "Xuất khẩu hàng không Air Cargo, kiện hàng điện tử, may mặc, dược phẩm gọn nhẹ",
    "badges": [
      "KHỔ GỌN 1000×760",
      "VÁN 10MM SIÊU NHẸ",
      "AIR CARGO"
    ],
    "facebookProof": {
      "title": "Gia công pallet gỗ ép 1000×760×110mm siêu nhẹ đi hàng bay Air Cargo",
      "description": "Gọn nhẹ, phẳng mịn, giao đúng tiến độ đóng hàng xuất khẩu.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pve-34",
    "slug": "pallet-go-ep-930x930x126-mm-van-15mm",
    "name": "Pallet gỗ ép 930 × 930 × 126 mm (Ván dày 15mm gia cố)",
    "category": "Pallet Ván Ép (Plywood 10–15mm)",
    "categorySlug": "pallet-van-ep",
    "dimensions": "930 x 930 x 126 mm",
    "woodType": "Ván ép Plywood dày 15mm + 4 thanh đỡ + 9 cục gù lớn",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.500 - 3.500 kg",
    "dynamicLoad": "1.500 kg",
    "specification": "Ván mặt trên: 930 × 930 × 15 mm = 1 tấm · Thanh đỡ mặt trên: 930 × 100 × 5 mm = 4 thanh · Chân đỡ tiêu chuẩn: 100 × 100 × 90 mm = 5 cục · Chân đỡ bản lớn: 140 × 100 × 90 mm = 4 cục · Thanh mặt đáy: 930 × 100 × 15 mm = 3 thanh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet gỗ ép 930 × 930 × 126 mm phiên bản ván dày 15mm chịu tải cao: tấm mặt trên dày 15mm gia cố thêm 4 thanh đỡ mặt trên, hệ 9 cục gù (5 cục 100×100×90 + 4 cục lớn 140×100×90mm) và 3 thanh đáy dày 15mm cực kỳ cứng cáp.",
    "highlights": [
      "Ván mặt trên và 3 thanh đáy đều dày 15mm chịu lực nén & chống võng vượt trội",
      "Gia cường 4 thanh đỡ mặt trên (930×100×5 mm) tăng độ bền mặt sàn",
      "Hệ chân gù kết hợp 4 gù lớn 140×100×90 mm và 5 gù 100×100×90 mm vững chắc",
      "Miễn hun trùng xuất khẩu ISPM 15, lý tưởng cho thiết bị cơ khí & cuộn vật liệu nặng"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p1/p1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/container-pallet-load.jpg"
    ],
    "usagePurpose": "Kê cuộn màng, phụ tùng cơ khí, thiết bị nặng xuất khẩu không cần hun trùng",
    "badges": [
      "VÁN DÀY 15MM",
      "GIA CỐ 4 THANH ĐỠ",
      "CHỊU TẢI NẶNG"
    ],
    "facebookProof": {
      "title": "Đóng pallet gỗ ép 930×930×126mm ván dày 15mm chịu tải cao",
      "description": "Gia cố chân gù lớn 140×100mm và ván đáy 15mm chắc khỏe cho hàng công nghiệp.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pyc-01",
    "slug": "pallet-go-1300x1100x130-full-2-mat-ispm15",
    "name": "Pallet gỗ 1300 × 1100 × 130 mm (Full 2 mặt · ISPM 15)",
    "category": "Pallet Đóng Theo Bản Vẽ",
    "categorySlug": "pallet-theo-yeu-cau",
    "dimensions": "1300 x 1100 x 130 mm (±5mm)",
    "woodType": "Gỗ Tràm / Gỗ tự nhiên tươi, hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "3.500 - 4.500 kg",
    "dynamicLoad": "1.500 - 2.000 kg",
    "specification": "Quy cách: 1300 × 1100 × 130 mm (±5mm) thiết kế full 2 mặt · Thanh mặt trên: 1300 × 80 × 18 mm (11 thanh) · Đố thẳng chịu lực: 1100 × 35 × 90 mm (4 thanh) · Thanh đáy dưới: 1300 × 80 × 18 mm (11 thanh) · Xử lý hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Mẫu Pallet gỗ 1300 × 1100 × 130 mm thiết kế full 2 mặt (11 thanh mặt trên + 11 thanh mặt dưới dày 18mm, 4 đố thẳng 1100×35×90mm) chuyên dùng xếp chồng các bao tải hàng nặng nhiều tầng mà không làm rách hay lún bao hàng bên dưới. Kèm xử lý hun trùng HT chuẩn ISPM 15.",
    "highlights": [
      "Kết cấu full 2 mặt kín (11 thanh trên + 11 thanh dưới) xếp chồng bao hàng cực phẳng",
      "4 thanh đố thẳng 1100×35×90 mm phân tán tải trọng đều, không võng giữa",
      "Khổ rộng 1300 × 1100 mm tối ưu cho bao bột, hạt nhựa, phân bón, nông sản xuất khẩu",
      "Cấp đầy đủ mộc dấu và chứng thư hun trùng nhiệt HT ISPM 15"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p7.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Xếp chồng nhiều tầng bao hạt nhựa, bột mì, thức ăn chăn nuôi & xuất khẩu",
    "badges": [
      "FULL 2 MẶT (22 NAN)",
      "4 ĐỐ THẲNG",
      "ISPM 15 / HT"
    ],
    "facebookProof": {
      "title": "Gia công lô pallet gỗ 1300×1100mm full 2 mặt 4 đố chịu tải nặng",
      "description": "Đóng 11 nan trên + 11 nan dưới đều tăm tắp, xếp chồng kho xưởng an toàn tuyệt đối.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pyc-02",
    "slug": "pallet-go-1300x1100x110-1-mat-ispm15",
    "name": "Pallet gỗ 1300 × 1100 × 110 mm (1 mặt · 4 đố ISPM 15)",
    "category": "Pallet Đóng Theo Bản Vẽ",
    "categorySlug": "pallet-theo-yeu-cau",
    "dimensions": "1300 x 1100 x 110 mm (±5mm)",
    "woodType": "Gỗ Tràm / Gỗ tự nhiên tươi, hun trùng HT ISPM 15",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.500 - 3.000 kg",
    "dynamicLoad": "1.200 - 1.500 kg",
    "specification": "Quy cách: 1300 × 1100 × 110–130 mm (±5mm) thiết kế 1 mặt · Thanh mặt trên: 1300 × 80 × 18 mm (11 thanh) · Đố thẳng chịu lực: 1100 × 35 × 90 mm (4 thanh) · Xử lý hun trùng nhiệt HT theo tiêu chuẩn ISPM 15 kèm chứng thư",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Phiên bản Pallet gỗ 1300 × 1100 mm 1 mặt tiết kiệm chi phí gồm 11 thanh mặt trên (1300×80×18mm) đặt trên 4 thanh đố thẳng (1100×35×90mm). Phù hợp đóng hàng xuất khẩu 1 chiều, lót sàn kho và nâng hạ bằng xe nâng máy/tay kèm chứng thư hun trùng ISPM 15.",
    "highlights": [
      "Thiết kế 1 mặt tối ưu lượng gỗ, tiết kiệm 25–30% chi phí so với loại 2 mặt",
      "Mặt trên vẫn dày đủ 11 thanh nan 18mm kết hợp 4 đố thẳng cứng vững",
      "Đạt tiêu chuẩn hun trùng nhiệt HT ISPM 15 sẵn sàng đóng container xuất khẩu",
      "Nhận tùy chỉnh chiều cao 110mm hoặc 130mm theo loại xe nâng tại kho khách hàng"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p7.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p7.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-ippc-mark.jpg"
    ],
    "usagePurpose": "Đóng container xuất khẩu 1 chiều, lót sàn kho hàng khổ 1300×1100 mm tiết kiệm chi phí",
    "badges": [
      "THIẾT KẾ 1 MẶT",
      "TIẾT KIỆM CHI PHÍ",
      "ISPM 15 / HT"
    ],
    "facebookProof": {
      "title": "Sản xuất pallet 1 mặt 1300×1100mm hun trùng HT xuất khẩu",
      "description": "Tối ưu giá thành cho doanh nghiệp xuất khẩu, giao hàng đúng hẹn tận kho.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pyc-03",
    "slug": "gia-cong-pallet-go-theo-ban-ve-yeu-cau-rieng",
    "name": "Gia Công Pallet Gỗ Theo Bản Vẽ Yêu Cầu Riêng (Mọi Kích Thước)",
    "category": "Pallet Đóng Theo Bản Vẽ",
    "categorySlug": "pallet-theo-yeu-cau",
    "dimensions": "Gia công từ 800×800 đến 1600×1500 mm theo bản vẽ",
    "woodType": "Gỗ Tràm / Gỗ Thông / Ván Ép tùy chọn theo tải trọng",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "Tùy biến 1.500 - 5.000 kg",
    "dynamicLoad": "Tùy biến 1.000 - 2.500 kg",
    "specification": "Thiết kế bản vẽ CAD miễn phí theo kích thước hàng hóa & kệ kho · Tùy chọn kết cấu: 3–4 đố bằng, đố khuyết, 9–12 cục gù, 1 mặt hoặc 2 mặt · Dung sai gia công chuẩn ±2mm ~ ±5mm · Lên mẫu thử tải trong 24 giờ · Hỗ trợ bào láng, sấy khô, sơn cạnh logo & hun trùng HT ISPM 15",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Xưởng Pallet Trường An nhận khảo sát, tư vấn kết cấu chịu lực, vẽ bản vẽ kỹ thuật miễn phí và đóng mẫu thử tải trong 24 giờ cho mọi quy cách pallet phi tiêu chuẩn. Đáp ứng cả đơn hàng lẻ, đơn gấp kịp lịch tàu và hợp đồng cung ứng định kỳ cho nhà máy FDI.",
    "highlights": [
      "Miễn phí thiết kế bản vẽ kỹ thuật & làm mẫu pallet thử tải thực tế trong 24h",
      "Chủ động nguồn gỗ Tràm, gỗ Thông và Ván ép giá gốc trực tiếp tại xưởng Bà Điểm",
      "Nhận gia công mọi kích thước phi tiêu chuẩn từ nhỏ gọn đến siêu trường siêu trọng",
      "Đầy đủ dịch vụ sấy khô, bào láng 4 mặt và cấp chứng thư hun trùng ISPM 15"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p7.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.3.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/activities/a1.4.jpg"
    ],
    "usagePurpose": "Đóng gói máy móc thiết bị riêng, kệ kho đặc thù, đơn hàng B2B theo thông số riêng",
    "badges": [
      "THEO BẢN VẼ RIÊNG",
      "LÊN MẪU 24 GIỜ",
      "MIỄN PHÍ THIẾT KẾ"
    ],
    "facebookProof": {
      "title": "Trực tiếp thiết kế & lên mẫu pallet theo bản vẽ riêng cho nhà máy",
      "description": "Đội ngũ thợ lành nghề tại Bà Điểm, TP.HCM đáp ứng nhanh mọi quy cách khó.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pn-01",
    "slug": "pallet-nhua-moi-mat-luoi-lien-khoi-hdpe-1200x1000x150",
    "name": "Pallet Nhựa Mới Mặt Lưới Liền Khối HDPE (1200 × 1000 × 150 mm)",
    "category": "Pallet Nhựa Mới Công Nghiệp",
    "categorySlug": "pallet-nhua-moi",
    "dimensions": "1200 x 1000 x 150 mm",
    "woodType": "Nhựa HDPE nguyên sinh 100% chống tia UV",
    "materialGroup": "nhua",
    "targetMarket": "noi-dia",
    "staticLoad": "3.000 - 4.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "1 mặt lưới thoáng khí · 3 chân suốt nâng 4 hướng · Nút cao su chống trượt · Dùng tốt trong kho lạnh",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet nhựa mới đúc nguyên khối từ nhựa HDPE nguyên sinh 100% siêu bền, chịu va đập mạnh, không thấm nước, không mối mọt và dễ xịt rửa vệ sinh. Phù hợp kho lạnh thủy sản, nhà máy thực phẩm, dược phẩm chuẩn GMP/HACCP và kệ kho cao tầng.",
    "highlights": [
      "Nhựa HDPE nguyên sinh 100%, chịu nhiệt độ kho lạnh âm sâu đến -20°C",
      "4 hướng nâng tiện lợi cho cả xe nâng tay lẫn xe nâng máy",
      "Tuổi thọ bền bỉ 5–10 năm, gắn nút cao su chống trượt an toàn",
      "Sẵn kho số lượng lớn, báo giá sỉ cạnh tranh cho doanh nghiệp B2B"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-new-mesh.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-new-mesh.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-warehouse-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-top.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-bottom.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-blue.jpg"
    ],
    "usagePurpose": "Kho lạnh thủy sản, nhà máy thực phẩm, dược phẩm GMP, lưu kho dài hạn",
    "badges": [
      "HDPE NGUYÊN SINH",
      "CHỊU KHO LẠNH",
      "4 HƯỚNG NÂNG"
    ],
    "facebookProof": {
      "title": "Cung cấp sỉ pallet nhựa mới HDPE cho kho lạnh & nhà máy thực phẩm",
      "description": "Hàng sẵn kho số lượng lớn, giao nhanh tại TP.HCM, Bình Dương, Long An.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pn-02",
    "slug": "pallet-nhua-chan-coc-sieu-nhe-xuat-khau-1200x1000x140",
    "name": "Pallet Nhựa Chân Cốc Siêu Nhẹ Xuất Khẩu 1 Chiều (1200 × 1000 × 140 mm)",
    "category": "Pallet Nhựa Mới Công Nghiệp",
    "categorySlug": "pallet-nhua-moi",
    "dimensions": "1200 x 1000 x 140 mm",
    "woodType": "Nhựa PP / HDPE tái sinh loại 1 siêu nhẹ",
    "materialGroup": "nhua",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 2.000 kg",
    "dynamicLoad": "600 - 1.000 kg",
    "specification": "9 chân cốc xếp lồng vào nhau (Nestable) · Nâng 4 hướng · Trọng lượng nhẹ ~6.5 - 7.5 kg · Miễn ISPM 15",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Pallet nhựa 9 chân cốc chuyên dụng đóng hàng xuất khẩu 1 chiều đi Mỹ, EU, Nhật Bản. Thiết kế xếp chồng lồng vào nhau tiết kiệm 65% diện tích kho bãi, trọng lượng nhẹ ~7kg và hoàn toàn miễn thủ tục hun trùng ISPM 15.",
    "highlights": [
      "Xếp lồng 9 chân cốc tiết kiệm 65% không gian lưu kho khi chưa sử dụng",
      "Miễn 100% thủ tục hun trùng kiểm dịch thực vật ISPM 15 khi xuất khẩu",
      "Giá thành kinh tế nhất cho các lô hàng xuất khẩu 1 chiều không thu hồi pallet",
      "Nâng hạ 4 hướng dễ dàng bằng cả xe nâng tay và xe nâng máy"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-nestable.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-nestable.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-new-mesh.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-blue.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-warehouse-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-top.jpg"
    ],
    "usagePurpose": "Xuất khẩu 1 chiều đường biển & hàng không, lót sàn kho nhẹ, đóng container",
    "badges": [
      "CHÂN CỐC XẾP LỒNG",
      "SIÊU NHẸ ~7KG",
      "MIỄN ISPM 15"
    ],
    "facebookProof": {
      "title": "Pallet nhựa 9 chân cốc xuất khẩu 1 chiều giá sỉ tận kho",
      "description": "Xếp lồng gọn nhẹ, sẵn số lượng lớn phục vụ đơn đóng cont gấp.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "pn-03",
    "slug": "pallet-nhua-cu-da-qua-su-dung-do-moi-90-1200x1000",
    "name": "Pallet Nhựa Cũ Đã Qua Sử Dụng Độ Mới 85–95% (1100×1100 / 1200×1000 mm)",
    "category": "Pallet Nhựa Cũ (Độ Mới 85–95%)",
    "categorySlug": "pallet-nhua-cu",
    "dimensions": "1100 x 1100 x 120-150 mm / 1200 x 1000 x 150 mm",
    "woodType": "Nhựa HDPE nhập khẩu Nhật / Hàn tuyển chọn",
    "materialGroup": "nhua",
    "targetMarket": "noi-dia",
    "staticLoad": "2.500 - 4.000 kg",
    "dynamicLoad": "1.000 - 1.500 kg",
    "specification": "Tuyển chọn kỹ không nứt gãy · Độ mới 85–95% · Đủ loại mặt lưới / mặt bít / chân giằng · Nâng 4 hướng",
    "isExportStandard": false,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Pallet nhựa cũ nhập khẩu Nhật Bản, Hàn Quốc đã qua sử dụng 1–2 lần, được tuyển chọn kỹ đảm bảo nguyên vẹn không nứt vỡ, độ mới 85–95%, giúp doanh nghiệp tiết kiệm 30–40% chi phí đầu tư.",
    "highlights": [
      "Tiết kiệm 30–40% ngân sách so với mua pallet nhựa mới cùng tải trọng",
      "Kiểm tra tuyển chọn từng cái, không nứt gãy, xịt rửa sạch trước khi giao",
      "Đủ kích thước phổ biến: 1100×1100, 1200×1000, 1200×1200, 1100×1300 mm",
      "Thích hợp kê kho nông sản, gạo, phân bón, vật tư và nhà xưởng nội địa"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-warehouse-stack.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-warehouse-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-blue.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-top.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/plastic-pallets/pp-bottom.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/pp-new-mesh.jpg"
    ],
    "usagePurpose": "Kê kho tiết kiệm chi phí, kho gạo, nông sản, vật liệu xây dựng & nhà xưởng",
    "badges": [
      "TIẾT KIỆM 40%",
      "ĐỘ MỚI 85–95%",
      "SẴN KHO LỚN"
    ],
    "facebookProof": {
      "title": "Kho pallet nhựa cũ tuyển chọn độ mới 90% giá tốt tại TP.HCM",
      "description": "Hỗ trợ quay video kiểm hàng thực tế trước khi bốc xếp lên xe giao tận nơi.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-01",
    "slug": "thung-go-980x680x420-mm",
    "name": "Thùng gỗ 980 × 680 × 420 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "980 x 680 x 420 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (980×70×16) + 3 thanh gánh (712×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (1012×70×16) · Mặt đứng dài: 3 ngang (1012×70×16) + 3 đứng (558×70×16) + 4 giằng chéo (533×70×16) · Mặt đứng rộng: 3 ngang (680×70×16) + 3 đứng (558×70×16) + 4 giằng chéo (399×70×16) · Mặt trên (nắp): 5 thanh ngang dài (1044×70×16) + 4 thanh dọc ngắn (744×70×16)",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 980 × 680 × 420 mm (mã TG-01) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (1044mm) + 4 thanh ngắn (744mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-4way-forklift.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-4way-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-box-strapped.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-01",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 980 × 680 × 420 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-02",
    "slug": "thung-go-1020x880x960-mm",
    "name": "Thùng gỗ 1020 × 880 × 960 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "1020 x 880 x 960 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (1020×70×16) + 3 thanh gánh (912×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (1052×70×16) · Mặt đứng dài: 3 ngang (1052×70×16) + 3 đứng (1098×70×16) + 4 giằng chéo (700×70×16) · Mặt đứng rộng: 3 ngang (880×70×16) + 3 đứng (1098×70×16) + 4 giằng chéo (651×70×16) · Mặt trên (nắp): 5 thanh ngang dài (1084×70×16) + 4 thanh dọc ngắn (944×70×16)",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 1020 × 880 × 960 mm (mã TG-02) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (1084mm) + 4 thanh ngắn (944mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-box-strapped.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-box-strapped.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-02",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 1020 × 880 × 960 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-03",
    "slug": "thung-go-800x750x580-mm",
    "name": "Thùng gỗ 800 × 750 × 580 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "800 x 750 x 580 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (800×70×16) + 3 thanh gánh (782×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (832×70×16) · Mặt đứng dài: 3 ngang (832×70×16) + 3 đứng (718×70×16) + 4 giằng chéo (494×70×16) · Mặt đứng rộng: 3 ngang (750×70×16) + 3 đứng (718×70×16) + 4 giằng chéo (474×70×16) · Mặt trên (nắp): 5 thanh ngang dài (864×70×16) + 4 thanh dọc ngắn (814×70×16)",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 800 × 750 × 580 mm (mã TG-03) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (864mm) + 4 thanh ngắn (814mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-03",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 800 × 750 × 580 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-04",
    "slug": "thung-go-1050x830x900-mm",
    "name": "Thùng gỗ 1050 × 830 × 900 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "1050 x 830 x 900 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (1050×70×16) + 3 thanh gánh (862×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (1082×70×16) · Mặt đứng dài: 3 ngang (1082×70×16) + 3 đứng (1038×70×16) + 4 giằng chéo (691×70×16) · Mặt đứng rộng: 3 ngang (830×70×16) + 3 đứng (1038×70×16) + 4 giằng chéo (612×70×16) · Mặt trên (nắp): 5 thanh ngang dài (1114×70×16) + 4 thanh dọc ngắn (894×70×16)",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 1050 × 830 × 900 mm (mã TG-04) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (1114mm) + 4 thanh ngắn (894mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.5.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-04",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 1050 × 830 × 900 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-05",
    "slug": "thung-go-920x920x410-mm",
    "name": "Thùng gỗ 920 × 920 × 410 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "920 x 920 x 410 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (920×70×16) + 3 thanh gánh (952×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (952×70×16) · Mặt đứng dài: 3 ngang (952×70×16) + 3 đứng (548×70×16) + 4 giằng chéo (503.6×70×16) · Mặt đứng rộng: 3 ngang (920×70×16) + 3 đứng (548×70×16) + 4 giằng chéo (503.6×70×16) · Mặt trên (nắp): 5 thanh ngang dài (984×70×16) + 4 thanh dọc ngắn (984×70×16)",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 920 × 920 × 410 mm (mã TG-05) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (984mm) + 4 thanh ngắn (984mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-4way-forklift.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-05",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 920 × 920 × 410 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-06",
    "slug": "thung-go-650x570x1000-mm",
    "name": "Thùng gỗ 650 × 570 × 1000 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "650 x 570 x 1000 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (650×70×16) + 3 thanh gánh (602×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (682×70×16) · Mặt đứng dài: 3 ngang (682×70×16) + 3 đứng (1138×70×16) + 4 giằng chéo (575.3×70×16) · Mặt đứng rộng: 3 ngang (570×70×16) + 3 đứng (1138×70×16) + 4 giằng chéo (575.5×70×16) · Mặt trên (nắp): 5 thanh ngang dài (714×70×16) + 4 thanh dọc ngắn (634×70×16)",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 650 × 570 × 1000 mm (mã TG-06) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (714mm) + 4 thanh ngắn (634mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-4way-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-box-strapped.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-06",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 650 × 570 × 1000 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-07",
    "slug": "thung-go-1090x830x570-mm",
    "name": "Thùng gỗ 1090 × 830 × 570 mm",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "1090 x 830 x 570 mm",
    "woodType": "Gỗ Tràm / Gỗ Thông thanh chuẩn 70×16mm + 9 gù 90×90×90mm",
    "materialGroup": "go-tram",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "1.500 - 3.000 kg",
    "dynamicLoad": "1.000 - 1.800 kg",
    "specification": "Mặt đáy: 8 ván mặt (1090×70×16) + 3 thanh gánh (862×70×16) + 9 cục gù (90×90×90) + 3 thanh đáy (1122×70×16) · Mặt đứng dài: 3 ngang (1122×70×16) + 3 đứng (708×70×16) + 4 giằng chéo (615×70×16) · Mặt đứng rộng: 3 ngang (830×70×16) + 3 đứng (708×70×16) + 4 giằng chéo (503.4×70×16) · Mặt trên (nắp): 5 thanh ngang dài (1154×70×16) + 4 thanh dọc ngắn (894×70×16)",
    "isExportStandard": true,
    "isNew": false,
    "priceDisplay": "Liên hệ",
    "description": "Thùng gỗ 1090 × 830 × 570 mm (mã TG-07) thuộc bộ thùng gỗ nan thưa có nắp chuẩn sản xuất của Xưởng Pallet Trường An. Thùng tích hợp sẵn đế pallet 9 cục gù 90×90×90mm nâng 4 hướng, 4 vách đứng gia cố thanh giằng chéo chống xô lệch và nắp đậy 9 thanh chắc chắn, bảo vệ an toàn cho máy móc, phụ tùng và hàng xuất khẩu.",
    "highlights": [
      "Đế thùng tích hợp 9 cục gù 90×90×90 mm + 8 ván mặt đáy chịu tải cao, nâng 4 hướng",
      "4 vách đứng đều có 4 thanh giằng chéo chống vặn xoắn khi cẩu kéo & đi biển",
      "Kèm nắp trên đóng sẵn 5 thanh dài (1154mm) + 4 thanh ngắn (894mm)",
      "Hỗ trợ hun trùng nhiệt HT ISPM 15 và giao rời từng tấm vách để lắp nhanh tại kho"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-4way-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/pallet-box-strapped.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.1.jpg"
    ],
    "usagePurpose": "Đóng kiện phụ tùng cơ khí, thiết bị điện, van công nghiệp, đá & hàng xuất khẩu",
    "badges": [
      "MÃ TG-07",
      "ĐẾ 9 GÙ + GIẰNG CHÉO",
      "CÓ NẮP ĐẬY"
    ],
    "facebookProof": {
      "title": "Gia công Thùng gỗ 1090 × 830 × 570 mm có đế 9 gù và vách giằng chéo xuất khẩu",
      "description": "Bóc tách chính xác từng thanh nan 70×16mm, lắp ghép khít đẹp và chịu lực cao.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tg-08",
    "slug": "thung-go-kin-van-ep-dong-may-moc-theo-yeu-cau",
    "name": "Thùng gỗ đóng theo yêu cầu / Thùng gỗ kín ván ép máy móc (ISPM 15)",
    "category": "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    "categorySlug": "thung-go-dong-hang",
    "dimensions": "Khảo sát & gia công theo kích thước máy móc thực tế",
    "woodType": "Ván ép Plywood 12–18mm + Khung xương gỗ Thông / Tràm",
    "materialGroup": "van-ep",
    "targetMarket": "xuat-khau-ispm15",
    "staticLoad": "2.000 - 5.000 kg",
    "dynamicLoad": "1.500 - 3.000 kg",
    "specification": "Đế pallet chịu tải nặng · Vách kín ván ép hoặc nan thưa theo bản vẽ · Hỗ trợ hút chân không & lắp ráp tận nơi",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Dịch vụ đóng thùng gỗ theo kích thước riêng (thùng gỗ kín ván ép hoặc thùng nan thưa siêu trường) cho máy CNC, tủ điện, dây chuyền công nghiệp. Đội thợ Xưởng Trường An hỗ trợ xuống trực tiếp nhà máy khách hàng đo đạc và lắp ráp hoàn thiện trong ngày kèm chứng thư ISPM 15.",
    "highlights": [
      "Nhận đóng mọi kích thước thùng gỗ kín & thùng nan thưa theo máy móc thực tế",
      "Cử đội thợ mộc & vật tư xuống lắp ráp trực tiếp tại nhà máy khách hàng trong ngày",
      "Hỗ trợ quấn màng PE, màng nhôm hút chân không chống ẩm cho thiết bị điện tử",
      "Cấp đầy đủ mộc dấu và chứng thư khử trùng nhiệt HT chuẩn xuất khẩu ISPM 15"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p6.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/curated/crate-plywood-std.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/wood-warehouse-forklift.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.2.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/p6.4.jpg"
    ],
    "usagePurpose": "Đóng kiện máy CNC, dây chuyền sản xuất, thiết bị giá trị cao xuất khẩu đường biển",
    "badges": [
      "ĐÓNG THEO YÊU CẦU",
      "LẮP RÁP TẬN NƠI",
      "CHUẨN ISPM 15"
    ],
    "facebookProof": {
      "title": "Lắp ráp thùng gỗ kín đóng máy móc tận nhà máy khách hàng",
      "description": "Đội thợ cơ động tại Bà Điểm, TP.HCM, Bình Dương, Long An — hoàn thiện nhanh kịp lịch tàu.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tn-01",
    "slug": "thung-nhua-dac-cong-nghiep-co-nap-610x420x310",
    "name": "Thùng Nhựa Đặc Công Nghiệp Có Nắp (610 × 420 × 310 mm)",
    "category": "Thùng Nhựa Công Nghiệp",
    "categorySlug": "thung-nhua",
    "dimensions": "610 x 420 x 310 mm",
    "woodType": "Nhựa HDPE nguyên sinh chịu lực cao",
    "materialGroup": "nhua",
    "targetMarket": "noi-dia",
    "staticLoad": "200 kg (xếp chồng)",
    "dynamicLoad": "40 - 50 kg / thùng",
    "specification": "Thành kín chống bụi & ẩm ướt · Gân tăng cứng xung quanh · Tay cầm chịu lực · Kèm nắp đậy kín khít",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Thùng nhựa đặc (sóng nhựa bít) công nghiệp sản xuất từ nhựa HDPE nguyên sinh 100%, thành dày nhiều gân tăng cứng chịu va đập mạnh, kèm nắp đậy kín chống bụi bẩn và ẩm ướt khi lưu kho trên pallet.",
    "highlights": [
      "Nhựa HDPE nguyên sinh dày dặn, chống giòn gãy, tuổi thọ trên 5 năm",
      "Thành kín có nắp đậy bảo vệ hoàn hảo linh kiện, thực phẩm & thủy sản",
      "Xếp chồng nhiều tầng vững chắc trên mặt pallet 1200×1000 mm",
      "Cung cấp sỉ số lượng lớn đủ màu xanh, đỏ, vàng, lá"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p8.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p8.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-lidded-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-bins-shelf.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-vented-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-versandturm.jpg"
    ],
    "usagePurpose": "Đựng linh kiện cơ khí, điện tử, thực phẩm, thủy sản kho lạnh & lưu kho",
    "badges": [
      "NHỰA HDPE NGUYÊN SINH",
      "CÓ NẮP KÍN",
      "XẾP CHỒNG KHO"
    ],
    "facebookProof": {
      "title": "Cung cấp sỉ thùng nhựa đặc công nghiệp cho nhà máy & kho xưởng",
      "description": "Sẵn kho số lượng lớn đủ màu, giao nhanh tại TP.HCM và các tỉnh lân cận.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tn-02",
    "slug": "thung-nhua-ho-song-nhua-ho-cong-nghiep-610x420x250",
    "name": "Thùng Nhựa Hở / Sóng Nhựa Hở Công Nghiệp (610 × 420 × 250 mm)",
    "category": "Thùng Nhựa Công Nghiệp",
    "categorySlug": "thung-nhua",
    "dimensions": "610 x 420 x 250 mm",
    "woodType": "Nhựa HDPE nguyên sinh bền dẻo",
    "materialGroup": "nhua",
    "targetMarket": "noi-dia",
    "staticLoad": "180 kg (xếp chồng)",
    "dynamicLoad": "35 - 45 kg / thùng",
    "specification": "Thành nan hở thoáng khí thoát nước nhanh · Vành miệng gia cố chịu tải · Tay cầm 2 đầu tiện bốc xếp",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Thùng nhựa hở (sóng nhựa hở) thiết kế nan lưới thông thoáng thoát hơi ẩm và nước nhanh chóng, chuyên dụng cho nông sản, trái cây, may mặc, thủy sản và phân loại hàng hóa kho vận.",
    "highlights": [
      "Nan lưới thông thoáng giúp dễ quan sát hàng và thoát nước nhanh",
      "Nhựa HDPE nguyên sinh an toàn cho nông sản & thực phẩm tươi sống",
      "Vành miệng cứng cáp xếp chồng ổn định trên mặt pallet",
      "Chiết khấu cao cho đơn hàng số lượng lớn B2B"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p9.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p9.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-vented-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-euro-collection.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-factory-crates.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-colorful-crates.jpg"
    ],
    "usagePurpose": "Đựng nông sản, trái cây, hàng may mặc, thủy sản & phân loại kho vận",
    "badges": [
      "SÓNG NHỰA HỞ",
      "THOÁNG KHÍ",
      "GIÁ SỈ KHO XƯỞNG"
    ],
    "facebookProof": {
      "title": "Giao lô sóng nhựa hở cho kho nông sản & nhà máy may mặc",
      "description": "Hỗ trợ giao nhanh bằng xe tải xưởng đi TP.HCM, Bình Dương, Long An, Đồng Nai.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    "id": "tn-03",
    "slug": "khay-nhua-linh-kien-cong-nghiep-xep-chong-kho-xuong",
    "name": "Khay Nhựa Linh Kiện Công Nghiệp Xếp Chồng Kho Xưởng (480 × 350 × 180 mm)",
    "category": "Thùng Nhựa Công Nghiệp",
    "categorySlug": "thung-nhua",
    "dimensions": "480 x 350 x 180 mm",
    "woodType": "Nhựa PP / HDPE nguyên sinh chống va đập",
    "materialGroup": "nhua",
    "targetMarket": "noi-dia",
    "staticLoad": "150 kg (xếp chồng)",
    "dynamicLoad": "25 - 35 kg / khay",
    "specification": "Thành đứng tối ưu thể tích chứa · Đáy phẳng chạy mượt trên băng chuyền & kệ kho công nghiệp",
    "isExportStandard": true,
    "isNew": true,
    "priceDisplay": "Liên hệ",
    "description": "Khay nhựa linh kiện chuẩn Eurobox chuyên dùng phân loại bulong, ốc vít, phụ tùng cơ khí và linh kiện điện tử trên giá kệ nhà xưởng. Nhựa nguyên sinh kháng dầu mỡ, xếp chồng an toàn.",
    "highlights": [
      "Kích thước chuẩn kệ kho công nghiệp, dễ sắp xếp & kiểm kê tồn kho",
      "Nhựa nguyên sinh chịu va đập tốt, kháng dầu mỡ, dễ vệ sinh",
      "Đáy phẳng gia cường chạy êm trên băng tải con lăn",
      "Sẵn nhiều màu phân loại (xanh dương, xám, đỏ, vàng) giá sỉ B2B"
    ],
    "imageUrl": "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-bins-shelf.jpg",
    "gallery": [
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-bins-shelf.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/clean/plastic-vented-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-lidded-stack.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/gallery/plastic-versandturm.jpg",
      "https://jrgtjjyoebfnajbtsubz.supabase.co/storage/v1/object/public/product-images/products/studio/p8.jpg"
    ],
    "usagePurpose": "Phân loại linh kiện điện tử, phụ tùng cơ khí, vật tư trên kệ kho nhà máy",
    "badges": [
      "CHUẨN KỆ KHO",
      "NHỰA NGUYÊN SINH",
      "GIÁ SỈ B2B"
    ],
    "facebookProof": {
      "title": "Cung cấp khay nhựa & thùng nhựa công nghiệp đồng bộ cho kho xưởng",
      "description": "Giao hàng tận nơi kèm pallet kê kho trọn gói cho nhà máy.",
      "fbUrl": "https://www.facebook.com/PalletTruongAn/"
    }
  }
];
