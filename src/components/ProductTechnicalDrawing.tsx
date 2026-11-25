'use client';

import React, { useState } from 'react';
import { Ruler, Maximize2, X, FileText, ShieldCheck } from 'lucide-react';
import type { Product } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';
import type { Locale } from '@/i18n/translations';
import styles from './ProductTechnicalDrawing.module.css';

interface ProductTechnicalDrawingProps {
  product: Product & { drawingUrl?: string };
  onRequestCustomDrawing: () => void;
}

type DrawingVariant =
  | 'pallet-block'
  | 'pallet-stringer'
  | 'pallet-plywood'
  | 'pallet-plastic-mesh'
  | 'pallet-plastic-nestable'
  | 'crate-closed'
  | 'crate-open'
  | 'plastic-solid'
  | 'plastic-vented';

function parseDimensions(dimStr?: string, locale: Locale = 'vi'): { L: string; W: string; H: string } {
  const customTxt =
    locale === 'en'
      ? { L: 'L (Custom)', W: 'W (Custom)', H: 'H (mm)' }
      : locale === 'zh'
        ? { L: '长 (按图定制)', W: '宽 (按图定制)', H: '高 (mm)' }
        : { L: 'L (Theo bản vẽ)', W: 'W (Theo bản vẽ)', H: 'H (mm)' };

  if (!dimStr) return customTxt;
  const match = dimStr.match(/(\d{3,4})\s*[x×]\s*(\d{3,4})\s*[x×]\s*(\d{2,4})/i);
  if (match) {
    return {
      L: `${match[1]} mm`,
      W: `${match[2]} mm`,
      H: `${match[3]} mm`,
    };
  }
  return customTxt;
}

function resolveVariant(product: Product): DrawingVariant {
  const name = product.name.toLowerCase();
  const slug = product.slug.toLowerCase();
  const spec = (product.specification || '').toLowerCase();
  const cat = product.categorySlug;

  if (cat === 'pallet-nhua-moi' || cat === 'pallet-nhua-cu') {
    if (name.includes('chân cốc') || slug.includes('chan-coc')) return 'pallet-plastic-nestable';
    return 'pallet-plastic-mesh';
  }
  if (cat === 'thung-nhua') {
    if (name.includes('hở') || slug.includes('ho')) return 'plastic-vented';
    return 'plastic-solid';
  }
  if (cat === 'thung-go-dong-hang') {
    if (name.includes('kín') || slug.includes('kin')) return 'crate-closed';
    return 'crate-open';
  }
  if (cat === 'pallet-van-ep' || product.materialGroup === 'van-ep') {
    return 'pallet-plywood';
  }
  if (
    name.includes('gù') ||
    spec.includes('cục gù') ||
    spec.includes('9 gù') ||
    name.includes('epal') ||
    slug.includes('pta-g') ||
    slug.includes('chan-gu') ||
    slug.includes('cuc-gu')
  ) {
    return 'pallet-block';
  }
  return 'pallet-stringer';
}

const SVG_INLINE_LABELS: Record<
  Locale,
  {
    enclosedLid: string;
    virginHdpe: string;
    plywoodDeck: string;
    forkEntry: string;
    nestCup: string;
    fourWay: string;
    notch: string;
    codeLabel: string;
    stdExport: string;
    stdWarehouse: string;
  }
> = {
  vi: {
    enclosedLid: 'NẮP VÁN ÉP KÍN',
    virginHdpe: 'HDPE NGUYÊN SINH',
    plywoodDeck: 'MẶT VÁN ÉP PLYWOOD PHẲNG KÍN',
    forkEntry: 'Lối xe nâng',
    nestCup: 'Chân cốc xếp lồng',
    fourWay: '4 hướng nâng',
    notch: 'Khoét đố',
    codeLabel: 'Mã bản vẽ',
    stdExport: 'Đạt chuẩn ISPM 15 / Xuất khẩu',
    stdWarehouse: 'Chuẩn lưu kho công nghiệp',
  },
  en: {
    enclosedLid: 'ENCLOSED PLYWOOD LID',
    virginHdpe: '100% VIRGIN HDPE',
    plywoodDeck: 'SMOOTH CONTINUOUS PLYWOOD DECK',
    forkEntry: 'Fork Entry',
    nestCup: 'Nestable Cups',
    fourWay: '4-Way Entry',
    notch: 'Fork Notch',
    codeLabel: 'Drawing Code',
    stdExport: 'ISPM 15 / Export Certified',
    stdWarehouse: 'Industrial Warehouse Grade',
  },
  zh: {
    enclosedLid: '全封闭胶合板顶盖',
    virginHdpe: '100% 全新 HDPE',
    plywoodDeck: '整张平滑免熏蒸胶合板面板',
    forkEntry: '叉车进叉口',
    nestCup: '可套叠脚杯',
    fourWay: '四向进叉',
    notch: '进叉缺口',
    codeLabel: '图纸编号',
    stdExport: '符合 ISPM 15 出口检疫标准',
    stdWarehouse: '工业重型仓储标准',
  },
};

