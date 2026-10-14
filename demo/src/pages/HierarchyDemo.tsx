import React from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { LightCodeViewer } from '../components/ComponentShowcase';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplier: string;
  country: string;
  totalSales: number;
}

export function HierarchyDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.hierarchy.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              {t.pages.hierarchy.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.hierarchy.desc}
          </p>
        </div>
      </div>

      <PanoptesGrid
        data={products}
        pageSize={6}
        sortable={true}
        filterable={true}
        renderDetail={(row: Product) => (
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-800 text-xs">
                {row.name} - {t.pages.hierarchy.analysisCard}
              </span>
              <span className="text-[11px] text-slate-400 font-mono">ID: #{row.id}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.pages.hierarchy.supplierInfo}
                </span>
                <span className="font-bold text-slate-800">{row.supplier}</span>
                <span className="text-slate-500 block text-[11px]">{row.country}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.pages.hierarchy.warehouseLogistics}
                </span>
                <span className="font-bold text-slate-800">
                  {t.pages.hierarchy.itemsInStock(row.stock)}
                </span>
                <span className="text-emerald-600 block text-[11px]">
                  {t.pages.hierarchy.fastDelivery}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {t.pages.hierarchy.annualRevenue}
                </span>
                <span className="font-bold text-indigo-600">
                  {t.pages.hierarchy.currencySymbol}{row.totalSales.toLocaleString(t.pages.hierarchy.currencyLocale)}
                </span>
                <span className="text-slate-500 block text-[11px]">
                  {t.pages.hierarchy.targetAchieved}
                </span>
              </div>
            </div>
          </div>
        )}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="240px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid
  data={products}
  pageSize={6}
  detailTemplate={(row) => (
    <div className="p-4 bg-slate-50 rounded-xl">
      <h4>{row.name} - Detay Bilgisi</h4>
      <p>Tedarikçi: {row.supplier} | Stok: {row.stock}</p>
    </div>
  )}
>
  <GridColumn field="id" title="#" width="60px" align="center" />
  <GridColumn field="name" title="Ürün Adı" />
  <GridColumn field="category" title="Kategori" />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
