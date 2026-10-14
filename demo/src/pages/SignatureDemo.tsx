import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Signature } from '@panoptes/react';

export function SignatureDemo() {
  const [signatureData, setSignatureData] = useState<string>('');
  const [contractSignature, setContractSignature] = useState<string>('');

  const sourceCode = `import React, { useState } from 'react';
import { Signature } from '@panoptes/react';

export function SignatureExample() {
  const [signatureData, setSignatureData] = useState('');

  return (
    <div>
      <Signature
        label="Dijital İmza Alanı"
        width={450}
        height={180}
        color="#1e293b"
        onChange={setSignatureData}
      />

      {signatureData && (
        <div style={{ marginTop: '12px' }}>
          <span>İmza Önizleme:</span>
          <img src={signatureData} alt="İmza" style={{ border: '1px solid #e2e8f0', height: '60px' }} />
        </div>
      )}
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="Signature"
      description="Sözleşmeler ve dijital onay akışları için dokunmatik ekran veya fareyle ıslak imza atılmasını sağlayan kanvas tabanlı dijital imza bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'İmza alanının başlık etiketi.' },
        { name: 'width', type: 'number | string', defaultValue: '400', description: 'Çizim kanvasının genişliği.' },
        { name: 'height', type: 'number | string', defaultValue: '160', description: 'Çizim kanvasının yüksekliği.' },
        { name: 'color', type: 'string', defaultValue: "'#0f172a'", description: 'Mürekkep / çizgi rengi.' },
        { name: 'backgroundColor', type: 'string', defaultValue: "'#ffffff'", description: 'Kanvasın arka plan rengi.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'İmza alanını çizmeyi devre dışı bırakır.' },
        { name: 'onChange', type: '(dataUrl: string) => void', description: 'İmza tamamlandığında veya temizlendiğinde Base64 PNG verisini iletir.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '560px' }}>
        {/* Örnek 1: Standart Sözleşme İmzası */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Standart Müşteri Onay İmzası
          </h4>
          <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748b' }}>
            Aşağıdaki kutuya fareniz veya dokunmatik ekranınız ile imzanızı çizin:
          </p>
          <Signature
            label="Yetkili Temsilci İmzası"
            width="100%"
            height={160}
            color="#1e3a8a"
            onChange={setSignatureData}
          />
          {signatureData && (
            <div style={{ marginTop: '14px', padding: '10px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
              <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Üretilen Base64 PNG Çıktısı Önizlemesi:</span>
              <div style={{ marginTop: '6px' }}>
                <img src={signatureData} alt="İmza Önizleme" style={{ maxHeight: '60px', border: '1px dashed #94a3b8', borderRadius: '4px', background: '#f1f5f9' }} />
              </div>
            </div>
          )}
        </div>

        {/* Örnek 2: Özel Renk ve Boyut */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Özel Mürekkep Rengi (Koyu Yeşil Mürekkep)
          </h4>
          <Signature
            label="Kabul ve Taahhüt İmzası"
            width="100%"
            height={140}
            color="#065f46"
            backgroundColor="#f0fdf4"
            onChange={setContractSignature}
          />
        </div>

        {/* Örnek 3: Devre Dışı / Kilitli */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Devre Dışı (Disabled) İmza Alanı
          </h4>
          <Signature
            label="Daha Önce İmzalanmış Sözleşme (Değiştirilemez)"
            width="100%"
            height={120}
            disabled={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
