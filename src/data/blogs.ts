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
    slug: "pallet-go-la-gi-cach-chon-pallet-cho-kho-hang",
    title: "Pallet gỗ là gì? Hướng dẫn chọn loại pallet gỗ phù hợp nhất cho kho hàng",
    summary: "Tìm hiểu chi tiết về khái niệm pallet gỗ, phân loại gỗ tràm, keo, thông và các tiêu chí lựa chọn pallet giúp tối ưu chi phí cho kho vận doanh nghiệp.",
    category: "Kiến thức Pallet",
    publishedAt: "25/08/2026",
    readTime: "5 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. Pallet Gỗ Là Gì?</h2>
      <p>Pallet gỗ là các tấm kệ bằng gỗ có cấu trúc phẳng dùng để cố định hàng hóa khi nâng nâng lên bởi xe nâng tay, xe nâng động cơ hoặc các thiết bị nâng hạ khác. Pallet giúp hàng hóa không bị tiếp xúc trực tiếp với mặt đất ẩm ướt và dễ dàng di chuyển hàng loạt.</p>
      
      <h2>2. Các Loại Pallet Gỗ Phổ Biến Hiện Nay</h2>
      <ul>
        <li><strong>Pallet gỗ tràm:</strong> Cực kỳ phổ biến tại Miền Nam và Miền Trung nhờ độ bền cao, giá thành hợp lý, khả năng chịu lực tốt.</li>
        <li><strong>Pallet gỗ keo:</strong> Nhẹ, thoát nước tốt, nan phẳng nhẵn, thích hợp kho hàng sạch và xuất khẩu.</li>
        <li><strong>Pallet gỗ cũ/thanh lý:</strong> Giúp doanh nghiệp tiết kiệm 40-50% chi phí cho các đơn hàng vận chuyển 1 chiều.</li>
      </ul>

      <h2>3. Tiêu Chí Chọn Pallet Cho Doanh Nghiệp</h2>
      <p>Khi đặt mua pallet gỗ, bạn cần chú ý 3 thông số vàng: Kích thước lòng xe container/xe tải, Tải trọng tĩnh/động cần thiết, và loại xe nâng đang sử dụng (xe nâng tay hay xe nâng động cơ).</p>
    `
  },
  {
    id: "b2",
    slug: "tieu-chuan-ispm-15-la-gi-khi-xuat-khau-pallet-go",
    title: "Tiêu chuẩn ISPM 15 là gì? Quy trình khử trùng pallet gỗ xuất khẩu",
    summary: "Giải thích quy định ISPM 15 cho pallet gỗ xuất khẩu sang Châu Âu, Mỹ, Nhật Bản và quy trình sấy nhiệt HT (Heat Treatment) để cấp chứng thư.",
    category: "Xuất Khẩu Pallet",
    publishedAt: "20/08/2026",
    readTime: "6 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. ISPM 15 Là Gi tắc Gì?</h2>
      <p>ISPM 15 (International Standards for Phytosanitary Measures No. 15) là Công ước Bảo vệ Thực vật Quốc tế quy định về việc xử lý vật liệu bao bì bằng gỗ nhằm ngăn chặn sự lây lan của sinh vật hại giữa các quốc gia.</p>

      <h2>2. Phương Pháp Xử Lý Đạt Chuẩn ISPM 15</h2>
      <p>Có 2 phương pháp xử lý chính:</p>
      <ul>
        <li><strong>Sấy nhiệt HT (Heat Treatment):</strong> Gỗ được sấy đạt nhiệt độ lõi tối thiểu 56°C trong 30 phút. Đây là phương pháp an toàn và thân thiện môi trường nhất được khuyên dùng.</li>
        <li><strong>Khử trùng MB (Methyl Bromide):</strong> Phun khí khử trùng sâu bệnh.</li>
      </ul>

      <h2>3. Dấu Dấu Chứng Nhận ISPM 15 Nổi Bật</h2>
      <p>Mỗi pallet đạt chuẩn sau khi xử lý sẽ được đóng dấu mốc gồm mã quốc gia (VN), mã nhà sản xuất và ký hiệu HT/MB.</p>
    `
  },
  {
    id: "b3",
    slug: "huong-dan-bao-quan-pallet-go-khong-bi-moci-mot",
    title: "Cách bảo quản pallet gỗ không bị ẩm mốc và duy trì độ bền trên 3 năm",
    summary: "Bật mí các mẹo bảo quản pallet gỗ trong kho bãi ngoài trời và trong kho lạnh giúp kéo dài tuổi thọ pallet gấp 2 lần.",
    category: "Bảo Quản & Kho Bãi",
    publishedAt: "15/08/2026",
    readTime: "4 phút đọc",
    imageUrl: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>1. Tránh Để Pallet Tiếp Xúc Trực Tiếp Với Đất Đầm Lầy</h2>
      <p>Nên kê pallet gỗ chân đế cao hoặc sử dụng bạt lót kho bãi để tránh hơi ẩm từ lòng đất ngấm vào gỗ gây mục mọt.</p>

      <h2>2. Xếp Pallet Đúng Quy Cách Khi Không Sử Dụng</h2>
      <p>Xếp chồng các pallet vuông vắn, không xếp quá cao quá 2.5m để đảm bảo an toàn lao động và tránh nghiêng đổ.</p>
    `
  }
];
