'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import {
  defaultOrderNotifications,
  OrderNotificationItem,
} from '@/data/orderNotifications';
import { useLanguage } from '@/context/LanguageContext';
import { localizeOrderNotification } from '@/i18n/productLocalizer';
import styles from './OrderNotificationToast.module.css';

const SCHEDULE_DELAYS_MS = [5_000, 15_000, 25_000, 40_000, 60_000];
const VISIBLE_DURATION_MS = 6_500;

function shuffleList<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const OrderNotificationToast: React.FC = () => {
  const { locale, t } = useLanguage();
  const [currentItem, setCurrentItem] = useState<OrderNotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const itemsRef = useRef<OrderNotificationItem[]>(shuffleList(defaultOrderNotifications));
  const itemIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const isHoveredRef = useRef(false);
  const pendingWhenVisibleRef = useRef(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scheduleNextRef = useRef<() => void>(() => {});

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const showToastNow = useCallback(() => {
    const pool = itemsRef.current;
    if (pool.length === 0) return;

    const nextItem = pool[itemIndexRef.current % pool.length];
    itemIndexRef.current += 1;
    stepIndexRef.current += 1;

    isHoveredRef.current = false;
    setCurrentItem(nextItem);
    setIsVisible(true);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
        scheduleNextRef.current();
      }
    }, VISIBLE_DURATION_MS);
  }, []);

  const scheduleNext = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }

    const delayIdx = Math.min(stepIndexRef.current, SCHEDULE_DELAYS_MS.length - 1);
    const delay = SCHEDULE_DELAYS_MS[delayIdx];

    showTimerRef.current = setTimeout(() => {
      if (typeof document !== 'undefined' && document.hidden) {
        pendingWhenVisibleRef.current = true;
        return;
      }
      showToastNow();
    }, delay);
  }, [showToastNow]);

  scheduleNextRef.current = scheduleNext;

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && pendingWhenVisibleRef.current) {
        pendingWhenVisibleRef.current = false;
        if (showTimerRef.current) clearTimeout(showTimerRef.current);
        showTimerRef.current = setTimeout(() => {
          showToastNow();
        }, 1_500);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showToastNow]);

  useEffect(() => {
    let cancelled = false;

    async function loadRealOrders() {
      try {
        const res = await fetch('/api/orders/recent-public');
        if (!res.ok) return;
        const realItems: OrderNotificationItem[] = await res.json();
        if (!cancelled && Array.isArray(realItems) && realItems.length > 0) {
          itemsRef.current = shuffleList(realItems);
        }
      } catch {
        // fallback
      }
    }

    loadRealOrders();
    scheduleNext();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, [scheduleNext, clearTimers]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isHoveredRef.current = false;
    setIsVisible(false);
    clearTimers();
    scheduleNext();
  };

  const handleCardClick = () => {
    isHoveredRef.current = false;
    setIsVisible(false);
    clearTimers();
    scheduleNext();
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (isVisible) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        scheduleNext();
      }, 2_200);
    }
  };

  if (!currentItem) return null;

  const localized = localizeOrderNotification(currentItem, locale);

  return (
    <div
      className={`${styles.toastWrapper} ${isVisible ? styles.toastVisible : styles.toastHidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
    >
      <Link href={localized.href} className={styles.toastCard} onClick={handleCardClick}>
        <div className={styles.avatarBox}>
          <span className={styles.avatarInitials}>{localized.initials}</span>
          <span className={styles.verifiedBadge} aria-hidden="true">
            <Check size={10} strokeWidth={3} />
          </span>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.topRow}>
            <span className={styles.customerName}>{localized.customerLabel}</span>
            <span className={styles.metaText}>
              {localized.timeAgo} · {localized.location}
            </span>
          </div>
          <p className={styles.orderLine}>
            <span>{localized.actionText} </span>
            <strong className={styles.productHighlight}>{localized.productLabel}</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className={styles.closeBtn}
          aria-label={t.toast.closeAria}
        >
          <X size={14} />
        </button>
      </Link>
    </div>
  );
};
