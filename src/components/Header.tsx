import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

type MegaGroup = 'pallet-go' | 'pallet-nhua' | 'thung' | null;

const PALLET_GO_ITEMS = [
  { label: 'Pallet Gỗ Tràm (3 Gánh & 9 Gù)', href: '/san-pham?category=pallet-go-tram' },
  { label: 'Pallet Gỗ Thông Xuất Khẩu (ISPM 15)', href: '/san-pham?category=pallet-go-thong' },
  { label: 'Pallet Ván Ép (Plywood 10–15mm)', href: '/san-pham?category=pallet-van-ep' },
  { label: 'Pallet Đóng Theo Bản Vẽ', href: '/san-pham?category=pallet-theo-yeu-cau' },
];

const PALLET_NHUA_ITEMS = [
  { label: 'Pallet Nhựa Mới Công Nghiệp', href: '/san-pham?category=pallet-nhua-moi' },
  { label: 'Pallet Nhựa Cũ (Độ Mới 85–95%)', href: '/san-pham?category=pallet-nhua-cu' },
];

const THUNG_ITEMS = [
  { label: 'Thùng Gỗ / Kiện Gỗ Đóng Hàng', href: '/san-pham?category=thung-go-dong-hang' },
  { label: 'Thùng Nhựa Công Nghiệp', href: '/san-pham?category=thung-nhua' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaGroup, setActiveMegaGroup] = useState<MegaGroup>(null);
  const [mobileAccordion, setMobileAccordion] = useState<MegaGroup>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMegaGroup(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMegaMenu = () => setActiveMegaGroup(null);

  const toggleMobileAccordion = (group: Exclude<MegaGroup, null>) => {
    setMobileAccordion((prev) => (prev === group ? null : group));
  };

  return (
    <header className={styles.header}>
      {/* Top Contact Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLeft}>
            <span className={styles.topBarItem}>
              <MapPin size={14} />
              <span>94 Dương Công Khi, Bà Điểm, Hồ Chí Minh</span>
            </span>
            <span className={styles.topBarItem}>
              <Clock size={14} />
              <span>07:30 - 18:00 (Thứ 2 - CN)</span>
            </span>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.topBarHotlines}>
              <Phone size={14} />
              <span>Hotline: </span>
              <a href={`tel:${companyInfo.hotline}`} className={styles.topBarPhoneLink}>
                <strong>{companyInfo.hotlineFormatted}</strong>
              </a>
            </div>
            <a href={`mailto:${companyInfo.email}`} className={styles.topBarItem}>
              <Mail size={14} />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Navbar + Mega Menu Wrapper */}
      <div
        className={styles.mainNav}
        onMouseLeave={closeMegaMenu}
      >
        <div className={`container ${styles.mainNavContainer}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo} onClick={closeMegaMenu}>
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
            <Link href="/" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              Trang Chủ
            </Link>

            <div
              className={styles.navDropdownTrigger}
              onMouseEnter={() => setActiveMegaGroup('pallet-go')}
            >
              <Link
                href="/san-pham?group=pallet-go"
                className={`${styles.navLink} ${styles.navLinkWithIcon} ${
                  activeMegaGroup === 'pallet-go' ? styles.navLinkActive : ''
                }`}
                onClick={closeMegaMenu}
              >
                <span>Pallet Gỗ</span>
                <ChevronDown
                  size={15}
                  className={`${styles.navChevron} ${
                    activeMegaGroup === 'pallet-go' ? styles.navChevronOpen : ''
                  }`}
                />
              </Link>
            </div>

            <div
              className={styles.navDropdownTrigger}
              onMouseEnter={() => setActiveMegaGroup('pallet-nhua')}
            >
              <Link
                href="/san-pham?group=pallet-nhua"
                className={`${styles.navLink} ${styles.navLinkWithIcon} ${
                  activeMegaGroup === 'pallet-nhua' ? styles.navLinkActive : ''
                }`}
                onClick={closeMegaMenu}
              >
                <span>Pallet Nhựa</span>
                <ChevronDown
                  size={15}
                  className={`${styles.navChevron} ${
                    activeMegaGroup === 'pallet-nhua' ? styles.navChevronOpen : ''
                  }`}
                />
              </Link>
            </div>

            <div
              className={styles.navDropdownTrigger}
              onMouseEnter={() => setActiveMegaGroup('thung')}
            >
              <Link
                href="/san-pham?group=thung"
                className={`${styles.navLink} ${styles.navLinkWithIcon} ${
                  activeMegaGroup === 'thung' ? styles.navLinkActive : ''
                }`}
                onClick={closeMegaMenu}
              >
                <span>Thùng</span>
                <ChevronDown
                  size={15}
                  className={`${styles.navChevron} ${
                    activeMegaGroup === 'thung' ? styles.navChevronOpen : ''
                  }`}
                />
              </Link>
            </div>

            <Link href="/hoat-dong" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              Hoạt Động
            </Link>
            <Link href="/bang-gia" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              Bảng Giá
            </Link>
            <Link href="/tin-tuc" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              Kiến Thức
            </Link>
            <Link href="/lien-he" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              Liên Hệ
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className={styles.navActions}>
            <button
              onClick={() => {
                closeMegaMenu();
                onOpenQuoteModal();
              }}
              className="btn btn-primary"
              style={{ padding: '0.6rem 1.15rem' }}
            >
              <FileText size={17} />
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

        {/* Desktop Mega Menu Panel (3 Product Columns + CTA Card) */}
        {activeMegaGroup && (
          <div className={styles.megaMenuPanel}>
            <div className={`container ${styles.megaMenuGrid}`}>
              {/* Column 1: PALLET GỖ */}
              <div
                className={`${styles.megaColumn} ${
                  activeMegaGroup === 'pallet-go' ? styles.megaColumnHighlight : ''
                }`}
                onMouseEnter={() => setActiveMegaGroup('pallet-go')}
              >
                <div className={styles.megaColHeader}>
                  <span className={styles.megaColTitle}>PALLET GỖ</span>
                </div>
                <ul className={styles.megaList}>
                  {PALLET_GO_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.megaLink} onClick={closeMegaMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/san-pham?group=pallet-go"
                  className={styles.megaViewAll}
                  onClick={closeMegaMenu}
                >
                  <span>Xem tất cả</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Column 2: PALLET NHỰA */}
              <div
                className={`${styles.megaColumn} ${
                  activeMegaGroup === 'pallet-nhua' ? styles.megaColumnHighlight : ''
                }`}
                onMouseEnter={() => setActiveMegaGroup('pallet-nhua')}
              >
                <div className={styles.megaColHeader}>
                  <span className={styles.megaColTitle}>PALLET NHỰA</span>
                </div>
                <ul className={styles.megaList}>
                  {PALLET_NHUA_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.megaLink} onClick={closeMegaMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/san-pham?group=pallet-nhua"
                  className={styles.megaViewAll}
                  onClick={closeMegaMenu}
                >
                  <span>Xem tất cả</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Column 3: THÙNG */}
              <div
                className={`${styles.megaColumn} ${
                  activeMegaGroup === 'thung' ? styles.megaColumnHighlight : ''
                }`}
                onMouseEnter={() => setActiveMegaGroup('thung')}
              >
                <div className={styles.megaColHeader}>
                  <span className={styles.megaColTitle}>THÙNG</span>
                </div>
                <ul className={styles.megaList}>
                  {THUNG_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={styles.megaLink} onClick={closeMegaMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/san-pham?group=thung"
                  className={styles.megaViewAll}
                  onClick={closeMegaMenu}
                >
                  <span>Xem tất cả</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Column 4: Dark Consultation Card */}
              <div className={styles.megaCtaCard}>
                <h4 className={styles.megaCtaTitle}>Cần tư vấn nhanh?</h4>
                <p className={styles.megaCtaDesc}>
                  Gửi kích thước và tải trọng, đội ngũ Trường An phản hồi ngay trong giờ làm việc.
                </p>
                <a href={`tel:${companyInfo.hotline}`} className={styles.megaCtaPhone}>
                  {companyInfo.hotlineFormatted}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    closeMegaMenu();
                    onOpenQuoteModal();
                  }}
                  className={styles.megaCtaBtn}
                >
                  Nhận báo giá
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <nav className={styles.mobileNav}>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Trang Chủ</span>
              <ChevronRight size={16} />
            </Link>

            {/* Mobile Accordion: Pallet Gỗ */}
            <div className={styles.mobileAccordionGroup}>
              <button
                type="button"
                className={`${styles.mobileNavLink} ${styles.mobileAccordionBtn}`}
                onClick={() => toggleMobileAccordion('pallet-go')}
              >
                <span>Pallet Gỗ</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'pallet-go' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'pallet-go' && (
                <div className={styles.mobileSubList}>
                  {PALLET_GO_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={styles.mobileSubLink}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/san-pham?group=pallet-go"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileSubViewAll}
                  >
                    <span>Xem tất cả Pallet Gỗ</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Pallet Nhựa */}
            <div className={styles.mobileAccordionGroup}>
              <button
                type="button"
                className={`${styles.mobileNavLink} ${styles.mobileAccordionBtn}`}
                onClick={() => toggleMobileAccordion('pallet-nhua')}
              >
                <span>Pallet Nhựa</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'pallet-nhua' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'pallet-nhua' && (
                <div className={styles.mobileSubList}>
                  {PALLET_NHUA_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={styles.mobileSubLink}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/san-pham?group=pallet-nhua"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileSubViewAll}
                  >
                    <span>Xem tất cả Pallet Nhựa</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Accordion: Thùng */}
            <div className={styles.mobileAccordionGroup}>
              <button
                type="button"
                className={`${styles.mobileNavLink} ${styles.mobileAccordionBtn}`}
                onClick={() => toggleMobileAccordion('thung')}
              >
                <span>Thùng</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'thung' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'thung' && (
                <div className={styles.mobileSubList}>
                  {THUNG_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={styles.mobileSubLink}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/san-pham?group=thung"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.mobileSubViewAll}
                  >
                    <span>Xem tất cả Thùng</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            <Link href="/hoat-dong" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>Hoạt Động Xưởng</span>
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
              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline" style={{ width: '100%', marginBottom: '0.6rem' }}>
                <Phone size={18} />
                <span>Hotline: {companyInfo.hotlineFormatted}</span>
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
