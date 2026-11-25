'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Globe,
  Sparkles,
} from 'lucide-react';
import { buildAutoProductTranslations } from '@/i18n/productLocalizer';
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
  { value: 'nhua', label: 'Nhựa HDPE / PP Công Nghiệp' },
  { value: 'go-cu', label: 'Gỗ Cũ / Thanh Lý (Tiết kiệm)' },
];

const TARGET_MARKETS = [
  { value: 'xuat-khau-my', label: 'Xuất khẩu thị trường Mỹ (Chuẩn GMA / ISPM 15)' },
  { value: 'xuat-khau-campuchia', label: 'Xuất khẩu Campuchia / ASEAN' },
  { value: 'xuat-khau-ispm15', label: 'Xuất khẩu Tiêu chuẩn ISPM 15 (Chung)' },
  { value: 'noi-dia', label: 'Lưu kho & Vận chuyển nội địa Việt Nam' },
];

type SectionKey = 'basic' | 'spec' | 'images' | 'desc' | 'i18n';

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    category: categories[0]?.name || 'Pallet Gỗ Tràm (3 Gánh & 9 Chân Gù)',
    categorySlug: categories[0]?.slug || 'pallet-go-tram',
    dimensions: '1200 x 1000 x 120 mm',
    woodType: 'Gỗ Tràm tự nhiên tuyển chọn',
    materialGroup: 'go-tram',
    targetMarket: 'noi-dia',
    staticLoad: '2.000 kg',
    dynamicLoad: '1.000 kg',
    specification: '',
    isExportStandard: false,
    isNew: true,
    priceDisplay: 'Liên hệ',
    description: '',
    usagePurpose: 'Kê kho, vận chuyển nội địa & xuất khẩu',
    imageUrl: '',
    highlights: ['Chịu tải trọng tốt', 'Sản xuất trực tiếp tại xưởng'],
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
  const [specRows, setSpecRows] = useState<string[]>(['']);
  const [activeSection, setActiveSection] = useState<SectionKey>('basic');
  const [transTab, setTransTab] = useState<'en' | 'zh'>('en');
  const [transEdited, setTransEdited] = useState(false);
  const [transSpecRows, setTransSpecRows] = useState<{ en: string[]; zh: string[] }>({
    en: [''],
    zh: [''],
  });

  const parseSpecToRows = (spec?: string): string[] => {
    const parsed = (spec || '')
      .split(/[\u00b7\u2022\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    return parsed.length > 0 ? parsed : [''];
  };

  const secBasicRef = useRef<HTMLDivElement>(null);
  const secSpecRef = useRef<HTMLDivElement>(null);
  const secImagesRef = useRef<HTMLDivElement>(null);
  const secDescRef = useRef<HTMLDivElement>(null);
  const secI18nRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      const cleanGallery = (product.gallery || []).filter((img) => Boolean(img && !img.endsWith('banner_main.png')));
      setFormData({
        ...product,
        gallery: cleanGallery.length > 0 ? cleanGallery : (product.imageUrl ? [product.imageUrl] : []),
        highlights: product.highlights?.length ? [...product.highlights] : ['Chịu tải trọng tốt'],
        badges: product.badges?.length ? [...product.badges] : ['GIÁ XƯỞNG'],
        facebookProof: product.facebookProof || {
          title: '',
          description: '',
          fbUrl: '',
        },
      });
      setBadgeInput(product.badges ? product.badges.join(', ') : '');
      setSpecRows(parseSpecToRows(product.specification));
      setTransSpecRows({
        en: parseSpecToRows(product.translations?.en?.specification),
        zh: parseSpecToRows(product.translations?.zh?.specification),
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        category: categories[0]?.name || 'Pallet Gỗ Tràm (3 Gánh & 9 Chân Gù)',
        categorySlug: categories[0]?.slug || 'pallet-go-tram',
        dimensions: '1200 x 1000 x 120 mm',
        woodType: 'Gỗ Tràm tự nhiên tuyển chọn',
        materialGroup: 'go-tram',
        targetMarket: 'noi-dia',
        staticLoad: '2.000 kg',
        dynamicLoad: '1.000 kg',
        specification: '',
        isExportStandard: false,
        isNew: true,
        priceDisplay: 'Liên hệ',
        description: '',
        usagePurpose: 'Kê kho, đóng hàng xuất khẩu',
        imageUrl: '',
        gallery: [],
        highlights: ['Chuẩn quy cách kỹ thuật', 'Giá gốc tại xưởng không qua trung gian'],
        badges: ['GIÁ TẠI XƯỞNG'],
        facebookProof: {
          title: '',
          description: '',
          fbUrl: '',
        },
      });
      setBadgeInput('GIÁ TẠI XƯỞNG');
      setSpecRows(['']);
      setTransSpecRows({ en: [''], zh: [''] });
    }
    setErrorMessage('');
    setGalleryUrlInput('');
    setActiveSection('basic');
    setTransEdited(false);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const scrollToSection = (key: SectionKey) => {
    setActiveSection(key);
    const refMap: Record<SectionKey, React.RefObject<HTMLDivElement>> = {
      basic: secBasicRef,
      spec: secSpecRef,
      images: secImagesRef,
      desc: secDescRef,
      i18n: secI18nRef,
    };
    refMap[key].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleTransField = (lang: 'en' | 'zh', field: string, val: string) => {
    setTransEdited(true);
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...(prev.translations?.[lang] || {}),
          [field]: val,
        },
      },
    }));
  };

  const handleAutoGenerateTranslations = () => {
    const joinedSpec = specRows.map((s) => s.trim()).filter(Boolean).join(' \u00b7 ');
    const draftProduct = {
      ...(formData as Product),
      id: formData.id || 'temp',
      slug: formData.slug || 'temp',
      name: formData.name || '',
      category: formData.category || '',
      categorySlug: formData.categorySlug || 'pallet-go-tram',
      dimensions: formData.dimensions || '',
      woodType: formData.woodType || '',
      materialGroup: formData.materialGroup || 'go-tram',
      targetMarket: formData.targetMarket || 'noi-dia',
      staticLoad: formData.staticLoad || '',
      dynamicLoad: formData.dynamicLoad || '',
      specification: joinedSpec,
      isExportStandard: Boolean(formData.isExportStandard),
      isNew: Boolean(formData.isNew),
      priceDisplay: formData.priceDisplay?.trim() || 'Liên hệ',
      description: formData.description || '',
      highlights: formData.highlights || [],
      imageUrl: formData.imageUrl || '',
      usagePurpose: formData.usagePurpose || '',
      badges: badgeInput.split(',').map((b) => b.trim()).filter(Boolean),
    };
    const generated = buildAutoProductTranslations(draftProduct);
    setTransEdited(true);
    setFormData((prev) => ({
      ...prev,
      translations: generated,
    }));
    setTransSpecRows({
      en: parseSpecToRows(generated.en?.specification),
      zh: parseSpecToRows(generated.zh?.specification),
    });
  };

  // Handle Translated Specification rows (giống hệt bản Tiếng Việt)
  const syncTransSpecToForm = (lang: 'en' | 'zh', rows: string[]) => {
    const joined = rows.map((s) => s.trim()).filter(Boolean).join(' \u00b7 ');
    handleTransField(lang, 'specification', joined);
  };

  const handleTransSpecChange = (lang: 'en' | 'zh', index: number, val: string) => {
    const updated = [...transSpecRows[lang]];
    updated[index] = val;
    setTransSpecRows((prev) => ({ ...prev, [lang]: updated }));
    syncTransSpecToForm(lang, updated);
  };

  const addTransSpecRow = (lang: 'en' | 'zh') => {
    setTransEdited(true);
    setTransSpecRows((prev) => ({
      ...prev,
      [lang]: [...prev[lang], ''],
    }));
  };

  const removeTransSpecRow = (lang: 'en' | 'zh', index: number) => {
    const filtered = transSpecRows[lang].filter((_, i) => i !== index);
    const next = filtered.length > 0 ? filtered : [''];
    setTransSpecRows((prev) => ({ ...prev, [lang]: next }));
    syncTransSpecToForm(lang, next);
  };

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
    setFormData({ ...formData, highlights: updated.length > 0 ? updated : [''] });
  };

  // Handle Specification rows (mỗi dòng tương ứng 1 gạch đầu dòng trên web)
  const handleSpecChange = (index: number, val: string) => {
    const updated = [...specRows];
    updated[index] = val;
    setSpecRows(updated);
  };

  const addSpecRow = () => {
    setSpecRows((prev) => [...prev, '']);
  };

  const removeSpecRow = (index: number) => {
    setSpecRows((prev) => {
      const next = prev.filter((_, i) => i !== index);
      return next.length > 0 ? next : [''];
    });
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
      scrollToSection('basic');
      return;
    }

    const processedBadges = badgeInput
      .split(',')
      .map((b) => b.trim().toUpperCase())
      .filter(Boolean);

    const cleanedHighlights = (formData.highlights || []).filter((h) => h.trim().length > 0);

    const joinedSpecification = specRows
      .map((s) => s.trim())
      .filter(Boolean)
      .join(' \u00b7 ');

    const nonBannerImages = (
      formData.gallery && formData.gallery.length > 0
        ? formData.gallery
        : [formData.imageUrl || '']
    ).filter((img): img is string => Boolean(img && !img.endsWith('banner_main.png')));

    const finalImageUrl =
      formData.imageUrl && !formData.imageUrl.endsWith('banner_main.png')
        ? formData.imageUrl
        : nonBannerImages[0] || '/images/banner_main.png';

    const finalGallery = nonBannerImages.length > 0 ? nonBannerImages : [finalImageUrl];

    const finalTranslations = transEdited
      ? {
          en: {
            ...(formData.translations?.en || {}),
            specification: transSpecRows.en.map((s) => s.trim()).filter(Boolean).join(' \u00b7 '),
          },
          zh: {
            ...(formData.translations?.zh || {}),
            specification: transSpecRows.zh.map((s) => s.trim()).filter(Boolean).join(' \u00b7 '),
          },
        }
      : undefined;

    setIsSaving(true);

    try {
      await onSave({
        ...formData,
        priceDisplay: formData.priceDisplay?.trim() || 'Liên hệ',
        specification: joinedSpecification,
        imageUrl: finalImageUrl,
        gallery: finalGallery,
        badges: processedBadges,
        highlights: cleanedHighlights,
        translations: finalTranslations,
      });
      onClose();
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Đã có lỗi khi lưu sản phẩm');
    } finally {
      setIsSaving(false);
    }
  };

  const galleryCount = (formData.gallery || []).filter((img) => !img.endsWith('banner_main.png')).length;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalHeaderLeft}>
            <div className={styles.headerIconBox}>
              <Package size={20} />
            </div>
            <div className={styles.modalTitleWrap}>
              <div className={styles.modalTitle}>
                {product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
              </div>
              <div className={styles.modalSubtitle}>
                {formData.name?.trim()
                  ? formData.name
                  : 'Nhập đầy đủ thông tin kỹ thuật, quy cách và hình ảnh thực tế tại xưởng'}
              </div>
            </div>
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Sticky Quick-Jump Navigation */}
        <div className={styles.sectionNav}>
          <button
            type="button"
            onClick={() => scrollToSection('basic')}
            className={`${styles.sectionNavBtn} ${activeSection === 'basic' ? styles.sectionNavBtnActive : ''}`}
          >
            <Layers size={14} />
            <span>1. Thông tin cơ bản</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('spec')}
            className={`${styles.sectionNavBtn} ${activeSection === 'spec' ? styles.sectionNavBtnActive : ''}`}
          >
            <ShieldCheck size={14} />
            <span>2. Kỹ thuật & Quy cách</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('images')}
            className={`${styles.sectionNavBtn} ${activeSection === 'images' ? styles.sectionNavBtnActive : ''}`}
          >
            <ImageIcon size={14} />
            <span>3. Hình ảnh ({galleryCount})</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('desc')}
            className={`${styles.sectionNavBtn} ${activeSection === 'desc' ? styles.sectionNavBtnActive : ''}`}
          >
            <FileText size={14} />
            <span>4. Mô tả & Facebook</span>
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('i18n')}
            className={`${styles.sectionNavBtn} ${activeSection === 'i18n' ? styles.sectionNavBtnActive : ''}`}
          >
            <Globe size={14} />
            <span>5. Đa ngôn ngữ (EN/中文)</span>
          </button>
        </div>

        {/* Form Container (Scrollable Body + Sticky Footer) */}
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.modalBody}>
            {errorMessage && (
              <div className={styles.errorBanner}>⚠️ {errorMessage}</div>
            )}

            {/* 1. THÔNG TIN CƠ BẢN */}
            <div ref={secBasicRef} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionStep}>01</span>
                  <span>Thông Tin Cơ Bản</span>
                </div>
                <span className={styles.sectionHint}>Tên, đường dẫn & phân loại</span>
              </div>

              {/* Tên sản phẩm full-width */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Pallet Gỗ Tràm Đố Bằng 3 Gánh Phổ Thông — Mã PTA-T01"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.grid2}>
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
              </div>

              <div className={styles.grid2}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nhóm chất liệu *</label>
                  <select
                    value={formData.materialGroup || 'go-tram'}
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

            {/* 2. QUY CÁCH KỸ THUẬT & TẢI TRỌNG */}
            <div ref={secSpecRef} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionStep}>02</span>
                  <span>Quy Cách Kỹ Thuật & Tải Trọng</span>
                </div>
                <span className={styles.sectionHint}>Hiển thị trong bảng Thông số kỹ thuật</span>
              </div>

              <div className={styles.grid3}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Kích thước (D × R × C)</label>
                  <input
                    type="text"
                    placeholder="VD: 1200 × 1000 × 120 mm"
                    value={formData.dimensions || ''}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tải trọng tĩnh</label>
                  <input
                    type="text"
                    placeholder="VD: 2.000 - 3.000 kg"
                    value={formData.staticLoad || ''}
                    onChange={(e) => setFormData({ ...formData, staticLoad: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Tải trọng động</label>
                  <input
                    type="text"
                    placeholder="VD: 1.000 - 1.500 kg"
                    value={formData.dynamicLoad || ''}
                    onChange={(e) => setFormData({ ...formData, dynamicLoad: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.grid2Wide}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Chất liệu cụ thể</label>
                  <input
                    type="text"
                    placeholder="VD: Gỗ Tràm tự nhiên tuyển chọn, phôi thẳng không mục/mối"
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
                    value={formData.priceDisplay ?? ''}
                    onChange={(e) => setFormData({ ...formData, priceDisplay: e.target.value })}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Quy cách chi tiết dạng từng dòng */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Quy cách chi tiết</span>
                  <span className={styles.labelHint}>(mỗi dòng hiển thị thành 1 gạch đầu dòng trên web)</span>
                </label>
                <div className={styles.listContainer}>
                  {specRows.map((row, idx) => (
                    <div key={idx} className={styles.listRow}>
                      <span className={styles.rowIndexBadge}>{idx + 1}</span>
                      <input
                        type="text"
                        value={row}
                        placeholder={
                          idx === 0
                            ? 'VD: 3 gánh dọc nâng 2 hướng'
                            : idx === 1
                              ? 'VD: 7 nan mặt (1200×90×17 mm)'
                              : `Dòng quy cách #${idx + 1}`
                        }
                        onChange={(e) => handleSpecChange(idx, e.target.value)}
                        className={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(idx)}
                        className={styles.removeRowBtn}
                        title="Xóa dòng quy cách này"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className={styles.addRowBtn}
                  >
                    <Plus size={15} />
                    <span>Thêm dòng quy cách</span>
                  </button>
                </div>
              </div>

              {/* Toggle Cards */}
              <div className={styles.grid2}>
                <label
                  className={`${styles.checkboxCard} ${formData.isExportStandard ? styles.checkboxCardActive : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.isExportStandard || false}
                    onChange={(e) => setFormData({ ...formData, isExportStandard: e.target.checked })}
                    className={styles.checkboxInput}
                  />
                  <div className={styles.checkboxTextWrap}>
                    <span className={styles.checkboxLabel}>Tiêu chuẩn xuất khẩu ISPM 15</span>
                    <span className={styles.checkboxSub}>Hun trùng nhiệt HT & đóng dấu mộc xuất khẩu</span>
                  </div>
                </label>

                <label
                  className={`${styles.checkboxCard} ${(formData.isNew ?? true) ? styles.checkboxCardActive : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={formData.isNew ?? true}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className={styles.checkboxInput}
                  />
                  <div className={styles.checkboxTextWrap}>
                    <span className={styles.checkboxLabel}>Gắn nhãn &ldquo;Sản Phẩm Mới&rdquo;</span>
                    <span className={styles.checkboxSub}>Hiển thị badge nổi bật trên danh sách sản phẩm</span>
                  </div>
                </label>
              </div>
            </div>

            {/* 3. HÌNH ẢNH THỰC TẾ & ALBUM ĐA GÓC ĐỘ */}
            <div ref={secImagesRef} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionStep}>03</span>
                  <span>Hình Ảnh Thực Tế & Album Đa Góc Độ</span>
                </div>
                <span className={styles.sectionHint}>{galleryCount} ảnh trong album</span>
              </div>

              <div className={styles.imagePreviewRow}>
                <div className={styles.imgThumb}>
                  {formData.imageUrl ? (
                    <Image
                      src={formData.imageUrl}
                      alt="Preview"
                      fill
                      sizes="132px"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#94a3b8',
                        fontSize: '0.8rem',
                      }}
                    >
                      Chưa có ảnh
                    </div>
                  )}
                </div>

                <div className={styles.uploadActions}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <label className={styles.fileInputLabel}>
                      <Upload size={15} />
                      <span>{isUploading ? 'Đang tải lên...' : 'Tải Ảnh Đại Diện Mới'}</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                        className={styles.hiddenFileInput}
                      />
                    </label>
                    <span style={{ fontSize: '0.76rem', color: '#64748b' }}>
                      Hỗ trợ JPG, PNG, WebP (tối đa 5MB)
                    </span>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Đường dẫn ảnh đại diện chính (URL)</label>
                    <input
                      type="text"
                      placeholder="https://... hoặc /images/..."
                      value={formData.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Album Gallery */}
              <div className={styles.gallerySection}>
                <div className={styles.galleryHeader}>
                  <label className={styles.label}>
                    <span>Album ảnh chi tiết đa góc độ</span>
                    <span className={styles.labelHint}>(khuyến nghị 4–5 ảnh)</span>
                  </label>
                  <label className={styles.fileInputLabel}>
                    <Plus size={15} />
                    <span>{isGalleryUploading ? 'Đang tải ảnh...' : 'Tải thêm ảnh vào Album'}</span>
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
                    {formData.gallery
                      .filter((img) => !img.endsWith('banner_main.png'))
                      .map((imgUrl, idx) => (
                        <div key={idx} className={styles.galleryThumbItem}>
                          <img src={imgUrl} alt={`Album ${idx + 1}`} />
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
                    placeholder="Dán link ảnh phụ (URL) rồi bấm Thêm ảnh..."
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
                    style={{ padding: '0.6rem 1rem', fontSize: '0.84rem', flexShrink: 0 }}
                  >
                    <Plus size={15} /> Thêm ảnh
                  </button>
                </div>
              </div>
            </div>

            {/* 4. MÔ TẢ CHI TIẾT & BẰNG CHỨNG FACEBOOK */}
            <div ref={secDescRef} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionStep}>04</span>
                  <span>Mô Tả, Điểm Nổi Bật & Bằng Chứng Facebook</span>
                </div>
                <span className={styles.sectionHint}>Nội dung thuyết phục khách B2B</span>
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
                    placeholder="VD: Đóng kiện máy CNC, kê hàng kho xưởng & xuất khẩu"
                    value={formData.usagePurpose || ''}
                    onChange={(e) => setFormData({ ...formData, usagePurpose: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <span>Thẻ nhãn nổi bật</span>
                    <span className={styles.labelHint}>(cách nhau bằng dấu phẩy)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="VD: GIÁ XƯỞNG, SẴN KHO, CHỊU TẢI 3 TẤN"
                    value={badgeInput}
                    onChange={(e) => setBadgeInput(e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Highlights List */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Các điểm nổi bật chính (Highlights)</label>
                <div className={styles.listContainer}>
                  {(formData.highlights || []).map((hl, idx) => (
                    <div key={idx} className={styles.listRow}>
                      <span className={styles.rowIndexBadge}>{idx + 1}</span>
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
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHighlightRow}
                    className={styles.addRowBtn}
                  >
                    <Plus size={15} />
                    <span>Thêm điểm nổi bật</span>
                  </button>
                </div>
              </div>

              {/* Facebook Proof of Work */}
              <div className={styles.fbProofCard}>
                <div className={styles.fbProofTitle}>
                  <Facebook size={17} />
                  <span>Bằng chứng sản xuất thực tế trên Fanpage Facebook (tùy chọn)</span>
                </div>

                <div className={styles.grid2}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tiêu đề bài viết thực tế</label>
                    <input
                      type="text"
                      placeholder="VD: Lô 300 pallet gỗ tràm giao KCN Tân Tạo"
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
                    <label className={styles.label}>Đường link bài viết Facebook</label>
                    <input
                      type="text"
                      placeholder="https://www.facebook.com/..."
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

            {/* 5. BẢN DỊCH ĐA NGÔN NGỮ (EN / ZH) LƯU TRONG SUPABASE */}
            <div ref={secI18nRef} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>
                  <span className={styles.sectionStep}>05</span>
                  <span>Bản Dịch Đa Ngôn Ngữ (Tiếng Anh &amp; Tiếng Trung)</span>
                </div>
                <button
                  type="button"
                  onClick={handleAutoGenerateTranslations}
                  className={styles.addRowBtn}
                  style={{ margin: 0 }}
                >
                  <Sparkles size={14} />
                  <span>Tự dịch lại từ Tiếng Việt</span>
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setTransTab('en')}
                    className={`${styles.sectionNavBtn} ${transTab === 'en' ? styles.sectionNavBtnActive : ''}`}
                  >
                    <span>🇺🇸 Tiếng Anh (English)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTransTab('zh')}
                    className={`${styles.sectionNavBtn} ${transTab === 'zh' ? styles.sectionNavBtnActive : ''}`}
                  >
                    <span>🇨🇳 Tiếng Trung (简体中文)</span>
                  </button>
                </div>
                <span className={styles.sectionHint}>
                  {transEdited
                    ? 'Đang dùng bản dịch tùy chỉnh'
                    : 'Mặc định tự đồng bộ EN / 中文 khi bấm Lưu'}
                </span>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Tên sản phẩm ({transTab === 'en' ? 'English' : '简体中文'})
                </label>
                <input
                  type="text"
                  placeholder={transTab === 'en' ? 'Auto-generated if left blank...' : '留空将自动从越南语生成...'}
                  value={formData.translations?.[transTab]?.name || ''}
                  onChange={(e) => handleTransField(transTab, 'name', e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.grid2Wide}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Chất liệu ({transTab === 'en' ? 'English' : '简体中文'})
                  </label>
                  <input
                    type="text"
                    value={formData.translations?.[transTab]?.woodType || ''}
                    onChange={(e) => handleTransField(transTab, 'woodType', e.target.value)}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Giá hiển thị ({transTab === 'en' ? 'English' : '简体中文'})
                  </label>
                  <input
                    type="text"
                    value={formData.translations?.[transTab]?.priceDisplay || ''}
                    onChange={(e) => handleTransField(transTab, 'priceDisplay', e.target.value)}
                    className={styles.input}
                  />
                </div>
              </div>

              {/* Quy cách chi tiết dạng từng dòng (giống bản Tiếng Việt) */}
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  <span>Quy cách chi tiết ({transTab === 'en' ? 'English' : '简体中文'})</span>
                  <span className={styles.labelHint}>
                    (mỗi dòng hiển thị thành 1 gạch đầu dòng trên web)
                  </span>
                </label>
                <div className={styles.listContainer}>
                  {transSpecRows[transTab].map((row, idx) => (
                    <div key={`${transTab}-${idx}`} className={styles.listRow}>
                      <span className={styles.rowIndexBadge}>{idx + 1}</span>
                      <input
                        type="text"
                        value={row}
                        placeholder={
                          transTab === 'en'
                            ? idx === 0
                              ? 'e.g. Structure: 3 longitudinal stringers, 2-way forklift entry'
                              : idx === 1
                                ? 'e.g. Top deck boards: 7 boards (1200×90×17 mm)'
                                : `Specification line #${idx + 1}`
                            : idx === 0
                              ? '例：进叉结构：3根纵梁 · 双向进叉'
                              : idx === 1
                                ? '例：顶板木条：7根 (1200×90×17 mm)'
                                : `规格明细 #${idx + 1}`
                        }
                        onChange={(e) => handleTransSpecChange(transTab, idx, e.target.value)}
                        className={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => removeTransSpecRow(transTab, idx)}
                        className={styles.removeRowBtn}
                        title="Xóa dòng quy cách này"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTransSpecRow(transTab)}
                    className={styles.addRowBtn}
                  >
                    <Plus size={15} />
                    <span>
                      Thêm dòng quy cách ({transTab === 'en' ? 'English' : '中文'})
                    </span>
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Mô tả sản phẩm ({transTab === 'en' ? 'English' : '简体中文'})
                </label>
                <textarea
                  rows={5}
                  value={formData.translations?.[transTab]?.description || ''}
                  onChange={(e) => handleTransField(transTab, 'description', e.target.value)}
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className={styles.modalFooter}>
            <div className={styles.footerHint}>
              <CheckCircle size={15} color="#16a34a" />
              <span>Dữ liệu sẽ được đồng bộ trực tiếp lên website sau khi lưu</span>
            </div>
            <div className={styles.footerActions}>
              <button
                type="button"
                onClick={onClose}
                className={styles.cancelBtn}
                disabled={isSaving}
              >
                Hủy Bỏ
              </button>
              <button
                type="submit"
                className={styles.saveBtn}
                disabled={isSaving || isUploading}
              >
                <Save size={17} />
                <span>{isSaving ? 'Đang lưu...' : 'Lưu Sản Phẩm'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
