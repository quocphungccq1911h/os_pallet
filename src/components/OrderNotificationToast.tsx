'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Check } from 'lucide-react';
import {
  defaultOrderNotifications,
  OrderNotificationItem,
} from '@/data/orderNotifications';
import styles from './OrderNotificationToast.module.css';

// Nhịp hiển thị tự nhiên: 5s -> 15s -> 25s -> 40s -> lặp lại mỗi 60s
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
      // Nếu tab trình duyệt đang ẩn, đợi khi user quay lại mới hiện
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

  // Nạp đơn hàng thật từ Supabase và bắt đầu chu kỳ hiển thị
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

  // Bấm nút X: đóng popup hiện tại và tiếp tục lịch cho lần kế tiếp
  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isHoveredRef.current = false;
    setIsVisible(false);
    clearTimers();
    scheduleNext();
  };

  // Bấm vào sản phẩm trong popup: đóng popup, reset hover và tiếp tục lịch
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

  return (
    <div
      className={`${styles.toastWrapper} ${isVisible ? styles.toastVisible : styles.toastHidden}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="status"
      aria-live="polite"
    >
      <Link href={currentItem.href} className={styles.toastCard} onClick={handleCardClick}>
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
