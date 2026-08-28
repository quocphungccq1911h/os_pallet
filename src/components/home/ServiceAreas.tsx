import React from 'react';
import { MapPin, Truck, Check } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './ServiceAreas.module.css';

export const ServiceAreas: React.FC = () => {
  const kcnList = [
    "KCN Sóng Thần 1, 2, 3 (Bình Dương)",
    "KCN VSIP 1, 2, 3 (Bình Dương)",
    "KCN Biên Hòa 1, 2 (Đồng Nai)",
    "KCN Amata (Đồng Nai)",
    "KCN Tân Thuận, Hiệp Phước (TP.HCM)",
    "KCN Long Hậu, Tân Đức (Long An)",
    "KCN Phú Mỹ 1, 2, 3 (Vũng Tàu)",
    "Các KCN Miền Trung & Miền Bắc"
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.flexGrid}>
          <div className={styles.infoSide}>
            <span className="section-tag">KHU VỰC CUNG CẤP</span>
            <h2 className={styles.title}>Mạng Lưới Vận Chuyển & Phân Phối Rộng Khắp</h2>
            <p className={styles.desc}>
              Sở hữu đội xe tải lớn từ 3.5 tấn đến 15 tấn, chúng tôi đảm bảo nguồn cung ứng pallet gỗ liên tục, giao hàng tận xưởng trong ngày tới tất cả các khu công nghiệp tại TP.HCM, Bình Dương, Đồng Nai, Long An và khu vực lân cận.
            </p>

            <div className={styles.tagGrid}>
              {companyInfo.serviceAreas.map((area, idx) => (
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
              <h3>Giao Hàng Tận Nơi Các KCN Trọng Điểm</h3>
            </div>
            <ul className={styles.kcnList}>
              {kcnList.map((kcn, idx) => (
                <li key={idx} className={styles.kcnItem}>
                  <Check size={16} color="var(--accent)" />
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
