import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { RadioGroup } from '@panoptes/react';

export function RadioGroupDemo() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('cc');
  const [theme, setTheme] = useState('system');

  const planOptions = [
    { value: 'free', label: 'Başlangıç Planı (0 ₺ / Ay)' },
    { value: 'pro', label: 'Profesyonel Plan (299 ₺ / Ay)' },
    { value: 'enterprise', label: 'Kurumsal Özel Plan (Teklif Alın)' }
  ];

  const paymentOptions = [
    { value: 'cc', label: 'Kredi Kartı' },
    { value: 'eft', label: 'Havale / EFT' },
    { value: 'crypto', label: 'Kripto Varlık' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Açık Tema' },
    { value: 'dark', label: 'Koyu Tema' },
    { value: 'system', label: 'Sistem Tercihi' }
  ];

  const sourceCode = `import React, { useState } from 'react';
import { RadioGroup } from '@panoptes/react';

export function RadioGroupExample() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [paymentMethod, setPaymentMethod] = useState('cc');

  const planOptions = [
    { value: 'free', label: 'Başlangıç Planı (0 ₺)' },
    { value: 'pro', label: 'Profesyonel Plan (299 ₺)' },
    { value: 'enterprise', label: 'Kurumsal Özel Plan' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Dikey Hizalanmış Radyo Grubu */}
      <RadioGroup
        label="Abonelik Paketini Seçin"
        options={planOptions}
        value={selectedPlan}
        onChange={setSelectedPlan}
        layout="vertical"
      />

      {/* 2. Yatay (Horizontal) Hizalanmış Radyo Grubu */}
      <RadioGroup
        label="Ödeme Yöntemi"
        options={[
          { value: 'cc', label: 'Kredi Kartı' },
          { value: 'eft', label: 'Havale / EFT' }
        ]}
        value={paymentMethod}
        onChange={setPaymentMethod}
        layout="horizontal"
      />
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="RadioGroup"
      description="Karşılıklı olarak birbirini dışlayan bir dizi seçenek arasından kullanıcının yalnızca tek bir tanesini seçmesine olanak sağlayan radyo buton grubu bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Radyo grubunun başlık etiketi.' },
        { name: 'options', type: 'Array<{ value: string; label: string }>', description: 'Listelenecek radyo buton seçenekleri dizisi.' },
        { name: 'value', type: 'string', description: 'Seçili olan radyo butonunun değeri.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Seçim değiştiğinde tetiklenen geri çağırım fonksiyonu.' },
        { name: 'layout', type: "'vertical' | 'horizontal'", defaultValue: "'vertical'", description: 'Seçeneklerin dikey mi yoksa yatay mı hizalanacağını belirler.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '540px' }}>
        {/* Örnek 1: Dikey Hizalanmış Abonelik Planı */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Dikey Hizalama (Vertical Layout)
          </h4>
          <RadioGroup
            label="Abonelik Planınızı Belirleyin"
            options={planOptions}
            value={selectedPlan}
            onChange={setSelectedPlan}
            layout="vertical"
          />
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
            Seçilen Paket Kodu: <strong style={{ color: '#0284c7' }}>{selectedPlan}</strong>
          </div>
        </div>

        {/* Örnek 2: Yatay Hizalama */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Yatay Hizalama (Horizontal Layout)
          </h4>
          <RadioGroup
            label="Ödeme Metodu Tercihi"
            options={paymentOptions}
            value={paymentMethod}
            onChange={setPaymentMethod}
            layout="horizontal"
          />
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
            Seçilen Yöntem: <strong style={{ color: '#16a34a' }}>{paymentMethod}</strong>
          </div>
        </div>

        {/* Örnek 3: Sistem Ayarı */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Arayüz Tema Tercihi
          </h4>
          <RadioGroup
            label="Görsel Tema"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
            layout="horizontal"
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
