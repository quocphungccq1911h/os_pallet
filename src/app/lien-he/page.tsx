'use client';

import React from 'react';
import { ContactFormSection } from '@/components/home/ContactFormSection';
import { companyInfo } from '@/data/companyInfo';
import { MapPin, Phone, Clock, Factory } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './lienhe.module.css';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <span
            className="section-tag"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            {t.contactPage.tag}
          </span>
          <h1 className={styles.pageTitle}>{t.contactPage.title}</h1>
          <p className={styles.pageDesc}>{t.contactPage.desc}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.infoGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <MapPin size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.contactPage.c1Title}</h3>
            </div>
            <p className={styles.cardDesc}>{t.common.address}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Factory size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.contactPage.c2Title}</h3>
            </div>
            <p className={styles.cardDesc}>{t.contactPage.c2Desc}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Phone size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.contactPage.c3Title}</h3>
            </div>
            <div className={styles.cardDesc}>
              <p>
                Hotline / Zalo: <strong>{companyInfo.hotlineFormatted}</strong>
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Clock size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.contactPage.c4Title}</h3>
            </div>
            <div className={styles.cardDesc}>
              <p>{t.common.workingHours}</p>
              <p style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>
                {t.contactPage.c4Note}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContactFormSection />
    </div>
  );
}
