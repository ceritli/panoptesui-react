import React, { useState } from 'react';
import { DateTimePicker } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function DateTimePickerDemo() {
  const [val1, setVal1] = useState('2026-10-12T14:30');
  const [val2, setVal2] = useState('2026-10-31T23:59');

  return (
    <ComponentShowcase
      title="DateTimePicker (Tarih & Saat Seçici)"
      category="Form & Editörler"
      description="Panoptes Kurumsal DateTimePicker bileşeni: Tek entegre popover üzerinde birleşik takvim ve saat seçimi, Türkiye 24 saatlik standardı ve klavye gezintisi."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Etkinlik & Randevu Zamanı',
          description: 'Birleşik tarih ve saat seçimi ile kesin zaman belirleme.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DateTimePicker
                label="Planlanan Yayın / Etkinlik Zamanı"
                value={val1}
                onChange={setVal1}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                Seçili Zaman: <strong className="font-mono text-blue-600 text-sm">{val1}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DateTimePicker } from '@panoptes/react';

export function BasicDateTimePicker() {
  const [dateTime, setDateTime] = useState('2026-10-12T14:30');

  return (
    <DateTimePicker
      label="Etkinlik Zamanı"
      value={dateTime}
      onChange={setDateTime}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Son Başvuru / Bitiş Zamanı',
          description: 'Kampanya veya başvuru için son tarih ve saat belirleme.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DateTimePicker
                label="Son Başvuru Tarih & Saati"
                value={val2}
                onChange={setVal2}
              />
              <p className="text-[11px] text-slate-400">Belirtilen tarihte saat 23:59 itibarıyla sistem otomatik kapanır.</p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DateTimePicker } from '@panoptes/react';

export function DeadlineDateTimePicker() {
  const [deadline, setDeadline] = useState('2026-10-31T23:59');

  return (
    <DateTimePicker
      label="Son Başvuru Zamanı"
      value={deadline}
      onChange={setDeadline}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'string', description: 'Seçili tarih ve saat (YYYY-MM-DDTHH:mm)' },
        { name: 'onChange', type: '(val: string) => void', description: 'Değer değiştiğinde tetiklenir' },
        { name: 'label', type: 'string', description: 'Girdi üst başlığı' }
      ]}
    />
  );
}
