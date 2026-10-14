import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Stepper, StepItem } from '@panoptes/react';

export function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(1);

  const checkoutSteps: StepItem[] = [
    { label: 'Sepet Özeti', description: 'Ürün kontrolü' },
    { label: 'Teslimat', description: 'Adres & Kargo' },
    { label: 'Ödeme', description: 'Kredi kartı / EFT' },
    { label: 'Onay', description: 'Sipariş tamamlandı' }
  ];

  return (
    <ComponentShowcase
      title="Stepper (Adım Sayacı / Wizard)"
      category="Stepper"
      description="Çok adımlı süreçleri (sihirbazlar, başvuru formları, ödeme akışları) görselleştiren ve adımlar arası geçişi sağlayan adım sayacı bileşeni."
      propsRows={[
        { name: 'steps', type: 'StepItem[]', default: '[]', description: 'Adım tanımları listesi ({ label, description?, icon? }).' },
        { name: 'currentStep', type: 'number', default: '0', description: 'Aktif adımın sıfır tabanlı indeksi (0, 1, 2...).' },
        { name: 'onStepChange', type: '(step: number) => void', default: '-', description: 'Kullanıcı bir adıma tıkladığında tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Sipariş & Ödeme Sihirbazı',
          description: 'İlerleme çubuğu ve adım değiştirme butonları ile entegre adım sayacı.',
          preview: (
            <div className="space-y-6 max-w-xl">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
                <Stepper
                  steps={checkoutSteps}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                />
              </div>

              {/* Adım İçeriği */}
              <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Aktif Adım: {checkoutSteps[currentStep].label}
                </div>
                <div className="text-sm font-black text-slate-800">
                  {currentStep === 0 && '🛒 Sepetinizdeki ürünleri kontrol ediniz.'}
                  {currentStep === 1 && '📍 Teslimat ve fatura adresinizi giriniz.'}
                  {currentStep === 2 && '💳 Kredi kartı veya havale bilgilerinizi giriniz.'}
                  {currentStep === 3 && '🎉 Tebrikler! Siparişiniz onaylandı.'}
                </div>

                <div className="flex justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentStep === 0}
                    onClick={() => setCurrentStep(c => Math.max(0, c - 1))}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition disabled:opacity-40 cursor-pointer"
                  >
                    ← Önceki Adım
                  </button>
                  <button
                    type="button"
                    disabled={currentStep === checkoutSteps.length - 1}
                    onClick={() => setCurrentStep(c => Math.min(checkoutSteps.length - 1, c + 1))}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition disabled:opacity-40 cursor-pointer"
                  >
                    Sonraki Adım →
                  </button>
                </div>
              </div>
            </div>
          ),
          code: `import { useState } from 'react';
import { Stepper } from '@panoptes/react';

export function CheckoutWizardDemo() {
  const [step, setStep] = useState(1);

  const steps = [
    { label: 'Sepet', description: 'Ürün kontrolü' },
    { label: 'Teslimat', description: 'Adres seçimi' },
    { label: 'Ödeme', description: 'Kart bilgisi' },
    { label: 'Onay', description: 'Tamamlandı' }
  ];

  return (
    <Stepper
      steps={steps}
      currentStep={step}
      onStepChange={setStep}
    />
  );
}`
        }
      ]}
    />
  );
}
