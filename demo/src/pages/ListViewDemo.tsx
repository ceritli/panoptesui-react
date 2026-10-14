import React, { useState } from 'react';
import { ListView, Pager } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Product } from '../types';

const FALLBACK_PRODUCTS: Product[] = [
  { id: 1, name: 'MacBook Pro 16" M3 Max', category: 'Laptop', price: 114999, stock: 12, supplier: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80', customerRating: 4.9, country: 'TR', countryCode: 'tr', totalSales: 120, targetSales: 150, discontinued: false },
  { id: 2, name: 'Dell XPS 15 OLED', category: 'Laptop', price: 78500, stock: 8, supplier: 'Dell', imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', customerRating: 4.7, country: 'TR', countryCode: 'tr', totalSales: 80, targetSales: 100, discontinued: false },
  { id: 3, name: 'Apple Studio Display 27"', category: 'Monitör', price: 64999, stock: 15, supplier: 'Apple', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80', customerRating: 4.8, country: 'TR', countryCode: 'tr', totalSales: 45, targetSales: 50, discontinued: false },
  { id: 4, name: 'Logitech MX Master 3S', category: 'Aksesuar', price: 3899, stock: 45, supplier: 'Logitech', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80', customerRating: 4.9, country: 'TR', countryCode: 'tr', totalSales: 300, targetSales: 350, discontinued: false },
  { id: 5, name: 'Keychron Q1 Pro Klavye', category: 'Aksesuar', price: 7250, stock: 20, supplier: 'Keychron', imageUrl: 'https://images.unsplash.com/photo-1580481077195-c9c0b13593b4?w=400&q=80', customerRating: 4.6, country: 'TR', countryCode: 'tr', totalSales: 95, targetSales: 100, discontinued: false },
  { id: 6, name: 'Sony WH-1000XM5 Kulaklık', category: 'Ses', price: 12499, stock: 0, supplier: 'Sony', imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', customerRating: 4.8, country: 'TR', countryCode: 'tr', totalSales: 140, targetSales: 150, discontinued: false }
];

export function ListViewDemo({ products = FALLBACK_PRODUCTS }: { products?: Product[] } = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState<1 | 2 | 3 | 4>(3);
  const [search, setSearch] = useState('');
  const pageSize = 6;

  const dataList = (products && products.length > 0) ? products : FALLBACK_PRODUCTS;

  const filtered = dataList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <ComponentShowcase
      title="ListView (Kart & Şablonlu Liste)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal ListView bileşeni: Tamamen özelleştirilebilir React JSX kart şablon motoru, dahili sayfalama (Pager), sütun sayısı yapılandırma ve arama araç çubuğu."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: E-Ticaret Ürün Kartları Şablonu',
          description: '3 sütunlu kart düzeni, ürün görselleri, stok durumu ve sayfalayıcı (Pager).',
          preview: (
            <div className="space-y-4 w-full">
              {/* Controls */}
              <div className="flex flex-wrap justify-between items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                <input
                  type="text"
                  placeholder="Ürün veya kategori ara..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 w-64"
                />

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="font-bold text-slate-600">Sütun:</span>
                  {[2, 3, 4].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColumns(c as any)}
                      className={`px-2.5 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                        columns === c ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600'
                      }`}
                    >
                      {c} Sütun
                    </button>
                  ))}
                </div>
              </div>

              {/* ListView */}
              <ListView
                data={paginated}
                columns={columns}
                renderItem={product => (
                  <div className="space-y-3">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-400">
                          <span className="text-3xl">💻</span>
                        </div>
                      )}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-white/90 backdrop-blur-xs text-slate-800 shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{product.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Stok: {product.stock} adet</p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                      <span className="text-sm font-black text-blue-600">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`${product.name} sepete eklendi`)}
                        className="px-3 py-1 bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg transition cursor-pointer"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                )}
              />

              {/* Pager */}
              <Pager
                totalItems={filtered.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { ListView, Pager } from '@panoptes/react';

export function ProductListView({ products }) {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-4">
      <ListView
        data={paginated}
        columns={3}
        renderItem={product => (
          <div className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h4>{product.name}</h4>
            <span>₺{product.price}</span>
          </div>
        )}
      />

      <Pager
        totalItems={products.length}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}`
        }
      ]}
      propsList={[
        { name: 'data', type: 'T[]', description: 'Görüntülenecek veri nesneleri dizisi' },
        { name: 'renderItem', type: '(item: T) => ReactNode', description: 'Her bir öğeyi render eden JSX kart şablon fonksiyonu' },
        { name: 'columns', type: '1 | 2 | 3 | 4', default: '3', description: 'Izgara düzeni sütun adedi' }
      ]}
    />
  );
}
