import React from 'react';
import { pricingList } from '@/data/pricing';
import { PhoneCall, FileText } from 'lucide-react';
import styles from './PricingTableSection.module.css';

interface PricingTableSectionProps {
  onOpenQuoteModal: () => void;
}

export const PricingTableSection: React.FC<PricingTableSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <section className={styles.section} id="bang-gia">
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <span className="section-tag">BẢNG GIÁ PALLET THAM KHẢO</span>
          <h2 className="section-title">Bảng Giá Kích Thước Pallet Gỗ Phổ Biến</h2>
          <p className="section-subtitle">
            Giá sản phẩm sẽ tùy thuộc vào số lượng đặt hàng, tiêu chuẩn sấy HT xuất khẩu và quy cách đóng riêng. Liên hệ ngay để nhận báo giá chi tiết trong 15 phút.
          </p>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên Loại Pallet</th>
                <th>Chất Liệu Gỗ</th>
                <th>Kích Thước (mm)</th>
                <th>Tải Trọng Tĩnh / Động</th>
                <th>Giá Tham Khảo</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {pricingList.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.productName}</strong>
                    <span className={styles.tableNote}>{item.note}</span>
                  </td>
                  <td>{item.material}</td>
                  <td><code className={styles.codeDim}>{item.dimension}</code></td>
                  <td>{item.staticLoad} / {item.dynamicLoad}</td>
                  <td>
                    <span className="badge badge-price">{item.priceDisplay}</span>
                  </td>
                  <td>
                    <button onClick={onOpenQuoteModal} className="btn btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
                      <PhoneCall size={12} />
                      <span>Nhận Báo Giá</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.bannerContact}>
          <div className={styles.bannerText}>
            <h3>Bạn Cần Sản Xuất Pallet Kích Thước Đặc Thù Theo Bản Vẽ?</h3>
            <p>Nhà xưởng tiếp nhận mọi quy cách từ nhỏ 800x800mm đến siêu khổ 1500x1500mm.</p>
          </div>
          <button onClick={onOpenQuoteModal} className="btn btn-secondary">
            <FileText size={18} />
            <span>Gửi Yêu Cầu Bản Vẽ Kỹ Thuật</span>
          </button>
        </div>
      </div>
    </section>
  );
};
