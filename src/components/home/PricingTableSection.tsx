'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { products as initialProducts, CATEGORY_PRIORITY, type Product } from '@/data/products';
import { PhoneCall, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct } from '@/i18n/productLocalizer';
import styles from './PricingTableSection.module.css';

interface PricingTableSectionProps {
  onOpenQuoteModal: () => void;
}

function pickRepresentativeProducts(list: Product[]): Product[] {
  const sorted = [...list].sort((a, b) => {
    const pa = CATEGORY_PRIORITY[a.categorySlug] ?? 99;
    const pb = CATEGORY_PRIORITY[b.categorySlug] ?? 99;
    if (pa !== pb) return pa - pb;
    return a.id.localeCompare(b.id);
  });

  const picked: Product[] = [];
  const seenCats = new Map<string, number>();

  for (const p of sorted) {
    const count = seenCats.get(p.categorySlug) || 0;
    const limit = p.categorySlug === 'pallet-go-tram' ? 2 : 1;
    if (count < limit) {
      picked.push(p);
      seenCats.set(p.categorySlug, count + 1);
    }
    if (picked.length >= 8) break;
  }
  return picked;
}

export const PricingTableSection: React.FC<PricingTableSectionProps> = ({ onOpenQuoteModal }) => {
  const { locale, t } = useLanguage();
  const [items, setItems] = useState<Product[]>(() => pickRepresentativeProducts(initialProducts));
  const [totalCount, setTotalCount] = useState<number>(initialProducts.length);

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
          setItems(pickRepresentativeProducts(list));
          setTotalCount(list.length);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.section} id="bang-gia">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">{t.pricingHome.tag}</span>
          <h2 className="section-title">{t.pricingHome.title}</h2>
          <p className="section-subtitle">{t.pricingHome.subtitle}</p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.pricingHome.colName}</th>
                <th>{t.pricingHome.colMat}</th>
                <th>{t.pricingHome.colDim}</th>
                <th>{t.pricingHome.colLoad}</th>
                <th>{t.pricingHome.colPrice}</th>
                <th>{t.pricingHome.colAction}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((raw) => {
                const item = localizeProduct(raw, locale);
                return (
                  <tr key={item.id}>
                    <td>
                      <Link
                        href={`/san-pham/${item.slug}`}
                        style={{ fontWeight: 700, color: 'var(--secondary)', textDecoration: 'none' }}
                      >
                        {item.name}
                      </Link>
                      <span className={styles.tableNote}>{item.category}</span>
                    </td>
                    <td>{item.woodType}</td>
                    <td>
                      <code className={styles.codeDim}>{item.dimensions}</code>
                    </td>
                    <td>
                      {item.staticLoad} / {item.dynamicLoad}
                    </td>
                    <td>
                      <span className="badge badge-price">{item.priceDisplay || t.common.contactPrice}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={onOpenQuoteModal}
                        className="btn btn-primary"
                        style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        <PhoneCall size={12} />
                        <span>{t.common.getQuote}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link
            href="/bang-gia"
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <span>{t.pricingHome.viewAllBtn.replace('{count}', String(totalCount))}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>{t.pricingHome.bannerTitle}</h3>
            <p>{t.pricingHome.bannerDesc}</p>
          </div>
          <button type="button" onClick={onOpenQuoteModal} className="btn btn-secondary">
            <FileText size={18} />
            <span>{t.pricingHome.bannerBtn}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
