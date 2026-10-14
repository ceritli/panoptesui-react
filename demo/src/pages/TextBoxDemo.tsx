import React, { useState } from 'react';
import { TextBox } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function TextBoxDemo() {
  const [name, setName] = useState('Ahmet Yılmaz');
  const [email, setEmail] = useState('');
  const [errorInput, setErrorInput] = useState('Gecersiz format');

  return (
    <ComponentShowcase
      title="TextBox (Metin Kutusu)"
      category="Form & Editörler"
      description="Panoptes Kurumsal TextBox bileşeni: Tek tıkla temizleme butonu (Clear Button), sol ve sağ SVG ikon/metin ekleri (Adornments), Tailwind modern odaklanma ve doğrulama durumları."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Temizleme Butonlu Standart Metin Kutusu',
          description: 'İçerik doluyken sağ tarafta otomatik beliren tek tıkla silme butonu (X).',
          preview: (
            <div className="space-y-4 max-w-sm">
              <TextBox
                label="Ad Soyad"
                value={name}
                clearButton={true}
                placeholder="Adınızı giriniz..."
                onChange={e => setName(e.target.value)}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Mevcut Metin: <strong className="text-blue-600 font-bold">{name || '(Boş)'}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TextBox } from '@panoptes/react';

export function BasicTextBoxExample() {
  const [name, setName] = useState('Ahmet Yılmaz');

  return (
    <TextBox
      label="Ad Soyad"
      value={name}
      clearButton={true}
      placeholder="Adınızı giriniz..."
      onChange={e => setName(e.target.value)}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: İkon Ekli (Prefix) & Hata Durumu (Error State)',
          description: 'Sol tarafta e-posta SVG ikonu ve form doğrulama hata mesajı stili.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <TextBox
                label="E-Posta Adresi"
                placeholder="ornek@sirket.com"
                value={email}
                prefixIcon={<span>✉️</span>}
                onChange={e => setEmail(e.target.value)}
              />
              <TextBox
                label="Kullanıcı Adı (Hatalı Giriş)"
                value={errorInput}
                error="Bu kullanıcı adı zaten kullanımda!"
                onChange={e => setErrorInput(e.target.value)}
              />
              <span className="text-[11px] text-rose-500 font-semibold block">
                ⚠ Hata: Bu kullanıcı adı zaten kullanımda!
              </span>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TextBox } from '@panoptes/react';

export function IconTextBoxExample() {
  const [email, setEmail] = useState('');

  return (
    <TextBox
      label="E-Posta Adresi"
      placeholder="ornek@sirket.com"
      value={email}
      prefixIcon={<span>✉️</span>}
      onChange={e => setEmail(e.target.value)}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'string', description: 'Metin kutusu değeri' },
        { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Metin değiştiğinde tetiklenir' },
        { name: 'clearButton', type: 'boolean', default: 'true', description: 'Tek tıkla temizleme butonu' },
        { name: 'prefixIcon', type: 'ReactNode', description: 'Sol başa yerleşen ikon' },
        { name: 'error', type: 'string', description: 'Hata durumu ve kırmızı kenarlık bildirimi' }
      ]}
    />
  );
}
