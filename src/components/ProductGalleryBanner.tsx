'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, Mail, ShieldCheck, Award, Factory, MessageCircle } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ProductGalleryBanner.module.css';

interface ProductGalleryBannerProps {
  onQuoteClick?: () => void;
}

export const ProductGalleryBanner: React.FC<ProductGalleryBannerProps> = () => {
  const { locale, t } = useLanguage();

  const copy =
    locale === 'en'
      ? {
          badge: 'DIRECT MANUFACTURER',
          slogan: 'Engineered Strength — Built to Last',
          iso: 'ISO 9001 Quality',
          price: 'Factory Direct Price',
          custom: 'Built to CAD Drawing',
        }
      : locale === 'zh'
        ? {
            badge: '源头实体工厂直供',
            slogan: '精工实木品质 · 护航全球出口',
            iso: 'ISO 9001 质量体系',
            price: '一手出厂批发价',
            custom: '支持按CAD图定制',
          }
        : {
            badge: 'XƯỞNG SẢN XUẤT TRỰC TIẾP',
            slogan: 'Trao giá trị từ gỗ - Vững bền theo thời gian',
            iso: 'Tiêu Chuẩn ISO 9001',
            price: 'Giá Gốc Tại Xưởng',
            custom: 'Đóng Theo Bản Vẽ Riêng',
          };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bgWrapper}>
        <Image
          src="/images/pallet_factory_43.jpg"
          alt={t.common.companyName}
          fill
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.headerRow}>
          <div className={styles.brandBox}>
            <span className={styles.brandBadge}>{copy.badge}</span>
            <h2 className={styles.brandTitle}>{t.common.shortName.toUpperCase()}</h2>
            <p className={styles.slogan}>{copy.slogan}</p>
          </div>

          <div className={styles.standardBadge}>
            <ShieldCheck size={18} />
            <span>{t.productCard.exportBadge}</span>
          </div>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <Award size={16} className={styles.featureIcon} />
            <span>{copy.iso}</span>
          </div>
          <div className={styles.featureItem}>
            <Factory size={16} className={styles.featureIcon} />
            <span>{copy.price}</span>
          </div>
          <div className={styles.featureItem}>
            <ShieldCheck size={16} className={styles.featureIcon} />
            <span>{copy.custom}</span>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.infoCol}>
            <div className={styles.infoRow}>
              <MapPin size={15} className={styles.infoIcon} />
              <span>{t.common.address}</span>
            </div>
            <div className={styles.infoRow}>
              <Mail size={15} className={styles.infoIcon} />
              <span>{companyInfo.email}</span>
            </div>
          </div>

          <div className={styles.actionCol}>
            <a href={`tel:${companyInfo.hotline}`} className={styles.callBtn}>
              <Phone size={15} />
              <span>{companyInfo.hotlineFormatted}</span>
            </a>
            <a
              href={companyInfo.zaloUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.zaloBtn}
            >
              <MessageCircle size={15} />
              <span>Zalo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
