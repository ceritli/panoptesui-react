import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { TaskBoard, KanbanColumn } from '@panoptes/react';

export function TaskBoardDemo() {
  const [boardHistory, setBoardHistory] = useState<string>('Pano hazır.');

  const initialColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'Yapılacaklar',
      cards: [
        { id: 'c1', title: 'Grafik motoru entegrasyonu', description: 'SVG tabanlı pasta ve çizgi grafikleri', tag: 'Özellik', assignee: 'Ali V.' },
        { id: 'c2', title: 'W3C Erişilebilirlik (a11y) denetimi', description: 'ARIA etiketleri ve klavye gezintisi', tag: 'QA', assignee: 'Elif S.' }
      ]
    },
    {
      id: 'inprogress',
      title: 'Devam Edenler',
      cards: [
        { id: 'c3', title: 'React 19 Demo sayfaları', description: '44 Kurumsal UI bileşeninin birebir sayfaları', tag: 'Kritik', assignee: 'Deniz A.' },
        { id: 'c4', title: 'Excel Formül Çubuğu (fx)', description: 'SUM, AVG, MIN, MAX formülleri', tag: 'Geliştirme', assignee: 'Can B.' }
      ]
    },
    {
      id: 'done',
      title: 'Tamamlananlar',
      cards: [
        { id: 'c5', title: 'TreeList Ağaç Tablosu', description: 'Hiyerarşik veri motoru', tag: 'Tamamlandı', assignee: 'Zeynep K.' },
        { id: 'c6', title: 'PivotGrid Çapraz Matris', description: 'Q1-Q4 finansal özet', tag: 'Tamamlandı', assignee: 'Deniz A.' }
      ]
    }
  ];

  return (
    <ComponentShowcase
      title="TaskBoard (Kanban Panosu)"
      category="TaskBoard"
      description="Agile / Scrum sprint yönetimi için sütunlar arası kart taşıma desteği sunan Kanban iş takip panosu. Etiketler, atanan kişiler ve özel renk temaları içerir."
      propsRows={[
        { name: 'initialColumns', type: 'KanbanColumn[]', default: '[]', description: 'Başlangıç sütunları ve içerisindeki kartlar ({ id, title, cards }).' },
        { name: 'onCardMove', type: '(cardId: string, fromCol: string, toCol: string) => void', default: '-', description: 'Bir kart başka bir sütuna taşındığında tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Sprint İş Takip Panosu (3 Sütun)',
          description: 'Kartları sütunlar arasında taşımak için kartın altındaki "→ Sütun Adı" butonlarını kullanabilirsiniz.',
          preview: (
            <div className="space-y-4 max-w-4xl">
              <TaskBoard
                initialColumns={initialColumns}
                onCardMove={(cardId, from, to) => setBoardHistory(`Kart [${cardId}], "${from}" sütunundan "${to}" sütununa taşındı.`)}
              />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                Pano Geçmişi: <strong>{boardHistory}</strong>
              </div>
            </div>
          ),
          code: `import { TaskBoard } from '@panoptes/react';

export function KanbanBoardDemo() {
  const columns = [
    {
      id: 'todo',
      title: 'Yapılacaklar',
      cards: [{ id: '1', title: 'Yeni Görev', tag: 'Plan' }]
    },
    {
      id: 'in_progress',
      title: 'Devam Edenler',
      cards: [{ id: '2', title: 'Kod İnceleme', tag: 'Geliştirme' }]
    },
    {
      id: 'done',
      title: 'Tamamlandı',
      cards: [{ id: '3', title: 'Sprint Dağıtımı', tag: 'Bitti' }]
    }
  ];

  return <TaskBoard initialColumns={columns} onCardMove={(id, from, to) => console.log(id, from, to)} />;
}`
        }
      ]}
    />
  );
}
