'use client';

import React, { useState } from 'react';
import { Table2, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import {
  PALLET_TRAM_SPECS,
  PALLET_PLYWOOD_SPECS,
  THUNG_GO_SPECS,
  WorkshopSpecRow,
} from '@/data/workshopSpecs';
import { useLanguage } from '@/context/LanguageContext';
import { localizeWorkshopRow } from '@/i18n/productLocalizer';

interface WorkshopSpecsTableProps {
  categorySlug: string;
  onRequestQuote: (specLabel: string) => void;
}

export const WorkshopSpecsTable: React.FC<WorkshopSpecsTableProps> = ({
  categorySlug,
  onRequestQuote,
}) => {
  const { locale, t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  let title = '';
  let subtitle = '';
  let rows: WorkshopSpecRow[] = [];

  if (categorySlug === 'pallet-go-tram') {
    title = t.workshopTable.tramTitle;
    subtitle = t.workshopTable.tramSub;
    rows = PALLET_TRAM_SPECS;
  } else if (categorySlug === 'pallet-van-ep') {
    title = t.workshopTable.plywoodTitle;
    subtitle = t.workshopTable.plywoodSub;
    rows = PALLET_PLYWOOD_SPECS;
  } else if (categorySlug === 'thung-go-dong-hang') {
    title = t.workshopTable.crateTitle;
    subtitle = t.workshopTable.crateSub;
    rows = THUNG_GO_SPECS;
  } else {
    return null;
  }

  const visibleRows = (expanded ? rows : rows.slice(0, 6)).map((r) =>
    localizeWorkshopRow(r, locale)
  );

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
          <Table2 size={14} /> {t.workshopTable.tag}
        </span>
        <h2
          style={{
            fontSize: '1.3rem',
            fontWeight: 800,
            color: 'var(--secondary)',
            margin: '0.25rem 0 0.3rem',
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: 0 }}>{subtitle}</p>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', minWidth: '680px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {t.workshopTable.colCode}
              </th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {t.workshopTable.colDim}
              </th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {t.workshopTable.colStruct}
              </th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {t.workshopTable.colTop}
              </th>
              <th style={{ padding: '0.7rem 0.75rem', fontWeight: 700, color: 'var(--secondary)' }}>
                {t.workshopTable.colSupport}
              </th>
              <th
                style={{
                  padding: '0.7rem 0.75rem',
                  fontWeight: 700,
                  color: 'var(--secondary)',
                  textAlign: 'right',
                }}
              >
                {t.workshopTable.colAction}
              </th>
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
                <td
                  style={{
                    padding: '0.65rem 0.75rem',
                    fontWeight: 800,
                    color: 'var(--primary-dark)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.code}
                </td>
                <td
                  style={{
                    padding: '0.65rem 0.75rem',
                    fontWeight: 700,
                    color: 'var(--secondary)',
                    whiteSpace: 'nowrap',
                  }}
                >
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
                      cursor: 'pointer',
                    }}
                  >
                    <FileText size={12} /> {t.workshopTable.quoteBtn}
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
                <ChevronUp size={16} /> {t.workshopTable.collapseBtn}
              </>
            ) : (
              <>
                <ChevronDown size={16} />{' '}
                {t.workshopTable.expandBtn.replace('{count}', String(rows.length))}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};
