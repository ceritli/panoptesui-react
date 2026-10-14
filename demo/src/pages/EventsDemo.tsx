import React, { useState } from 'react';
import { PanoptesGrid, GridColumn, usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';
import { Product } from '../types';
import { LightCodeViewer } from '../components/ComponentShowcase';

interface LogEntry {
  id: string;
  time: string;
  event: string;
  detail: string;
}

export function EventsDemo({ products }: { products: Product[] }) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      time: new Date().toLocaleTimeString(),
      event: 'onGridReady',
      detail: t.pages.events.readyLog(products.length || 20)
    }
  ]);

  const addLog = (event: string, detail: string) => {
    const entry: LogEntry = {
      id: Math.random().toString(),
      time: new Date().toLocaleTimeString(),
      event,
      detail
    };
    setLogs(prev => [entry, ...prev.slice(0, 49)]); // keep last 50 logs
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              {t.pages.events.title}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              {t.pages.events.badge}
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
            {t.pages.events.desc}
          </p>
        </div>
      </div>

      {/* Live Event Console */}
      <div className="bg-white rounded-2xl p-4 text-slate-800 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold font-mono text-emerald-700">{t.pages.events.consoleTitle}</span>
          </div>
          <button
            type="button"
            onClick={() => setLogs([])}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
          >
            {t.pages.events.clearConsole}
          </button>
        </div>
        <div className="space-y-1.5 max-h-36 overflow-y-auto font-mono text-xs">
          {logs.map(log => (
            <div key={log.id} className="flex items-start gap-3 text-slate-700">
              <span className="text-slate-400 text-[11px] shrink-0">{log.time}</span>
              <span className="text-indigo-600 font-bold shrink-0">{log.event}</span>
              <span className="text-slate-600 truncate">{log.detail}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-slate-400 text-xs italic py-2">{t.pages.events.emptyLogs}</div>
          )}
        </div>
      </div>

      {/* Grid with callbacks */}
      <PanoptesGrid
        data={products}
        pageSize={6}
        pageSizes={[6, 12]}
        sortable={true}
        filterable={true}
        selectable={true}
        searchable={true}
        onSelectionChange={(selected) => {
          addLog('onSelectionChange', t.pages.events.rowSelectedLog(selected.length));
        }}
        onSave={(record) => {
          addLog('onSave', t.pages.events.rowSavedLog(record.id, record.name));
        }}
      >
        <GridColumn field="id" title={t.common.columns.id} width="60px" align="center" />
        <GridColumn field="name" title={t.common.columns.productName} width="240px" />
        <GridColumn field="category" title={t.common.columns.category} width="160px" />
        <GridColumn field="country" title={t.common.columns.country} width="140px" format="country" />
        <GridColumn field="price" title={t.common.columns.price} width="130px" format="currency" align="right" />
        <GridColumn field="stock" title={t.common.columns.stock} width="90px" align="center" />
        <GridColumn field="customerRating" title={t.common.columns.rating} width="130px" format="stars" />
      </PanoptesGrid>

      {/* Code Snippet */}
      <div className="space-y-2">
        <LightCodeViewer
          label={t.common.reactUsageCode}
          code={`<PanoptesGrid
  data={products}
  pageSize={6}
  sortable={true}
  selectable={true}
  onSelectionChange={(selected) => console.log('Seçilenler:', selected)}
  onSave={(record) => console.log('Kaydedildi:', record)}
>
  <GridColumn field="id" title="#" width="60px" align="center" />
  <GridColumn field="name" title="Ürün Adı" width="240px" />
  <GridColumn field="price" title="Fiyat" format="currency" align="right" />
</PanoptesGrid>`}
        />
      </div>
    </div>
  );
}
