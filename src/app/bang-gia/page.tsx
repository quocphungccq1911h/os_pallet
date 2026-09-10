'use client';

import React from 'react';
import { pricingList } from '@/data/pricing';
import { PhoneCall, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import styles from './banggia.module.css';

export default function PricingPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <div className={styles.pageWrapper}>
      {/* Top Banner */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            BẢNG GIÁ TRA CỨU PALLET GỖ
          </span>
          <h1 className={styles.pageTitle}>Bảng Giá Pallet Gỗ, Ván Ép & Thùng Gỗ Mới Nhất 2026</h1>
          <p className={styles.pageDesc}>
            Cam kết giá gốc tận xưởng mộc Hóc Môn trực tiếp không qua trung gian. Báo giá tùy thuộc theo số lượng, bản vẽ và quy cách sấy HT xuất khẩu ISPM 15.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Table Card */}
        <div className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên Loại Pallet</th>
                <th>Chất Liệu</th>
                <th>Kích Thước (mm)</th>
                <th>Tải Trọng Tĩnh/Động</th>
                <th>Giá Tham Khảo</th>
                <th>Yêu Cầu Báo Giá</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.productName}</strong>
                    <span className={styles.note}>{item.note}</span>
                  </td>
                  <td>{item.material}</td>
                  <td><code className={styles.codeDim}>{item.dimension}</code></td>
                  <td>{item.staticLoad} / {item.dynamicLoad}</td>
                  <td>
                    <span className="badge badge-price">{item.priceDisplay}</span>
                  </td>
                  <td>
                    <button onClick={() => openQuoteModal()} className="btn btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}>
                      <PhoneCall size={14} />
                      <span>Nhận Báo Giá</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Value Addition Boxes - Thiết kế đồng bộ trang chủ */}
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <div className={styles.cardHeader}>
              <div className={styles.iconBox}>
                <ShieldCheck size={22} />
              </div>
              <h3 className={styles.cardTitle}>Chiết Khấu Đơn Hàng Lớn</h3>
            </div>
            <p className={styles.cardDesc}>
              Giảm ngay từ 5% - 10% cho các hợp đồng cung ứng pallet định kỳ theo tháng cho nhà máy.
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
              Hệ thống lò sấy HT hiện đại sẵn sàng sấy nhiệt và cấp chứng thư xuất khẩu cho các lô hàng container.
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
              Đội ngũ kỹ thuật hỗ trợ đo đạc kích thước thùng xe container và thiết kế mẫu pallet thử nghiệm miễn phí.
            </p>
          </div>
        </div>

        {/* Banner liên hệ báo giá đặc thù giống trang chủ */}
        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>Bạn Cần Sản Xuất Pallet Kích Thước Đặc Thù Theo Bản Vẽ?</h3>
            <p>Nhà xưởng tiếp nhận mọi quy cách từ nhỏ 800x800mm đến siêu khổ 1500x1500mm.</p>
          </div>
          <button onClick={() => openQuoteModal()} className="btn btn-secondary">
            <FileText size={18} />
            <span>Gửi Yêu Cầu Bản Vẽ Kỹ Thuật</span>
          </button>
        </div>
      </div>
    </div>
  );
}
