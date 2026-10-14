import React, { useState } from 'react';
import { DatePicker } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function DatePickerDemo() {
  const [date1, setDate1] = useState('2026-10-12');
  const [date2, setDate2] = useState('2026-10-25');
  const [date3, setDate3] = useState('2026-10-15');
  const [date4, setDate4] = useState('2026-10-09');

  return (
    <ComponentShowcase
      title="DatePicker (Tarih Seçici)"
      category="Form & Editörler"
      description="Gelişmiş kurumsal React DatePicker bileşeni. Özel popover takvim penceresi, Ay/Yıl/On Yıl (Decade) kademeli görünüm gezinmesi, hafta numaraları (#), pasif hafta sonları, min/max kısıtlamaları, tek tıkla 'Bugün' seçimi ve klavye dostu yapı."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Temel Kullanım & Özel Popover Takvim',
          description: 'Modern takvim popover açılır penceresi. Başlığa tıklayarak Ay → Yıl → On Yıl hiyerarşisinde gezinilebilir. Tek tıkla "Bugün" ve "Temizle" butonları içerir.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DatePicker
                label="Fatura / Sözleşme Tarihi"
                value={date1}
                onChange={setDate1}
                clearable={true}
              />
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
                <span className="text-slate-500">Seçilen Değer (ISO):</span>
                <strong className="text-blue-600 font-mono">{date1 || 'Seçilmedi'}</strong>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DatePicker } from '@panoptes/react';

export function BasicDatePickerExample() {
  const [date, setDate] = useState('2026-10-12');

  return (
    <div className="max-w-sm">
      <DatePicker
        label="Fatura / Sözleşme Tarihi"
        value={date}
        onChange={setDate}
        clearable={true}
      />
      <p className="mt-2 text-xs text-slate-500">
        Seçilen: {date}
      </p>
    </div>
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Min / Max Tarih Kısıtlaması',
          description: 'Belirtilen minimum (min: 2026-10-01) ve maksimum (max: 2026-12-31) tarih sınırları dışındaki günler takvimde devre dışı (disabled & üzeri çizgili) gösterilir.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DatePicker
                label="Teslimat Tarihi (Ekim - Aralık 2026)"
                value={date2}
                min="2026-10-01"
                max="2026-12-31"
                onChange={setDate2}
              />
              <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-800">
                ⚠️ Yalnızca <strong>01.10.2026</strong> ile <strong>31.12.2026</strong> arasındaki tarihler seçilebilir.
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DatePicker } from '@panoptes/react';

export function MinMaxDatePickerExample() {
  const [date, setDate] = useState('2026-10-25');

  return (
    <DatePicker
      label="Teslimat Tarihi (Ekim - Aralık 2026)"
      value={date}
      min="2026-10-01"
      max="2026-12-31"
      onChange={setDate}
    />
  );
}`
        },
        {
          id: 'ex3',
          title: 'Örnek 3: Hafta Numaraları & Hafta Sonu Engelleme (Disabled Dates)',
          description: 'Hafta numaralarını (# sütunu) gösterir ve Cumartesi/Pazar günlerini otomatik olarak pasif kılar (disabledDates="weekend").',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DatePicker
                label="İş Günü Randevu Seçimi"
                value={date3}
                weekNumber={true}
                disabledDates="weekend"
                onChange={setDate3}
              />
              <p className="text-[11px] text-slate-500">
                Sol sütunda ISO 8601 hafta numarası gösterilir, hafta sonu günleri seçilemez.
              </p>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DatePicker } from '@panoptes/react';

export function WeekNumberAndWeekendDisabled() {
  const [date, setDate] = useState('2026-10-15');

  return (
    <DatePicker
      label="İş Günü Randevu Seçimi"
      value={date}
      weekNumber={true}
      disabledDates="weekend"
      onChange={setDate}
    />
  );
}`
        },
        {
          id: 'ex4',
          title: 'Örnek 4: Boş Başlangıç, Özel Format & Temizlenebilirlik',
          description: 'Başlangıçta değer seçilmemiş, kullanıcı dostu placeholder ve tek tıkla temizleme (clearable) özelliği.',
          preview: (
            <div className="space-y-4 max-w-sm">
              <DatePicker
                label="Opsiyonel Bitiş Tarihi"
                value={date4}
                placeholder="Tarih seçiniz..."
                clearable={true}
                onChange={setDate4}
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Değer durumu:</span>
                <span className={`font-semibold ${date4 ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {date4 ? `Dolu (${date4})` : 'Boş'}
                </span>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { DatePicker } from '@panoptes/react';

export function OptionalDatePicker() {
  const [date, setDate] = useState('');

  return (
    <DatePicker
      label="Opsiyonel Bitiş Tarihi"
      value={date}
      placeholder="Tarih seçiniz..."
      clearable={true}
      onChange={setDate}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'string | Date', description: 'Seçili tarih değeri (ISO veya DD.MM.YYYY formatında)' },
        { name: 'defaultValue', type: 'string | Date', description: 'Başlangıç varsayılan tarihi' },
        { name: 'onChange', type: '(date: string) => void', description: 'Tarih seçildiğinde veya değiştiğinde tetiklenen callback işlevi' },
        { name: 'label', type: 'string', description: 'Girdi kutusu üst etiket metni' },
        { name: 'format', type: "'DD.MM.YYYY' | 'YYYY-MM-DD' | string", description: 'Girdi alanında gösterilecek tarih biçimi' },
        { name: 'placeholder', type: 'string', description: 'Değer boş iken gösterilen ipucu metni' },
        { name: 'min', type: 'string | Date', description: 'Seçilebilecek en erken tarih sınırı' },
        { name: 'max', type: 'string | Date', description: 'Seçilebilecek en geç tarih sınırı' },
        { name: 'disabled', type: 'boolean', description: 'Bileşeni tamamen pasif / tıklanamaz yapar' },
        { name: 'disabledDates', type: "'weekend' | ((d: Date) => boolean) | string[]", description: 'Belirli günleri veya hafta sonlarını pasif yapma kuralı' },
        { name: 'weekNumber', type: 'boolean', description: 'Takvim solunda ISO hafta numarası sütunu gösterir' },
        { name: 'clearable', type: 'boolean', description: 'Değer varken temizleme (×) butonunu aktif eder' }
      ]}
    />
  );
}
