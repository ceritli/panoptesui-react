import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Barcode } from '@panoptes/react';

export function BarcodeDemo() {
  const [productCode, setProductCode] = useState('8690504123456');
  const [shippingCode, setShippingCode] = useState('TR-9042-8812');

  return (
    <ComponentShowcase
      title="Barcode & Barcode/QR"
      category="Barcode"
      description="Ürün etiketleri, kargo takip numaraları, envanter yönetimi ve bilet doğrulama için 1D (Çizgi Barkod) ve 2D (QR Kod) görselleştirme bileşeni."
      propsRows={[
        { name: 'value', type: 'string', default: "''", description: 'Barkod çizgilerine dönüştürülecek alfasayısal metin veya sayı dizisi.' },
        { name: 'label', type: 'string', default: "''", description: 'Barkod kutusu üst açıklama etiketi.' }
      ]}
      examples={[
        {
          title: 'Ürün EAN-13 & Kargo Takip Barkodu',
          description: 'Farklı barkod desenleri ve dinamik metin girişi ile anlık barkod üretimi.',
          preview: (
            <div className="space-y-6 max-w-md">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Barcode
                  label="EAN-13 Ürün Barkodu"
                  value={productCode}
                />
                <Barcode
                  label="Kargo Takip Kodu"
                  value={shippingCode}
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Barkod Metnini Değiştirin:
                  <input
                    type="text"
                    value={productCode}
                    onChange={e => setProductCode(e.target.value)}
                    className="w-full mt-1 p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </label>
              </div>
            </div>
          ),
          code: `import { Barcode } from '@panoptes/react';

export function ProductBarcodeDemo() {
  return (
    <Barcode
      label="EAN-13 Barkodu"
      value="8690504123456"
    />
  );
}`
        }
      ]}
    />
  );
}
