import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function ColumnsDemo({ products }: { products: Product[] }) {
  const [showCountry, setShowCountry] = useState<boolean>(true);
  const [showStock, setShowStock] = useState<boolean>(true);
  const [showRating, setShowRating] = useState<boolean>(true);
  const [showSales, setShowSales] = useState<boolean>(true);

  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.columns.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              {t.pages.columns.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.columns.desc}
          </p>
        </div>
      </div>

      {/* Column Chooser Toggles Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-wrap text-xs font-semibold text-slate-700">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">
            {t.pages.columns.columnChooser}
          </span>
          
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showCountry}
              onChange={e => setShowCountry(e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 focus:ring-0 cursor-pointer"
            />
            <span>{t.pages.columns.countryCol}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showStock}
              onChange={e => setShowStock(e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 focus:ring-0 cursor-pointer"
            />
            <span>{t.pages.columns.stockCol}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showRating}
              onChange={e => setShowRating(e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 focus:ring-0 cursor-pointer"
            />
            <span>{t.pages.columns.ratingCol}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showSales}
              onChange={e => setShowSales(e.target.checked)}
              className="w-4 h-4 rounded text-violet-600 focus:ring-0 cursor-pointer"
            />
            <span>{t.pages.columns.targetSalesCol}</span>
          </label>
        </div>
      </div>

      {/* Grid with Conditionally Rendered Columns */}
      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15]}
        sortable={true}
        filterable={true}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="240px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        {showCountry && <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />}
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        {showStock && <GridColumn field="stock" title={t.common.columns.stock} width="100px" align="center" />}
        {showRating && <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />}
        {showSales && <GridColumn field="targetSales" title={t.common.columns.targetSales} width="160px" format="sparkline" />}
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid data={products} pageSize={8} sortable={true}>
  <GridColumn field="id" title="#" width="60px" />
  <GridColumn field="name" title="Ürün Adı" width="240px" />
  {showCountry && <GridColumn field="country" title="Ülke" format="country" />}
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
  {showSales && <GridColumn field="targetSales" title="Satış Trendi" format="sparkline" />}
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
