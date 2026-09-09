export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  dimensions: string; // e.g., "1200 x 1000 x 140 mm"
  woodType: string; // e.g., "Gỗ Thông nhập khẩu", "Gỗ Tràm tự nhiên", "Ván ép Plywood"
  materialGroup: 'go-thong' | 'go-tram' | 'van-ep' | 'go-cu'; // Phân loại chất liệu nhanh
  targetMarket: 'xuat-khau-my' | 'xuat-khau-campuchia' | 'xuat-khau-ispm15' | 'noi-dia'; // Thị trường chính
  staticLoad: string; // Tải trọng tĩnh
  dynamicLoad: string; // Tải trọng động
  specification: string; // Quy cách nâng và nan đố
  isExportStandard: boolean; // Tiêu chuẩn ISPM 15
  isNew: boolean;
  priceDisplay: string; // "Liên hệ"
  description: string;
  highlights: string[];
  imageUrl: string;
  gallery?: string[];
  usagePurpose: string;
  badges: string[]; // Badge nổi bật trên card sản phẩm
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
    name: "Thùng Gỗ Kín Đóng Kiện Máy Móc Xuất Khẩu Đi Mỹ",
    category: "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    categorySlug: "thung-go-dong-hang",
    dimensions: "Gia công theo kích thước máy móc",
    woodType: "Gỗ Thông / Gỗ Tràm + Ván ép chịu lực",
    materialGroup: "go-thong",
    targetMarket: "xuat-khau-my",
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
    gallery: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Đóng gói máy móc thiết bị cơ khí, tủ điện công nghiệp, hàng điện tử xuất khẩu",
    badges: ["🇺🇸 Xuất Khẩu Mỹ", "Bảo Vệ Máy Móc", "Sấy HT ISPM 15"],
    facebookProof: {
      title: "Đơn hàng đóng kiện máy móc xuất sang Mỹ",
      description: "Hoàn thiện đóng 12 kiện máy móc công nghiệp tại xưởng Hóc Môn đạt chuẩn hun trùng xuất khẩu container đường biển.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p2",
    slug: "thung-go-thua-dong-hang",
    name: "Thùng Kiện Gỗ Nan Thưa Chở Hàng Đi Campuchia",
    category: "Thùng Gỗ / Kiện Gỗ Đóng Hàng",
    categorySlug: "thung-go-dong-hang",
    dimensions: "Theo yêu cầu từng kiện hàng",
    woodType: "Gỗ Thông / Tràm tự nhiên xẻ sấy",
    materialGroup: "go-tram",
    targetMarket: "xuat-khau-campuchia",
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
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Đóng kiện phụ tùng, phôi kim loại, hàng hóa cần kiểm tra ngoại quan hải quan",
    badges: ["🇰🇭 Đi Campuchia", "Nan Thưa Thoáng Khí", "Tiết Kiệm Chi Phí"],
    facebookProof: {
      title: "Lô hàng kiện gỗ nan thưa giao cửa khẩu Mộc Bài",
      description: "Gia công và giao nhanh trong 24h phục vụ xe tải chuyển hàng đi Phnôm Pênh - Campuchia.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p3",
    slug: "pallet-van-ep-plywood-1200x1000",
    name: "Pallet Ván Ép Plywood 1200x1000mm Mặt Phẳng Kín",
    category: "Pallet Ván Ép (Plywood)",
    categorySlug: "pallet-van-ep",
    dimensions: "1200 x 1000 x 135 mm",
    woodType: "Ván ép Plywood công nghiệp cao cấp",
    materialGroup: "van-ep",
    targetMarket: "xuat-khau-ispm15",
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
    gallery: [
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Hàng linh kiện điện tử, dược phẩm, may mặc, container xuất khẩu đi Âu Mỹ",
    badges: ["Mặt Kín 100%", "Miễn Trừ Hun Trùng", "Siêu Nhẹ"],
    facebookProof: {
      title: "Xuất xưởng 300 pallet ván ép cho công ty may mặc",
      description: "Bàn giao lô pallet plywood mặt phẳng nhẵn cho đối tác đóng container hàng xuất khẩu.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p4",
    slug: "pallet-go-thong-1200x1000",
    name: "Pallet Gỗ Thông Xuất Khẩu 1200x1000mm (Chuẩn Thị Trường Mỹ)",
    category: "Pallet Gỗ Thông & Tràm Mới",
    categorySlug: "pallet-go-moi",
    dimensions: "1200 x 1000 x 140 mm",
    woodType: "Gỗ Thông nhập khẩu sấy khô",
    materialGroup: "go-thong",
    targetMarket: "xuat-khau-my",
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
    gallery: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Kho thực phẩm, bao bì, đóng hàng xuất khẩu container",
    badges: ["🇺🇸 Chuẩn Thị Trường Mỹ", "Gỗ Thông Sấy Khô", "4 Hướng Nâng"],
    facebookProof: {
      title: "Lô 600 pallet gỗ thông khử trùng HT xuất khẩu",
      description: "Kiểm tra đóng dấu ISPM 15 trực tiếp tại xưởng Hóc Môn trước khi bốc xếp lên xe container.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p5",
    slug: "pallet-go-tram-1200x1000",
    name: "Pallet Gỗ Tràm Chịu Tải 1200x1000mm (Xuất Container Campuchia)",
    category: "Pallet Gỗ Thông & Tràm Mới",
    categorySlug: "pallet-go-moi",
    dimensions: "1200 x 1000 x 140 mm",
    woodType: "Gỗ Tràm tự nhiên cứng cáp",
    materialGroup: "go-tram",
    targetMarket: "xuat-khau-campuchia",
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
    gallery: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Lưu kho hàng công nghiệp, logistics nội địa, gạch men, hóa chất",
    badges: ["🇰🇭 Đi Campuchia", "Chịu Lực 2.5 Tấn", "Đố Khoét Xe Nâng Tay"],
    facebookProof: {
      title: "Giao 400 pallet gỗ tràm cho nhà máy bao bì",
      description: "Giao hàng trực tiếp bằng xe tải của xưởng đến kho khách hàng tại KCN Tân Bình & Vĩnh Lộc.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p6",
    slug: "pallet-go-tram-euro-1200x800",
    name: "Pallet Gỗ Tiêu Chuẩn Châu Âu 1200x800mm (Chuẩn EPAL)",
    category: "Pallet Xuất Khẩu (ISPM 15)",
    categorySlug: "pallet-xuat-khau",
    dimensions: "1200 x 800 x 144 mm",
    woodType: "Gỗ Thông / Tràm sấy độ ẩm < 18%",
    materialGroup: "go-thong",
    targetMarket: "xuat-khau-ispm15",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.200 kg",
    specification: "Kích thước tiêu chuẩn Châu Âu Euro Pallet",
    isExportStandard: true,
    isNew: true,
    priceDisplay: "Liên hệ",
    description: "Thiết kế chuẩn kích thước Châu Âu 1200x800mm, tối ưu diện tích lòng container và hệ thống kệ selective racking tiêu chuẩn quốc tế.",
    highlights: [
      "Kích thước Euro chuẩn xác, không bị dư lòng container",
      "Nan vuông vắn, bào mịn 4 mặt",
      "Cấp mộc chứng thư kiểm dịch ISPM 15",
      "Chịu lực cao, tái sử dụng nhiều lần"
    ],
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Đóng hàng container xuất khẩu Châu Âu, Mỹ, Nhật Bản",
    badges: ["🇪🇺 Chuẩn Euro EPAL", "Tối Ưu Container", "Sấy Khô ISPM 15"],
    facebookProof: {
      title: "Lô pallet kích thước 1200x800 xuất khẩu",
      description: "Được khách hàng châu Âu nghiệm thu đạt chuẩn chất lượng và độ ẩm tại kho xưởng Trường An.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p7",
    slug: "pallet-go-dong-theo-yeu-cau",
    name: "Gia Công Pallet Gỗ Đóng Theo Bản Vẽ & Kích Thước Riêng",
    category: "Pallet Đóng Theo Yêu Cầu",
    categorySlug: "pallet-theo-yeu-cau",
    dimensions: "Kích thước theo bản vẽ kỹ thuật",
    woodType: "Gỗ Tràm / Thông / Ván ép theo lựa chọn",
    materialGroup: "go-thong",
    targetMarket: "noi-dia",
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
    gallery: [
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Kê máy cơ khí đặc thù, pin năng lượng mặt trời, hàng hóa quá khổ",
    badges: ["Theo Bản Vẽ Riêng", "Lên Mẫu 24 Giờ", "Chuẩn Dung Sai"],
    facebookProof: {
      title: "Gia công pallet phi tiêu chuẩn cho nhà xưởng",
      description: "Thiết kế đố chịu lực và chiều rộng nan chuyên biệt cho dòng máy ép nhựa công nghiệp.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  },
  {
    id: "p8",
    slug: "pallet-go-cu-1100x1100",
    name: "Pallet Gỗ Cũ 1100x1100mm Chọn Lọc (Mới 85% - 95%)",
    category: "Pallet Gỗ Cũ / Thanh Lý",
    categorySlug: "pallet-go-cu",
    dimensions: "1100 x 1100 x 120 mm",
    woodType: "Gỗ Thông / Tràm hỗn hợp tuyển chọn",
    materialGroup: "go-cu",
    targetMarket: "noi-dia",
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
    gallery: [
      "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      "/images/banner_main.png",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800"
    ],
    usagePurpose: "Kê hàng trong kho bãi tạm, vận chuyển hàng nội địa một chiều",
    badges: ["Tiết Kiệm 50%", "Mới 85% - 95%", "Sẵn Kho Giao Ngay"],
    facebookProof: {
      title: "Giao 300 pallet cũ thanh lý cho kho hàng Long An",
      description: "Pallet đã kiểm định bắn đinh lại cứng cáp, bàn giao tận nơi cho đối tác lưu kho hạt nhựa.",
      fbUrl: "https://www.facebook.com/PalletTruongAn/"
    }
  }
];


