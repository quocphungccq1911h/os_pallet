import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight, Facebook, Globe } from 'lucide-react';
import { companyInfo } from '@/data/companyInfo';
import { categories } from '@/data/products';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Value Promise Banner */}
      <div className={styles.promiseBanner}>
        <div className={`container ${styles.promiseGrid}`}>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🏭</div>
            <div>
              <h4>Giá Gốc Tận Xưởng</h4>
              <p>Sản xuất trực tiếp không qua trung gian</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🛡️</div>
            <div>
              <h4>Tiêu Chuẩn ISPM 15</h4>
              <p>Khử trùng sấy HT chuẩn xuất khẩu</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>📐</div>
            <div>
              <h4>Báo Giá & Mẫu Nhanh</h4>
              <p>Nhận bản vẽ đóng theo yêu cầu riêng</p>
            </div>
          </div>
          <div className={styles.promiseItem}>
            <div className={styles.promiseIcon}>🚚</div>
            <div>
              <h4>Giao Hàng Siêu Tốc</h4>
              <p>Phân phối tận nơi khu vực phía Nam & KCN</p>
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
              <span style={{ fontSize: '2rem' }}>🪵</span>
              <span className={styles.footerLogoTitle}>{companyInfo.name}</span>
            </div>
            <p className={styles.footerDesc}>{companyInfo.description}</p>
            
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.iconAccent} />
                <span><strong>VP Trụ sở:</strong> {companyInfo.address}</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.iconAccent} />
                <span><strong>Xưởng sản xuất:</strong> {companyInfo.factoryAddress}</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.iconAccent} />
                <span><strong>Hotline báo giá:</strong> {companyInfo.hotlineFormatted}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.iconAccent} />
                <span><strong>Email:</strong> {companyInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Categories */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>Danh Mục Sản Phẩm</h3>
            <ul className={styles.linkList}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/san-pham?category=${cat.slug}`} className={styles.footerLink}>
                    <ChevronRight size={14} />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & SEO Keywords */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>Hỗ Trợ & SEO</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/bang-gia" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>Bảng Giá Pallet Gỗ Mới Nhất</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>Kiến Thức Chọn Pallet Chuẩn</span>
                </Link>
              </li>
              <li>
                <Link href="/tin-tuc/tieu-chuan-ispm-15-la-gi-khi-xuat-khau-pallet-go" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>Tiêu Chuẩn ISPM 15 Xuất Khẩu</span>
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className={styles.footerLink}>
                  <ChevronRight size={14} />
                  <span>Form Đăng Ký Nhận Mẫu Sưu Tập</span>
                </Link>
              </li>
            </ul>

            <div className={styles.socialBox}>
              <h4>Kết Nối Với Chúng Tôi</h4>
              <div className={styles.socialBtns}>
                <a href={companyInfo.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Facebook size={18} />
                </a>
                <a href={companyInfo.zaloUrl} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <span>Zalo</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Google Maps Embed */}
          <div className={styles.footerCol}>
            <h3 className={styles.colTitle}>Bản Đồ Nhà Xưởng</h3>
            <div className={styles.mapContainer}>
              <iframe
                title="Bản đồ vị trí xưởng sản xuất Pallet Gỗ"
                src={companyInfo.googleMapsEmbed}
                width="100%"
                height="180"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={`container ${styles.copyrightFlex}`}>
          <p>© 2026 {companyInfo.name}. Bản quyền thuộc về doanh nghiệp. Tối ưu SEO bởi Antigravity.</p>
          <div className={styles.bottomLinks}>
            <Link href="/">Trang chủ</Link>
            <span>•</span>
            <Link href="/san-pham">Sản phẩm</Link>
            <span>•</span>
            <Link href="/lien-he">Báo giá</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
