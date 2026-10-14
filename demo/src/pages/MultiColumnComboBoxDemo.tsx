import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { MultiColumnComboBox, MultiColumnComboBoxColumn } from '@panoptes/react';

interface Employee {
  id: number;
  name: string;
  title: string;
  dept: string;
  status: string;
}

interface Product {
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export function MultiColumnComboBoxDemo() {
  const [selectedEmp, setSelectedEmp] = useState<number | string>(102);
  const [selectedProduct, setSelectedProduct] = useState<number | string>('PRD-01');

  const employees: Employee[] = [
    { id: 101, name: 'Ahmet Yılmaz', title: 'Senior Tech Lead', dept: 'Yazılım', status: 'Aktif' },
    { id: 102, name: 'Zeynep Kaya', title: 'Product Manager', dept: 'Ürün', status: 'Aktif' },
    { id: 103, name: 'Burak Demir', title: 'DevOps Mühendisi', dept: 'Altyapı', status: 'İzinde' },
    { id: 104, name: 'Elif Şahin', title: 'UI/UX Designer', dept: 'Tasarım', status: 'Aktif' },
    { id: 105, name: 'Caner Özkan', title: 'Data Scientist', dept: 'Yapay Zeka', status: 'Aktif' }
  ];

  const employeeColumns: MultiColumnComboBoxColumn[] = [
    { field: 'name', title: 'Ad Soyad', width: '180px' },
    { field: 'title', title: 'Ünvan', width: '160px' },
    { field: 'dept', title: 'Departman', width: '120px' },
    { field: 'status', title: 'Durum', width: '90px' }
  ];

  const products: Product[] = [
    { code: 'PRD-01', name: 'Dell XPS 15 9530', category: 'Laptop', price: 68500, stock: 14 },
    { code: 'PRD-02', name: 'LG UltraWide 34"', category: 'Monitör', price: 18900, stock: 8 },
    { code: 'PRD-03', name: 'Keychron Q1 Pro', category: 'Klavye', price: 6200, stock: 25 },
    { code: 'PRD-04', name: 'Logitech MX Master 3S', category: 'Mouse', price: 3450, stock: 40 }
  ];

  const productColumns: MultiColumnComboBoxColumn[] = [
    { field: 'code', title: 'Kod', width: '100px' },
    { field: 'name', title: 'Ürün Adı', width: '200px' },
    { field: 'category', title: 'Kategori', width: '110px' },
    { field: 'price', title: 'Fiyat (₺)', width: '100px' },
    { field: 'stock', title: 'Stok', width: '70px' }
  ];

  const sourceCode = `import React, { useState } from 'react';
import { MultiColumnComboBox, MultiColumnComboBoxColumn } from '@panoptes/react';

const employees = [
  { id: 101, name: 'Ahmet Yılmaz', title: 'Senior Tech Lead', dept: 'Yazılım' },
  { id: 102, name: 'Zeynep Kaya', title: 'Product Manager', dept: 'Ürün' }
];

const columns: MultiColumnComboBoxColumn[] = [
  { field: 'name', title: 'Ad Soyad', width: '180px' },
  { field: 'title', title: 'Ünvan', width: '160px' },
  { field: 'dept', title: 'Departman', width: '120px' }
];

export function MultiColumnComboBoxExample() {
  const [val, setVal] = useState<any>(101);

  return (
    <MultiColumnComboBox
      label="Çalışan Seçin (Grid Görünümlü Açılır Liste)"
      data={employees}
      columns={columns}
      textField="name"
      valueField="id"
      value={val}
      onChange={(v) => setVal(v)}
      placeholder="Arama yapın veya seçin..."
    />
  );
}`;

  return (
    <ComponentShowcase
      title="MultiColumnComboBox"
      description="Açılır menü içerisinde birden fazla sütun (grid tarzı tablo) barındırarak, zengin veri kayıtlarının detaylı karşılaştırılarak aranmasını ve seçilmesini sağlayan kurumsal bileşen."
      sourceCode={sourceCode}
      props={[
        { name: 'data', type: 'any[]', description: 'Görüntülenecek veri dizisi.' },
        { name: 'columns', type: 'MultiColumnComboBoxColumn[]', description: 'Grid açılır kutusundaki sütun tanımları (field, title, width).' },
        { name: 'textField', type: 'string', description: 'Giriş kutusunda gösterilecek alan adı.' },
        { name: 'valueField', type: 'string', description: 'Benzersiz değer alanı (ID/Primary Key).' },
        { name: 'value', type: 'any', description: 'Seçili olan kaydın valueField değeri.' },
        { name: 'onChange', type: '(value: any) => void', description: 'Yeni bir kayıt seçildiğinde tetiklenen callback.' },
        { name: 'label', type: 'string', description: 'Bileşenin üst etiket metni.' },
        { name: 'placeholder', type: 'string', defaultValue: "'Seçiniz...'", description: 'Placeholder metni.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Bileşenin kilitli durumu.' }
      ]}
    >
      <div className="flex flex-col gap-7 max-w-xl relative overflow-visible">
        {/* Örnek 1: Personel Seçimi */}
        <div className="relative z-30 hover:z-50 focus-within:z-50 overflow-visible">
          <MultiColumnComboBox
            label="1. Personel Seçimi (Ad, Ünvan, Departman ve Durum Tablosu)"
            data={employees}
            columns={employeeColumns}
            textField="name"
            valueField="id"
            value={selectedEmp}
            onChange={(val) => setSelectedEmp(val)}
            placeholder="Personel ara veya seç..."
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            Seçili Personel ID: <strong>{selectedEmp}</strong>
          </div>
        </div>

        {/* Örnek 2: Stok / Ürün Seçimi */}
        <div className="relative z-20 hover:z-50 focus-within:z-50 overflow-visible">
          <MultiColumnComboBox
            label="2. Ürün & Stok Seçimi (Kod, Ürün, Kategori, Fiyat, Stok)"
            data={products}
            columns={productColumns}
            textField="name"
            valueField="code"
            value={selectedProduct}
            onChange={(val) => setSelectedProduct(val)}
            placeholder="Ürün adı veya kodu yazın..."
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            Seçili Ürün Kodu: <strong>{selectedProduct}</strong>
          </div>
        </div>

        {/* Örnek 3: Devre Dışı */}
        <div className="relative z-10 hover:z-50 focus-within:z-50 overflow-visible">
          <MultiColumnComboBox
            label="3. Devre Dışı (Disabled)"
            data={products}
            columns={productColumns}
            textField="name"
            valueField="code"
            value="PRD-01"
            disabled={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
