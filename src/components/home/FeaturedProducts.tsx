'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { products as defaultProducts, categories, Product } from '@/data/products';
import { ProductCard } from '../ProductCard';
import { ArrowRight, Filter } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategory } from '@/i18n/productLocalizer';
import styles from './FeaturedProducts.module.css';

interface FeaturedProductsProps {
  onOpenQuoteModal: (slug: string) => void;
}

const HOME_DISPLAY_LIMIT = 12;

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
  const { locale, t } = useLanguage();
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

  const localizedCategories = useMemo(
    () => categories.map((c) => localizeCategory(c, locale)),
    [locale]
  );

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

  const activeCatObj = localizedCategories.find((c) => c.slug === selectedCategory);
  const viewMoreHref =
    selectedCategory === 'all' ? '/san-pham' : `/san-pham?category=${selectedCategory}`;

  const footerBtnText =
    selectedCategory === 'all'
      ? t.featured.viewAllFooter.replace('{count}', String(allProducts.length))
      : t.featured.viewCatFooter
          .replace('{count}', String(categoryMatches.length))
          .replace('{category}', activeCatObj?.name || '');

  return (
    <section className={styles.section} id="san-pham">
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <span className="section-tag">
              <Filter size={14} /> {t.featured.tag}
            </span>
            <h2 className={styles.title}>{t.featured.title}</h2>
          </div>

          <Link href="/san-pham" className="btn btn-outline">
            <span>
              {t.featured.viewAllBtn} ({allProducts.length} {t.featured.unitModels})
            </span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className={styles.filterBar}>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`${styles.filterBtn} ${selectedCategory === 'all' ? styles.activeFilter : ''}`}
          >
            {t.featured.tabFeatured} ({allProducts.length})
          </button>
          {localizedCategories.map((cat) => (
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
          {displayedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} onOpenQuoteModal={onOpenQuoteModal} />
          ))}
        </div>

        {/* View All CTA */}
        {categoryMatches.length > displayedProducts.length && (
          <div style={{ textAlign: 'center', marginTop: '2.25rem' }}>
            <Link
              href={viewMoreHref}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.75rem', fontSize: '0.95rem' }}
            >
              <span>{footerBtnText}</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
