import React, { useState } from 'react';
import { PropertyGrid, Chat, PDFViewer, Filter, MediaPlayer, PropertyItem, ChatMessage } from '@panoptes/react';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function ToolsDemo() {
  const initialProperties: PropertyItem[] = [
    { id: '1', name: 'Bileşen Başlığı', category: 'Genel', value: 'Kurumsal Veri Tablosu', type: 'text' },
    { id: '2', name: 'Satır Sayısı', category: 'Genel', value: 25, type: 'number' },
    { id: '3', name: 'Sayfalama Aktif', category: 'Davranış', value: true, type: 'boolean' },
    { id: '4', name: 'Sıralama Modu', category: 'Davranış', value: 'Çoklu', type: 'select', options: ['Tekli', 'Çoklu', 'Kapalı'] },
    { id: '5', name: 'Vurgu Rengi', category: 'Görünüm', value: '#2563eb', type: 'color' },
    { id: '6', name: 'Karanlık Mod', category: 'Görünüm', value: false, type: 'boolean' }
  ];

  const initialChatMessages: ChatMessage[] = [
    {
      id: 'm1',
      sender: 'bot',
      senderName: 'Panoptes Asistan',
      text: 'Merhaba! Panoptes React bileşen kataloğu hakkında size nasıl yardımcı olabilirim?',
      timestamp: '14:20'
    },
    {
      id: 'm2',
      sender: 'user',
      senderName: 'Kullanıcı',
      text: 'Data Grid dışa aktarma hangi formatları destekliyor?',
      timestamp: '14:21'
    },
    {
      id: 'm3',
      sender: 'bot',
      senderName: 'Panoptes Asistan',
      text: 'Panoptes Grid; UTF-8 BOM destekli Excel (XLSX, CSV) ve yüksek çözünürlüklü vektörel PDF dışa aktarmayı tam destekler.',
      timestamp: '14:21'
    }
  ];

  const suggestedActions = [
    'Excel dışa aktarımı nasıl yapılır?',
    'TreeList hiyerarşik veri örneği ver',
    'Performans metrikleri nelerdir?'
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Medya & Döküman Araçları
        </span>
        <h1 className="text-3xl font-black mt-2">Panoptes Belge, Filtreleme & AI Sohbet Araçları</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          PDF döküman okuyucu (PDFViewer), görsel koşul/sorgu motoru (Filter), yapay zeka mesajlaşma (Chat), özellik denetleyici (PropertyGrid) ve medya oynatıcı (MediaPlayer).
        </p>
      </div>

      {/* PropertyGrid & Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">PropertyGrid (Özellik Denetleyici)</h3>
          <PropertyGrid properties={initialProperties} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">Chat (Conversational UI & AI Chat)</h3>
          <Chat initialMessages={initialChatMessages} suggestedActions={suggestedActions} />
        </div>
      </div>

      {/* Filter Builder */}
      <div className="space-y-2">
        <h3 className="text-sm font-black text-slate-800">Filter (Görsel Koşul & Sorgu Motoru)</h3>
        <Filter fields={['Ürün Adı', 'Kategori', 'Birim Fiyat', 'Stok Adedi', 'Durum']} />
      </div>

      {/* PDFViewer & MediaPlayer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">PDFViewer (Döküman Okuyucu)</h3>
          <PDFViewer title="Panoptes_Sistem_Mimarisi.pdf" totalPages={6} />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-black text-slate-800">MediaPlayer (Video & Ses Oynatıcı)</h3>
          <MediaPlayer title="Panoptes UI Tanıtım & Kurulum Kılavuzu" />
        </div>
      </div>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (Document & Media Tools Overview)"
          code={`import { PropertyGrid, Chat, PDFViewer, Filter, MediaPlayer } from '@panoptes/react';

export function MediaToolsExample() {
  return (
    <div className="space-y-6">
      <PropertyGrid properties={properties} />
      <Chat initialMessages={messages} />
      <PDFViewer title="dokuman.pdf" totalPages={6} />
      <Filter fields={['Ad', 'Kategori', 'Fiyat']} />
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}
