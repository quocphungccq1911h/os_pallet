'use client';

import React, { useState, useEffect } from 'react';
import { products as defaultProducts, categories, Product } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { Search, Filter, Box, Globe, Layers, ExternalLink, RotateCcw, Check, X } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import styles from './sanpham.module.css';

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const { openQuoteModal } = useQuoteModal();

  // Đồng bộ sản phẩm từ API (nếu admin vừa thêm/sửa/xóa)
  useEffect(() => {
    async function fetchLatestProducts() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllProducts(data);
          }
        }
      } catch {
        // Fallback giữ nguyên defaultProducts
      }
    }
    fetchLatestProducts();
  }, []);

  // Quick Filter preset helpers
  const handleQuickFilter = (type: string, value: string) => {
    if (type === 'all') {
      setSelectedCategory('all');
      setSelectedMaterial('all');
      setSelectedMarket('all');
      setSearchQuery('');
    } else if (type === 'market') {
      setSelectedMarket(value);
      setSelectedCategory('all');
      setSelectedMaterial('all');
    } else if (type === 'category') {
      setSelectedCategory(value);
      setSelectedMarket('all');
      setSelectedMaterial('all');
    } else if (type === 'material') {
      setSelectedMaterial(value);
      setSelectedCategory('all');
      setSelectedMarket('all');
    }
  };

  const filteredProducts = allProducts.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
    const matchesMaterial = selectedMaterial === 'all' || p.materialGroup === selectedMaterial;
    const matchesMarket = selectedMarket === 'all' || p.targetMarket === selectedMarket;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badges && p.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesMaterial && matchesMarket && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedMarket('all');
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (selectedMarket !== 'all' ? 1 : 0);

  const isFiltered = activeFilterCount > 0 || searchQuery !== '';

  return (
    <div className={styles.pageWrapper}>
      {/* Banner Top Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            <Box size={14} /> DANH MỤC SẢN PHẨM PALLET TRƯỜNG AN
          </span>
          <h1 className={styles.pageTitle}>Pallet Gỗ, Ván Ép & Thùng Gỗ Xuất Khẩu</h1>
          <p className={styles.pageDesc}>
            Pallet gỗ thông sấy xuất khẩu Mỹ, pallet tràm đi Campuchia, thùng gỗ bọc lót máy móc và pallet ván ép plywood gia công trực tiếp tại xưởng Hóc Môn.
          </p>

          {/* Quick Filter Horizontal Scroll Strip */}
          <div className={styles.quickFilterStrip}>
            <button
              onClick={() => handleQuickFilter('all', 'all')}
              className={`${styles.pillBtn} ${!isFiltered ? styles.pillActive : ''}`}
            >
              🌟 Tất Cả ({allProducts.length})
            </button>
            <button
              onClick={() => handleQuickFilter('market', 'xuat-khau-my')}
              className={`${styles.pillBtn} ${selectedMarket === 'xuat-khau-my' ? styles.pillActive : ''}`}
            >
              🇺🇸 Xuất Khẩu Mỹ
            </button>
            <button
              onClick={() => handleQuickFilter('market', 'xuat-khau-campuchia')}
              className={`${styles.pillBtn} ${selectedMarket === 'xuat-khau-campuchia' ? styles.pillActive : ''}`}
            >
              🇰🇭 Đi Campuchia
            </button>
            <button
              onClick={() => handleQuickFilter('category', 'thung-go-dong-hang')}
              className={`${styles.pillBtn} ${selectedCategory === 'thung-go-dong-hang' ? styles.pillActive : ''}`}
            >
              📦 Thùng Gỗ Máy Móc
            </button>
            <button
              onClick={() => handleQuickFilter('category', 'pallet-van-ep')}
              className={`${styles.pillBtn} ${selectedCategory === 'pallet-van-ep' ? styles.pillActive : ''}`}
            >
              🪵 Pallet Ván Ép Plywood
            </button>
            <button
              onClick={() => handleQuickFilter('material', 'go-thong')}
              className={`${styles.pillBtn} ${selectedMaterial === 'go-thong' ? styles.pillActive : ''}`}
            >
              🌲 Gỗ Thông Nhập Khẩu
            </button>
            <button
              onClick={() => handleQuickFilter('category', 'pallet-theo-yeu-cau')}
              className={`${styles.pillBtn} ${selectedCategory === 'pallet-theo-yeu-cau' ? styles.pillActive : ''}`}
            >
              📐 Đóng Theo Bản Vẽ
            </button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentGrid}`}>
        {/* Desktop Sidebar Filters */}
        <aside className={styles.sidebar}>
          {/* Search Box */}
          <div className={styles.sidebarCard}>
            <h3 className={styles.sidebarTitle}>
              <Search size={18} /> Tìm Kiếm Nhanh
            </h3>
            <input
              type="text"
              placeholder="Nhập kích thước, loại gỗ, pallet..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter by Category */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeaderFlex}>
              <h3 className={styles.sidebarTitle}>
                <Filter size={18} /> Nhóm Sản Phẩm
              </h3>
              {selectedCategory !== 'all' && (
                <button onClick={() => setSelectedCategory('all')} className={styles.clearMiniBtn}>Xóa</button>
              )}
            </div>
            <div className={styles.categoryList}>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`${styles.catBtn} ${selectedCategory === 'all' ? styles.catActive : ''}`}
              >
                <span>Tất Cả Nhóm</span>
                <span className={styles.catCount}>({allProducts.length})</span>
              </button>
              {categories.map((cat) => {
                const count = allProducts.filter((p) => p.categorySlug === cat.slug).length;
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

          {/* Filter by Material */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeaderFlex}>
              <h3 className={styles.sidebarTitle}>
                <Layers size={18} /> Chất Liệu Gỗ
              </h3>
              {selectedMaterial !== 'all' && (
                <button onClick={() => setSelectedMaterial('all')} className={styles.clearMiniBtn}>Xóa</button>
              )}
            </div>
            <div className={styles.categoryList}>
              {[
                { id: 'all', label: 'Tất Cả Chất Liệu' },
                { id: 'go-thong', label: 'Gỗ Thông Nhập Khẩu' },
                { id: 'go-tram', label: 'Gỗ Tràm Tự Nhiên' },
                { id: 'van-ep', label: 'Ván Ép Plywood' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMaterial(m.id)}
                  className={`${styles.catBtn} ${selectedMaterial === m.id ? styles.catActive : ''}`}
                >
                  <span>{m.label}</span>
                  {selectedMaterial === m.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter by Target Market */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeaderFlex}>
              <h3 className={styles.sidebarTitle}>
                <Globe size={18} /> Thị Trường Xuất Xưởng
              </h3>
              {selectedMarket !== 'all' && (
                <button onClick={() => setSelectedMarket('all')} className={styles.clearMiniBtn}>Xóa</button>
              )}
            </div>
            <div className={styles.categoryList}>
              {[
                { id: 'all', label: 'Tất Cả Thị Trường' },
                { id: 'xuat-khau-my', label: '🇺🇸 Xuất Khẩu Sang Mỹ' },
                { id: 'xuat-khau-campuchia', label: '🇰🇭 Xuất Đi Campuchia' },
                { id: 'xuat-khau-ispm15', label: '🌍 Khử Trùng ISPM 15 / Quốc Tế' },
                { id: 'noi-dia', label: '🏭 Lưu Kho & Nội Địa' },
              ].map((mk) => (
                <button
                  key={mk.id}
                  onClick={() => setSelectedMarket(mk.id)}
                  className={`${styles.catBtn} ${selectedMarket === mk.id ? styles.catActive : ''}`}
                >
                  <span>{mk.label}</span>
                  {selectedMarket === mk.id && <Check size={14} />}
                </button>
              ))}
            </div>
          </div>

          {/* Facebook Proof of Work Box */}
          <div className={styles.facebookCommunityCard}>
            <div className={styles.fbBadgeHeader}>
              <span className={styles.fbIconSmall}>f</span>
              <span>Hình Ảnh Thực Tế Fanpage</span>
            </div>
            <h4>Hoạt Động Xưởng Trường An</h4>
            <p>
              Xem hơn 100+ hình ảnh bốc xếp pallet, đóng kiện máy móc và video xưởng mộc Hóc Môn cập nhật hàng ngày trên Facebook.
            </p>
            <a
              href="https://www.facebook.com/PalletTruongAn/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.facebookLinkBtn}
            >
              <span>Xem Fanpage Facebook</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Custom Quote CTA */}
          <div className={styles.ctaBox}>
            <h4>Cần Đóng Theo Bản Vẽ?</h4>
            <p>Gửi quy cách kích thước để xưởng lên mẫu chạy thử trong 24 giờ.</p>
            <button onClick={() => openQuoteModal()} className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Yêu Cầu Đóng Mẫu
            </button>
          </div>
        </aside>

        {/* Product Grid Main Area */}
        <main className={styles.mainArea}>
          {/* Mobile Toolbar (Search + Filter Drawer trigger) */}
          <div className={styles.mobileToolBar}>
            <div className={styles.mobileSearchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Tìm kích thước, loại gỗ..."
                className={styles.mobileSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearSearchBtn}>✕</button>
              )}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className={`${styles.mobileFilterBtn} ${activeFilterCount > 0 ? styles.filterBtnActive : ''}`}
            >
              <Filter size={15} />
              <span>Lọc</span>
              {activeFilterCount > 0 && (
                <span className={styles.filterBadge}>{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* Result Count Bar */}
          <div className={styles.resultBar}>
            <div>
              <span>Hiển thị <strong>{filteredProducts.length}</strong> sản phẩm phù hợp</span>
            </div>
            {isFiltered && (
              <button onClick={resetFilters} className={styles.resetBtn}>
                <RotateCcw size={14} />
                <span>Đặt lại bộ lọc</span>
              </button>
            )}
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onOpenQuoteModal={(slug) => openQuoteModal(slug)} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>Không tìm thấy sản phẩm phù hợp</h3>
              <p>Thử bỏ bớt điều kiện lọc hoặc nhập từ khóa tìm kiếm khác.</p>
              <button onClick={resetFilters} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                <RotateCcw size={16} /> Xem tất cả sản phẩm
              </button>
            </div>
          )}

          {/* Mobile Bottom Extra Info (Facebook & Custom Quote) */}
          <div className={styles.mobileBottomWidgets}>
            <div className={styles.facebookCommunityCard}>
              <div className={styles.fbBadgeHeader}>
                <span className={styles.fbIconSmall}>f</span>
                <span>Hình Ảnh Thực Tế Fanpage</span>
              </div>
              <h4>Hoạt Động Xưởng Trường An</h4>
              <p>
                Xem hơn 100+ hình ảnh bốc xếp pallet, đóng kiện máy móc và video xưởng mộc Hóc Môn cập nhật hàng ngày trên Facebook.
              </p>
              <a
                href="https://www.facebook.com/PalletTruongAn/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.facebookLinkBtn}
              >
                <span>Xem Fanpage Facebook</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className={styles.ctaBox}>
              <h4>Cần Đóng Theo Bản Vẽ?</h4>
              <p>Gửi quy cách kích thước để xưởng lên mẫu chạy thử trong 24 giờ.</p>
              <button onClick={() => openQuoteModal()} className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
                Yêu Cầu Đóng Mẫu
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setIsMobileFilterOpen(false)}>
          <div className={styles.drawerSheet} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.drawerTitle}>
                <Filter size={18} color="var(--primary)" />
                <span>Bộ Lọc Sản Phẩm</span>
                {activeFilterCount > 0 && (
                  <span className={styles.filterBadge}>{activeFilterCount}</span>
                )}
              </div>
              <button onClick={() => setIsMobileFilterOpen(false)} className={styles.closeDrawerBtn} aria-label="Đóng bộ lọc">
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              {/* 1. Nhóm sản phẩm */}
              <div className={styles.drawerSection}>
                <h4>Nhóm Sản Phẩm</h4>
                <div className={styles.drawerChipGrid}>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`${styles.drawerChip} ${selectedCategory === 'all' ? styles.chipActive : ''}`}
                  >
                    Tất cả ({allProducts.length})
                  </button>
                  {categories.map((cat) => {
                    const count = allProducts.filter((p) => p.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`${styles.drawerChip} ${selectedCategory === cat.slug ? styles.chipActive : ''}`}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Chất liệu gỗ */}
              <div className={styles.drawerSection}>
                <h4>Chất Liệu Gỗ</h4>
                <div className={styles.drawerChipGrid}>
                  {[
                    { id: 'all', label: 'Tất cả chất liệu' },
                    { id: 'go-thong', label: 'Gỗ Thông Nhập Khẩu' },
                    { id: 'go-tram', label: 'Gỗ Tràm Tự Nhiên' },
                    { id: 'van-ep', label: 'Ván Ép Plywood' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m.id)}
                      className={`${styles.drawerChip} ${selectedMaterial === m.id ? styles.chipActive : ''}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Thị trường xuất xưởng */}
              <div className={styles.drawerSection}>
                <h4>Thị Trường & Tiêu Chuẩn</h4>
                <div className={styles.drawerChipGrid}>
                  {[
                    { id: 'all', label: 'Tất cả thị trường' },
                    { id: 'xuat-khau-my', label: '🇺🇸 Xuất Khẩu Mỹ' },
                    { id: 'xuat-khau-campuchia', label: '🇰🇭 Đi Campuchia' },
                    { id: 'xuat-khau-ispm15', label: '🌍 Khử Trùng ISPM 15' },
                    { id: 'noi-dia', label: '🏭 Lưu Kho & Nội Địa' },
                  ].map((mk) => (
                    <button
                      key={mk.id}
                      onClick={() => setSelectedMarket(mk.id)}
                      className={`${styles.drawerChip} ${selectedMarket === mk.id ? styles.chipActive : ''}`}
                    >
                      {mk.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.drawerFooter}>
              <button onClick={resetFilters} className={styles.drawerResetBtn}>
                <RotateCcw size={15} /> Xóa chọn
              </button>
              <button onClick={() => setIsMobileFilterOpen(false)} className="btn btn-primary" style={{ flex: 1 }}>
                Xem {filteredProducts.length} sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

