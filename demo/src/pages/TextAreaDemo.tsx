import React, { useState } from 'react';
import { TextArea } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

export function TextAreaDemo() {
  const [desc, setDesc] = useState('Panoptes UI kurumsal düzeyde geliştirilmiş yüksek performanslı kütüphanedir.');
  const [comment, setComment] = useState('');

  return (
    <ComponentShowcase
      title="TextArea (Çok Satırlı Metin)"
      category="Form & Editörler"
      description="Panoptes Kurumsal TextArea bileşeni: Yazıldıkça içeriğe göre otomatik uzayan yükseklik (Auto-resizing), canlı kalan karakter sayısı sayacı ve maksimum karakter sınırı (maxLength)."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Canlı Karakter Sayaçlı & Otomatik Uzayan Açıklama',
          description: 'Maksimum 250 karakter kısıtlaması ve kalan karakteri gösteren sayaç.',
          preview: (
            <div className="space-y-4 max-w-md">
              <TextArea
                label="Proje Özeti & Açıklaması"
                value={desc}
                maxLength={250}
                autoResize={true}
                placeholder="Açıklama giriniz..."
                onChange={e => setDesc(e.target.value)}
              />
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TextArea } from '@panoptes/react';

export function AutoResizeTextArea() {
  const [text, setText] = useState('');

  return (
    <TextArea
      label="Açıklama"
      value={text}
      maxLength={250}
      autoResize={true}
      placeholder="Açıklama giriniz..."
      onChange={e => setText(e.target.value)}
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Destek / Geri Bildirim Notu',
          description: 'Müşteri destek mesajları ve notlar için çok satırlı alan.',
          preview: (
            <div className="space-y-4 max-w-md">
              <TextArea
                label="Müşteri İletişim Notu"
                value={comment}
                placeholder="Görüş ve önerilerinizi buraya yazabilirsiniz..."
                autoResize={false}
                rows={4}
                onChange={e => setComment(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert(`Gönderilen: ${comment}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
                >
                  Notu İlet
                </button>
              </div>
            </div>
          ),
          code: `import React, { useState } from 'react';
import { TextArea } from '@panoptes/react';

export function CommentTextArea() {
  const [comment, setComment] = useState('');

  return (
    <TextArea
      label="Notunuz"
      value={comment}
      rows={4}
      placeholder="Görüşlerinizi yazın..."
      onChange={e => setComment(e.target.value)}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'value', type: 'string', description: 'Metin alanı içeriği' },
        { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Metin değiştikçe tetiklenir' },
        { name: 'maxLength', type: 'number', description: 'Maksimum girilebilecek karakter sayısı' },
        { name: 'autoResize', type: 'boolean', default: 'true', description: 'Satır sayısına göre otomatik uzama' }
      ]}
    />
  );
}
