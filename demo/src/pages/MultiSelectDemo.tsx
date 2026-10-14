import React, { useState } from 'react';
import { MultiSelect } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function MultiSelectDemo() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['react', 'typescript']);
  const [selectedRoles, setSelectedRoles] = useState<string[]>(['admin']);

  const techOptions = [
    { value: 'react', label: 'React 19' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'vite', label: 'Vite Bundler' },
    { value: 'dotnet', label: '.NET Core' },
    { value: 'postgres', label: 'PostgreSQL' }
  ];

  const roleOptions = [
    { value: 'admin', label: 'Sistem Yöneticisi (Admin)' },
    { value: 'editor', label: 'İçerik Editörü' },
    { value: 'viewer', label: 'Rapor İzleyici' },
    { value: 'finance', label: 'Mali İşler Sorumlusu' }
  ];

  return (
    <ComponentShowcase
      title="MultiSelect (Çoklu Seçim Çipleri)"
      category="Form & Editörler"
      description="Panoptes Kurumsal MultiSelect bileşeni: Etiketli çip rozetleri, açılır listede onay kutuları (checkbox), tek tıkla 'Tümünü Seç' ve 'Temizle' butonları, anlık metin filtreleme."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Teknoloji & Etiket Çipleri',
          description: 'Çoklu seçim yapıldıkça girdi alanında renkli rozetler (Chips) oluşur ve tek tıkla kaldırılabilir.',
          preview: (
            <div className="space-y-4 max-w-md">
              <MultiSelect
                label="Proje Teknolojileri"
                options={techOptions}
                value={selectedTags}
                onChange={setSelectedTags}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Seçili ({selectedTags.length} adet):{' '}
                <strong className="text-blue-600 font-mono">
                  {selectedTags.join(', ') || 'Hiçbiri'}
                </strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { MultiSelect } from '@panoptes/react';

const options = [
  { value: 'react', label: 'React 19' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'tailwind', label: 'Tailwind CSS' }
];

export function MultiSelectExample() {
  const [selected, setSelected] = useState(['react', 'typescript']);

  return (
    <MultiSelect
      label="Teknolojiler"
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Kullanıcı Rol Yetkilendirme',
          description: 'Birden fazla yetki ve rol ataması için checkbox destekli liste.',
          preview: (
            <div className="space-y-4 max-w-md">
              <MultiSelect
                label="Atanan Kullanıcı Rolleri"
                options={roleOptions}
                value={selectedRoles}
                onChange={setSelectedRoles}
              />
              <p className="text-[11px] text-slate-400">Kullanıcı bu rollerin tümünün yetkilerine sahip olur.</p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { MultiSelect } from '@panoptes/react';

export function RoleSelectExample() {
  const [roles, setRoles] = useState(['admin']);

  return (
    <MultiSelect
      label="Kullanıcı Rolleri"
      options={[
        { value: 'admin', label: 'Yönetici' },
        { value: 'editor', label: 'Editör' }
      ]}
      value={roles}
      onChange={setRoles}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'options', type: 'Array<{ value: string; label: string }>', description: 'Listelenecek seçenekler dizisi' },
        { name: 'value', type: 'string[]', description: 'Seçili öğelerin değerler dizisi' },
        { name: 'onChange', type: '(values: string[]) => void', description: 'Seçimler değiştiğinde tetiklenir' },
        { name: 'label', type: 'string', description: 'Girdi üst başlığı' }
      ]}
    />
  );
}
