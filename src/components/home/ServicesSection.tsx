'use client';

import React from 'react';
import { Flame, Box, Recycle, PenTool } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ServicesSection.module.css';

const SERVICE_ICONS = [
  <PenTool key="p" size={22} />,
  <Flame key="f" size={22} />,
  <Recycle key="r" size={22} />,
  <Box key="b" size={22} />,
];

export const ServicesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">{t.services.tag}</span>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {t.services.items.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>{SERVICE_ICONS[i]}</div>
                <h3 className={styles.title}>{s.title}</h3>
              </div>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
