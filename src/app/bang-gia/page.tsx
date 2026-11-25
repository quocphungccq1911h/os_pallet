'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { products as initialProducts, CATEGORY_PRIORITY, type Product } from '@/data/products';
import { PhoneCall, FileText, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct } from '@/i18n/productLocalizer';
import styles from './banggia.module.css';

type GroupFilter = 'all' | 'pallet-go' | 'pallet-nhua' | 'thung';

const GROUP_SLUGS: Record<Exclude<GroupFilter, 'all'>, string[]> = {
  'pallet-go': ['pallet-go-tram', 'pallet-go-thong', 'pallet-van-ep', 'pallet-theo-yeu-cau'],
  'pallet-nhua': ['pallet-nhua-moi', 'pallet-nhua-cu'],
  thung: ['thung-go-dong-hang', 'thung-nhua'],
};

function sortByCategoryPriority(list: Product[]): Product[] {
  return [...list].sort((a, b) => {
    const pa = CATEGORY_PRIORITY[a.categorySlug] ?? 99;
    const pb = CATEGORY_PRIORITY[b.categorySlug] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
}

export default function PricingPage() {
  const { openQuoteModal } = useQuoteModal();
  const { locale, t } = useLanguage();
  const [allProducts, setAllProducts] = useState<Product[]>(() =>
    sortByCategoryPriority(initialProducts)
  );
  const [activeGroup, setActiveGroup] = useState<GroupFilter>('all');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/products', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        const list: Product[] = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
            ? data.products
            : [];
        if (list.length > 0) {
          setAllProducts(sortByCategoryPriority(list));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const counts = useMemo(() => {
    return {
      all: allProducts.length,
      'pallet-go': allProducts.filter((p) => GROUP_SLUGS['pallet-go'].includes(p.categorySlug)).length,
      'pallet-nhua': allProducts.filter((p) => GROUP_SLUGS['pallet-nhua'].includes(p.categorySlug)).length,
      thung: allProducts.filter((p) => GROUP_SLUGS.thung.includes(p.categorySlug)).length,
    };
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    if (activeGroup === 'all') return allProducts;
    const allowed = GROUP_SLUGS[activeGroup];
    return allProducts.filter((p) => allowed.includes(p.categorySlug));
  }, [allProducts, activeGroup]);

  const tabs: { key: GroupFilter; label: string; count: number }[] = [
    { key: 'all', label: t.pricingPage.tabAll, count: counts.all },
    { key: 'pallet-go', label: t.pricingPage.tabWood, count: counts['pallet-go'] },
    { key: 'pallet-nhua', label: t.pricingPage.tabPlastic, count: counts['pallet-nhua'] },
    { key: 'thung', label: t.pricingPage.tabCrates, count: counts.thung },
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Top Banner */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span
            className="section-tag"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            {t.pricingPage.tag}
          </span>
          <h1 className={styles.pageTitle}>{t.pricingPage.title}</h1>
          <p className={styles.pageDesc}>{t.pricingPage.desc}</p>
        </div>
      </div>

      <div className="container">
        {/* 4 Group Filter Tabs */}
        <div className={styles.filterBar} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeGroup === tab.key}
              onClick={() => setActiveGroup(tab.key)}
              className={`${styles.filterTab} ${activeGroup === tab.key ? styles.filterTabActive : ''}`}
            >
              <span>{tab.label}</span>
              <span className={styles.filterCount}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Live Pricing Table Card */}
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.pricingPage.colProduct}</th>
                <th>{t.pricingPage.colMat}</th>
                <th>{t.pricingPage.colDim}</th>
                <th>{t.pricingPage.colLoad}</th>
                <th>{t.pricingPage.colPrice}</th>
                <th>{t.pricingPage.colQuote}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((raw) => {
                const item = localizeProduct(raw, locale);
                const rawPrice = raw.priceDisplay?.trim() || 'Liên hệ';
                const isCustomPrice = rawPrice.toLowerCase() !== 'liên hệ';
                return (
                  <tr key={item.id}>
                    <td>
                      <Link href={`/san-pham/${item.slug}`} className={styles.productLink}>
                        <span>{item.name}</span>
                        <ExternalLink size={13} className={styles.productLinkIcon} />
                      </Link>
                      <span className={styles.note}>{item.category}</span>
                    </td>
                    <td>{item.woodType}</td>
                    <td>
                      <code className={styles.codeDim}>{item.dimensions}</code>
                    </td>
                    <td>
                      {item.staticLoad} / {item.dynamicLoad}
                    </td>
                    <td>
                      <span className={isCustomPrice ? styles.priceReal : 'badge badge-price'}>
                        {item.priceDisplay}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openQuoteModal(raw.slug)}
                        className="btn btn-primary"
                        style={{
                          padding: '0.45rem 0.85rem',
                          fontSize: '0.8rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <PhoneCall size={14} />
                        <span>{t.common.getQuote}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Value Addition Boxes */}
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <ShieldCheck size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.pricingPage.v1Title}</h3>
            </div>
            <p className={styles.cardDesc}>{t.pricingPage.v1Desc}</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <CheckCircle2 size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.pricingPage.v2Title}</h3>
            </div>
            <p className={styles.cardDesc}>{t.pricingPage.v2Desc}</p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <FileText size={22} />
              </div>
              <h3 className={styles.cardTitle}>{t.pricingPage.v3Title}</h3>
            </div>
            <p className={styles.cardDesc}>{t.pricingPage.v3Desc}</p>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>{t.pricingPage.bannerTitle}</h3>
            <p>{t.pricingPage.bannerDesc}</p>
          </div>
          <button type="button" onClick={() => openQuoteModal()} className="btn btn-secondary">
            <FileText size={18} />
            <span>{t.pricingPage.bannerBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
