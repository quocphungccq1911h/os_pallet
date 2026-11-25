'use client';

import React from 'react';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FloatingCTA.module.css';

interface FloatingCTAProps {
  onOpenQuoteModal: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Desktop & Tablet Floating Widget Bar */}
      <div className={styles.floatingContainer}>
        <button
          onClick={onOpenQuoteModal}
          className={`${styles.floatingBtn} ${styles.quoteBtn}`}
          title={t.common.getQuoteFast}
        >
          <FileText size={22} />
          <span className={styles.btnLabel}>{t.floating.quote}</span>
        </button>

        <a
          href={companyInfo.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.floatingBtn} ${styles.zaloBtn}`}
          title={t.common.chatZalo}
        >
          <MessageCircle size={22} />
          <span className={styles.btnLabel}>{t.floating.zalo}</span>
        </a>

        <a
          href={`tel:${companyInfo.hotline}`}
          className={`${styles.floatingBtn} ${styles.phoneBtn}`}
          title={t.common.callNow}
        >
          <Phone size={22} />
          <span className={styles.btnLabel}>{t.floating.hotline}</span>
        </a>
      </div>

      {/* Mobile Bottom Fixed Action Bar */}
      <div className={styles.mobileBottomBar}>
        <a
          href={`tel:${companyInfo.hotline}`}
          className={`${styles.mobileBarItem} ${styles.mobilePhone}`}
        >
          <Phone size={18} />
          <span>
            {t.floating.mobileCall} {companyInfo.hotlineFormatted}
          </span>
        </a>
        <a
          href={companyInfo.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.mobileBarItem} ${styles.mobileZalo}`}
        >
          <MessageCircle size={18} />
          <span>{t.floating.mobileZalo}</span>
        </a>
        <button
          onClick={onOpenQuoteModal}
          className={`${styles.mobileBarItem} ${styles.mobileQuote}`}
        >
          <FileText size={18} />
          <span>{t.floating.mobileQuote}</span>
        </button>
      </div>
    </>
  );
};
