import React, { useState } from 'react';
import { DateRangePicker } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function DateRangePickerDemo() {
  const [start1, setStart1] = useState('2026-10-01');
  const [end1, setEnd1] = useState('2026-10-15');

  const [start2, setStart2] = useState('');
  const [end2, setEnd2] = useState('');

  return (
    <ComponentShowcase
      title="DateRangePicker (Tarih Aralığı)"
      category="Form & Editörler"
      description="Panoptes Kurumsal DateRangePicker bileşeni: Başlangıç ve bitiş tarihlerini birleşik veya çift kutuda seçtiren modern aralık belirleyici, hızlı önayarlar ve anlık aralık doğrulama."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Başlangıç & Bitiş Tarih Aralığı',
          description: 'Raporlama ve sipariş listeleri için çift tarih seçici ve canlı state takibi.',
          preview: (
            <div className="space-y-4 max-w-md">
              <DateRangePicker
                label="Raporlama Tarih Aralığı"
                startDate={start1}
                endDate={end1}
                onChange={(start, end) => {
                  setStart1(start);
                  setEnd1(end);
                }}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between items-center">
                <span>Başlangıç: <strong className="font-mono text-blue-600">{start1}</strong></span>
                <span>→</span>
                <span>Bitiş: <strong className="font-mono text-blue-600">{end1}</strong></span>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DateRangePicker } from '@panoptes/react';

export function BasicDateRangePicker() {
  const [startDate, setStartDate] = useState('2026-10-01');
  const [endDate, setEndDate] = useState('2026-10-15');

  return (
    <DateRangePicker
      label="Raporlama Tarih Aralığı"
      startDate={startDate}
      endDate={endDate}
      onChange={(start, end) => {
        setStartDate(start);
        setEndDate(end);
      }}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Boş Başlangıç Durumu & Rezervasyon Seçimi',
          description: 'Kullanıcının henüz seçim yapmadığı boş durum ve anlık tarih doldurma.',
          preview: (
            <div className="space-y-4 max-w-md">
              <DateRangePicker
                label="Otel Konaklama Aralığı"
                startDate={start2}
                endDate={end2}
                onChange={(s, e) => {
                  setStart2(s);
                  setEnd2(e);
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setStart2('2026-10-12');
                    setEnd2('2026-10-19');
                  }}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Önayar: Sonraki 7 Gün
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStart2('');
                    setEnd2('');
                  }}
                  className="px-3 py-1 bg-rose-50 hover:bg-rose-100 rounded-lg text-xs font-bold text-rose-600 cursor-pointer"
                >
                  Temizle
                </button>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DateRangePicker } from '@panoptes/react';

export function PresetDateRangePicker() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  return (
    <DateRangePicker
      label="Konaklama Aralığı"
      startDate={start}
      endDate={end}
      onChange={(s, e) => {
        setStart(s);
        setEnd(e);
      }}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'startDate', type: 'string', description: 'Seçili başlangıç tarihi (YYYY-MM-DD)' },
        { name: 'endDate', type: 'string', description: 'Seçili bitiş tarihi (YYYY-MM-DD)' },
        { name: 'onChange', type: '(start: string, end: string) => void', description: 'Tarihlerden biri değiştiğinde tetiklenir' },
        { name: 'label', type: 'string', description: 'Girdi üst başlık metni' }
      ]}
    />
  );
}
