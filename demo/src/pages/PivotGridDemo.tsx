import React, { useState, useMemo } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function PivotGridDemo() {
  const [metric, setMetric] = useState<'sales' | 'units'>('sales');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortCol, setSortCol] = useState<'region' | 'category' | 'q1' | 'q2' | 'q3' | 'q4' | 'total'>('total');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const rawData = [
    { region: 'Marmara', category: 'Elektronik', q1: 120000, q2: 145000, q3: 160000, q4: 190000 },
    { region: 'Marmara', category: 'Mobilya', q1: 80000, q2: 95000, q3: 110000, q4: 130000 },
    { region: 'İç Anadolu', category: 'Elektronik', q1: 95000, q2: 110000, q3: 125000, q4: 140000 },
    { region: 'İç Anadolu', category: 'Mobilya', q1: 60000, q2: 70000, q3: 85000, q4: 90000 },
    { region: 'Ege', category: 'Elektronik', q1: 75000, q2: 88000, q3: 102000, q4: 115000 },
    { region: 'Ege', category: 'Mobilya', q1: 50000, q2: 55000, q3: 65000, q4: 75000 },
    { region: 'Akdeniz', category: 'Elektronik', q1: 65000, q2: 78000, q3: 92000, q4: 105000 },
    { region: 'Akdeniz', category: 'Mobilya', q1: 42000, q2: 49000, q3: 58000, q4: 68000 }
  ];

  const formatVal = (val: number) => {
    return metric === 'sales'
      ? `₺${val.toLocaleString('tr-TR')}`
      : `${Math.round(val / 100).toLocaleString('tr-TR')} adet`;
  };

  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      const matchRegion = selectedRegion === 'all' || item.region === selectedRegion;
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchRegion && matchCategory;
    });
  }, [rawData, selectedRegion, selectedCategory]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA: any = a[sortCol as keyof typeof a];
      let valB: any = b[sortCol as keyof typeof b];

      if (sortCol === 'total') {
        valA = a.q1 + a.q2 + a.q3 + a.q4;
        valB = b.q1 + b.q2 + b.q3 + b.q4;
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortCol, sortDir]);

  const grandQ1 = filteredData.reduce((acc, r) => acc + r.q1, 0);
  const grandQ2 = filteredData.reduce((acc, r) => acc + r.q2, 0);
  const grandQ3 = filteredData.reduce((acc, r) => acc + r.q3, 0);
  const grandQ4 = filteredData.reduce((acc, r) => acc + r.q4, 0);
  const grandTotal = grandQ1 + grandQ2 + grandQ3 + grandQ4;

  const handleSort = (col: typeof sortCol) => {
    if (sortCol === col) {
      setSortDir(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('desc');
    }
  };

  return (
    <ComponentShowcase
      title="PivotGrid (Küp Analizi & Çapraz Tablo)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal PivotGrid bileşeni: Çok boyutlu satır ve sütun kırılımlı çapraz tablo hesaplama motoru, çeyrek dönemler (Q1-Q4), ara toplamlar, anlık filtreleme, sütun sıralaması ve genel dip toplam (Grand Total)."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Bölge & Kategori Çapraz Satış Matrisi (Filtrelenebilir & Sıralanabilir)',
          description: 'Metrik tipini değiştirin, bölgeleri ve kategorileri filtreleyin, sütun başlıklarına tıklayarak sıralayın.',
          preview: (
            <div className="space-y-4 w-full">
              {/* Filter Controls Toolbar */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
                {/* Metric Selector */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Metrik:</span>
                  <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setMetric('sales')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                        metric === 'sales' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ₺ Satış Cirosu
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetric('units')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                        metric === 'units' ? 'bg-blue-600 text-white shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      📦 Satış Adedi
                    </button>
                  </div>
                </div>

                {/* Region Filter */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Bölge:</span>
                  <select
                    value={selectedRegion}
                    onChange={e => setSelectedRegion(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 outline-none shadow-2xs"
                  >
                    <option value="all">Tüm Bölgeler (Hepsi)</option>
                    <option value="Marmara">Marmara</option>
                    <option value="İç Anadolu">İç Anadolu</option>
                    <option value="Ege">Ege</option>
                    <option value="Akdeniz">Akdeniz</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Kategori:</span>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-medium text-slate-700 outline-none shadow-2xs"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="Mobilya">Mobilya</option>
                  </select>
                </div>

                {/* Reset Filter Button */}
                {(selectedRegion !== 'all' || selectedCategory !== 'all') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRegion('all');
                      setSelectedCategory('all');
                    }}
                    className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg font-bold transition"
                  >
                    Filtreleri Sıfırla ↺
                  </button>
                )}
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-700 select-none">
                      <th
                        onClick={() => handleSort('region')}
                        className="py-3 px-4 cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center gap-1">
                          <span>Bölge</span>
                          {sortCol === 'region' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('category')}
                        className="py-3 px-4 cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center gap-1">
                          <span>Kategori</span>
                          {sortCol === 'category' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('q1')}
                        className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Çeyrek 1 (Q1)</span>
                          {sortCol === 'q1' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('q2')}
                        className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Çeyrek 2 (Q2)</span>
                          {sortCol === 'q2' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('q3')}
                        className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Çeyrek 3 (Q3)</span>
                          {sortCol === 'q3' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('q4')}
                        className="py-3 px-3 text-right cursor-pointer hover:bg-slate-200 transition"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Çeyrek 4 (Q4)</span>
                          {sortCol === 'q4' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('total')}
                        className="py-3 px-4 text-right bg-blue-50 text-blue-900 cursor-pointer hover:bg-blue-100 transition"
                      >
                        <div className="flex items-center justify-end gap-1">
                          <span>Satır Toplamı</span>
                          {sortCol === 'total' && <span>{sortDir === 'asc' ? '▲' : '▼'}</span>}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedData.map((row, i) => {
                      const rowSum = row.q1 + row.q2 + row.q3 + row.q4;
                      return (
                        <tr key={i} className="hover:bg-slate-50 transition">
                          <td className="py-2.5 px-4 font-bold text-slate-800">{row.region}</td>
                          <td className="py-2.5 px-4 text-slate-600">{row.category}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatVal(row.q1)}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatVal(row.q2)}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatVal(row.q3)}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">{formatVal(row.q4)}</td>
                          <td className="py-2.5 px-4 text-right font-mono font-bold bg-blue-50/40 text-blue-700">
                            {formatVal(rowSum)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-900 text-white font-bold">
                      <td colSpan={2} className="py-3 px-4 uppercase text-[11px] tracking-wider">
                        Genel Dip Toplam ({filteredData.length} Kayıt)
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-300">{formatVal(grandQ1)}</td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-300">{formatVal(grandQ2)}</td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-300">{formatVal(grandQ3)}</td>
                      <td className="py-3 px-3 text-right font-mono text-emerald-300">{formatVal(grandQ4)}</td>
                      <td className="py-3 px-4 text-right font-mono font-black text-amber-300 bg-slate-800">
                        {formatVal(grandTotal)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ),
          code: `import React, { useState, useMemo } from 'react';
import { PanoptesPivotGrid } from '@panoptes/react';

export function PivotGridExample() {
  const [metric, setMetric] = useState<'sales' | 'units'>('sales');
  const [regionFilter, setRegionFilter] = useState('all');

  const data = [
    { region: 'Marmara', category: 'Elektronik', q1: 120000, q2: 145000, q3: 160000, q4: 190000 },
    { region: 'Ege', category: 'Elektronik', q1: 75000, q2: 88000, q3: 102000, q4: 115000 }
  ];

  return (
    <PanoptesPivotGrid
      data={data}
      rows={['region', 'category']}
      columns={['q1', 'q2', 'q3', 'q4']}
      metric={metric}
      showGrandTotals={true}
      allowSorting={true}
      allowFiltering={true}
      onMetricChange={setMetric}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'data', type: 'any[]', description: 'Pivot analizi yapılacak kaynak veri dizisi' },
        { name: 'rows', type: 'string[]', description: 'Satır başlıkları olarak gruplanacak boyut alanları' },
        { name: 'columns', type: 'string[]', description: 'Sütun başlıkları olarak matrise açılacak alanlar' },
        { name: 'metric', type: "'sales' | 'units' | string", default: "'sales'", description: 'Hücrelerde hesaplanacak aktif metrik veya ölçü birimi' },
        { name: 'showGrandTotals', type: 'boolean', default: 'true', description: 'Alt dip toplam ve sağ satır toplamı gösterimi' },
        { name: 'allowSorting', type: 'boolean', default: 'true', description: 'Sütun başlıklarına tıklanarak sıralama yapılabilmesi' }
      ]}
    />
  );
}
