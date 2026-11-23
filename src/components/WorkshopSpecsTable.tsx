'use client';

import React, { useState } from 'react';
import { Table2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import {
  PALLET_TRAM_SPECS,
  PALLET_PLYWOOD_SPECS,
  THUNG_GO_SPECS,
  WorkshopSpecRow,
} from '@/data/workshopSpecs';

interface WorkshopSpecsTableProps {
  categorySlug: string;
  onRequestQuote: (specLabel: string) => void;
}

export const WorkshopSpecsTable: React.FC<WorkshopSpecsTableProps> = ({
  categorySlug,
  onRequestQuote,
}) => {
  const [expanded, setExpanded] = useState(false);

  let title = '';
  let subtitle = '';
  let rows: WorkshopSpecRow[] = [];

  if (categorySlug === 'pallet-go-tram') {
    title = 'Bảng Quy Cách 20 Mẫu Pallet Gỗ Tràm Chuẩn Xưởng Trường An';
    subtitle = 'Gồm 10 mẫu 3 gánh nâng 2 hướng (PTA-T01 → PTA-T10) và 10 mẫu 9 gù nâng 4 hướng (PTA-G01 → PTA-G10).';
    rows = PALLET_TRAM_SPECS;
  } else if (categorySlug === 'pallet-van-ep') {
    title = 'Bảng 34 Kích Thước Pallet Ván Ép (Plywood) Có Sẵn Bản Vẽ Tại Xưởng';
    subtitle = 'Ván mặt dày 10mm – 15mm, 9 cục gù nâng 4 hướng, miễn thủ tục hun trùng ISPM 15.';
    rows = PALLET_PLYWOOD_SPECS;
  } else if (categorySlug === 'thung-go-dong-hang') {
    title = 'Bảng Bóc Tách 7 Quy Cách Thùng Gỗ Nan Thưa Có Nắp Chuẩn Xưởng';
    subtitle = 'Đế pallet 9 gù 90×90×90 mm, vách giằng chéo chịu lực 4 phía, có nắp đóng kín.';
    rows = THUNG_GO_SPECS;
  } else {
    return null;
  }

  const visibleRows = expanded ? rows : rows.slice(0, 6);

  return (
    <section
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        background: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div style={{ marginBottom: '1.15rem' }}>
        <span className="section-tag">
          <Table2 size={14} /> QUY CÁCH BÓC TÁCH THỰC TẾ TẠI XƯỞNG
        </span>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--secondary)', margin: '0.25rem 0 0.3rem' }}>
          {title}
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: '680px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>Mã</th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>Kích Thước (D×R×C)</th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>Kết Cấu</th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>Mặt Trên / Nắp</th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>Gánh / Gù / Vách</th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)', textAlign: 'right' }}>Báo Giá</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, idx) => (
              <tr
                key={row.code}
                style={{
                  borderBottom: idx === visibleRows.length - 1 ? 'none' : '1px solid #f1f5f9',
                  background: idx % 2 === 1 ? '#fcfcfd' : '#ffffff',
                }}
              >
                <td style={{ padding: '0.65rem 0.75rem', fontWeight: 800, color: 'var(--primary-dark)', whiteSpace: 'nowrap' }}>
                  {row.code}
                </td>
                <td style={{ padding: '0.65rem 0.75rem', fontWeight: 700, color: 'var(--secondary)', whiteSpace: 'nowrap' }}>
                  {row.dimensions}
                </td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#475569' }}>{row.structure}</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#334155' }}>{row.topDeck}</td>
                <td style={{ padding: '0.65rem 0.75rem', color: '#334155' }}>{row.support}</td>
                <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <button
                    type="button"
                    onClick={() => onRequestQuote(`${row.code} (${row.dimensions})`)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      padding: '0.35rem 0.7rem',
                      borderRadius: '6px',
                      background: '#fef3c7',
                      color: '#92400e',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      border: '1px solid rgba(217, 119, 6, 0.3)',
                    }}
                  >
                    <FileText size={12} /> Báo giá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > 6 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1.2rem', fontSize: '0.86rem' }}
          >
            {expanded ? (
              <>
                <ChevronUp size={16} /> Thu gọn bảng quy cách
              </>
            ) : (
              <>
                <ChevronDown size={16} /> Xem đầy đủ toàn bộ {rows.length} quy cách chuẩn xưởng
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};
