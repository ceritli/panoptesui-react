import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Drawer } from '@panoptes/react';

export function DrawerDemo() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <ComponentShowcase
      title="Drawer (Yan Çekmece)"
      category="Drawer"
      description="Ekranın sağ veya sol tarafından yumuşak animasyonla kayarak açılan yan panel (off-canvas drawer) bileşeni. Sepet özeti, filtreleme paneli veya hızlı ayarlar için idealdir."
      propsRows={[
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Çekmecenin açık veya kapalı durumu.' },
        { name: 'onClose', type: '() => void', default: '-', description: 'Çekmece kapatılmak istendiğinde çağrılan fonksiyon.' },
        { name: 'title', type: 'string', default: "''", description: 'Çekmece üst başlık metni.' },
        { name: 'children', type: 'React.ReactNode', default: '-', description: 'Çekmece gövde içeriği.' }
      ]}
      examples={[
        {
          title: 'Filtreleme & Ayarlar Çekmecesi',
          description: 'Tablo ve liste ekranlarında gelişmiş filtreleri içeren yan çekmece.',
          preview: (
            <div className="space-y-4 max-w-md">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <span>⚙️</span>
                <span>Filtre & Ayarlar Çekmecesini Aç</span>
              </button>

              <Drawer
                isOpen={isDrawerOpen}
                title="Gelişmiş Filtreleme Seçenekleri"
                onClose={() => setIsDrawerOpen(false)}
              >
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tarih Aralığı</label>
                    <select className="w-full p-2 border border-slate-200 rounded-lg bg-slate-50">
                      <option>Son 7 Gün</option>
                      <option>Bu Ay</option>
                      <option>Son 1 Yıl</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Sipariş Durumu</label>
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked /> Tamamlandı
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked /> Kargoda
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" /> İptal Edildi
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(false)}
                      className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg"
                    >
                      Filtreleri Uygula
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(false)}
                      className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </Drawer>
            </div>
          ),
          code: `import { useState } from 'react';
import { Drawer } from '@panoptes/react';

export function SettingsDrawerDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Çekmeceyi Aç</button>
      <Drawer
        isOpen={open}
        title="Ayarlar"
        onClose={() => setOpen(false)}
      >
        <p>Çekmece İçeriği...</p>
      </Drawer>
    </>
  );
}`
        }
      ]}
    />
  );
}
