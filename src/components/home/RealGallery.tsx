import React from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import styles from './RealGallery.module.css';

export const RealGallery: React.FC = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      caption: "Khu vực kho tập kết Pallet gỗ tràm chuẩn bị xuất xưởng"
    },
    {
      url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      caption: "Xưởng cưa xẻ gỗ tràm & keo tự nhiên quy mô 10.000m²"
    },
    {
      url: "https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=800",
      caption: "Hệ thống lò sấy nhiệt HT đạt chuẩn khử trùng ISPM 15"
    },
    {
      url: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=800",
      caption: "Công nhân gia công bắn đinh đố chốt cố định chân pallet"
    },
    {
      url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
      caption: "Bốc xếp pallet lên xe tải giao đến KCN Sóng Thần Bình Dương"
    },
    {
      url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
      caption: "Pallet gỗ cũ được phân loại chọn lọc đạt độ mới 90%"
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
