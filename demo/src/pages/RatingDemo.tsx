import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Rating } from '@panoptes/react';

export function RatingDemo() {
  const [satisfaction, setSatisfaction] = useState(4);
  const [supportScore, setSupportScore] = useState(5);

  const sourceCode = `import React, { useState } from 'react';
import { Rating } from '@panoptes/react';

export function RatingExample() {
  const [score, setScore] = useState(4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Rating
        label="Hizmet Memnuniyeti (1-5)"
        value={score}
        max={5}
        onChange={setScore}
      />

      <Rating
        label="Sabit / Salt Okunur Değerlendirme"
        value={4.5}
        max={5}
        readonly={true}
      />
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="Rating"
      description="Yıldız veya simgelerle kullanıcı memnuniyeti, ürün puanlaması ve değerlendirme girişleri sunan interaktif derecelendirme bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Bileşenin üstündeki başlık etiketi.' },
        { name: 'value', type: 'number', defaultValue: '0', description: 'Mevcut puan/derece değeri.' },
        { name: 'max', type: 'number', defaultValue: '5', description: 'Maksimum verilebilecek yıldız sayısı.' },
        { name: 'precision', type: 'number', defaultValue: '0.5', description: 'Seçim hassasiyeti (tam veya yarım yıldız).' },
        { name: 'readonly', type: 'boolean', defaultValue: 'false', description: 'Etkileşimi kapatarak salt okunur gösterim sağlar.' },
        { name: 'onChange', type: '(val: number) => void', description: 'Puan değiştiğinde tetiklenen olay fonksiyonu.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '520px' }}>
        {/* Örnek 1: Müşteri Deneyimi Puanlaması */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. İnteraktif Yıldız Puanlaması (1 - 5)
          </h4>
          <Rating
            label="Kullanıcı Deneyimi Puanı"
            value={satisfaction}
            max={5}
            onChange={setSatisfaction}
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            Mevcut Puan: <strong style={{ color: '#d97706' }}>{satisfaction} / 5 Yıldız</strong>
          </div>
        </div>

        {/* Örnek 2: 10 Üzerinden Puanlama */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Geniş Ölçekli Derecelendirme (1 - 10)
          </h4>
          <Rating
            label="NPS Tavsiye Puanı"
            value={supportScore}
            max={10}
            onChange={setSupportScore}
          />
          <div style={{ marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
            NPS Skoru: <strong style={{ color: '#0284c7' }}>{supportScore} / 10</strong>
          </div>
        </div>

        {/* Örnek 3: Salt Okunur Değerlendirme */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Salt Okunur (Readonly) Ortalama Puan
          </h4>
          <Rating
            label="Genel Mağaza Ortalaması (1.240 Değerlendirme)"
            value={4.5}
            max={5}
            readonly={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
