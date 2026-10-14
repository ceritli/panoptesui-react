import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { DropDownTree, DropDownTreeNode } from '@panoptes/react';

export function DropDownTreeDemo() {
  const [selectedDept, setSelectedDept] = useState<string | number>('fe');
  const [selectedCategory, setSelectedCategory] = useState<string | number>('laptops');

  const orgTree: DropDownTreeNode[] = [
    {
      id: 'tech',
      text: 'Teknoloji & Mühendislik',
      items: [
        {
          id: 'dev',
          text: 'Yazılım Geliştirme',
          items: [
            { id: 'fe', text: 'Frontend Departmanı (React / TS)' },
            { id: 'be', text: 'Backend Departmanı (.NET / Go)' },
            { id: 'mob', text: 'Mobil Ekip (Flutter / Swift)' }
          ]
        },
        {
          id: 'infra',
          text: 'Altyapı & Bulut',
          items: [
            { id: 'devops', text: 'DevOps & SRE' },
            { id: 'sec', text: 'Bilgi Güvenliği (SecOps)' }
          ]
        }
      ]
    },
    {
      id: 'biz',
      text: 'İş Geliştirme & Operasyon',
      items: [
        { id: 'sales', text: 'Kurumsal Satış' },
        { id: 'mkt', text: 'Pazarlama & Büyüme' }
      ]
    }
  ];

  const categoryTree: DropDownTreeNode[] = [
    {
      id: 'elec',
      text: 'Elektronik & Bilgisayar',
      items: [
        { id: 'laptops', text: 'Dizüstü Bilgisayarlar' },
        { id: 'servers', text: 'Sunucu Donanımları' },
        { id: 'monitors', text: 'Monitör & Ekranlar' }
      ]
    },
    {
      id: 'acc',
      text: 'Aksesuarlar & Çevre Birimleri',
      items: [
        { id: 'keyboards', text: 'Mekanik Klavyeler' },
        { id: 'cables', text: 'Fiber & Ağ Kabloları' }
      ]
    }
  ];

  const sourceCode = `import React, { useState } from 'react';
import { DropDownTree, DropDownTreeNode } from '@panoptes/react';

const treeData: DropDownTreeNode[] = [
  {
    id: 'tech',
    text: 'Teknoloji',
    items: [
      { id: 'fe', text: 'Frontend Ekibi' },
      { id: 'be', text: 'Backend Ekibi' }
    ]
  }
];

export function DropDownTreeExample() {
  const [val, setVal] = useState<string | number>('fe');

  return (
    <DropDownTree
      label="Departman / Hiyerarşik Birim"
      data={treeData}
      value={val}
      onChange={(newVal) => setVal(newVal)}
      placeholder="Birim seçiniz..."
    />
  );
}`;

  return (
    <ComponentShowcase
      title="DropDownTree"
      description="Açılır menü içerisinde hiyerarşik ağaç yapısı (TreeView) barındırarak, kategori veya organizasyon şeması gibi derinlikli verilerden tek seçim yapılmasını sağlayan bileşen."
      sourceCode={sourceCode}
      props={[
        { name: 'data', type: 'DropDownTreeNode[]', description: 'Ağaç hiyerarşisini içeren düğüm nesneleri (id, text, items).' },
        { name: 'value', type: 'string | number', description: 'Seçili olan düğümün ID değeri.' },
        { name: 'onChange', type: '(id: string | number) => void', description: 'Bir düğüm tıklandığında seçilen ID ile tetiklenir.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Seçiniz...'", description: 'Herhangi bir seçim yapılmadığında gösterilen metin.' },
        { name: 'label', type: 'string', description: 'Bileşenin üst etiket metni.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Bileşenin kilitli/pasif durumu.' }
      ]}
    >
      <div className="flex flex-col gap-6 max-w-lg relative overflow-visible">
        {/* Örnek 1: Organizasyon Şeması */}
        <div className="relative z-30 hover:z-50 focus-within:z-50 overflow-visible">
          <DropDownTree
            label="1. Organizasyonel Birim Seçimi"
            data={orgTree}
            value={selectedDept}
            onChange={(val) => setSelectedDept(val)}
            placeholder="Departman seçiniz..."
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            Seçili Düğüm ID: <strong>{selectedDept}</strong>
          </div>
        </div>

        {/* Örnek 2: Ürün Kategorisi */}
        <div className="relative z-20 hover:z-50 focus-within:z-50 overflow-visible">
          <DropDownTree
            label="2. Ürün Kategorisi (Katalog Ağacı)"
            data={categoryTree}
            value={selectedCategory}
            onChange={(val) => setSelectedCategory(val)}
            placeholder="Kategori seçin..."
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            Seçili Kategori ID: <strong>{selectedCategory}</strong>
          </div>
        </div>

        {/* Örnek 3: Devre Dışı */}
        <div className="relative z-10 hover:z-50 focus-within:z-50 overflow-visible">
          <DropDownTree
            label="3. Devre Dışı (Disabled)"
            data={orgTree}
            value="be"
            disabled={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
