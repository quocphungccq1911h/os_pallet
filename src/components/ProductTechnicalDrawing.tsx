'use client';

import React, { useState } from 'react';
import { Ruler, Maximize2, X, FileText, ShieldCheck } from 'lucide-react';
import type { Product } from '@/data/products';
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

function parseDimensions(dimStr?: string): { L: string; W: string; H: string } {
  if (!dimStr) return { L: 'L (Theo yêu cầu)', W: 'W (Theo yêu cầu)', H: 'H (mm)' };
  const match = dimStr.match(/(\d{3,4})\s*[x×]\s*(\d{3,4})\s*[x×]\s*(\d{2,4})/i);
  if (match) {
    return {
      L: `${match[1]} mm`,
      W: `${match[2]} mm`,
      H: `${match[3]} mm`,
    };
  }
  return { L: 'L (Theo bản vẽ)', W: 'W (Theo bản vẽ)', H: 'H (Tùy chọn)' };
}

function resolveVariant(product: Product): DrawingVariant {
  const name = product.name.toLowerCase();
  const slug = product.slug.toLowerCase();
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
    if (name.includes('thưa') || slug.includes('thua')) return 'crate-open';
    return 'crate-closed';
  }
  if (cat === 'pallet-van-ep' || product.materialGroup === 'van-ep') {
    return 'pallet-plywood';
  }
  if (
    name.includes('chân gù') ||
    name.includes('epal') ||
    name.includes('nhật') ||
    slug.includes('chan-gu') ||
    slug.includes('epal')
  ) {
    return 'pallet-block';
  }
  return 'pallet-stringer';
}

function getVariantTitle(variant: DrawingVariant): string {
  switch (variant) {
    case 'pallet-block':
      return 'Bản vẽ kỹ thuật Pallet Gỗ 9 Chân Gù (4 hướng nâng)';
    case 'pallet-stringer':
      return 'Bản vẽ kỹ thuật Pallet Gỗ Đố Khuyết / Stringer';
    case 'pallet-plywood':
      return 'Bản vẽ kỹ thuật Pallet Ván Ép Mặt Phẳng (Plywood)';
    case 'pallet-plastic-mesh':
      return 'Bản vẽ kỹ thuật Pallet Nhựa Mặt Lưới HDPE (4 hướng nâng)';
    case 'pallet-plastic-nestable':
      return 'Bản vẽ kỹ thuật Pallet Nhựa 9 Chân Cốc Xếp Lồng Xuất Khẩu';
    case 'crate-closed':
      return 'Bản vẽ kỹ thuật Thùng Gỗ Kín Gia Cố Khung Đế Pallet';
    case 'crate-open':
      return 'Bản vẽ kỹ thuật Kiện Gỗ Nan Thưa Xuất Khẩu';
    case 'plastic-solid':
      return 'Bản vẽ kỹ thuật Thùng Nhựa Đặc Công Nghiệp';
    case 'plastic-vented':
      return 'Bản vẽ kỹ thuật Sóng Nhựa Hở Công Nghiệp';
  }
}

