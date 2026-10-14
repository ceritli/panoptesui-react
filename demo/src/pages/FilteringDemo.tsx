import React, { useState, useMemo } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function FilteringDemo({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(products.map(p => p.category)))];
  }, [products]);

  const filteredData = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.filtering.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
              {t.pages.filtering.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.filtering.desc}
          </p>
        </div>
      </div>

      {/* Quick Category Badges */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-2">{t.common.quickFilter}</span>
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-teal-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? t.common.allCategories : cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <PanoptesGrid
        data={filteredData}
        pageSize={8}
        pageSizes={[5, 8, 15]}
        sortable={true}
        filterable={true}
        searchable={true}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="220px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="100px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.pages.filtering.codeTitle}
          code={`<PanoptesGrid
  data={products}
  filterable={true}
  searchable={true}
  pageSize={8}
>
  <GridColumn field="name" title="Ürün Adı" />
  <GridColumn field="category" title="Kategori" />
  <GridColumn field="price" title="Fiyat" format="currency" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
