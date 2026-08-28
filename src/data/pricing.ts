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
    productName: "Pallet Gỗ Tràm Tiêu Chuẩn",
    material: "Gỗ Tràm Sấy Khô",
    dimension: "1000 x 1000 x 130 mm",
    staticLoad: "1.500 kg",
    dynamicLoad: "1.000 kg",
    priceDisplay: "Liên hệ",
    note: "Khử trùng ISPM 15 khi xuất khẩu"
  },
  {
    id: "pr2",
    productName: "Pallet Gỗ Tràm 4 Hướng Nâng",
    material: "Gỗ Tràm Sấy Khô",
    dimension: "1200 x 1000 x 140 mm",
    staticLoad: "2.000 kg",
    dynamicLoad: "1.200 kg",
    priceDisplay: "Liên hệ",
    note: "Dùng cho xe nâng tay & máy"
  },
  {
    id: "pr3",
    productName: "Pallet Gỗ Keo Euro Standard",
    material: "Gỗ Keo Nhẵn mịn",
    dimension: "1200 x 800 x 144 mm",
    staticLoad: "2.500 kg",
    dynamicLoad: "1.000 kg",
    priceDisplay: "Liên hệ",
    note: "Đạt chuẩn xuất khẩu Châu Âu"
  },
  {
    id: "pr4",
    productName: "Pallet Gỗ Cũ Chọn Lọc (Mới 90%)",
    material: "Gỗ Hỗn Hợp / Thông",
    dimension: "1100 x 1100 x 120 mm",
    staticLoad: "1.500 kg",
    dynamicLoad: "800 kg",
    priceDisplay: "Liên hệ",
    note: "Giá tốt tiết kiệm chi phí"
  },
  {
    id: "pr5",
    productName: "Pallet Gỗ Tải Trọng Nặng",
    material: "Gỗ Tràm Nan Dày",
    dimension: "1200 x 1200 x 150 mm",
    staticLoad: "3.500 kg",
    dynamicLoad: "2.000 kg",
    priceDisplay: "Liên hệ",
    note: "Kê máy móc, hóa chất nặng"
  },
  {
    id: "pr6",
    productName: "Pallet Đóng Theo Yêu Cầu",
    material: "Tràm / Keo / Thông",
    dimension: "Theo bản vẽ",
    staticLoad: "Theo yêu cầu",
    dynamicLoad: "Theo yêu cầu",
    priceDisplay: "Liên hệ",
    note: "Thiết kế mẫu chạy thử"
  }
];
