import React, { useState } from 'react';
import {
  TextBox,
  NumericTextBox,
  TextArea,
  Switch,
  CheckBox,
  RadioGroup,
  DatePicker,
  DateRangePicker,
  DropDownList,
  MultiSelect,
  Rating,
  Slider,
  OtpInput,
  ColorPicker
} from '@panoptes/react';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function InputsDemo() {
  const [text, setText] = useState('Panoptes React UI');
  const [num, setNum] = useState(1250);
  const [switchVal, setSwitchVal] = useState(true);
  const [checkVal, setCheckVal] = useState(true);
  const [radioVal, setRadioVal] = useState<string | number>('standard');
  const [date, setDate] = useState('2026-10-12');
  const [selectVal, setSelectVal] = useState<string | number>('elec');
  const [multiVal, setMultiVal] = useState<(string | number)[]>(['tr', 'de']);
  const [rating, setRating] = useState(4.5);
  const [sliderVal, setSliderVal] = useState(75);
  const [color, setColor] = useState('#2563eb');
  const [otp, setOtp] = useState('');

  const categoryOptions = [
    { value: 'elec', label: 'Elektronik & Bilişim' },
    { value: 'gida', label: 'Gıda & İçecek' },
    { value: 'tekstil', label: 'Tekstil & Giyim' },
    { value: 'kozmetik', label: 'Kozmetik & Bakım' }
  ];

  const countryOptions = [
    { value: 'tr', label: 'Türkiye 🇹🇷' },
    { value: 'de', label: 'Almanya 🇩🇪' },
    { value: 'us', label: 'ABD 🇺🇸' },
    { value: 'jp', label: 'Japonya 🇯🇵' }
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Form & Editör Bileşenleri
        </span>
        <h1 className="text-3xl font-black mt-2">Panoptes Form & Girdi Bileşenleri</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Tarih seçiciler, açılır listeler, maskeli ve sayısal kutular, puanlayıcılar ve onay kontrolleri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. TextBox & Numeric */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            1. Metin & Sayısal Girişler
          </h3>
          <TextBox
            label="TextBox (Metin Kutusu)"
            value={text}
            onChange={e => setText(e.target.value)}
            clearButton={true}
          />
          <NumericTextBox
            label="NumericTextBox (Para Birimi)"
            value={num}
            format="currency"
            step={50}
            onChange={setNum}
          />
          <TextArea
            label="TextArea (Çok Satırlı Metin)"
            defaultValue="Panoptes React bileşenleri sıfır dış bağımlılık ile çalışır."
            maxLength={120}
          />
        </div>

        {/* 2. DropDownList & MultiSelect */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-visible z-30 hover:!z-50 focus-within:!z-50">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            2. Seçim & Açılır Listeler
          </h3>
          <DropDownList
            label="DropDownList (Açılır Seçici)"
            options={categoryOptions}
            value={selectVal}
            onChange={setSelectVal}
          />
          <MultiSelect
            label="MultiSelect (Çoklu Etiketli Seçim)"
            options={countryOptions}
            value={multiVal}
            onChange={setMultiVal}
          />
          <ColorPicker label="ColorPicker (Renk Seçici)" value={color} onChange={setColor} />
        </div>

        {/* 3. Date & Range */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-visible z-20 hover:!z-50 focus-within:!z-50">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            3. Tarih & Zaman Seçicileri
          </h3>
          <DatePicker label="DatePicker (Tarih Seçici)" value={date} onChange={setDate} />
          <DateRangePicker
            label="DateRangePicker (Tarih Aralığı)"
            startDate="2026-10-01"
            endDate="2026-10-31"
          />
          <OtpInput
            label="OtpInput (SMS / Doğrulama Kodu)"
            length={6}
            onComplete={code => setOtp(code)}
          />
          {otp && <span className="text-xs font-bold text-emerald-600">Girilen Kod: {otp}</span>}
        </div>

        {/* 4. Controls & Toggles */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            4. Anahtar & Onay Kutuları
          </h3>
          <div className="space-y-3">
            <Switch
              label="Switch (Aç/Kapa):"
              checked={switchVal}
              onChange={setSwitchVal}
            />
            <div className="pt-2">
              <CheckBox
                label="Hüküm ve koşulları okudum, onaylıyorum."
                checked={checkVal}
                onChange={setCheckVal}
              />
            </div>
            <div className="pt-2">
              <CheckBox label="Yarı seçili (Indeterminate)" indeterminate={true} />
            </div>
          </div>
        </div>

        {/* 5. RadioGroup */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            5. RadioGroup (Seçenekler)
          </h3>
          <RadioGroup
            label="Kargo Teslimat Türü"
            options={[
              { value: 'standard', label: 'Standart Teslimat', description: '2-3 iş günü içinde kargoda' },
              { value: 'express', label: 'Aynı Gün Hızlı Kurye', description: '18:00 öncesi teslimat' },
              { value: 'pickup', label: 'Mağazadan Teslim Al', description: 'Ücretsiz kargo' }
            ]}
            value={radioVal}
            onChange={setRadioVal}
          />
        </div>

        {/* 6. Rating & Slider */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            6. Puan & Sürgü (Slider)
          </h3>
          <Rating label="Rating (Yıldızlı Değerlendirme)" value={rating} onChange={setRating} />
          <Slider label="Slider (Yüzdelik Aralık)" value={sliderVal} onChange={setSliderVal} />
        </div>
      </div>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (Form Inputs Overview)"
          code={`import { TextBox, NumericTextBox, DatePicker, DropDownList, Switch } from '@panoptes/react';

export function FormExample() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TextBox label="Ürün Adı" placeholder="Örn: Laptop" />
      <NumericTextBox label="Fiyat" format="c2" min={0} />
      <DatePicker label="Geçerlilik Tarihi" />
      <DropDownList label="Kategori" options={[{ value: '1', label: 'Elektronik' }]} />
      <Switch label="Aktif Satışta" defaultChecked={true} />
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
