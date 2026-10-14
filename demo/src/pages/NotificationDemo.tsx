import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Notification } from '@panoptes/react';

export function NotificationDemo() {
  const [notifications, setNotifications] = useState<
    Array<{ id: number; type: 'info' | 'success' | 'warning' | 'error'; title: string; message: string }>
  >([
    { id: 1, type: 'success', title: 'Başarılı', message: 'Fatura oluşturuldu ve müşteriye e-posta ile iletildi.' },
    { id: 2, type: 'warning', title: 'Dikkat', message: 'API kotanızın %85 ini kullandınız.' }
  ]);

  const addNotification = (type: 'info' | 'success' | 'warning' | 'error') => {
    const id = Date.now();
    const titles = {
      info: 'Bilgilendirme',
      success: 'İşlem Başarılı',
      warning: 'Sistem Uyarısı',
      error: 'Hata Meydana Geldi'
    };
    const messages = {
      info: 'Yeni bir sistem güncellemesi mevcut.',
      success: 'Veriler başarıyla kaydedildi.',
      warning: 'Oturum süreniz 5 dakika içinde dolacak.',
      error: 'Sunucuya bağlanılamadı (500 Internal Error).'
    };

    setNotifications(prev => [...prev, { id, type, title: titles[type], message: messages[type] }]);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <ComponentShowcase
      title="Notification (Toast Bildirimleri)"
      category="Notification"
      description="Kullanıcıya arka plan işlemleri, hata mesajları ve başarı durumları hakkında anlık geri bildirim sağlayan toast bildirim bileşeni."
      propsRows={[
        { name: 'type', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'", description: 'Bildirimin ciddiyet seviyesi ve renk teması.' },
        { name: 'title', type: 'string', default: "''", description: 'Bildirim üst başlığı.' },
        { name: 'message', type: 'string', default: "''", description: 'Bildirim gövde mesajı.' },
        { name: 'onClose', type: '() => void', default: '-', description: 'Kapat butonuna basıldığında çağrılan fonksiyon.' }
      ]}
      examples={[
        {
          title: '4 Farklı Bildirim Seviyesi (Success, Info, Warning, Error)',
          description: 'Aşağıdaki butonlara tıklayarak canlı bildirim ekleyin ve kapatın.',
          preview: (
            <div className="space-y-4 max-w-lg">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addNotification('success')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Success Bildirimi
                </button>
                <button
                  type="button"
                  onClick={() => addNotification('info')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Info Bildirimi
                </button>
                <button
                  type="button"
                  onClick={() => addNotification('warning')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Warning Bildirimi
                </button>
                <button
                  type="button"
                  onClick={() => addNotification('error')}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  + Error Bildirimi
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {notifications.map(n => (
                  <Notification
                    key={n.id}
                    type={n.type}
                    title={n.title}
                    message={n.message}
                    onClose={() => removeNotification(n.id)}
                  />
                ))}

                {notifications.length === 0 && (
                  <div className="text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Aktif bildirim bulunmuyor. Yukarıdaki butonlarla yeni bildirim ekleyebilirsiniz.
                  </div>
                )}
              </div>
            </div>
          ),
          code: `import { Notification } from '@panoptes/react';

export function ToastNotificationDemo() {
  return (
    <div className="space-y-2">
      <Notification
        type="success"
        title="Başarılı"
        message="Veriler buluta kaydedildi."
        onClose={() => {}}
      />
      <Notification
        type="error"
        title="Hata"
        message="Bağlantı kesildi."
        onClose={() => {}}
      />
    </div>
  );
}`
        }
      ]}
    />
  );
}
