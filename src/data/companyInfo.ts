export interface CompanyInfo {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  hotline: string;
  hotlineFormatted: string;
  secondaryHotline: string;
  secondaryHotlineFormatted: string;
  zalo: string;
  zaloUrl: string;
  facebook: string;
  email: string;
  address: string;
  factoryAddress: string;
  workingHours: string;
  serviceAreas: string[];
  googleMapsEmbed: string;
}

export const companyInfo: CompanyInfo = {
  name: "XƯỞNG PALLET GỖ & THÙNG GỖ TRƯỜNG AN",
  shortName: "Pallet Trường An",
  slogan: "Pallet Gỗ, Ván Ép & Thùng Gỗ Đóng Kiện Máy Móc Xuất Khẩu - Giá Tận Xưởng",
  description: "Xưởng sản xuất và phân phối trực tiếp Pallet Gỗ (thông, tràm, keo), Pallet Ván Ép Plywood, gia công Thùng Gỗ đóng hàng máy móc xuất khẩu đi Mỹ, Campuchia, EU... theo bản vẽ yêu cầu tại Hóc Môn, TP.HCM.",
  hotline: "0568888216",
  hotlineFormatted: "056.8888.216",
  secondaryHotline: "",
  secondaryHotlineFormatted: "",
  zalo: "0568888216",
  zaloUrl: "https://zalo.me/0568888216",
  facebook: "https://www.facebook.com/PalletTruongAn/",
  email: "ngockycntp@gmail.com",
  address: "94 Dương Công Khi, Bà Điểm, Hồ Chí Minh",
  factoryAddress: "94 Dương Công Khi, Bà Điểm, Hồ Chí Minh",
  workingHours: "07:30 - 18:00 (Thứ 2 - Chủ Nhật)",
  serviceAreas: [
    "Hóc Môn & Củ Chi",
    "Quận 12 & Toàn TP. Hồ Chí Minh",
    "Bình Dương (Thuận An, Dĩ An, Bến Cát, Tân Uyên)",
    "Long An (Đức Hòa, Bến Lức, Cần Giuộc)",
    "Đồng Nai (Biên Hòa, Nhơn Trạch, Long Thành)",
    "Tây Ninh & Cụm Cảng Biển Đóng Container"
  ],
  googleMapsEmbed: "https://www.google.com/maps?q=10.8441373,106.5654092+(X%C6%B0%E1%BB%9Fng+g%E1%BB%97+-+Pallet+Tr%C6%B0%E1%BB%9Dng+An)&z=17&output=embed"
};

