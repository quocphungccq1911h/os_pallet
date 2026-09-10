'use client';

import React, { useState, useEffect } from 'react';
import { ProductionOrder, OrderStatus } from '@/data/orders';
import { X, Save, ClipboardList, Calendar, ShieldCheck, User, Phone, DollarSign, Percent } from 'lucide-react';
import styles from './ProductModal.module.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Partial<ProductionOrder>) => Promise<void>;
  order?: ProductionOrder | null;
}

const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: 'cho_duyet', label: 'Chờ duyệt / Tiếp nhận đơn' },
  { value: 'dong_mau', label: 'Đang gia công mẫu thử tải' },
  { value: 'dang_san_xuat', label: 'Đang sản xuất hàng loạt' },
  { value: 'da_giao', label: 'Đã bàn giao cho khách' },
  { value: 'tam_dung', label: 'Tạm dừng / Đang điều chỉnh' },
];

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  order,
}) => {
  const [formData, setFormData] = useState<Partial<ProductionOrder>>({
    orderCode: '',
    customer: '',
    phone: '',
    productName: '',
    dimensions: '1200 x 1000 x 140 mm',
    quantity: 100,
    woodType: 'Gỗ Tràm tự nhiên',
    isExportISPM: true,
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    totalAmount: 'Liên hệ',
    status: 'dang_san_xuat',
    progressPercent: 50,
    notes: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (order) {
      setFormData({ ...order });
    } else {
      setFormData({
        orderCode: `TA-${new Date().toISOString().slice(2, 7).replace('-', '')}-${Math.floor(Math.random() * 90 + 10)}`,
        customer: '',
        phone: '',
        productName: 'Pallet Gỗ Thông Mới Xuất Khẩu',
        dimensions: '1200 x 1000 x 140 mm',
        quantity: 100,
        woodType: 'Gỗ Thông xẻ sấy mới 100%',
        isExportISPM: true,
        deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        totalAmount: '15.000.000 đ',
        status: 'dang_san_xuat',
        progressPercent: 30,
        notes: '',
      });
    }
    setErrorMessage('');
  }, [order, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer?.trim() || !formData.productName?.trim()) {
      setErrorMessage('Vui lòng nhập tên khách hàng và tên sản phẩm');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu đơn hàng');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <ClipboardList size={20} color="#16a34a" />
            <span>{order ? `Cập Nhật Đơn Hàng ${order.orderCode}` : 'Tạo Đơn Hàng Sản Xuất Mới'}</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn} type="button">
            <X size={20} />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <div className={styles.modalBody}>
            {errorMessage && <div className={styles.errorBanner}>{errorMessage}</div>}

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Mã Đơn Hàng</label>
                <input
                  type="text"
                  value={formData.orderCode || ''}
                  onChange={(e) => setFormData({ ...formData, orderCode: e.target.value })}
                  className={styles.input}
                  placeholder="TA-2609-01"
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Trạng Thái Đơn Hàng</label>
                <select
                  value={formData.status || 'dang_san_xuat'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                  className={styles.select}
                >
                  {ORDER_STATUSES.map((st) => (
                    <option key={st.value} value={st.value}>
                      {st.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>
                  Tên Khách Hàng / Doanh Nghiệp <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Cty May Mặc Việt Thắng"
                  value={formData.customer || ''}
                  onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Số Điện Thoại Liên Hệ</label>
                <input
                  type="text"
                  placeholder="0943 003 400"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label className={styles.label}>
                  Loại Pallet / Quy Cách Sản Xuất <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Pallet Gỗ Thông Đố Khuyết 4 Hướng Nâng"
                  value={formData.productName || ''}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Kích Thước (D x R x C)</label>
                <input
                  type="text"
                  value={formData.dimensions || ''}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Số Lượng (Cái)</label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity || 1}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Loại Gỗ Sản Xuất</label>
                <input
                  type="text"
                  value={formData.woodType || ''}
                  onChange={(e) => setFormData({ ...formData, woodType: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Hạn Bàn Giao (Deadline)</label>
                <input
                  type="date"
                  value={formData.deadline || ''}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Giá Trị Dự Kiến (VNĐ)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: 35.000.000 đ"
                  value={formData.totalAmount || ''}
                  onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col4}`}>
                <label className={styles.label}>Tiến Độ Xưởng ({formData.progressPercent || 0}%)</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.progressPercent || 0}
                  onChange={(e) => setFormData({ ...formData, progressPercent: parseInt(e.target.value) })}
                  style={{ width: '100%', marginTop: '0.6rem' }}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={formData.isExportISPM || false}
                    onChange={(e) => setFormData({ ...formData, isExportISPM: e.target.checked })}
                  />
                  <span>Yêu cầu khử trùng & cấp chứng thư hun trùng ISPM 15 xuất khẩu</span>
                </label>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label className={styles.label}>Ghi Chú Tiến Độ / Xe Giao Hàng</label>
                <textarea
                  rows={3}
                  placeholder="Ghi chú về tiến độ đóng hàng, lịch kéo cont, địa chỉ kho nhận hàng..."
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>

          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.btnCancel} disabled={isSaving}>
              Hủy Bỏ
            </button>
            <button type="submit" className={styles.btnSave} disabled={isSaving}>
              <Save size={16} />
              <span>{isSaving ? 'Đang Lưu...' : 'Lưu Đơn Hàng'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