const BlueprintSVG: React.FC<{
  variant: DrawingVariant;
  dims: { L: string; W: string; H: string };
}> = ({ variant, dims }) => {
  const isCrate = variant === 'crate-closed' || variant === 'crate-open';
  const isPlasticCrate = variant === 'plastic-solid' || variant === 'plastic-vented';
  const isPlasticPallet = variant === 'pallet-plastic-mesh' || variant === 'pallet-plastic-nestable';
  const isPlastic = isPlasticCrate || isPlasticPallet;

  return (
    <svg
      viewBox="0 0 820 340"
      className={styles.blueprintSvg}
      role="img"
      aria-label={`Bản vẽ kỹ thuật kích thước ${dims.L} x ${dims.W} x ${dims.H}`}
    >
      <defs>
        {/* Subtle CAD engineering grid */}
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

      {/* Background CAD Sheet */}
      <rect x="0" y="0" width="820" height="340" fill="#f8fafc" />
      <rect x="0" y="0" width="820" height="340" fill="url(#cadGrid)" />
      <rect x="8" y="8" width="804" height="324" fill="none" stroke="#94a3b8" strokeWidth="1.2" />

      {/* ================= LEFT VIEW: TOP VIEW (MẶT BẰNG) ================= */}
      <text x="200" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" letterSpacing="0.8">
        HÌNH CHIẾU BẰNG (TOP VIEW)
      </text>

      {isCrate ? (
        <g>
          {/* Crate Top View */}
          <rect x="95" y="75" width="210" height="165" fill="#fef3c7" stroke="#1e293b" strokeWidth="2" />
          {/* Outer frame battens */}
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
                NẮP VÁN ÉP KÍN
              </text>
            </>
          )}
        </g>
      ) : isPlasticPallet ? (
        <g>
          {/* Plastic Pallet Top View (HDPE Mesh Grid + 9 molded legs) */}
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
          {/* Plastic Crate Top View */}
          <rect x="95" y="78" width="210" height="160" rx="10" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.2" />
          <rect x="108" y="91" width="184" height="134" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
          {variant === 'plastic-vented' ? (
            <>
              {/* Perforated mesh grid */}
              {[106, 128, 150, 172, 194].map((y) => (
                <line key={`h-${y}`} x1="116" y1={y} x2="284" y2={y} stroke="#60a5fa" strokeWidth="1" strokeDasharray="8 4" />
              ))}
              {[136, 168, 200, 232, 264].map((x) => (
                <line key={`v-${x}`} x1={x} y1="98" x2={x} y2="218" stroke="#60a5fa" strokeWidth="1" strokeDasharray="8 4" />
              ))}
            </>
          ) : (
            <>
              {/* Solid reinforced lid ribs */}
              <rect x="122" y="105" width="156" height="106" rx="4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
              <line x1="122" y1="158" x2="278" y2="158" stroke="#3b82f6" strokeWidth="1" strokeDasharray="5 3" />
              <text x="200" y="153" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1e40af">
                HDPE NGUYÊN SINH
              </text>
            </>
          )}
        </g>
      ) : variant === 'pallet-plywood' ? (
        <g>
          {/* Plywood Pallet Top View (solid top sheet + dashed blocks underneath) */}
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
          <text x="200" y="162" textAnchor="middle" fontSize="11" fontWeight="700" fill="#78350f">
            MẶT VÁN ÉP PLYWOOD PHẲNG KÍN
          </text>
        </g>
      ) : (
        <g>
          {/* Wooden Pallet Top View (7 top deckboards + dashed blocks or stringers) */}
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
          {/* 7 Top Deckboards */}
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
      <rect x="160" y="51" width="80" height="20" rx="3" fill="#f8fafc" />
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

      {/* Divider between Left & Right Views */}
      <line x1="400" y1="26" x2="400" y2="314" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6 4" />

      {/* ================= RIGHT VIEW: FRONT ELEVATION (MẶT ĐỨNG) ================= */}
      <text x="605" y="32" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0f172a" letterSpacing="0.8">
        HÌNH CHIẾU ĐỨNG (FRONT ELEVATION)
      </text>

      {isCrate ? (
        <g>
          {/* Crate Front Elevation */}
          <rect x="470" y="88" width="250" height="128" fill="#fef3c7" stroke="#1e293b" strokeWidth="2" />
          {/* Frame battens */}
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
          {/* Pallet Base underneath crate */}
          <rect x="470" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="579" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <rect x="688" y="216" width="32" height="24" fill="#f59e0b" fillOpacity="0.45" stroke="#1e293b" strokeWidth="1.5" />
          <text x="541" y="232" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">Lối xe nâng</text>
          <text x="650" y="232" textAnchor="middle" fontSize="9.5" fill="#475569" fontWeight="600">Lối xe nâng</text>
        </g>
      ) : isPlasticPallet ? (
        <g>
          {/* Plastic Pallet Front Elevation */}
          <rect x="460" y="160" width="270" height="18" rx="3" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
          {variant === 'pallet-plastic-nestable' ? (
            <>
              <polygon points="468,178 510,178 502,240 476,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <polygon points="574,178 616,178 608,240 582,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <polygon points="680,178 722,178 714,240 688,240" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <text x="542" y="212" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Chân cốc xếp lồng</text>
              <text x="648" y="212" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">4 hướng nâng</text>
            </>
          ) : (
            <>
              <rect x="464" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="575" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="686" y="178" width="40" height="48" rx="2" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
              <rect x="460" y="226" width="270" height="14" rx="2" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
              <text x="539" y="205" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Lối xe nâng</text>
              <text x="650" y="205" textAnchor="middle" fontSize="9.5" fill="#1e40af" fontWeight="600">Lối xe nâng</text>
            </>
          )}
        </g>
      ) : isPlasticCrate ? (
        <g>
          {/* Plastic Crate Front Elevation */}
          {variant === 'plastic-solid' && (
            <rect x="466" y="114" width="258" height="12" rx="3" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5" />
          )}
          <rect x="470" y="126" width="250" height="114" rx="5" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2.2" />
          {/* Top rim & side handle */}
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
          {/* Pallet Front Elevation (Top deck + Blocks / Notched Stringer + Bottom deck) */}
          <rect x="460" y="160" width="270" height="14" fill="#fef3c7" stroke="#1e293b" strokeWidth="1.8" />
          {variant === 'pallet-stringer' ? (
            <>
              {/* Notched Stringer Profile */}
              <path
                d="M 460 174 L 730 174 L 730 226 L 690 226 L 680 198 L 615 198 L 605 226 L 585 226 L 575 198 L 510 198 L 500 226 L 460 226 Z"
                fill="#fde68a"
                stroke="#1e293b"
                strokeWidth="1.8"
              />
              <text x="542" y="218" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Khoét đố</text>
              <text x="648" y="218" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Khoét đố</text>
            </>
          ) : (
            <>
              {/* 3 Blocks visible in Front Elevation */}
              <rect x="460" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <rect x="574" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <rect x="688" y="174" width="42" height="52" fill="#fde68a" stroke="#1e293b" strokeWidth="1.8" />
              <text x="538" y="204" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Lối xe nâng</text>
              <text x="652" y="204" textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">Lối xe nâng</text>
            </>
          )}
          {/* Bottom Deckboard */}
          <rect x="460" y="226" width="270" height="14" fill="#fef3c7" stroke="#1e293b" strokeWidth="1.8" />
        </g>
      )}

      {/* Dimension Line: Height (H) on Right of Elevation */}
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

      {/* Dimension Line: Length (L) under Front Elevation */}
      <line x1="460" y1="246" x2="460" y2="266" stroke="#b45309" strokeWidth="1" />
      <line x1="730" y1="246" x2="730" y2="266" stroke="#b45309" strokeWidth="1" />
      <line x1="463" y1="258" x2="727" y2="258" stroke="#b45309" strokeWidth="1.4" markerStart="url(#arrowStart)" markerEnd="url(#arrowEnd)" />
      <rect x="555" y="248" width="80" height="20" rx="3" fill="#f8fafc" />
      <text x="595" y="262" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#b45309">
        {dims.L}
      </text>

      {/* Bottom Engineering Scale Note */}
      <text x="200" y="302" textAnchor="middle" fontSize="10.5" fill="#64748b">
        Đơn vị: milimet (mm) · Dung sai gia công tiêu chuẩn ±2mm ~ ±5mm
      </text>
      <text x="605" y="302" textAnchor="middle" fontSize="10.5" fill="#64748b">
        Hỗ trợ điều chỉnh bản vẽ CAD theo kích thước & tải trọng riêng
      </text>
    </svg>
  );
};

