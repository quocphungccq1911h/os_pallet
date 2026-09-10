import React from 'react';
import { Phone, ShieldCheck, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  onOpenQuoteModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Hero Text Content */}
        <div className={styles.heroContent}>
          <div className="section-tag">
            <span>🏭 XƯỞNG PALLET GỖ & THÙNG GỖ TRƯỜNG AN - HÓC MÔN</span>
          </div>

          <h1 className={styles.heroTitle}>
            Pallet Gỗ, Ván Ép & <span className={styles.titleHighlight}>Thùng Gỗ Đóng Hàng</span> Xuất Khẩu
          </h1>

          <p className={styles.heroDesc}>
            Xưởng sản xuất trực tiếp tại Hóc Môn: Chuyên cung cấp Pallet Gỗ Thông, Tràm, Pallet Ván Ép Plywood, gia công Thùng Gỗ đóng kiện máy móc xuất khẩu đi Mỹ, Campuchia và giao hàng nhanh các KCN phía Nam.
          </p>

          {/* Quick Value Highlights */}
          <div className={styles.heroFeatures}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Giá gốc tận xưởng Hóc Môn</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Đóng thùng kiện theo bản vẽ</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Pallet ván ép & ISPM 15</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Giao hàng nhanh tận kho bãi</span>
            </div>
          </div>

          {/* CTA Buttons Group */}
          <div className={styles.heroActions}>
            <button onClick={onOpenQuoteModal} className={`btn btn-primary ${styles.btnQuote}`}>
              <FileText size={18} />
              <span>Nhận Báo Giá Nhanh</span>
            </button>
            
            <div className={styles.hotlinesRow}>
              <a href={`tel:${companyInfo.hotline}`} className={`btn btn-hotline ${styles.btnHotline}`} title="Gọi Hotline Line 1">
                <Phone size={15} />
                <span>{companyInfo.hotlineFormatted}</span>
              </a>

              <a href={`tel:${companyInfo.secondaryHotline}`} className={`btn ${styles.btnHotlineSecondary}`} title="Gọi Hotline Line 2">
                <Phone size={15} />
                <span>{companyInfo.secondaryHotlineFormatted}</span>
              </a>
            </div>
          </div>

          {/* Cam kết năng lực thực tế của xưởng Trường An */}
          <div className={styles.statsStrip}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Giá gốc tận xưởng</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>ISPM 15</span>
              <span className={styles.statLabel}>Đạt chuẩn xuất khẩu</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>24/7</span>
              <span className={styles.statLabel}>Khảo sát &amp; Đóng tận nơi</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <img
              src="/images/banner_main.png"
              alt="Xưởng Pallet Gỗ & Thùng Gỗ Trường An - Hóc Môn TP.HCM"
              className={styles.visualImg}
            />
          </div>
          <div className={styles.visualFooterBadge}>
            <ShieldCheck size={20} color="var(--primary)" />
            <span>Xưởng sản xuất trực tiếp • Cam kết đúng quy cách & tiến độ 100%</span>
          </div>
        </div>
      </div>
    </section>
  );
};
