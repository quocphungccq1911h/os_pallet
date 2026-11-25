'use client';

import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  products as defaultProducts,
  categories,
  Product,
  PALLET_GO_SLUGS,
  PALLET_NHUA_SLUGS,
  THUNG_SLUGS,
} from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import {
  Search,
  Filter,
  Box,
  Globe,
  Layers,
  ExternalLink,
  RotateCcw,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategory, localizeProduct } from '@/i18n/productLocalizer';
import styles from './sanpham.module.css';

const ITEMS_PER_PAGE = 10;

function normalizeSearch(str?: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[×x]/g, 'x')
    .replace(/[·•()[\]—–-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildPageNumbers(current: number, total: number): (number | 'dots')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | 'dots')[] = [1];
  if (current > 3) pages.push('dots');
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (current < total - 2) pages.push('dots');
  pages.push(total);
  return pages;
}

function ProductsContent() {
  const { locale, t } = useLanguage();
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const mainTopRef = useRef<HTMLElement>(null);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlGroup = searchParams.get('group');

    if (urlCategory) {
      setSelectedCategory(urlCategory);
      setSelectedGroup('all');
      setSelectedMaterial('all');
      setSelectedMarket('all');
    } else if (urlGroup === 'pallet-go' || urlGroup === 'pallet-nhua' || urlGroup === 'thung') {
      setSelectedGroup(urlGroup);
      setSelectedCategory('all');
      setSelectedMaterial('all');
      setSelectedMarket('all');
    } else {
      setSelectedGroup('all');
      setSelectedCategory('all');
    }
  }, [searchParams]);

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
        // fallback
      }
    }
    fetchLatestProducts();
  }, []);

  const localizedCategories = useMemo(
    () => categories.map((c) => localizeCategory(c, locale)),
    [locale]
  );

  const handleQuickFilter = (type: string, value: string) => {
    if (type === 'all') {
      setSelectedGroup('all');
      setSelectedCategory('all');
      setSelectedMaterial('all');
      setSelectedMarket('all');
      setSearchQuery('');
    } else if (type === 'group') {
      setSelectedGroup(value);
      setSelectedCategory('all');
      setSelectedMarket('all');
      setSelectedMaterial('all');
    } else if (type === 'market') {
      setSelectedMarket(value);
      setSelectedGroup('all');
      setSelectedCategory('all');
      setSelectedMaterial('all');
    } else if (type === 'category') {
      setSelectedCategory(value);
      setSelectedGroup('all');
      setSelectedMarket('all');
      setSelectedMaterial('all');
    } else if (type === 'material') {
      setSelectedMaterial(value);
      setSelectedGroup('all');
      setSelectedCategory('all');
      setSelectedMarket('all');
    }
  };

  // Search matches BOTH original Vietnamese AND localized EN/ZH text!
  const filteredProducts = useMemo(() => {
    const q = normalizeSearch(searchQuery);
    return allProducts.filter((p) => {
      const matchesGroup =
        selectedGroup === 'all' ||
        (selectedGroup === 'pallet-go' && PALLET_GO_SLUGS.includes(p.categorySlug)) ||
        (selectedGroup === 'pallet-nhua' && PALLET_NHUA_SLUGS.includes(p.categorySlug)) ||
        (selectedGroup === 'thung' && THUNG_SLUGS.includes(p.categorySlug));
      const matchesCategory = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      const matchesMaterial = selectedMaterial === 'all' || p.materialGroup === selectedMaterial;
      const matchesMarket = selectedMarket === 'all' || p.targetMarket === selectedMarket;

      if (!q) return matchesGroup && matchesCategory && matchesMaterial && matchesMarket;

      const locP = locale === 'vi' ? p : localizeProduct(p, locale);
      const haystack = normalizeSearch(
        `${p.id} ${p.name} ${p.dimensions} ${p.woodType} ${p.specification} ${(p.badges || []).join(' ')} ${locP.name} ${locP.woodType} ${locP.specification}`
      );
      return matchesGroup && matchesCategory && matchesMaterial && matchesMarket && haystack.includes(q);
    });
  }, [allProducts, selectedGroup, selectedCategory, selectedMaterial, selectedMarket, searchQuery, locale]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGroup, selectedCategory, selectedMaterial, selectedMarket, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
  const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, filteredProducts.length);
  const paginatedProducts = filteredProducts.slice(startIdx, endIdx);

  const goToPage = (page: number) => {
    const target = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(target);
    mainTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const resetFilters = () => {
    setSelectedGroup('all');
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedMarket('all');
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedGroup !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedMaterial !== 'all' ? 1 : 0) +
    (selectedMarket !== 'all' ? 1 : 0);

  const isFiltered = activeFilterCount > 0 || searchQuery !== '';

  const activeCatObj = localizedCategories.find((c) => c.slug === selectedCategory);
  const pageHeading = activeCatObj
    ? activeCatObj.name
    : selectedGroup === 'pallet-go'
      ? t.catalog.qfWoodPallet
      : selectedGroup === 'pallet-nhua'
        ? t.catalog.qfPlasticPallet
        : selectedGroup === 'thung'
          ? t.catalog.qfCrates
          : t.catalog.headerTitle;

  const materialOptions = [
    { id: 'all', label: t.catalog.matAll },
    { id: 'go-tram', label: t.catalog.matTram },
    { id: 'go-thong', label: t.catalog.matThong },
    { id: 'van-ep', label: t.catalog.matPlywood },
    { id: 'nhua', label: t.catalog.matPlastic },
  ];

  const marketOptions = [
    { id: 'all', label: t.catalog.mkAll },
    { id: 'xuat-khau-my', label: t.catalog.mkUs },
    { id: 'xuat-khau-campuchia', label: t.catalog.mkCam },
    { id: 'xuat-khau-ispm15', label: t.catalog.mkIspm },
    { id: 'noi-dia', label: t.catalog.mkDom },
  ];

  const showingText =
    filteredProducts.length > 0
      ? t.catalog.showingRange
          .replace('{start}', String(startIdx + 1))
          .replace('{end}', String(endIdx))
          .replace('{total}', String(filteredProducts.length))
          .replace('{page}', String(safePage))
          .replace('{pages}', String(totalPages))
      : t.catalog.showingZero;

  return (
    <div className={styles.pageWrapper}>
      {/* Banner Top Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span
            className="section-tag"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            <Box size={14} /> {t.catalog.headerTag}
          </span>
          <h1 className={styles.pageTitle}>{pageHeading}</h1>
          <p className={styles.pageDesc}>{t.catalog.headerDesc}</p>

          {/* Quick Filter Horizontal Strip */}
          <div className={styles.quickFilterStrip}>
            <button
              onClick={() => handleQuickFilter('all', 'all')}
              className={`${styles.pillBtn} ${!isFiltered ? styles.pillActive : ''}`}
            >
              🌟 {t.catalog.qfAll} ({allProducts.length})
            </button>
            <button
              onClick={() => handleQuickFilter('group', 'pallet-go')}
              className={`${styles.pillBtn} ${selectedGroup === 'pallet-go' ? styles.pillActive : ''}`}
            >
              🪵 {t.catalog.qfWoodPallet}
            </button>
            <button
              onClick={() => handleQuickFilter('group', 'pallet-nhua')}
              className={`${styles.pillBtn} ${selectedGroup === 'pallet-nhua' ? styles.pillActive : ''}`}
            >
              🟦 {t.catalog.qfPlasticPallet}
            </button>
            <button
              onClick={() => handleQuickFilter('group', 'thung')}
              className={`${styles.pillBtn} ${selectedGroup === 'thung' ? styles.pillActive : ''}`}
            >
              📦 {t.catalog.qfCrates}
            </button>
            <button
              onClick={() => handleQuickFilter('market', 'xuat-khau-my')}
              className={`${styles.pillBtn} ${selectedMarket === 'xuat-khau-my' ? styles.pillActive : ''}`}
            >
              {t.catalog.qfExportUs}
            </button>
            <button
              onClick={() => handleQuickFilter('market', 'xuat-khau-ispm15')}
              className={`${styles.pillBtn} ${selectedMarket === 'xuat-khau-ispm15' ? styles.pillActive : ''}`}
            >
              {t.catalog.qfIspm15}
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
              <Search size={18} /> {t.catalog.searchTitle}
            </h3>
            <input
              type="text"
              placeholder={t.catalog.searchPh}
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter by Category */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeaderFlex}>
              <h3 className={styles.sidebarTitle}>
                <Filter size={18} /> {t.catalog.catTitle}
              </h3>
              {selectedCategory !== 'all' && (
                <button onClick={() => setSelectedCategory('all')} className={styles.clearMiniBtn}>
                  {t.catalog.clearMini}
                </button>
              )}
            </div>
            <div className={styles.categoryList}>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedGroup('all');
                }}
                className={`${styles.catBtn} ${
                  selectedCategory === 'all' && selectedGroup === 'all' ? styles.catActive : ''
                }`}
              >
                <span>{t.catalog.allCategories}</span>
                <span className={styles.catCount}>({allProducts.length})</span>
              </button>
              {localizedCategories.map((cat) => {
                const count = allProducts.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setSelectedGroup('all');
                    }}
                    className={`${styles.catBtn} ${
                      selectedCategory === cat.slug ? styles.catActive : ''
                    }`}
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
                <Layers size={18} /> {t.catalog.matTitle}
              </h3>
              {selectedMaterial !== 'all' && (
                <button onClick={() => setSelectedMaterial('all')} className={styles.clearMiniBtn}>
                  {t.catalog.clearMini}
                </button>
              )}
            </div>
            <div className={styles.categoryList}>
              {materialOptions.map((m) => (
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

          {/* Filter by Market */}
          <div className={styles.sidebarCard}>
            <div className={styles.sidebarHeaderFlex}>
              <h3 className={styles.sidebarTitle}>
                <Globe size={18} /> {t.catalog.marketTitle}
              </h3>
              {selectedMarket !== 'all' && (
                <button onClick={() => setSelectedMarket('all')} className={styles.clearMiniBtn}>
                  {t.catalog.clearMini}
                </button>
              )}
            </div>
            <div className={styles.categoryList}>
              {marketOptions.map((mk) => (
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

          {/* Facebook Proof Card */}
          <div className={styles.facebookCommunityCard}>
            <div className={styles.fbBadgeHeader}>
              <span className={styles.fbIconSmall}>f</span>
              <span>{t.catalog.fbBadge}</span>
            </div>
            <h4>{t.catalog.fbTitle}</h4>
            <p>{t.catalog.fbDesc}</p>
            <a
              href="https://www.facebook.com/PalletTruongAn/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.facebookLinkBtn}
            >
              <span>{t.catalog.fbBtn}</span>
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Custom Quote CTA */}
          <div className={styles.ctaBox}>
            <h4>{t.catalog.ctaTitle}</h4>
            <p>{t.catalog.ctaDesc}</p>
            <button
              onClick={() => openQuoteModal()}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.75rem' }}
            >
              {t.catalog.ctaBtn}
            </button>
          </div>
        </aside>

        {/* Product Grid Main Area */}
        <main ref={mainTopRef} className={styles.mainArea}>
          {/* Mobile Toolbar */}
          <div className={styles.mobileToolBar}>
            <div className={styles.mobileSearchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                placeholder={t.catalog.searchPh}
                className={styles.mobileSearchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className={styles.clearSearchBtn}>
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className={`${styles.mobileFilterBtn} ${
                activeFilterCount > 0 ? styles.filterBtnActive : ''
              }`}
            >
              <Filter size={15} />
              <span>{t.catalog.mobileFilterBtn}</span>
              {activeFilterCount > 0 && (
                <span className={styles.filterBadge}>{activeFilterCount}</span>
              )}
            </button>
          </div>

          {/* Result Count Bar */}
          <div className={styles.resultBar}>
            <div>
              <span>{showingText}</span>
            </div>
            {isFiltered && (
              <button onClick={resetFilters} className={styles.resetBtn}>
                <RotateCcw size={14} />
                <span>{t.catalog.resetFilter}</span>
              </button>
            )}
          </div>

          {/* Product Cards Grid + Pagination */}
          {filteredProducts.length > 0 ? (
            <>
              <div className={styles.productGrid}>
                {paginatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onOpenQuoteModal={(slug) => openQuoteModal(slug)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <nav className={styles.paginationWrap} aria-label="Pagination">
                  <button
                    type="button"
                    onClick={() => goToPage(safePage - 1)}
                    disabled={safePage === 1}
                    className={styles.pageNavBtn}
                  >
                    <ChevronLeft size={16} />
                    <span>{t.catalog.prevPage}</span>
                  </button>

                  <div className={styles.pageNumbers}>
                    {buildPageNumbers(safePage, totalPages).map((item, idx) =>
                      item === 'dots' ? (
                        <span key={`dots-${idx}`} className={styles.pageDots}>
                          …
                        </span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          onClick={() => goToPage(item)}
                          aria-current={safePage === item ? 'page' : undefined}
                          className={`${styles.pageNumBtn} ${
                            safePage === item ? styles.pageNumActive : ''
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(safePage + 1)}
                    disabled={safePage === totalPages}
                    className={styles.pageNavBtn}
                  >
                    <span>{t.catalog.nextPage}</span>
                    <ChevronRight size={16} />
                  </button>
                </nav>
              )}
            </>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🔍</div>
              <h3>{t.catalog.emptyTitle}</h3>
              <p>{t.catalog.emptyDesc}</p>
              <button
                onClick={resetFilters}
                className="btn btn-primary"
                style={{ marginTop: '1rem' }}
              >
                <RotateCcw size={16} /> {t.catalog.emptyBtn}
              </button>
            </div>
          )}

          {/* Mobile Bottom Extra Info */}
          <div className={styles.mobileBottomWidgets}>
            <div className={styles.facebookCommunityCard}>
              <div className={styles.fbBadgeHeader}>
                <span className={styles.fbIconSmall}>f</span>
                <span>{t.catalog.fbBadge}</span>
              </div>
              <h4>{t.catalog.fbTitle}</h4>
              <p>{t.catalog.fbDesc}</p>
              <a
                href="https://www.facebook.com/PalletTruongAn/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.facebookLinkBtn}
              >
                <span>{t.catalog.fbBtn}</span>
                <ExternalLink size={14} />
              </a>
            </div>

            <div className={styles.ctaBox}>
              <h4>{t.catalog.ctaTitle}</h4>
              <p>{t.catalog.ctaDesc}</p>
              <button
                onClick={() => openQuoteModal()}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '0.75rem' }}
              >
                {t.catalog.ctaBtn}
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
                <span>{t.catalog.drawerTitle}</span>
                {activeFilterCount > 0 && (
                  <span className={styles.filterBadge}>{activeFilterCount}</span>
                )}
              </div>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className={styles.closeDrawerBtn}
                aria-label={t.common.close}
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.drawerSection}>
                <h4>{t.catalog.catTitle}</h4>
                <div className={styles.drawerChipGrid}>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedGroup('all');
                    }}
                    className={`${styles.drawerChip} ${
                      selectedCategory === 'all' && selectedGroup === 'all' ? styles.chipActive : ''
                    }`}
                  >
                    {t.catalog.qfAll} ({allProducts.length})
                  </button>
                  {localizedCategories.map((cat) => {
                    const count = allProducts.filter((p) => p.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          setSelectedGroup('all');
                        }}
                        className={`${styles.drawerChip} ${
                          selectedCategory === cat.slug ? styles.chipActive : ''
                        }`}
                      >
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className={styles.drawerSection}>
                <h4>{t.catalog.matTitle}</h4>
                <div className={styles.drawerChipGrid}>
                  {materialOptions.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMaterial(m.id)}
                      className={`${styles.drawerChip} ${
                        selectedMaterial === m.id ? styles.chipActive : ''
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.drawerSection}>
                <h4>{t.catalog.marketTitle}</h4>
                <div className={styles.drawerChipGrid}>
                  {marketOptions.map((mk) => (
                    <button
                      key={mk.id}
                      onClick={() => setSelectedMarket(mk.id)}
                      className={`${styles.drawerChip} ${
                        selectedMarket === mk.id ? styles.chipActive : ''
                      }`}
                    >
                      {mk.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.drawerFooter}>
              <button onClick={resetFilters} className={styles.drawerResetBtn}>
                <RotateCcw size={15} /> {t.catalog.drawerReset}
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                {t.catalog.drawerApply.replace('{count}', String(filteredProducts.length))}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
          ...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
