import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import styles from './RealGallery.module.css';

export const RealGallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      caption: "Khu vực tập kết Pallet gỗ thông & tràm tại xưởng Trường An Hóc Môn"
    },
    {
      url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      caption: "Thợ mộc gia công đóng kiện thùng gỗ bảo vệ máy móc xuất khẩu"
    },
    {
      url: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      caption: "Pallet ván ép Plywood mặt phẳng kín phục vụ đóng hàng container"
    },
    {
      url: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      caption: "Xử lý nhiệt HT và đóng mộc khử trùng tiêu chuẩn quốc tế ISPM 15"
    },
    {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      caption: "Bốc xếp pallet lên xe tải giao tận nơi các KCN Hóc Môn, Bình Dương, Long An"
    },
    {
      url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      caption: "Pallet gỗ cũ tuyển chọn chất lượng cao mới 85% - 95%"
    }
  ];


  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">
            <Camera size={14} /> HÌNH ẢNH THỰC TẾ
          </span>
          <h2 className="section-title">Hình Ảnh Thực Tế Xưởng & Quy Trình Sản Xuất</h2>
          <p className="section-subtitle">
            Minh bạch năng lực sản xuất với hình ảnh chụp thực tế tại xưởng và các đơn hàng đã bàn giao cho khách hàng.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.galleryItem}>
              <img src={img.url} alt={img.caption} className={styles.galleryImg} loading="lazy" />
              <div className={styles.overlay}>
                <ImageIcon size={24} color="#ffffff" />
                <p className={styles.caption}>{img.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
