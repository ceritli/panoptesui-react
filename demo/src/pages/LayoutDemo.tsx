import React, { useState } from 'react';
import { TabStrip, PanelBar, TreeView, Stepper, Breadcrumb, Splitter, TileLayout } from '@panoptes/react';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function LayoutDemo() {
  const [step, setStep] = useState(1);

  const tabs = [
    {
      id: 'tab1',
      title: 'Genel Bilgiler',
      badge: 3,
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800">Şirket Profili</h4>
          <p className="text-xs text-slate-600">
            Panoptes UI kurumsal web uygulamaları için geliştirilmiş yüksek performanslı arayüz kütüphanesidir.
          </p>
        </div>
      )
    },
    {
      id: 'tab2',
      title: 'Güvenlik Ayarları',
      badge: 'Yeni',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800">İki Adımlı Doğrulama</h4>
          <p className="text-xs text-slate-600">
            Hesap güvenliğiniz için 2FA SMS veya TOTP kodunu aktif edebilirsiniz.
          </p>
        </div>
      )
    },
    {
      id: 'tab3',
      title: 'Faturalandırma',
      content: (
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800">Abonelik & Ödeme</h4>
          <p className="text-xs text-slate-600">
            Mevcut kurumsal planınız aktif ve sonraki yenileme 2027 yılındadır.
          </p>
        </div>
      )
    }
  ];

  const panels = [
    {
      id: 'p1',
      title: '1. Veri Tabanı Bağlantısı',
      subtitle: 'PostgreSQL / SQL Server Entegrasyonu',
      icon: '🗄️',
      content: (
        <div className="p-2 space-y-1">
          <p>Veri tabanı havuzu aktif: 10/20 bağlantı kullanımda.</p>
        </div>
      )
    },
    {
      id: 'p2',
      title: '2. Önbellek & Performans (Redis)',
      subtitle: 'Hızlı Sorgu Önbellekleme',
      icon: '⚡',
      content: (
        <div className="p-2 space-y-1">
          <p>Redis önbellek hit oranı: %98.4. Ortalama yanıt süresi: 4ms.</p>
        </div>
      )
    },
    {
      id: 'p3',
      title: '3. Güvenlik Duvarı (WAF)',
      subtitle: 'DDoS ve Bot Koruması',
      icon: '🛡️',
      content: (
        <div className="p-2 space-y-1">
          <p>Son 24 saatte 1,420 şüpheli istek engellendi.</p>
        </div>
      )
    }
  ];

  const treeData = [
    {
      id: 'root',
      label: 'Panoptes Proje Dizini',
      children: [
        {
          id: 'src',
          label: 'src',
          children: [
            { id: 'components', label: 'components (Bileşenler)', icon: '🧩' },
            { id: 'pages', label: 'pages (Sayfalar)', icon: '📄' },
            { id: 'types', label: 'types.ts', icon: '📝' }
          ]
        },
        {
          id: 'public',
          label: 'public',
          children: [{ id: 'data', label: 'products.json', icon: '📊' }]
        },
        { id: 'package', label: 'package.json', icon: '📦' }
      ]
    }
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Navigasyon & Yerleşim Bileşenleri
        </span>
        <h1 className="text-3xl font-black mt-2">Panoptes Yerleşim & Navigasyon Bileşenleri</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Sekmeli paneller (TabStrip), akordeon (PanelBar), ağaç görünümü (TreeView), sihirbaz (Stepper) ve yol çubuğu (Breadcrumb).
        </p>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <Breadcrumb
          items={[
            { label: 'Anasayfa', url: '/' },
            { label: 'Yönetim Paneli', url: '/admin' },
            { label: 'Navigasyon & Yerleşim' }
          ]}
        />
      </div>

      {/* Stepper */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-800">Stepper (Adım Sihirbazı)</h3>
        <Stepper
          steps={[
            { label: '1. Hesap', description: 'Giriş bilgileri' },
            { label: '2. Şirket', description: 'Kurumsal profil' },
            { label: '3. Tercihler', description: 'Bildirim & Tema' },
            { label: '4. Onay', description: 'Tamamlama' }
          ]}
          currentStep={step}
          onStepChange={setStep}
        />
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep(Math.max(0, step - 1))}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold disabled:opacity-30 cursor-pointer"
          >
            ← Önceki Adım
          </button>
          <button
            type="button"
            disabled={step === 3}
            onClick={() => setStep(Math.min(3, step + 1))}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold disabled:opacity-30 cursor-pointer"
          >
            Sonraki Adım →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* TabStrip */}
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">TabStrip (Sekmeli Panel)</h3>
          <TabStrip tabs={tabs} />
        </div>

        {/* PanelBar */}
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">PanelBar (Akordeon)</h3>
          <PanelBar items={panels} />
        </div>
      </div>

      {/* TreeView */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-sm font-black text-slate-800">TreeView (Klasör & Ağaç Yapısı)</h3>
        <TreeView data={treeData} checkable={true} />
      </div>

      {/* Splitter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-black text-slate-800">Splitter (Panel Bölücü)</h3>
          <span className="text-xs text-slate-400">Ortadaki çubuğu sürükleyerek boyutlandırın</span>
        </div>
        <Splitter
          leftPane={
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Sol Panel (Gezgin)</h4>
              <p className="text-slate-600">Burada dosya listesi veya filtreler yer alabilir.</p>
            </div>
          }
          rightPane={
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Sağ Panel (Önizleme & Detay)</h4>
              <p className="text-slate-600">Seçili öğenin detayları veya çalışma alanı.</p>
            </div>
          }
        />
      </div>

      {/* TileLayout */}
      <div className="space-y-2">
        <h3 className="text-sm font-black text-slate-800">TileLayout (Pano & Dashboard Düzeni)</h3>
        <TileLayout
          tiles={[
            {
              id: 't1',
              title: 'Canlı Satış Metriği',
              colSpan: 1,
              content: (
                <div className="text-2xl font-black text-emerald-600">
                  ₺284,500 <span className="text-xs text-slate-400 font-normal">Bu Ay</span>
                </div>
              )
            },
            {
              id: 't2',
              title: 'Aktif Kullanıcılar',
              colSpan: 1,
              content: (
                <div className="text-2xl font-black text-blue-600">
                  1,842 <span className="text-xs text-slate-400 font-normal">Çevrimiçi</span>
                </div>
              )
            },
            {
              id: 't3',
              title: 'Sunucu Sağlığı',
              colSpan: 1,
              content: (
                <div className="text-2xl font-black text-indigo-600">
                  %99.98 <span className="text-xs text-slate-400 font-normal">Uptime</span>
                </div>
              )
            }
          ]}
        />
      </div>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (Layout & Navigation Overview)"
          code={`import { TabStrip, PanelBar, Stepper, TileLayout } from '@panoptes/react';

export function NavigationLayoutExample() {
  return (
    <div className="space-y-6">
      <TabStrip tabs={[{ id: '1', title: 'Genel', content: 'İçerik 1' }]} />
      <Stepper steps={['Adım 1', 'Adım 2', 'Tamamlandı']} activeStep={1} />
      <TileLayout columns={3} tiles={[{ id: 't1', title: 'Metrik', content: '₺284,500' }]} />
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

