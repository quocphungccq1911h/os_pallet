'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { 
  initialActivities, 
  activityCategories, 
  Activity, 
  ActivityCategory 
} from '@/data/activities';
import { companyInfo } from '@/data/companyInfo';
import { 
  Calendar, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  Truck,
  Building
} from 'lucide-react';
import styles from './detail.module.css';

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [activity, setActivity] = useState<Activity | null>(() => {
    return initialActivities.find((a) => a.slug === slug) || null;
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allActivities, setAllActivities] = useState<Activity[]>(initialActivities);
  const [loading, setLoading] = useState(!activity);

  useEffect(() => {
    async function loadActivity() {
      try {
        const res = await fetch('/api/activities');
        if (res.ok) {
          const list: Activity[] = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            setAllActivities(list);
            const found = list.find((a) => a.slug === slug);
            if (found) {
              setActivity(found);
            }
          }
        }
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, [slug]);

  if (!activity && !loading) {
    return notFound();
  }

  if (!activity) {
    return (
      <div className={styles.detailPage} style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <p>Đang tải thông tin hoạt động xưởng...</p>
        </div>
      </div>
    );
  }

  const images = activity.images && activity.images.length > 0
    ? activity.images
    : ['/images/pallet_factory_43.jpg'];

  const currentImage = images[selectedImageIndex] || images[0];

  const catInfo = activityCategories.find((c) => c.id === activity.category);

  // Parse simple markdown-like content into sections
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    return paragraphs.map((para, i) => {
      const trimmed = para.trim();
      if (trimmed.startsWith('### ')) {
        return <h3 key={i}>{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ul key={i}>
            {items.map((it, idx) => (
              <li key={idx}>
                {it.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ol key={i}>
            {items.map((it, idx) => (
              <li key={idx}>
                {it.replace(/^\d+\.\s+/, '')}
              </li>
            ))}
          </ol>
        );
      }
      return <p key={i}>{trimmed}</p>;
    });
  };

  const relatedActivities = allActivities
    .filter((a) => a.id !== activity.id)
    .slice(0, 3);

  return (
    <div className={styles.detailPage}>
      {/* Top Breadcrumb Navigation */}
      <div className={styles.topHeader}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/">Trang Chủ</Link>
            <ChevronRight size={14} />
            <Link href="/hoat-dong">Hoạt Động Xưởng</Link>
            <ChevronRight size={14} />
            <span className={styles.breadcrumbCurrent}>{activity.title}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        {/* Article Title & Meta */}
        <section className={styles.articleHero}>
          {catInfo && (
            <div className={styles.categoryTag}>
              <span>{catInfo.icon}</span>
              <span>{catInfo.name}</span>
            </div>
          )}

          <h1 className={styles.articleTitle}>{activity.title}</h1>

          <div className={styles.metaRow}>
            <div className={styles.metaItem}>
              <Calendar size={15} />
              <span>Ngày đăng: <strong>{activity.publishedAt}</strong></span>
            </div>

            {activity.customerLocation && (
              <div className={styles.metaItem}>
                <MapPin size={15} />
                <span>Địa điểm: <strong>{activity.customerLocation}</strong></span>
              </div>
            )}

            {activity.clientType && (
              <div className={styles.metaItem}>
                <Building size={15} />
                <span>Khách hàng: <strong>{activity.clientType}</strong></span>
              </div>
            )}
          </div>
        </section>

        {/* Main Layout Grid */}
        <div className={styles.layoutGrid}>
          {/* Main Left Column */}
          <main>
            {/* Gallery Viewer */}
            <div className={styles.gallerySection}>
              <div className={styles.mainPhotoWrap}>
                <img
                  src={currentImage}
                  alt={activity.title}
                  className={styles.mainPhoto}
                />
              </div>

              {images.length > 1 && (
                <div className={styles.thumbsList}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumbBtn} ${selectedImageIndex === idx ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img
                        src={img}
                        alt={`Ảnh quy trình xưởng ${idx + 1}`}
                        className={styles.thumbImg}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Article Content */}
            <div className={styles.contentBox}>
              {activity.summary && (
                <div className={styles.summaryBox}>
                  {activity.summary}
                </div>
              )}

              {activity.highlights && activity.highlights.length > 0 && (
                <div className={styles.highlightsCard}>
                  <h4 className={styles.highlightsTitle}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <span>Điểm Nổi Bật Của Hoạt Động Này:</span>
                  </h4>
                  <ul className={styles.highlightsList}>
                    {activity.highlights.map((hl, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <CheckCircle2 size={16} className={styles.highlightIcon} />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.articleBody}>
                {renderFormattedContent(activity.content)}
              </div>

              {/* Facebook Proof Card */}
              {activity.fbUrl && (
                <div className={styles.fbProofBox}>
                  <div className={styles.fbProofLeft}>
                    <h4>Bài Viết Thực Tế Trên Fanpage Facebook</h4>
                    <p>Theo dõi các hoạt động bàn giao và sản xuất hàng ngày của Pallet Trường An</p>
                  </div>
                  <a
                    href={activity.fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.fbProofBtn}
                  >
                    <span>Xem Bài Viết Gốc</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </main>

          {/* Right Sidebar */}
          <aside className={styles.sidebar}>
            {/* Quick Consultation Card */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Tư Vấn & Đặt Hàng Gấp</h3>
              <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                Quý khách có nhu cầu đóng pallet theo bản vẽ hoặc cần xử lý đơn hàng gấp phục vụ xuất khẩu, hãy liên hệ ngay xưởng:
              </p>
              <div className={styles.contactBox}>
                <a href={`tel:${companyInfo.hotline}`} className={styles.btnHotline}>
                  <Phone size={16} />
                  <span>Hotline 1: {companyInfo.hotlineFormatted}</span>
                </a>
                <a href={`tel:${companyInfo.secondaryHotline}`} className={styles.btnHotline}>
                  <Phone size={16} />
                  <span>Hotline 2: {companyInfo.secondaryHotlineFormatted}</span>
                </a>
                <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className={styles.btnZalo}>
                  <MessageSquare size={16} />
                  <span>Zalo Báo Giá Nhanh</span>
                </a>
              </div>
            </div>

            {/* Factory Trust Highlights */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>Năng Lực Xưởng Trường An</h3>
              <div className={styles.featurePillList}>
                <div className={styles.featurePill}>
                  <ShieldCheck size={18} className={styles.featureIcon} />
                  <span>Xử lý sấy nhiệt HT đạt chuẩn ISPM 15</span>
                </div>
                <div className={styles.featurePill}>
                  <Truck size={18} className={styles.featureIcon} />
                  <span>Giao hàng tận nơi KCN TP.HCM & Đông Nam Bộ</span>
                </div>
                <div className={styles.featurePill}>
                  <Clock size={18} className={styles.featureIcon} />
                  <span>Gia công nhanh – Hỗ trợ đơn hàng gấp 24/7</span>
                </div>
                <div className={styles.featurePill}>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <span>Trình pallet mẫu kiểm tra tải trọng thực tế</span>
                </div>
              </div>
            </div>

            {/* Other Activities */}
            {relatedActivities.length > 0 && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideCardTitle}>Hoạt Động Khác</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedActivities.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/hoat-dong/${rel.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a', lineHeight: '1.4', marginBottom: '0.25rem' }}>
                        {rel.title}
                      </h4>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        📅 {rel.publishedAt}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
