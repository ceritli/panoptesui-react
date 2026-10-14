import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { CheckBox } from '@panoptes/react';

export function CheckBoxDemo() {
  const [agree, setAgree] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(true);
  const [items, setItems] = useState([
    { id: 'opt1', label: 'E-posta Bildirimleri', checked: true },
    { id: 'opt2', label: 'SMS Bildirimleri', checked: false },
    { id: 'opt3', label: 'Tarayıcı Push Bildirimleri', checked: false }
  ]);

  const handleSelectAllChange = (checked: boolean) => {
    setSelectAll(checked);
    setIsIndeterminate(false);
    setItems(items.map(item => ({ ...item, checked })));
  };

  const handleItemChange = (id: string, checked: boolean) => {
    const next = items.map(item => (item.id === id ? { ...item, checked } : item));
    setItems(next);
    const allChecked = next.every(i => i.checked);
    const noneChecked = next.every(i => !i.checked);
    if (allChecked) {
      setSelectAll(true);
      setIsIndeterminate(false);
    } else if (noneChecked) {
      setSelectAll(false);
      setIsIndeterminate(false);
    } else {
      setSelectAll(false);
      setIsIndeterminate(true);
    }
  };

  const sourceCode = `import React, { useState } from 'react';
import { CheckBox } from '@panoptes/react';

export function CheckBoxExample() {
  const [agree, setAgree] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Temel İşaret Kutusu */}
      <CheckBox
        label="Kullanım Koşullarını ve KVKK metnini okudum, onaylıyorum."
        checked={agree}
        onChange={setAgree}
      />

      {/* 2. Belirsiz (Indeterminate / Üç Durumlu) Kutu */}
      <CheckBox
        label="Tüm Bildirimleri Seç (Kısmi Seçim)"
        checked={selectAll}
        indeterminate={indeterminate}
        onChange={(checked) => {
          setSelectAll(checked);
          setIndeterminate(false);
        }}
      />

      {/* 3. Devre Dışı (Disabled) Durum */}
      <CheckBox
        label="Sistem Tarafından Zorunlu Güvenlik Doğrulaması (Devre Dışı)"
        checked={true}
        disabled={true}
      />
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="CheckBox"
      description="Kullanıcının ikili (seçili/seçili değil) ya da üç durumlu (indeterminate - kısmi seçili) seçimler yapmasını sağlayan modern işaret kutusu bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'İşaret kutusunun yanında görüntülenecek açıklayıcı metin.' },
        { name: 'checked', type: 'boolean', defaultValue: 'false', description: 'Kutunun seçili olup olmadığını belirler.' },
        { name: 'indeterminate', type: 'boolean', defaultValue: 'false', description: 'Kısmi seçim (üçüncü durum) simgesini aktif eder.' },
        { name: 'onChange', type: '(checked: boolean) => void', description: 'Kullanıcı kutuyu tıkladığında tetiklenen geri çağırım fonksiyonu.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'İşaret kutusunu devre dışı bırakır ve tıklamayı engeller.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '540px' }}>
        {/* Örnek 1: Temel Kullanım */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>1. Temel İşaret Kutusu</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CheckBox
              label="Kullanım koşullarını ve gizlilik politikasını kabul ediyorum."
              checked={agree}
              onChange={setAgree}
            />
            <CheckBox
              label="Bülten ve kampanya duyurularını e-posta ile almak istiyorum."
              checked={newsletter}
              onChange={setNewsletter}
            />
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#64748b' }}>
            Onay Durumu: <strong style={{ color: agree ? '#16a34a' : '#ea580c' }}>{agree ? 'Onaylandı' : 'Onay Bekleniyor'}</strong>
          </div>
        </div>

        {/* Örnek 2: Üç Durumlu (Indeterminate) Hiyerarşik Seçim */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Hiyerarşik ve Belirsiz (Indeterminate) Seçim
          </h4>
          <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px dashed #cbd5e1' }}>
            <CheckBox
              label="Tüm Bildirim Tercihlerini Seç"
              checked={selectAll}
              indeterminate={isIndeterminate}
              onChange={handleSelectAllChange}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '24px' }}>
            {items.map(item => (
              <CheckBox
                key={item.id}
                label={item.label}
                checked={item.checked}
                onChange={val => handleItemChange(item.id, val)}
              />
            ))}
          </div>
        </div>

        {/* Örnek 3: Devre Dışı Durumlar */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>3. Devre Dışı (Disabled) Durumlar</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <CheckBox label="Devre Dışı ve Seçili Değil" checked={false} disabled={true} />
            <CheckBox label="Devre Dışı ve Seçili (Kilitli Tercih)" checked={true} disabled={true} />
          </div>
        </div>
      </div>
    </ComponentShowcase>
  );
}