export const ProductTechnicalDrawing: React.FC<ProductTechnicalDrawingProps> = ({
  product,
  onRequestCustomDrawing,
}) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const dims = parseDimensions(product.dimensions);
  const variant = resolveVariant(product);
  const drawingTitle = getVariantTitle(variant);
  const drawingCode = `TA-${product.id.toUpperCase()}`;

  return (
    <section className={styles.drawingSection}>
      <div className={styles.drawingHeader}>
        <div>
          <span className="section-tag">
            <Ruler size={14} /> BẢN VẼ KỸ THUẬT SẢN PHẨM
          </span>
          <h2 className={styles.drawingHeading}>{drawingTitle}</h2>
        </div>

        <div className={styles.drawingActions}>
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className={styles.zoomBtn}
          >
            <Maximize2 size={15} />
            <span>Phóng to bản vẽ</span>
          </button>
          <button
            type="button"
            onClick={onRequestCustomDrawing}
            className="btn btn-primary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
          >
            <FileText size={15} />
            <span>Yêu cầu sửa bản vẽ / File CAD</span>
          </button>
        </div>
      </div>

      {/* Main Blueprint Canvas */}
      <div className={styles.canvasCard} onClick={() => setIsZoomOpen(true)} title="Bấm để phóng to bản vẽ">
        {product.drawingUrl ? (
          <img
            src={product.drawingUrl}
            alt={`Bản vẽ kỹ thuật ${product.name}`}
            className={styles.uploadedDrawingImg}
          />
        ) : (
          <BlueprintSVG variant={variant} dims={dims} />
        )}
      </div>

      {/* CAD Title Block (Khung tên kỹ thuật chuẩn B2B) */}
      <div className={styles.titleBlock}>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>Mã bản vẽ</span>
          <strong className={styles.tbValue}>{drawingCode}</strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>Kích thước (D × R × C)</span>
          <strong className={styles.tbValue}>{product.dimensions}</strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>Tải tĩnh / Tải động</span>
          <strong className={styles.tbValue}>
            {product.staticLoad} / {product.dynamicLoad}
          </strong>
        </div>
        <div className={styles.tbCell}>
          <span className={styles.tbLabel}>Tiêu chuẩn xưởng</span>
          <strong className={styles.tbValue} style={{ color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} />
            {product.isExportStandard ? 'Đạt chuẩn ISPM 15 / Xuất khẩu' : 'Chuẩn lưu kho công nghiệp'}
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
                aria-label="Đóng bản vẽ phóng to"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.zoomModalBody}>
              {product.drawingUrl ? (
                <img
                  src={product.drawingUrl}
                  alt={`Bản vẽ kỹ thuật ${product.name}`}
                  className={styles.uploadedDrawingImg}
                />
              ) : (
                <BlueprintSVG variant={variant} dims={dims} />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
