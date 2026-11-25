'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, Phone, ShieldCheck } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { products } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct } from '@/i18n/productLocalizer';
import styles from './QuoteModal.module.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductSlug?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultProductSlug }) => {
  const { locale, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: defaultProductSlug || products[0]?.slug || 'custom',
    dimensions: '',
    quantity: '100',
    note: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (defaultProductSlug) {
      const exists = products.some((p) => p.slug === defaultProductSlug);
      setFormData((prev) => ({
        ...prev,
        product: exists ? defaultProductSlug : 'custom',
        dimensions: exists ? prev.dimensions : defaultProductSlug,
      }));
    }
  }, [defaultProductSlug, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert(t.quoteModal.alertMissing);
      return;
    }

    try {
      setIsSubmitting(true);
      const selectedProd = products.find((p) => p.slug === formData.product);
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          productTitle: selectedProd ? selectedProd.name : 'Yêu cầu tư vấn kích thước riêng',
          dimensions: formData.dimensions || (selectedProd ? selectedProd.dimensions : ''),
          quantity: formData.quantity,
          note: locale !== 'vi' ? `[${locale.toUpperCase()}] ${formData.note}` : formData.note,
          status: 'moi',
        }),
      });
    } catch {
      // ignore
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      product: products[0]?.slug || 'custom',
      dimensions: '',
      quantity: '100',
      note: '',
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label={t.common.close}>
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className={styles.modalHeader}>
              <div className={styles.headerIcon}>📝</div>
              <div>
                <h3 className={styles.modalTitle}>{t.quoteModal.title}</h3>
                <p className={styles.modalSub}>{t.quoteModal.subtitle}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>{t.quoteModal.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder={t.quoteModal.namePlaceholder}
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t.quoteModal.phoneLabel}</label>
                <input
                  type="tel"
                  required
                  placeholder={t.quoteModal.phonePlaceholder}
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.quoteModal.productLabel}</label>
                  <select
                    className={styles.select}
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  >
                    {products.map((p) => {
                      const loc = localizeProduct(p, locale);
                      return (
                        <option key={p.id} value={p.slug}>
                          {loc.name}
                        </option>
                      );
                    })}
                    <option value="custom">{t.quoteModal.customOption}</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>{t.quoteModal.qtyLabel}</label>
                  <input
                    type="number"
                    min="1"
                    placeholder={t.quoteModal.qtyPlaceholder}
                    className={styles.input}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>{t.quoteModal.noteLabel}</label>
                <textarea
                  rows={3}
                  placeholder={t.quoteModal.notePlaceholder}
                  className={styles.textarea}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                ></textarea>
              </div>

              <div className={styles.trustBadge}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>{t.quoteModal.trustNote}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.85rem' }}
              >
                <Send size={18} />
                <span>{isSubmitting ? t.quoteModal.submittingBtn : t.quoteModal.submitBtn}</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successBox}>
            <CheckCircle size={56} className={styles.successIcon} />
            <h3 className={styles.successTitle}>{t.quoteModal.successTitle}</h3>
            <p className={styles.successText}>
              {t.quoteModal.successDesc1} <strong>{formData.name}</strong> {t.quoteModal.successDesc2}{' '}
              <strong>{t.common.shortName}</strong> {t.quoteModal.successDesc3}{' '}
              <strong>{formData.phone}</strong> {t.quoteModal.successDesc4}
            </p>

            <div className={styles.directContact}>
              <p>{t.quoteModal.urgentLabel}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline">
                  <Phone size={18} />
                  <span>
                    {t.quoteModal.callBtn} {companyInfo.hotlineFormatted}
                  </span>
                </a>
                <a
                  href={`${companyInfo.zaloUrl}?text=${encodeURIComponent(`Hello Pallet Truong An, quote inquiry from ${formData.name} - ${formData.phone}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-zalo"
                >
                  {t.quoteModal.zaloBtn}
                </a>
              </div>
            </div>

            <button onClick={handleReset} className="btn btn-outline" style={{ marginTop: '1.25rem' }}>
              {t.quoteModal.closeWindow}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
