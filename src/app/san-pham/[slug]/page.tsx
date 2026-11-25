'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  products as defaultProducts,
  Product,
  PALLET_GO_SLUGS,
  PALLET_NHUA_SLUGS,
  THUNG_SLUGS,
} from '@/data/products';
import { companyInfo } from '@/data/companyInfo';
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  FileText,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useQuoteModal } from '@/context/QuoteModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { localizeProduct } from '@/i18n/productLocalizer';
import { ProductGalleryBanner } from '@/components/ProductGalleryBanner';
import { ProductCard } from '@/components/ProductCard';
import { ProductTechnicalDrawing } from '@/components/ProductTechnicalDrawing';
import { WorkshopSpecsTable } from '@/components/WorkshopSpecsTable';
import styles from './detail.module.css';

function getRelatedProducts(current: Product, all: Product[], limit = 4): Product[] {
  const isCurrentPallet = PALLET_GO_SLUGS.includes(current.categorySlug);
  const isCurrentPlasticPallet = PALLET_NHUA_SLUGS.includes(current.categorySlug);
  const isCurrentThung = THUNG_SLUGS.includes(current.categorySlug);

  return all
    .filter((p) => p.id !== current.id && p.slug !== current.slug)
    .map((p) => {
      let score = 0;
      if (p.categorySlug === current.categorySlug) score += 100;
      if (isCurrentPallet && PALLET_GO_SLUGS.includes(p.categorySlug)) score += 40;
      if (isCurrentPlasticPallet && PALLET_NHUA_SLUGS.includes(p.categorySlug)) score += 40;
      if (isCurrentThung && THUNG_SLUGS.includes(p.categorySlug)) score += 40;
      if (p.targetMarket === current.targetMarket) score += 15;
      if (p.materialGroup === current.materialGroup) score += 10;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { openQuoteModal } = useQuoteModal();
  const { locale, t } = useLanguage();

  const [allProducts, setAllProducts] = useState<Product[]>(defaultProducts);
  const [rawProduct, setRawProduct] = useState<Product | undefined>(() =>
    defaultProducts.find((p) => p.slug === slug)
  );
  const [selectedImage, setSelectedImage] = useState<string>(
    defaultProducts.find((p) => p.slug === slug)?.imageUrl || ''
  );
  const [isLoading, setIsLoading] = useState(!rawProduct);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const list: Product[] = await res.json();
          if (Array.isArray(list) && list.length > 0) {
            setAllProducts(list);
          }
          const found = list.find((p) => p.slug === slug);
          if (found) {
            setRawProduct(found);
            setSelectedImage(found.imageUrl);
          }
        }
      } catch {
        // keep current
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <p>{t.common.loading}</p>
      </div>
    );
  }

  if (!rawProduct) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>{t.detail.notFoundTitle}</h2>
        <p style={{ margin: '1rem 0 2rem 0' }}>{t.detail.notFoundDesc}</p>
        <Link href="/san-pham" className="btn btn-primary">
          <ArrowLeft size={16} /> {t.detail.backToCatalog}
        </Link>
      </div>
    );
  }

  const product = localizeProduct(rawProduct, locale);
  const imageList =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  const currentPreviewImage = selectedImage || product.imageUrl;
  const currentIdx = imageList.indexOf(currentPreviewImage);

  const isDefaultContactPrice =
    !rawProduct.priceDisplay || rawProduct.priceDisplay.trim().toLowerCase() === 'liên hệ';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: {
      '@type': 'Offer',
      price: 'Liên hệ',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className={styles.pageWrapper}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container">
        {/* Breadcrumb Navigation */}
        <div className={styles.breadcrumb}>
          <Link href="/">{t.common.home}</Link>
          <span>/</span>
          <Link href="/san-pham">{t.common.products}</Link>
          <span>/</span>
          <span className={styles.activeCrumb}>{product.name}</span>
        </div>

        {/* Product Detail Main Grid */}
        <div className={styles.detailGrid}>
          {/* Left Column: Product Gallery */}
          <div className={styles.imageCol}>
            {(() => {
              const isBanner =
                currentPreviewImage.includes('banner_main') ||
                currentPreviewImage.includes('banner');
              return (
                <div className={styles.mainImgCard}>
                  {isBanner ? (
                    <ProductGalleryBanner onQuoteClick={() => openQuoteModal(rawProduct.slug)} />
                  ) : (
                    <img
                      src={currentPreviewImage}
                      alt={product.name}
                      className={styles.mainImg}
                    />
                  )}
                  {!isBanner && product.isExportStandard && (
                    <span className={styles.exportBadge}>{t.productCard.exportBadge}</span>
                  )}
                  {imageList.length > 1 && (
                    <span className={styles.imageCounterBadge}>
                      {t.detail.imgCount
                        .replace('{current}', String(currentIdx >= 0 ? currentIdx + 1 : 1))
                        .replace('{total}', String(imageList.length))}
                    </span>
                  )}
                </div>
              );
            })()}

            {/* Thumbnail Row */}
            {imageList.length > 1 && (
              <div className={styles.galleryThumbnails}>
                {imageList.map((imgUrl, idx) => {
                  const isActive = currentPreviewImage === imgUrl;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`${styles.thumbBtn} ${isActive ? styles.thumbActive : ''}`}
                      aria-label={`Photo ${idx + 1}`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.name} - ${idx + 1}`}
                        className={styles.thumbImg}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <div className={styles.qualityBanner}>
              <ShieldCheck size={24} color="var(--primary)" />
              <div>
                <strong>{t.detail.htTitle}</strong>
                <p>{t.detail.htDesc}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Meta & Actions */}
          <div className={styles.infoCol}>
            <span className="section-tag">{product.category}</span>
            <h1 className={styles.productTitle}>{product.name}</h1>

            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                  margin: '0.5rem 0 1rem 0',
                }}
              >
                {product.badges.map((b, idx) => (
                  <span
                    key={idx}
                    className={idx === 0 ? 'badge badge-export' : 'badge badge-new'}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}

            {/* Modern B2B Price & Quote Card */}
            <div className={styles.priceCard}>
              <div className={styles.priceHeader}>
                <div className={styles.priceMeta}>
                  <span className={styles.priceLabel}>{t.detail.directPriceLabel}</span>
                  <div className={styles.priceValueWrapper}>
                    <span className={styles.priceValue}>
                      {isDefaultContactPrice ? t.detail.factoryPrice : product.priceDisplay}
                    </span>
                    <span className={styles.priceBadgeNote}>{t.detail.quoteByDrawing}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openQuoteModal(rawProduct.slug)}
                  className={styles.priceCtaBtn}
                >
                  <FileText size={16} />
                  <span>{t.detail.fastQuote15m}</span>
                </button>
              </div>

              <div className={styles.pricePerks}>
                <span className={styles.pricePerkItem}>
                  <CheckCircle2 size={14} color="#15803d" />
                  {t.detail.perk1}
                </span>
                <span className={styles.pricePerkDivider}>•</span>
                <span className={styles.pricePerkItem}>
                  <CheckCircle2 size={14} color="#15803d" />
                  {t.detail.perk2}
                </span>
              </div>
            </div>

            {/* Specs Table */}
            <div className={styles.specBox}>
              <h3 className={styles.specBoxTitle}>{t.detail.specBoxTitle}</h3>
              <div className={styles.specRow}>
                <span className={styles.specName}>{t.detail.specDim}</span>
                <span className={styles.specVal}>
                  <strong>{product.dimensions}</strong>
                </span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>{t.detail.specMat}</span>
                <span className={styles.specVal}>{product.woodType}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>{t.detail.specStatic}</span>
                <span className={styles.specVal}>{product.staticLoad}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>{t.detail.specDynamic}</span>
                <span className={styles.specVal}>{product.dynamicLoad}</span>
              </div>
              <div className={`${styles.specRow} ${styles.specRowTop}`}>
                <span className={styles.specName}>{t.detail.specDetail}</span>
                <ul className={styles.specBulletList}>
                  {product.specification
                    .split(/[\u00b7\u2022\n]+/)
                    .map((item) => item.trim())
                    .filter(Boolean)
                    .map((item, idx) => (
                      <li key={idx} className={styles.specBulletItem}>
                        <span className={styles.specBulletDot} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specName}>{t.detail.specUsage}</span>
                <span className={styles.specVal}>{product.usagePurpose}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionGroup}>
              <button
                onClick={() => openQuoteModal(rawProduct.slug)}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.5rem', fontSize: '1.05rem', flex: 1 }}
              >
                <FileText size={20} />
                <span>{t.detail.btnQuoteDrawing}</span>
              </button>

              <a
                href={companyInfo.zaloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-zalo"
              >
                <MessageCircle size={20} />
                <span>{t.detail.btnZalo}</span>
              </a>

              <a href={`tel:${companyInfo.hotline}`} className="btn btn-hotline">
                <Phone size={20} />
                <span>{t.detail.btnHotline}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Technical Drawing / Blueprint Section (pass rawProduct for variant detection + localized loads) */}
        <ProductTechnicalDrawing
          product={{ ...rawProduct, staticLoad: product.staticLoad, dynamicLoad: product.dynamicLoad }}
          onRequestCustomDrawing={() => openQuoteModal(rawProduct.slug)}
        />

        {/* Workshop BOM / Size Matrix Table */}
        <WorkshopSpecsTable
          categorySlug={rawProduct.categorySlug}
          onRequestQuote={(specLabel) => openQuoteModal(specLabel)}
        />

        {/* Product Full Description & Highlights */}
        <div className={styles.descSection}>
          <h2 className={styles.sectionHeading}>{t.detail.descHeading}</h2>
          <p className={styles.descContent}>{product.description}</p>

          <h3 style={{ fontSize: '1.2rem', margin: '1.5rem 0 1rem 0', color: 'var(--secondary)' }}>
            {t.detail.highlightsHeading}
          </h3>
          <ul className={styles.highlightList}>
            {product.highlights.map((h, i) => (
              <li key={i}>
                <CheckCircle2 size={18} color="var(--primary)" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Facebook Proof of Work */}
        {product.facebookProof && (
          <div
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#1877f2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <span
                  style={{
                    background: '#1877f2',
                    color: '#fff',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                  }}
                >
                  f
                </span>
                {t.detail.fbBadge}
              </span>
              <h4 style={{ margin: '0.35rem 0', color: 'var(--secondary)' }}>
                {product.facebookProof.title}
              </h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                {product.facebookProof.description}
              </p>
            </div>
            <a
              href={product.facebookProof.fbUrl || 'https://www.facebook.com/PalletTruongAn/'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ borderColor: '#1877f2', color: '#1877f2' }}
            >
              <span>{t.detail.fbViewBtn}</span>
            </a>
          </div>
        )}

        {/* Related Products Section */}
        {(() => {
          const related = getRelatedProducts(rawProduct, allProducts, 4);
          if (related.length === 0) return null;
          return (
            <section className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <div>
                  <span className="section-tag">
                    <Layers size={14} /> {t.detail.relatedTag}
                  </span>
                  <h2 className={styles.relatedTitle}>{t.detail.relatedTitle}</h2>
                </div>
                <Link
                  href={`/san-pham?category=${rawProduct.categorySlug}`}
                  className={styles.relatedViewAll}
                >
                  <span>{t.detail.relatedViewAll}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
              <div className={styles.relatedGrid}>
                {related.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                    onOpenQuoteModal={(s) => openQuoteModal(s)}
                  />
                ))}
              </div>
            </section>
          );
        })()}
      </div>
    </div>
  );
}
