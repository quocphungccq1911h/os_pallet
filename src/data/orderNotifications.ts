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
    href: '/san-pham/pallet-go-thong-moi-xuat-khau-ispm15-1200x1000x120',
  },
  {
    id: 'notif-2',
    initials: 'CK',
    customerLabel: 'Công ty Cơ khí...',
    location: 'Hóc Môn, TP.HCM',
    actionText: 'Vừa đặt đóng',
    productLabel: '18 Thùng Gỗ Bọc Lót Máy Móc ISPM 15',
    timeAgo: '15 phút trước',
    href: '/san-pham/thung-go-kin-van-ep-dong-may-moc-lap-rap-tan-noi',
  },
  {
    id: 'notif-3',
    initials: 'LV',
    customerLabel: 'Kho vận Sóng Thần...',
    location: 'Bình Dương',
    actionText: 'Vừa đặt mua',
    productLabel: '500 Pallet Ván Ép Mặt Kín 9 Gù',
    timeAgo: '24 phút trước',
    href: '/san-pham/pallet-van-ep-mat-kin-9-gu-1200x1000x120',
  },
  {
    id: 'notif-4',
    initials: 'XK',
    customerLabel: 'Doanh nghiệp XNK...',
    location: 'Cảng Cát Lái',
    actionText: 'Vừa đặt mua',
    productLabel: '200 Pallet Gỗ Tràm Xuất Khẩu PTA-T02',
    timeAgo: '32 phút trước',
    href: '/san-pham/pallet-go-tram-do-bang-xuat-khau-pta-t02',
  },
  {
    id: 'notif-5',
    initials: 'ĐT',
    customerLabel: 'Xưởng linh kiện...',
    location: 'Đức Hòa, Long An',
    actionText: 'Vừa đặt mua',
    productLabel: '150 Pallet Gỗ Tràm Chân Gù PTA-G03',
    timeAgo: '45 phút trước',
    href: '/san-pham/pallet-go-tram-chan-gu-9-cuc-4-huong-nang-pta-g03',
  },
  {
    id: 'notif-6',
    initials: 'MM',
    customerLabel: 'Kho lạnh Thủy sản...',
    location: 'KCN Vĩnh Lộc',
    actionText: 'Vừa đặt mua',
    productLabel: '120 Pallet Nhựa Mới HDPE 1200×1000',
    timeAgo: '52 phút trước',
    href: '/san-pham/pallet-nhua-moi-mat-luoi-lien-khoi-hdpe-1200x1000x150',
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
    href: '/san-pham/gia-cong-pallet-go-1-mat-2-mat-theo-ban-ve-1300x1100',
  },
];
