import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Gantt, GanttTask } from '@panoptes/react';

export function GanttDemo() {
  const projectTasks: GanttTask[] = [
    { id: '1', title: 'Gereksinim Analizi & Mimarisi', startDay: 1, durationDays: 4, progress: 100, assignee: 'Deniz A.' },
    { id: '2', title: 'Veritabanı Şeması & API Tasarımı', startDay: 4, durationDays: 5, progress: 85, assignee: 'Cem T.' },
    { id: '3', title: 'React 19 Frontend Bileşenleri', startDay: 7, durationDays: 8, progress: 60, assignee: 'Zeynep K.' },
    { id: '4', title: 'Entegrasyon & Uçtan Uca Testler', startDay: 13, durationDays: 5, progress: 25, assignee: 'Barış M.' },
    { id: '5', title: 'Canlıya Çıkış & Üretim Dağıtımı', startDay: 17, durationDays: 3, progress: 0, assignee: 'DevOps' }
  ];

  return (
    <ComponentShowcase
      title="Gantt (Zaman Çizelgesi & Proje Planı)"
      category="Gantt"
      description="Proje zaman çizelgeleri, görev süreleri, ilerleme yüzdeleri ve iş kırılım yapılarını (WBS) görselleştiren kurumsal Gantt şeması bileşeni."
      propsRows={[
        { name: 'tasks', type: 'GanttTask[]', default: '[]', description: 'Proje görevleri ({ id, title, startDay, durationDays, progress, assignee? }).' },
        { name: 'totalDays', type: 'number', default: '20', description: 'Zaman çizelgesinde görüntülenecek toplam gün sayısı.' }
      ]}
      examples={[
        {
          title: 'Yazılım Sürüm Projesi Gantt Çizelgesi',
          description: 'Görevlerin başlangıç günleri, süreleri, ilerleme çubukları ve atanan uzmanlar.',
          preview: (
            <div className="space-y-4 max-w-4xl">
              <Gantt
                tasks={projectTasks}
                totalDays={20}
              />
            </div>
          ),
          code: `import { Gantt } from '@panoptes/react';

export function ProjectGanttDemo() {
  const tasks = [
    { id: '1', title: 'Gereksinim Analizi', startDay: 1, durationDays: 4, progress: 100 },
    { id: '2', title: 'API Geliştirme', startDay: 4, durationDays: 5, progress: 80 },
    { id: '3', title: 'Arayüz Tasarımı', startDay: 8, durationDays: 6, progress: 40 }
  ];

  return <Gantt tasks={tasks} totalDays={20} />;
}`
        }
      ]}
    />
  );
}
