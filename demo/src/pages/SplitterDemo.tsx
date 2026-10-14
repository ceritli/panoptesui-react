import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Splitter } from '@panoptes/react';

export function SplitterDemo() {
  return (
    <ComponentShowcase
      title="Splitter (Panel Bölücü)"
      category="Splitter"
      description="Ekranı dikey veya yatay olarak yeniden boyutlandırılabilir panellere ayıran bölücü bileşeni. IDE benzeri kod editörleri, önizleme ekranları ve çift pencereli arayüzler için kullanılır."
      propsRows={[
        { name: 'leftPane', type: 'React.ReactNode', default: '-', description: 'Sol (veya üst) panelin içeriği.' },
        { name: 'rightPane', type: 'React.ReactNode', default: '-', description: 'Sağ (veya alt) panelin içeriği.' },
        { name: 'initialSplit', type: 'number', default: '50', description: 'Başlangıç bölme yüzdesi (örn. 30, 50, 70).' }
      ]}
      examples={[
        {
          title: 'Dosya Gezgini & Önizleme Bölücüsü',
          description: 'Sol panelde klasör listesi, sağ panelde seçili dosya detayları yer alır. Ortadaki çubuğu sürükleyerek boyutlandırabilirsiniz.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <Splitter
                initialSplit={35}
                leftPane={
                  <div className="space-y-2 text-xs">
                    <div className="font-bold text-slate-800 pb-1 border-b border-slate-200">
                      📂 Proje Dosyaları (Sol Panel)
                    </div>
                    <ul className="space-y-1 text-slate-600">
                      <li className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">📄 main.tsx</li>
                      <li className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer bg-blue-50 text-blue-700 font-bold">
                        📄 PanoptesGrid.tsx
                      </li>
                      <li className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">📄 styles.css</li>
                      <li className="p-1.5 hover:bg-slate-100 rounded-lg cursor-pointer">📄 package.json</li>
                    </ul>
                  </div>
                }
                rightPane={
                  <div className="space-y-2 text-xs">
                    <div className="font-bold text-slate-800 pb-1 border-b border-slate-200">
                      👁️ Dosya Önizleme: PanoptesGrid.tsx (Sağ Panel)
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      PanoptesGrid, 60 FPS sanallaştırma, filtreleme, sıralama, gruplama ve Excel dışa aktarımı sağlayan yüksek performanslı kurumsal tablo motorudur.
                    </p>
                    <div className="p-3 bg-slate-900 text-emerald-400 font-mono rounded-lg text-[10px]">
                      export function PanoptesGrid&lt;T&gt;() &#123; ... &#125;
                    </div>
                  </div>
                }
              />
            </div>
          ),
          code: `import { Splitter } from '@panoptes/react';

export function CodePreviewSplitterDemo() {
  return (
    <Splitter
      initialSplit={35}
      leftPane={<div>Sol Panel (Klasörler)</div>}
      rightPane={<div>Sağ Panel (Önizleme)</div>}
    />
  );
}`
        }
      ]}
    />
  );
}
