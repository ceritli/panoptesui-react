import React, { useState } from 'react';
import { Dialog, NotificationContainer, NotificationToast, Tooltip } from '@panoptes/react';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function PopupsDemo() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: 'alert' | 'confirm' | 'prompt';
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'confirm',
    title: '',
    message: ''
  });

  const [toasts, setToasts] = useState<NotificationToast[]>([]);

  const addToast = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    const newToast: NotificationToast = {
      id: Math.random().toString(36).substring(7),
      type,
      title,
      message
    };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 4000);
  };

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Popuplar & Bildirimler
        </span>
        <h1 className="text-3xl font-black mt-2">Panoptes Dialog & Bildirim Bileşenleri</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Alert, Confirm, Prompt modalları, Toast durum bildirimleri ve Tooltip açıklama balonları.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Dialogs */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            1. Dialog Pencereleri
          </h3>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() =>
                setDialogState({
                  isOpen: true,
                  type: 'alert',
                  title: 'İşlem Başarılı',
                  message: 'Yapılan değişiklikler güvenli bir şekilde kaydedildi.'
                })
              }
              className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition"
            >
              Alert Modalı Aç
            </button>
            <button
              type="button"
              onClick={() =>
                setDialogState({
                  isOpen: true,
                  type: 'confirm',
                  title: 'Kaydı Silmek İstiyor musunuz?',
                  message: 'Bu işlem geri alınamaz. Devam etmek istediğinize emin misiniz?'
                })
              }
              className="w-full py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-700 border border-rose-200 transition"
            >
              Confirm (Onay) Modalı Aç
            </button>
            <button
              type="button"
              onClick={() =>
                setDialogState({
                  isOpen: true,
                  type: 'prompt',
                  title: 'Proje Adı Girin',
                  message: 'Yeni oluşturulacak proje için bir isim belirleyiniz:'
                })
              }
              className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-bold text-blue-700 border border-blue-200 transition"
            >
              Prompt (Girdi) Modalı Aç
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            2. Toast Bildirimleri
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => addToast('success', 'Kayıt Başarılı', 'Veriler veri tabanına işlendi.')}
              className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100"
            >
              ✓ Success Toast
            </button>
            <button
              type="button"
              onClick={() => addToast('error', 'Bağlantı Hatası', 'Sunucu yanıt vermedi.')}
              className="p-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold hover:bg-rose-100"
            >
              ✕ Error Toast
            </button>
            <button
              type="button"
              onClick={() => addToast('warning', 'Uyarı', 'Kota sınırına yaklaşıyorsunuz.')}
              className="p-2.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold hover:bg-amber-100"
            >
              ⚠️ Warning Toast
            </button>
            <button
              type="button"
              onClick={() => addToast('info', 'Bilgi', 'Yeni bir güncelleme mevcut.')}
              className="p-2.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-bold hover:bg-blue-100"
            >
              ℹ Info Toast
            </button>
          </div>
        </div>

        {/* Tooltips */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative overflow-visible z-20 hover:!z-50 focus-within:!z-50">
          <h3 className="text-sm font-black text-slate-800 border-b border-slate-100 pb-2">
            3. Tooltip Açıklama Balonları
          </h3>
          <div className="space-y-4 pt-2">
            <Tooltip content="Excel dosyasını hemen indirin">
              <button
                type="button"
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-700"
              >
                📊 Üzerime Gel (Tooltip)
              </button>
            </Tooltip>
            <div>
              <Tooltip content="Bu alan zorunludur ve boş bırakılamaz.">
                <span className="text-xs font-bold text-slate-500 underline decoration-dotted cursor-help">
                  Zorunlu Alan Bilgisi (?)
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        isOpen={dialogState.isOpen}
        type={dialogState.type}
        title={dialogState.title}
        message={dialogState.message}
        onConfirm={val => {
          setDialogState(prev => ({ ...prev, isOpen: false }));
          if (val) addToast('info', 'Girilen Değer', val);
        }}
        onCancel={() => setDialogState(prev => ({ ...prev, isOpen: false }))}
      />

      <NotificationContainer
        toasts={toasts}
        onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))}
      />

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (Dialogs & Popups Overview)"
          code={`import { Dialog, Tooltip, NotificationContainer } from '@panoptes/react';

export function PopupsExample() {
  return (
    <>
      <Tooltip content="Bu bir açıklama balonudur">
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded">Hover Me</button>
      </Tooltip>
      <Dialog
        isOpen={true}
        type="confirm"
        title="Silme Onayı"
        message="Bu kaydı silmek istediğinize emin misiniz?"
        onConfirm={() => console.log('Silindi')}
      />
    </>
  );
}`}
        />
      </div>
    </div>
  );
}
