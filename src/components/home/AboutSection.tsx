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
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=900"
              alt="Quy mô nhà xưởng sản xuất Pallet Gỗ Việt"
              className={styles.mainImg}
            />
            <div className={styles.experienceBadge}>
              <span className={styles.badgeNumber}>10+</span>
              <span className={styles.badgeText}>Năm Tiên Phong Sản Xuất Pallet B2B</span>
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className={styles.infoCol}>
          <span className="section-tag">
            <Factory size={14} /> GIỚI THIỆU DOANH NGHIỆP
          </span>

          <h2 className={styles.title}>
            Năng Lực Sản Xuất & Uy Tín Thương Hiệu {companyInfo.shortName}
          </h2>

          <p className={styles.description}>
            {companyInfo.name} tự hào là đơn vị uy tín hàng đầu trong lĩnh vực sản xuất và phân phối pallet gỗ tràm, keo, thông tại Việt Nam. Sở hữu xưởng sản xuất quy mô hơn 10.000m² tại Đồng Nai và kho phân phối Bình Dương, chúng tôi tự tin đáp ứng các đơn hàng lớn từ 500 đến 10.000 pallet/tháng cho các tập đoàn Logistics và nhà máy sản xuất.
          </p>

          <div className={styles.bulletList}>
            <div className={styles.bulletItem}>
              <Award className={styles.bulletIcon} size={22} />
              <div>
                <h4>Nguyên Liệu Gỗ Sạch Chịu Tải</h4>
                <p>Nguồn gỗ tràm & keo tự nhiên chọn lọc, xẻ sấy chuẩn độ ẩm dưới 18%.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Shield className={styles.bulletIcon} size={22} />
              <div>
                <h4>Đạt Tiêu Chuẩn Xuất Khẩu ISPM 15</h4>
                <p>Hệ thống lò sấy nhiệt HT khử trùng đạt chuẩn quốc tế cấp chứng thư xuất khẩu.</p>
              </div>
            </div>

            <div className={styles.bulletItem}>
              <Truck className={styles.bulletIcon} size={22} />
              <div>
                <h4>Đội Xe Vận Chuyển Riêng</h4>
                <p>Giao hàng chủ động tận nơi tại các KCN TP.HCM, Bình Dương, Đồng Nai, Long An.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
