'use client';

import React, { useState, useEffect } from 'react';
import { Activity, activityCategories, ActivityCategory } from '@/data/activities';
import {
  X,
  Upload,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  Camera,
  Calendar,
  MapPin,
  Building,
  Facebook,
  FileText,
  Tag,
} from 'lucide-react';
import styles from './ProductModal.module.css';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Partial<Activity>) => Promise<void>;
  activity?: Activity | null;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  activity,
}) => {
  const [formData, setFormData] = useState<Partial<Activity>>({
    title: '',
    slug: '',
    category: 'ban-giao',
    summary: '',
    content: '',
    images: [],
    customerLocation: '',
    clientType: '',
    publishedAt: new Date().toISOString().split('T')[0],
    badges: ['Hoạt Động Xưởng', 'Sản Xuất Thực Tế'],
    highlights: ['Giao hàng đúng tiến độ', 'Gia công theo bản vẽ'],
    fbUrl: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [badgeInput, setBadgeInput] = useState('');

  useEffect(() => {
    if (activity) {
      setFormData({
        ...activity,
        images: activity.images ? [...activity.images] : [],
        badges: activity.badges ? [...activity.badges] : [],
        highlights: activity.highlights ? [...activity.highlights] : [],
      });
      setBadgeInput(activity.badges ? activity.badges.join(', ') : '');
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'ban-giao',
        summary: '',
        content: '',
        images: ['/images/pallet_factory_43.jpg'],
        customerLocation: 'KCN TP. Hồ Chí Minh',
        clientType: 'Doanh nghiệp sản xuất',
        publishedAt: new Date().toISOString().split('T')[0],
        badges: ['Hoạt Động Xưởng', 'Sản Xuất Thực Tế'],
        highlights: ['Giao hàng đúng tiến độ', 'Gia công chuẩn bản vẽ'],
        fbUrl: '',
      });
      setBadgeInput('Hoạt Động Xưởng, Sản Xuất Thực Tế');
    }
    setErrorMessage('');
    setImageUrlInput('');
  }, [activity, isOpen]);

  if (!isOpen) return null;

  // Handle Highlights
  const handleHighlightChange = (index: number, val: string) => {
    const updated = [...(formData.highlights || [])];
    updated[index] = val;
    setFormData({ ...formData, highlights: updated });
  };

  const addHighlightRow = () => {
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), ''],
    });
  };

  const removeHighlightRow = (index: number) => {
    const updated = (formData.highlights || []).filter((_, i) => i !== index);
    setFormData({ ...formData, highlights: updated });
  };

  // Upload file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage('');

    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Lỗi khi tải ảnh');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), data.url],
      }));
    } catch {
      setErrorMessage('Không thể tải ảnh lên máy chủ.');
    } finally {
      setIsUploading(false);
    }
  };

  const addImageUrlManual = () => {
    if (!imageUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), imageUrlInput.trim()],
    }));
    setImageUrlInput('');
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setErrorMessage('Vui lòng nhập tiêu đề hoạt động xưởng');
      return;
    }

    setIsSaving(true);
    setErrorMessage('');

    try {
      const processedBadges = badgeInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      await onSave({
        ...formData,
        badges: processedBadges,
      });
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi khi lưu bài viết');
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
            <Camera size={20} color="#16a34a" />
            <span>{activity ? 'Chỉnh Sửa Hoạt Động Xưởng' : 'Đăng Hoạt Động Xưởng Mới'}</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn} type="button">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
          <div className={styles.modalBody}>
            {errorMessage && (
              <div className={styles.errorBanner}>{errorMessage}</div>
            )}

            {/* Basic Info */}
            <div className={styles.sectionTitle}>
              <FileText size={16} />
              <span>Thông Tin Chung Bài Viết</span>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label className={styles.label}>
                  Tiêu Đề Hoạt Động <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bàn Giao Lô Pallet 1.400 x 1.100 mm Cho Khách Xuất Khẩu"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Nhóm Hoạt Động</label>
                <select
                  value={formData.category || 'ban-giao'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ActivityCategory })}
                  className={styles.select}
                >
                  {activityCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Ngày Đăng Bài</label>
                <input
                  type="date"
                  value={formData.publishedAt || ''}
                  onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Địa Điểm Khách Hàng / Giao Hàng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: KCN Hóc Môn, KCN Sóng Thần, Bình Dương..."
                  value={formData.customerLocation || ''}
                  onChange={(e) => setFormData({ ...formData, customerLocation: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Đối Tượng Khách Hàng</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Doanh nghiệp xuất khẩu máy móc cơ khí"
                  value={formData.clientType || ''}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Summary & Content */}
            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label className={styles.label}>Tóm Tắt Ngắn (Hiển thị ngoài thẻ danh sách)</label>
                <textarea
                  rows={2}
                  placeholder="Mô tả tóm tắt 2-3 câu về hoạt động này..."
                  value={formData.summary || ''}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className={styles.textarea}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col12}`}>
                <label className={styles.label}>Nội Dung Chi Tiết (Hỗ trợ định dạng dấu gạch đầu dòng, tiêu đề ###)</label>
                <textarea
                  rows={6}
                  placeholder="Nhập nội dung chi tiết bài viết hoạt động..."
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className={styles.textarea}
                />
              </div>
            </div>

            {/* Images Gallery */}
            <div className={styles.sectionTitle}>
              <ImageIcon size={16} />
              <span>Hình Ảnh Thực Tế Tại Xưởng ({(formData.images || []).length} ảnh)</span>
            </div>

            <div className={styles.galleryUploadArea}>
              <label className={styles.uploadBtn}>
                <Upload size={16} />
                <span>{isUploading ? 'Đang Tải Ảnh...' : 'Tải Ảnh Mới Từ Máy Tính'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  disabled={isUploading}
                />
              </label>

              <div className={styles.urlInputWrap}>
                <input
                  type="text"
                  placeholder="Hoặc dán URL ảnh trực tiếp (/images/...)"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={addImageUrlManual}
                  className={styles.addHighlightBtn}
                >
                  Thêm
                </button>
              </div>
            </div>

            <div className={styles.galleryGrid} style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {(formData.images || []).map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: 90, height: 70, borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0', background: '#0f172a' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    style={{ position: 'absolute', top: 2, right: 2, background: 'rgba(239, 68, 68, 0.85)', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className={styles.sectionTitle} style={{ marginTop: '1.5rem' }}>
              <Tag size={16} />
              <span>Điểm Nổi Bật (Highlights)</span>
            </div>

            {(formData.highlights || []).map((hl, idx) => (
              <div key={idx} className={styles.highlightRow}>
                <input
                  type="text"
                  placeholder="Ví dụ: Nhận đơn gấp – xử lý nhanh theo tiến độ"
                  value={hl}
                  onChange={(e) => handleHighlightChange(idx, e.target.value)}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => removeHighlightRow(idx)}
                  className={styles.removeHighlightBtn}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addHighlightRow}
              className={styles.addHighlightBtn}
              style={{ marginTop: '0.5rem' }}
            >
              <Plus size={14} />
              <span>Thêm Điểm Nổi Bật</span>
            </button>

            {/* Badges & Facebook Proof */}
            <div className={styles.sectionTitle} style={{ marginTop: '1.5rem' }}>
              <Facebook size={16} />
              <span>Huy Hiệu & Liên Kết Fanpage Facebook</span>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Huy Hiệu (Ngăn cách bằng dấu phẩy)</label>
                <input
                  type="text"
                  placeholder="Đơn Hàng Gấp, Gia Công Bản Vẽ, Xuất Khẩu"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.col6}`}>
                <label className={styles.label}>Link Bài Viết Facebook Fanpage</label>
                <input
                  type="url"
                  placeholder="https://www.facebook.com/pallet.truongan/posts/..."
                  value={formData.fbUrl || ''}
                  onChange={(e) => setFormData({ ...formData, fbUrl: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className={styles.modalFooter}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancel}
              disabled={isSaving}
            >
              Hủy Bỏ
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isSaving}
            >
              <Save size={16} />
              <span>{isSaving ? 'Đang Lưu...' : 'Lưu Hoạt Động'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
