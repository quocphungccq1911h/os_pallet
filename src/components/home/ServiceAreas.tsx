import React from 'react';
import { MapPin, Truck, CheckCircle2 } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './ServiceAreas.module.css';

export const ServiceAreas: React.FC = () => {
  const kcnList = [
    "KCN Vĩnh Lộc, Tân Bình, Hiệp Phước, Tân Tạo (TP.HCM)",
    "KCN VSIP 1, 2, 3 & Sóng Thần 1, 2, 3 (Bình Dương)",
    "KCN Mỹ Phước, Bàu Bàng, Nam Tân Uyên (Bình Dương)",
    "KCN Amata, Biên Hòa 1, 2 & Nhơn Trạch (Đồng Nai)",
    "KCN Long Hậu, Tân Đức, Hải Sơn, Đức Hòa (Long An)",
    "KCN Trảng Bàng, Phước Đông (Tây Ninh)",
    "Cụm Cảng Cát Lái, Cảng SP-PSA, Cảng Hiệp Phước (Đóng cont)",
    "Nhận cử thợ cơ động lắp ráp thùng gỗ tận kho đối tác"
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.flexGrid}>
          <div className={styles.infoSide}>
            <span className="section-tag">KHU VỰC PHỤC VỤ & GIAO HÀNG</span>
            <h2 className={styles.title}>Giao Hàng Tận Nơi & Hỗ Trợ Đóng Gói Tại Các KCN Phía Nam</h2>
            <p className={styles.desc}>
              Với xưởng sản xuất đặt tại Hóc Môn (vị trí kết nối nhanh giữa TP.HCM – Bình Dương – Long An – Tây Ninh), chúng tôi chủ động điều phối xe tải giao hàng nhanh trong ngày, đồng thời cử đội thợ xuống tận kho đối tác để đo đạc máy móc, chèn lót và lắp ráp thùng gỗ kiên cố kịp tiến độ xuất container.
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
              <h3>Tuyến Giao Hàng & Lắp Ráp Trọng Điểm</h3>
            </div>
            <ul className={styles.kcnList}>
              {kcnList.map((kcn, idx) => (
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
