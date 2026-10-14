import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Scheduler, SchedulerEvent } from '@panoptes/react';

export function SchedulerDemo() {
  const events: SchedulerEvent[] = [
    { id: '1', title: 'Sprint Planlama', time: '10:00' },
    { id: '2', title: 'Müşteri Demosu', time: '14:30' },
    { id: '3', title: 'Yönetim Kurulu', time: '16:00' },
    { id: '4', title: 'Mimari Değerlendirme', time: '11:15' },
    { id: '5', title: 'Sunucu Dağıtımı', time: '19:00' }
  ];

  return (
    <ComponentShowcase
      title="Scheduler (Ajanda & Randevu Takvimi)"
      category="Scheduler"
      description="Günlük, haftalık ve aylık görünümleri destekleyen kurumsal takvim ve randevu planlama bileşeni. Etkinlikler, toplantılar ve kaynak tahsisi için idealdir."
      propsRows={[
        { name: 'events', type: 'SchedulerEvent[]', default: '[]', description: 'Takvimde listelenecek etkinlikler ({ id, title, time, color? }).' },
        { name: 'date', type: 'string', default: "'Ekim 2026'", description: 'Görüntülenen ay ve yıl başlığı.' }
      ]}
      examples={[
        {
          title: 'Aylık Ajanda & Etkinlik Takvimi',
          description: 'Ayın günleri ve belirlenen saatlerdeki toplantı etkinlikleri.',
          preview: (
            <div className="space-y-4 max-w-3xl">
              <Scheduler
                date="Ekim 2026"
                events={events}
              />
            </div>
          ),
          code: `import { Scheduler } from '@panoptes/react';

export function CalendarSchedulerDemo() {
  const events = [
    { id: '1', title: 'Sprint Planlama', time: '10:00' },
    { id: '2', title: 'Müşteri Demosu', time: '14:30' },
    { id: '3', title: 'Yönetim Toplantısı', time: '16:00' }
  ];

  return <Scheduler date="Ekim 2026" events={events} />;
}`
        }
      ]}
    />
  );
}
