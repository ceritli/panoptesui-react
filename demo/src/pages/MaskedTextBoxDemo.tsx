import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { MaskedTextBox } from '@panoptes/react';

export function MaskedTextBoxDemo() {
  const [phone, setPhone] = useState('5321234567');
  const [tcNo, setTcNo] = useState('');
  const [iban, setIban] = useState('TR');
  const [card, setCard] = useState('');

  const sourceCode = `import React, { useState } from 'react';
import { MaskedTextBox } from '@panoptes/react';

export function MaskedTextBoxExample() {
  const [phone, setPhone] = useState('');
  const [tcNo, setTcNo] = useState('');
  const [iban, setIban] = useState('TR');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Türkiye Telefon Formatı */}
      <MaskedTextBox
        label="Cep Telefonu"
        mask="(000) 000-0000"
        value={phone}
        onChange={setPhone}
      />

      {/* 2. T.C. Kimlik No Maskesi */}
      <MaskedTextBox
        label="T.C. Kimlik Numarası"
        mask="00000000000"
        value={tcNo}
        onChange={setTcNo}
      />

      {/* 3. IBAN Numarası */}
      <MaskedTextBox
        label="Banka IBAN"
        mask="TR00 0000 0000 0000 0000 0000 00"
        value={iban}
        onChange={setIban}
      />
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="MaskedTextBox"
      description="Kullanıcıdan belirli bir kalıp veya formatta (telefon, TC kimlik, IBAN, kredi kartı vb.) veri girişini zorunlu kılan, geçersiz karakterleri anında filtreleyen maskeli metin kutusu."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Girdi kutusu üstünde gösterilen etiket.' },
        { name: 'mask', type: 'string', defaultValue: "''(boş)", description: 'Girdi kalıbı (0: rakam, L: harf, a: alfasayısal).' },
        { name: 'value', type: 'string', description: 'Metin kutusunun mevcut değeri.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Değer değiştikçe tetiklenen fonksiyon.' },
        { name: 'prompt', type: 'string', defaultValue: "'_'", description: 'Boş karakterlerin yerine gösterilecek sembol.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Bileşeni kilitler ve veri girişini engeller.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '540px' }}>
        {/* Örnek 1: Cep Telefonu */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Telefon Numarası Maskesi (TR)
          </h4>
          <MaskedTextBox
            label="GSM Numaranız"
            mask="(90) 000 000 00 00"
            value={phone}
            onChange={setPhone}
          />
          <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b' }}>
            Ham Değer: <strong style={{ color: '#0284c7' }}>{phone || '(boş)'}</strong>
          </div>
        </div>

        {/* Örnek 2: T.C. Kimlik No */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. T.C. Kimlik Numarası (11 Hane)
          </h4>
          <MaskedTextBox
            label="T.C. Kimlik No"
            mask="00000000000"
            value={tcNo}
            onChange={setTcNo}
          />
        </div>

        {/* Örnek 3: IBAN Formatı */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Banka Hesap IBAN Maskesi
          </h4>
          <MaskedTextBox
            label="IBAN"
            mask="TR00 0000 0000 0000 0000 0000 00"
            value={iban}
            onChange={setIban}
          />
        </div>

        {/* Örnek 4: Kredi Kartı Maskesi */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            4. Kredi Kartı Numarası
          </h4>
          <MaskedTextBox
            label="Kart Numarası"
            mask="0000 - 0000 - 0000 - 0000"
            value={card}
            onChange={setCard}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
