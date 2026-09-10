import React from 'react';
import { Factory, ShieldCheck, Ruler, Wrench, Truck, CheckCircle2 } from 'lucide-react';
import styles from './WhyChooseUs.module.css';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Factory size={26} />,
      title: "Sản Xuất Trực Tiếp Tại Xưởng Hóc Môn",
      desc: "Chủ động nguồn gỗ thông, tràm và ván ép tại xưởng Hóc Môn. Giá xuất xưởng cạnh tranh, không qua bất kỳ đơn vị thương mại trung gian nào."
    },
    {
      icon: <ShieldCheck size={26} />,
      title: "Đạt Tiêu Chuẩn ISPM 15 Xuất Khẩu",
      desc: "Xử lý nhiệt HT đạt chuẩn quốc tế, kiểm soát độ ẩm an toàn, cấp đầy đủ chứng thư kiểm dịch phục vụ thông quan đi Mỹ, Châu Âu, Nhật Bản, Hàn Quốc."
    },
    {
      icon: <Ruler size={26} />,
      title: "Gia Công Mẫu Trình Khách Hàng Thực Tế",
      desc: "Nhận gia công mẫu thực tế theo đúng kích thước và bản vẽ kỹ thuật để đối tác kiểm tra kết cấu, thử tải thực tế trước khi ký kết đơn hàng lớn."
    },
    {
      icon: <Wrench size={26} />,
      title: "Đội Ngũ Xuống Tận Nơi Lắp Ráp Thùng Gỗ",
      desc: "Cơ động xuống tận kho và nhà máy của khách hàng để đo đạc máy móc, chèn lót an toàn và bắn đinh đóng thùng gỗ kiên cố kịp giờ đóng container."
    },
    {
      icon: <Truck size={26} />,
      title: "Chủ Động Tiến Độ – Kịp Giờ Tàu & Xe Cont",
      desc: "Thấu hiểu áp lực deadline xuất khẩu, xưởng linh hoạt tăng ca đáp ứng đơn gấp, chủ động đội xe giao tận xưởng tại TP.HCM, Bình Dương, Đồng Nai, Long An."
    },
    {
      icon: <CheckCircle2 size={26} />,
      title: "Cam Kết Đúng Quy Cách – Bảo Hành 1 Đổi 1",
      desc: "Gỗ tuyển chọn đạt chuẩn, đinh xoắn chuyên dụng chống bung nứt, chịu tải trọng lớn. Đổi trả ngay 100% nếu phát hiện sai lệch quy cách bản vẽ."
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">VÌ SAO CHỌN PALLET TRƯỜNG AN</span>
          <h2 className="section-title">Năng Lực Sản Xuất & Cam Kết Đồng Hành Cùng Hàng Xuất Khẩu</h2>
          <p className="section-subtitle">
            Chúng tôi hiểu rằng mỗi kiện pallet và thùng gỗ ảnh hưởng trực tiếp tới sự an toàn của hàng hóa, máy móc và tiến độ thông quan của doanh nghiệp.
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

