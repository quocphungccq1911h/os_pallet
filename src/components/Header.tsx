import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Clock, MapPin, Menu, X, ChevronRight, FileText } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      {/* Top Contact Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLeft}>
            <span className={styles.topBarItem}>
              <MapPin size={14} />
              <span>{companyInfo.address}</span>
            </span>
            <span className={styles.topBarItem}>
              <Clock size={14} />
              <span>{companyInfo.workingHours}</span>
            </span>
          </div>
          <div className={styles.topBarRight}>
            <a href={`tel:${companyInfo.hotline}`} className={styles.topBarItem}>
              <Phone size={14} />
              <span>Hotline: <strong>{companyInfo.hotlineFormatted}</strong></span>
            </a>
            <a href={`mailto:${companyInfo.email}`} className={styles.topBarItem}>
              <Mail size={14} />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Navbar */}
      <div className={styles.mainNav}>
        <div className={`container ${styles.mainNavContainer}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>🪵</div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>{companyInfo.shortName}</span>
              <span className={styles.logoSubtitle}>PALLET GỖ B2B CHUẨN ISO</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>Trang Chủ</Link>
            <Link href="/san-pham" className={styles.navLink}>Sản Phẩm Pallet</Link>
            <Link href="/bang-gia" className={styles.navLink}>Bảng Giá Tham Khảo</Link>
            <Link href="/tin-tuc" className={styles.navLink}>Kiến Thức & SEO</Link>
            <Link href="/lien-he" className={styles.navLink}>Liên Hệ</Link>
          </nav>

          {/* Action CTA Button */}
          <div className={styles.navActions}>
            <button onClick={onOpenQuoteModal} className="btn btn-primary">
              <FileText size={18} />
              <span>Nhận Báo Giá Nhanh</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              aria-label="Toggle Navigation"
              className={styles.hamburger}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Trang Chủ</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/san-pham" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Sản Phẩm Pallet Gỗ</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/bang-gia" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Bảng Giá Tra Cứu</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/tin-tuc" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Kiến Thức & Tin Tức</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/lien-he" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Liên Hệ Công Ty</span>
              <ChevronRight size={16} />
            </Link>

            <div className={styles.mobileContactBox}>
              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline" style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Phone size={18} />
                <span>Gọi Hotline: {companyInfo.hotlineFormatted}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                <FileText size={18} />
                <span>Yêu Cầu Báo Giá Bản Vẽ</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
