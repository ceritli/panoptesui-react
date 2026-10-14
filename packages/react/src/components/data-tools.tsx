import React, { useState } from 'react';

// ==========================================
// 1. TreeList (Hiyerarşik Ağaç Tablosu)
// ==========================================
export interface TreeListItem {
  id: string | number;
  parentId?: string | number | null;
  [key: string]: any;
}

export interface TreeListColumn {
  field: string;
  title: string;
  width?: string;
}

export function TreeList({
  data,
  columns,
  idField = 'id',
  parentIdField = 'parentId'
}: {
  data: TreeListItem[];
  columns: TreeListColumn[];
  idField?: string;
  parentIdField?: string;
}) {
  const [expandedIds, setExpandedIds] = useState<(string | number)[]>([]);

  const toggleExpand = (id: string | number) => {
    setExpandedIds(expandedIds.includes(id) ? expandedIds.filter(i => i !== id) : [...expandedIds, id]);
  };

  // Build tree
  const getChildren = (parentId: string | number | null) => {
    return data.filter(item => (item[parentIdField] ?? null) === parentId);
  };

  const renderRow = (item: TreeListItem, depth = 0): React.ReactNode => {
    const itemId = item[idField];
    const children = getChildren(itemId);
    const hasChildren = children.length > 0;
    const isExpanded = expandedIds.includes(itemId);

    return (
      <React.Fragment key={itemId}>
        <tr className="hover:bg-slate-50 border-b border-slate-100 transition text-xs">
          {columns.map((col, idx) => {
            const isFirst = idx === 0;
            return (
              <td key={col.field} className="py-2.5 px-3">
                <div
                  className="flex items-center gap-1.5"
                  style={isFirst ? { paddingLeft: `${depth * 20}px` } : undefined}
                >
                  {isFirst && hasChildren && (
                    <button
                      type="button"
                      onClick={() => toggleExpand(itemId)}
                      className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-700 font-bold"
                    >
                      {isExpanded ? '▼' : '▶'}
                    </button>
                  )}
                  {isFirst && !hasChildren && <span className="w-5" />}
                  <span className={isFirst ? 'font-bold text-slate-800' : 'text-slate-600'}>
                    {item[col.field]}
                  </span>
                </div>
              </td>
            );
          })}
        </tr>
        {hasChildren && isExpanded && children.map(c => renderRow(c, depth + 1))}
      </React.Fragment>
    );
  };

  const rootItems = getChildren(null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm font-sans text-left">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-left text-xs font-black text-slate-600">
            {columns.map(col => (
              <th key={col.field} style={{ width: col.width }} className="py-3 px-3">
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rootItems.map(item => renderRow(item))}</tbody>
      </table>
    </div>
  );
}

// ==========================================
// 2. ListView (Kart Şablonlu Liste)
// ==========================================
export function ListView<T extends { id: string | number }>({
  data,
  renderItem,
  columns = 3
}: {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
}) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-4 font-sans text-left`}>
      {data.map(item => (
        <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-md transition">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 3. Standalone Pager
// ==========================================
export function Pager({
  totalItems,
  pageSize = 10,
  currentPage = 1,
  onPageChange
}: {
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-2xs text-xs font-sans text-slate-600">
      <div>
        Toplam <strong>{totalItems}</strong> kayıttan{' '}
        <strong>{(currentPage - 1) * pageSize + 1}</strong> -{' '}
        <strong>{Math.min(currentPage * pageSize, totalItems)}</strong> arası
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="px-2.5 py-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 cursor-pointer"
        >
          Önceki
        </button>
        <span className="px-2 font-bold text-slate-900">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="px-2.5 py-1 rounded-lg border border-slate-200 disabled:opacity-30 hover:bg-slate-50 cursor-pointer"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. PropertyGrid (Özellik Düzenleyici)
// ==========================================
export interface PropertyItem {
  id: string;
  name: string;
  category: string;
  value: any;
  type: 'text' | 'number' | 'boolean' | 'color' | 'select';
  options?: string[];
  description?: string;
}

export function PropertyGrid({
  properties,
  onChange
}: {
  properties: PropertyItem[];
  onChange?: (id: string, value: any) => void;
}) {
  const [propsList, setPropsList] = useState(properties);
  const [filter, setFilter] = useState('');

  const handleValChange = (id: string, val: any) => {
    setPropsList(prev => prev.map(p => (p.id === id ? { ...p, value: val } : p)));
    if (onChange) onChange(id, val);
  };

  const categories = Array.from(new Set(propsList.map(p => p.category)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm font-sans text-left">
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center gap-2">
        <span className="text-xs font-black text-slate-800 uppercase tracking-wider">Property Inspector</span>
        <input
          type="text"
          placeholder="Özellik ara..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-white outline-none focus:border-blue-500 w-44"
        />
      </div>

      <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
        {categories.map(cat => {
          const items = propsList.filter(
            p => p.category === cat && p.name.toLowerCase().includes(filter.toLowerCase())
          );
          if (items.length === 0) return null;

          return (
            <div key={cat} className="space-y-1">
              <div className="px-3 py-1.5 bg-slate-100/70 text-[11px] font-black text-slate-600 uppercase tracking-wider">
                {cat}
              </div>
              {items.map(prop => (
                <div key={prop.id} className="px-4 py-2 flex items-center justify-between gap-4 hover:bg-slate-50 text-xs">
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">{prop.name}</span>
                    {prop.description && <p className="text-[10px] text-slate-400">{prop.description}</p>}
                  </div>
                  <div className="w-44 flex justify-end">
                    {prop.type === 'boolean' ? (
                      <input
                        type="checkbox"
                        checked={Boolean(prop.value)}
                        onChange={e => handleValChange(prop.id, e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                      />
                    ) : prop.type === 'color' ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={prop.value}
                          onChange={e => handleValChange(prop.id, e.target.value)}
                          className="w-7 h-7 rounded border border-slate-200 cursor-pointer p-0.5"
                        />
                        <span className="font-mono text-[11px] text-slate-500">{prop.value}</span>
                      </div>
                    ) : prop.type === 'select' && prop.options ? (
                      <select
                        value={prop.value}
                        onChange={e => handleValChange(prop.id, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white"
                      >
                        {prop.options.map(o => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    ) : prop.type === 'number' ? (
                      <input
                        type="number"
                        value={prop.value}
                        onChange={e => handleValChange(prop.id, Number(e.target.value))}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                      />
                    ) : (
                      <input
                        type="text"
                        value={prop.value}
                        onChange={e => handleValChange(prop.id, e.target.value)}
                        className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 5. Chat (Conversational UI)
// ==========================================
export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  senderName: string;
  avatar?: string;
  text: string;
  timestamp: string;
}

export function Chat({
  initialMessages,
  onSendMessage,
  suggestedActions
}: {
  initialMessages: ChatMessage[];
  onSendMessage?: (msg: string) => void;
  suggestedActions?: string[];
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');

  const send = (textToSend?: string) => {
    const val = textToSend || input;
    if (!val.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'Siz',
      text: val,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (onSendMessage) onSendMessage(val);

    // Simulated Bot Reply
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        senderName: 'Panoptes Asistan',
        text: `"${val}" talebinizi aldım, işlem başlatıldı.`,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[460px] font-sans text-left">
      {/* Header */}
      <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
            🤖
          </div>
          <div>
            <h4 className="text-xs font-bold">Panoptes AI Assistant</h4>
            <span className="text-[10px] text-emerald-400 font-medium">● Çevrimiçi</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                {isUser ? '👤' : '🤖'}
              </div>
              <div className={`max-w-[75%] space-y-1 ${isUser ? 'items-end' : ''}`}>
                <div
                  className={`p-3 rounded-2xl text-xs ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
                <div className={`text-[9px] text-slate-400 px-1 ${isUser ? 'text-right' : ''}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggested Actions */}
      {suggestedActions && suggestedActions.length > 0 && (
        <div className="p-2 bg-slate-50 border-t border-slate-100 flex gap-1.5 overflow-x-auto">
          {suggestedActions.map((action, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => send(action)}
              className="px-2.5 py-1 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200 rounded-full text-[11px] font-bold text-slate-700 whitespace-nowrap transition cursor-pointer"
            >
              {action}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Mesajınızı yazın..."
          className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 outline-none focus:bg-white focus:border-blue-500"
        />
        <button
          type="button"
          onClick={() => send()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. PDFViewer (PDF Döküman Okuyucu)
// ==========================================
export function PDFViewer({
  title = 'Rapor_Belgesi.pdf',
  totalPages = 5
}: {
  title?: string;
  totalPages?: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm font-sans text-left">
      {/* Toolbar */}
      <div className="p-3 bg-slate-800 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold">📄 {title}</span>
        </div>

        {/* Paging */}
        <div className="flex items-center gap-1.5 bg-slate-700/60 px-2.5 py-1 rounded-lg">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="disabled:opacity-30 hover:text-blue-300 font-bold px-1"
          >
            ◀
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="disabled:opacity-30 hover:text-blue-300 font-bold px-1"
          >
            ▶
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom(z => Math.max(50, z - 10))}
            className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-bold"
          >
            -
          </button>
          <span className="font-mono text-[11px]">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom(z => Math.min(200, z + 10))}
            className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded font-bold"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => alert('PDF indirme başlatıldı')}
            className="ml-2 px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded font-bold text-white transition"
          >
            İndir
          </button>
        </div>
      </div>

      {/* Document View Canvas */}
      <div className="p-8 bg-slate-100 flex justify-center min-h-[360px] overflow-auto">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="w-[500px] min-h-[600px] bg-white shadow-xl rounded-lg p-10 space-y-6 transition-transform text-slate-800 text-xs"
        >
          <div className="border-b pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-base font-black text-slate-900">PANOPTES DÖKÜMAN RAPORU</h2>
              <p className="text-[11px] text-slate-500">Sayfa {currentPage} / {totalPages}</p>
            </div>
            <div className="text-right text-[10px] text-slate-400">
              Oluşturma: {new Date().toLocaleDateString('tr-TR')}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-700">1. Yönetici Özeti</h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Bu belge Panoptes UI bileşen mimarisinin PDFViewer modülü tarafından taranıp oluşturulmuş örnek sayfadır.
              Tüm tablolar, metrikler ve görsel düzenlemeler yüksek çözünürlüklü vektör olarak işlenir.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between font-bold text-[11px]">
              <span>Modül Durumu</span>
              <span className="text-emerald-600">%100 Tamamlandı</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. Filter (Görsel Koşul ve Sorgu Motoru)
// ==========================================
export interface FilterRule {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export function Filter({
  fields = ['Ad', 'Kategori', 'Fiyat', 'Stok', 'Durum'],
  onApply
}: {
  fields?: string[];
  onApply?: (rules: FilterRule[], logic: 'AND' | 'OR') => void;
}) {
  const [logic, setLogic] = useState<'AND' | 'OR'>('AND');
  const [rules, setRules] = useState<FilterRule[]>([
    { id: '1', field: 'Kategori', operator: 'içerir', value: 'Elektronik' },
    { id: '2', field: 'Fiyat', operator: 'büyüktür', value: '500' }
  ]);

  const addRule = () => {
    setRules(prev => [
      ...prev,
      { id: Date.now().toString(), field: fields[0], operator: 'içerir', value: '' }
    ]);
  };

  const removeRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const updateRule = (id: string, key: keyof FilterRule, val: string) => {
    setRules(prev => prev.map(r => (r.id === id ? { ...r, [key]: val } : r)));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm font-sans text-left space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Görsel Sorgu Motoru (Query Builder)
          </span>
          <div className="flex rounded-lg overflow-hidden border border-slate-200">
            <button
              type="button"
              onClick={() => setLogic('AND')}
              className={`px-3 py-1 text-xs font-bold transition cursor-pointer ${
                logic === 'AND' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              VE (AND)
            </button>
            <button
              type="button"
              onClick={() => setLogic('OR')}
              className={`px-3 py-1 text-xs font-bold transition cursor-pointer ${
                logic === 'OR' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              VEYA (OR)
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={addRule}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer"
        >
          + Koşul Ekle
        </button>
      </div>

      <div className="space-y-2.5">
        {rules.map((rule, idx) => (
          <div
            key={rule.id}
            className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs"
          >
            <span className="text-[10px] font-bold text-slate-400 w-5">#{idx + 1}</span>
            <select
              value={rule.field}
              onChange={e => updateRule(rule.id, 'field', e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
            >
              {fields.map(f => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              value={rule.operator}
              onChange={e => updateRule(rule.id, 'operator', e.target.value)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium"
            >
              <option value="içerir">içerir</option>
              <option value="eşittir">eşittir</option>
              <option value="büyüktür">büyüktür (&gt;)</option>
              <option value="küçüktür">küçüktür (&lt;)</option>
              <option value="başlar">ile başlar</option>
            </select>

            <input
              type="text"
              placeholder="Değer..."
              value={rule.value}
              onChange={e => updateRule(rule.id, 'value', e.target.value)}
              className="flex-1 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => removeRule(rule.id)}
              className="w-7 h-7 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-lg transition font-bold"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={() => onApply && onApply(rules, logic)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
        >
          Filtreyi Uygula
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 8. MediaPlayer (Video & Ses Oynatıcı)
// ==========================================
export function MediaPlayer({
  title = 'Tanıtım Videosu'
}: {
  title?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [volume, setVolume] = useState(80);

  return (
    <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-800 text-white font-sans text-left">
      {/* Media Canvas Area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-blue-600/80 hover:bg-blue-600 flex items-center justify-center text-2xl mx-auto shadow-lg cursor-pointer transition"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸' : '▶'}
          </div>
          <p className="text-xs font-bold text-slate-300">{title}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3.5 space-y-2 bg-slate-900">
        {/* Progress */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            setProgress(Math.round((clickX / rect.width) * 100));
          }}
        >
          <div style={{ width: `${progress}%` }} className="bg-blue-500 h-full rounded-full" />
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-sm hover:text-blue-400 font-bold"
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <span className="text-[11px] text-slate-400 font-mono">01:15 / 04:30</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px]">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-20 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

