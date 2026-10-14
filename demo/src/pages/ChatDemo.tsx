import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Chat, ChatMessage } from '@panoptes/react';

export function ChatDemo() {
  const initialChat: ChatMessage[] = [
    {
      id: '1',
      sender: 'bot',
      senderName: 'Panoptes AI Asistan',
      text: 'Merhaba! Ben Panoptes Akıllı Asistanıyım. Finansal verileriniz, raporlarınız veya grid konfigürasyonlarınız hakkında size nasıl yardımcı olabilirim?',
      timestamp: '14:20'
    },
    {
      id: '2',
      sender: 'user',
      senderName: 'Deniz Arslan',
      text: 'Son çeyrekteki ciro büyüme oranını özetleyebilir misin?',
      timestamp: '14:21'
    },
    {
      id: '3',
      sender: 'bot',
      senderName: 'Panoptes AI Asistan',
      text: 'Elbette. Q3 döneminde toplam ciromuz %18.4 artışla ₺1.842.500 seviyesine ulaştı. En yüksek katkı %34 ile Kurumsal Lisans satışlarından geldi.',
      timestamp: '14:21'
    }
  ];

  return (
    <ComponentShowcase
      title="Chat (Yapay Zeka & Sohbet Arayüzü)"
      category="Chat"
      description="Yapay zeka asistanları, müşteri destek hatları ve sohbet robotları (chatbot) için zengin mesajlaşma, hızlı yanıt butonları (quick replies) ve zaman damgaları sunan sohbet bileşeni."
      propsRows={[
        { name: 'initialMessages', type: 'ChatMessage[]', default: '[]', description: 'Başlangıç mesaj geçmişi ({ id, sender, senderName, text, timestamp }).' },
        { name: 'suggestedActions', type: 'string[]', default: '[]', description: 'Mesaj kutusu üstünde gösterilen tek tıkla gönderilebilir hızlı eylem önerileri.' },
        { name: 'onSendMessage', type: '(msg: string) => void', default: '-', description: 'Kullanıcı bir mesaj gönderdiğinde tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Panoptes AI Asistanı & Hızlı Eylemler',
          description: 'Mesaj yazabilir veya alttaki hızlı eylem butonlarına tıklayarak bot yanıtlarını test edebilirsiniz.',
          preview: (
            <div className="space-y-4 max-w-lg">
              <Chat
                initialMessages={initialChat}
                suggestedActions={[
                  '📊 Q3 Finans Raporu',
                  '👥 Personel Listesi',
                  '⚙️ Grid Ayarları'
                ]}
              />
            </div>
          ),
          code: `import { Chat } from '@panoptes/react';

export function AIChatDemo() {
  const messages = [
    { id: '1', sender: 'bot', senderName: 'AI Bot', text: 'Merhaba!', timestamp: '10:00' }
  ];

  return (
    <Chat
      initialMessages={messages}
      suggestedActions={['Raporlar', 'Ayarlar']}
      onSendMessage={(msg) => console.log('Gönderilen:', msg)}
    />
  );
}`
        }
      ]}
    />
  );
}
