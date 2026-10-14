import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Window } from '@panoptes/react';

export function WindowDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNonModalOpen, setIsNonModalOpen] = useState(false);

  return (
    <ComponentShowcase
      title="Window"
      category="Window"
      description="Masaüstü tarzı başlık çubuğu, büyütme/küçültme/kapatma düğmeleri, modal veya bağımsız kayan pencere modları sunan kurumsal pencere bileşeni."
      propsRows={[
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Pencerenin görünürlük durumu.' },
        { name: 'title', type: 'string', default: "''", description: 'Pencere başlık çubuğu metni.' },
        { name: 'modal', type: 'boolean', default: 'true', description: 'Arka planı karartan modal kilitlenme modu.' },
        { name: 'initialWidth', type: 'number', default: '500', description: 'Başlangıç piksel genişliği.' },
        { name: 'initialHeight', type: 'number', default: '350', description: 'Başlangıç piksel yüksekliği.' },
        { name: 'onClose', type: '() => void', default: '-', description: 'Pencere kapatıldığında çağrılan fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Modal Kilitli Detay Penceresi',
          description: 'Büyütme/küçültme butonları, sürüklenebilir başlık çubuğu ve arka plan karartmalı kurumsal modal pencere.',
          preview: (
            <div className="space-y-4 max-w-md">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <span>🪟</span>
                <span>Modal Pencereyi Aç</span>
              </button>

              <Window
                isOpen={isModalOpen}
                title="Sipariş Analiz Raporu #84920"
                modal={true}
                initialWidth={520}
                onClose={() => setIsModalOpen(false)}
              >
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600 leading-relaxed">
                    Bu pencereyi başlıktan sürükleyebilir, yeşil düğmeyle tam ekran yapabilir, sarı düğmeyle sağ alt köşeye küçültebilir veya kırmızı düğmeyle kapatabilirsiniz.
                  </p>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-slate-800">Müşteri: ACME Teknoloji A.Ş.</div>
                    <div className="text-slate-500">Tutar: ₺145.800,00 | Ödeme: Onaylandı</div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg cursor-pointer"
                    >
                      Kapat
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
                    >
                      Raporu Yazdır
                    </button>
                  </div>
                </div>
              </Window>
            </div>
          ),
          code: `import { useState } from 'react';
import { Window } from '@panoptes/react';

export function ModalWindowDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Pencereyi Aç</button>
      <Window
        isOpen={open}
        title="Rapor Penceresi"
        modal={true}
        onClose={() => setOpen(false)}
      >
        <p>Pencere İçeriği...</p>
      </Window>
    </>
  );
}`
        },
        {
          title: 'Kayan Bağımsız Araç Penceresi (Non-Modal & Draggable)',
          description: 'Arka planı kilitlemeyen, serbestçe taşınabilen ve sayfa etkileşimine izin veren bağımsız araç paneli.',
          preview: (
            <div className="space-y-4 max-w-md">
              <button
                type="button"
                onClick={() => setIsNonModalOpen(true)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <span>📌</span>
                <span>Kayan Yardımcı Pencereyi Aç</span>
              </button>

              <Window
                isOpen={isNonModalOpen}
                title="Hızlı Notlar & Görev Takibi"
                modal={false}
                initialWidth={400}
                onClose={() => setIsNonModalOpen(false)}
              >
                <div className="space-y-3 text-xs">
                  <p className="text-slate-600">
                    Bu pencere açıkken arkadaki sayfada tıklamaya ve gezinmeye devam edebilirsiniz. Başlığından tutarak istediğiniz yere sürükleyin.
                  </p>
                  <textarea
                    rows={3}
                    placeholder="Bu pencerede hızlıca bir not alın..."
                    className="w-full p-2.5 text-xs border border-slate-300 rounded-lg outline-none focus:border-blue-500"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setIsNonModalOpen(false)}
                      className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs cursor-pointer"
                    >
                      Kapat
                    </button>
                  </div>
                </div>
              </Window>
            </div>
          ),
          code: `import { useState } from 'react';
import { Window } from '@panoptes/react';

export function FloatingWindowDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Kayan Pencereyi Aç</button>
      <Window
        isOpen={open}
        title="Hızlı Notlar"
        modal={false}
        initialWidth={400}
        onClose={() => setOpen(false)}
      >
        <textarea placeholder="Not alın..." />
      </Window>
    </>
  );
}`
        }
      ]}
    />
  );
}
