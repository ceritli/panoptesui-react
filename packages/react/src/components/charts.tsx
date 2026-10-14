import React from 'react';

// ==========================================
// 1. Chart (Bar, Column, Line, Pie)
// ==========================================
export interface ChartSeries {
  name: string;
  value: number;
  color?: string;
}

export interface ChartProps {
  title?: string;
  type?: 'column' | 'bar' | 'donut';
  data: ChartSeries[];
  height?: number;
}

export function Chart({ title, type = 'column', data, height = 220 }: ChartProps) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const total = data.reduce((acc, d) => acc + d.value, 0);

  const defaultColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm font-sans text-left space-y-4">
      {title && <h3 className="text-sm font-black text-slate-800">{title}</h3>}

      {type === 'column' && (
        <div style={{ height: `${height}px` }} className="flex items-end gap-3 pt-6 pb-2 px-2 border-b border-slate-200">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / maxVal) * 100);
            const color = item.color || defaultColors[idx % defaultColors.length];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition">
                  {item.value}
                </span>
                <div
                  style={{ height: `${pct}%`, backgroundColor: color }}
                  className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                />
                <span className="text-[10px] font-semibold text-slate-600 truncate max-w-full">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {type === 'bar' && (
        <div className="space-y-3">
          {data.map((item, idx) => {
            const pct = Math.round((item.value / maxVal) * 100);
            const color = item.color || defaultColors[idx % defaultColors.length];
            return (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span className="font-bold">{item.value.toLocaleString('tr-TR')}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pct}%`, backgroundColor: color }}
                    className="h-full rounded-full transition-all duration-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {type === 'donut' && (
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              {data.reduce(
                (acc, item, idx) => {
                  const pct = (item.value / total) * 100;
                  const color = item.color || defaultColors[idx % defaultColors.length];
                  const circle = (
                    <circle
                      key={idx}
                      cx="18"
                      cy="18"
                      r="14"
                      fill="transparent"
                      stroke={color}
                      strokeWidth="5"
                      strokeDasharray={`${pct} ${100 - pct}`}
                      strokeDashoffset={`-${acc.offset}`}
                    />
                  );
                  return {
                    offset: acc.offset + pct,
                    elements: [...acc.elements, circle]
                  };
                },
                { offset: 0, elements: [] as React.ReactNode[] }
              ).elements}
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Toplam</span>
              <span className="text-sm font-black text-slate-800">{total}</span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            {data.map((item, idx) => {
              const color = item.color || defaultColors[idx % defaultColors.length];
              return (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md" style={{ backgroundColor: color }} />
                  <span className="text-slate-600 font-medium">{item.name}:</span>
                  <span className="font-bold text-slate-900">{item.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 2. Radial Gauge
// ==========================================
export function Gauge({
  title,
  value,
  min = 0,
  max = 100,
  unit = '%'
}: {
  title?: string;
  value: number;
  min?: number;
  max?: number;
  unit?: string;
}) {
  const pct = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const strokeDashoffset = 100 - pct * 75; // 270 degree arc

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm font-sans flex flex-col items-center justify-center space-y-2">
      {title && <h3 className="text-xs font-bold text-slate-500 uppercase">{title}</h3>}
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full -rotate-135" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="transparent"
            stroke="#f1f5f9"
            strokeWidth="4"
            strokeDasharray="75 25"
          />
          <circle
            cx="18"
            cy="18"
            r="14"
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth="4"
            strokeDasharray="75 25"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-black text-slate-900">{value}</span>
          <span className="text-xs font-semibold text-slate-400">{unit}</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. Barcode & QRCode Component
// ==========================================
export function Barcode({ value, label }: { value: string; label?: string }) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm font-sans flex flex-col items-center space-y-2">
      {label && <span className="text-xs font-bold text-slate-500 uppercase">{label}</span>}
      <div className="flex items-center h-14 space-x-1 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
        {value.split('').map((char, i) => {
          const w = (char.charCodeAt(0) % 3) + 1;
          return <div key={i} style={{ width: `${w * 2}px` }} className="h-full bg-slate-900" />;
        })}
      </div>
      <span className="font-mono text-xs font-bold text-slate-700 tracking-widest">{value}</span>
    </div>
  );
}

// ==========================================
// 4. StockChart (Finansal Mum Grafiği & OHLC)
// ==========================================
export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export function StockChart({
  symbol = 'BIST:PANO',
  data
}: {
  symbol?: string;
  data: CandleData[];
}) {
  const [period, setPeriod] = React.useState('1A');

  const maxVal = Math.max(...data.map(d => d.high), 100);
  const minVal = Math.min(...data.map(d => d.low), 50);
  const range = maxVal - minVal || 1;

  const lastCandle = data[data.length - 1];
  const isUp = lastCandle ? lastCandle.close >= lastCandle.open : true;

  return (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-lg font-sans text-left space-y-4 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-black text-sm text-blue-400">{symbol}</span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                isUp ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}
            >
              ₺{lastCandle?.close.toFixed(2)} {isUp ? '▲' : '▼'}
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Canlı Mum Grafiği (Candlestick & Volume)</p>
        </div>

        <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[11px] font-bold">
          {['1G', '1H', '1A', '3A', '1Y'].map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriod(p)}
              className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                period === p ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Candlestick Canvas */}
      <div className="h-48 flex items-end gap-2 pt-4 pb-2 px-2 border-b border-slate-800/80">
        {data.map((c, i) => {
          const up = c.close >= c.open;
          const highPct = ((c.high - minVal) / range) * 100;
          const lowPct = ((c.low - minVal) / range) * 100;
          const bodyTopPct = ((Math.max(c.open, c.close) - minVal) / range) * 100;
          const bodyBottomPct = ((Math.min(c.open, c.close) - minVal) / range) * 100;
          const bodyHeightPct = Math.max(bodyTopPct - bodyBottomPct, 2);

          return (
            <div key={i} className="flex-1 flex flex-col items-center h-full justify-end relative group">
              {/* Wick */}
              <div
                style={{ bottom: `${lowPct}%`, height: `${highPct - lowPct}%` }}
                className={`absolute w-0.5 ${up ? 'bg-emerald-500' : 'bg-rose-500'}`}
              />
              {/* Body */}
              <div
                style={{ bottom: `${bodyBottomPct}%`, height: `${bodyHeightPct}%` }}
                className={`absolute w-full max-w-[14px] rounded-xs transition-opacity group-hover:opacity-80 ${
                  up ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              <span className="absolute -bottom-5 text-[9px] font-mono text-slate-500">{c.time}</span>
            </div>
          );
        })}
      </div>

      {/* Volume Bars */}
      <div className="h-12 flex items-end gap-2 pt-2 px-2">
        {data.map((c, i) => {
          const up = c.close >= c.open;
          const maxVol = Math.max(...data.map(d => d.volume), 1);
          const volPct = (c.volume / maxVol) * 100;

          return (
            <div key={i} className="flex-1 flex items-end h-full">
              <div
                style={{ height: `${volPct}%` }}
                className={`w-full max-w-[14px] mx-auto rounded-t-xs opacity-40 ${
                  up ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 5. Diagram & OrgChart (Şema & Akış)
// ==========================================
export interface OrgNode {
  id: string;
  name: string;
  title: string;
  role: string;
  children?: OrgNode[];
}

export function Diagram({ rootNode }: { rootNode: OrgNode }) {
  const renderNode = (node: OrgNode): React.ReactNode => {
    return (
      <div key={node.id} className="flex flex-col items-center">
        <div className="bg-white border-2 border-slate-200 rounded-xl p-3 shadow-sm hover:border-blue-500 transition text-center min-w-[140px] space-y-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs mx-auto">
            👤
          </div>
          <div className="text-xs font-black text-slate-900">{node.name}</div>
          <div className="text-[10px] text-blue-600 font-bold">{node.title}</div>
          <div className="text-[9px] text-slate-400">{node.role}</div>
        </div>

        {node.children && node.children.length > 0 && (
          <>
            <div className="w-0.5 h-4 bg-slate-300" />
            <div className="flex gap-6 relative before:content-[''] before:absolute before:top-0 before:left-6 before:right-6 before:h-0.5 before:bg-slate-300">
              {node.children.map(child => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="w-0.5 h-4 bg-slate-300" />
                  {renderNode(child)}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 overflow-x-auto font-sans flex justify-center">
      {renderNode(rootNode)}
    </div>
  );
}

// ==========================================
// 6. Map (Coğrafi Harita & Konum İşaretçisi)
// ==========================================
export interface MapMarker {
  id: string;
  title: string;
  description?: string;
  lat: number;
  lng: number;
  category?: 'office' | 'warehouse' | 'store';
  badge?: string;
}

export function Map({
  markers,
  center = { lat: 39.92, lng: 32.85 }, // Ankara
  zoom = 6,
  onMarkerClick
}: {
  markers: MapMarker[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
}) {
  const [selectedMarker, setSelectedMarker] = React.useState<MapMarker | null>(null);
  const [currentZoom, setCurrentZoom] = React.useState(zoom);

  const markerColors = {
    office: 'bg-blue-600',
    warehouse: 'bg-amber-500',
    store: 'bg-emerald-600'
  };

  return (
    <div className="relative w-full h-80 bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-md font-sans text-left select-none">
      {/* Map Background Grid Simulation */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(#60a5fa 1px, transparent 1px), radial-gradient(#60a5fa 1px, #0f172a 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Map Vector Contours Simulation */}
      <svg className="absolute inset-0 w-full h-full opacity-30 stroke-blue-500 fill-blue-950/40">
        <path d="M 50 120 Q 150 80 250 130 T 450 140 T 650 110 T 800 160 L 800 320 L 50 320 Z" strokeWidth="1.5" />
        <path d="M 100 60 Q 200 40 320 70 T 520 50 T 700 80" fill="none" strokeWidth="1" strokeDasharray="4 4" />
      </svg>

      {/* Zoom and Layer Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1">
        <button
          type="button"
          onClick={() => setCurrentZoom(z => Math.min(z + 1, 12))}
          className="w-8 h-8 rounded-lg bg-slate-800/90 text-white font-bold flex items-center justify-center border border-slate-700 hover:bg-slate-700 shadow-md cursor-pointer"
        >
          +
        </button>
        <button
          type="button"
          onClick={() => setCurrentZoom(z => Math.max(z - 1, 2))}
          className="w-8 h-8 rounded-lg bg-slate-800/90 text-white font-bold flex items-center justify-center border border-slate-700 hover:bg-slate-700 shadow-md cursor-pointer"
        >
          −
        </button>
      </div>

      {/* Scale & Info overlay */}
      <div className="absolute bottom-3 left-4 z-20 bg-slate-800/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-700 text-[11px] text-slate-300 flex items-center gap-3">
        <span>Yakınlaştırma: {currentZoom}x</span>
        <span>•</span>
        <span>{markers.length} Aktif Lokasyon</span>
      </div>

      {/* Markers Canvas */}
      <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around z-10 pointer-events-none">
        {markers.map(m => {
          const color = markerColors[m.category || 'office'];
          const isSelected = selectedMarker?.id === m.id;

          return (
            <div key={m.id} className="pointer-events-auto relative group">
              <button
                type="button"
                onClick={() => {
                  setSelectedMarker(m);
                  onMarkerClick?.(m);
                }}
                className={`relative flex items-center justify-center w-7 h-7 rounded-full text-white font-bold shadow-lg transition-transform hover:scale-125 cursor-pointer ring-4 ${
                  isSelected ? 'scale-125 ring-white' : 'ring-white/30'
                } ${color}`}
              >
                📍
              </button>

              {/* Tooltip / Popup Pin */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800/95 backdrop-blur-xs text-white p-3 rounded-xl border border-slate-700 shadow-2xl transition-all z-30 ${
                  isSelected ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h4 className="text-xs font-black truncate">{m.title}</h4>
                  {m.badge && (
                    <span className="text-[9px] bg-blue-500/30 text-blue-300 px-1.5 py-0.5 rounded-md font-bold">
                      {m.badge}
                    </span>
                  )}
                </div>
                {m.description && <p className="text-[10px] text-slate-300 leading-tight">{m.description}</p>}
                <div className="text-[9px] text-slate-400 font-mono mt-1.5">
                  {m.lat.toFixed(2)}° N, {m.lng.toFixed(2)}° E
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


