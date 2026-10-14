import React from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function ExportDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.export.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {t.pages.export.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.export.desc}
          </p>
        </div>
      </div>

      {/* Grid with prominent Export buttons */}
      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15, 30]}
        sortable={true}
        filterable={true}
        exportable={true}
        pdfExport={true}
        searchable={true}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.pages.export.codeTitle}
          code={`<PanoptesGrid
  data={products}
  exportable={true}   // Excel (.xlsx/.xls) butonunu araç çubuğuna ekler
  pdfExport={true}    // PDF / Yazdır butonunu araç çubuğuna ekler
  pageSize={8}
>
  <GridColumn field="name" title="Ürün Adı" />
  <GridColumn field="price" title="Fiyat" format="currency" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
