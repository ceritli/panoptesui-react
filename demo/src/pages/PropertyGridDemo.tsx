import React, { useState } from 'react';
import { PropertyGrid, PropertyItem } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function PropertyGridDemo() {
  const [componentProps, setComponentProps] = useState<PropertyItem[]>([
    { id: 'title', name: 'Tablo Başlığı', category: 'Genel', value: 'Sipariş Yönetimi Grid', type: 'text' },
    { id: 'pageSize', name: 'Sayfa Boyutu', category: 'Genel', value: 20, type: 'number' },
    { id: 'sorting', name: 'Sıralama Aktif', category: 'Davranış', value: true, type: 'boolean' },
    { id: 'filtering', name: 'Filtre Modu', category: 'Davranış', value: 'Popover', type: 'select', options: ['Popover', 'Row', 'Menu', 'Kapalı'] },
    { id: 'themeColor', name: 'Vurgu Rengi', category: 'Görünüm', value: '#2563eb', type: 'color' },
    { id: 'darkMode', name: 'Karanlık Tema', category: 'Görünüm', value: false, type: 'boolean' }
  ]);

  const [lastChange, setLastChange] = useState<{ id: string; val: any } | null>(null);

  return (
    <ComponentShowcase
      title="PropertyGrid (Özellik Düzenleyici)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal PropertyGrid bileşeni: Herhangi bir nesnenin veya bileşenin özelliklerini kategorize ederek listeleyen dinamik denetleyici ızgarası. Metin, sayı, boolean anahtar, açılır liste ve renk seçici editör tipleri."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Grid Yapılandırma Özellik Denetleyicisi',
          description: 'Özellikleri doğrudan değiştirin ve canlı state geri bildirimini gözlemleyin.',
          preview: (
            <div className="space-y-4 w-full">
              <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <span>Son Değişen Özellik: </span>
                {lastChange ? (
                  <span className="font-mono font-bold text-blue-600">
                    {lastChange.id} = {String(lastChange.val)}
                  </span>
                ) : (
                  <span className="text-slate-400">Henüz değişiklik yapılmadı</span>
                )}
              </div>

              <PropertyGrid
                properties={componentProps}
                onChange={(id, val) => setLastChange({ id, val })}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { PropertyGrid, PropertyItem } from '@panoptes/react';

export function PropertyGridExample() {
  const [props, setProps] = useState<PropertyItem[]>([
    { id: 'title', name: 'Tablo Başlığı', category: 'Genel', value: 'Müşteri Listesi', type: 'text' },
    { id: 'pageSize', name: 'Sayfa Boyutu', category: 'Genel', value: 25, type: 'number' },
    { id: 'allowSorting', name: 'Çoklu Sıralama', category: 'Davranış', value: true, type: 'boolean' },
    { id: 'themeColor', name: 'Tema Rengi', category: 'Görünüm', value: '#3b82f6', type: 'color' }
  ]);

  return (
    <PropertyGrid
      properties={props}
      onChange={(id, value) => console.log(id, value)}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'properties', type: 'PropertyItem[]', description: 'Düzenlenecek özellik listesi (id, name, category, value, type, options)' },
        { name: 'onChange', type: '(id: string, value: any) => void', description: 'Bir özellik değeri güncellendiğinde tetiklenen callback işlevi' }
      ]}
    />
  );
}
