import React, { useState } from 'react';

// ==========================================
// 1. TaskBoard (Kanban Panosu)
// ==========================================
export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  tag?: string;
  tagColor?: string;
  assignee?: string;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
}

export function TaskBoard({
  initialColumns,
  onCardMove
}: {
  initialColumns: KanbanColumn[];
  onCardMove?: (cardId: string, fromCol: string, toCol: string) => void;
}) {
  const [columns, setColumns] = useState(initialColumns);

  const moveCard = (cardId: string, targetColId: string) => {
    let movedCard: KanbanCard | null = null;
    let sourceColId = '';

    const newCols = columns.map(col => {
      const found = col.cards.find(c => c.id === cardId);
      if (found) {
        movedCard = found;
        sourceColId = col.id;
        return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
      }
      return col;
    });

    if (movedCard) {
      const finalCols = newCols.map(col => {
        if (col.id === targetColId) {
          return { ...col, cards: [...col.cards, movedCard!] };
        }
        return col;
      });
      setColumns(finalCols);
      if (onCardMove) onCardMove(cardId, sourceColId, targetColId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-left">
      {columns.map(col => (
        <div key={col.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <span className="font-black text-xs text-slate-800 uppercase tracking-wider">{col.title}</span>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
              {col.cards.length}
            </span>
          </div>

          <div className="space-y-2.5">
            {col.cards.map(card => (
              <div
                key={card.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-slate-900">{card.title}</span>
                  {card.tag && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                      {card.tag}
                    </span>
                  )}
                </div>
                {card.description && <p className="text-[11px] text-slate-500">{card.description}</p>}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px]">
                  <span className="font-semibold text-slate-600">👤 {card.assignee || 'Atanmadı'}</span>
                  <div className="flex gap-1">
                    {columns
                      .filter(c => c.id !== col.id)
                      .map(target => (
                        <button
                          key={target.id}
                          type="button"
                          onClick={() => moveCard(card.id, target.id)}
                          className="px-1.5 py-0.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded font-bold transition cursor-pointer"
                        >
                          → {target.title}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 2. Scheduler (Basit Ajanda / Randevu Takvimi)
// ==========================================
export interface SchedulerEvent {
  id: string;
  title: string;
  time: string;
  color?: string;
}

export function Scheduler({
  events,
  date = 'Ekim 2026'
}: {
  events: SchedulerEvent[];
  date?: string;
}) {
  const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm font-sans text-left space-y-4">
      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase">Ajanda & Randevu</span>
          <h3 className="text-base font-black text-slate-900">{date}</h3>
        </div>
        <div className="flex gap-1.5">
          <button type="button" className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold">
            Bugün
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-500">
        {days.map((d, i) => (
          <div key={i} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 31 }).map((_, i) => {
          const dayNum = i + 1;
          const dayEvents = events.filter((_, idx) => idx % 7 === i % 7);

          return (
            <div
              key={i}
              className={`min-h-[70px] p-1.5 border rounded-xl flex flex-col justify-between transition ${
                dayNum === 12 ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <span className={`text-[11px] font-bold ${dayNum === 12 ? 'text-blue-600' : 'text-slate-700'}`}>
                {dayNum}
              </span>
              <div className="space-y-1">
                {dayEvents.slice(0, 1).map(ev => (
                  <div
                    key={ev.id}
                    className="p-1 bg-blue-600 text-white rounded text-[9px] font-bold truncate"
                  >
                    {ev.time} {ev.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 3. Gantt (Zaman Çizelgesi & Proje Planı)
// ==========================================
export interface GanttTask {
  id: string;
  title: string;
  startDay: number; // 1-30
  durationDays: number; // 1-30
  progress: number; // 0-100
  color?: string;
  assignee?: string;
}

export function Gantt({
  tasks,
  totalDays = 20
}: {
  tasks: GanttTask[];
  totalDays?: number;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm font-sans text-left">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
        <div>
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Gantt Şeması & Zaman Çizelgesi
          </span>
          <p className="text-[11px] text-slate-500">Proje adımları ve tamamlanma oranları</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          {/* Header Days */}
          <div className="flex border-b border-slate-200 bg-slate-100/50 text-[10px] font-bold text-slate-600">
            <div className="w-56 p-2.5 shrink-0 border-r border-slate-200">Görev Adı</div>
            <div className="w-20 p-2.5 shrink-0 border-r border-slate-200 text-center">İlerleme</div>
            <div className="flex-1 flex">
              {Array.from({ length: totalDays }).map((_, d) => (
                <div
                  key={d}
                  className="flex-1 p-2 text-center border-r border-slate-100 last:border-r-0 font-mono"
                >
                  G{d + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {tasks.map(task => {
              const leftPercent = ((task.startDay - 1) / totalDays) * 100;
              const widthPercent = (task.durationDays / totalDays) * 100;

              return (
                <div key={task.id} className="flex items-center hover:bg-slate-50/80 transition text-xs py-2">
                  <div className="w-56 px-3 shrink-0 border-r border-slate-200 truncate font-semibold text-slate-800">
                    {task.title}
                  </div>
                  <div className="w-20 px-2 shrink-0 border-r border-slate-200 text-center font-bold text-slate-600">
                    %{task.progress}
                  </div>
                  <div className="flex-1 relative h-6 mx-2 bg-slate-50 rounded-lg overflow-hidden">
                    <div
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: task.color || '#3b82f6'
                      }}
                      className="absolute top-0 bottom-0 rounded-md shadow-xs flex items-center px-1.5 transition-all text-[9px] text-white font-bold overflow-hidden"
                    >
                      <div
                        style={{ width: `${task.progress}%` }}
                        className="absolute inset-y-0 left-0 bg-black/20"
                      />
                      <span className="relative z-10 truncate">{task.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