const BlueprintSVG: React.FC<{
  variant: DrawingVariant;
  dims: { L: string; W: string; H: string };
  locale: Locale;
}> = ({ variant, dims, locale }) => {
  const { t } = useLanguage();
  const lbl = SVG_INLINE_LABELS[locale];
  const isCrate = variant === 'crate-closed' || variant === 'crate-open';
  const isPlasticCrate = variant === 'plastic-solid' || variant === 'plastic-vented';
  const isPlasticPallet = variant === 'pallet-plastic-mesh' || variant === 'pallet-plastic-nestable';

  return (
    <svg
      viewBox="0 0 820 340"
      className={styles.blueprintSvg}
      role="img"
      aria-label={`${dims.L} x ${dims.W} x ${dims.H}`}
    >
      <defs>
        <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.6" />
        </pattern>
        <marker id="arrowStart" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 10 1 L 0 5 L 10 9 z" fill="#b45309" />
        </marker>
        <marker id="arrowEnd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#b45309" />
        </marker>
      </defs>

      <rect x="0" y="0" width="820" height="340" fill="#f8fafc" />
      <rect x="0" y="0" width="820" height="340" fill="url(#cadGrid)" />
      <rect x="8" y="8" width="804" height="324" fill="none" stroke="#94a3b8" strokeWidth="1.2" />

      {/* LEFT VIEW: TOP VIEW */}
      <text x="200" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" letterSpacing="0.8">
        {t.drawing.topView}
      </text>

      {isCrate ? (
        <g>
          <rect x="95" y="75" width="210" height="165" fill="#fef3c7" stroke="#1e293b" strokeWidth="2" />
          <rect x="95" y="75" width="210" height="16" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="95" y="224" width="210" height="16" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="95" y="91" width="16" height="133" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="289" y="91" width="16" height="133" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          {variant === 'crate-open' ? (
            <>
              <rect x="111" y="114" width="178" height="22" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
              <rect x="111" y="148" width="178" height="22" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
              <rect x="111" y="182" width="178" height="22" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
            </>
          ) : (
            <>
              <line x1="111" y1="91" x2="289" y2="224" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="289" y1="91" x2="111" y2="224" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
              <text x="200" y="162" textAnchor="middle" fontSize="11" fontWeight="600" fill="#78350f">
                {lbl.enclosedLid}
              </text>
            </>
          )}
        </g>
      ) : isPlasticPallet ? (
        <g>
          <rect x="95" y="75" width="210" height="165" rx="6" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.2" />
          {[95, 115, 135, 155, 175, 195, 215].map((y) => (
            <line key={`pm-h-${y}`} x1="100" y1={y} x2="300" y2={y} stroke="#60a5fa" strokeWidth="1" />
          ))}
          {[120, 145, 170, 195, 220, 245, 270, 290].map((x) => (
            <line key={`pm-v-${x}`} x1={x} y1="80" x2={x} y2="235" stroke="#60a5fa" strokeWidth="1" />
          ))}
          {[104, 188, 272].map((bx) =>
            [84, 146, 208].map((by) => (
              <rect
                key={`pm-b-${bx}-${by}`}
                x={bx}
                y={by}
                width="24"
                height="24"
                rx={variant === 'pallet-plastic-nestable' ? 6 : 2}
                fill="#93c5fd"
                fillOpacity="0.65"
                stroke="#1e40af"
                strokeWidth="1.2"
              />
            ))
          )}
        </g>
      ) : isPlasticCrate ? (
        <g>
          <rect x="95" y="78" width="210" height="160" rx="10" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.2" />
          <rect x="108" y="91" width="184" height="134" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          {variant === 'plastic-vented' ? (
            <>
              {[106, 128, 150, 172, 194].map((y) => (
                <line key={`h-${y}`} x1="116" y1={y} x2="284" y2={y} stroke="#60a5fa" strokeWidth="1" strokeDasharray="8 4" />
              ))}
              {[136, 168, 200, 232, 264].map((x) => (
                <line key={`v-${x}`} x1={x} y1="98" x2={x} y2="218" stroke="#60a5fa" strokeWidth="1" strokeDasharray="8 4" />
              ))}
            </>
          ) : (
            <>
              <rect x="122" y="105" width="156" height="106" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
              <line x1="122" y1="158" x2="278" y2="158" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 3" />
              <text x="200" y="153" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">
                {lbl.virginHdpe}
              </text>
            </>
          )}
        </g>
      ) : variant === 'pallet-plywood' ? (
        <g>
          <rect x="95" y="75" width="210" height="165" fill="#fef3c7" stroke="#1e293b" strokeWidth="2" />
          {[103, 188, 273].map((bx) =>
            [83, 146, 209].map((by) => (
              <rect
                key={`${bx}-${by}`}
                x={bx}
                y={by}
                width="24"
                height="24"
                fill="none"
                stroke="#92400e"
                strokeWidth="1.2"
                strokeDasharray="3 2"
              />
            ))
          )}
          <text x="200" y="162" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#78350f">
            {lbl.plywoodDeck}
          </text>
        </g>
      ) : (
        <g>
          <rect x="95" y="75" width="210" height="165" fill="#fffbeb" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
          {variant === 'pallet-block' ? (
            [100, 187, 274].map((bx) =>
              [80, 145, 210].map((by) => (
                <rect
                  key={`${bx}-${by}`}
                  x={bx}
                  y={by}
                  width="26"
                  height="25"
                  fill="#fde68a"
                  stroke="#92400e"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
              ))
            )
          ) : (
            [102, 193, 284].map((sx) => (
              <rect
                key={sx}
                x={sx}
                y="75"
                width="14"
                height="165"
                fill="#fde68a"
                stroke="#92400e"
                strokeWidth="1"
                strokeDasharray="3 2"
              />
            ))
          )}
          {[75, 100, 125, 150, 175, 200, 224].map((y) => (
            <rect
              key={y}
              x="95"
              y={y}
              width="210"
              height="16"
              fill="#fef3c7"
              fillOpacity="0.92"
              stroke="#1e293b"
              strokeWidth="1.5"
            />
          ))}
        </g>
      )}

      {/* Dimension Line: Length (L) on Top View */}
      <line x1="95" y1="56" x2="95" y2="71" stroke="#b45309" strokeWidth="1" />
      <line x1="305" y1="56" x2="305" y2="71" stroke="#b45309" strokeWidth="1" />
      <line x1="98" y1="62" x2="302" y2="62" stroke="#b45309" strokeWidth="1.4" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
      <rect x="155" y="51" width="90" height="20" rx="3" fill="#f8fafc" />
      <text x="200" y="65" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#b45309">
        {dims.L}
      </text>

      {/* Dimension Line: Width (W) on Left of Top View */}
      <line x1="65" y1="75" x2="90" y2="75" stroke="#b45309" strokeWidth="1" />
      <line x1="65" y1="240" x2="90" y2="240" stroke="#b45309" strokeWidth="1" />
      <line x1="72" y1="78" x2="72" y2="237" stroke="#b45309" strokeWidth="1.4" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
      <text
        x="54"
        y="158"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="800"
        fill="#b45309"
        transform="rotate(-90 54 158)"
      >
        {dims.W}
      </text>

      <line x1="400" y1="26" x2="400" y2="314" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6 4" />

      {/* RIGHT VIEW: FRONT ELEVATION */}
      <text x="605" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" letterSpacing="0.8">
        {t.drawing.frontView}
      </text>

      {isCrate ? (
        <g>
          <rect x="470" y="88" width="250" height="128" fill="#fef3c7" stroke="#1e293b" strokeWidth="2" />
          <rect x="470" y="88" width="250" height="14" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="470" y="202" width="250" height="14" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="470" y="102" width="16" height="100" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="704" y="102" width="16" height="100" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="587" y="102" width="16" height="100" fill="#fde68a" stroke="#1e293b" strokeWidth="1.2" />
          {variant === 'crate-open' && (
            <>
              <rect x="486" y="122" width="101" height="16" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
              <rect x="486" y="160" width="101" height="16" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
              <rect x="603" y="122" width="101" height="16" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
              <rect x="603" y="160" width="101" height="16" fill="#fffbeb" stroke="#475569" strokeWidth="1" />
            </>
          )}
          <rect x="470" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="579" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="688" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <text x="541" y="232" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">{lbl.forkEntry}</text>
          <text x="650" y="232" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">{lbl.forkEntry}</text>
        </g>
      ) : isPlasticPallet ? (
        <g>
          <rect x="460" y="160" width="270" height="18" rx="3" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
          {variant === 'pallet-plastic-nestable' ? (
            <>
              <polygon points="468,178 510,178 502,240 476,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <polygon points="574,178 616,178 608,240 582,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <polygon points="680,178 722,178 714,240 688,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <text x="542" y="212" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">{lbl.nestCup}</text>
              <text x="648" y="212" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">{lbl.fourWay}</text>
            </>
          ) : (
            <>
              <rect x="464" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="575" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="686" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="460" y="226" width="270" height="14" rx="2" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
              <text x="539" y="205" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">{lbl.forkEntry}</text>
              <text x="650" y="205" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">{lbl.forkEntry}</text>
            </>
          )}
        </g>
      ) : isPlasticCrate ? (
        <g>
          {variant === 'plastic-solid' && (
            <rect x="466" y="114" width="258" height="12" rx="3" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5" />
          )}
          <rect x="470" y="126" width="250" height="114" rx="5" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.2" />
          <rect x="470" y="126" width="250" height="14" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.2" />
          <rect x="565" y="148" width="60" height="16" rx="8" fill="#ffffff" stroke="#1d4ed8" strokeWidth="1.4" />
          {variant === 'plastic-vented' ? (
            [486, 514, 542, 628, 656, 684].map((x) => (
              <rect key={x} x={x} y="152" width="18" height="72" rx="3" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.1" />
            ))
          ) : (
            [505, 545, 645, 685].map((x) => (
              <line key={x} x1={x} y1="142" x2={x} y2="238" stroke="#60a5fa" strokeWidth="2" />
            ))
          )}
        </g>
      ) : (
        <g>
          <rect x="460" y="160" width="270" height="14" fill="#fef3c7" stroke="#1e293b" strokeWidth="1.8" />
          {variant === 'pallet-stringer' ? (
            <>
              <path
                d="M 460 174 L 730 174 L 730 226 L 690 226 L 680 198 L 615 198 L 605 226 L 585 226 L 575 198 L 510 198 L 500 226 L 460 226 Z"
                fill="#fde68a"
                stroke="#1e293b"
                strokeWidth="1.8"
              />
              <text x="542" y="218" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{lbl.notch}</text>
              <text x="648" y="218" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{lbl.notch}</text>
            </>
          ) : (
            <>
              <rect x="460" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <rect x="574" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <rect x="688" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <text x="538" y="204" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{lbl.forkEntry}</text>
              <text x="652" y="204" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">{lbl.forkEntry}</text>
            </>
          )}
          <rect x="460" y="226" width="270" height="14" fill="#fef3c7" stroke="#1e293b" strokeWidth="1.8" />
        </g>
      )}

      {/* Height (H) */}
      <line x1="736" y1={isCrate ? 88 : isPlasticCrate ? 120 : 160} x2="762" y2={isCrate ? 88 : isPlasticCrate ? 120 : 160} stroke="#b45309" strokeWidth="1" />
      <line x1="736" y1="240" x2="762" y2="240" stroke="#b45309" strokeWidth="1" />
      <line
        x1="752"
        y1={isCrate ? 91 : isPlasticCrate ? 123 : 163}
        x2="752"
        y2="237"
        stroke="#b45309"
        strokeWidth="1.4"
        markerStart="url(#arrowStart)"
        markerEnd="url(#arrowEnd)"
      />
      <text x="782" y={isCrate ? 168 : isPlasticCrate ? 184 : 204} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#b45309">
        {dims.H}
      </text>

      {/* Length (L) under Front Elevation */}
      <line x1="460" y1="246" x2="460" y2="266" stroke="#b45309" strokeWidth="1" />
      <line x1="730" y1="246" x2="730" y2="266" stroke="#b45309" strokeWidth="1" />
      <line x1="463" y1="258" x2="727" y2="258" stroke="#b45309" strokeWidth="1.4" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
      <rect x="550" y="248" width="90" height="20" rx="3" fill="#f8fafc" />
      <text x="595" y="262" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#b45309">
        {dims.L}
      </text>

      {/* Bottom Scale Notes */}
      <text x="200" y="302" textAnchor="middle" fontSize="10.5" fill="#64748b">
        {t.drawing.toleranceNote}
      </text>
      <text x="605" y="302" textAnchor="middle" fontSize="10.5" fill="#64748b">
        {t.drawing.customNote}
      </text>
    </svg>
  );
};

