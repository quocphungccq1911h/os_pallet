import type { Metadata } from 'next';
import './globals.css';
import { companyInfo } from '@/data/companyInfo';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pallettruongan.com'),
  title: `${companyInfo.shortName} - Pallet Gỗ, Pallet Nhựa & Thùng Gỗ Xuất Khẩu TP.HCM`,
  description: companyInfo.description,
  keywords: [
    'pallet trường an',
    'pallet gỗ trường an',
    'pallet gỗ bà điểm',
    'pallet gỗ tphcm',
    'pallet nhựa công nghiệp',
    'thùng gỗ đóng hàng',
    'thùng gỗ đóng máy móc',
    'wooden pallet vietnam',
    'plywood pallet vietnam',
    '越南木托盘',
    '胡志明市木托盘厂',
    'pallet xuất khẩu ISPM 15',
  ],
  openGraph: {
    title: `${companyInfo.name} - Xưởng Pallet Gỗ, Pallet Nhựa & Thùng Gỗ TP.HCM`,
    description: companyInfo.description,
    type: 'website',
    locale: 'vi_VN',
    siteName: companyInfo.shortName,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo_home.jpg',
    apple: '/images/logo_home.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: companyInfo.name,
    alternateName: companyInfo.shortName,
    description: companyInfo.description,
    telephone: companyInfo.hotline,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address,
      addressLocality: 'Bà Điểm',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8441373,
      longitude: 106.5654092,
    },
    sameAs: [companyInfo.facebook, companyInfo.zaloUrl],
    openingHours: 'Mo-Su 07:30-18:00',
    priceRange: 'Liên hệ báo giá tốt nhất',
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
