export type OrderStatus = 'cho_duyet' | 'dong_mau' | 'dang_san_xuat' | 'da_giao' | 'tam_dung';

export interface ProductionOrder {
  id: string;
  orderCode: string; // Mã đơn: TA-2609-01
  customer: string; // Tên khách hàng / Doanh nghiệp
  phone: string;
  productName: string;
  dimensions: string;
  quantity: number;
  woodType: string;
  isExportISPM: boolean;
  deadline: string; // Ngày hẹn giao hàng
  totalAmount: string; // Giá trị dự kiến
  status: OrderStatus;
  progressPercent: number; // 0 - 100%
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const initialOrders: ProductionOrder[] = [
  {
    id: 'ord-001',
    orderCode: 'TA-2609-01',
    customer: 'Công Ty CP Chế Tạo Cơ Khí & Máy May Xuất Khẩu',
    phone: '0945 888 111',
    productName: 'Pallet Chuyên Dụng Đóng Máy Xuất Khẩu (Đơn Gấp)',
    dimensions: '1400 x 1100 x 150 mm',
    quantity: 120,
    woodType: 'Gỗ Tràm xẻ sấy tuyển chọn',
    isExportISPM: true,
    deadline: '2026-09-14',
    totalAmount: '28.800.000 đ',
    status: 'dang_san_xuat',
    progressPercent: 65,
    notes: 'Khách cần gấp để kịp lịch kéo cont ra cảng Cát Lái ngày 15/09. Đã hun trùng HT.',
    createdAt: '2026-09-08T09:00:00.000Z',
    updatedAt: '2026-09-10T10:00:00.000Z',
  },
  {
    id: 'ord-002',
    orderCode: 'TA-2609-02',
    customer: 'Tập Đoàn May Mặc Việt Thắng KCN Tân Bình',
    phone: '0908 333 777',
    productName: 'Pallet Gỗ Thông Mới Đố Khuyết 4 Hướng Nâng',
    dimensions: '1200 x 1000 x 120 mm',
    quantity: 500,
    woodType: 'Gỗ Thông nhập khẩu mới 100%',
    isExportISPM: true,
    deadline: '2026-09-18',
    totalAmount: '72.500.000 đ',
    status: 'dong_mau',
    progressPercent: 20,
    notes: 'Đã trình 2 mẫu thử tải thành công, xưởng đang chuẩn bị phôi gỗ sản xuất hàng loạt.',
    createdAt: '2026-09-09T08:00:00.000Z',
    updatedAt: '2026-09-10T11:00:00.000Z',
  },
  {
    id: 'ord-003',
    orderCode: 'TA-2609-03',
    customer: 'Công Ty Logistics Quốc Tế Sóng Thần',
    phone: '0918 222 444',
    productName: 'Pallet Đố Ván Ép Plywood Mặt Phẳng Kín',
    dimensions: '1000 x 1200 x 140 mm',
    quantity: 350,
    woodType: 'Ván Ép Plywood + Chân gù gỗ keo',
    isExportISPM: false,
    deadline: '2026-09-11',
    totalAmount: '43.750.000 đ',
    status: 'da_giao',
    progressPercent: 100,
    notes: 'Đã bàn giao xe tải 3 đợt tận kho Sóng Thần, khách đã ký biên bản bàn giao đầy đủ.',
    createdAt: '2026-09-05T07:30:00.000Z',
    updatedAt: '2026-09-08T16:00:00.000Z',
  }
];
