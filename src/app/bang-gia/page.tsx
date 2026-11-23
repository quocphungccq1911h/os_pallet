'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { products as initialProducts, CATEGORY_PRIORITY, type Product } from '@/data/products';
import { PhoneCall, FileText, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
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
    return a.id.localeCompare(b.id);
  });
}

export default function PricingPage() {
  const { openQuoteModal } = useQuoteModal();
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
      .catch(() => {
        // Giữ dữ liệu fallback local nếu mạng tạm gián đoạn
      });
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
    { key: 'all', label: 'Tất cả sản phẩm', count: counts.all },
    { key: 'pallet-go', label: 'Pallet Gỗ', count: counts['pallet-go'] },
    { key: 'pallet-nhua', label: 'Pallet Nhựa', count: counts['pallet-nhua'] },
    { key: 'thung', label: 'Thùng Gỗ & Thùng Nhựa', count: counts.thung },
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
            BẢNG GIÁ TRA CỨU TẠI XƯỞNG
          </span>
          <h1 className={styles.pageTitle}>
            Bảng Giá Pallet Gỗ, Pallet Nhựa, Thùng Gỗ &amp; Thùng Nhựa 2026
          </h1>
          <p className={styles.pageDesc}>
            Cam kết giá gốc trực tiếp từ Xưởng Pallet Trường An (Bà Điểm, TP. Hồ Chí Minh) không qua
            trung gian. Báo giá linh hoạt theo số lượng, bản vẽ và yêu cầu sấy nhiệt HT chuẩn xuất
            khẩu ISPM 15.
          </p>
        </div>
      </div>

      <div className="container">
        {/* 4 Group Filter Tabs */}
        <div className={styles.filterBar} role="tablist" aria-label="Lọc bảng giá theo nhóm sản phẩm">
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
                <th>Sản Phẩm &amp; Phân Loại</th>
                <th>Chất Liệu</th>
                <th>Kích Thước (mm)</th>
                <th>Tải Trọng Tĩnh / Động</th>
                <th>Giá Tham Khảo</th>
                <th>Yêu Cầu Báo Giá</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((item) => {
                const priceText = item.priceDisplay?.trim() || 'Liên hệ';
                const isCustomPrice = priceText.toLowerCase() !== 'liên hệ';
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
                      <span
                        className={isCustomPrice ? styles.priceReal : 'badge badge-price'}
                      >
                        {priceText}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => openQuoteModal(item.slug)}
                        className="btn btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
                      >
                        <PhoneCall size={14} />
                        <span>Nhận Báo Giá</span>
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
              <h3 className={styles.cardTitle}>Chiết Khấu Đơn Hàng Lớn</h3>
            </div>
            <p className={styles.cardDesc}>
              Giảm ngay từ 5% - 10% cho các hợp đồng cung ứng pallet gỗ, pallet nhựa &amp; thùng công
              nghiệp định kỳ theo tháng cho nhà máy.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <CheckCircle2 size={22} />
              </div>
              <h3 className={styles.cardTitle}>Hỗ Trợ Khử Trùng ISPM 15</h3>
            </div>
            <p className={styles.cardDesc}>
              Hệ thống lò sấy HT hiện đại sẵn sàng sấy nhiệt, đóng dấu mộc và cấp chứng thư xuất
              khẩu cho các lô hàng container.
            </p>
          </div>

          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <FileText size={22} />
              </div>
              <h3 className={styles.cardTitle}>Miễn Phí Thiết Kế Bản Vẽ</h3>
            </div>
            <p className={styles.cardDesc}>
              Đội ngũ kỹ thuật hỗ trợ đo đạc kích thước thùng xe container và thiết kế mẫu pallet,
              thùng gỗ thử nghiệm miễn phí.
            </p>
          </div>
        </div>

        {/* Banner liên hệ báo giá đặc thù */}
        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>Bạn Cần Sản Xuất Pallet / Thùng Gỗ Kích Thước Đặc Thù Theo Bản Vẽ?</h3>
            <p>
              Nhà xưởng tiếp nhận mọi quy cách từ nhỏ 800×800mm đến siêu khổ 1500×1500mm và đơn hàng
              số lượng lớn.
            </p>
          </div>
          <button type="button" onClick={() => openQuoteModal()} className="btn btn-secondary">
            <FileText size={18} />
            <span>Gửi Yêu Cầu Bản Vẽ Kỹ Thuật</span>
          </button>
        </div>
      </div>
    </div>
  );
}
