import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { ColorPicker } from '@panoptes/react';

export function ColorPickerDemo() {
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [textColor, setTextColor] = useState('#0f172a');
  const [accentColor, setAccentColor] = useState('#f59e0b');

  const sourceCode = `import React, { useState } from 'react';
import { ColorPicker } from '@panoptes/react';

export function ColorPickerExample() {
  const [color, setColor] = useState('#2563eb');

  return (
    <div>
      <ColorPicker
        label="Marka Ana Rengi"
        value={color}
        onChange={setColor}
      />
      <div style={{ marginTop: '16px', padding: '16px', background: color, color: '#fff', borderRadius: '8px' }}>
        Önizleme Kutusu ({color})
      </div>
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="ColorPicker"
      description="Kullanıcıların renk paletinden ya da renk tekerleğinden HEX, RGB formatlarında renk seçmesini sağlayan zengin renk seçici bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Renk seçici üstünde gösterilecek başlık etiketi.' },
        { name: 'value', type: 'string', defaultValue: "'#3b82f6'", description: 'Mevcut HEX renk değeri.' },
        { name: 'onChange', type: '(color: string) => void', description: 'Renk değiştiğinde tetiklenen geri bildirim fonksiyonu.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Renk seçiciyi kilitler.' }
      ]}
    >
      <div className="flex flex-col gap-6 max-w-xl relative overflow-visible">
        {/* Örnek 1: Marka Renk Paleti */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative z-30 hover:z-50 focus-within:z-50 overflow-visible">
          <h4 className="text-sm font-bold text-slate-800 mb-3">
            1. Tema ve Marka Rengi Seçimi
          </h4>
          <div className="flex flex-wrap gap-6 relative overflow-visible">
            <div className="relative z-30 hover:z-50 focus-within:z-50">
              <ColorPicker
                label="Ana Renk"
                value={primaryColor}
                onChange={setPrimaryColor}
              />
            </div>
            <div className="relative z-20 hover:z-50 focus-within:z-50">
              <ColorPicker
                label="Vurgu Rengi"
                value={accentColor}
                onChange={setAccentColor}
              />
            </div>
            <div className="relative z-10 hover:z-50 focus-within:z-50">
              <ColorPicker
                label="Metin Rengi"
                value={textColor}
                onChange={setTextColor}
              />
            </div>
          </div>

          {/* Dinamik Önizleme Kartı */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '8px',
              background: '#ffffff',
              border: `2px solid ${primaryColor}`,
              color: textColor
            }}
          >
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>
              Canlı Tema Kartı
            </div>
            <p style={{ margin: '0 0 10px 0', fontSize: '13px' }}>
              Seçtiğiniz renk paleti anlık olarak bu kart üzerine uygulanmaktadır.
            </p>
            <button
              type="button"
              style={{
                background: accentColor,
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Vurgu Butonu
            </button>
          </div>
        </div>

        {/* Örnek 2: Devre Dışı Durum */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 relative z-10 hover:z-50 focus-within:z-50 overflow-visible">
          <h4 className="text-sm font-bold text-slate-800 mb-3">
            2. Devre Dışı (Disabled) Renk Seçici
          </h4>
          <ColorPicker
            label="Kilitli Sistem Rengi"
            value="#64748b"
            disabled={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
