'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import {
  defaultOrderNotifications,
  OrderNotificationItem,
} from '@/data/orderNotifications';
import styles from './OrderNotificationToast.module.css';

// Tần suất xuất hiện gần và tự nhiên hơn: 5s -> 15s -> 25s -> 40s -> 60s -> 60s -> 90s -> 90s
const SCHEDULE_DELAYS_MS = [5_000, 15_000, 25_000, 40_000, 60_000, 60_000, 90_000, 90_000];
const VISIBLE_DURATION_MS = 6_500;
const DISMISS_STORAGE_KEY = 'ta_order_toast_dismissed';

function shuffleList<T>(list: T[]): T[] {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const OrderNotificationToast: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<OrderNotificationItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const itemsRef = useRef<OrderNotificationItem[]>(shuffleList(defaultOrderNotifications));
  const itemIndexRef = useRef(0);
  const stepIndexRef = useRef(0);
  const isDismissedRef = useRef(false);
  const isHoveredRef = useRef(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    if (isDismissedRef.current) return;

    const pool = itemsRef.current;
    if (pool.length === 0) return;

    const nextItem = pool[itemIndexRef.current % pool.length];
    itemIndexRef.current += 1;
    stepIndexRef.current += 1;

    setCurrentItem(nextItem);
    setIsVisible(true);

    // Lên lịch tự ẩn sau VISIBLE_DURATION_MS
    hideTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
        scheduleNextRef.current();
      }
    }, VISIBLE_DURATION_MS);
  }, []);

  const scheduleNextRef = useRef<() => void>(() => {});
  const pendingWhenVisibleRef = useRef(false);

  const scheduleNext = useCallback(() => {
    if (isDismissedRef.current) return;
    if (stepIndexRef.current >= SCHEDULE_DELAYS_MS.length) return;

    const delay = SCHEDULE_DELAYS_MS[stepIndexRef.current];
    showTimerRef.current = setTimeout(() => {
      if (isDismissedRef.current) return;

      // Nếu tab trình duyệt đang ẩn (user ở tab khác), đợi khi user quay lại mới hiện
      if (typeof document !== 'undefined' && document.hidden) {
        pendingWhenVisibleRef.current = true;
        return;
      }

      showToastNow();
    }, delay);
  }, [showToastNow]);

  scheduleNextRef.current = scheduleNext;

  // Khi user quay lại tab trình duyệt mà có thông báo đang chờ -> hiện sau 1.5s
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && pendingWhenVisibleRef.current && !isDismissedRef.current) {
        pendingWhenVisibleRef.current = false;
        showTimerRef.current = setTimeout(() => {
          showToastNow();
        }, 1_500);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [showToastNow]);

  // Nạp đơn hàng thật từ Supabase (đã ẩn thông tin nhạy cảm) và gộp với danh sách B2B mẫu
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem(DISMISS_STORAGE_KEY) === '1') {
        isDismissedRef.current = true;
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    let cancelled = false;
    async function loadRealOrders() {
      try {
        const res = await fetch('/api/orders/recent-public');
        if (!res.ok) return;
        const realItems: OrderNotificationItem[] = await res.json();
        if (!cancelled && Array.isArray(realItems) && realItems.length > 0) {
          // Xáo trộn đơn hàng thật từ DB để mỗi lần hiện đa dạng, không bị trùng lặp
          itemsRef.current = shuffleList(realItems);
        }
      } catch {
        // Giữ nguyên danh sách mặc định nếu lỗi mạng
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
    isDismissedRef.current = true;
    setIsVisible(false);
    clearTimers();
    try {
      sessionStorage.setItem(DISMISS_STORAGE_KEY, '1');
    } catch {
      // Ignore storage errors
    }
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
    if (isVisible && !isDismissedRef.current) {
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        scheduleNext();
      }, 2_200);
    }
  };

  if (!currentItem) return null;

  return (
    <div
      className={`${styles.toastWrapper} ${isVisible ? styles.toastVisible : styles.toastHidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
    >
      <Link href={currentItem.href} className={styles.toastCard} onClick={() => setIsVisible(false)}>
        {/* Avatar + Verified Badge */}
        <div className={styles.avatarBox}>
          <span className={styles.avatarInitials}>{currentItem.initials}</span>
          <span className={styles.verifiedBadge} aria-hidden="true">
            <Check size={10} strokeWidth={3} />
          </span>
        </div>

        {/* Content */}
        <div className={styles.contentBox}>
          <div className={styles.topRow}>
            <span className={styles.customerName}>{currentItem.customerLabel}</span>
            <span className={styles.metaText}>
              {currentItem.timeAgo} · {currentItem.location}
            </span>
          </div>
          <p className={styles.orderLine}>
            <span>{currentItem.actionText} </span>
            <strong className={styles.productHighlight}>{currentItem.productLabel}</strong>
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className={styles.closeBtn}
          aria-label="Đóng thông báo đơn hàng"
        >
          <X size={14} />
        </button>
      </Link>
    </div>
  );
};
