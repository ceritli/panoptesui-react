import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Form, TextBox, NumericTextBox, CheckBox } from '@panoptes/react';

export function FormDemo() {
  const [submittedData, setSubmittedData] = useState<Record<string, any> | null>(null);

  const sourceCode = `import React, { useState } from 'react';
import { Form, TextBox, NumericTextBox, CheckBox } from '@panoptes/react';

export function FormExample() {
  const [result, setResult] = useState<any>(null);

  return (
    <Form
      initialValues={{ fullName: 'Ahmet Yılmaz', age: 32, newsletter: true }}
      onSubmit={(data) => {
        setResult(data);
      }}
      style={{ maxWidth: '400px' }}
    >
      <TextBox label="Ad Soyad" name="fullName" required />
      <NumericTextBox label="Yaş" name="age" min={18} max={99} />
      <CheckBox label="E-bülten almak istiyorum" name="newsletter" />
      <button
        type="submit"
        style={{
          marginTop: '16px',
          padding: '10px 18px',
          background: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Kaydet
      </button>
    </Form>
  );
}`;

  return (
    <ComponentShowcase
      title="Form"
      description="Form alanlarının validasyonunu, ilk değerlerini (initialValues) ve gönderim (submit) döngüsünü yöneten form kapsayıcı bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'initialValues', type: 'Record<string, any>', description: 'Form alanlarının başlangıç değerleri nesnesi.' },
        { name: 'onSubmit', type: '(data: Record<string, any>) => void', description: 'Form geçerli bir şekilde submit edildiğinde toplanan veriyi döndüren fonksiyon.' },
        { name: 'children', type: 'React.ReactNode', description: 'Form elemanları ve butonları içeren React alt bileşenleri.' },
        { name: 'className', type: 'string', description: 'Özel CSS sınıfı.' },
        { name: 'style', type: 'React.CSSProperties', description: 'Özel satır içi stiller.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '480px' }}>
        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', color: '#1e293b' }}>
            Kullanıcı Kayıt Formu
          </h4>
          <Form
            initialValues={{
              fullName: 'Zeynep Kaya',
              email: 'zeynep.kaya@example.com',
              age: 28,
              agreement: true
            }}
            onSubmit={(data) => {
              setSubmittedData(data);
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <TextBox label="Ad Soyad" placeholder="Adınızı ve soyadınızı giriniz" />
              <TextBox label="E-Posta Adresi" placeholder="ornek@sirket.com" />
              <NumericTextBox label="Yaş" value={28} min={18} max={100} />
              <CheckBox label="Kullanım koşullarını ve KVKK metnini okudum, onaylıyorum." checked={true} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '9px 18px',
                    background: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Formu Gönder
                </button>
                <button
                  type="reset"
                  onClick={() => setSubmittedData(null)}
                  style={{
                    padding: '9px 16px',
                    background: '#e2e8f0',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  Sıfırla
                </button>
              </div>
            </div>
          </Form>

          {submittedData && (
            <div style={{ marginTop: '20px', padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#166534', marginBottom: '6px' }}>
                ✓ Form Başarıyla Gönderildi:
              </div>
              <pre style={{ margin: 0, fontSize: '12px', color: '#14532d', background: '#ffffff', padding: '8px', borderRadius: '4px', overflowX: 'auto' }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </ComponentShowcase>
  );
}
