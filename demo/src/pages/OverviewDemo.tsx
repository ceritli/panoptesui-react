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
  imageUrl: string;
  customerRating: number;
  country: string;
  countryCode: string;
  totalSales: number;
  targetSales: number;
  discontinued: boolean;
}

interface OverviewDemoProps {
  products: Product[];
}

export function OverviewDemo({ products }: OverviewDemoProps) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale).overview;

  const total = products.reduce((acc, p) => acc + p.totalSales, 0);
  const totalSalesFormatted = `${t.currencySymbol}${total.toLocaleString(t.currencyLocale)}`;

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 mb-3 border border-white/10">
            <span>{t.badge}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{t.localData}</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">
            {t.heroTitle}
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            {t.heroDesc}
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
            📦
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t.totalProducts}</div>
            <div className="text-lg font-bold text-slate-900">{products.length} {t.totalProductsUnit}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            💰
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t.totalRevenue}</div>
            <div className="text-lg font-bold text-slate-900">{totalSalesFormatted}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            ⭐
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t.avgRating}</div>
            <div className="text-lg font-bold text-slate-900">
              {(products.reduce((acc, p) => acc + p.customerRating, 0) / (products.length || 1)).toFixed(1)} / 5.0
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
            🌍
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">{t.supplierCountries}</div>
            <div className="text-lg font-bold text-slate-900">
              {new Set(products.map(p => p.country)).size} {t.supplierCountriesUnit}
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Grid */}
      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15, 30]}
        sortable={true}
        filterable={true}
        groupable={true}
        selectable={true}
        exportable={true}
        pdfExport={true}
        searchable={true}
        editable="popup"
      >
        <GridColumn field="id" title="#" width="60px" editable={false} align="center" />
        <GridColumn
          field="name"
          title={t.colProductSupplier}
          width="260px"
          cell={({ row }: any) => (
            <div className="flex items-center gap-3">
              {row.imageUrl ? (
                <img
                  src={row.imageUrl}
                  alt={row.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center border border-indigo-200 shadow-xs shrink-0">
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
        <GridColumn field="category" title={t.colCategory} width="140px" />
        <GridColumn field="country" title={t.colCountry} width="130px" format="country" />
        <GridColumn field="price" title={t.colPrice} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.colStock} width="90px" align="center" />
        <GridColumn
          field="discontinued"
          title={t.colStatus}
          width="110px"
          align="center"
          cell={({ value }: any) => (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                !value
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${!value ? 'bg-emerald-500' : 'bg-rose-500'}`} />
              {!value ? t.inStock : t.outOfStock}
            </span>
          )}
        />
        <GridColumn field="customerRating" title={t.colRating} width="130px" format="stars" />
        <GridColumn field="targetSales" title={t.colTargetSales} width="150px" format="sparkline" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (PanoptesGrid Overview)"
          code={`<PanoptesGrid
  data={products}
  pageSize={10}
  pageSizes={[5, 10, 20]}
  sortable={true}
  filterable={true}
  searchable={true}
  exportable={true}
>
  <GridColumn field="id" title="#" width="60px" align="center" />
  <GridColumn field="name" title="Ürün Adı" width="220px" />
  <GridColumn field="category" title="Kategori" width="140px" />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
  <GridColumn field="stock" title="Stok" width="90px" align="center" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
