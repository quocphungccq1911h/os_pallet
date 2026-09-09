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
            <div className={styles.topBarHotlines}>
              <Phone size={14} />
              <span>Hotline: </span>
              <a href={`tel:${companyInfo.hotline}`} className={styles.topBarPhoneLink}>
                <strong>{companyInfo.hotlineFormatted}</strong>
              </a>
              <span className={styles.topBarDivider}>-</span>
              <a href={`tel:${companyInfo.secondaryHotline}`} className={styles.topBarPhoneLink}>
                <strong>{companyInfo.secondaryHotlineFormatted}</strong>
              </a>
            </div>
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
            <img
              src="/images/logo_home.jpg"
              alt="Logo Pallet Trường An"
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>{companyInfo.shortName}</span>
              <span className={styles.logoSubtitle}>XƯỞNG PALLET GỖ & THÙNG GỖ</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink}>Trang Chủ</Link>
            <Link href="/san-pham" className={styles.navLink}>Sản Phẩm</Link>
            <Link href="/bang-gia" className={styles.navLink}>Bảng Giá</Link>
            <Link href="/tin-tuc" className={styles.navLink}>Kiến Thức</Link>
            <Link href="/lien-he" className={styles.navLink}>Liên Hệ</Link>
          </nav>

          {/* Action CTA Button & Dual Hotline Badge */}
          <div className={styles.navActions}>
            <div className={styles.headerPhoneBox}>
              <div className={styles.phoneCircle}>
                <Phone size={18} />
              </div>
              <div className={styles.phoneInfo}>
                <span className={styles.phoneLabel}>Tư vấn báo giá xưởng:</span>
                <div className={styles.phoneLinks}>
                  <a href={`tel:${companyInfo.hotline}`} className={styles.phoneNumber}>
                    {companyInfo.hotlineFormatted}
                  </a>
                  <span className={styles.phoneDash}>-</span>
                  <a href={`tel:${companyInfo.secondaryHotline}`} className={styles.phoneNumber}>
                    {companyInfo.secondaryHotlineFormatted}
                  </a>
                </div>
              </div>
            </div>

            <button onClick={onOpenQuoteModal} className="btn btn-primary">
              <FileText size={18} />
              <span>Nhận Báo Giá</span>
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
              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline" style={{ width: '100%', marginBottom: '0.4rem' }}>
                <Phone size={18} />
                <span>Line 1: {companyInfo.hotlineFormatted}</span>
              </a>
              <a href={`tel:${companyInfo.secondaryHotline}`} className="btn btn-hotline" style={{ width: '100%', marginBottom: '0.6rem', backgroundColor: '#1e3a8a' }}>
                <Phone size={18} />
                <span>Line 2: {companyInfo.secondaryHotlineFormatted}</span>
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
