'use client';

import React from 'react';
import { Factory, ShieldCheck, Ruler, Wrench, Truck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './WhyChooseUs.module.css';

const ICONS = [
  <Factory key="f" size={22} />,
  <ShieldCheck key="s" size={22} />,
  <Ruler key="r" size={22} />,
  <Wrench key="w" size={22} />,
  <Truck key="t" size={22} />,
  <CheckCircle2 key="c" size={22} />,
];

export const WhyChooseUs: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">{t.whyUs.tag}</span>
          <h2 className="section-title">{t.whyUs.title}</h2>
          <p className="section-subtitle">{t.whyUs.subtitle}</p>
        </div>

        <div className={styles.grid}>
          {t.whyUs.items.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>{ICONS[idx]}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
              </div>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
