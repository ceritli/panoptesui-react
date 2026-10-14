import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { PanelBar, PanelItem } from '@panoptes/react';

export function PanelBarDemo() {
  const accordionItems: PanelItem[] = [
    {
      id: 'step1',
      title: '1. Adım: Kişisel Bilgiler & İletişim',
      subtitle: 'Kimlik ve adres doğrulama',
      icon: '📝',
      content: (
        <div className="space-y-2 py-2">
          <p>T.C. Kimlik numaranız, doğum tarihiniz ve resmi ikametgah adresiniz sisteme girilmiştir.</p>
          <div className="text-[11px] text-emerald-600 font-bold">✓ Adım onaylandı</div>
        </div>
      )
    },
    {
      id: 'step2',
      title: '2. Adım: Vergi & Şirket Evrakları',
      subtitle: 'Vergi levhası ve imza sirküleri',
      icon: '🏢',
      content: (
        <div className="space-y-2 py-2">
          <p>Son mali yıla ait onaylı vergi levhası ve yetkili imza sirküleri sisteme yüklenmelidir.</p>
          <button type="button" className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg cursor-pointer">
            Evrak Yükle
          </button>
        </div>
      )
    },
    {
      id: 'step3',
      title: '3. Adım: Banka Hesabı & IBAN Tanımlama',
      subtitle: 'Ödeme ve tahsilat hesabı',
      icon: '💳',
      content: (
        <div className="space-y-2 py-2">
          <p>Şirket unvanı ile birebir uyuşan TR uzantılı 26 haneli IBAN numaranızı giriniz.</p>
          <input
            type="text"
            placeholder="TR00 0000 0000 0000 0000 0000 00"
            className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50"
          />
        </div>
      )
    }
  ];

  return (
    <ComponentShowcase
      title="PanelBar (Accordion)"
      category="PanelBar"
      description="Açılır-kapanır paneller ve akordiyon (accordion) yapısı sunan düzen bileşeni. Tekli veya çoklu panel açılma modunu, alt başlıkları ve ikonları destekler."
      propsRows={[
        { name: 'items', type: 'PanelItem[]', default: '[]', description: 'Panel öğeleri listesi ({ id, title, subtitle?, icon?, content }).' },
        { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Birden fazla panelin aynı anda açık kalmasına izin verir.' }
      ]}
      examples={[
        {
          title: 'Akordiyon Modu (Tek Açılır Panel)',
          description: 'Bir panel açıldığında diğerlerinin otomatik kapandığı standart akordiyon modu.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <PanelBar
                items={accordionItems}
                allowMultiple={false}
              />
            </div>
          ),
          code: `import { PanelBar } from '@panoptes/react';

export function SinglePanelBarDemo() {
  const items = [
    { id: '1', title: 'Adım 1: Kişisel Bilgiler', content: <div>İçerik 1</div> },
    { id: '2', title: 'Adım 2: Şirket Evrakları', content: <div>İçerik 2</div> },
    { id: '3', title: 'Adım 3: Banka Hesabı', content: <div>İçerik 3</div> }
  ];

  return <PanelBar items={items} allowMultiple={false} />;
}`
        },
        {
          title: 'Çoklu Panel Modu (allowMultiple)',
          description: 'Kullanıcının birden fazla paneli aynı anda açık tutabildiği mod.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <PanelBar
                items={accordionItems}
                allowMultiple={true}
              />
            </div>
          ),
          code: `import { PanelBar } from '@panoptes/react';

export function MultiPanelBarDemo() {
  return <PanelBar items={items} allowMultiple={true} />;
}`
        }
      ]}
    />
  );
}
