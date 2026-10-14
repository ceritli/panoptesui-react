import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { ActionSheet, ActionSheetItem } from '@panoptes/react';

export function ActionSheetDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string>('Henüz bir işlem yapılmadı.');

  const actions: ActionSheetItem[] = [
    {
      id: 'share',
      label: 'Raporu Paylaş & Bağlantıyı Kopyala',
      icon: '🔗',
      onClick: () => setSelectedAction('Rapor paylaşım bağlantısı panoya kopyalandı')
    },
    {
      id: 'download',
      label: 'PDF Olarak İndir',
      icon: '📥',
      onClick: () => setSelectedAction('PDF indirme başlatıldı')
    },
    {
      id: 'archive',
      label: 'Arşive Taşı',
      icon: '📦',
      onClick: () => setSelectedAction('Rapor arşive taşındı')
    },
    {
      id: 'delete',
      label: 'Kaydı Kalıcı Olarak Sil',
      icon: '🗑️',
      danger: true,
      onClick: () => setSelectedAction('⚠️ Kayıt silme işlemi onaylandı')
    }
  ];

  return (
    <ComponentShowcase
      title="ActionSheet (Eylem Sayfası)"
      category="ActionSheet"
      description="Özellikle mobil ve dokunmatik cihazlarda ekranın altından yukarı doğru açılan eylem seçim sayfası. Paylaş, düzenle, arşivle ve sil gibi hızlı operasyonlar için tasarlanmıştır."
      propsRows={[
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Eylem sayfasının görünürlük durumu.' },
        { name: 'onClose', type: '() => void', default: '-', description: 'Eylem sayfası kapatıldığında tetiklenen fonksiyon.' },
        { name: 'title', type: 'string', default: "''", description: 'Eylem sayfası üst başlığı.' },
        { name: 'items', type: 'ActionSheetItem[]', default: '[]', description: 'Eylem butonları listesi ({ id, label, icon?, danger?, onClick }).' }
      ]}
      examples={[
        {
          title: 'Mobil Eylem Menüsü & Silme Aksiyonu',
          description: 'Tehlikeli eylem (kırmızı renk) ve standart eylemleri içeren alt menü.',
          preview: (
            <div className="space-y-4 max-w-md">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <span>⚡</span>
                <span>Eylem Menüsünü Aç (ActionSheet)</span>
              </button>

              <ActionSheet
                isOpen={isOpen}
                title="Rapor İşlemleri"
                items={actions}
                onClose={() => setIsOpen(false)}
              />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                Son Tetiklenen İşlem: <strong>{selectedAction}</strong>
              </div>
            </div>
          ),
          code: `import { useState } from 'react';
import { ActionSheet } from '@panoptes/react';

export function MobileActionSheetDemo() {
  const [open, setOpen] = useState(false);

  const actions = [
    { id: 'share', label: 'Paylaş', icon: '🔗', onClick: () => {} },
    { id: 'del', label: 'Sil', icon: '🗑️', danger: true, onClick: () => {} }
  ];

  return (
    <>
      <button onClick={() => setOpen(true)}>Menüyü Aç</button>
      <ActionSheet
        isOpen={open}
        title="İşlemler"
        items={actions}
        onClose={() => setOpen(false)}
      />
    </>
  );
}`
        }
      ]}
    />
  );
}
