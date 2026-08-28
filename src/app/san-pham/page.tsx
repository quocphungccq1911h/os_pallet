'use client';

import React, { useState } from 'react';
import { products, categories } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, Box } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import styles from './sanpham.module.css';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { openQuoteModal } = useQuoteModal();

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.woodType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.pageWrapper}>
      {/* Banner Top Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            <Box size={14} /> DANH MỤC PALLET GỖ
          </span>
          <h1 className={styles.pageTitle}>Tất Cả Sản Phẩm Pallet Gỗ Mới, Cũ & Xuất Khẩu</h1>
          <p className={styles.pageDesc}>
            Tổng hợp danh mục pallet gỗ tràm, keo, sấy HT khử trùng ISPM 15 chuẩn kích thước kho bãi và đóng theo yêu cầu.
          </p>
        </div>
      </div>

      <div className={`container ${styles.contentGrid}`}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>
              <Search size={18} /> Tìm Kích Thước / Sản Phẩm
            </h3>
            <input
              type="text"
              placeholder="Nhập kích thước 1200x1000, tràm..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>
              <Filter size={18} /> Nhóm Danh Mục
            </h3>
            <div className={styles.categoryList}>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`${styles.catBtn} ${selectedCategory === 'all' ? styles.catActive : ''}`}
              >
                <span>Tất Cả Pallet ({products.length})</span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`${styles.catBtn} ${selectedCategory === cat.slug ? styles.catActive : ''}`}
                  >
                    <span>{cat.name}</span>
                    <span className={styles.catCount}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.ctaBox}>
            <h4>Cần Pallet Đóng Riêng?</h4>
            <p>Nhà xưởng gia công theo đúng bản vẽ mẫu của doanh nghiệp bạn.</p>
            <button onClick={() => openQuoteModal()} className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Yêu Cầu Đóng Mẫu
            </button>
          </div>
        </aside>

        {/* Product Grid Main Area */}
        <main className={styles.mainArea}>
          <div className={styles.resultBar}>
            <span>Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm pallet</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpenQuoteModal={(slug) => openQuoteModal(slug)} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <p>Không tìm thấy sản phẩm phù hợp với từ khóa &quot;{searchQuery}&quot;.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="btn btn-outline">
                Xóa Bộ Lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
