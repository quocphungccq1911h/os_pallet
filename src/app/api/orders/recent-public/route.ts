import { NextResponse } from 'next/server';
import { getAllOrders } from '@/lib/orders-store';
import type { OrderNotificationItem } from '@/data/orderNotifications';

export const dynamic = 'force-dynamic';

const KNOWN_LOCATIONS = [
  'Hóc Môn',
  'Tân Bình',
  'Bình Dương',
  'Sóng Thần',
  'Long An',
  'Đức Hòa',
  'Bến Lức',
  'Đồng Nai',
  'Biên Hòa',
  'Cát Lái',
  'Vĩnh Lộc',
  'Tân Tạo',
  'Thủ Đức',
  'Củ Chi',
  'TP.HCM',
];

const ACTION_PRESETS = [
  'Vừa đặt mua',
  'Vừa chốt đơn',
  'Vừa đặt đóng',
  'Vừa đặt gia công',
  'Vừa xác nhận đơn',
];

const TIME_PRESETS = [
  '6 phút trước',
  '12 phút trước',
  '19 phút trước',
  '27 phút trước',
  '34 phút trước',
  '42 phút trước',
  '51 phút trước',
  '1 giờ trước',
  '1 giờ trước',
  '2 giờ trước',
  '2 giờ trước',
  '3 giờ trước',
  '3 giờ trước',
];

function extractInitials(name: string): string {
  const cleaned = name
    .replace(/^(Công ty|Cty|Xưởng|Nhà máy|Kho|Doanh nghiệp|Tập đoàn|Anh|Chị)\s+/i, '')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return (cleaned.slice(0, 2) || 'TA').toUpperCase();
}

function maskCustomerName(name: string): string {
  const clean = name.split('-')[0].trim();
  if (clean.length <= 20) return `${clean}...`;
  return `${clean.slice(0, 20).trim()}...`;
}

function extractLocation(customer: string, notes?: string): string {
  const haystack = `${customer} ${notes || ''}`;
  for (const loc of KNOWN_LOCATIONS) {
    if (haystack.toLowerCase().includes(loc.toLowerCase())) {
      return loc;
    }
  }
  return 'TP. Hồ Chí Minh';
}

function resolveProductHref(productName: string): string {
  const lower = productName.toLowerCase();
  if (lower.includes('thùng nhựa') || lower.includes('sóng nhựa')) {
    return '/san-pham?category=thung-nhua';
  }
  if (lower.includes('thùng gỗ') || lower.includes('kiện gỗ')) {
    return '/san-pham/thung-go-kien-go-dong-hang-xuat-khau';
  }
  if (lower.includes('ván ép') || lower.includes('plywood')) {
    return '/san-pham/pallet-do-van-ep-xuat-khau-campuchia-1000x1200';
  }
  if (lower.includes('chân gù')) {
    return '/san-pham/pallet-go-chan-gu-chuan-4-huong-nang-1219x1016';
  }
  if (lower.includes('đố khuyết')) {
    return '/san-pham/pallet-go-thong-do-khuyet-xuat-khau-ispm15-1200x1000';
  }
  if (lower.includes('bản vẽ') || lower.includes('yêu cầu')) {
    return '/san-pham/pallet-go-dong-theo-yeu-cau';
  }
  if (lower.includes('gma') || lower.includes('mỹ')) {
    return '/san-pham/pallet-go-thong-moi-xuat-khau-my-1219x1016';
  }
  if (lower.includes('kích thước lớn') || lower.includes('đóng máy')) {
    return '/san-pham/pallet-go-xuat-khau-kich-thuoc-lon-1400x1100';
  }
  return '/san-pham';
}

export async function GET() {
  try {
    const orders = await getAllOrders();
    const publicItems: OrderNotificationItem[] = orders
      .filter((o) => o.customer && o.productName)
      .slice(0, 15)
      .map((order, idx) => {
        const qtyPrefix = order.quantity && order.quantity > 0 ? `${order.quantity} ` : '';
        return {
          id: `real-${order.id}`,
          initials: extractInitials(order.customer),
          customerLabel: maskCustomerName(order.customer),
          location: extractLocation(order.customer, order.notes),
          actionText: ACTION_PRESETS[idx % ACTION_PRESETS.length],
          productLabel: `${qtyPrefix}${order.productName}`,
          timeAgo: TIME_PRESETS[idx % TIME_PRESETS.length],
          href: resolveProductHref(order.productName),
        };
      });

    return NextResponse.json(publicItems);
  } catch {
    return NextResponse.json([]);
  }
}
