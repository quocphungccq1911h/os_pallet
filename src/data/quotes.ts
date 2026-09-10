export type QuoteStatus = 'moi' | 'da_goi' | 'da_bao_gia' | 'thanh_cong' | 'da_huy';

export interface CustomerQuote {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productTitle: string;
  dimensions?: string;
  quantity: string;
  note?: string;
  status: QuoteStatus;
  estimatedPrice?: string;
  createdAt: string;
  updatedAt: string;
}

export const initialQuotes: CustomerQuote[] = [
  {
    id: 'quote-001',
    customerName: 'Anh Tuấn - Logistics Tân Bình',
    phone: '0903 123 456',
    email: 'tuan.logistics@gmail.com',
    productTitle: 'Pallet Gỗ Thông Mới 100% Xuất Khẩu Mỹ (1219 x 1016 x 140 mm)',
    dimensions: '1219 x 1016 x 140 mm',
    quantity: '300 cái',
    note: 'Cần giao gấp trong tuần sau đóng container hàng may mặc, cần giấy chứng thư hun trùng ISPM 15.',
    status: 'moi',
    estimatedPrice: '145.000 đ',
    createdAt: '2026-09-10T08:30:00.000Z',
    updatedAt: '2026-09-10T08:30:00.000Z',
  },
  {
    id: 'quote-002',
    customerName: 'Chị Mai - Công Ty Cơ Khí Chính Xác Hóc Môn',
    phone: '0988 654 321',
    productTitle: 'Pallet Đóng Theo Yêu Cầu Chịu Tải Nặng',
    dimensions: '1400 x 1100 x 150 mm',
    quantity: '50 cái',
    note: 'Kê máy dập khuôn tải trọng tĩnh 3 tấn, cần đố đặc chịu lực cao.',
    status: 'da_goi',
    estimatedPrice: '210.000 đ',
    createdAt: '2026-09-09T14:15:00.000Z',
    updatedAt: '2026-09-09T15:00:00.000Z',
  },
  {
    id: 'quote-003',
    customerName: 'Anh Hùng - Kho Vận Sóng Thần Bình Dương',
    phone: '0912 789 999',
    productTitle: 'Pallet Đố Ván Ép Plywood (1000 x 1200 x 140 mm)',
    dimensions: '1000 x 1200 x 140 mm',
    quantity: '500 cái',
    note: 'Xuất hàng sang Campuchia, lấy hàng định kỳ mỗi tháng.',
    status: 'da_bao_gia',
    estimatedPrice: '125.000 đ',
    createdAt: '2026-09-08T10:00:00.000Z',
    updatedAt: '2026-09-08T16:20:00.000Z',
  }
];
