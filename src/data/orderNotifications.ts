export interface OrderNotificationItem {
  id: string;
  initials: string;
  customerLabel: string;
  location: string;
  actionText: string;
  productLabel: string;
  timeAgo: string;
  href: string;
}

export const defaultOrderNotifications: OrderNotificationItem[] = [
  {
    id: 'notif-1',
    initials: 'TP',
    customerLabel: 'Nhà máy thực phẩm...',
    location: 'KCN Tân Bình',
    actionText: 'Vừa đặt mua',
    productLabel: '300 Pallet Gỗ Thông Xuất Khẩu Mỹ GMA',
    timeAgo: '8 phút trước',
    href: '/san-pham/pallet-go-thong-moi-xuat-khau-my-1219x1016',
  },
  {
    id: 'notif-2',
    initials: 'CK',
    customerLabel: 'Công ty Cơ khí...',
    location: 'Hóc Môn, TP.HCM',
    actionText: 'Vừa đặt đóng',
    productLabel: '18 Thùng Gỗ Bọc Lót Máy Móc ISPM 15',
    timeAgo: '15 phút trước',
    href: '/san-pham/thung-go-kien-go-dong-hang-xuat-khau',
  },
  {
    id: 'notif-3',
    initials: 'LV',
    customerLabel: 'Kho vận Sóng Thần...',
    location: 'Bình Dương',
    actionText: 'Vừa đặt mua',
    productLabel: '500 Pallet Đố Ván Ép đi Campuchia',
    timeAgo: '24 phút trước',
    href: '/san-pham/pallet-do-van-ep-xuat-khau-campuchia-1000x1200',
  },
  {
    id: 'notif-4',
    initials: 'XK',
    customerLabel: 'Doanh nghiệp XNK...',
    location: 'Cảng Cát Lái',
    actionText: 'Vừa đặt mua',
    productLabel: '200 Pallet Gỗ Thông Đố Khuyết ISPM 15',
    timeAgo: '32 phút trước',
    href: '/san-pham/pallet-go-thong-do-khuyet-xuat-khau-ispm15-1200x1000',
  },
  {
    id: 'notif-5',
    initials: 'ĐT',
    customerLabel: 'Xưởng linh kiện...',
    location: 'Đức Hòa, Long An',
    actionText: 'Vừa đặt mua',
    productLabel: '150 Pallet Gỗ Chân Gù 4 Hướng Nâng',
    timeAgo: '45 phút trước',
    href: '/san-pham/pallet-go-chan-gu-chuan-4-huong-nang-1219x1016',
  },
  {
    id: 'notif-6',
    initials: 'MM',
    customerLabel: 'Công ty May mặc...',
    location: 'KCN Vĩnh Lộc',
    actionText: 'Vừa đặt mua',
    productLabel: '120 Pallet Gỗ Kích Thước Lớn 1400x1100',
    timeAgo: '52 phút trước',
    href: '/san-pham/pallet-go-xuat-khau-kich-thuoc-lon-1400x1100',
  },
  {
    id: 'notif-7',
    initials: 'CN',
    customerLabel: 'Nhà máy Nhựa & Bao bì...',
    location: 'Biên Hòa, Đồng Nai',
    actionText: 'Vừa đặt mua',
    productLabel: '80 Thùng Nhựa Công Nghiệp Xếp Kho',
    timeAgo: '1 giờ trước',
    href: '/san-pham?category=thung-nhua',
  },
  {
    id: 'notif-8',
    initials: 'LG',
    customerLabel: 'Đối tác Logistics...',
    location: 'KCN Tân Tạo',
    actionText: 'Vừa yêu cầu gia công',
    productLabel: '250 Pallet Gỗ Đóng Theo Bản Vẽ Riêng',
    timeAgo: '1 giờ trước',
    href: '/san-pham/pallet-go-dong-theo-yeu-cau',
  },
];