export const ProductTechnicalDrawing: React.FC<ProductTechnicalDrawingProps> = ({
  product,
  onRequestCustomDrawing,
}) => {
  const { locale, t } = useLanguage();
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const dims = parseDimensions(product.dimensions, locale);
  const variant = resolveVariant(product);
  const drawingTitle = t.drawing.titles[variant];
  const drawingCode = `TA-${product.id.toUpperCase()}`;
  const lbl = SVG_INLINE_LABELS[locale];

  return (
    <section className={styles.drawingSection}>
      <div className={styles.drawingHeader}>
        <div>
          <span className="section-tag">
            <Ruler size={14} /> {t.drawing.badge}
          </span>
          <h2 className={styles.drawingHeading}>{drawingTitle}</h2>
        </div>

        <div className={styles.drawingActions}>
          <button type="button" onClick={() => setIsZoomOpen(true)} className={styles.zoomBtn}>
            <Maximize2 size={15} />
            <span>{t.drawing.zoomBtn}</span>
          </button>
          <button
            type="button"
            onClick={onRequestCustomDrawing}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
          >
            <FileText size={15} />
            <span>{t.drawing.customCadBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Blueprint Canvas */}
      <div
        className={styles.canvasCard}
        onClick={() => setIsZoomOpen(true)}
        title={t.drawing.zoomBtn}
      >
        {product.drawingUrl ? (
          <img
            src={product.drawingUrl}
            alt={drawingTitle}
            className={styles.uploadedDrawingImg}
          />
        ) : (
          <BlueprintSVG variant={variant} dims={dims} locale={locale} />
        )}
      </div>

      {/* CAD Title Block */}
      <div className={styles.titleBlock}>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>{lbl.codeLabel}</span>
          <strong className={styles.tbValue}>{drawingCode}</strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>{t.drawing.metaDim}</span>
          <strong className={styles.tbValue}>{product.dimensions}</strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>{t.drawing.metaLoad}</span>
          <strong className={styles.tbValue}>
            {product.staticLoad} / {product.dynamicLoad}
          </strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>{t.drawing.metaUnit}</span>
          <strong
            className={styles.tbValue}
            style={{ color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <ShieldCheck size={14} />
            {product.isExportStandard ? lbl.stdExport : lbl.stdWarehouse}
          </strong>
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="modal-overlay" onClick={() => setIsZoomOpen(false)}>
          <div className={styles.zoomModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.zoomModalHeader}>
              <div>
                <strong>{drawingTitle}</strong>
                <span className={styles.zoomMeta}>
                  {drawingCode} · {product.dimensions}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className={styles.zoomCloseBtn}
                aria-label={t.common.close}
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.zoomModalBody}>
              {product.drawingUrl ? (
                <img
                  src={product.drawingUrl}
                  alt={drawingTitle}
                  className={styles.uploadedDrawingImg}
                />
              ) : (
                <BlueprintSVG variant={variant} dims={dims} locale={locale} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
