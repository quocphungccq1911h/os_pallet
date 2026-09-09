export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "dong-thung-go-may-moc-xuat-khau-di-my-campuchia",
    title: "Quy cách đóng thùng gỗ máy móc an toàn khi xuất khẩu đi Mỹ & Campuchia",
    summary: "Kinh nghiệm thực tế từ Xưởng Pallet Trường An về kỹ thuật chằng buộc, giằng chịu lực và bọc lót bảo vệ máy móc thiết bị trong thùng gỗ kín khi vận chuyển đường biển và đường bộ.",
    category: "Thùng Gỗ Xuất Khẩu",
    publishedAt: "28/08/2026",
    readTime: "6 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. Vì Sao Cần Đóng Thùng Gỗ Chuyên Dụng Khi Xuất Khẩu Máy Móc?</h2>
      <p>Máy móc công nghiệp, tủ điện và linh kiện điện tử là những mặt hàng giá trị cao và dễ bị hư hỏng do xóc nảy hoặc ẩm ướt trong suốt hành trình vận chuyển dài ngày sang Mỹ, Campuchia hay Châu Âu. Thùng gỗ kín kết hợp đáy pallet chịu lực là giải pháp bảo vệ an toàn tuyệt đối trước va đập của cần cẩu và độ rung lắc của container.</p>
      
      <h2>2. Quy Cách Đóng Thùng Gỗ Đạt Chuẩn Tại Xưởng Trường An</h2>
      <ul>
        <li><strong>Đế pallet chịu tải nặng:</strong> Sử dụng gỗ tràm hoặc gỗ thông nan dày từ 20-25mm, đố chịu lực vững chắc cho cả xe nâng và cẩu móc cáp.</li>
        <li><strong>Khung xương giằng chéo (Bracing):</strong> Giữ cho toàn bộ khối thùng không bị vặn xoắn khi tàu biển lắc lư.</li>
        <li><strong>Vách thùng kín hoặc ván ép Plywood:</strong> Chống nước mưa, ngăn bụi bẩn và chống ẩm mốc xâm nhập.</li>
        <li><strong>Khử trùng ISPM 15:</strong> Toàn bộ vật liệu gỗ tự nhiên đều được sấy nhiệt HT đóng mộc dấu đạt chuẩn kiểm dịch hải quan quốc tế.</li>
      </ul>

      <h2>3. Dịch Vụ Đóng Thùng Gỗ Tận Nơi Của Xưởng Trường An</h2>
      <p>Chúng tôi cung cấp đội ngũ thợ mộc lành nghề đến trực tiếp nhà máy hoặc kho xưởng của khách hàng tại TP.HCM, Bình Dương, Long An để đo đạc và đóng kiện máy móc hoàn thiện trước khi đóng seal container.</p>
    `
  },
  {
    id: "b2",
    slug: "so-sanh-pallet-van-ep-plywood-va-pallet-go-tu-nhien",
    title: "So sánh Pallet ván ép Plywood và Pallet gỗ tự nhiên: Loại nào tối ưu hơn?",
    summary: "Đánh giá chi tiết ưu nhược điểm giữa pallet ván ép và pallet gỗ tràm/thông, giúp doanh nghiệp lựa chọn đúng loại pallet phù hợp cho từng thị trường xuất khẩu.",
    category: "Tư Vấn Chọn Pallet",
    publishedAt: "24/08/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. Pallet Ván Ép (Plywood Pallet) Là Gì?</h2>
      <p>Pallet ván ép được gia công từ các tấm gỗ dán công nghiệp nhiều lớp. Do đã trải qua quá trình ép nhiệt và keo kết dính ở nhiệt độ cao trong quy trình sản xuất, pallet ván ép được miễn trừ kiểm dịch thực vật ISPM 15 ở hầu hết các nước nhập khẩu.</p>

      <h2>2. Bảng So Sánh Chi Tiết</h2>
      <ul>
        <li><strong>Bề mặt:</strong> Pallet ván ép có mặt phẳng mịn liền mạch 100%, không lo thùng carton bị cấn rách; Pallet gỗ có các khe nan hở 3-5cm.</li>
        <li><strong>Trọng lượng:</strong> Pallet ván ép nhẹ hơn từ 20-30%, giúp tiết kiệm chi phí cước hàng không (Air Freight) và container đường biển.</li>
        <li><strong>Thủ tục hải quan:</strong> Pallet ván ép thông quan cực nhanh, không cần xuất trình chứng thư khử trùng gỗ tự nhiên.</li>
      </ul>

      <h2>3. Khuyến Nghị Từ Xưởng Trường An</h2>
      <p>Nếu bạn đóng hàng điện tử, may mặc, dược phẩm xuất khẩu hoặc đi hàng air, pallet ván ép là lựa chọn số 1. Ngược lại, đối với hàng hóa siêu nặng trên 2 tấn hoặc kho lưu bãi ngoài trời, pallet gỗ tràm chịu lực sẽ bền bỉ hơn.</p>
    `
  },
  {
    id: "b3",
    slug: "tieu-chuan-ispm-15-la-gi-khi-xuat-khau-pallet-go",
    title: "Tiêu chuẩn ISPM 15 là gì? Hướng dẫn khử trùng pallet gỗ xuất khẩu",
    summary: "Giải thích quy định ISPM 15 cho pallet gỗ và thùng gỗ xuất khẩu sang Châu Âu, Mỹ, Nhật Bản và quy trình đóng dấu chứng thư kiểm dịch tại Xưởng Trường An.",
    category: "Xuất Khẩu ISPM 15",
    publishedAt: "18/08/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. ISPM 15 Là Gì?</h2>
      <p>ISPM 15 (International Standards for Phytosanitary Measures No. 15) là tiêu chuẩn quốc tế bắt buộc về kiểm dịch thực vật đối với bao bì gỗ nhằm ngăn ngừa các loài côn trùng gây hại lây lan qua biên giới giữa các quốc gia.</p>

      <h2>2. Xử Lý Nhiệt HT (Heat Treatment) Tại Xưởng Trường An</h2>
      <p>Chúng tôi áp dụng phương pháp sấy nhiệt HT thân thiện môi trường: Gỗ được sấy đạt nhiệt độ tâm gỗ tối thiểu 56°C liên tục trong ít nhất 30 phút. Pallet sau khi sấy vừa tiêu diệt hoàn toàn mối mọt, vừa giảm độ ẩm xuống dưới 18% chống nấm mốc.</p>

      <h2>3. Dấu Mộc Đạt Chuẩn ISPM 15</h2>
      <p>Mỗi sản phẩm xuất xưởng đều được đóng mộc nhiệt rõ nét gồm mã số quốc gia VN, mã cơ sở xử lý và ký hiệu HT để hải quan dễ dàng đối chiếu.</p>
    `
  }
];

