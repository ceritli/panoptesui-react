import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Editor } from '@panoptes/react';

export function EditorDemo() {
  const [content, setContent] = useState(
    '<h3>Panoptes Zengin Metin Editörü</h3><p>Bu alanda metinlerinizi <strong>kalın</strong>, <em>italik</em> yapabilir veya madde işaretleri ekleyebilirsiniz.</p>'
  );

  const [notes, setNotes] = useState(
    '<p>Toplantı Notları: Gelecek sprint planlaması tamamlandı.</p>'
  );

  const sourceCode = `import React, { useState } from 'react';
import { Editor } from '@panoptes/react';

export function EditorExample() {
  const [htmlContent, setHtmlContent] = useState('<p>Örnek makale metni...</p>');

  return (
    <Editor
      label="Makale Gövdesi"
      value={htmlContent}
      onChange={setHtmlContent}
      height="300px"
      placeholder="İçeriğinizi buraya yazın..."
    />
  );
}`;

  return (
    <ComponentShowcase
      title="Editor"
      description="HTML formatında zengin içerik düzenleme (bold, italic, listeler, başlıklar) imkânı sunan WYSIWYG metin editörü bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Editörün üst kısmındaki başlık etiketi.' },
        { name: 'value', type: 'string', description: 'HTML içeriği.' },
        { name: 'onChange', type: '(html: string) => void', description: 'İçerik her güncellendiğinde tetiklenen olay fonksiyonu.' },
        { name: 'height', type: 'number | string', defaultValue: "'250px'", description: 'Editörün çalışma alanı yüksekliği.' },
        { name: 'placeholder', type: 'string', description: 'İçerik boşken gösterilen yer tutucu metin.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Editörü kilitler ve salt okunur moda alır.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '720px' }}>
        {/* Örnek 1: Zengin Blog / Bülten Editörü */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Standart HTML Zengin İçerik Editörü
          </h4>
          <Editor
            label="Duyuru & Bülten Metni"
            value={content}
            onChange={setContent}
            height="220px"
          />

          <div style={{ marginTop: '14px', padding: '12px', background: '#ffffff', border: '1px dashed #cbd5e1', borderRadius: '6px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>Ham HTML Çıktısı:</span>
            <code style={{ display: 'block', fontSize: '12px', color: '#0f766e', marginTop: '4px', wordBreak: 'break-all' }}>
              {content}
            </code>
          </div>
        </div>

        {/* Örnek 2: Kompakt Not Editörü */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Kompakt Not Editörü
          </h4>
          <Editor
            label="Hızlı Ekip Notları"
            value={notes}
            onChange={setNotes}
            height="140px"
            placeholder="Kısa notlarınızı buraya düşün..."
          />
        </div>

        {/* Örnek 3: Salt Okunur */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Kilitli / Salt Okunur Editör (Disabled)
          </h4>
          <Editor
            label="Sözleşme Maddesi (Düzenlenemez)"
            value="<p>Bu sözleşme şartları taraflarca önceden onaylanmıştır ve <em>değiştirilemez</em>.</p>"
            disabled={true}
            height="120px"
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
