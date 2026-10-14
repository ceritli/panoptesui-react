import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Slider } from '@panoptes/react';

export function SliderDemo() {
  const [volume, setVolume] = useState(65);
  const [discount, setDiscount] = useState(15);
  const [budget, setBudget] = useState(25000);

  const sourceCode = `import React, { useState } from 'react';
import { Slider } from '@panoptes/react';

export function SliderExample() {
  const [volume, setVolume] = useState(70);

  return (
    <Slider
      label="Ses Düzeyi"
      min={0}
      max={100}
      step={5}
      value={volume}
      onChange={setVolume}
    />
  );
}`;

  return (
    <ComponentShowcase
      title="Slider"
      description="Kullanıcıların belirli bir sayısal aralıkta sezgisel olarak sürükleyerek değer seçmesini sağlayan kaydırıcı (slider) bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Kaydırıcının üstündeki başlık etiketi.' },
        { name: 'value', type: 'number', defaultValue: '50', description: 'Mevcut sayısal değer.' },
        { name: 'min', type: 'number', defaultValue: '0', description: 'Minimum seçilebilir sınır değer.' },
        { name: 'max', type: 'number', defaultValue: '100', description: 'Maksimum seçilebilir sınır değer.' },
        { name: 'step', type: 'number', defaultValue: '1', description: 'Her kaydırma veya tuş vuruşundaki adım miktarı.' },
        { name: 'onChange', type: '(val: number) => void', description: 'Değer değiştiğinde tetiklenen olay fonksiyonu.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '520px' }}>
        {/* Örnek 1: Ses / Yüzde Slider */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Yüzdelik Oran Seçimi (Adım: 5)
          </h4>
          <Slider
            label="İskonto Oranı (%)"
            min={0}
            max={50}
            step={5}
            value={discount}
            onChange={setDiscount}
          />
        </div>

        {/* Örnek 2: Hassas Değer Kaydırıcısı */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Hassas Değer Kaydırıcısı (0 - 100, Adım: 1)
          </h4>
          <Slider
            label="Hoparlör Ses Seviyesi"
            min={0}
            max={100}
            step={1}
            value={volume}
            onChange={setVolume}
          />
        </div>

        {/* Örnek 3: Büyük Aralık / Bütçe */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Büyük Aralık (5.000₺ - 100.000₺, Adım: 2.500₺)
          </h4>
          <Slider
            label="Yıllık Proje Bütçesi (₺)"
            min={5000}
            max={100000}
            step={2500}
            value={budget}
            onChange={setBudget}
          />
          <div style={{ marginTop: '10px', fontSize: '13px', color: '#0f766e', fontWeight: 'bold' }}>
            Seçilen Bütçe: {budget.toLocaleString('tr-TR')} ₺
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
