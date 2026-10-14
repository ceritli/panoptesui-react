import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Tooltip } from '@panoptes/react';

export function TooltipDemo() {
  return (
    <ComponentShowcase
      title="Tooltip (Bilgi İpucu)"
      category="Tooltip"
      description="Herhangi bir öğenin üzerine gelindiğinde (hover) zengin açıklama metni veya arayüz parçacığı gösteren mikro ipucu bileşeni. 4 yönlü (üst, alt, sol, sağ) konumlandırma destekler."
      propsRows={[
        { name: 'content', type: 'React.ReactNode', default: "''", description: 'İpucu penceresi içinde görüntülenecek içerik.' },
        { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'İpucunun hedef öğeye göre açılma yönü.' },
        { name: 'children', type: 'React.ReactNode', default: '-', description: 'Üzerine gelindiğinde ipucunu tetikleyen hedef bileşen.' }
      ]}
      examples={[
        {
          title: '4 Yönlü Konumlandırma (Üst, Alt, Sol, Sağ)',
          description: 'Farklı yönlere doğru açılan ipucu balonları.',
          preview: (
            <div className="space-y-6 max-w-lg">
              <div className="flex flex-wrap items-center justify-center gap-6 p-8 bg-slate-50 border border-slate-200 rounded-2xl">
                <Tooltip content="Üstte açılan bilgilendirme ipucu" position="top">
                  <button type="button" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
                    ⬆️ Üst (Top)
                  </button>
                </Tooltip>

                <Tooltip content="Altta açılan detay açıklaması" position="bottom">
                  <button type="button" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
                    ⬇️ Alt (Bottom)
                  </button>
                </Tooltip>

                <Tooltip content="Solda açılan ipucu" position="left">
                  <button type="button" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
                    ⬅️ Sol (Left)
                  </button>
                </Tooltip>

                <Tooltip content="Sağda açılan ipucu" position="right">
                  <button type="button" className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 cursor-pointer">
                    ➡️ Sağ (Right)
                  </button>
                </Tooltip>
              </div>
            </div>
          ),
          code: `import { Tooltip } from '@panoptes/react';

export function TooltipDirectionsDemo() {
  return (
    <div className="flex gap-4">
      <Tooltip content="Üst Bilgi" position="top">
        <button>Üst</button>
      </Tooltip>
      <Tooltip content="Sağ Bilgi" position="right">
        <button>Sağ</button>
      </Tooltip>
    </div>
  );
}`
        }
      ]}
    />
  );
}
