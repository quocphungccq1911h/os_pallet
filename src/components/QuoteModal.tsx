import React, { useState } from 'react';
import { X, Send, CheckCircle, Phone, Package, ShieldCheck } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { products } from '@/data/products';
import styles from './QuoteModal.module.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProductSlug?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, defaultProductSlug }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    product: defaultProductSlug || 'pallet-go-1200x1000',
    dimensions: '',
    quantity: '100',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập Họ tên và Số điện thoại!');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      product: 'pallet-go-1200x1000',
      dimensions: '',
      quantity: '100',
      note: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Đóng modal">
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className={styles.modalHeader}>
              <div className={styles.headerIcon}>📝</div>
              <div>
                <h3 className={styles.modalTitle}>Yêu Cầu Báo Giá Chi Tiết</h3>
                <p className={styles.modalSub}>Nhận báo giá tận xưởng tốt nhất & bản vẽ thiết kế mẫu trong 15 phút</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Họ và tên khách hàng / Công ty *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Nam - Công ty Logistics ABC"
                  className={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Số điện thoại / Zalo nhận báo giá *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Chọn sản phẩm pallet</label>
                  <select
                    className={styles.select}
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.slug}>
                        {p.name}
                      </option>
                    ))}
                    <option value="custom">Pallet Đóng Theo Kích Thước Yêu Cầu</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Số lượng dự kiến (Cái)</label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Ví dụ: 100"
                    className={styles.input}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Ghi chú kích thước / Quy cách đóng (Tùy chọn)</label>
                <textarea
                  rows={3}
                  placeholder="Nhập kích thước riêng (Dài x Rộng x Cao) hoặc yêu cầu tiêu chuẩn xuất khẩu ISPM 15..."
                  className={styles.textarea}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                ></textarea>
              </div>

              <div className={styles.trustBadge}>
                <ShieldCheck size={16} color="var(--primary)" />
                <span>Bảo mật thông tin • Cam kết giá tận xưởng sản xuất không qua trung gian</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                <Send size={18} />
                <span>GỬI YÊU CẦU BÁO GIÁ NGAY</span>
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successBox}>
            <CheckCircle size={56} className={styles.successIcon} />
            <h3 className={styles.successTitle}>Gửi Yêu Cầu Thành Công!</h3>
            <p className={styles.successText}>
              Cảm ơn <strong>{formData.name}</strong> đã liên hệ. Đội ngũ kỹ thuật của <strong>{companyInfo.shortName}</strong> sẽ gọi điện tư vấn và gửi bảng giá ưu đãi qua Zalo <strong>{formData.phone}</strong> trong vòng 15 phút.
            </p>

            <div className={styles.directContact}>
              <p>Cần báo giá gấp? Gọi ngay cho chúng tôi:</p>
              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline">
                <Phone size={18} />
                <span>Hotline: {companyInfo.hotlineFormatted}</span>
              </a>
            </div>

            <button onClick={handleReset} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
              Đóng Cửa Sổ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
