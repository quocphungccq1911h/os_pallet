'use client';

import React from 'react';
import { Award, Factory, Shield, Truck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {/* Left Visual Column */}
        <div className={styles.imageCol}>
          <div className={styles.mainImgWrapper}>
            <img
              src="/images/banner_main.png"
              alt={t.common.companyName}
              className={styles.mainImg}
            />
          </div>
        </div>

        {/* Right Info Column */}
        <div className={styles.infoCol}>
          <span className="section-tag">
            <Factory size={14} /> {t.about.tag}
          </span>

          <h2 className={styles.title}>{t.about.title}</h2>

          <p className={styles.description}>{t.about.desc}</p>

          <div className={styles.bulletList}>
            <div className={styles.bulletItem}>
              <Award className={styles.bulletIcon} size={22} />
              <div>
                <h4>{t.about.b1Title}</h4>
                <p>{t.about.b1Desc}</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Shield className={styles.bulletIcon} size={22} />
              <div>
                <h4>{t.about.b2Title}</h4>
                <p>{t.about.b2Desc}</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Truck className={styles.bulletIcon} size={22} />
              <div>
                <h4>{t.about.b3Title}</h4>
                <p>{t.about.b3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
