'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { companyInfo } from '@/data/companyInfo';
import { ShieldCheck, Phone, MessageCircle, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import styles from './detail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openQuoteModal } = useQuoteModal();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Không Tìm Thấy Sản Phẩm Pallet Này</h2>
        <p style={{ margin: '1rem 0 2rem 0' }}>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã thay đổi địa chỉ.</p>
        <Link href="/san-pham" className="btn btn-primary">
          <ArrowLeft size={16} /> Quay Lại Danh Mục
        </Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      '@type': 'Offer',
      price: 'Liên hệ',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/san-pham">Sản phẩm Pallet</Link>
          <span>/</span>
          <span className={styles.activeCrumb}>{product.name}</span>
        </div>

        {/* Product Detail Main Grid */}
        <div className={styles.detailGrid}>
          {/* Left Column: Product Gallery */}
          <div className={styles.imageCol}>
            <div className={styles.mainImgCard}>
              <img src={product.imageUrl} alt={product.name} className={styles.mainImg} />
              {product.isExportStandard && (
                <span className={styles.exportBadge}>ISPM 15 Xuất Khẩu</span>
              )}
            </div>
            <div className={styles.qualityBanner}>
              <ShieldCheck size={24} color="var(--primary)" />
              <div>
                <strong>Cam kết sấy HT đạt ẩm &lt; 18%</strong>
                <p>Nguồn gỗ chọn lọc, bắn đinh xoắn liên kết siêu chắc</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Actions */}
          <div className={styles.infoCol}>
            <span className="section-tag">{product.category}</span>
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Price Box */}
            <div className={styles.priceCard}>
              <span className={styles.priceTitle}>Giá sản phẩm:</span>
              <span className="badge badge-price" style={{ fontSize: '1.25rem', padding: '0.4rem 1rem' }}>
                {product.priceDisplay}
              </span>
              <span className={styles.priceSub}>(Chiết khấu cao cho đơn hàng số lượng lớn)</span>
            </div>

            {/* Specs Table */}
            <div className={styles.specBox}>
              <h3 className={styles.specBoxTitle}>Thông Số Kỹ Thuật Chi Tiết</h3>
              <div className={styles.specRow}>
                <span className={styles.specName}>Kích thước tổng thể:</span>
                <span className={styles.specVal}><strong>{product.dimensions}</strong></span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Chất liệu gỗ:</span>
                <span className={styles.specVal}>{product.woodType}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Tải trọng tĩnh:</span>
                <span className={styles.specVal}>{product.staticLoad}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Tải trọng động:</span>
                <span className={styles.specVal}>{product.dynamicLoad}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Quy cách nâng:</span>
                <span className={styles.specVal}>{product.specification}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>Mục đích sử dụng:</span>
                <span className={styles.specVal}>{product.usagePurpose}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionGroup}>
              <button onClick={() => openQuoteModal(product.slug)} className="btn btn-primary" style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', flex: 1 }}>
                <FileText size={20} />
                <span>Nhận Báo Giá Bản Vẽ</span>
              </button>

              <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-zalo">
                <MessageCircle size={20} />
                <span>Chat Zalo</span>
              </a>

              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline">
                <Phone size={20} />
                <span>Hotline</span>
              </a>
            </div>
          </div>
        </div>

        {/* Product Full Description & Highlights */}
        <div className={styles.descSection}>
          <h2 className={styles.sectionHeading}>Chi Tiết Sản Phẩm & Ưu Điểm Nổi Bật</h2>
          <p className={styles.descContent}>{product.description}</p>

          <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 1rem 0', color: 'var(--secondary)' }}>
            Đặc Điểm Kỹ Thuật Nổi Bật:
          </h3>
          <ul className={styles.highlightList}>
            {product.highlights.map((h, i) => (
              <li key={i}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
