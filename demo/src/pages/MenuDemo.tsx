import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Menu, MenuItem } from '@panoptes/react';

export function MenuDemo() {
  const [selectedAction, setSelectedAction] = useState<string>('Henüz bir menü öğesi seçilmedi.');

  const horizontalMenuItems: MenuItem[] = [
    {
      id: 'file',
      label: 'Dosya',
      items: [
        { id: 'new', label: 'Yeni Belge', icon: '📄', onClick: () => setSelectedAction('Yeni Belge oluşturuldu') },
        { id: 'open', label: 'Aç...', icon: '📂', onClick: () => setSelectedAction('Dosya aç iletişim kutusu çağrıldı') },
        { id: 'sep1', label: '', separator: true },
        { id: 'save', label: 'Kaydet', icon: '💾', onClick: () => setSelectedAction('Belge kaydedildi') },
        { id: 'export', label: 'Dışa Aktar (PDF/Excel)', icon: '📤', onClick: () => setSelectedAction('Dışa aktarma başlatıldı') }
      ]
    },
    {
      id: 'edit',
      label: 'Düzenle',
      items: [
        { id: 'undo', label: 'Geri Al (Ctrl+Z)', icon: '↩️', onClick: () => setSelectedAction('Geri Alındı') },
        { id: 'redo', label: 'Yinele (Ctrl+Y)', icon: '↪️', onClick: () => setSelectedAction('Yinelendi') },
        { id: 'sep2', label: '', separator: true },
        { id: 'cut', label: 'Kes', icon: '✂️', onClick: () => setSelectedAction('Panoya kesildi') },
        { id: 'copy', label: 'Kopyala', icon: '📋', onClick: () => setSelectedAction('Panoya kopyalandı') },
        { id: 'paste', label: 'Yapıştır', icon: '📌', onClick: () => setSelectedAction('Panodan yapıştırıldı') }
      ]
    },
    {
      id: 'view',
      label: 'Görünüm',
      items: [
        { id: 'fullscreen', label: 'Tam Ekran Modu', icon: '⛶', onClick: () => setSelectedAction('Tam ekran açıldı') },
        { id: 'darkmode', label: 'Koyu Tema Aç/Kapat', icon: '🌙', onClick: () => setSelectedAction('Tema değiştirildi') }
      ]
    },
    {
      id: 'disabled-item',
      label: 'Gelişmiş Seçenekler',
      disabled: true
    }
  ];

  const verticalMenuItems: MenuItem[] = [
    { id: 'dash', label: 'Gösterge Paneli', icon: '📊', onClick: () => setSelectedAction('Dashboard seçildi') },
    {
      id: 'reports',
      label: 'Finansal Raporlar',
      icon: '📈',
      items: [
        { id: 'q1', label: 'Q1 Bilanço Tablosu', onClick: () => setSelectedAction('Q1 Raporu açıldı') },
        { id: 'q2', label: 'Q2 Bilanço Tablosu', onClick: () => setSelectedAction('Q2 Raporu açıldı') },
        { id: 'annual', label: 'Yıllık Kar/Zarar', onClick: () => setSelectedAction('Yıllık Rapor açıldı') }
      ]
    },
    { id: 'users', label: 'Kullanıcı & Roller', icon: '👥', onClick: () => setSelectedAction('Kullanıcı Yönetimi açıldı') },
    { id: 'settings', label: 'Sistem Ayarları', icon: '⚙️', onClick: () => setSelectedAction('Sistem Ayarları açıldı') }
  ];

  return (
    <ComponentShowcase
      title="Menu"
      category="Menu"
      description="Yatay veya dikey hiyerarşik açılır menü navigasyonu. Çok katmanlı alt menüler, simgeler, ayırıcı çizgiler ve klavye/fare etkileşimi desteği sağlar."
      propsRows={[
        { name: 'items', type: 'MenuItem[]', default: '[]', description: 'Menü hiyerarşisi ({ id, label, icon?, disabled?, separator?, items?, onClick? }).' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Menünün yatay veya dikey dizilimi.' },
        { name: 'onSelect', type: '(item: MenuItem) => void', default: '-', description: 'Bir menü seçeneğine tıklandığında tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Yatay Uygulama Menüsü (App Bar)',
          description: 'Masaüstü uygulamalarındaki Dosya / Düzenle / Görünüm tarzı yatay menü çubuğu.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-2xl">
                <Menu
                  items={horizontalMenuItems}
                  orientation="horizontal"
                  onSelect={item => setSelectedAction(`Seçilen: ${item.label}`)}
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
                Son Eylem: <strong>{selectedAction}</strong>
              </div>
            </div>
          ),
          code: `import { Menu } from '@panoptes/react';

export function HorizontalMenuDemo() {
  const items = [
    {
      id: 'file',
      label: 'Dosya',
      items: [
        { id: 'new', label: 'Yeni Belge', icon: '📄' },
        { id: 'save', label: 'Kaydet', icon: '💾' }
      ]
    },
    {
      id: 'edit',
      label: 'Düzenle',
      items: [
        { id: 'undo', label: 'Geri Al', icon: '↩️' }
      ]
    }
  ];

  return <Menu items={items} orientation="horizontal" />;
}`
        },
        {
          title: 'Dikey Kenar Menüsü (Sidebar Navigation)',
          description: 'Yönetim panelleri için dikey hiyerarşik yan menü.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-2xl">
                <Menu
                  items={verticalMenuItems}
                  orientation="vertical"
                  onSelect={item => setSelectedAction(`Dikey Menü: ${item.label}`)}
                />
              </div>
            </div>
          ),
          code: `import { Menu } from '@panoptes/react';

export function VerticalMenuDemo() {
  const items = [
    { id: 'dash', label: 'Gösterge Paneli', icon: '📊' },
    {
      id: 'reports',
      label: 'Raporlar',
      icon: '📈',
      items: [
        { id: 'q1', label: 'Q1 Bilanço' },
        { id: 'q2', label: 'Q2 Bilanço' }
      ]
    },
    { id: 'settings', label: 'Ayarlar', icon: '⚙️' }
  ];

  return <Menu items={items} orientation="vertical" />;
}`
        }
      ]}
    />
  );
}
