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
          <h1 className={styles.pageTitle}>Liên Hệ {companyInfo.name}</h1>
          <p className={styles.pageDesc}>
            Chúng tôi luôn sẵn sàng hỗ trợ khảo sát kích thước máy móc, lên bản vẽ thiết kế mẫu và báo giá tận xưởng tốt nhất cho doanh nghiệp.
          </p>
        </div>
      </div>

      <div className="container" style={{ marginBottom: '4rem' }}>
        <div className={styles.infoGrid}>
          <div className={styles.card}>
            <MapPin size={32} color="var(--primary)" />
            <h3>Xưởng Sản Xuất</h3>
            <p>{companyInfo.address}</p>
          </div>
          <div className={styles.card}>
            <Factory size={32} color="var(--primary)" />
            <h3>Khu Vực Phục Vụ</h3>
            <p>Hóc Môn, Củ Chi, Q.12, Bình Dương, Long An, các KCN miền Nam & Đóng hàng xuất khẩu</p>
          </div>
          <div className={styles.card}>
            <Phone size={32} color="var(--primary)" />
            <h3>Hotline & Zalo</h3>
            <p>Hotline 1: <strong>{companyInfo.hotlineFormatted}</strong></p>
            <p>Hotline 2: <strong>{companyInfo.secondaryHotlineFormatted}</strong></p>
          </div>
          <div className={styles.card}>
            <Clock size={32} color="var(--primary)" />
            <h3>Giờ Làm Việc</h3>
            <p>{companyInfo.workingHours}</p>
            <p>Tư vấn kỹ thuật Zalo 24/7</p>
          </div>
        </div>
      </div>

      {/* Main Contact Form Block */}
      <ContactFormSection />
    </div>
  );
}
