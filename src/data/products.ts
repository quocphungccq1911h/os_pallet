export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  dimensions: string; // e.g., "1200 x 1000 x 150 mm"
  woodType: string; // e.g., "Gỗ Tràm", "Gỗ Keo"
  staticLoad: string; // Tải trọng tĩnh e.g., "2000 kg"
  dynamicLoad: string; // Tải trọng động e.g., "1000 kg"
  specification: string; // Quy cách e.g., "4 hướng nâng, 2 mặt"
  isExportStandard: boolean; // Tiêu chuẩn ISPM 15
  isNew: boolean;
  priceDisplay: string; // "Liên hệ"
  description: string;
  highlights: string[];
  imageUrl: string;
  usagePurpose: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "pallet-go-moi",
    name: "Pallet Gỗ Mới",
    slug: "pallet-go-moi",
    description: "Sản xuất mới 100% từ nguồn gỗ tràm, keo đạt chuẩn, sấy khô chống mối mọt."
  },
  {
    id: "pallet-go-cu",
    name: "Pallet Gỗ Cũ / Thanh Lý",
    slug: "pallet-go-cu",
    description: "Pallet gỗ cũ còn mới 85% - 95%, chắc chắn, tiết kiệm chi phí cho kho bãi."
  },
  {
    id: "pallet-xuatt-khau",
    name: "Pallet Gỗ Xuất Khẩu (ISPM 15)",
    slug: "pallet-xuat-khau",
    description: "Khử trùng HT/MB tiêu chuẩn ISPM 15 quốc tế, đầy đủ chứng thư xuất khẩu."
  },
  {
    id: "pallet-go-tram-keo",
    name: "Pallet Gỗ Tràm / Keo",
    slug: "pallet-go-tram-keo",
    description: "Chịu lực cao, dai, ít biến dạng, thích hợp kho vận nặng và kho lạnh."
  },
  {
    id: "pallet-theo-yeu-cau",
    name: "Pallet Đóng Theo Yêu Cầu",
    slug: "pallet-theo-yeu-cau",
    description: "Thiết kế và gia công kích thước, quy cách theo bản vẽ kỹ thuật của khách hàng."
  },
  {
    id: "pallet-tai-trong-cao",
    name: "Pallet Tải Trọng Cao",
    slug: "pallet-tai-trong-cao",
    description: "Chịu tải động từ 1.5 - 3 tấn, chuyên dùng kê hàng hóa nặng, xếp chồng."
  }
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "pallet-go-1200x1000",
    name: "Pallet Gỗ Tràm 1200x1000mm (4 Hướng Nâng)",
    category: "Pallet Gỗ Mới",
    categorySlug: "pallet-go-moi",
    dimensions: "1200 x 1000 x 140 mm",
    woodType: "Gỗ Tràm tự nhiên sấy khô",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.200 kg",
    specification: "4 hướng nâng dùng xe nâng tay & xe nâng máy",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Mẫu pallet gỗ tiêu chuẩn phổ biến nhất trong các kho bãi và nhà máy sản xuất. Nan mặt dày 18-20mm, đố khuyết tiện lợi cho xe nâng tay.",
    highlights: [
      "Gỗ tràm đã qua sấy chống nấm mốc",
      "Phù hợp cả xe nâng tay và xe nâng động cơ",
      "Độ bền cao, chịu tải trọng tốt",
      "Hỗ trợ khử trùng HT tiêu chuẩn ISPM 15"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Lưu kho, kê hàng xuất khẩu, xếp chồng kho bãi"
  },
  {
    id: "p2",
    slug: "pallet-go-1200x800",
    name: "Pallet Gỗ Keo 1200x800mm (Chuẩn Euro Pallet)",
    category: "Pallet Gỗ Xuất Khẩu",
    categorySlug: "pallet-xuat-khau",
    dimensions: "1200 x 800 x 144 mm",
    woodType: "Gỗ Keo sấy đạt ẩm < 18%",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.000 kg",
    specification: "Kích thước tiêu chuẩn Châu Âu (EPAL)",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Đạt kích thước chuẩn Châu Âu 1200x800mm. Phù hợp cho các doanh nghiệp đóng hàng container xuất khẩu sang thị trường Âu, Mỹ, Nhật Bản.",
    highlights: [
      "Chuẩn kích thước Euro Pallet",
      "Xử lý nhiệt HT đạt chứng chỉ ISPM 15",
      "Nan vuông vắn, bào mịn 4 mặt",
      "Tiết kiệm thể tích lòng container"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Đóng hàng container xuất khẩu Châu Âu, Mỹ, Nhật"
  },
  {
    id: "p3",
    slug: "pallet-go-cu-1100x1100",
    name: "Pallet Gỗ Cũ 1100x1100mm (Mới 90%)",
    category: "Pallet Gỗ Cũ / Thanh Lý",
    categorySlug: "pallet-go-cu",
    dimensions: "1100 x 1100 x 120 mm",
    woodType: "Gỗ Thông / Gỗ Tràm nhập khẩu",
    staticLoad: "1.500 kg",
    dynamicLoad: "800 kg",
    specification: "2 mặt / 4 hướng nâng",
    isExportStandard: false,
    isNew: false,
    priceDisplay: "Liên hệ",
    description: "Pallet gỗ đã qua sử dụng 1 lần, chất lượng chọn lọc còn mới 85-90%. Giá cực tốt giúp tiết kiệm chi phí tối đa cho doanh nghiệp.",
    highlights: [
      "Chất lượng còn mới trên 85-90%",
      "Không gãy nát, không mục mọt",
      "Tiết kiệm 40-50% chi phí so với mua mới",
      "Sẵn hàng số lượng lớn giao ngay"
    ],
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Kê hàng nội địa, vận chuyển ngắn hạn, lưu kho tiết kiệm"
  },
  {
    id: "p4",
    slug: "pallet-go-tai-trong-cao-1200x1200",
    name: "Pallet Gỗ Chịu Tải Trọng Nặng 1200x1200mm",
    category: "Pallet Tải Trọng Cao",
    categorySlug: "pallet-tai-trong-cao",
    dimensions: "1200 x 1200 x 150 mm",
    woodType: "Gỗ Tràm chọn lọc nan dày 22mm",
    staticLoad: "3.500 kg",
    dynamicLoad: "2.000 kg",
    specification: "Đố chốt đinh xoắn liên kết siêu cường",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Chuyên dụng kê hàng hóa siêu nặng như máy móc, bao công nghiệp (FIBC), hóa chất, thép cuộn. Kết cấu gia cường chân đố vững chắc.",
    highlights: [
      "Nan gỗ dày 22mm cứng cáp",
      "Chịu tải tĩnh đến 3.5 tấn",
      "Đinh xoắn chuyên dụng chống bung",
      "Nhận gia công đóng theo bản vẽ"
    ],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Kê hàng máy móc nặng, kho bao FIBC, hóa chất, vật liệu xây dựng"
  },
  {
    id: "p5",
    slug: "pallet-go-keo-2-mat",
    name: "Pallet Gỗ Keo 2 Mặt Kê Hàng Xếp Chồng",
    category: "Pallet Gỗ Tràm / Keo",
    categorySlug: "pallet-go-tram-keo",
    dimensions: "1100 x 1100 x 140 mm",
    woodType: "Gỗ Keo tự nhiên",
    staticLoad: "3.000 kg",
    dynamicLoad: "1.500 kg",
    specification: "2 mặt sử dụng linh hoạt, đố bằng",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Pallet 2 mặt thiết kế đối xứng, giúp lực phân bổ đều khi xếp chồng nhiều tầng pallet lên nhau trong kho bãi tối ưu không gian.",
    highlights: [
      "Thiết kế 2 mặt sử dụng lật đảo linh hoạt",
      "Thích hợp xếp chồng pallet 2-3 tầng",
      "Phù hợp xe nâng máy",
      "Chống lún sạt hàng hóa"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Xếp chồng kho bãi, lưu kho nông sản, thực phẩm, hạt nhựa"
  },
  {
    id: "p6",
    slug: "pallet-go-dong-theo-yeu-cau",
    name: "Pallet Gỗ Gia Công Đóng Theo Bản Vẽ Yêu Cầu",
    category: "Pallet Đóng Theo Yêu Cầu",
    categorySlug: "pallet-theo-yeu-cau",
    dimensions: "Tùy chỉnh theo yêu cầu",
    woodType: "Gỗ Tràm / Keo / Thông sấy",
    staticLoad: "Theo thiết kế",
    dynamicLoad: "Theo thiết kế",
    specification: "Sản xuất chính xác theo thông số bản vẽ",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Nhận sản xuất gia công pallet gỗ theo đúng kích thước, bản vẽ và yêu cầu kỹ thuật riêng của từng doanh nghiệp. Đảm bảo dung sai cực nhỏ.",
    highlights: [
      "Tùy chọn kích thước, độ dày nan, số đố",
      "Tư vấn thiết kế tối ưu tải trọng & chi phí",
      "Cung cấp mẫu thử nghiệm trước khi sản xuất hàng loạt",
      "Cung cấp đầy đủ hóa đơn & chứng chỉ xuất xưởng"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Doanh nghiệp có kiện hàng kích thước đặc thù, thùng máy xuất khẩu"
  }
];
