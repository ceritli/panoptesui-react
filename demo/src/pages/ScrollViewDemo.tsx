import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { ScrollView } from '@panoptes/react';

export function ScrollViewDemo() {
  const cards = [
    { title: 'Yapay Zeka Destekli Filtre', color: 'from-blue-600 to-indigo-600', icon: '🤖' },
    { title: 'Excel & CSV Canlı Export', color: 'from-emerald-600 to-teal-600', icon: '📊' },
    { title: '60 FPS Sanal Satır Kaydırma', color: 'from-purple-600 to-pink-600', icon: '⚡' },
    { title: 'Çok Dilli Dinamik Çeviri', color: 'from-amber-500 to-orange-600', icon: '🌍' },
    { title: 'Rol Bazlı Kolon İzinleri', color: 'from-rose-600 to-red-600', icon: '🛡️' }
  ];

  return (
    <ComponentShowcase
      title="ScrollView (Kaydırıcı Kapsayıcı)"
      category="ScrollView"
      description="Görsel galerileri, ürün kartları ve geniş listeler için sağa-sola ok tuşları ve dokunmatik kaydırma sunan yatay veya dikey kaydırıcı bileşeni."
      propsRows={[
        { name: 'children', type: 'React.ReactNode', default: '-', description: 'Kaydırılacak kartlar veya içerik elemanları.' },
        { name: 'height', type: 'number | string', default: '300', description: 'Kaydırıcı kapsayıcının piksel veya CSS yüksekliği.' },
        { name: 'showArrows', type: 'boolean', default: 'true', description: 'Sağ ve sol gezinme ok butonlarını gösterir.' },
        { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Kaydırma yönü.' }
      ]}
      examples={[
        {
          title: 'Yatay Öne Çıkan Özellik Kartları',
          description: 'Ok butonları ve yumuşak kaydırma animasyonuna sahip yatay galeri.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <ScrollView height={180} showArrows={true} orientation="horizontal">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className={`shrink-0 w-64 h-36 rounded-2xl p-5 bg-gradient-to-br ${card.color} text-white shadow-md flex flex-col justify-between select-none`}
                  >
                    <span className="text-3xl">{card.icon}</span>
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-white/80">Panoptes v2.4</div>
                      <h4 className="text-sm font-black leading-snug">{card.title}</h4>
                    </div>
                  </div>
                ))}
              </ScrollView>
            </div>
          ),
          code: `import { ScrollView } from '@panoptes/react';

export function FeatureGalleryDemo() {
  return (
    <ScrollView height={180} showArrows={true} orientation="horizontal">
      <div className="shrink-0 w-64 bg-blue-600 text-white p-4 rounded-xl">Kart 1</div>
      <div className="shrink-0 w-64 bg-emerald-600 text-white p-4 rounded-xl">Kart 2</div>
      <div className="shrink-0 w-64 bg-purple-600 text-white p-4 rounded-xl">Kart 3</div>
    </ScrollView>
  );
}`
        }
      ]}
    />
  );
}
