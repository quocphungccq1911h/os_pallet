import React, { useState } from 'react';
import Link from 'next/link';
import { products, categories } from '@/data/products';
import { ProductCard } from '../ProductCard';
import { ArrowRight, Filter } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  onOpenQuoteModal: (slug: string) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onOpenQuoteModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.categorySlug === selectedCategory);

  return (
    <section className={styles.section} id="san-pham">
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <span className="section-tag">
              <Filter size={14} /> SẢN PHẨM PALLET CHÍNH
            </span>
            <h2 className={styles.title}>Danh Mục & Sản Phẩm Pallet Tiêu Chuẩn</h2>
          </div>
          
          <Link href="/san-pham" className="btn btn-outline">
            <span>Xem Tất Cả Sản Phẩm</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterBar}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.activeFilter : ''}`}
          >
            Tất Cả Pallet
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`${styles.filterBtn} ${selectedCategory === cat.slug ? styles.activeFilter : ''}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className={styles.productGrid}>
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onOpenQuoteModal={onOpenQuoteModal} />
          ))}
        </div>
      </div>
    </section>
  );
};
