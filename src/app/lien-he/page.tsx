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

      <div className="container">
        <div className={styles.infoGrid}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <MapPin size={22} />
              </div>
              <h3 className={styles.cardTitle}>Xưởng Sản Xuất</h3>
            </div>
            <p className={styles.cardDesc}>{companyInfo.address}</p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Factory size={22} />
              </div>
              <h3 className={styles.cardTitle}>Khu Vực Phục Vụ</h3>
            </div>
            <p className={styles.cardDesc}>
              Hóc Môn, Củ Chi, Q.12, Bình Dương, Long An, các KCN miền Nam &amp; Đóng hàng xuất khẩu
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Phone size={22} />
              </div>
              <h3 className={styles.cardTitle}>Hotline &amp; Zalo</h3>
            </div>
            <div className={styles.cardDesc}>
              <p>Hotline 1: <strong>{companyInfo.hotlineFormatted}</strong></p>
              <p>Hotline 2: <strong>{companyInfo.secondaryHotlineFormatted}</strong></p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <Clock size={22} />
              </div>
              <h3 className={styles.cardTitle}>Giờ Làm Việc</h3>
            </div>
            <div className={styles.cardDesc}>
              <p>{companyInfo.workingHours}</p>
              <p style={{ color: 'var(--primary-dark)', fontWeight: 600 }}>Tư vấn kỹ thuật Zalo 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Form Block */}
      <ContactFormSection />
    </div>
  );
}
