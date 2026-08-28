import type { Metadata } from 'next';
import './globals.css';
import { companyInfo } from '@/data/companyInfo';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: `${companyInfo.name} - Pallet Gỗ Mới, Cũ, Xuất Khẩu Giá Tận Xưởng`,
  description: companyInfo.description,
  keywords: [
    'pallet gỗ',
    'pallet gỗ tràm',
    'pallet gỗ keo',
    'pallet gỗ cũ',
    'pallet gỗ xuất khẩu',
    'pallet ISPM 15',
    'pallet gỗ bình dương',
    'pallet gỗ đồng nai',
    'pallet gỗ tphcm',
    'bảng giá pallet gỗ'
  ],
  openGraph: {
    title: companyInfo.name,
    description: companyInfo.description,
    type: 'website',
    locale: 'vi_VN',
    siteName: companyInfo.shortName,
  },
  robots: {
    index: true,
    follow: true,
  }
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
    description: companyInfo.description,
    telephone: companyInfo.hotline,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address,
      addressCountry: 'VN',
    },
    openingHours: 'Mo-Sa 07:30-18:00',
    priceRange: ' Liên hệ báo giá',
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
