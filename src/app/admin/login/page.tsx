'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Eye, EyeOff, ArrowLeft, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './login.module.css';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Kiểm tra nếu đã đăng nhập thì tự chuyển sang /admin
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth-check');
        const data = await res.json();
        if (data.authenticated) {
          router.replace('/admin');
        }
      } catch {
        // ignore
      }
    }
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!password.trim()) {
      setErrorMsg('Vui lòng nhập mật khẩu quản trị');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Mật khẩu không đúng. Vui lòng thử lại.');
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.replace('/admin');
      }, 500);
    } catch {
      setErrorMsg('Không thể kết nối máy chủ. Vui lòng thử lại sau.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <div className={styles.cardHeader}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/logo_home.jpg"
              alt="Logo Pallet Trường An"
              width={80}
              height={80}
              className={styles.logoImg}
              priority
            />
          </div>
          <h1 className={styles.title}>Quản Trị Pallet Trường An</h1>
          <p className={styles.subtitle}>
            Đăng nhập để cập nhật sản phẩm, thông số quy cách và hình ảnh thực tế tại xưởng
          </p>
        </div>

        {errorMsg && (
          <div className={styles.errorBanner}>
            <ShieldAlert size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="admin-password">
              Mật khẩu quản trị
            </label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                autoFocus
                disabled={isLoading || isSuccess}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.toggleEyeBtn}
                title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <span>Đang xác thực...</span>
            ) : isSuccess ? (
              <>
                <CheckCircle2 size={18} />
                <span>Đăng nhập thành công...</span>
              </>
            ) : (
              <>
                <span>Vào Trang Quản Trị</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className={styles.hintBox}>
          💡 <strong>Mật khẩu mặc định:</strong> <code>truongan@2024</code> (hoặc cấu hình trong biến môi trường <code>ADMIN_PASSWORD</code>).
        </div>

        <div className={styles.cardFooter}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Quay lại trang chủ website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
