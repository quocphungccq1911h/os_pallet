'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './FAQSection.module.css';

export const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">
            <HelpCircle size={14} /> {t.faq.tag}
          </span>
          <h2 className="section-title">{t.faq.title}</h2>
          <p className="section-subtitle">{t.faq.subtitle}</p>
        </div>

        <div className={styles.accordionContainer}>
          {t.faq.items.map((faq, idx) => (
            <div
              key={idx}
              className={`${styles.accordionItem} ${openIdx === idx ? styles.activeItem : ''}`}
            >
              <button className={styles.questionBtn} onClick={() => toggle(idx)}>
                <span className={styles.qText}>{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp size={20} color="var(--primary)" />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
              {openIdx === idx && (
                <div className={styles.answerBox}>
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
