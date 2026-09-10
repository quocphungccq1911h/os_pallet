import React from 'react';
import { Flame, Box, Recycle, Truck, ShieldCheck, PenTool } from 'lucide-react';
import styles from './ServicesSection.module.css';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <PenTool size={22} />,
      title: "Gia Công Pallet Theo Yêu Cầu",
      desc: "Thiết kế và đóng mới pallet theo bản vẽ riêng của từng loại máy móc, kiện hàng."
    },
    {
      icon: <Flame size={22} />,
      title: "Sấy Gỗ & Khử Trùng ISPM 15",
      desc: "Dịch vụ sấy nhiệt HT độc lập và cấp chứng thư khử trùng cho kiện hàng xuất khẩu."
    },
    {
      icon: <Recycle size={22} />,
      title: "Thu Mua & Thanh Lý Pallet Cũ",
      desc: "Thu mua pallet gỗ cũ tận nơi số lượng lớn, sửa chữa và phân phối lại giá rẻ."
    },
    {
      icon: <Box size={22} />,
      title: "Đóng Thùng Gỗ / Kiện Gỗ",
      desc: "Đóng thùng gỗ kín, kiện nan thưa bảo vệ máy móc thiết bị giá trị cao xuất khẩu."
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">DỊCH VỤ LIÊN QUAN</span>
          <h2 className="section-title">Các Dịch Vụ Hỗ Trợ Doanh Nghiệp</h2>
          <p className="section-subtitle">
            Cung cấp giải pháp toàn diện từ sản xuất, xử lý tiêu chuẩn đến đóng gói và vận chuyển.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox}>{s.icon}</div>
                <h3 className={styles.title}>{s.title}</h3>
              </div>
              <p className={styles.desc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
