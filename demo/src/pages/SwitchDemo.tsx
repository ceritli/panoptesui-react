import React, { useState } from 'react';
import { Switch } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function SwitchDemo() {
  const [sw1, setSw1] = useState(true);
  const [sw2, setSw2] = useState(false);
  const [sw3, setSw3] = useState(true);

  return (
    <ComponentShowcase
      title="Switch (Aç/Kapa Anahtar)"
      category="Form & Editörler"
      description="Panoptes Kurumsal Switch bileşeni: Akıcı animasyonlu geçiş anahtarı, açık/kapalı durum etiketleri (onLabel, offLabel), devre dışı modu ve React boolean state kontrolü."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Temel Aç/Kapa Anahtarı',
          description: 'Açık / Kapalı durum metinleri ile modern bildirim anahtarı.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <Switch
                label="E-Posta Bildirimleri"
                checked={sw1}
                onLabel="Açık"
                offLabel="Kapalı"
                onChange={setSw1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Durum: <strong className={sw1 ? 'text-emerald-600 font-bold' : 'text-slate-500 font-bold'}>
                  {sw1 ? '✓ Bildirimler Aktif' : '✕ Bildirimler Kapalı'}
                </strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { Switch } from '@panoptes/react';

export function BasicSwitchExample() {
  const [enabled, setEnabled] = useState(true);

  return (
    <Switch
      label="E-Posta Bildirimleri"
      checked={enabled}
      onLabel="Açık"
      offLabel="Kapalı"
      onChange={setEnabled}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Sistem Ayarları (Karanlık Mod & İki Adımlı Doğrulama)',
          description: 'Çoklu anahtar grupları ve devre dışı (disabled) durum örneği.',
          preview: (
            <div className="space-y-3 max-w-sm">
              <Switch
                label="Karanlık Mod (Dark Theme)"
                checked={sw2}
                onChange={setSw2}
              />
              <Switch
                label="İki Adımlı Doğrulama (2FA - Zorunlu)"
                checked={sw3}
                disabled={true}
                onChange={setSw3}
              />
              <p className="text-[11px] text-slate-400">2FA kurumsal güvenlik politikası gereği zorunludur ve değiştirilemez.</p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { Switch } from '@panoptes/react';

export function SystemSettingsSwitch() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-3">
      <Switch label="Karanlık Mod" checked={darkMode} onChange={setDarkMode} />
      <Switch label="2FA Doğrulama" checked={true} disabled={true} />
    </div>
  );
}`
        }
      ]}
      propsList={[
        { name: 'checked', type: 'boolean', description: 'Anahtarın aktif/pasif durumu' },
        { name: 'onChange', type: '(checked: boolean) => void', description: 'Anahtar tıklandığında tetiklenir' },
        { name: 'onLabel', type: 'string', description: 'Açıkken gösterilecek metin' },
        { name: 'offLabel', type: 'string', description: 'Kapalıyken gösterilecek metin' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Tıklamayı engeller' }
      ]}
    />
  );
}
