'use client';

import React from 'react';
import { MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ServiceAreas.module.css';

export const ServiceAreas: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.flexGrid}>
          <div className={styles.infoSide}>
            <span className="section-tag">{t.areas.tag}</span>
            <h2 className={styles.title}>{t.areas.title}</h2>
            <p className={styles.desc}>{t.areas.desc}</p>

            <div className={styles.tagGrid}>
              {t.areas.serviceAreas.map((area, idx) => (
                <div key={idx} className={styles.areaTag}>
                  <MapPin size={16} color="var(--primary)" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.kcnCard}>
            <div className={styles.kcnHeader}>
              <Truck size={24} />
              <h3>{t.areas.kcnTitle}</h3>
            </div>
            <ul className={styles.kcnList}>
              {t.areas.kcnList.map((kcn, idx) => (
                <li key={idx} className={styles.kcnItem}>
                  <CheckCircle2 size={16} color="var(--primary)" />
                  <span>{kcn}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
