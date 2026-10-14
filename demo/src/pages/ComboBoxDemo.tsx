import React, { useState } from 'react';
import { ComboBox } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function ComboBoxDemo() {
  const [val1, setVal1] = useState('Türkiye');
  const [val2, setVal2] = useState('');

  const countries = ['Türkiye', 'Almanya', 'İngiltere', 'Fransa', 'Hollanda', 'İtalya', 'İspanya', 'Amerika Birleşik Devletleri'];
  const jobTitles = ['Yazılım Mimarı', 'Frontend Geliştirici', 'Backend Geliştirici', 'DevOps Mühendisi', 'Ürün Yöneticisi'];

  return (
    <ComponentShowcase
      title="ComboBox (Girdi & Açılır Liste)"
      category="Form & Editörler"
      description="Panoptes Kurumsal ComboBox bileşeni: Hem açılır listeden hazır seçenek seçebilme hem de listede olmayan serbest özel metin yazabilme yeteneği. Canlı filtreleme ve klavye gezintisi."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Ülke Seçimi veya Özel Metin Girişi',
          description: 'Listeden bir ülke seçebilir veya özel bir ülke adı yazabilirsiniz.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <ComboBox
                label="Ülke"
                options={countries}
                value={val1}
                onChange={setVal1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Mevcut Değer: <strong className="text-blue-600 font-bold">{val1 || 'Boş'}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { ComboBox } from '@panoptes/react';

const countries = ['Türkiye', 'Almanya', 'İngiltere', 'Fransa'];

export function ComboBoxExample() {
  const [value, setValue] = useState('Türkiye');

  return (
    <ComboBox
      label="Ülke"
      options={countries}
      value={value}
      onChange={setValue}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Meslek / Pozisyon Unvanı',
          description: 'Listeden standart unvan seçin veya kendi özel unvanınızı elle yazın.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <ComboBox
                label="Pozisyon Unvanı"
                placeholder="Unvan seçin veya yazın..."
                options={jobTitles}
                value={val2}
                onChange={setVal2}
              />
              <p className="text-[11px] text-slate-400">Listede yer almayan unvanlar da geçerli kabul edilir.</p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { ComboBox } from '@panoptes/react';

export function JobTitleComboBox() {
  const [job, setJob] = useState('');

  return (
    <ComboBox
      label="Pozisyon"
      placeholder="Seçin veya yazın..."
      options={['Frontend Geliştirici', 'Backend Geliştirici']}
      value={job}
      onChange={setJob}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'options', type: 'string[]', description: 'Öneri olarak sunulacak seçenekler dizisi' },
        { name: 'value', type: 'string', description: 'Girdi kutusunun mevcut değeri' },
        { name: 'onChange', type: '(val: string) => void', description: 'Değer değiştiğinde veya seçildiğinde tetiklenir' },
        { name: 'placeholder', type: 'string', description: 'Kutu boşken gösterilecek yer tutucu metin' }
      ]}
    />
  );
}
