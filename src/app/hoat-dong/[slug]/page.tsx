'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { initialActivities, activityCategories, Activity } from '@/data/activities';
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
  Building,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeActivity, localizeActivityCategory } from '@/i18n/productLocalizer';
import styles from './detail.module.css';

export default function ActivityDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale, t } = useLanguage();

  const [rawActivity, setRawActivity] = useState<Activity | null>(() => {
    return initialActivities.find((a) => a.slug === slug) || null;
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [allActivities, setAllActivities] = useState<Activity[]>(initialActivities);
  const [loading, setLoading] = useState(!rawActivity);

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
              setRawActivity(found);
            }
          }
        }
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    loadActivity();
  }, [slug]);

  if (!rawActivity && !loading) {
    return notFound();
  }

  if (!rawActivity) {
    return (
      <div className={styles.detailPage} style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <p>{t.common.loading}</p>
        </div>
      </div>
    );
  }

  const activity = localizeActivity(rawActivity, locale);
  const images =
    activity.images && activity.images.length > 0
      ? activity.images
      : ['/images/pallet_factory_43.jpg'];
  const currentImage = images[selectedImageIndex] || images[0];

  const rawCat = activityCategories.find((c) => c.id === activity.category);
  const catInfo = rawCat ? localizeActivityCategory(rawCat, locale) : null;

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
              <li key={idx}>{it.replace(/^[-*]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ol key={i}>
            {items.map((it, idx) => (
              <li key={idx}>{it.replace(/^\d+\.\s+/, '')}</li>
            ))}
          </ol>
        );
      }
      return <p key={i}>{trimmed}</p>;
    });
  };

  const relatedActivities = allActivities
    .filter((a) => a.id !== rawActivity.id)
    .slice(0, 3)
    .map((a) => localizeActivity(a, locale));

  return (
    <div className={styles.detailPage}>
      {/* Top Breadcrumb Navigation */}
      <div className={styles.topHeader}>
        <div className="container">
          <nav className={styles.breadcrumb}>
            <Link href="/">{t.common.home}</Link>
            <ChevronRight size={14} />
            <Link href="/hoat-dong">{t.activitiesPage.breadcrumb}</Link>
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
              <span>
                {t.activitiesPage.publishedLabel} <strong>{activity.publishedAt}</strong>
              </span>
            </div>

            {activity.customerLocation && (
              <div className={styles.metaItem}>
                <MapPin size={15} />
                <span>
                  {t.activitiesPage.locationLabel} <strong>{activity.customerLocation}</strong>
                </span>
              </div>
            )}

            {activity.clientType && (
              <div className={styles.metaItem}>
                <Building size={15} />
                <span>
                  {t.activitiesPage.clientLabel} <strong>{activity.clientType}</strong>
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Main Layout Grid */}
        <div className={styles.layoutGrid}>
          <main>
            <div className={styles.gallerySection}>
              <div className={styles.mainPhotoWrap}>
                <img src={currentImage} alt={activity.title} className={styles.mainPhoto} />
              </div>

              {images.length > 1 && (
                <div className={styles.thumbsList}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumbBtn} ${
                        selectedImageIndex === idx ? styles.thumbActive : ''
                      }`}
                      onClick={() => setSelectedImageIndex(idx)}
                    >
                      <img src={img} alt={`${idx + 1}`} className={styles.thumbImg} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.contentBox}>
              {activity.summary && <div className={styles.summaryBox}>{activity.summary}</div>}

              {activity.highlights && activity.highlights.length > 0 && (
                <div className={styles.highlightsCard}>
                  <h4 className={styles.highlightsTitle}>
                    <CheckCircle2 size={18} color="#16a34a" />
                    <span>{t.activitiesPage.highlightsTitle}</span>
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

              {activity.fbUrl && (
                <div className={styles.fbProofBox}>
                  <div className={styles.fbProofLeft}>
                    <h4>Facebook Fanpage</h4>
                    <p>{t.catalog.fbDesc}</p>
                  </div>
                  <a
                    href={activity.fbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.fbProofBtn}
                  >
                    <span>{t.activitiesPage.fbOriginalBtn}</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </main>

          <aside className={styles.sidebar}>
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>{t.activitiesPage.sidebarConsultTitle}</h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#64748b',
                  marginBottom: '1.25rem',
                  lineHeight: '1.5',
                }}
              >
                {t.activitiesPage.sidebarConsultDesc}
              </p>
              <div className={styles.contactBox}>
                <a href={`tel:${companyInfo.hotline}`} className={styles.btnHotline}>
                  <Phone size={16} />
                  <span>
                    {t.common.hotline}: {companyInfo.hotlineFormatted}
                  </span>
                </a>
                <a
                  href={companyInfo.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnZalo}
                >
                  <MessageSquare size={16} />
                  <span>{t.common.chatZalo}</span>
                </a>
              </div>
            </div>

            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>{t.common.shortName}</h3>
              <div className={styles.featurePillList}>
                <div className={styles.featurePill}>
                  <ShieldCheck size={18} className={styles.featureIcon} />
                  <span>{t.footer.p2Desc}</span>
                </div>
                <div className={styles.featurePill}>
                  <Truck size={18} className={styles.featureIcon} />
                  <span>{t.footer.p4Desc}</span>
                </div>
                <div className={styles.featurePill}>
                  <Clock size={18} className={styles.featureIcon} />
                  <span>{t.footer.p1Desc}</span>
                </div>
                <div className={styles.featurePill}>
                  <CheckCircle2 size={18} className={styles.featureIcon} />
                  <span>{t.footer.p3Desc}</span>
                </div>
              </div>
            </div>

            {relatedActivities.length > 0 && (
              <div className={styles.sideCard}>
                <h3 className={styles.sideCardTitle}>{t.activitiesPage.relatedTitle}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {relatedActivities.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/hoat-dong/${rel.slug}`}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <h4
                        style={{
                          fontSize: '0.92rem',
                          fontWeight: 600,
                          color: '#0f172a',
                          lineHeight: '1.4',
                          marginBottom: '0.25rem',
                        }}
                      >
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
