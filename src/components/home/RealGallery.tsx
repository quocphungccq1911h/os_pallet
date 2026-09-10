import React from 'react';
import Link from 'next/link';
import { Camera, Image as ImageIcon, ArrowRight } from 'lucide-react';
import styles from './RealGallery.module.css';

export const RealGallery: React.FC = () => {
  const images = [
    {
      url: "/images/pallet_factory_43.jpg",
      caption: "Khu vực xưởng sản xuất Pallet Trường An tại Hóc Môn"
    },
    {
      url: "/images/products/p4.1.jpg",
      caption: "Gia công pallet gỗ chịu tải nặng theo bản vẽ máy móc xuất khẩu"
    },
    {
      url: "/images/products/p2.1.jpg",
      caption: "Pallet gỗ thông mới đố khuyết 1200 x 1000 x 120mm xuất khẩu ISPM 15"
    },
    {
      url: "/images/products/p5.1.jpg",
      caption: "Pallet gỗ chân gù 1219 x 1016 x 140mm nâng 4 hướng chuẩn xuất khẩu"
    },
    {
      url: "/images/products/p3.1.jpg",
      caption: "Pallet gỗ thông mới 100% chuẩn thị trường Mỹ GMA"
    },
    {
      url: "/images/products/p1.1.jpg",
      caption: "Pallet đố ván ép Plywood xuất khẩu Campuchia"
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">
            <Camera size={14} /> HÌNH ẢNH THỰC TẾ 100%
          </span>
          <h2 className="section-title">Hình Ảnh Thực Tế Xưởng & Quy Trình Sản Xuất</h2>
          <p className="section-subtitle">
            Minh bạch năng lực sản xuất với hình ảnh chụp thực tế tại xưởng và các hoạt động bàn giao đơn hàng cho khách hàng.
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

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            href="/hoat-dong"
            className="btn btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', fontSize: '1rem', fontWeight: 700 }}
          >
            <span>Xem Chi Tiết Nhật Ký Hoạt Động Xưởng</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

