import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function PagingDemo({ products }: { products: Product[] }) {
  const [pageSize, setPageSize] = useState<number>(5);
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.paging.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              pageSize={pageSize}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.paging.desc}
          </p>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl text-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{t.common.paging.recordsPerPage}</span>
          {[5, 8, 12, 20].map(size => (
            <button
              key={size}
              type="button"
              onClick={() => setPageSize(size)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                pageSize === size
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {size} {t.common.paging.recordsUnit}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-300 flex items-center gap-3">
          <span>{t.common.paging.total} <strong>{products.length}</strong> {t.pages.paging.productsUnit}</span>
          <span className="text-slate-600">|</span>
          <span>{t.common.paging.totalPages} <strong>{Math.ceil(products.length / pageSize)}</strong></span>
        </div>
      </div>

      {/* Focused Grid */}
      <PanoptesGrid
        data={products}
        pageSize={pageSize}
        pageSizes={[5, 8, 12, 20]}
        sortable={true}
        filterable={false}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="240px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid
  data={products}
  pageSize={${pageSize}}
  pageSizes={[5, 8, 12, 20]}
  sortable={true}
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
