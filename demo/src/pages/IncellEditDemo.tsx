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

export function IncellEditDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.incell.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              {t.pages.incell.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.incell.desc}
          </p>
        </div>
      </div>

      <PanoptesGrid
        data={products}
        pageSize={8}
        pageSizes={[5, 8, 15]}
        sortable={true}
        filterable={true}
        editable="incell"
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" editable={false} align="center" />
        <GridColumn
          field="name"
          title={t.pages.incell.colNameEditable}
          width="220px"
          editorType="text"
        />
        <GridColumn field="category" title={t.common.columns.category} width="150px" editorType="text" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" editorType="number" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="120px" editorType="number" align="center" />
        <GridColumn field="supplier" title={t.common.columns.supplier} width="180px" editorType="text" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" editable={false} />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid
  data={products}
  editable="incell"
  pageSize={8}
  sortable={true}
>
  <GridColumn field="id" title="#" width="60px" editable={false} />
  <GridColumn field="name" title="Ürün Adı" editorType="text" />
  <GridColumn field="price" title="Fiyat" editorType="number" format="currency" align="right" />
  <GridColumn field="stock" title="Stok" editorType="number" align="center" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
