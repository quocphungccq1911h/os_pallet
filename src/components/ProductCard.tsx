import React from 'react';
import Link from 'next/link';
import { Product } from '@/data/products';
import { ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onOpenQuoteModal: (productSlug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenQuoteModal }) => {
  return (
    <div className={`card ${styles.productCard}`}>
      {/* Product Image Box */}
      <div className={styles.imageContainer}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} loading="lazy" />
        
        {/* Badges */}
        <div className={styles.badgeGroup}>
          {product.isExportStandard && (
            <span className="badge badge-export">ISPM 15 Xuất Khẩu</span>
          )}
          {product.isNew ? (
            <span className="badge badge-new">Pallet Mới 100%</span>
          ) : (
            <span className="badge badge-new" style={{ backgroundColor: '#fef3c7', color: '#92400e' }}>Cũ 90%</span>
          )}
        </div>
      </div>

      {/* Product Body */}
      <div className={styles.body}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.title}>
          <Link href={`/san-pham/${product.slug}`}>{product.name}</Link>
        </h3>

        {/* Specifications Grid */}
        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Kích thước:</span>
            <span className={styles.specValue}>{product.dimensions}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Chất liệu:</span>
            <span className={styles.specValue}>{product.woodType}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Tải tĩnh / Động:</span>
            <span className={styles.specValue}>{product.staticLoad} / {product.dynamicLoad}</span>
          </div>
        </div>

        {/* Price Display */}
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Giá sản phẩm:</span>
          <span className="badge badge-price">{product.priceDisplay}</span>
        </div>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href={`/san-pham/${product.slug}`} className="btn btn-outline" style={{ flex: 1, padding: '0.55rem' }}>
            <span>Chi Tiết</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => onOpenQuoteModal(product.slug)}
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.55rem' }}
          >
            <PhoneCall size={14} />
            <span>Báo Giá</span>
          </button>
        </div>
      </div>
    </div>
  );
};
