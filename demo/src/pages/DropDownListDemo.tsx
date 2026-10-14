import React, { useState } from 'react';
import { DropDownList } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function DropDownListDemo() {
  const [val1, setVal1] = useState('Elektronik');
  const [val2, setVal2] = useState('');

  const categories = [
    { value: 'Elektronik', label: 'Elektronik & Bilgisayar' },
    { value: 'Giyim', label: 'Giyim & Tekstil' },
    { value: 'Gıda', label: 'Gıda & Süpermarket' },
    { value: 'Mobilya', label: 'Ev & Mobilya' },
    { value: 'Kozmetik', label: 'Kozmetik & Kişisel Bakım' }
  ];

  const cities = [
    { value: '34', label: 'İstanbul' },
    { value: '06', label: 'Ankara' },
    { value: '35', label: 'İzmir' },
    { value: '16', label: 'Bursa' },
    { value: '07', label: 'Antalya' }
  ];

  return (
    <ComponentShowcase
      title="DropDownList (Açılır Seçim Listesi)"
      category="Form & Editörler"
      description="Panoptes Kurumsal DropDownList bileşeni: Arama ve canlı filtreleme kutusu, tekli seçim, uzaktan veri bağlama, optgroup etiketleri ve klavye gezintisi."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Filtreli Kategori Seçimi',
          description: 'Açılır pencerede anlık arama (Search filter), klavye yön tuşları ve temizleme butonu.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DropDownList
                label="Ürün Kategorisi"
                options={categories}
                value={val1}
                filterable={true}
                clearButton={true}
                onChange={setVal1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Seçilen Kategori: <strong className="text-blue-600 font-bold">{val1}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DropDownList } from '@panoptes/react';

const categories = [
  { value: 'Elektronik', label: 'Elektronik & Bilgisayar' },
  { value: 'Giyim', label: 'Giyim & Tekstil' },
  { value: 'Gıda', label: 'Gıda & Süpermarket' }
];

export function DropDownListExample() {
  const [selected, setSelected] = useState('Elektronik');

  return (
    <DropDownList
      label="Ürün Kategorisi"
      options={categories}
      value={selected}
      filterable={true}
      clearButton={true}
      onChange={setSelected}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Şehir / Konum Seçimi (Placeholder İle)',
          description: 'Varsayılan seçim olmadan boş yer tutucu (placeholder) ile başlatma.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DropDownList
                label="Teslimat İli"
                placeholder="İl seçiniz..."
                options={cities}
                value={val2}
                filterable={true}
                onChange={setVal2}
              />
              <p className="text-[11px] text-slate-400">Listedeki şehirler arasında yazarak arama yapabilirsiniz.</p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DropDownList } from '@panoptes/react';

export function CitySelectExample() {
  const [city, setCity] = useState('');

  return (
    <DropDownList
      label="Teslimat İli"
      placeholder="İl seçiniz..."
      options={[
        { value: '34', label: 'İstanbul' },
        { value: '06', label: 'Ankara' },
        { value: '35', label: 'İzmir' }
      ]}
      value={city}
      filterable={true}
      onChange={setCity}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'options', type: 'Array<{ value: string; label: string }>', description: 'Listelenecek seçenekler dizisi' },
        { name: 'value', type: 'string', description: 'Seçili öğenin değeri' },
        { name: 'onChange', type: '(val: string) => void', description: 'Seçim değiştiğinde tetiklenir' },
        { name: 'filterable', type: 'boolean', default: 'true', description: 'Canlı arama kutusu görünürlüğü' },
        { name: 'clearButton', type: 'boolean', default: 'true', description: 'Temizleme butonu görünürlüğü' }
      ]}
    />
  );
}
