import React from 'react';
import { TaskBoard, Scheduler, Gantt, KanbanColumn, SchedulerEvent, GanttTask } from '@panoptes/react';
import { LightCodeViewer } from '../components/ComponentShowcase';

export function SchedulingDemo() {
  const initialColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'Yapılacaklar',
      cards: [
        { id: 'c1', title: 'React 19 Uyumluluk Testleri', tag: 'Core', assignee: 'Ahmet' },
        { id: 'c2', title: 'Excel UTF-8 BOM Doğrulama', tag: 'Export', assignee: 'Elif' }
      ]
    },
    {
      id: 'in_progress',
      title: 'Devam Edenler',
      cards: [
        { id: 'c3', title: 'TreeList Çoklu Seviye Girintileme', tag: 'Data', assignee: 'Murat' },
        { id: 'c4', title: 'Sütun Filtre Popover Metin Hizalama', tag: 'UI', assignee: 'Can' }
      ]
    },
    {
      id: 'done',
      title: 'Tamamlananlar',
      cards: [
        { id: 'c5', title: '15 Grid Alt Modülü Tamamlandı', tag: 'Release', assignee: 'Takım' }
      ]
    }
  ];

  const schedulerEvents: SchedulerEvent[] = [
    { id: 'e1', title: 'Sürüm Planlama', time: '10:00' },
    { id: 'e2', title: 'Sprint Review', time: '14:30' },
    { id: 'e3', title: 'Tasarım Hizalama', time: '16:00' }
  ];

  const ganttTasks: GanttTask[] = [
    { id: 'g1', title: '1. Çekirdek Mimari Kurulumu', startDay: 1, durationDays: 4, progress: 100, color: '#10b981' },
    { id: 'g2', title: '2. Form & Editör Bileşenleri', startDay: 4, durationDays: 6, progress: 100, color: '#3b82f6' },
    { id: 'g3', title: '3. Ağaç & Hiyerarşik Veri', startDay: 8, durationDays: 5, progress: 85, color: '#6366f1' },
    { id: 'g4', title: '4. Grafikler & Görselleştirme', startDay: 12, durationDays: 5, progress: 90, color: '#f59e0b' },
    { id: 'g5', title: '5. Canlı Test & Doğrulama', startDay: 16, durationDays: 4, progress: 70, color: '#ec4899' }
  ];

  return (
    <div className="space-y-6 font-sans text-left">
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 p-8 rounded-3xl text-white shadow-xl">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30">
          Planlama & Ajanda
        </span>
        <h1 className="text-3xl font-black mt-2">Panoptes TaskBoard, Scheduler & Gantt Bileşenleri</h1>
        <p className="text-slate-300 text-sm mt-1 max-w-2xl">
          Kanban iş panoları, randevu takvimi, zaman çizelgesi ve Gantt şeması.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-800">TaskBoard (Kanban Panosu)</h3>
        <TaskBoard initialColumns={initialColumns} />
      </div>

      <div className="space-y-4 pt-2">
        <Gantt tasks={ganttTasks} totalDays={20} />
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-black text-slate-800">Scheduler (Ajanda & Randevu Takvimi)</h3>
        <Scheduler events={schedulerEvents} date="Ekim 2026" />
      </div>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label="TypeScript JSX (Scheduling & Gantt Overview)"
          code={`import { TaskBoard, Scheduler, Gantt } from '@panoptes/react';

export function ProjectPlanningExample() {
  return (
    <div className="space-y-6">
      <TaskBoard initialColumns={columns} />
      <Gantt tasks={tasks} totalDays={20} />
      <Scheduler events={events} date="Ekim 2026" />
    </div>
  );
}`}
        />
      </div>
    </div>
  );
}

