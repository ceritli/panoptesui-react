import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { TabStrip, TabItem } from '@panoptes/react';

export function TabStripDemo() {
  const [activeTab, setActiveTab] = useState('profile');

  const mainTabs: TabItem[] = [
    {
      id: 'profile',
      title: 'Kullanıcı Profili',
      icon: '👤',
      content: (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800">Hesap & Profil Detayları</h4>
          <p className="text-xs text-slate-600">
            Adınız, soyadınız, e-posta adresiniz ve kurumsal departman bilgileriniz burada listelenir.
          </p>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
            <div><strong>Ad Soyad:</strong> Deniz Arslan</div>
            <div><strong>E-posta:</strong> deniz@panoptes.dev</div>
            <div><strong>Rol:</strong> Kıdemli Sistem Mimarı</div>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: '🔔',
      badge: '3 Yeni',
      content: (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-slate-800">Okunmamış Bildirimler (3)</h4>
          <div className="space-y-1.5 text-xs">
            <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-blue-900">
              ⚡ Yeni sunucu yedeklemesi başarıyla tamamlandı.
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900">
              ⚠️ Veritabanı CPU kullanımı %82 seviyesine ulaştı.
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
              ✅ Q3 Satış Raporu onaylandı.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      title: 'Güvenlik & Şifre',
      icon: '🛡️',
      content: (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-800">Güvenlik Yapılandırması</h4>
          <p className="text-xs text-slate-600">
            İki faktörlü kimlik doğrulama (2FA) aktif. Son başarılı oturum açma: Bugün 09:41 (İstanbul / Türkiye).
          </p>
          <button
            type="button"
            className="px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Şifre Değiştir
          </button>
        </div>
      )
    },
    {
      id: 'billing',
      title: 'Fatura & Ödeme (Pasif)',
      icon: '💳',
      disabled: true,
      content: <div>Fatura bilgileri yetkiniz dahilinde değil.</div>
    }
  ];

  return (
    <ComponentShowcase
      title="TabStrip"
      category="TabStrip"
      description="Sekmeli içerik geçiş bileşeni. Rozetler (badge), ikonlar, devre dışı sekmeler ve üst/alt sekme çubuğu konumlandırmasını destekler."
      propsRows={[
        { name: 'tabs', type: 'TabItem[]', default: '[]', description: 'Sekme tanımları listesi ({ id, title, icon?, badge?, disabled?, content }).' },
        { name: 'defaultTabId', type: 'string', default: "tabs[0].id", description: 'Açılışta aktif olacak sekmenin benzersiz kimliği.' },
        { name: 'position', type: "'top' | 'bottom'", default: "'top'", description: 'Sekme başlık çubuğunun konumu.' },
        { name: 'onTabChange', type: '(id: string) => void', default: '-', description: 'Sekme değiştirildiğinde çağrılan fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Üst Konumlu Sekmeler & Bildirim Rozeti',
          description: 'İkonlu, rozetli ve devre dışı sekmeler içeren standart üst sekme düzeni.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <TabStrip
                tabs={mainTabs}
                defaultTabId="profile"
                position="top"
                onTabChange={setActiveTab}
              />
              <div className="text-xs text-slate-500">
                Aktif Sekme ID: <strong>{activeTab}</strong>
              </div>
            </div>
          ),
          code: `import { TabStrip } from '@panoptes/react';

export function UserTabsDemo() {
  const tabs = [
    { id: 'profile', title: 'Profil', icon: '👤', content: <div>Profil Detayları</div> },
    { id: 'notes', title: 'Bildirimler', badge: 3, content: <div>Bildirim Listesi</div> },
    { id: 'security', title: 'Güvenlik', content: <div>2FA ve Şifre</div> }
  ];

  return <TabStrip tabs={tabs} position="top" />;
}`
        }
      ]}
    />
  );
}
