export interface CompanyInfo {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  hotline: string;
  hotlineFormatted: string;
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
  name: "CÔNG TY TNHH PALLET GỖ VIỆT",
  shortName: "Pallet Gỗ Việt",
  slogan: "Giải Pháp Pallet Gỗ Chuyên Nghiệp - Uy Tín - Giá Tận Xưởng",
  description: "Chuyên sản xuất, phân phối và gia công pallet gỗ tràm, keo, gỗ cũ/mới, pallet xuất khẩu đạt tiêu chuẩn ISPM 15 theo kích thước yêu cầu cho doanh nghiệp và nhà xưởng trên toàn quốc.",
  hotline: "0988123456",
  hotlineFormatted: "0988.123.456",
  zalo: "0988123456",
  zaloUrl: "https://zalo.me/0988123456",
  facebook: "https://facebook.com/palletgoviet.vn",
  email: "baogiatot@palletgoviet.vn",
  address: "Đường Số 4, KCN Sóng Thần 1, TP. Dĩ An, Bình Dương",
  factoryAddress: "Xưởng sản xuất: Ấp Tân Lập, Xã Cây Gáo, Huyện Trảng Bom, Đồng Nai",
  workingHours: "07:30 - 18:00 (Thứ 2 - Thứ 7)",
  serviceAreas: [
    "TP. Hồ Chí Minh",
    "Bình Dương",
    "Đồng Nai",
    "Long An",
    "Bà Rịa - Vũng Tàu",
    "Tây Ninh",
    "Các KCN trên toàn quốc"
  ],
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4206639906!2d106.7583!3d10.8552!2m3!1f0!0!f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDUxJzE4LjciTiAxMDbCsDQ1JzI5LjkiRQ!5e0!3m2!1svi!2s!4v1620000000000!5m2!1svi!2s"
};
