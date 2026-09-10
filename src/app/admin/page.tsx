'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Product, categories } from '@/data/products';
import { Activity, activityCategories, ActivityCategory } from '@/data/activities';
import { CustomerQuote, QuoteStatus } from '@/data/quotes';
import { ProductionOrder, OrderStatus } from '@/data/orders';
import { companyInfo } from '@/data/companyInfo';
import { ProductModal } from '@/components/admin/ProductModal';
import { ActivityModal } from '@/components/admin/ActivityModal';
import { OrderModal } from '@/components/admin/OrderModal';
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
  Layers,
  ShieldCheck,
  Facebook,
  Camera,
  Calendar,
  MapPin,
  Truck,
  Zap,
  Flame,
  MessageSquare,
  ClipboardList,
  Phone,
  Mail,
  User,
  Clock,
  Settings,
  Menu,
  X,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react';
import styles from './admin.module.css';

type AdminTab = 'quotes' | 'orders' | 'products' | 'activities' | 'settings';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Active Menu Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('quotes');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 1. Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [quotes, setQuotes] = useState<CustomerQuote[]>([]);
  const [orders, setOrders] = useState<ProductionOrder[]>([]);

  // Loading States
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [productCatFilter, setProductCatFilter] = useState('all');
  const [quoteStatusFilter, setQuoteStatusFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [activityCatFilter, setActivityCatFilter] = useState('all');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ProductionOrder | null>(null);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Auth Check
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

  // Load All Data
  const loadAllData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [prodRes, actRes, quoteRes, orderRes] = await Promise.all([
        fetch('/api/products').then((r) => r.json()).catch(() => []),
        fetch('/api/activities').then((r) => r.json()).catch(() => []),
        fetch('/api/quotes').then((r) => r.json()).catch(() => []),
        fetch('/api/orders').then((r) => r.json()).catch(() => []),
      ]);

      if (Array.isArray(prodRes)) setProducts(prodRes);
      if (Array.isArray(actRes)) setActivities(actRes);
      if (Array.isArray(quoteRes)) setQuotes(quoteRes);
      if (Array.isArray(orderRes)) setOrders(orderRes);
    } catch (err) {
      console.error('Lỗi khi tải dữ liệu admin:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthChecked) {
      loadAllData();
    }
  }, [isAuthChecked, loadAllData]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.replace('/admin/login');
    } catch {
      router.replace('/admin/login');
    }
  };

  // Handlers for Products
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

    await loadAllData();
    showToast(isEdit ? '✅ Đã cập nhật sản phẩm!' : '🎉 Đã thêm sản phẩm mới!');
  };

  const handleDeleteProduct = async (p: Product) => {
    if (!window.confirm(`Xóa sản phẩm "${p.name}"?`)) return;
    const res = await fetch(`/api/products/${p.id}`, { method: 'DELETE' });
    if (res.ok) {
      await loadAllData();
      showToast(`🗑️ Đã xóa "${p.name}"`);
    }
  };

  // Handlers for Activities
  const handleSaveActivity = async (activityData: Partial<Activity>) => {
    const isEdit = !!editingActivity?.id;
    const url = isEdit ? `/api/activities/${editingActivity.id}` : '/api/activities';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Không thể lưu bài hoạt động');
    }

    await loadAllData();
    showToast(isEdit ? '✅ Đã cập nhật hoạt động xưởng!' : '🎉 Đã đăng bài mới!');
  };

  const handleDeleteActivity = async (act: Activity) => {
    if (!window.confirm(`Xóa hoạt động "${act.title}"?`)) return;
    const res = await fetch(`/api/activities/${act.id}`, { method: 'DELETE' });
    if (res.ok) {
      await loadAllData();
      showToast(`🗑️ Đã xóa bài hoạt động`);
    }
  };

  // Handlers for Quotes
  const handleUpdateQuoteStatus = async (quote: CustomerQuote, newStatus: QuoteStatus) => {
    const res = await fetch(`/api/quotes/${quote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      await loadAllData();
      showToast(`✅ Đã đổi trạng thái báo giá sang "${newStatus}"`);
    }
  };

  const handleDeleteQuote = async (quote: CustomerQuote) => {
    if (!window.confirm(`Xóa yêu cầu báo giá của "${quote.customerName}"?`)) return;
    const res = await fetch(`/api/quotes/${quote.id}`, { method: 'DELETE' });
    if (res.ok) {
      await loadAllData();
      showToast(`🗑️ Đã xóa yêu cầu báo giá`);
    }
  };

  // Handlers for Orders
  const handleSaveOrder = async (orderData: Partial<ProductionOrder>) => {
    const isEdit = !!editingOrder?.id;
    const url = isEdit ? `/api/orders/${editingOrder.id}` : '/api/orders';
    const method = isEdit ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Không thể lưu đơn hàng');
    }

    await loadAllData();
    showToast(isEdit ? '✅ Đã cập nhật đơn hàng!' : '🎉 Đã tạo đơn hàng mới!');
  };

  const handleDeleteOrder = async (ord: ProductionOrder) => {
    if (!window.confirm(`Xóa đơn hàng ${ord.orderCode}?`)) return;
    const res = await fetch(`/api/orders/${ord.id}`, { method: 'DELETE' });
    if (res.ok) {
      await loadAllData();
      showToast(`🗑️ Đã xóa đơn hàng ${ord.orderCode}`);
    }
  };

  // Counts for Badges
  const newQuotesCount = useMemo(() => quotes.filter((q) => q.status === 'moi').length, [quotes]);
  const activeOrdersCount = useMemo(() => orders.filter((o) => o.status === 'dang_san_xuat' || o.status === 'dong_mau').length, [orders]);

  // Filtered lists
  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchStatus = quoteStatusFilter === 'all' || q.status === quoteStatusFilter;
      const matchSearch =
        !searchQuery.trim() ||
        q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.phone.includes(searchQuery) ||
        q.productTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [quotes, quoteStatusFilter, searchQuery]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      const matchSearch =
        !searchQuery.trim() ||
        o.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.productName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, orderStatusFilter, searchQuery]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = productCatFilter === 'all' || p.categorySlug === productCatFilter;
      const matchSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.dimensions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.woodType.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, productCatFilter, searchQuery]);

  const filteredActivities = useMemo(() => {
    return activities.filter((a) => {
      const matchCat = activityCatFilter === 'all' || a.category === activityCatFilter;
      const matchSearch =
        !searchQuery.trim() ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.customerLocation && a.customerLocation.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activities, activityCatFilter, searchQuery]);

  if (!isAuthChecked) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: '#64748b' }}>
        <p>Đang kiểm tra quyền quản trị...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminWrapper}>
      {toastMessage && (
        <div className={styles.toast}>
          <CheckCircle2 size={18} color="#22c55e" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`${styles.sidebar} ${mobileSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <Image
              src="/images/logo_home.jpg"
              alt="Logo Pallet Trường An"
              width={42}
              height={42}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={styles.sidebarBrandText}>
            <span className={styles.brandName}>Pallet Trường An</span>
            <span className={styles.brandSub}>Xưởng Hóc Môn • Admin</span>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {/* Group 1: KINH DOANH */}
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Kinh Doanh & Khách Hàng</span>

            <button
              onClick={() => { setActiveTab('quotes'); setSearchQuery(''); }}
              className={`${styles.navBtn} ${activeTab === 'quotes' ? styles.navBtnActive : ''}`}
            >
              <div className={styles.navBtnLeft}>
                <MessageSquare size={18} style={{ flexShrink: 0 }} />
                <span>Báo Giá Khách Hàng</span>
              </div>
              {newQuotesCount > 0 && (
                <span className={`${styles.navBadge} ${styles.navBadgeAlert}`}>
                  {newQuotesCount} mới
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setSearchQuery(''); }}
              className={`${styles.navBtn} ${activeTab === 'orders' ? styles.navBtnActive : ''}`}
            >
              <div className={styles.navBtnLeft}>
                <ClipboardList size={18} style={{ flexShrink: 0 }} />
                <span>Quản Lý Đơn Hàng</span>
              </div>
              <span className={styles.navBadge}>{orders.length}</span>
            </button>
          </div>

          {/* Group 2: SẢN XUẤT */}
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Kho & Sản Xuất</span>

            <button
              onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
              className={`${styles.navBtn} ${activeTab === 'products' ? styles.navBtnActive : ''}`}
            >
              <div className={styles.navBtnLeft}>
                <Package size={18} style={{ flexShrink: 0 }} />
                <span>Danh Mục Sản Phẩm</span>
              </div>
              <span className={styles.navBadge}>{products.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('activities'); setSearchQuery(''); }}
              className={`${styles.navBtn} ${activeTab === 'activities' ? styles.navBtnActive : ''}`}
            >
              <div className={styles.navBtnLeft}>
                <Camera size={18} style={{ flexShrink: 0 }} />
                <span>Hoạt Động Xưởng</span>
              </div>
              <span className={styles.navBadge}>{activities.length}</span>
            </button>
          </div>

          {/* Group 3: CẤU HÌNH */}
          <div className={styles.navGroup}>
            <span className={styles.navGroupTitle}>Hệ Thống</span>

            <button
              onClick={() => { setActiveTab('settings'); setSearchQuery(''); }}
              className={`${styles.navBtn} ${activeTab === 'settings' ? styles.navBtnActive : ''}`}
            >
              <div className={styles.navBtnLeft}>
                <Settings size={18} style={{ flexShrink: 0 }} />
                <span>Thông Tin & Hotline</span>
              </div>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer User Card */}
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>K</div>
            <div>
              <div className={styles.userName}>Mr. Ngọc Ký</div>
              <div className={styles.userRole}>Chủ Xưởng • Toàn Quyền</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className={styles.mainWrapper}>
        {/* Top Header Bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarTitle}>
            {activeTab === 'quotes' && <><span>📩</span><span>Yêu Cầu Báo Giá Khách Hàng</span></>}
            {activeTab === 'orders' && <><span>📋</span><span>Quản Lý Tiến Độ Đơn Hàng Sản Xuất</span></>}
            {activeTab === 'products' && <><span>📦</span><span>Quản Lý Sản Phẩm Pallet Gỗ</span></>}
            {activeTab === 'activities' && <><span>📸</span><span>Nhật Ký & Hoạt Động Xưởng Thực Tế</span></>}
            {activeTab === 'settings' && <><span>⚙️</span><span>Cấu Hình Thông Tin Xưởng & Hotline</span></>}
          </div>

          <div className={styles.topBarActions}>
            <Link href="/" target="_blank" className={styles.btnWebsite}>
              <ExternalLink size={15} />
              <span>Xem Website</span>
            </Link>

            <button onClick={handleLogout} className={styles.btnLogout}>
              <LogOut size={15} />
              <span>Đăng Xuất</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className={styles.mainContent}>

          {/* TAB 1: BÁO GIÁ KHÁCH HÀNG (QUOTES) */}
          {activeTab === 'quotes' && (
            <>
              {/* Stat Cards */}
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#fee2e2', color: '#dc2626' }}>
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>CHƯA TƯ VẤN (MỚI)</div>
                    <div className={styles.statValue}>{newQuotesCount}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#fef3c7', color: '#b45309' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>ĐANG GỌI TƯ VẤN</div>
                    <div className={styles.statValue}>{quotes.filter((q) => q.status === 'da_goi').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#e0e7ff', color: '#4338ca' }}>
                    <Send size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>ĐÃ BÁO GIÁ QUA ZALO</div>
                    <div className={styles.statValue}>{quotes.filter((q) => q.status === 'da_bao_gia').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dcfce7', color: '#15803d' }}>
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>CHỐT DEAL THÀNH CÔNG</div>
                    <div className={styles.statValue}>{quotes.filter((q) => q.status === 'thanh_cong').length}</div>
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
                      placeholder="Tìm theo tên khách, số điện thoại, quy cách pallet..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>

                  <div className={styles.filterRow}>
                    <select
                      value={quoteStatusFilter}
                      onChange={(e) => setQuoteStatusFilter(e.target.value)}
                      className={styles.filterSelect}
                    >
                      <option value="all">Tất cả trạng thái ({quotes.length})</option>
                      <option value="moi">🔴 Mới nhận (chưa gọi)</option>
                      <option value="da_goi">🟡 Đang gọi tư vấn</option>
                      <option value="da_bao_gia">🔵 Đã gửi báo giá</option>
                      <option value="thanh_cong">🟢 Chốt deal thành công</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Quotes Table */}
              <div className={styles.tableContainer}>
                {filteredQuotes.length === 0 ? (
                  <div className={styles.emptyState}>
                    <MessageSquare size={44} color="#94a3b8" />
                    <p style={{ fontWeight: 600 }}>Không tìm thấy yêu cầu báo giá nào</p>
                  </div>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ width: '28%' }}>Khách Hàng & Liên Hệ</th>
                        <th style={{ width: '30%' }}>Nhu Cầu Pallet & Số Lượng</th>
                        <th style={{ width: '16%' }}>Ngày Yêu Cầu</th>
                        <th style={{ width: '16%' }}>Trạng Thái</th>
                        <th style={{ width: '10%', textAlign: 'center' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotes.map((q) => {
                        const cleanPhone = q.phone.replace(/[^0-9]/g, '');
                        return (
                          <tr key={q.id}>
                            <td>
                              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                                {q.customerName}
                              </div>
                              <div style={{ color: '#15803d', fontWeight: 600, marginTop: '0.2rem' }}>
                                📞 {q.phone}
                              </div>
                              {q.email && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{q.email}</div>}
                              <div className={styles.leadContactBtns}>
                                <a href={`tel:${cleanPhone}`} className={styles.btnCallNow}>
                                  <Phone size={12} />
                                  <span>Gọi điện</span>
                                </a>
                                <a href={`https://zalo.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className={styles.btnZaloNow}>
                                  <span>Chat Zalo</span>
                                </a>
                              </div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 600, color: '#0f172a' }}>{q.productTitle}</div>
                              {q.dimensions && (
                                <div style={{ fontSize: '0.82rem', color: '#475569' }}>
                                  Kích thước: <strong>{q.dimensions}</strong>
                                </div>
                              )}
                              <div style={{ fontSize: '0.82rem', color: '#b45309' }}>
                                Số lượng: <strong>{q.quantity}</strong>
                              </div>
                              {q.note && (
                                <div style={{ fontSize: '0.78rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.25rem' }}>
                                  &quot;{q.note}&quot;
                                </div>
                              )}
                            </td>
                            <td>
                              <div style={{ fontSize: '0.825rem', color: '#475569' }}>
                                📅 {new Date(q.createdAt).toLocaleDateString('vi-VN')}
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                {new Date(q.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>
                            <td>
                              <select
                                value={q.status}
                                onChange={(e) => handleUpdateQuoteStatus(q, e.target.value as QuoteStatus)}
                                className={styles.filterSelect}
                                style={{
                                  fontWeight: 700,
                                  background:
                                    q.status === 'moi' ? '#fee2e2' :
                                    q.status === 'da_goi' ? '#fef3c7' :
                                    q.status === 'da_bao_gia' ? '#e0e7ff' : '#dcfce7',
                                  color:
                                    q.status === 'moi' ? '#dc2626' :
                                    q.status === 'da_goi' ? '#b45309' :
                                    q.status === 'da_bao_gia' ? '#4338ca' : '#15803d',
                                }}
                              >
                                <option value="moi">🔴 Mới nhận</option>
                                <option value="da_goi">🟡 Đang gọi</option>
                                <option value="da_bao_gia">🔵 Đã gửi giá</option>
                                <option value="thanh_cong">🟢 Chốt deal</option>
                              </select>
                            </td>
                            <td>
                              <div className={styles.actionButtons} style={{ justifyContent: 'center' }}>
                                <button
                                  onClick={() => handleDeleteQuote(q)}
                                  className={`${styles.btnAction} ${styles.btnActionDelete}`}
                                  title="Xóa yêu cầu"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* TAB 2: QUẢN LÝ ĐƠN HÀNG (ORDERS) */}
          {activeTab === 'orders' && (
            <>
              {/* Stat Cards */}
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                    <ClipboardList size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>TỔNG ĐƠN HÀNG</div>
                    <div className={styles.statValue}>{orders.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#fef3c7', color: '#b45309' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>ĐANG SẢN XUẤT</div>
                    <div className={styles.statValue}>{orders.filter((o) => o.status === 'dang_san_xuat').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#ffedd5', color: '#ea580c' }}>
                    <Flame size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>ĐÓNG MẪU THỬ TẢI</div>
                    <div className={styles.statValue}>{orders.filter((o) => o.status === 'dong_mau').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>ĐÃ BÀN GIAO</div>
                    <div className={styles.statValue}>{orders.filter((o) => o.status === 'da_giao').length}</div>
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
                      placeholder="Tìm theo mã đơn (TA-...), tên khách, sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setEditingOrder(null);
                      setIsOrderModalOpen(true);
                    }}
                    className={styles.btnAddNew}
                  >
                    <Plus size={18} />
                    <span>Tạo Đơn Hàng Mới</span>
                  </button>
                </div>

                <div className={styles.filterRow}>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">Tất cả trạng thái ({orders.length})</option>
                    <option value="cho_duyet">Chờ duyệt</option>
                    <option value="dong_mau">Đang đóng mẫu</option>
                    <option value="dang_san_xuat">Đang sản xuất hàng loạt</option>
                    <option value="da_giao">Đã bàn giao</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className={styles.tableContainer}>
                {filteredOrders.length === 0 ? (
                  <div className={styles.emptyState}>
                    <ClipboardList size={44} color="#94a3b8" />
                    <p style={{ fontWeight: 600 }}>Không tìm thấy đơn hàng nào</p>
                  </div>
                ) : (
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ width: '22%' }}>Mã Đơn & Khách Hàng</th>
                        <th style={{ width: '28%' }}>Sản Phẩm & Quy Cách</th>
                        <th style={{ width: '18%' }}>Tiến Độ Sản Xuất</th>
                        <th style={{ width: '18%' }}>Hạn Giao & Trị Giá</th>
                        <th style={{ width: '14%', textAlign: 'center' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td>
                            <span style={{ fontWeight: 800, color: '#15803d', fontSize: '0.85rem' }}>
                              {ord.orderCode}
                            </span>
                            <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                              {ord.customer}
                            </div>
                            {ord.phone && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>📞 {ord.phone}</div>}
                          </td>
                          <td>
                            <div style={{ fontWeight: 600, color: '#0f172a' }}>{ord.productName}</div>
                            <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                              KT: {ord.dimensions} • SL: <strong>{ord.quantity} cái</strong>
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                              Gỗ: {ord.woodType}
                            </div>
                            {ord.isExportISPM && (
                              <span className={styles.tagExport} style={{ marginTop: '0.25rem' }}>
                                <ShieldCheck size={12} />
                                <span>Hun trùng ISPM 15</span>
                              </span>
                            )}
                          </td>
                          <td>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700 }}>
                              <span>{ord.progressPercent}%</span>
                              <span style={{ color: ord.status === 'da_giao' ? '#15803d' : '#2563eb' }}>
                                {ord.status === 'cho_duyet' ? 'Chờ duyệt' :
                                 ord.status === 'dong_mau' ? 'Đóng mẫu' :
                                 ord.status === 'dang_san_xuat' ? 'Đang đóng' : 'Hoàn thành'}
                              </span>
                            </div>
                            <div className={styles.progressBarWrap}>
                              <div
                                className={styles.progressBarFill}
                                style={{
                                  width: `${ord.progressPercent}%`,
                                  background: ord.status === 'da_giao' ? '#15803d' : 'linear-gradient(90deg, #2563eb, #38bdf8)'
                                }}
                              />
                            </div>
                          </td>
                          <td>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                              📅 Giao: {ord.deadline}
                            </div>
                            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b45309', marginTop: '0.2rem' }}>
                              💰 {ord.totalAmount}
                            </div>
                          </td>
                          <td>
                            <div className={styles.actionButtons} style={{ justifyContent: 'center' }}>
                              <button
                                onClick={() => {
                                  setEditingOrder(ord);
                                  setIsOrderModalOpen(true);
                                }}
                                className={`${styles.btnAction} ${styles.btnActionEdit}`}
                                title="Chỉnh sửa đơn hàng"
                              >
                                <Edit2 size={16} />
                              </button>

                              <button
                                onClick={() => handleDeleteOrder(ord)}
                                className={`${styles.btnAction} ${styles.btnActionDelete}`}
                                title="Xóa đơn hàng"
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
            </>
          )}

          {/* TAB 3: SẢN PHẨM PALLET GỖ */}
          {activeTab === 'products' && (
            <>
              {/* Stat Cards Products */}
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#fef3c7', color: '#b45309' }}>
                    <Package size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>TỔNG SẢN PHẨM</div>
                    <div className={styles.statValue}>{products.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>CHUẨN XUẤT KHẨU ISPM 15</div>
                    <div className={styles.statValue}>{products.filter((p) => p.isExportStandard).length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                    <Layers size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>PALLET VÁN ÉP (PLYWOOD)</div>
                    <div className={styles.statValue}>{products.filter((p) => p.materialGroup === 'van-ep').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#ffedd5', color: '#ea580c' }}>
                    <Box size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>THÙNG GỖ / KIỆN MÁY</div>
                    <div className={styles.statValue}>{products.filter((p) => p.categorySlug === 'thung-go-dong-hang').length}</div>
                  </div>
                </div>
              </div>

              {/* Control Bar Products */}
              <div className={styles.controlBar}>
                <div className={styles.controlRowTop}>
                  <div className={styles.searchBox}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Tìm theo tên sản phẩm, kích thước, loại gỗ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    className={styles.btnAddNew}
                  >
                    <Plus size={18} />
                    <span>Thêm Sản Phẩm Mới</span>
                  </button>
                </div>

                <div className={styles.filterRow}>
                  <select
                    value={productCatFilter}
                    onChange={(e) => setProductCatFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">Tất cả danh mục ({products.length})</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Product Table */}
              <div className={styles.tableContainer}>
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
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, color: '#0f172a' }}>{p.dimensions}</div>
                          <div style={{ fontSize: '0.825rem', color: '#64748b' }}>{p.woodType}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '0.85rem' }}>Tĩnh: <strong>{p.staticLoad}</strong></div>
                          <div style={{ fontSize: '0.85rem' }}>Động: <strong>{p.dynamicLoad}</strong></div>
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
                        </td>
                        <td>
                          <div className={styles.actionButtons} style={{ justifyContent: 'center' }}>
                            <Link href={`/san-pham/${p.slug}`} target="_blank" className={styles.btnAction} title="Xem bài">
                              <ExternalLink size={16} />
                            </Link>
                            <button
                              onClick={() => { setEditingProduct(p); setIsProductModalOpen(true); }}
                              className={`${styles.btnAction} ${styles.btnActionEdit}`}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p)}
                              className={`${styles.btnAction} ${styles.btnActionDelete}`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 4: HOẠT ĐỘNG XƯỞNG */}
          {activeTab === 'activities' && (
            <>
              {/* Stat Cards Activities */}
              <div className={styles.statGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                    <Camera size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>TỔNG BÀI HOẠT ĐỘNG</div>
                    <div className={styles.statValue}>{activities.length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <Truck size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>BÀN GIAO & XUẤT HÀNG</div>
                    <div className={styles.statValue}>{activities.filter((a) => a.category === 'ban-giao').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#fef3c7', color: '#b45309' }}>
                    <Zap size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>GIA CÔNG ĐƠN GẤP</div>
                    <div className={styles.statValue}>{activities.filter((a) => a.category === 'don-gap').length}</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrap} style={{ background: '#ffedd5', color: '#ea580c' }}>
                    <Flame size={24} />
                  </div>
                  <div>
                    <div className={styles.statLabel}>TRÌNH MẪU / SẤY ISPM 15</div>
                    <div className={styles.statValue}>{activities.filter((a) => a.category === 'trinh-mau' || a.category === 'ispm15').length}</div>
                  </div>
                </div>
              </div>

              {/* Control Bar Activities */}
              <div className={styles.controlBar}>
                <div className={styles.controlRowTop}>
                  <div className={styles.searchBox}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="Tìm theo tiêu đề hoạt động, địa điểm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={styles.searchInput}
                    />
                  </div>

                  <button
                    onClick={() => {
                      setEditingActivity(null);
                      setIsActivityModalOpen(true);
                    }}
                    className={styles.btnAddNew}
                  >
                    <Plus size={18} />
                    <span>Đăng Hoạt Động Mới</span>
                  </button>
                </div>

                <div className={styles.filterRow}>
                  <select
                    value={activityCatFilter}
                    onChange={(e) => setActivityCatFilter(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="all">Tất cả nhóm ({activities.length})</option>
                    {activityCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Activities Table */}
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th style={{ width: '45%' }}>Bài Viết & Hình Ảnh</th>
                      <th style={{ width: '20%' }}>Phân Loại & Ngày Đăng</th>
                      <th style={{ width: '20%' }}>Địa Điểm & Khách Hàng</th>
                      <th style={{ width: '15%', textAlign: 'center' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredActivities.map((act) => {
                      const cover = act.images?.[0] || '/images/pallet_factory_43.jpg';
                      const catFound = activityCategories.find((c) => c.id === act.category);

                      return (
                        <tr key={act.id}>
                          <td>
                            <div className={styles.productCell}>
                              <div className={styles.thumbImg} style={{ width: 80, height: 60 }}>
                                <img
                                  src={cover}
                                  alt={act.title}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>
                              <div className={styles.productInfo}>
                                <div className={styles.productName} style={{ fontSize: '0.95rem' }}>{act.title}</div>
                                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>/hoat-dong/{act.slug}</div>
                                <div style={{ fontSize: '0.8rem', color: '#475569' }}>📸 {act.images?.length || 0} ảnh</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={styles.categoryTag} style={{ display: 'inline-block', marginBottom: '0.35rem' }}>
                              {catFound ? `${catFound.icon} ${catFound.name}` : act.category}
                            </span>
                            <div style={{ fontSize: '0.825rem', color: '#64748b' }}>📅 {act.publishedAt}</div>
                          </td>
                          <td>
                            {act.customerLocation && (
                              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                                <MapPin size={14} color="#16a34a" style={{ display: 'inline', marginRight: 4 }} />
                                {act.customerLocation}
                              </div>
                            )}
                            {act.clientType && <div style={{ fontSize: '0.78rem', color: '#64748b' }}>{act.clientType}</div>}
                          </td>
                          <td>
                            <div className={styles.actionButtons} style={{ justifyContent: 'center' }}>
                              <Link href={`/hoat-dong/${act.slug}`} target="_blank" className={styles.btnAction} title="Xem bài">
                                <ExternalLink size={16} />
                              </Link>
                              <button
                                onClick={() => { setEditingActivity(act); setIsActivityModalOpen(true); }}
                                className={`${styles.btnAction} ${styles.btnActionEdit}`}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteActivity(act)}
                                className={`${styles.btnAction} ${styles.btnActionDelete}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* TAB 5: CÀI ĐẶT & HOTLINE */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 800, background: '#ffffff', borderRadius: 12, padding: '2rem', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                Thông Tin Liên Hệ Xưởng Pallet Trường An
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Tên Doanh Nghiệp
                  </label>
                  <input type="text" readOnly value={companyInfo.name} className={styles.searchInput} style={{ background: '#f8fafc' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Đại Diện / Người Phụ Trách
                  </label>
                  <input type="text" readOnly value="Mr. Ngọc Ký (Chủ xưởng)" className={styles.searchInput} style={{ background: '#f8fafc' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Hotline Chính (Line 1)
                  </label>
                  <input type="text" readOnly value={companyInfo.hotlineFormatted} className={styles.searchInput} style={{ background: '#f8fafc', fontWeight: 700, color: '#15803d' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Hotline Phụ (Line 2)
                  </label>
                  <input type="text" readOnly value={companyInfo.secondaryHotlineFormatted} className={styles.searchInput} style={{ background: '#f8fafc', fontWeight: 700, color: '#15803d' }} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Địa Chỉ Xưởng Sản Xuất
                  </label>
                  <input type="text" readOnly value={companyInfo.address} className={styles.searchInput} style={{ background: '#f8fafc' }} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '0.4rem' }}>
                    Fanpage Facebook Xưởng
                  </label>
                  <input type="text" readOnly value={companyInfo.facebook} className={styles.searchInput} style={{ background: '#f8fafc' }} />
                </div>
              </div>

              <div style={{ marginTop: '2rem', padding: '1rem', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0', fontSize: '0.88rem', color: '#166534' }}>
                💡 <strong>Ghi chú:</strong> Thông tin trên được đồng bộ toàn trang từ <code>src/data/companyInfo.ts</code> và hiển thị trên toàn bộ các khối Header, Footer, Hotline nút bấm và Zalo.
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      {/* Activity Modal */}
      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={() => {
          setIsActivityModalOpen(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        activity={editingActivity}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => {
          setIsOrderModalOpen(false);
          setEditingOrder(null);
        }}
        onSave={handleSaveOrder}
        order={editingOrder}
      />
    </div>
  );
}
