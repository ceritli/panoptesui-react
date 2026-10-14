import React from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function TemplatesDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.templates.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              {t.pages.templates.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.templates.desc}
          </p>
        </div>
      </div>

      {/* Grid with Rich Templates */}
      <PanoptesGrid
        data={products}
        pageSize={6}
        pageSizes={[6, 12, 24]}
        sortable={true}
        filterable={true}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn
          field="name"
          title={t.pages.templates.colProductImage}
          width="260px"
          cell={({ row }: { row: Product }) => (
            <div className="flex items-center gap-3">
              {row.imageUrl ? (
                <img
                  src={row.imageUrl}
                  alt={row.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center border border-purple-200 shadow-xs shrink-0">
                  {row.name ? row.name.slice(0, 2).toUpperCase() : 'PR'}
                </div>
              )}
              <div className="min-w-0">
                <div className="font-bold text-slate-900 text-xs truncate">{row.name}</div>
                <div className="text-[11px] text-slate-400 truncate">{row.supplier}</div>
              </div>
            </div>
          )}
        />
        <GridColumn field="category" title={t.common.columns.category} width="150px" />
        <GridColumn field="country" title={t.pages.templates.colCountryFlag} width="150px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn
          field="discontinued"
          title={t.common.columns.status}
          width="130px"
          align="center"
          cell={({ value }: { value: boolean }) => (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                !value
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${!value ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              {!value ? t.common.status.inStock : t.common.status.outOfStock}
            </span>
          )}
        />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="160px" format="stars" />
        <GridColumn field="targetSales" title={t.common.columns.targetSales} width="160px" format="sparkline" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid data={products} pageSize={6} sortable={true}>
  <GridColumn
    field="name"
    title="Ürün & Görsel"
    width="260px"
    cell={({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.imageUrl} className="w-10 h-10 rounded-xl" />
        <div>
          <div className="font-bold">{row.name}</div>
          <div className="text-xs text-slate-400">{row.supplier}</div>
        </div>
      </div>
    )}
  />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
