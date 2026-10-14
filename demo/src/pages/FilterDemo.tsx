import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Filter, FilterRule } from '@panoptes/react';

export function FilterDemo() {
  const [appliedQuery, setAppliedQuery] = useState<string>('Varsayılan filtreler aktif.');

  const handleApply = (rules: FilterRule[], logic: 'AND' | 'OR') => {
    const text = rules
      .map(r => `[${r.field} ${r.operator} "${r.value}"]`)
      .join(` ${logic} `);
    setAppliedQuery(text || 'Tüm filtreler temizlendi.');
  };

  return (
    <ComponentShowcase
      title="Filter (Gelişmiş Filtre Oluşturucu)"
      category="Filter"
      description="Kullanıcıların AND / OR mantıksal operatörleri, dinamik alanlar ve karşılaştırma kuralları ile karmaşık veri sorguları oluşturmasını sağlayan görsel filtre motoru."
      propsRows={[
        { name: 'fields', type: 'string[]', default: "['Ad', 'Kategori', 'Fiyat', 'Stok', 'Durum']", description: 'Filtrelenebilir veri tablosu alanları.' },
        { name: 'onApply', type: '(rules: FilterRule[], logic: "AND" | "OR") => void', default: '-', description: 'Filtreleri Uygula butonuna basıldığında oluşturulan sorgu kurallarını döndüren fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Dinamik Kural Ekleme & Mantıksal Bağlaçlar',
          description: '+ Kural Ekle butonuyla yeni satırlar ekleyin, AND/OR seçin ve alttaki filtre çıktısını inceleyin.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <Filter
                fields={['Ürün Adı', 'Kategori', 'Birim Fiyat', 'Depo Stoğu', 'Satıcı']}
                onApply={handleApply}
              />

              <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-sans font-bold">SQL / API Filtre Çıktısı:</div>
                <div className="truncate">{appliedQuery}</div>
              </div>
            </div>
          ),
          code: `import { Filter, FilterRule } from '@panoptes/react';

export function AdvancedFilterDemo() {
  const handleFilter = (rules: FilterRule[], logic: 'AND' | 'OR') => {
    console.log('Filtreler:', rules, 'Bağlaç:', logic);
  };

  return (
    <Filter
      fields={['Ürün', 'Fiyat', 'Kategori']}
      onApply={handleFilter}
    />
  );
}`
        }
      ]}
    />
  );
}
