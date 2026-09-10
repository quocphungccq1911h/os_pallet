'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { initialActivities, activityCategories, Activity, ActivityCategory } from '@/data/activities';
import { companyInfo } from '@/data/companyInfo';
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Camera, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ChevronRight,
  Filter
} from 'lucide-react';
import styles from './hoatdong.module.css';

export default function HoatDongPage() {
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true);
        const res = await fetch('/api/activities');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setActivities(data);
          }
        }
      } catch (err) {
        // Fallback giữ initialActivities
      } finally {
        setLoading(false);
      }
    }
    loadActivities();
  }, []);

  const filteredActivities = activeTab === 'all'
    ? activities
    : activities.filter((a) => a.category === activeTab);

  const getCategoryName = (catId: ActivityCategory) => {
    const found = activityCategories.find((c) => c.id === catId);
    return found ? `${found.icon} ${found.name}` : catId;
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return activities.length;
    return activities.filter((a) => a.category === catId).length;
  };

  return (
    <div className={styles.hoatdongPage}>
      {/* Hero Header */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroBadge}>
            <Camera size={15} />
            <span>Hình Ảnh & Quy Trình Thực Tế 100%</span>
          </div>
          <h1 className={styles.heroTitle}>Nhật Ký Hoạt Động Xưởng Pallet Trường An</h1>
          <p className={styles.heroSubtitle}>
            Minh bạch năng lực sản xuất thực tế – Bàn giao đúng tiến độ – Xử lý đơn gấp theo bản vẽ – Khử trùng ISPM 15 chuẩn quốc tế phục vụ xuất khẩu.
          </p>
          <div className={styles.breadcrumb}>
            <Link href="/">Trang Chủ</Link>
            <ChevronRight size={14} />
            <span>Hoạt Động Xưởng</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs Sticky Bar */}
      <section className={styles.filterBar}>
        <div className="container">
          <div className={styles.tabsScroll}>
            <button
              onClick={() => setActiveTab('all')}
              className={`${styles.tabBtn} ${activeTab === 'all' ? styles.tabActive : ''}`}
            >
              <span>Tất Cả Hoạt Động</span>
              <span className={styles.tabBadgeCount}>{getCategoryCount('all')}</span>
            </button>

            {activityCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`${styles.tabBtn} ${activeTab === cat.id ? styles.tabActive : ''}`}
              >
                <span>{cat.icon} {cat.name}</span>
                <span className={styles.tabBadgeCount}>{getCategoryCount(cat.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className={styles.gridContainer}>
        <div className="container">
          {filteredActivities.length === 0 ? (
            <div className={styles.emptyBox}>
              <div className={styles.emptyIcon}>📦</div>
              <h3>Chưa có bài viết trong danh mục này</h3>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                Xưởng đang tiếp tục cập nhật các hoạt động mới nhất lên hệ thống.
              </p>
            </div>
          ) : (
            <div className={styles.activitiesGrid}>
              {filteredActivities.map((act) => {
                const coverImage = act.images?.[0] || '/images/pallet_factory_43.jpg';
                return (
                  <Link
                    key={act.id}
                    href={`/hoat-dong/${act.slug}`}
                    className={styles.activityCard}
                  >
                    <div className={styles.imageWrap}>
                      <img
                        src={coverImage}
                        alt={act.title}
                        className={styles.cardImg}
                        loading="lazy"
                      />
                      <span className={styles.catBadge}>
                        {getCategoryName(act.category)}
                      </span>
                      {act.images && act.images.length > 1 && (
                        <span className={styles.photoCount}>
                          <Camera size={13} />
                          <span>{act.images.length} ảnh</span>
                        </span>
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.metaRow}>
                        <span className={styles.metaItem}>
                          <Calendar size={14} />
                          <span>{act.publishedAt}</span>
                        </span>
                        {act.customerLocation && (
                          <span className={styles.metaItem}>
                            <MapPin size={14} />
                            <span>{act.customerLocation}</span>
                          </span>
                        )}
                      </div>

                      <h2 className={styles.cardTitle}>{act.title}</h2>
                      <p className={styles.cardSummary}>{act.summary}</p>

                      {act.badges && act.badges.length > 0 && (
                        <div className={styles.badgeList}>
                          {act.badges.map((b, idx) => (
                            <span key={idx} className={styles.badgeItem}>
                              {b}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className={styles.cardFooter}>
                        <span>Xem chi tiết quy trình</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* CTA Banner Bottom */}
          <div className={styles.ctaBanner}>
            <div className={styles.ctaText}>
              <h3>Quý Khách Cần Báo Giá Pallet Đơn Gấp Hoặc Trình Mẫu Thử Tải?</h3>
              <p>
                Pallet Trường An nhận gia công theo mọi bản vẽ kỹ thuật máy móc, chịu tải trọng lớn, hỗ trợ hun trùng chứng thư ISPM 15 xuất khẩu nhanh chóng.
              </p>
            </div>
            <div className={styles.ctaButtons}>
              <a href={`tel:${companyInfo.hotline}`} className={styles.btnCtaHotline}>
                <Phone size={18} />
                <span>Gọi Ngay: {companyInfo.hotlineFormatted}</span>
              </a>
              <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className={styles.btnCtaZalo}>
                <MessageSquare size={18} />
                <span>Chat Zalo Báo Giá</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
