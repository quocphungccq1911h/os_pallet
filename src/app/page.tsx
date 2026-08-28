'use client';

import React from 'react';
import { HeroBanner } from '@/components/home/HeroBanner';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutSection } from '@/components/home/AboutSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { PricingTableSection } from '@/components/home/PricingTableSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { ServiceAreas } from '@/components/home/ServiceAreas';
import { RealGallery } from '@/components/home/RealGallery';
import { KnowledgeSection } from '@/components/home/KnowledgeSection';
import { FAQSection } from '@/components/home/FAQSection';
import { ContactFormSection } from '@/components/home/ContactFormSection';
import { useQuoteModal } from '@/context/QuoteModalContext';

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <>
      {/* 1. Banner giới thiệu */}
      <HeroBanner onOpenQuoteModal={() => openQuoteModal()} />

      {/* 2. Các sản phẩm chính & bộ lọc */}
      <FeaturedProducts onOpenQuoteModal={(slug) => openQuoteModal(slug)} />

      {/* 3. Giới thiệu doanh nghiệp & nhà xưởng */}
      <AboutSection />

      {/* 4. Lý do lựa chọn */}
      <WhyChooseUs />

      {/* 5. Bảng giá tham khảo */}
      <PricingTableSection onOpenQuoteModal={() => openQuoteModal()} />

      {/* 6. Dịch vụ liên quan */}
      <ServicesSection />

      {/* 7. Khu vực cung cấp */}
      <ServiceAreas />

      {/* 8. Hình ảnh thực tế */}
      <RealGallery />

      {/* 9. Bài viết tin tức/kiến thức SEO */}
      <KnowledgeSection />

      {/* 10. Câu hỏi thường gặp FAQ */}
      <FAQSection />

      {/* 11. Form liên hệ / nhận báo giá */}
      <ContactFormSection />
    </>
  );
}
