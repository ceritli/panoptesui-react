import React, { useState } from 'react';
import { Pager } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function PagerDemo() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(3);
  const [pageSize, setPageSize] = useState(10);

  return (
    <ComponentShowcase
      title="Pager (Bağımsız Sayfalayıcı)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal Pager bileşeni: Herhangi bir liste, tablo veya kart koleksiyonu ile bağımsız çalışabilen sayfa yöneticisi. Sayfa numaraları, önceki/sonraki kontrolleri, toplam kayıt sayısı ve sayfa boyutu seçimi."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Standart Sayfalayıcı & Durum Özeti',
          description: '150 kayıttan 10 sayfalık veri gezinimi ve canlı sayfa göstergesi.',
          preview: (
            <div className="space-y-4 w-full">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                <span>Aktif Seçili Sayfa: <strong className="text-blue-600 font-mono text-sm">{page1}</strong></span>
                <span className="text-slate-500">Toplam Sayfa: 15 (150 Kayıt)</span>
              </div>
              <Pager
                totalItems={150}
                pageSize={10}
                currentPage={page1}
                onPageChange={setPage1}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { Pager } from '@panoptes/react';

export function StandalonePagerExample() {
  const [page, setPage] = useState(1);

  return (
    <Pager
      totalItems={150}
      pageSize={10}
      currentPage={page}
      onPageChange={setPage}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Dinamik Sayfa Boyutu Seçici (Page Size)',
          description: 'Sayfa başına gösterilecek kayıt adedini (5, 10, 25, 50) dinamik olarak değiştirin.',
          preview: (
            <div className="space-y-4 w-full">
              <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">Sayfa Boyutu Seçici:</span>
                {[5, 10, 25, 50].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPageSize(size);
                      setPage2(1);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                      pageSize === size ? 'bg-blue-600 text-white shadow-xs' : 'bg-white border text-slate-700'
                    }`}
                  >
                    {size} Kayıt
                  </button>
                ))}
              </div>
              <Pager
                totalItems={280}
                pageSize={pageSize}
                currentPage={page2}
                onPageChange={setPage2}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { Pager } from '@panoptes/react';

export function DynamicPageSizePager() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return (
    <Pager
      totalItems={280}
      pageSize={pageSize}
      currentPage={page}
      onPageChange={setPage}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'totalItems', type: 'number', description: 'Listedeki toplam kayıt adedi' },
        { name: 'pageSize', type: 'number', default: '10', description: 'Sayfa başına gösterilen kayıt adedi' },
        { name: 'currentPage', type: 'number', default: '1', description: 'Aktif sayfa numarası (1 tabanlı)' },
        { name: 'onPageChange', type: '(page: number) => void', description: 'Sayfa değiştiğinde tetiklenen callback işlevi' }
      ]}
    />
  );
}
