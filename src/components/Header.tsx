'use client';

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
import { categories } from '@/data/products';
import { LOCALE_OPTIONS } from '@/i18n/translations';
import { localizeCategory } from '@/i18n/productLocalizer';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Header.module.css';

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

type MegaGroup = 'pallet-go' | 'pallet-nhua' | 'thung' | null;

const PALLET_GO_SLUGS = ['pallet-go-tram', 'pallet-go-thong', 'pallet-van-ep', 'pallet-theo-yeu-cau'];
const PALLET_NHUA_SLUGS = ['pallet-nhua-moi', 'pallet-nhua-cu'];
const THUNG_SLUGS = ['thung-go-dong-hang', 'thung-nhua'];

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const { locale, setLocale, t } = useLanguage();
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

  const getLocalizedItems = (slugs: string[]) =>
    slugs
      .map((s) => categories.find((c) => c.slug === s))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => {
        const loc = localizeCategory(c, locale);
        return { label: loc.name, href: `/san-pham?category=${c.slug}` };
      });

  const palletGoItems = getLocalizedItems(PALLET_GO_SLUGS);
  const palletNhuaItems = getLocalizedItems(PALLET_NHUA_SLUGS);
  const thungItems = getLocalizedItems(THUNG_SLUGS);

  return (
    <header className={styles.header}>
      {/* Top Contact Bar + Language Switcher */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <div className={styles.topBarLeft}>
            <span className={styles.topBarItem}>
              <MapPin size={14} />
              <span>{t.common.address}</span>
            </span>
            <span className={styles.topBarItem}>
              <Clock size={14} />
              <span>{t.common.workingHours}</span>
            </span>
          </div>
          <div className={styles.topBarRight}>
            <div className={styles.topBarHotlines}>
              <Phone size={14} />
              <span>{t.common.hotline}: </span>
              <a href={`tel:${companyInfo.hotline}`} className={styles.topBarPhoneLink}>
                <strong>{companyInfo.hotlineFormatted}</strong>
              </a>
            </div>
            <a href={`mailto:${companyInfo.email}`} className={`${styles.topBarItem} ${styles.topBarEmail}`}>
              <Mail size={14} />
              <span>{companyInfo.email}</span>
            </a>

            {/* Desktop Language Switcher Pill */}
            <div className={styles.langSwitcher} role="group" aria-label={t.header.langLabel}>
              {LOCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={`${styles.langBtn} ${locale === opt.code ? styles.langBtnActive : ''}`}
                  title={opt.fullLabel}
                >
                  <span className={styles.langFlag}>{opt.flag}</span>
                  <span>{opt.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Navbar + Mega Menu Wrapper */}
      <div className={styles.mainNav} onMouseLeave={closeMegaMenu}>
        <div className={`container ${styles.mainNavContainer}`}>
          {/* Brand Logo */}
          <Link href="/" className={styles.logo} onClick={closeMegaMenu}>
            <img
              src="/images/logo_home.jpg"
              alt="Logo Pallet Trường An"
              className={styles.logoImage}
            />
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>{t.common.shortName}</span>
              <span className={styles.logoSubtitle}>{t.header.logoSubtitle}</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            <Link href="/" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              {t.header.navHome}
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
                <span>{t.header.navWoodPallet}</span>
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
                <span>{t.header.navPlasticPallet}</span>
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
                <span>{t.header.navCrates}</span>
                <ChevronDown
                  size={15}
                  className={`${styles.navChevron} ${
                    activeMegaGroup === 'thung' ? styles.navChevronOpen : ''
                  }`}
                />
              </Link>
            </div>

            <Link href="/hoat-dong" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              {t.header.navActivities}
            </Link>
            <Link href="/bang-gia" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              {t.header.navPricing}
            </Link>
            <Link href="/tin-tuc" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              {t.header.navKnowledge}
            </Link>
            <Link href="/lien-he" className={styles.navLink} onMouseEnter={closeMegaMenu}>
              {t.header.navContact}
            </Link>
          </nav>

          {/* Action CTA Button + Mobile Lang + Hamburger */}
          <div className={styles.navActions}>
            <button
              onClick={() => {
                closeMegaMenu();
                onOpenQuoteModal();
              }}
              className={`btn btn-primary ${styles.desktopQuoteBtn}`}
              style={{ padding: '0.6rem 1.05rem', whiteSpace: 'nowrap' }}
            >
              <FileText size={17} />
              <span>{t.header.btnQuote}</span>
            </button>

            {/* Compact Mobile Language Switcher */}
            <div className={styles.mobileLangInline}>
              {LOCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={`${styles.mobileLangMiniBtn} ${
                    locale === opt.code ? styles.mobileLangMiniActive : ''
                  }`}
                >
                  {opt.shortLabel}
                </button>
              ))}
            </div>

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
                  <span className={styles.megaColTitle}>{t.header.megaWoodTitle}</span>
                </div>
                <ul className={styles.megaList}>
                  {palletGoItems.map((item) => (
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
                  <span>{t.common.viewAll}</span>
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
                  <span className={styles.megaColTitle}>{t.header.megaPlasticTitle}</span>
                </div>
                <ul className={styles.megaList}>
                  {palletNhuaItems.map((item) => (
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
                  <span>{t.common.viewAll}</span>
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
                  <span className={styles.megaColTitle}>{t.header.megaCratesTitle}</span>
                </div>
                <ul className={styles.megaList}>
                  {thungItems.map((item) => (
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
                  <span>{t.common.viewAll}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Column 4: Dark Consultation Card */}
              <div className={styles.megaCtaCard}>
                <h4 className={styles.megaCtaTitle}>{t.header.megaCtaTitle}</h4>
                <p className={styles.megaCtaDesc}>{t.header.megaCtaDesc}</p>
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
                  {t.header.megaCtaBtn}
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
            {/* Full Language Selector inside Mobile Drawer */}
            <div className={styles.mobileDrawerLangRow}>
              {LOCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={`${styles.mobileDrawerLangBtn} ${
                    locale === opt.code ? styles.mobileDrawerLangActive : ''
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.fullLabel}</span>
                </button>
              ))}
            </div>

            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>{t.header.navHome}</span>
              <ChevronRight size={16} />
            </Link>

            {/* Mobile Accordion: Pallet Gỗ */}
            <div className={styles.mobileAccordionGroup}>
              <button
                type="button"
                className={`${styles.mobileNavLink} ${styles.mobileAccordionBtn}`}
                onClick={() => toggleMobileAccordion('pallet-go')}
              >
                <span>{t.header.navWoodPallet}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'pallet-go' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'pallet-go' && (
                <div className={styles.mobileSubList}>
                  {palletGoItems.map((item) => (
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
                    <span>{t.header.mobileAllWood}</span>
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
                <span>{t.header.navPlasticPallet}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'pallet-nhua' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'pallet-nhua' && (
                <div className={styles.mobileSubList}>
                  {palletNhuaItems.map((item) => (
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
                    <span>{t.header.mobileAllPlastic}</span>
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
                <span>{t.header.navCrates}</span>
                <ChevronDown
                  size={16}
                  className={`${styles.navChevron} ${
                    mobileAccordion === 'thung' ? styles.navChevronOpen : ''
                  }`}
                />
              </button>
              {mobileAccordion === 'thung' && (
                <div className={styles.mobileSubList}>
                  {thungItems.map((item) => (
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
                    <span>{t.header.mobileAllCrates}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            <Link href="/hoat-dong" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>{t.header.mobileActivities}</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/bang-gia" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>{t.header.mobilePricing}</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/tin-tuc" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>{t.header.mobileKnowledge}</span>
              <ChevronRight size={16} />
            </Link>
            <Link href="/lien-he" onClick={() => setMobileMenuOpen(false)} className={styles.mobileNavLink}>
              <span>{t.header.mobileContact}</span>
              <ChevronRight size={16} />
            </Link>

            <div className={styles.mobileContactBox}>
              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline" style={{ width: '100%', marginBottom: '0.6rem' }}>
                <Phone size={18} />
                <span>{t.common.hotline}: {companyInfo.hotlineFormatted}</span>
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
                <span>{t.header.mobileQuoteDrawing}</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
