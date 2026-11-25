'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ChevronRight, Facebook } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { categories } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import { localizeCategory } from '@/i18n/productLocalizer';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <footer className={styles.footer}>
      {/* Top Value Promise Banner */}
      <div className={styles.promiseBanner}>
        <div className={`container ${styles.promiseGrid}`}>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🏭</div>
            <div>
              <h4>{t.footer.p1Title}</h4>
              <p>{t.footer.p1Desc}</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🛡️</div>
            <div>
              <h4>{t.footer.p2Title}</h4>
              <p>{t.footer.p2Desc}</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>📐</div>
            <div>
              <h4>{t.footer.p3Title}</h4>
              <p>{t.footer.p3Desc}</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🚚</div>
            <div>
              <h4>{t.footer.p4Title}</h4>
              <p>{t.footer.p4Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className={styles.mainFooter}>
        <div className={`container ${styles.footerGrid}`}>
          {/* Column 1: Company Info */}
          <div className={styles.footerCol}>
            <div className={styles.footerLogo}>
              <img
                src="/images/logo_home.jpg"
                alt="Logo Pallet Trường An"
                className={styles.footerLogoImg}
              />
              <span className={styles.footerLogoTitle}>{t.common.companyName}</span>
            </div>
            <p className={styles.footerDesc}>{t.footer.companyDesc}</p>

            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.iconAccent} />
                <span>
                  <strong>{t.footer.labelAddress}</strong> {t.common.address}
                </span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.iconAccent} />
                <span>
                  <strong>{t.footer.labelHotline}</strong>{' '}
                  <a href={`tel:${companyInfo.hotline}`} style={{ color: '#ffffff' }}>
                    {companyInfo.hotlineFormatted}
                  </a>
                </span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.iconAccent} />
                <span>
                  <strong>{t.footer.labelEmail}</strong> {companyInfo.email}
                </span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={18} className={styles.iconAccent} />
                <span>
                  <strong>{t.footer.labelHours}</strong> {t.common.workingHours}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>{t.footer.colCategories}</h3>
            <ul className={styles.linkList}>
              {categories.map((cat) => {
                const locCat = localizeCategory(cat, locale);
                return (
                  <li key={cat.id}>
                    <Link href={`/san-pham?category=${cat.slug}`} className={styles.footerLink}>
                      <ChevronRight size={14} />
                      <span>{locCat.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>{t.footer.colSupport}</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/hoat-dong" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>{t.footer.linkActivities}</span>
                </Link>
              </li>
              <li>
                <Link href="/bang-gia" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>{t.footer.linkPricing}</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>{t.footer.linkKnowledge}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/tin-tuc/tieu-chuan-ispm-15-la-gi-khi-xuat-khau-pallet-go"
                  className={styles.footerLink}
                >
                  <ChevronRight size={14} />
                  <span>{t.footer.linkIspm15}</span>
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>{t.footer.linkQuoteSample}</span>
                </Link>
              </li>
            </ul>

            <div className={styles.socialBox}>
              <h4>{t.footer.connectTitle}</h4>
              <div className={styles.socialBtns}>
                <a
                  href={companyInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  title="Facebook Pallet Trường An"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={companyInfo.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  title="Zalo"
                >
                  <span>Zalo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Google Maps Embed */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>{t.footer.colMap}</h3>
            <div className={styles.mapContainer}>
              <iframe
                title={t.footer.colMap}
                src={companyInfo.googleMapsEmbed}
                width="100%"
                height="160"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
              <a
                href="https://www.google.com/maps/place/X%C6%B0%E1%BB%9Fng+g%E1%BB%97+-+Pallet+Tr%C6%B0%E1%BB%9Dng+An/@10.8441426,106.5628343,17z/data=!3m1!4b1!4m6!3m5!1s0x3174d55be195f14f:0x6afa9f41ef9b6161!8m2!3d10.8441373!4d106.5654092!16s%2Fg%2F11z3npbjlp?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapDirectionBtn}
              >
                <MapPin size={14} />
                <span>{t.footer.openGoogleMaps}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={`container ${styles.copyrightFlex}`}>
          <p>
            © 2026 {t.common.companyName}. {t.footer.copyright}
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/">{t.common.home}</Link>
            <span>•</span>
            <Link href="/san-pham">{t.common.products}</Link>
            <span>•</span>
            <Link href="/lien-he">{t.common.quoteShort}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
