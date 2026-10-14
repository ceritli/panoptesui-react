import React from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function PopupEditDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.popup.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-pink-700 border border-pink-200">
              {t.pages.popup.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.popup.desc}
          </p>
        </div>
      </div>

      {/* Grid with Popup Editing */}
      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15]}
        sortable={true}
        filterable={true}
        editable="popup"
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" editable={false} align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" editorType="text" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" editorType="text" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" editorType="text" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" editorType="number" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="100px" editorType="number" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" editable={false} />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.pages.popup.codeTitle}
          code={`<PanoptesGrid
  data={products}
  editable="popup"
  onSave={(record) => handleSave(record)}
>
  <GridColumn field="name" title="${t.common.columns.productName}" editorType="text" />
  <GridColumn field="price" title="${t.common.columns.price}" editorType="number" />
  <GridColumn field="category" title="${t.common.columns.category}" editorType="text" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
