import React, { useState } from 'react';
import { AutoComplete } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function AutoCompleteDemo() {
  const [selected, setSelected] = useState('');

  const fruitList = ['Elma', 'Armut', 'Muz', 'Çilek', 'Karpuz', 'Kavun', 'Portakal', 'Mandalina', 'Kiraz', 'Vişne'];
  const domainList = ['gmail.com', 'hotmail.com', 'outlook.com', 'yandex.com', 'icloud.com', 'sirket.com.tr'];

  return (
    <ComponentShowcase
      title="AutoComplete (Otomatik Tamamlama)"
      category="Form & Editörler"
      description="Panoptes Kurumsal AutoComplete bileşeni: Kullanıcı yazdıkça anında açılan otomatik tamamlama öneri paneli, minimum karakter tetikleme (min-length) ve klavye gezintisi."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Hızlı Arama & Öneri Listesi',
          description: '1 karakterden itibaren anlık eşleşen önerileri getiren tamamlama motoru.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <AutoComplete
                label="Meyve Ara (Harf yazın...)"
                placeholder="Örn: 'El' veya 'Kar' yazın..."
                suggestions={fruitList}
                minLength={1}
                onSelect={setSelected}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Seçilen Öğe: <strong className="text-blue-600 font-bold">{selected || 'Henüz seçilmedi'}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { AutoComplete } from '@panoptes/react';

const fruits = ['Elma', 'Armut', 'Muz', 'Çilek', 'Karpuz', 'Portakal'];

export function AutoCompleteExample() {
  const [value, setValue] = useState('');

  return (
    <AutoComplete
      label="Meyve Ara"
      suggestions={fruits}
      minLength={1}
      onSelect={setValue}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: E-Posta Alan Adı Önerileri',
          description: 'E-posta servis sağlayıcılarını otomatik tamamlayan alan adı önerici.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <AutoComplete
                label="E-Posta Alanı"
                placeholder="kullanici@..."
                suggestions={domainList}
                minLength={2}
                onSelect={val => alert(`Seçilen: ${val}`)}
              />
              <p className="text-[11px] text-slate-400">En az 2 karakter yazıldığında öneriler listelenir.</p>
            </div>
          ),
          code: `import React from 'react';
import { AutoComplete } from '@panoptes/react';

export function EmailAutoComplete() {
  return (
    <AutoComplete
      label="E-Posta Servisi"
      suggestions={['gmail.com', 'outlook.com', 'hotmail.com']}
      minLength={2}
      onSelect={val => console.log(val)}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'suggestions', type: 'string[]', description: 'Otomatik tamamlanacak öneri terimleri' },
        { name: 'minLength', type: 'number', default: '1', description: 'Öneri listesini açmak için gereken en az karakter sayısı' },
        { name: 'onSelect', type: '(val: string) => void', description: 'Bir öneriye tıklandığında tetiklenen callback işlevi' },
        { name: 'label', type: 'string', description: 'Girdi üst etiketi' }
      ]}
    />
  );
}
