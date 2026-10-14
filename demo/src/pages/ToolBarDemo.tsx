import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { ToolBar, ToolBarItem } from '@panoptes/react';

export function ToolBarDemo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left');
  const [lastAction, setLastAction] = useState<string>('Hazır');

  const editorToolbar: ToolBarItem[] = [
    {
      id: 'cut',
      label: 'Kes',
      icon: '✂️',
      onClick: () => setLastAction('Metin kesildi')
    },
    {
      id: 'copy',
      label: 'Kopyala',
      icon: '📋',
      onClick: () => setLastAction('Metin kopyalandı')
    },
    {
      id: 'paste',
      label: 'Yapıştır',
      icon: '📌',
      onClick: () => setLastAction('Panodan yapıştırıldı')
    },
    { id: 'sep1', type: 'separator' },
    {
      id: 'bold',
      label: 'Kalın',
      type: 'toggle',
      active: bold,
      onClick: () => {
        setBold(!bold);
        setLastAction(`Kalın: ${!bold ? 'Açık' : 'Kapalı'}`);
      }
    },
    {
      id: 'italic',
      label: 'İtalik',
      type: 'toggle',
      active: italic,
      onClick: () => {
        setItalic(!italic);
        setLastAction(`İtalik: ${!italic ? 'Açık' : 'Kapalı'}`);
      }
    },
    {
      id: 'underline',
      label: 'Altı Çizili',
      type: 'toggle',
      active: underline,
      onClick: () => {
        setUnderline(!underline);
        setLastAction(`Alt Çizgi: ${!underline ? 'Açık' : 'Kapalı'}`);
      }
    },
    { id: 'sep2', type: 'separator' },
    {
      id: 'align-left',
      icon: '⬅️',
      type: 'toggle',
      active: align === 'left',
      onClick: () => setAlign('left')
    },
    {
      id: 'align-center',
      icon: '↔️',
      type: 'toggle',
      active: align === 'center',
      onClick: () => setAlign('center')
    },
    {
      id: 'align-right',
      icon: '➡️',
      type: 'toggle',
      active: align === 'right',
      onClick: () => setAlign('right')
    },
    { id: 'spacer', type: 'spacer' },
    {
      id: 'export',
      label: 'Dışa Aktar',
      icon: '💾',
      onClick: () => setLastAction('Belge dışa aktarılıyor...')
    }
  ];

  return (
    <ComponentShowcase
      title="ToolBar"
      category="ToolBar"
      description="Uygulama eylemleri, format butonları, geçiş düğmeleri (toggle) ve boşluk ayırıcıları barındıran zengin araç çubuğu bileşeni."
      propsRows={[
        { name: 'items', type: 'ToolBarItem[]', default: '[]', description: 'Araç çubuğu düğmeleri ({ id, type?, label?, icon?, active?, disabled?, onClick? }).' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Araç çubuğu boyut ölçeği.' }
      ]}
      examples={[
        {
          title: 'Metin & Tablo Düzenleme Araç Çubuğu',
          description: 'Kes/Kopyala/Yapıştır, Kalın/İtalik/Altı Çizili geçiş butonları ve sağa hizalı Dışa Aktar butonu.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <ToolBar items={editorToolbar} size="md" />

              <div
                style={{
                  fontWeight: bold ? 'bold' : 'normal',
                  fontStyle: italic ? 'italic' : 'normal',
                  textDecoration: underline ? 'underline' : 'none',
                  textAlign: align
                }}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs text-xs text-slate-800 min-h-[80px]"
              >
                Bu metin kutusunun görünümü yukarıdaki araç çubuğu butonlarıyla anlık olarak kontrol edilmektedir.
              </div>

              <div className="text-xs text-slate-500">
                Son Eylem: <strong className="text-blue-600">{lastAction}</strong>
              </div>
            </div>
          ),
          code: `import { ToolBar } from '@panoptes/react';

export function EditorToolBarDemo() {
  const items = [
    { id: 'cut', label: 'Kes', icon: '✂️' },
    { id: 'copy', label: 'Kopyala', icon: '📋' },
    { id: 'sep1', type: 'separator' },
    { id: 'bold', label: 'Kalın', type: 'toggle', active: true },
    { id: 'italic', label: 'İtalik', type: 'toggle' },
    { id: 'spacer', type: 'spacer' },
    { id: 'save', label: 'Kaydet', icon: '💾' }
  ];

  return <ToolBar items={items} size="md" />;
}`
        }
      ]}
    />
  );
}
