import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { products as defaultProducts, categories, Product } from '@/data/products';
import { ProductCard } from '../ProductCard';
import { ArrowRight, Filter } from 'lucide-react';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  onOpenQuoteModal: (slug: string) => void;
}

const HOME_DISPLAY_LIMIT = 12;

/**
 * Chọn 12 mẫu tiêu biểu trải đều các dòng chủ lực khi ở tab "Tất Cả Sản Phẩm" trên Trang chủ
 */
function pickFeaturedForAll(list: Product[]): Product[] {
  const quotas: Record<string, number> = {
    'pallet-go-tram': 4,
    'pallet-go-thong': 2,
    'pallet-van-ep': 2,
    'pallet-theo-yeu-cau': 1,
    'pallet-nhua-moi': 1,
    'thung-go-dong-hang': 1,
    'thung-nhua': 1,
  };

  const picked: Product[] = [];
  const usedIds = new Set<string>();

  // Với pallet-go-tram, ưu tiên lấy 2 mẫu đố bằng (pta-t) + 2 mẫu 9 gù (pta-g)
  const tramGanh = list.filter((p) => p.categorySlug === 'pallet-go-tram' && p.id.startsWith('pta-t')).slice(0, 2);
  const tramGu = list.filter((p) => p.categorySlug === 'pallet-go-tram' && p.id.startsWith('pta-g')).slice(0, 2);
  for (const p of [...tramGanh, ...tramGu]) {
    picked.push(p);
    usedIds.add(p.id);
  }

  for (const [catSlug, quota] of Object.entries(quotas)) {
    if (catSlug === 'pallet-go-tram') continue;
    const matches = list.filter((p) => p.categorySlug === catSlug && !usedIds.has(p.id)).slice(0, quota);
    for (const p of matches) {
      picked.push(p);
      usedIds.add(p.id);
    }
  }

  // Bổ sung nếu chưa đủ 12
  for (const p of list) {
    if (picked.length >= HOME_DISPLAY_LIMIT) break;
    if (!usedIds.has(p.id)) {
      picked.push(p);
      usedIds.add(p.id);
    }
  }

  return picked.slice(0, HOME_DISPLAY_LIMIT);
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onOpenQuoteModal }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllProducts(data);
          }
        }
      } catch {
        // keep fallback
      }
    }
    fetchLatest();
  }, []);

  const categoryMatches = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter((p) => p.categorySlug === selectedCategory);
  }, [allProducts, selectedCategory]);

  const displayedProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return pickFeaturedForAll(allProducts);
    }
    return categoryMatches.slice(0, HOME_DISPLAY_LIMIT);
  }, [allProducts, categoryMatches, selectedCategory]);

  const activeCatObj = categories.find((c) => c.slug === selectedCategory);
  const viewMoreHref =
    selectedCategory === 'all' ? '/san-pham' : `/san-pham?category=${selectedCategory}`;

  return (
    <section className={styles.section} id="san-pham">
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <span className="section-tag">
              <Filter size={14} /> SẢN PHẨM PALLET &amp; THÙNG CHỦ LỰC
            </span>
            <h2 className={styles.title}>Danh Mục &amp; Sản Phẩm Tiêu Chuẩn Tại Xưởng</h2>
          </div>

          <Link href="/san-pham" className="btn btn-outline">
            <span>Xem Tất Cả ({allProducts.length} Mẫu)</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterBar}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.activeFilter : ''}`}
          >
            Nổi Bật ({allProducts.length})
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

        {/* Product Cards Grid (12 items max on Homepage) */}
        <div className={styles.productGrid}>
          {displayedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onOpenQuoteModal={onOpenQuoteModal} />
          ))}
        </div>

        {/* View All CTA when category has more than 12 items */}
        {categoryMatches.length > displayedProducts.length && (
          <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
            <Link
              href={viewMoreHref}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.75rem', fontSize: '0.95rem' }}
            >
              <span>
                {selectedCategory === 'all'
                  ? `Xem đầy đủ tất cả ${allProducts.length} sản phẩm tại xưởng`
                  : `Xem đầy đủ ${categoryMatches.length} mẫu ${activeCatObj?.name || ''}`}
              </span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
