export interface PriceItem {
  id: string;
  productName: string;
  material: string;
  dimension: string;
  staticLoad: string;
  dynamicLoad: string;
  priceDisplay: string;
  note: string;
}

export const pricingList: PriceItem[] = [
  {
    id: "pr1",
    productName: "Thùng Gỗ Kín Đóng Kiện Máy Móc",
    material: "Gỗ Thông / Tràm + Ván Ép Chịu Lực",
    dimension: "Gia công theo kích thước máy",
    staticLoad: "3.000 - 5.000 kg",
    dynamicLoad: "1.500 - 2.500 kg",
    priceDisplay: "Liên hệ",
    note: "Xuất khẩu đi Mỹ, Campuchia, EU"
  },
  {
    id: "pr2",
    productName: "Thùng Kiện Gỗ Nan Thưa",
    material: "Gỗ Thông / Tràm Sấy Khô",
    dimension: "Theo bản vẽ thiết kế",
    staticLoad: "2.000 - 3.500 kg",
    dynamicLoad: "1.000 - 1.800 kg",
    priceDisplay: "Liên hệ",
    note: "Tiết kiệm chi phí, chắc chắn"
  },
  {
    id: "pr3",
    productName: "Pallet Ván Ép Plywood Mặt Kín",
    material: "Ván Ép Plywood Siêu Nhẹ",
    dimension: "1200 x 1000 x 135 mm",
    staticLoad: "1.800 kg",
    dynamicLoad: "1.000 kg",
    priceDisplay: "Liên hệ",
    note: "Không cần hun trùng khắt khe"
  },
  {
    id: "pr4",
    productName: "Pallet Gỗ Thông Xuất Khẩu",
    material: "Gỗ Thông Sấy Đạt Ẩm < 18%",
    dimension: "1200 x 1000 x 140 mm",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.200 kg",
    priceDisplay: "Liên hệ",
    note: "Xử lý nhiệt HT chuẩn ISPM 15"
  },
  {
    id: "pr5",
    productName: "Pallet Gỗ Tràm 4 Hướng Nâng",
    material: "Gỗ Tràm Tự Nhiên Cứng Cáp",
    dimension: "1200 x 1000 x 140 mm",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.300 kg",
    priceDisplay: "Liên hệ",
    note: "Đố khoét dùng cho xe nâng tay & máy"
  },
  {
    id: "pr6",
    productName: "Pallet Gỗ Cũ Chọn Lọc (Mới 90%)",
    material: "Gỗ Hỗn Hợp / Thông Nhập",
    dimension: "1100 x 1100 x 120 mm",
    staticLoad: "1.500 kg",
    dynamicLoad: "800 kg",
    priceDisplay: "Liên hệ",
    note: "Giá tốt tiết kiệm 50% chi phí"
  },
  {
    id: "pr7",
    productName: "Pallet Đóng Theo Bản Vẽ Yêu Cầu",
    material: "Tràm / Thông / Ván Ép",
    dimension: "Gia công theo thông số riêng",
    staticLoad: "Theo yêu cầu",
    dynamicLoad: "Theo yêu cầu",
    priceDisplay: "Liên hệ",
    note: "Lên mẫu chạy thử nhanh chóng"
  }
];

