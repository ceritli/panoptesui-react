import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Dialog } from '@panoptes/react';

export function DialogDemo() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState<string>('Henüz bir diyalog tetiklenmedi.');

  return (
    <ComponentShowcase
      title="Dialog (Alert / Confirm / Prompt)"
      category="Dialog"
      description="Kullanıcıdan anlık onay almak (confirm), uyarı mesajı göstermek (alert) veya tek satırlık girdi istemek (prompt) için tasarlanmış modal diyalog kutusu."
      propsRows={[
        { name: 'isOpen', type: 'boolean', default: 'false', description: 'Diyalog kutusunun açık veya kapalı durumu.' },
        { name: 'title', type: 'string', default: "''", description: 'Diyalog penceresi başlığı.' },
        { name: 'message', type: 'React.ReactNode', default: '-', description: 'Kullanıcıya gösterilen açıklama metni.' },
        { name: 'type', type: "'alert' | 'confirm' | 'prompt'", default: "'confirm'", description: 'Diyalog kutusu türü.' },
        { name: 'confirmText', type: 'string', default: "'Tamam'", description: 'Onay butonu metni.' },
        { name: 'cancelText', type: 'string', default: "'Vazgeç'", description: 'İptal butonu metni.' },
        { name: 'onConfirm', type: '(value?: string) => void', default: '-', description: 'Onay verildiğinde çağrılan fonksiyon.' },
        { name: 'onCancel', type: '() => void', default: '-', description: 'İptal edildiğinde çağrılan fonksiyon.' }
      ]}
      examples={[
        {
          title: '3 Temel Diyalog Modu (Alert, Confirm, Prompt)',
          description: 'Farklı senaryolar için diyalog kutularını tetikleyin ve sonucu izleyin.',
          preview: (
            <div className="space-y-4 max-w-md">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setAlertOpen(true)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  🔔 Alert Aç
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  ⚠️ Confirm Aç
                </button>
                <button
                  type="button"
                  onClick={() => setPromptOpen(true)}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                >
                  ✏️ Prompt Aç
                </button>
              </div>

              {/* Alert Dialog */}
              <Dialog
                isOpen={alertOpen}
                type="alert"
                title="İşlem Başarılı"
                message="Değişiklikleriniz bulut sunucusuna senkronize edildi."
                onConfirm={() => {
                  setAlertOpen(false);
                  setDialogResult('Alert onaylandı');
                }}
              />

              {/* Confirm Dialog */}
              <Dialog
                isOpen={confirmOpen}
                type="confirm"
                title="Kayıt Silinecek"
                message="Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                confirmText="Evet, Sil"
                cancelText="İptal"
                onConfirm={() => {
                  setConfirmOpen(false);
                  setDialogResult('Kayıt silme işlemi ONAYLANDI');
                }}
                onCancel={() => {
                  setConfirmOpen(false);
                  setDialogResult('Kayıt silme İPTAL EDİLDİ');
                }}
              />

              {/* Prompt Dialog */}
              <Dialog
                isOpen={promptOpen}
                type="prompt"
                title="Yeni Proje Adı"
                message="Lütfen oluşturulacak projenin adını giriniz:"
                onConfirm={val => {
                  setPromptOpen(false);
                  setDialogResult(`Yeni Proje: "${val}"`);
                }}
                onCancel={() => {
                  setPromptOpen(false);
                  setDialogResult('Prompt iptal edildi');
                }}
              />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                Son Diyalog Sonucu: <strong>{dialogResult}</strong>
              </div>
            </div>
          ),
          code: `import { useState } from 'react';
import { Dialog } from '@panoptes/react';

export function DialogModesDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      isOpen={open}
      type="confirm"
      title="Silme Onayı"
      message="Bu işlemi onaylıyor musunuz?"
      confirmText="Evet, Sil"
      cancelText="Vazgeç"
      onConfirm={() => setOpen(false)}
      onCancel={() => setOpen(false)}
    />
  );
}`
        }
      ]}
    />
  );
}
