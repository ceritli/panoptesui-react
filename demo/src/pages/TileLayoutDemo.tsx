import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { TileLayout, TileItem } from '@panoptes/react';

export function TileLayoutDemo() {
  const dashboardTiles: TileItem[] = [
    {
      id: 'kpi1',
      title: 'Toplam Satış Hacmi',
      colSpan: 1,
      content: (
        <div className="space-y-1">
          <div className="text-2xl font-black text-slate-900">₺1.842.500</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <span>▲ +%18.4</span>
            <span className="text-slate-400 font-normal">geçen aya göre</span>
          </div>
        </div>
      )
    },
    {
      id: 'kpi2',
      title: 'Aktif Aboneler',
      colSpan: 1,
      content: (
        <div className="space-y-1">
          <div className="text-2xl font-black text-slate-900">14.280</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <span>▲ +%5.2</span>
            <span className="text-slate-400 font-normal">net büyüme</span>
          </div>
        </div>
      )
    },
    {
      id: 'kpi3',
      title: 'Dönüşüm Oranı',
      colSpan: 1,
      content: (
        <div className="space-y-1">
          <div className="text-2xl font-black text-slate-900">%4.82</div>
          <div className="text-[11px] text-blue-600 font-bold flex items-center gap-1">
            <span>● Kararlı</span>
            <span className="text-slate-400 font-normal">hedef %5.00</span>
          </div>
        </div>
      )
    },
    {
      id: 'chart-tile',
      title: 'Aylık Gelir Trendi & Tahmini',
      colSpan: 2,
      content: (
        <div className="space-y-2">
          <div className="h-28 flex items-end gap-2 pt-4 border-b border-slate-100">
            {[45, 60, 55, 80, 75, 95, 110, 105, 130].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  style={{ height: `${(h / 140) * 100}%` }}
                  className="w-full bg-blue-500 rounded-t-md hover:bg-blue-600 transition"
                />
                <span className="text-[9px] text-slate-400">A{i + 1}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 flex justify-between">
            <span>Minimum: ₺45.000</span>
            <span>Maksimum: ₺130.000</span>
          </div>
        </div>
      )
    },
    {
      id: 'activity-tile',
      title: 'Son Sistem Olayları',
      colSpan: 1,
      content: (
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-slate-50 rounded-lg">
            <div className="font-bold text-slate-800">Veritabanı Senkronizasyonu</div>
            <div className="text-[10px] text-slate-400">12 dk önce • Başarılı</div>
          </div>
          <div className="p-2 bg-slate-50 rounded-lg">
            <div className="font-bold text-slate-800">Yeni API Anahtarı Üretildi</div>
            <div className="text-[10px] text-slate-400">45 dk önce • Admin</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ComponentShowcase
      title="TileLayout (Pano & Dashboard Düzeni)"
      category="TileLayout"
      description="Dashboard panoları ve analitik widget'lar için çok sütunlu kart (tile) ızgara düzeni. Sütun genişliği (colSpan), başlık çubukları ve esnek yerleşim desteği sağlar."
      propsRows={[
        { name: 'tiles', type: 'TileItem[]', default: '[]', description: 'Pano kartları listesi ({ id, title, colSpan?, content }).' }
      ]}
      examples={[
        {
          title: 'Yönetim Gösterge Paneli (3 Sütunlu Grid)',
          description: 'KPI özet kartları, 2 sütun kaplayan gelir grafiği ve etkinlik listesi.',
          preview: (
            <div className="space-y-4 max-w-3xl">
              <TileLayout tiles={dashboardTiles} />
            </div>
          ),
          code: `import { TileLayout } from '@panoptes/react';

export function DashboardTileDemo() {
  const tiles = [
    { id: '1', title: 'Toplam Satış', colSpan: 1, content: <div>₺1.842.500</div> },
    { id: '2', title: 'Aktif Aboneler', colSpan: 1, content: <div>14.280</div> },
    { id: '3', title: 'Trend Grafiği', colSpan: 2, content: <div>Gelir Grafiği</div> }
  ];

  return <TileLayout tiles={tiles} />;
}`
        }
      ]}
    />
  );
}
