'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { products as defaultProducts, Product } from '@/data/products';
import { companyInfo } from '@/data/companyInfo';
import { ShieldCheck, Phone, MessageCircle, FileText, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { ProductGalleryBanner } from '@/components/ProductGalleryBanner';
import styles from './detail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openQuoteModal } = useQuoteModal();

  const [product, setProduct] = useState<Product | undefined>(() =>
    defaultProducts.find((p) => p.slug === slug)
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    defaultProducts.find((p) => p.slug === slug)?.imageUrl || ''
  );
  const [isLoading, setIsLoading] = useState(!product);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const list: Product[] = await res.json();
          const found = list.find((p) => p.slug === slug);
          if (found) {
            setProduct(found);
            setSelectedImage((prev) => prev || found.imageUrl);
          }
        }
      } catch {
        // keep current
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

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

  const imageList = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  const currentPreviewImage = selectedImage || product.imageUrl;
  const currentIdx = imageList.indexOf(currentPreviewImage);

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
            {(() => {
              const isBanner = currentPreviewImage.includes('banner_main') || currentPreviewImage.includes('banner');
              return (
                <div className={styles.mainImgCard}>
                  {isBanner ? (
                    <ProductGalleryBanner onQuoteClick={() => openQuoteModal(product.slug)} />
                  ) : (
                    <img src={currentPreviewImage} alt={product.name} className={styles.mainImg} />
                  )}
                  {!isBanner && product.isExportStandard && (
                    <span className={styles.exportBadge}>ISPM 15 Xuất Khẩu</span>
                  )}
                  {imageList.length > 1 && (
                    <span className={styles.imageCounterBadge}>
                      {currentIdx >= 0 ? currentIdx + 1 : 1} / {imageList.length} ảnh
                    </span>
                  )}
                </div>
              );
            })()}

            {/* Thumbnail Row */}
            {imageList.length > 1 && (
              <div className={styles.galleryThumbnails}>
                {imageList.map((imgUrl, idx) => {
                  const isActive = currentPreviewImage === imgUrl;
                  const isThumbBanner = imgUrl.includes('banner_main') || imgUrl.includes('banner');
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`${styles.thumbBtn} ${isActive ? styles.thumbActive : ''}`}
                      title={isThumbBanner ? 'Xem Cam Kết & Xưởng' : `Xem góc chụp ${idx + 1}`}
                      aria-label={isThumbBanner ? 'Xem Cam Kết & Xưởng' : `Xem góc chụp ${idx + 1}`}
                    >
                      <img src={imgUrl} alt={`${product.name} góc chụp ${idx + 1}`} className={styles.thumbImg} />
                      {isThumbBanner && (
                        <span className={styles.bannerThumbBadge}>XƯỞNG</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

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

            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '0.5rem 0 1rem 0' }}>
                {product.badges.map((b, idx) => (
                  <span key={idx} className={idx === 0 ? "badge badge-export" : "badge badge-new"}>
                    {b}
                  </span>
                ))}
              </div>
            )}

            {/* Modern B2B Price & Quote Card */}
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceMeta}>
                  <span className={styles.priceLabel}>Giá sản xuất trực tiếp</span>
                  <div className={styles.priceValueWrapper}>
                    <span className={styles.priceValue}>
                      {product.priceDisplay === 'Liên hệ' ? 'Giá Gốc Tận Xưởng' : product.priceDisplay}
                    </span>
                    <span className={styles.priceBadgeNote}>Báo giá theo bản vẽ &amp; số lượng</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openQuoteModal(product.slug)}
                  className={styles.priceCtaBtn}
                  title="Nhận báo giá nhanh trong 15 phút"
                >
                  <FileText size={16} />
                  <span>Báo Giá Nhanh 15 Phút</span>
                </button>
              </div>

              <div className={styles.pricePerks}>
                <span className={styles.pricePerkItem}>
                  <CheckCircle2 size={14} color="#15803d" />
                  Chiết khấu 5% - 10% đơn hàng lớn &amp; hợp đồng tháng
                </span>
                <span className={styles.pricePerkDivider}>•</span>
                <span className={styles.pricePerkItem}>
                  <CheckCircle2 size={14} color="#15803d" />
                  Hỗ trợ công nợ đối tác nhà máy
                </span>
              </div>
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

        {/* Facebook Proof of Work */}
        {product.facebookProof && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1877f2', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ background: '#1877f2', color: '#fff', width: '18px', height: '18px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>f</span>
                HOẠT ĐỘNG XƯỞNG THỰC TẾ TRÊN FANPAGE
              </span>
              <h4 style={{ margin: '0.35rem 0', color: 'var(--secondary)' }}>{product.facebookProof.title}</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>{product.facebookProof.description}</p>
            </div>
            <a
              href={product.facebookProof.fbUrl || "https://www.facebook.com/PalletTruongAn/"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ borderColor: '#1877f2', color: '#1877f2' }}
            >
              <span>Xem bài đăng trên Facebook</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

