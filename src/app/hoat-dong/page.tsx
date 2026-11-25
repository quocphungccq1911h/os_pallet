'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { initialActivities, activityCategories, Activity, ActivityCategory } from '@/data/activities';
import { companyInfo } from '@/data/companyInfo';
import {
  Calendar,
  MapPin,
  ArrowRight,
  Camera,
  Phone,
  MessageSquare,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeActivity, localizeActivityCategory } from '@/i18n/productLocalizer';
import styles from './hoatdong.module.css';

export default function HoatDongPage() {
  const { locale, t } = useLanguage();
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    async function loadActivities() {
      try {
        const res = await fetch('/api/activities');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setActivities(data);
          }
        }
      } catch {
        // fallback
      }
    }
    loadActivities();
  }, []);

  const localizedCats = useMemo(
    () => activityCategories.map((c) => localizeActivityCategory(c, locale)),
    [locale]
  );

  const filteredActivities = useMemo(() => {
    const base = activeTab === 'all' ? activities : activities.filter((a) => a.category === activeTab);
    return base.map((a) => localizeActivity(a, locale));
  }, [activities, activeTab, locale]);

  const getCategoryName = (catId: ActivityCategory) => {
    const found = localizedCats.find((c) => c.id === catId);
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
            <span>{t.activitiesPage.badge}</span>
          </div>
          <h1 className={styles.heroTitle}>{t.activitiesPage.title}</h1>
          <p className={styles.heroSubtitle}>{t.activitiesPage.subtitle}</p>
          <div className={styles.breadcrumb}>
            <Link href="/">{t.common.home}</Link>
            <ChevronRight size={14} />
            <span>{t.activitiesPage.breadcrumb}</span>
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
              <span>{t.activitiesPage.tabAll}</span>
              <span className={styles.tabBadgeCount}>{getCategoryCount('all')}</span>
            </button>

            {localizedCats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`${styles.tabBtn} ${activeTab === cat.id ? styles.tabActive : ''}`}
              >
                <span>
                  {cat.icon} {cat.name}
                </span>
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
              <h3>{t.activitiesPage.emptyTitle}</h3>
              <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
                {t.activitiesPage.emptyDesc}
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
                      <span className={styles.catBadge}>{getCategoryName(act.category)}</span>
                      {act.images && act.images.length > 1 && (
                        <span className={styles.photoCount}>
                          <Camera size={13} />
                          <span>
                            {act.images.length} {t.activitiesPage.photoUnit}
                          </span>
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
                        <span>{t.activitiesPage.readDetail}</span>
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
              <h3>{t.activitiesPage.ctaTitle}</h3>
              <p>{t.activitiesPage.ctaDesc}</p>
            </div>
            <div className={styles.ctaButtons}>
              <a href={`tel:${companyInfo.hotline}`} className={styles.btnCtaHotline}>
                <Phone size={18} />
                <span>
                  {t.common.callNow}: {companyInfo.hotlineFormatted}
                </span>
              </a>
              <a
                href={companyInfo.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnCtaZalo}
              >
                <MessageSquare size={18} />
                <span>{t.common.chatZalo}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
