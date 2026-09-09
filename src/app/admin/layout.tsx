import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quản Trị Hệ Thống - Xưởng Pallet Gỗ & Thùng Gỗ Trường An',
  description: 'Trang quản trị nội bộ quản lý danh mục sản phẩm, hình ảnh và thông số kỹ thuật xưởng Pallet Trường An.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f1f5f9', color: '#0f172a' }}>
      {children}
    </div>
  );
}
