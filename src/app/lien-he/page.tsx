'use client';

import React from 'react';
import { ContactFormSection } from '@/components/home/ContactFormSection';
import { companyInfo } from '@/data/companyInfo';
import { MapPin, Phone, Mail, Clock, Factory } from 'lucide-react';
import styles from './lienhe.module.css';

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            THÔNG TIN LIÊN HỆ & NHÀ XƯỞNG
          </span>
          <h1 className={styles.pageTitle}>Liên Hệ Công Ty TNHH Pallet Gỗ Việt</h1>
          <p className={styles.pageDesc}>
            Chúng tôi luôn sẵn sàng hỗ trợ khảo sát mặt bằng kho bãi, tư vấn thông số tải trọng và báo giá gia công tận xưởng cho doanh nghiệp của bạn.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '4rem' }}>
        <div className={styles.infoGrid}>
          <div className={styles.card}>
            <MapPin size={32} color="var(--primary)" />
            <h3>Trụ Sở Chính</h3>
            <p>{companyInfo.address}</p>
          </div>
          <div className={styles.card}>
            <Factory size={32} color="var(--primary)" />
            <h3>Xưởng Sản Xuất</h3>
            <p>{companyInfo.factoryAddress}</p>
          </div>
          <div className={styles.card}>
            <Phone size={32} color="var(--primary)" />
            <h3>Hotline & Zalo</h3>
            <p>Hotline: <strong>{companyInfo.hotlineFormatted}</strong></p>
            <p>Zalo: {companyInfo.zalo}</p>
          </div>
          <div className={styles.card}>
            <Clock size={32} color="var(--primary)" />
            <h3>Giờ Làm Việc</h3>
            <p>{companyInfo.workingHours}</p>
            <p>Hỗ trợ tư vấn online 24/7</p>
          </div>
        </div>
      </div>

      {/* Main Contact Form Block */}
      <ContactFormSection />
    </div>
  );
}
