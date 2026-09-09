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
    id: "thung-go-dong-hang",
    name: "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    slug: "thung-go-dong-hang",
    description: "Chuyên đóng thùng gỗ kín, thùng gỗ thưa bọc lót máy móc, thiết bị công nghiệp xuất khẩu đi Mỹ, Campuchia, EU."
  },
  {
    id: "pallet-van-ep",
    name: "Pallet Ván Ép (Plywood)",
    slug: "pallet-van-ep",
    description: "Pallet mặt ván ép phẳng mịn, siêu nhẹ, không giác gỗ, xuất khẩu thuận tiện không vướng thủ tục hun trùng khắt khe."
  },
  {
    id: "pallet-go-moi",
    name: "Pallet Gỗ Thông & Tràm Mới",
    slug: "pallet-go-moi",
    description: "Sản xuất mới 100% từ gỗ tràm tự nhiên, gỗ thông xẻ sấy đạt độ ẩm tiêu chuẩn, chắc khỏe."
  },
  {
    id: "pallet-theo-yeu-cau",
    name: "Pallet Đóng Theo Yêu Cầu",
    slug: "pallet-theo-yeu-cau",
    description: "Thiết kế, lên mẫu và gia công kích thước, quy cách theo đúng bản vẽ kỹ thuật của khách hàng."
  },
  {
    id: "pallet-xuat-khau",
    name: "Pallet Xuất Khẩu (ISPM 15)",
    slug: "pallet-xuat-khau",
    description: "Khử trùng nhiệt HT tiêu chuẩn quốc tế ISPM 15, đầy đủ mộc dấu và chứng thư thông quan."
  },
  {
    id: "pallet-go-cu",
    name: "Pallet Gỗ Cũ / Thanh Lý",
    slug: "pallet-go-cu",
    description: "Pallet gỗ cũ tuyển chọn còn mới 85% - 95%, chắc chắn, giúp doanh nghiệp tiết kiệm đến 50% chi phí kho."
  }
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "thung-go-kin-dong-may-moc",
    name: "Thùng Gỗ Kín Đóng Kiện Máy Móc Xuất Khẩu",
    category: "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    categorySlug: "thung-go-dong-hang",
    dimensions: "Gia công theo kích thước máy móc",
    woodType: "Gỗ Thông / Gỗ Tràm + Ván ép chịu lực",
    staticLoad: "3.000 - 5.000 kg",
    dynamicLoad: "1.500 - 2.500 kg",
    specification: "Thùng kín 6 mặt, có thanh giằng chịu lực & đế pallet",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Thế mạnh chuyên môn của xưởng Trường An: Đóng thùng gỗ kín bảo vệ tuyệt đối linh kiện, tủ điện, máy móc công nghiệp xuất khẩu đi Mỹ, Campuchia và đường biển quốc tế. Chống ẩm, chống va đập xô lệch.",
    highlights: [
      "Đóng theo kích thước và hình dáng máy móc thực tế",
      "Đáy tích hợp pallet đố chịu tải cực khỏe cho xe nâng",
      "Khung xương giằng chắc chắn, chịu lực va đập khi cẩu hàng",
      "Khử trùng nhiệt HT tiêu chuẩn xuất khẩu ISPM 15"
    ],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Đóng gói máy móc thiết bị cơ khí, tủ điện công nghiệp, hàng điện tử xuất khẩu"
  },
  {
    id: "p2",
    slug: "thung-go-thua-dong-hang",
    name: "Thùng Gỗ Thưa / Nan Thưa Bảo Vệ Hàng Hóa",
    category: "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    categorySlug: "thung-go-dong-hang",
    dimensions: "Theo yêu cầu từng kiện hàng",
    woodType: "Gỗ Thông / Tràm tự nhiên xẻ sấy",
    staticLoad: "2.000 - 3.500 kg",
    dynamicLoad: "1.000 - 1.800 kg",
    specification: "Nan thưa thoáng khí, đế pallet 2 - 4 hướng nâng",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Giải pháp đóng kiện gỗ nan thưa tiết kiệm chi phí nhưng vẫn đảm bảo độ cứng vững, định vị máy móc hoặc cuộn cáp, phôi thép không bị xô ngã trong quá trình vận chuyển container.",
    highlights: [
      "Tiết kiệm chi phí so với thùng gỗ kín",
      "Thông thoáng khí, dễ kiểm tra số serial máy móc bên trong",
      "Gia cố đinh xoắn và nẹp góc kim loại",
      "Thi công nhanh tại xưởng Hóc Môn hoặc tận kho khách hàng"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Đóng kiện phụ tùng, phôi kim loại, hàng hóa cần kiểm tra ngoại quan hải quan"
  },
  {
    id: "p3",
    slug: "pallet-van-ep-plywood-1200x1000",
    name: "Pallet Ván Ép Plywood 1200x1000mm Mặt Kín",
    category: "Pallet Ván Ép (Plywood)",
    categorySlug: "pallet-van-ep",
    dimensions: "1200 x 1000 x 135 mm",
    woodType: "Ván ép Plywood công nghiệp cao cấp",
    staticLoad: "1.800 kg",
    dynamicLoad: "1.000 kg",
    specification: "Mặt kín phẳng 100%, chân gù ván ép / gỗ thông",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Dòng sản phẩm xuất khẩu rất được ưa chuộng tại xưởng Trường An. Bề mặt ván ép phẳng nhẵn tuyệt đối, không có khe hở, không có dăm gỗ, bảo vệ tối đa thùng carton và hàng hóa cao cấp.",
    highlights: [
      "Không yêu cầu chứng nhận kiểm dịch hun trùng ISPM 15 gắt gao",
      "Bề mặt liền mạch, không lo hàng rách đáy hay lọt chân",
      "Trọng lượng nhẹ giúp giảm cước phí vận chuyển hàng không / đường biển",
      "Thẩm mỹ cao, độ bền ổn định trong môi trường khô"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Hàng linh kiện điện tử, dược phẩm, may mặc, container xuất khẩu đi Âu Mỹ"
  },
  {
    id: "p4",
    slug: "pallet-go-thong-1200x1000",
    name: "Pallet Gỗ Thông Xuất Khẩu 1200x1000mm (4 Hướng Nâng)",
    category: "Pallet Gỗ Thông & Tràm Mới",
    categorySlug: "pallet-go-moi",
    dimensions: "1200 x 1000 x 140 mm",
    woodType: "Gỗ Thông nhập khẩu sấy khô",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.200 kg",
    specification: "4 hướng nâng tiện lợi, nan bào nhẵn 4 mặt",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Pallet gỗ thông sáng màu, đẹp mắt và chịu lực đều. Được khử trùng nhiệt HT chuẩn ISPM 15 xuất khẩu quốc tế. Phù hợp cả xe nâng tay và xe nâng động cơ.",
    highlights: [
      "Gỗ thông sấy chống ẩm mốc dưới 18%",
      "Thẩm mỹ sáng màu, đạt chuẩn kiểm định thị trường khó tính",
      "Nan dày 18-20mm chịu lực tốt",
      "Đóng đinh soắn tạo liên kết bền chặt"
    ],
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Kho thực phẩm, bao bì, đóng hàng xuất khẩu container"
  },
  {
    id: "p5",
    slug: "pallet-go-tram-1200x1000",
    name: "Pallet Gỗ Tràm Tiêu Chuẩn 1200x1000mm (Kho Vận Nặng)",
    category: "Pallet Gỗ Thông & Tràm Mới",
    categorySlug: "pallet-go-moi",
    dimensions: "1200 x 1000 x 140 mm",
    woodType: "Gỗ Tràm tự nhiên cứng cáp",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.300 kg",
    specification: "4 hướng nâng, đố khoét dùng được cả xe nâng tay",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Mẫu pallet quốc dân tại các kho bãi nhà xưởng Việt Nam. Chất gỗ tràm dẻo dai, chịu va đập cực tốt, giá thành tiết kiệm so với các loại gỗ khác.",
    highlights: [
      "Chất gỗ tràm cứng, dẻo dai, chịu lực nặng",
      "Đố khoét rãnh sâu, xe nâng tay luồn vào cực kỳ mượt mà",
      "Khả năng chống nứt nẻ và chịu tải xếp tầng tốt",
      "Giá gốc tận xưởng mộc Hóc Môn"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Lưu kho hàng công nghiệp, logistics nội địa, gạch men, hóa chất"
  },
  {
    id: "p6",
    slug: "pallet-go-dong-theo-yeu-cau",
    name: "Gia Công Pallet Gỗ Đóng Theo Bản Vẽ & Kích Thước Riêng",
    category: "Pallet Đóng Theo Yêu Cầu",
    categorySlug: "pallet-theo-yeu-cau",
    dimensions: "Kích thước theo bản vẽ kỹ thuật",
    woodType: "Gỗ Tràm / Thông / Ván ép theo lựa chọn",
    staticLoad: "Tùy biến theo yêu cầu",
    dynamicLoad: "Tùy biến theo yêu cầu",
    specification: "Sản xuất chuẩn xác dung sai ±2mm",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Xưởng Trường An nhận đóng mọi quy cách pallet theo bản vẽ: 2 hướng nâng, 4 hướng nâng, đố bằng, đố khoét, mặt kín, mặt thưa, pallet gù... Tư vấn kết cấu chịu tải tối ưu chi phí cho doanh nghiệp.",
    highlights: [
      "Nhận đóng cả đơn hàng nhỏ lẻ lẫn đơn hàng dự án số lượng lớn",
      "Thiết kế mẫu chạy thử nghiệm thực tế trước khi chốt đơn",
      "Đội thợ mộc lành nghề tại Hóc Môn trực tiếp gia công",
      "Giao hàng nhanh bằng xe tải riêng của xưởng"
    ],
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Kê máy cơ khí đặc thù, pin năng lượng mặt trời, hàng hóa quá khổ"
  },
  {
    id: "p7",
    slug: "pallet-go-cu-1100x1100",
    name: "Pallet Gỗ Cũ 1100x1100mm Chọn Lọc (Mới 85% - 95%)",
    category: "Pallet Gỗ Cũ / Thanh Lý",
    categorySlug: "pallet-go-cu",
    dimensions: "1100 x 1100 x 120 mm",
    woodType: "Gỗ Thông / Tràm hỗn hợp tuyển chọn",
    staticLoad: "1.500 kg",
    dynamicLoad: "800 kg",
    specification: "Mặt nan đều, kết cấu chắc chắn không gãy mọt",
    isExportStandard: false,
    isNew: false,
    priceDisplay: "Liên hệ",
    description: "Pallet gỗ cũ được xưởng Trường An thu gom và chọn lọc kỹ lưỡng, đã xử lý lại đinh vít và nan gãy. Chất lượng còn 85-95% nhưng giá thành chỉ bằng 40-50% pallet mới.",
    highlights: [
      "Tiết kiệm ngân sách tối đa cho doanh nghiệp",
      "Hàng tuyển chọn chắc chắn, kiểm tra trước khi giao",
      "Luôn có sẵn số lượng lớn tại kho xưởng Hóc Môn",
      "Hỗ trợ đổi trả nếu có pallet lỗi gãy"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    usagePurpose: "Kê hàng trong kho bãi tạm, vận chuyển hàng nội địa một chiều"
  }
];

