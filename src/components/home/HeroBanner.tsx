'use client';

import React from 'react';
import { Phone, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { useLanguage } from '@/context/LanguageContext';
import styles from './HeroBanner.module.css';

interface HeroBannerProps {
  onOpenQuoteModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onOpenQuoteModal }) => {
  const { t } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroGrid}`}>
        {/* Left Column: Hero Text Content */}
        <div className={styles.heroContent}>
          <div className="section-tag">
            <span>{t.hero.tag}</span>
          </div>

          <h1 className={styles.heroTitle}>
            {t.hero.titleStart}{' '}
            <span className={styles.titleHighlight}>{t.hero.titleHighlight}</span>
            {t.hero.titleEnd ? ` ${t.hero.titleEnd}` : ''}
          </h1>

          <p className={styles.heroDesc}>{t.hero.desc}</p>

          {/* Quick Value Highlights */}
          <div className={styles.heroFeatures}>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>{t.hero.f1}</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>{t.hero.f2}</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>{t.hero.f3}</span>
            </div>
            <div className={styles.featureItem}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span>{t.hero.f4}</span>
            </div>
          </div>

          {/* CTA Buttons Group */}
          <div className={styles.heroActions}>
            <button onClick={onOpenQuoteModal} className={`btn btn-primary ${styles.btnQuote}`}>
              <FileText size={18} />
              <span>{t.hero.btnQuote}</span>
            </button>

            <div className={styles.hotlinesRow}>
              <a
                href={`tel:${companyInfo.hotline}`}
                className={`btn btn-hotline ${styles.btnHotline}`}
                title={t.common.hotline}
              >
                <Phone size={15} />
                <span>{companyInfo.hotlineFormatted}</span>
              </a>
            </div>
          </div>

          {/* Stats Strip */}
          <div className={styles.statsStrip}>
            <div className={styles.statBox}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>{t.hero.stat1Label}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>ISPM 15</span>
              <span className={styles.statLabel}>{t.hero.stat2Label}</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statBox}>
              <span className={styles.statNum}>24/7</span>
              <span className={styles.statLabel}>{t.hero.stat3Label}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className={styles.heroVisual}>
          <div className={styles.visualCard}>
            <img
              src="/images/banner_main.png"
              alt={t.common.companyName}
              className={styles.visualImg}
            />
          </div>
          <div className={styles.visualFooterBadge}>
            <ShieldCheck size={20} color="var(--primary)" />
            <span>{t.hero.visualBadge}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
