'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { products as initialProducts, CATEGORY_PRIORITY, type Product } from '@/data/products';
import { PhoneCall, FileText, ArrowRight } from 'lucide-react';
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

  // Ưu tiên chọn đại diện tiêu biểu mỗi nhóm để bảng trang chủ gọn đẹp (~8 dòng)
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
          <span className="section-tag">BẢNG GIÁ PALLET &amp; THÙNG THAM KHẢO</span>
          <h2 className="section-title">Bảng Giá Kích Thước Phổ Biến Tại Xưởng</h2>
          <p className="section-subtitle">
            Giá sản phẩm tùy thuộc vào số lượng đặt hàng, tiêu chuẩn sấy HT xuất khẩu ISPM 15 và quy cách đóng riêng. Liên hệ ngay để nhận báo giá chi tiết trong 15 phút.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên Sản Phẩm</th>
                <th>Chất Liệu</th>
                <th>Kích Thước (mm)</th>
                <th>Tải Trọng Tĩnh / Động</th>
                <th>Giá Tham Khảo</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
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
                    <span className="badge badge-price">{item.priceDisplay || 'Liên hệ'}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                    >
                      <PhoneCall size={12} />
                      <span>Nhận Báo Giá</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/bang-gia" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
            <span>Xem đầy đủ bảng giá ({totalCount} mẫu)</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>Bạn Cần Sản Xuất Pallet Kích Thước Đặc Thù Theo Bản Vẽ?</h3>
            <p>Nhà xưởng tiếp nhận mọi quy cách từ nhỏ 800×800mm đến siêu khổ 1500×1500mm.</p>
          </div>
          <button type="button" onClick={onOpenQuoteModal} className="btn btn-secondary">
            <FileText size={18} />
            <span>Gửi Yêu Cầu Bản Vẽ Kỹ Thuật</span>
          </button>
        </div>
      </div>
    </section>
  );
};
