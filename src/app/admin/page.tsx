'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product, categories } from '@/data/products';
import { ProductModal } from '@/components/admin/ProductModal';
import {
  Package,
  Plus,
  Search,
  LogOut,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  Box,
  Globe,
  Layers,
  ShieldCheck,
  Facebook,
  FileSpreadsheet,
} from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // 1. Kiểm tra xác thực Admin
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth-check');
        const data = await res.json();
        if (!data.authenticated) {
          router.replace('/admin/login');
          return;
        }
        setIsAuthChecked(true);
      } catch {
        router.replace('/admin/login');
      }
    }
    checkAuth();
  }, [router]);

  // 2. Tải danh sách sản phẩm từ API
  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Lỗi khi tải sản phẩm:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      loadProducts();
    }
  }, [isAuthChecked, loadProducts]);

  // 3. Xử lý Đăng xuất
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch {
      router.replace('/admin/login');
    }
  };

  // 4. Lưu sản phẩm (Thêm mới hoặc Cập nhật)
  const handleSaveProduct = async (productData: Partial<Product>) => {
    const isEdit = !!editingProduct?.id;
    const url = isEdit ? `/api/products/${editingProduct.id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Không thể lưu sản phẩm');
    }

    await loadProducts();
    showToast(isEdit ? '✅ Đã cập nhật sản phẩm thành công!' : '🎉 Đã thêm sản phẩm mới thành công!');
  };

  // 5. Xóa sản phẩm
  const handleDeleteProduct = async (product: Product) => {
    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?\nThao tác này sẽ xóa vĩnh viễn khỏi danh mục.`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/products/${product.id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadProducts();
        showToast(`🗑️ Đã xóa sản phẩm "${product.name}"`);
      } else {
        const err = await res.json();
        alert(err.error || 'Không thể xóa sản phẩm');
      }
    } catch {
      alert('Đã xảy ra lỗi khi kết nối máy chủ để xóa sản phẩm.');
    }
  };

  // Tính toán thống kê
  const stats = useMemo(() => {
    return {
      total: products.length,
      exportISPM: products.filter((p) => p.isExportStandard).length,
      plywood: products.filter((p) => p.materialGroup === 'van-ep').length,
      crates: products.filter((p) => p.categorySlug === 'thung-go-dong-hang').length,
    };
  }, [products]);

  // Lọc sản phẩm
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.categorySlug === selectedCategory;
      const matchesMarket = selectedMarket === 'all' || p.targetMarket === selectedMarket;
      const matchesMat = selectedMaterial === 'all' || p.materialGroup === selectedMaterial;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.woodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.badges && p.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCat && matchesMarket && matchesMat && matchesSearch;
    });
  }, [products, selectedCategory, selectedMarket, selectedMaterial, searchQuery]);

  if (!isAuthChecked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#64748b' }}>
        <p>Đang kiểm tra quyền quản trị...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className={styles.toast}>
          <CheckCircle2 size={18} color="#22c55e" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <div className={styles.brandLogo}>
              <Image
                src="/images/logo_home.jpg"
                alt="Logo Pallet Trường An"
                width={44}
                height={44}
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <div className={styles.brandTitle}>Quản Trị Pallet Trường An</div>
              <div className={styles.brandSub}>
                <span>Xưởng Hóc Môn (Mr. Ngọc Ký)</span>
                <span className={styles.adminBadge}>Admin Mode</span>
              </div>
            </div>
          </div>

          <div className={styles.headerActions}>
            <Link href="/" target="_blank" className={styles.btnWebsite} title="Mở trang chủ website trong tab mới">
              <ExternalLink size={15} />
              <span>Xem Website</span>
            </Link>

            <button onClick={handleLogout} className={styles.btnLogout} title="Đăng xuất khỏi hệ thống quản trị">
              <LogOut size={15} />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className={styles.main}>
        {/* Stat Cards */}
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#fef3c7', color: '#b45309' }}>
              <Package size={24} />
            </div>
            <div>
              <div className={styles.statLabel}>TỔNG SẢN PHẨM</div>
              <div className={styles.statValue}>{stats.total}</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className={styles.statLabel}>CHUẨN XUẤT KHẨU ISPM 15</div>
              <div className={styles.statValue}>{stats.exportISPM}</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#e0e7ff', color: '#4f46e5' }}>
              <Layers size={24} />
            </div>
            <div>
              <div className={styles.statLabel}>PALLET VÁN ÉP (PLYWOOD)</div>
              <div className={styles.statValue}>{stats.plywood}</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: '#ffedd5', color: '#ea580c' }}>
              <Box size={24} />
            </div>
            <div>
              <div className={styles.statLabel}>THÙNG GỖ / KIỆN MÁY</div>
              <div className={styles.statValue}>{stats.crates}</div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className={styles.controlBar}>
          <div className={styles.controlRowTop}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Tìm sản phẩm theo tên, kích thước, loại gỗ hoặc badge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsModalOpen(true);
                }}
                className={styles.btnAddNew}
              >
                <Plus size={18} />
                <span>Thêm Sản Phẩm Mới</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className={styles.filterRow}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Tất cả danh mục ({products.length})</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Tất cả chất liệu</option>
              <option value="go-thong">Gỗ Thông xẻ sấy</option>
              <option value="go-tram">Gỗ Tràm tự nhiên</option>
              <option value="van-ep">Ván Ép Plywood</option>
              <option value="go-cu">Gỗ Cũ Thanh Lý</option>
            </select>

            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="all">Tất cả thị trường</option>
              <option value="xuat-khau-my">Xuất khẩu thị trường Mỹ</option>
              <option value="xuat-khau-campuchia">Xuất khẩu Campuchia / ASEAN</option>
              <option value="xuat-khau-ispm15">Tiêu chuẩn ISPM 15</option>
              <option value="noi-dia">Nội địa Việt Nam</option>
            </select>

            {(searchQuery || selectedCategory !== 'all' || selectedMaterial !== 'all' || selectedMarket !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedMaterial('all');
                  setSelectedMarket('all');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b45309',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'underline',
                }}
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Product Table */}
        <div className={styles.tableContainer}>
          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              Đang tải dữ liệu sản phẩm...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>
              <Package size={44} color="#94a3b8" />
              <p style={{ fontWeight: 600, color: '#334155' }}>Không tìm thấy sản phẩm nào</p>
              <p style={{ fontSize: '0.85rem' }}>Thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Thêm Sản Phẩm Mới".</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '40%' }}>Sản Phẩm & Danh Mục</th>
                  <th style={{ width: '22%' }}>Quy Cách & Loại Gỗ</th>
                  <th style={{ width: '18%' }}>Tải Trọng (Tĩnh / Động)</th>
                  <th style={{ width: '10%' }}>Thị Trường & Chuẩn</th>
                  <th style={{ width: '10%', textAlign: 'center' }}>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.productCell}>
                        <div className={styles.thumbImg}>
                          <Image
                            src={p.imageUrl || '/images/banner_main.png'}
                            alt={p.name}
                            fill
                            sizes="64px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.productInfo}>
                          <div className={styles.productName}>{p.name}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className={styles.categoryTag}>{p.category}</span>
                            <span className={styles.productSlug}>/san-pham/{p.slug}</span>
                          </div>
                          {p.badges && p.badges.length > 0 && (
                            <div>
                              {p.badges.map((b, idx) => (
                                <span key={idx} className={styles.badgePill}>
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.dimensions}</div>
                      <div style={{ fontSize: '0.825rem', color: '#64748b' }}>{p.woodType}</div>
                      {p.specification && (
                        <div style={{ fontSize: '0.775rem', color: '#94a3b8' }}>{p.specification}</div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        Tĩnh: <strong style={{ color: '#0f172a' }}>{p.staticLoad}</strong>
                      </div>
                      <div style={{ fontSize: '0.85rem' }}>
                        Động: <strong style={{ color: '#0f172a' }}>{p.dynamicLoad}</strong>
                      </div>
                    </td>
                    <td>
                      {p.isExportStandard ? (
                        <span className={styles.tagExport}>
                          <ShieldCheck size={13} />
                          <span>ISPM 15 HT</span>
                        </span>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Nội địa</span>
                      )}
                      {p.facebookProof?.fbUrl && (
                        <div style={{ marginTop: '0.3rem' }}>
                          <a
                            href={p.facebookProof.fbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.75rem',
                              color: '#1d4ed8',
                              textDecoration: 'none',
                            }}
                          >
                            <Facebook size={12} />
                            <span>Xem bài viết FB</span>
                          </a>
                        </div>
                      )}
                    </td>
                    <td>
                      <div className={styles.actionButtons} style={{ justifyContent: 'center' }}>
                        <Link
                          href={`/san-pham/${p.slug}`}
                          target="_blank"
                          className={styles.btnAction}
                          title="Xem trang sản phẩm trên website"
                        >
                          <ExternalLink size={16} />
                        </Link>

                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setIsModalOpen(true);
                          }}
                          className={`${styles.btnAction} ${styles.btnActionEdit}`}
                          title="Chỉnh sửa sản phẩm"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p)}
                          className={`${styles.btnAction} ${styles.btnActionDelete}`}
                          title="Xóa sản phẩm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal Thêm/Sửa Sản Phẩm */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
