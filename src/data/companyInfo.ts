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
  hotline: "0961833801",
  hotlineFormatted: "0961.833.801",
  secondaryHotline: "0568888216",
  secondaryHotlineFormatted: "056.8888.216",
  zalo: "0961833801",
  zaloUrl: "https://zalo.me/0961833801",
  facebook: "https://www.facebook.com/PalletTruongAn/",
  email: "ngockycntp@gmail.com",
  address: "361/75 Huỳnh Thị Na, Xã Đông Thạnh, Huyện Hóc Môn, TP. Hồ Chí Minh",
  factoryAddress: "361/75 Huỳnh Thị Na, Xã Đông Thạnh, Huyện Hóc Môn, TP. Hồ Chí Minh",
  workingHours: "07:30 - 18:00 (Thứ 2 - Chủ Nhật)",
  serviceAreas: [
    "Hóc Môn & Củ Chi",
    "Quận 12 & TP. Hồ Chí Minh",
    "Bình Dương (Thuận An, Dĩ An, Bến Cát)",
    "Long An (Đức Hòa, Bến Lức)",
    "Đồng Nai & Tây Ninh",
    "Hàng xuất khẩu đi Campuchia, Mỹ, Châu Âu"
  ],
  googleMapsEmbed: "https://www.google.com/maps?q=361/75+Hu%E1%BB%B3nh+Th%E1%BB%8B+Na,+%C4%90%C3%B4ng+Th%E1%BA%A1nh,+H%C3%B3c+M%C3%B4n,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh&output=embed"
};

