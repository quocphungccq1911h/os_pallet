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
          <h1 className={styles.pageTitle}>Bảng Giá Pallet Gỗ Mới & Cũ Cập Nhật 2026</h1>
          <p className={styles.pageDesc}>
            Cam kết giá gốc tận xưởng sản xuất trực tiếp không qua trung gian. Báo giá tùy thuộc theo số lượng và quy cách sấy HT xuất khẩu ISPM 15.
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
                  <td><code>{item.dimension}</code></td>
                  <td>{item.staticLoad} / {item.dynamicLoad}</td>
                  <td>
                    <span className="badge badge-price" style={{ fontSize: '0.95rem' }}>{item.priceDisplay}</span>
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

        {/* Value Addition Boxes */}
        <div className={styles.valueGrid}>
          <div className={styles.valueCard}>
            <ShieldCheck size={28} color="var(--primary)" />
            <h3>Chiết Khấu Đơn Hàng Lớn</h3>
            <p>Giảm ngay từ 5% - 10% cho các hợp đồng cung ứng pallet định kỳ theo tháng cho nhà máy.</p>
          </div>
          <div className={styles.valueCard}>
            <CheckCircle2 size={28} color="var(--primary)" />
            <h3>Hỗ Trợ Khử Trùng ISPM 15</h3>
            <p>Hệ thống lò sấy HT hiện đại sẵn sàng sấy nhiệt và cấp chứng thư xuất khẩu cho các lô hàng container.</p>
          </div>
          <div className={styles.valueCard}>
            <FileText size={28} color="var(--primary)" />
            <h3>Miễn Phí Thiết Kế Bản Vẽ</h3>
            <p>Đội ngũ kỹ thuật hỗ trợ đo đạc kích thước thùng xe container và thiết kế mẫu pallet thử nghiệm miễn phí.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
