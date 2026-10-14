import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function ApiDemo({ products }: { products: Product[] }) {
  const [selectedList, setSelectedList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.api.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              {t.pages.api.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.api.desc}
          </p>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl text-white flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{t.common.paging.recordsPerPage}</span>
          {[5, 10, 20].map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setPageSize(s)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                pageSize === s ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {s} {t.common.paging.recordsUnit}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-300">
          {t.pages.api.selectedCount} <strong>{selectedList.length}</strong>
        </div>
      </div>

      <PanoptesGrid
        data={products}
        pageSize={pageSize}
        selectable={true}
        sortable={true}
        filterable={true}
        onSelectionChange={(selected) => setSelectedList(selected)}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Selected Items Inspector */}
      {selectedList.length > 0 && (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 animate-fadeIn">
          <div className="text-xs font-bold text-slate-700">
            {t.pages.api.jsonOutput}
          </div>
          <pre className="bg-slate-50 text-slate-800 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-48 border border-slate-200">
            {JSON.stringify(selectedList, null, 2)}
          </pre>
        </div>
      )}

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`import { useState } from 'react';
import { PanoptesGrid, GridColumn } from '@panoptes/react';

export function GridApiExample({ products }) {
  const [selectedList, setSelectedList] = useState([]);
  const [pageSize, setPageSize] = useState(${pageSize});

  return (
    <PanoptesGrid
      data={products}
      pageSize={pageSize}
      selectable={true}
      sortable={true}
      filterable={true}
      onSelectionChange={(selected) => setSelectedList(selected)}
    >
      <GridColumn field="id" title="#" width="60px" align="center" />
      <GridColumn field="name" title="Ürün Adı" width="220px" />
      <GridColumn field="category" title="Kategori" width="160px" />
      <GridColumn field="country" title="Ülke" format="country" width="140px" />
      <GridColumn field="price" title="Fiyat" format="currency" align="right" />
      <GridColumn field="customerRating" title="Puan" format="stars" />
    </PanoptesGrid>
  );
}`}
        />
      </div>
    </div>
  );
}
