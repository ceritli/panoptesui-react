import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function SortingDemo({ products }: { products: Product[] }) {
  const [activePreset, setActivePreset] = useState<string>('default');
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.sorting.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {t.pages.sorting.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.sorting.desc}
          </p>
        </div>
      </div>

      {/* Preset Sorting Actions */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">{t.common.quickSort}</span>
          <button
            type="button"
            onClick={() => setActivePreset('price-desc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePreset === 'price-desc'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.common.highestPrice}
          </button>
          <button
            type="button"
            onClick={() => setActivePreset('rating-desc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePreset === 'rating-desc'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.common.highestRating}
          </button>
          <button
            type="button"
            onClick={() => setActivePreset('stock-asc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              activePreset === 'stock-asc'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t.pages.sorting.lowestStock}
          </button>
          <button
            type="button"
            onClick={() => setActivePreset('default')}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-500 hover:text-slate-800 transition"
          >
            {t.pages.sorting.reset}
          </button>
        </div>
        <div className="text-[11px] text-slate-500 italic">
          {t.pages.sorting.tip}
        </div>
      </div>

      {/* Grid */}
      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15]}
        sortable={true}
        filterable={false}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="100px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="140px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.pages.sorting.codeTitle}
          code={`<PanoptesGrid
  data={products}
  sortable={true}
  pageSize={8}
>
  <GridColumn field="name" title="Ürün Adı" />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
  <GridColumn field="stock" title="Stok" align="center" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
