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
            <span>🏭 XƯỞNG SẢN XUẤT PALLET GỖ TRỰC TIẾP</span>
          </div>

          <h1 className={styles.heroTitle}>
            Giải Pháp <span className={styles.titleHighlight}>Pallet Gỗ B2B</span> Chuyên Nghiệp & Chuẩn ISPM 15
          </h1>

          <p className={styles.heroDesc}>
            Chuyên cung cấp Pallet gỗ Tràm, Keo, Pallet xuất khẩu, Pallet cũ/mới và nhận gia công đóng theo kích thước yêu cầu cho nhà máy, kho bãi và container xuất khẩu trên toàn quốc.
          </p>

          {/* Quick Value Highlights */}
          <div className={styles.heroFeatures}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Giá gốc tận xưởng sản xuất</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Sấy HT khử trùng ISPM 15</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Đóng mẫu chạy thử miễn phí</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>Giao hàng tận nơi 24/7</span>
            </div>
          </div>

          {/* CTA Buttons Group */}
          <div className={styles.heroActions}>
            <button onClick={onOpenQuoteModal} className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
              <FileText size={20} />
              <span>Nhận Báo Giá Nhanh</span>
            </button>
            
            <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
              <Phone size={20} />
              <span>Hotline: {companyInfo.hotlineFormatted}</span>
            </a>
          </div>

          {/* Stat Counter Strip */}
          <div className={styles.statsStrip}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>10+</span>
              <span className={styles.statLabel}>Năm kinh nghiệm</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Doanh nghiệp tin dùng</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>50.000+</span>
              <span className={styles.statLabel}>Pallet xuất xưởng/tháng</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000"
              alt="Xưởng sản xuất Pallet Gỗ Việt"
              className={styles.visualImg}
            />
            <div className={styles.visualBadge}>
              <ShieldCheck size={28} color="var(--primary)" />
              <div>
                <strong>Chất Lượng Cam Kết</strong>
                <p>Nan sấy khô không nấm mốc, đúng quy cách</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
