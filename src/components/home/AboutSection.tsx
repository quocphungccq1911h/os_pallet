import React from 'react';
import { companyInfo } from '@/data/companyInfo';
import { Award, CheckCircle, Factory, Shield, Truck } from 'lucide-react';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {/* Left Visual Column */}
        <div className={styles.imageCol}>
          <div className={styles.mainImgWrapper}>
            <img
              src="/images/banner_main.png"
              alt="Xưởng Pallet Gỗ & Thùng Gỗ Trường An"
              className={styles.mainImg}
            />
          </div>
        </div>

        {/* Right Info Column */}
        <div className={styles.infoCol}>
          <span className="section-tag">
            <Factory size={14} /> GIỚI THIỆU XƯỞNG SẢN XUẤT
          </span>

          <h2 className={styles.title}>
            Năng Lực Sản Xuất & Uy Tín Thương Hiệu {companyInfo.shortName}
          </h2>

          <p className={styles.description}>
            <strong>{companyInfo.name}</strong> (tọa lạc tại số 361/75 Huỳnh Thị Na, Đông Thạnh, Hóc Môn, TP.HCM) là xưởng chuyên môn hóa sản xuất Pallet gỗ (gỗ thông, gỗ tràm), Pallet ván ép Plywood và đóng kiện Thùng Gỗ chuyên dụng cho máy móc thiết bị công nghiệp. Chúng tôi là đối tác tin cậy của hàng trăm xí nghiệp, kho vận tại TP.HCM, Bình Dương, Long An và các công ty đóng container xuất khẩu sang Campuchia, Mỹ, Châu Âu.
          </p>

          <div className={styles.bulletList}>
            <div className={styles.bulletItem}>
              <Award className={styles.bulletIcon} size={22} />
              <div>
                <h4>Đóng Thùng Gỗ & Gia Công Theo Bản Vẽ Riêng</h4>
                <p>Nhận đóng thùng gỗ kín, thùng thưa theo đúng thông số kích thước và trọng lượng máy móc.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Shield className={styles.bulletIcon} size={22} />
              <div>
                <h4>Pallet Ván Ép & Khử Trùng ISPM 15 Đạt Chuẩn</h4>
                <p>Đáp ứng đầy đủ tiêu chuẩn kiểm dịch xuất khẩu container đường biển và hàng air quốc tế.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Truck className={styles.bulletIcon} size={22} />
              <div>
                <h4>Giao Hàng Tận Nơi Bằng Xe Tải Riêng</h4>
                <p>Vận chuyển nhanh chóng đến kho xưởng tại Hóc Môn, Củ Chi, Q.12, Bình Dương, Long An, Đồng Nai.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
