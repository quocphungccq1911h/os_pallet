'use client';

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { useLanguage } from '@/context/LanguageContext';
import styles from './ContactFormSection.module.css';

export const ContactFormSection: React.FC = () => {
  const { locale, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dimensions: '',
    quantity: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(t.quoteModal.alertMissing);
      return;
    }
    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          productTitle: 'Liên hệ từ Form Trang Chủ / Liên Hệ',
          dimensions: formData.dimensions,
          quantity: formData.quantity || '100',
          note: locale !== 'vi' ? `[${locale.toUpperCase()}] ${formData.message}` : formData.message,
          status: 'moi',
        }),
      });
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="lien-he">
      <div className="container">
        <div className={styles.grid}>
          {/* Contact Info Side */}
          <div className={styles.infoSide}>
            <span
              className="section-tag"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }}
            >
              {t.contactSection.tag}
            </span>

            <h2 className={styles.title}>{t.contactSection.title}</h2>
            <p className={styles.desc}>{t.contactSection.desc}</p>

            <div className={styles.contactDetails}>
              <div className={styles.contactCard}>
                <Phone size={22} color="var(--primary)" />
                <div>
                  <strong>{t.contactSection.hotlineTitle}</strong>
                  <p>
                    <a href={`tel:${companyInfo.hotline}`} className={styles.hotlineLink}>
                      {companyInfo.hotlineFormatted}
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <Mail size={22} color="var(--primary)" />
                <div>
                  <strong>{t.contactSection.emailTitle}</strong>
                  <p>{companyInfo.email}</p>
                </div>
              </div>

              <div className={styles.contactCard}>
                <MapPin size={22} color="var(--primary)" />
                <div>
                  <strong>{t.contactSection.addressTitle}</strong>
                  <p>{t.common.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className={styles.formCard}>
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className={styles.formTitle}>{t.contactSection.formTitle}</h3>
                <p className={styles.formSub}>{t.contactSection.formSub}</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.contactSection.nameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.contactSection.namePh}
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.contactSection.phoneLabel}</label>
                    <input
                      type="tel"
                      required
                      placeholder={t.contactSection.phonePh}
                      className={styles.input}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.contactSection.dimLabel}</label>
                    <input
                      type="text"
                      placeholder={t.contactSection.dimPh}
                      className={styles.input}
                      value={formData.dimensions}
                      onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.contactSection.qtyLabel}</label>
                    <input
                      type="number"
                      placeholder={t.contactSection.qtyPh}
                      className={styles.input}
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '1rem' }}>
                  <label className={styles.label}>{t.contactSection.noteLabel}</label>
                  <textarea
                    rows={3}
                    placeholder={t.contactSection.notePh}
                    className={styles.textarea}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.25rem', padding: '0.85rem' }}
                >
                  <Send size={18} />
                  <span>{t.contactSection.submitBtn}</span>
                </button>
              </form>
            ) : (
              <div className={styles.successState}>
                <CheckCircle size={60} color="var(--accent)" />
                <h3>{t.contactSection.successTitle}</h3>
                <p>{t.contactSection.successDesc}</p>

                <a
                  href={`${companyInfo.zaloUrl}?text=${encodeURIComponent(`Hello Pallet Truong An, inquiry from ${formData.name} - ${formData.phone}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-zalo"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  {t.contactSection.zaloFastBtn.replace('{phone}', companyInfo.hotlineFormatted)}
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                  style={{ marginTop: '0.75rem', width: '100%' }}
                >
                  {t.contactSection.anotherBtn}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
