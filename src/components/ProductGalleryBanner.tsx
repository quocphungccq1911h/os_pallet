import React from 'react';
import Image from 'next/image';
import { Phone, MapPin, Mail, ShieldCheck, Award, Factory, MessageCircle } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './ProductGalleryBanner.module.css';

interface ProductGalleryBannerProps {
  onQuoteClick?: () => void;
}

export const ProductGalleryBanner: React.FC<ProductGalleryBannerProps> = ({ onQuoteClick }) => {
  return (
    <div className={styles.bannerContainer}>
      {/* Background with factory worker and pallets */}
      <div className={styles.bgWrapper}>
        <Image
          src="/images/pallet_factory_43.jpg"
          alt="Xưởng sản xuất Pallet Trường An"
          fill
          className={styles.bgImage}
          priority
        />
        <div className={styles.overlay} />
      </div>

      {/* Content Layer */}
      <div className={styles.content}>
        {/* Top Header */}
        <div className={styles.headerRow}>
          <div className={styles.brandBox}>
            <span className={styles.brandBadge}>XƯỞNG SẢN XUẤT TRỰC TIẾP</span>
            <h2 className={styles.brandTitle}>PALLET TRƯỜNG AN</h2>
            <p className={styles.slogan}>Trao giá trị từ gỗ - Vững bền theo thời gian</p>
          </div>

          <div className={styles.standardBadge}>
            <ShieldCheck size={18} />
            <span>ISPM 15 Xuất Khẩu</span>
          </div>
        </div>

        {/* Center Highlights */}
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <Award size={16} className={styles.featureIcon} />
            <span>Tiêu Chuẩn ISO 9001</span>
          </div>
          <div className={styles.featureItem}>
            <Factory size={16} className={styles.featureIcon} />
            <span>Giá Gốc Tại Xưởng</span>
          </div>
          <div className={styles.featureItem}>
            <ShieldCheck size={16} className={styles.featureIcon} />
            <span>Đóng Theo Bản Vẽ Riêng</span>
          </div>
        </div>

        {/* Bottom Contact & Call to Action */}
        <div className={styles.bottomBar}>
          <div className={styles.infoCol}>
            <div className={styles.infoRow}>
              <MapPin size={15} className={styles.infoIcon} />
              <span>361/75 Huỳnh Thị Na, Đông Thạnh, Hóc Môn, TP.HCM</span>
            </div>
            <div className={styles.infoRow}>
              <Mail size={15} className={styles.infoIcon} />
              <span>{companyInfo.email || 'ngockycntp@gmail.com'}</span>
            </div>
          </div>

          <div className={styles.actionCol}>
            <a href={`tel:${companyInfo.hotline}`} className={styles.callBtn}>
              <Phone size={15} />
              <span>{companyInfo.hotline}</span>
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
