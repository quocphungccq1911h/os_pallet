import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './FloatingCTA.module.css';

interface FloatingCTAProps {
  onOpenQuoteModal: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenQuoteModal }) => {
  return (
    <>
      {/* Desktop & Tablet Floating Widget Bar */}
      <div className={styles.floatingContainer}>
        {/* Quote Request Button */}
        <button onClick={onOpenQuoteModal} className={`${styles.floatingBtn} ${styles.quoteBtn}`} title="Yêu cầu báo giá nhanh">
          <FileText size={22} />
          <span className={styles.btnLabel}>Báo Giá</span>
        </button>

        {/* Zalo Chat Button */}
        <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className={`${styles.floatingBtn} ${styles.zaloBtn}`} title="Chat qua Zalo">
          <MessageCircle size={22} />
          <span className={styles.btnLabel}>Zalo</span>
        </a>

        {/* Hotline Call Button */}
        <a href={`tel:${companyInfo.hotline}`} className={`${styles.floatingBtn} ${styles.phoneBtn}`} title="Gọi Hotline ngay">
          <Phone size={22} />
          <span className={styles.btnLabel}>Hotline</span>
        </a>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div className={styles.mobileBottomBar}>
        <a href={`tel:${companyInfo.hotline}`} className={`${styles.mobileBarItem} ${styles.mobilePhone}`}>
          <Phone size={18} />
          <span>Gọi: {companyInfo.hotlineFormatted}</span>
        </a>
        <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className={`${styles.mobileBarItem} ${styles.mobileZalo}`}>
          <MessageCircle size={18} />
          <span>Chat Zalo</span>
        </a>
        <button onClick={onOpenQuoteModal} className={`${styles.mobileBarItem} ${styles.mobileQuote}`}>
          <FileText size={18} />
          <span>Nhận Báo Giá</span>
        </button>
      </div>
    </>
  );
};
