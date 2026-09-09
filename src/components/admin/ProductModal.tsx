'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, categories } from '@/data/products';
import {
  X,
  Upload,
  Save,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  FileText,
  Layers,
  Facebook,
  ShieldCheck,
  Package,
} from 'lucide-react';
import styles from './ProductModal.module.css';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => Promise<void>;
  product?: Product | null;
}

const MATERIAL_GROUPS = [
  { value: 'go-thong', label: 'Gỗ Thông (Nhập khẩu / xẻ sấy)' },
  { value: 'go-tram', label: 'Gỗ Tràm (Tự nhiên / chịu lực)' },
  { value: 'van-ep', label: 'Ván Ép Plywood (Mặt phẳng mịn)' },
  { value: 'go-cu', label: 'Gỗ Cũ / Thanh Lý (Tiết kiệm)' },
];

const TARGET_MARKETS = [
  { value: 'xuat-khau-my', label: 'Xuất khẩu thị trường Mỹ (Chuẩn GMA/ISPM 15)' },
  { value: 'xuat-khau-campuchia', label: 'Xuất khẩu Campuchia / ASEAN' },
  { value: 'xuat-khau-ispm15', label: 'Xuất khẩu Tiêu chuẩn ISPM 15 (Chung)' },
  { value: 'noi-dia', label: 'Lưu kho & Vận chuyển nội địa Việt Nam' },
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    category: categories[0]?.name || 'Pallet Gỗ Thông & Tràm Mới',
    categorySlug: categories[0]?.slug || 'pallet-go-moi',
    dimensions: '1200 x 1000 x 140 mm',
    woodType: 'Gỗ Thông nhập khẩu xẻ sấy',
    materialGroup: 'go-thong',
    targetMarket: 'noi-dia',
    staticLoad: '2.000 kg',
    dynamicLoad: '1.000 kg',
    specification: 'Nan dày 20mm, đố khoét 4 hướng nâng xe máy',
    isExportStandard: false,
    isNew: true,
    priceDisplay: 'Liên hệ',
    description: '',
    usagePurpose: 'Kê kho, đóng hàng xuất khẩu máy móc',
    imageUrl: '/images/banner_main.png',
    highlights: ['Chịu tải trọng tốt', 'Xẻ sấy chống mối mọt'],
    badges: ['GIÁ XƯỞNG', 'SẴN KHO'],
    facebookProof: {
      title: '',
      description: '',
      fbUrl: '',
    },
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isGalleryUploading, setIsGalleryUploading] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [badgeInput, setBadgeInput] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        gallery: product.gallery && product.gallery.length > 0 ? [...product.gallery] : (product.imageUrl ? [product.imageUrl] : []),
        highlights: product.highlights?.length ? [...product.highlights] : ['Chịu tải trọng tốt'],
        badges: product.badges?.length ? [...product.badges] : ['GIÁ XƯỞNG'],
        facebookProof: product.facebookProof || {
          title: '',
          description: '',
          fbUrl: '',
        },
      });
      setBadgeInput(product.badges ? product.badges.join(', ') : '');
    } else {
      setFormData({
        name: '',
        slug: '',
        category: categories[0]?.name || 'Pallet Gỗ Thông & Tràm Mới',
        categorySlug: categories[0]?.slug || 'pallet-go-moi',
        dimensions: '1200 x 1000 x 140 mm',
        woodType: 'Gỗ Thông nhập khẩu xẻ sấy',
        materialGroup: 'go-thong',
        targetMarket: 'noi-dia',
        staticLoad: '2.000 kg',
        dynamicLoad: '1.000 kg',
        specification: 'Nan dày 20mm, đố khoét 4 hướng nâng',
        isExportStandard: false,
        isNew: true,
        priceDisplay: 'Liên hệ',
        description: '',
        usagePurpose: 'Kê kho, đóng hàng xuất khẩu',
        imageUrl: '/images/banner_main.png',
        gallery: ['/images/banner_main.png'],
        highlights: ['Gỗ chuẩn quy cách', 'Chống mối mọt ẩm mốc'],
        badges: ['GIÁ TẠI XƯỞNG'],
        facebookProof: {
          title: '',
          description: '',
          fbUrl: '',
        },
      });
      setBadgeInput('GIÁ TẠI XƯỞNG');
    }
    setErrorMessage('');
    setGalleryUrlInput('');
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Handle Category Change
  const handleCategoryChange = (catSlug: string) => {
    const found = categories.find((c) => c.slug === catSlug);
    setFormData((prev) => ({
      ...prev,
      categorySlug: catSlug,
      category: found ? found.name : prev.category,
    }));
  };

  // Handle Highlights list
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

  // Handle File Upload to /api/admin/upload
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
        setIsUploading(false);
        return;
      }

      setFormData((prev) => {
        const newImg = data.url;
        const currentGallery = prev.gallery || [];
        return {
          ...prev,
          imageUrl: newImg,
          gallery: currentGallery.includes(newImg) ? currentGallery : [newImg, ...currentGallery],
        };
      });
    } catch {
      setErrorMessage('Không thể tải ảnh lên máy chủ.');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle Gallery file upload
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    setIsGalleryUploading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error || 'Lỗi khi tải ảnh vào album');
        return;
      }

      setFormData((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), data.url],
      }));
    } catch {
      setErrorMessage('Không thể tải ảnh album lên máy chủ.');
    } finally {
      setIsGalleryUploading(false);
      e.target.value = '';
    }
  };

  // Add URL to gallery
  const handleAddGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), galleryUrlInput.trim()],
    }));
    setGalleryUrlInput('');
  };

  // Remove image from gallery
  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => {
      const updated = (prev.gallery || []).filter((_, i) => i !== index);
      return {
        ...prev,
        gallery: updated,
      };
    });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name?.trim()) {
      setErrorMessage('Vui lòng nhập tên sản phẩm.');
      return;
    }

    // Process badges from comma-separated string
    const processedBadges = badgeInput
      .split(',')
      .map((b) => b.trim().toUpperCase())
      .filter(Boolean);

    // Clean up empty highlights
    const cleanedHighlights = (formData.highlights || []).filter((h) => h.trim().length > 0);

    const finalGallery = formData.gallery && formData.gallery.length > 0
      ? formData.gallery
      : [formData.imageUrl || '/images/banner_main.png'];

    const finalImageUrl = formData.imageUrl || finalGallery[0] || '/images/banner_main.png';

    setIsSaving(true);

    try {
      await onSave({
        ...formData,
        imageUrl: finalImageUrl,
        gallery: finalGallery,
        badges: processedBadges,
        highlights: cleanedHighlights,
      });
      onClose();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Đã có lỗi khi lưu sản phẩm');
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
            <Package size={22} color="#b45309" />
            <span>{product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Pallet Mới'}</span>
          </div>
          <button onClick={onClose} className={styles.closeBtn} title="Đóng">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {errorMessage && (
            <div style={{ padding: '0.75rem 1rem', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '0.875rem' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* 1. THÔNG TIN CƠ BẢN */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>
              <Layers size={18} color="#b45309" />
              <span>1. Thông Tin Cơ Bản</span>
            </div>

            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Pallet Gỗ Thông Xuất Khẩu Mỹ 1200x1000mm"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>URL Slug (đường dẫn web)</label>
                <input
                  type="text"
                  placeholder="Tự sinh nếu để trống"
                  value={formData.slug || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.grid3}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Danh mục sản phẩm *</label>
                <select
                  value={formData.categorySlug || ''}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={styles.select}
                >
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Nhóm chất liệu *</label>
                <select
                  value={formData.materialGroup || 'go-thong'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      materialGroup: e.target.value as Product['materialGroup'],
                    })
                  }
                  className={styles.select}
                >
                  {MATERIAL_GROUPS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Thị trường mục tiêu *</label>
                <select
                  value={formData.targetMarket || 'noi-dia'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      targetMarket: e.target.value as Product['targetMarket'],
                    })
                  }
                  className={styles.select}
                >
                  {TARGET_MARKETS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. QUY CÁCH KỸ THUẬT */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>
              <ShieldCheck size={18} color="#b45309" />
              <span>2. Quy Cách Kỹ Thuật & Tải Trọng</span>
            </div>

            <div className={styles.grid3}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Kích thước (D x R x C)</label>
                <input
                  type="text"
                  placeholder="VD: 1200 x 1000 x 140 mm"
                  value={formData.dimensions || ''}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Loại gỗ cụ thể</label>
                <input
                  type="text"
                  placeholder="VD: Gỗ Thông Chile xẻ sấy"
                  value={formData.woodType || ''}
                  onChange={(e) => setFormData({ ...formData, woodType: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Giá hiển thị</label>
                <input
                  type="text"
                  placeholder="VD: Liên hệ hoặc 180.000đ"
                  value={formData.priceDisplay || 'Liên hệ'}
                  onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.grid3}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tải trọng tĩnh</label>
                <input
                  type="text"
                  placeholder="VD: 2.500 kg"
                  value={formData.staticLoad || ''}
                  onChange={(e) => setFormData({ ...formData, staticLoad: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Tải trọng động</label>
                <input
                  type="text"
                  placeholder="VD: 1.200 kg"
                  value={formData.dynamicLoad || ''}
                  onChange={(e) => setFormData({ ...formData, dynamicLoad: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Quy cách nan đố / hướng nâng</label>
                <input
                  type="text"
                  placeholder="VD: 4 hướng nâng, nan 20mm"
                  value={formData.specification || ''}
                  onChange={(e) => setFormData({ ...formData, specification: e.target.value })}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.grid2}>
              <label className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={formData.isExportStandard || false}
                  onChange={(e) => setFormData({ ...formData, isExportStandard: e.target.checked })}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxLabel}>
                  🌲 Đạt tiêu chuẩn xuất khẩu ISPM 15 (Hun trùng nhiệt HT & mộc dấu)
                </span>
              </label>

              <label className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  checked={formData.isNew ?? true}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className={styles.checkboxInput}
                />
                <span className={styles.checkboxLabel}>
                  ✨ Gắn nhãn "Sản Phẩm Mới" tại xưởng
                </span>
              </label>
            </div>
          </div>

          {/* 3. HÌNH ẢNH SẢN PHẨM THẬT TẠI XƯỞNG & ALBUM ĐA GÓC ĐỘ */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>
              <ImageIcon size={18} color="#b45309" />
              <span>3. Hình Ảnh Thực Tế Tại Xưởng & Album Đa Góc Độ</span>
            </div>

            <div className={styles.imagePreviewRow}>
              <div className={styles.imgThumb}>
                {formData.imageUrl ? (
                  <Image
                    src={formData.imageUrl}
                    alt="Preview"
                    fill
                    sizes="110px"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                    Chưa có ảnh
                  </div>
                )}
              </div>

              <div className={styles.uploadActions}>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <label className={styles.fileInputLabel}>
                    <Upload size={16} />
                    <span>{isUploading ? 'Đang tải lên máy chủ...' : 'Tải Ảnh Đại Diện Mới'}</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className={styles.hiddenFileInput}
                    />
                  </label>
                  {isUploading && <span style={{ fontSize: '0.8rem', color: '#b45309' }}>Vui lòng đợi giây lát...</span>}
                </div>

                <div className={styles.formGroup} style={{ marginTop: '0.25rem' }}>
                  <label className={styles.label}>Đường dẫn ảnh đại diện chính (URL)</label>
                  <input
                    type="text"
                    placeholder="VD: /images/banner_main.png hoặc https://..."
                    value={formData.imageUrl || ''}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Album Gallery Images */}
            <div className={styles.gallerySection}>
              <div className={styles.galleryHeader}>
                <label className={styles.label}>
                  <strong>Album hình ảnh đa góc độ ({formData.gallery?.length || 0} ảnh):</strong>
                </label>
                <label className={styles.fileInputLabel} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                  <Upload size={14} />
                  <span>{isGalleryUploading ? 'Đang tải...' : 'Tải thêm ảnh vào Album'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleGalleryUpload}
                    disabled={isGalleryUploading}
                    className={styles.hiddenFileInput}
                  />
                </label>
              </div>

              {formData.gallery && formData.gallery.length > 0 && (
                <div className={styles.galleryGrid}>
                  {formData.gallery.map((imgUrl, idx) => (
                    <div key={idx} className={styles.galleryThumbItem} title={`Ảnh ${idx + 1}`}>
                      <img src={imgUrl} alt={`Ảnh ${idx + 1}`} />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className={styles.removeGalleryBtn}
                        title="Xóa ảnh này khỏi album"
                        aria-label="Xóa ảnh"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.addGalleryRow}>
                <input
                  type="text"
                  placeholder="Dán link ảnh phụ (URL) rồi bấm Thêm..."
                  value={galleryUrlInput}
                  onChange={(e) => setGalleryUrlInput(e.target.value)}
                  className={styles.input}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddGalleryUrl();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddGalleryUrl}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1rem', fontSize: '0.85rem', flexShrink: 0 }}
                >
                  <Plus size={16} /> Thêm ảnh
                </button>
              </div>
            </div>
          </div>

          {/* 4. MÔ TẢ CHI TIẾT & BẰNG CHỨNG FACEBOOK */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionTitle}>
              <FileText size={18} color="#b45309" />
              <span>4. Mô Tả & Bằng Chứng Sản Xuất Facebook</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mô tả sản phẩm</label>
              <textarea
                rows={3}
                placeholder="Mô tả công năng, ứng dụng chịu tải thực tế của sản phẩm tại xưởng..."
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={styles.textarea}
              />
            </div>

            <div className={styles.grid2}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Mục đích sử dụng phù hợp</label>
                <input
                  type="text"
                  placeholder="VD: Đóng kiện máy CNC, kê hàng xuất sang Mỹ"
                  value={formData.usagePurpose || ''}
                  onChange={(e) => setFormData({ ...formData, usagePurpose: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Thẻ nhãn nổi bật (Badges - cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  placeholder="VD: XUẤT MỸ, CHỊU LỰC 2 TẤN, GIÁ XƯỞNG"
                  value={badgeInput}
                  onChange={(e) => setBadgeInput(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            {/* Highlights List */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Các điểm nổi bật chính (Highlights)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(formData.highlights || []).map((hl, idx) => (
                  <div key={idx} className={styles.listRow}>
                    <input
                      type="text"
                      value={hl}
                      placeholder={`Điểm nổi bật #${idx + 1}`}
                      onChange={(e) => handleHighlightChange(idx, e.target.value)}
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => removeHighlightRow(idx)}
                      className={styles.removeRowBtn}
                      title="Xóa dòng này"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addHighlightRow}
                  className={styles.addRowBtn}
                >
                  <Plus size={16} />
                  <span>Thêm gạch đầu dòng nổi bật</span>
                </button>
              </div>
            </div>

            {/* Facebook Proof of Work */}
            <div style={{ marginTop: '0.5rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '700', color: '#1d4ed8', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <Facebook size={18} />
                <span>Bằng chứng sản xuất thực tế trên Fanpage Facebook</span>
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tiêu đề bài viết thực tế</label>
                  <input
                    type="text"
                    placeholder="VD: Lô 300 thùng kiện gỗ máy móc xuất đi Campuchia"
                    value={formData.facebookProof?.title || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facebookProof: {
                          ...formData.facebookProof,
                          title: e.target.value,
                          description: formData.facebookProof?.description || '',
                          fbUrl: formData.facebookProof?.fbUrl || '',
                        },
                      })
                    }
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Đường link bài viết Facebook (fbUrl)</label>
                  <input
                    type="text"
                    placeholder="https://www.facebook.com/PalletTruongAn/posts/..."
                    value={formData.facebookProof?.fbUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facebookProof: {
                          ...formData.facebookProof,
                          title: formData.facebookProof?.title || '',
                          description: formData.facebookProof?.description || '',
                          fbUrl: e.target.value,
                        },
                      })
                    }
                    className={styles.input}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer inside form */}
          <div className={styles.modalFooter}>
            <button type="button" onClick={onClose} className={styles.cancelBtn} disabled={isSaving}>
              Hủy Bỏ
            </button>
            <button type="submit" className={styles.saveBtn} disabled={isSaving || isUploading}>
              <Save size={18} />
              <span>{isSaving ? 'Đang lưu vào hệ thống...' : 'Lưu Sản Phẩm'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
