import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';

export function SelectionDemo({ products }: { products: Product[] }) {
  const [selectedList, setSelectedList] = useState<Product[]>([]);
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  const totalSum = selectedList.reduce((acc, p) => acc + p.price, 0);
  const totalSelectedPrice = `${t.pages.selection.currencySymbol}${totalSum.toLocaleString(t.pages.selection.currencyLocale)}`;

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.selection.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {t.pages.selection.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.selection.desc}
          </p>
        </div>
      </div>

      {/* Control & Selection Status Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl text-white flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">{t.pages.selection.selectionState}</span>
          <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-xs">
            {selectedList.length} {t.pages.selection.rowsSelected}
          </span>
          {selectedList.length > 0 && (
            <span className="text-xs text-slate-300">
              ({t.pages.selection.totalAmount} {totalSelectedPrice})
            </span>
          )}
        </div>
        {selectedList.length > 0 && (
          <button
            type="button"
            onClick={() => setSelectedList([])}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
          >
            {t.pages.selection.clearSelection}
          </button>
        )}
      </div>

      {/* Grid with Single Checkbox Column */}
      <PanoptesGrid
        data={products}
        pageSize={6}
        pageSizes={[5, 6, 10, 20]}
        sortable={true}
        filterable={true}
        selectable={true}
        onSelectionChange={(selected) => setSelectedList(selected)}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="240px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Live Selection Output */}
      {selectedList.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span>
              {t.pages.selection.jsonOutput} ({selectedList.length}):
            </span>
            <span className="text-indigo-600 font-mono text-[11px]">onSelectionChange</span>
          </div>
          <pre className="bg-slate-50 text-slate-800 p-4 rounded-xl text-xs font-mono overflow-x-auto max-h-48 leading-relaxed border border-slate-200">
            {JSON.stringify(
              selectedList.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category })),
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
}
