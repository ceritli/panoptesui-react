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
  customerRating: number;
  country: string;
  totalSales: number;
  targetSales: number;
}

export function GroupingDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.grouping.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {t.pages.grouping.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.grouping.desc}
          </p>
        </div>
      </div>

      <PanoptesGrid
        data={products}
        pageSize={10}
        groupable={true}
        sortable={true}
        filterable={true}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
        <GridColumn field="totalSales" title={t.pages.grouping.colRevenue} width="140px" format="currency" align="right" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid
  data={products}
  groupable={true}
  sortable={true}
  filterable={true}
  pageSize={10}
>
  <GridColumn field="name" title="Ürün Adı" />
  <GridColumn field="category" title="Kategori" />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
  <GridColumn field="stock" title="Stok" align="center" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
