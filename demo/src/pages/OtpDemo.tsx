import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { OtpInput } from '@panoptes/react';

export function OtpDemo() {
  const [completedCode, setCompletedCode] = useState<string>('');
  const [pinCode, setPinCode] = useState<string>('');

  const sourceCode = `import React, { useState } from 'react';
import { OtpInput } from '@panoptes/react';

export function OtpExample() {
  const [code, setCode] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <OtpInput
        label="SMS Doğrulama Kodu (6 Haneli)"
        length={6}
        onComplete={(val) => setCode(val)}
      />

      {code && (
        <div style={{ color: '#16a34a', fontWeight: 'bold' }}>
          Kod tamamlandı: {code}
        </div>
      )}
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="OTP Input"
      description="SMS doğrulama, iki faktörlü kimlik doğrulama (2FA) ve PIN girişleri için her haneyi ayrı kutucukta alan, otomatik odaklanmalı ve geri silme destekli tek kullanımlık şifre bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Giriş alanının üstündeki açıklama başlığı.' },
        { name: 'length', type: 'number', defaultValue: '6', description: 'Kutucuk / hane sayısı (genellikle 4 veya 6).' },
        { name: 'onComplete', type: '(otp: string) => void', description: 'Tüm haneler doldurulduğunda otomatik tetiklenen tamamlama geri çağırması.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '520px' }}>
        {/* Örnek 1: 6 Haneli SMS Doğrulama */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. 6 Haneli Güvenlik Kodu (SMS / E-posta)
          </h4>
          <OtpInput
            label="Telefonunuza gelen 6 haneli kodu giriniz"
            length={6}
            onComplete={(val) => setCompletedCode(val)}
          />
          {completedCode && (
            <div style={{ marginTop: '12px', padding: '8px 12px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '6px', color: '#065f46', fontSize: '13px' }}>
              ✓ Doğrulandı: <strong>{completedCode}</strong>
            </div>
          )}
        </div>

        {/* Örnek 2: 4 Haneli Bankacılık PIN Kodu */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. 4 Haneli Kart PIN Girişi
          </h4>
          <OtpInput
            label="4 Haneli Kart Şifreniz"
            length={4}
            onComplete={(val) => setPinCode(val)}
          />
          {pinCode && (
            <div style={{ marginTop: '12px', padding: '8px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '6px', color: '#1e40af', fontSize: '13px' }}>
              PIN girildi: <strong>{pinCode}</strong>
            </div>
          )}
        </div>
      </div>
    </ComponentShowcase>
  );
}
