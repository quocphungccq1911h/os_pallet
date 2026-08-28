import React from 'react';
import { ShieldCheck, DollarSign, Wrench, Clock, FileCheck, ThumbsUp } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <DollarSign size={28} />,
      title: "Giá Tận Xưởng Sản Xuất",
      desc: "Trực tiếp khai thác và gia công gỗ, cam kết báo giá cạnh tranh nhất thị trường không qua thương mại trung gian."
    },
    {
      icon: <FileCheck size={28} />,
      title: "Tiêu Chuẩn ISPM 15 Xuất Khẩu",
      desc: "Khử trùng sấy HT đúng quy định quốc tế, cung cấp đầy đủ giấy chứng nhận kiểm dịch xuất khẩu sang Mỹ, EU, Nhật."
    },
    {
      icon: <Wrench size={28} />,
      title: "Gia Công Theo Kích Thước Yêu Cầu",
      desc: "Nhận đóng pallet gỗ theo bản vẽ riêng, làm mẫu chạy thử tận kho khách hàng trước khi ký hợp đồng."
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Đảm Bảo Độ Ẩm & Chịu Tải",
      desc: "Nan gỗ sấy khô độ ẩm < 18%, không mối mọt nấm mốc, tải trọng tĩnh đạt đến 3.5 tấn."
    },
    {
      icon: <Clock size={28} />,
      title: "Giao Hàng Đúng Tiến Độ 24/7",
      desc: "Đội ngũ xe tải lớn chủ động giao hàng đến các KCN Bình Dương, Đồng Nai, TP.HCM, Long An đúng cam kết."
    },
    {
      icon: <ThumbsUp size={28} />,
      title: "Chính Sách Đổi Trả Linh Hoạt",
      desc: "Cam kết 1 đổi 1 lập tức nếu sản phẩm giao không đúng quy cách bản vẽ hoặc bị lỗi sứt mẻ do vận chuyển."
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">LÝ DO CHỌN PALLET GỖ VIỆT</span>
          <h2 className="section-title">Tại Sao Hơn 500 Doanh Nghiệp Lựa Chọn Chúng Tôi?</h2>
          <p className="section-subtitle">
            Chúng tôi hiểu rằng chất lượng pallet ảnh hưởng trực tiếp tới sự an toàn của hàng hóa và uy tín của doanh nghiệp bạn.
          </p>
        </div>

        <div className={styles.grid}>
          {reasons.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.iconBox}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
