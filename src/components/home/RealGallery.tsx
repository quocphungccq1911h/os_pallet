'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './RealGallery.module.css';

const GALLERY_URLS = [
  '/images/pallet_factory_43.jpg',
  '/images/products/p4.1.jpg',
  '/images/products/p2.1.jpg',
  '/images/products/p5.1.jpg',
  '/images/products/p3.1.jpg',
  '/images/products/p1.1.jpg',
];

export const RealGallery: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">
            <Camera size={14} /> {t.gallery.tag}
          </span>
          <h2 className="section-title">{t.gallery.title}</h2>
          <p className="section-subtitle">{t.gallery.subtitle}</p>
        </div>

        <div className={styles.galleryGrid}>
          {GALLERY_URLS.map((url, idx) => {
            const caption = t.gallery.captions[idx] || '';
            return (
              <div key={idx} className={styles.galleryItem}>
                <img src={url} alt={caption} className={styles.galleryImg} loading="lazy" />
                <div className={styles.overlay}>
                  <ImageIcon size={24} color="#ffffff" />
                  <p className={styles.caption}>{caption}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/hoat-dong"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            <span>{t.gallery.btnMore}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};
