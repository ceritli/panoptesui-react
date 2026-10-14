import React, { useState } from 'react';
import { TimePicker } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function TimePickerDemo() {
  const [time1, setTime1] = useState('09:00');
  const [time2, setTime2] = useState('17:45');

  return (
    <ComponentShowcase
      title="TimePicker (Saat Seçici)"
      category="Form & Editörler"
      description="Panoptes Kurumsal TimePicker bileşeni: 24 saatlik format, saat ve dakika seçim paneli, dakika adım aralığı (step: 15, 30 dk) ve temizleme butonu."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Randevu Başlangıç Saati (15 Dakika Adımlı)',
          description: 'Çeyrek saatlik adımlama (09:00, 09:15, 09:30, ...) ve 24 saat gösterimi.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <TimePicker
                label="Toplantı Başlangıç Saati"
                value={time1}
                step={15}
                onChange={setTime1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Seçili Saat: <strong className="font-mono text-blue-600 text-sm">{time1}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TimePicker } from '@panoptes/react';

export function BasicTimePicker() {
  const [time, setTime] = useState('09:00');

  return (
    <TimePicker
      label="Toplantı Saati"
      value={time}
      step={15}
      onChange={setTime}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Mesai Bitiş Saati & Hızlı Değer Seçimi',
          description: 'Hızlı butonlarla saat atama ve anlık güncelleme.',
          preview: (
            <div className="space-y-4 max-w-xs">
              <TimePicker
                label="Mesai Bitişi"
                value={time2}
                step={30}
                onChange={setTime2}
              />
              <div className="flex gap-2">
                {['17:00', '18:00', '19:30'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTime2(t)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TimePicker } from '@panoptes/react';

export function QuickSelectTimePicker() {
  const [time, setTime] = useState('17:45');

  return (
    <TimePicker
      label="Mesai Bitişi"
      value={time}
      step={30}
      onChange={setTime}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'string', description: 'Seçili saat değeri (HH:mm)' },
        { name: 'onChange', type: '(time: string) => void', description: 'Saat değiştiğinde tetiklenir' },
        { name: 'step', type: 'number', default: '15', description: 'Dakika adımlama aralığı' },
        { name: 'label', type: 'string', description: 'Girdi kutusu üst etiketi' }
      ]}
    />
  );
}
