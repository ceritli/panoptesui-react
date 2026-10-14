import React, { useState } from 'react';
import { NumericTextBox } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function NumericTextBoxDemo() {
  const [val1, setVal1] = useState(1250);
  const [val2, setVal2] = useState(15);
  const [val3, setVal3] = useState(85.5);

  return (
    <ComponentShowcase
      title="NumericTextBox (Sayı & Para Formatı)"
      category="Form & Editörler"
      description="Panoptes Kurumsal NumericTextBox bileşeni: Para birimi (₺, $, €) biçimlendirme, yukarı/aşağı spin butonları, min/max aralık koruması, hassasiyet ayarı ve klavye ok tuşları."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Türk Lirası Para Formatı (₺)',
          description: 'Para birimi ön eki, ondalık biçimlendirme ve spin butonları.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <NumericTextBox
                label="Birim Fiyat"
                value={val1}
                prefix="₺"
                min={0}
                step={50}
                onChange={setVal1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Değer: <strong className="font-mono text-emerald-600 text-sm">₺{val1.toLocaleString('tr-TR')}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { NumericTextBox } from '@panoptes/react';

export function CurrencyNumericExample() {
  const [price, setPrice] = useState(1250);

  return (
    <NumericTextBox
      label="Birim Fiyat"
      value={price}
      prefix="₺"
      min={0}
      step={50}
      onChange={setPrice}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Adet & Yüzde Formatı (Min: 1, Max: 100)',
          description: 'Sipariş miktarı veya yüzde indirim oranı için sınırlandırılmış sayısal girdi.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <NumericTextBox
                label="Sipariş Adedi (1 - 50)"
                value={val2}
                min={1}
                max={50}
                step={1}
                onChange={setVal2}
              />
              <NumericTextBox
                label="İndirim Oranı"
                value={val3}
                suffix="%"
                min={0}
                max={100}
                step={0.5}
                onChange={setVal3}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { NumericTextBox } from '@panoptes/react';

export function PercentageNumericExample() {
  const [discount, setDiscount] = useState(85.5);

  return (
    <NumericTextBox
      label="İndirim Oranı"
      value={discount}
      suffix="%"
      min={0}
      max={100}
      step={0.5}
      onChange={setDiscount}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'number', description: 'Girdi kutusunun sayısal değeri' },
        { name: 'onChange', type: '(val: number) => void', description: 'Değer değiştiğinde tetiklenir' },
        { name: 'min', type: 'number', description: 'Girilebilecek en küçük sayı' },
        { name: 'max', type: 'number', description: 'Girilebilecek en büyük sayı' },
        { name: 'step', type: 'number', default: '1', description: 'Yukarı/aşağı ok adımı' },
        { name: 'prefix', type: 'string', description: 'Ön ek simgesi (₺, $, €)' },
        { name: 'suffix', type: 'string', description: 'Son ek simgesi (%, kg, adet)' }
      ]}
    />
  );
}
