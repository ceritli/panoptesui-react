import React, { useState } from 'react';

export interface ShowcaseExample {
  id?: string;
  title: string;
  description: string;
  preview: React.ReactNode;
  code: string;
}

export interface ShowcaseProp {
  name: string;
  type: string;
  default?: string;
  defaultValue?: string;
  description: string;
}

export interface ComponentShowcaseProps {
  title: string;
  category?: string;
  description: string;
  examples?: ShowcaseExample[];
  children?: React.ReactNode;
  sourceCode?: string;
  props?: ShowcaseProp[];
  propsList?: ShowcaseProp[];
  propsRows?: ShowcaseProp[];
  eventsRows?: any[];
  exampleCount?: number;
  activeMainTab?: 'features' | 'api' | 'a11y';
  onMainTabChange?: (tab: 'features' | 'api' | 'a11y') => void;
  headerSubNav?: React.ReactNode;
}

// Tokenize code for clean, light-themed syntax highlighting matching screenshot
function tokenizeReactLine(line: string): React.ReactNode[] {
  if (!line) return [];
  let s = line;
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyIdx = 0;

  while (i < s.length) {
    const commentMatch = s.slice(i).match(/^(\/\/.*|\/\*[\s\S]*?\*\/|<!--.*?-->)/);
    if (commentMatch) {
      elements.push(<span key={keyIdx++} className="text-slate-400 italic">{commentMatch[0]}</span>);
      i += commentMatch[0].length;
      continue;
    }
    const strMatch = s.slice(i).match(/^("[^"]*"|'[^']*'|`[^`]*`)/);
    if (strMatch) {
      elements.push(<span key={keyIdx++} className="text-sky-700 font-medium">{strMatch[0]}</span>);
      i += strMatch[0].length;
      continue;
    }
    const tagMatch = s.slice(i).match(/^<\/?[a-zA-Z0-9_\-]+/);
    if (tagMatch) {
      elements.push(<span key={keyIdx++} className="text-emerald-600 font-medium">{tagMatch[0]}</span>);
      i += tagMatch[0].length;
      continue;
    }
    const closeMatch = s.slice(i).match(/^\/?>/);
    if (closeMatch) {
      elements.push(<span key={keyIdx++} className="text-emerald-600 font-medium">{closeMatch[0]}</span>);
      i += closeMatch[0].length;
      continue;
    }
    const attrMatch = s.slice(i).match(/^([a-zA-Z0-9_\-:@#]+)(?=\=)/);
    if (attrMatch) {
      elements.push(<span key={keyIdx++} className="text-purple-600">{attrMatch[0]}</span>);
      i += attrMatch[0].length;
      continue;
    }
    const kwMatch = s.slice(i).match(/^(import|from|export|default|const|let|var|function|return|true|false|new|public|void|string|boolean|number|interface|type|class)\b/);
    if (kwMatch) {
      elements.push(<span key={keyIdx++} className="text-rose-600 font-semibold">{kwMatch[0]}</span>);
      i += kwMatch[0].length;
      continue;
    }
    elements.push(s[i]);
    i++;
  }
  return elements;
}

// Light Code Block with line numbers matching the screenshot
export function LightCodeViewer({
  code,
  label = 'TypeScript JSX (React 19)'
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const lines = code.trim().split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-b-2xl border border-t-0 border-slate-200 overflow-hidden font-mono text-xs">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-50/80 border-b border-slate-200/80 text-[11px] text-slate-500 font-sans">
        <span className="font-semibold text-slate-700">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="px-2.5 py-1 rounded-md bg-white hover:bg-slate-50 text-[11px] text-slate-600 font-medium flex items-center gap-1.5 border border-slate-200 transition shadow-2xs cursor-pointer"
        >
          {copied ? (
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              Kopyalandı!
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              Kodu Kopyala
            </span>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto bg-white">
        <table className="w-full border-collapse font-mono text-xs leading-relaxed select-text">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                <td className="w-10 select-none text-right pr-4 text-slate-400 font-mono text-xs align-top py-0.5">{idx + 1}</td>
                <td className="font-mono text-xs text-slate-800 whitespace-pre align-top py-0.5">{tokenizeReactLine(line)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ComponentShowcase({
  title,
  category,
  description,
  examples,
  children,
  sourceCode,
  props,
  propsList,
  propsRows,
  exampleCount,
  activeMainTab,
  onMainTabChange,
  headerSubNav
}: ComponentShowcaseProps) {
  const [activeTabs, setActiveTabs] = useState<Record<string, 'preview' | 'code'>>({});
  const [internalMainTab, setInternalMainTab] = useState<'features' | 'api' | 'a11y'>('features');
  const mainTab = activeMainTab !== undefined ? activeMainTab : internalMainTab;

  const handleTabClick = (tab: 'features' | 'api' | 'a11y') => {
    setInternalMainTab(tab);
    onMainTabChange?.(tab);
  };

  const displayCategory = category || 'Bileşen';
  const displayProps = propsList || propsRows || props || [];
  const effectiveExamples: ShowcaseExample[] = examples && examples.length > 0
    ? examples
    : children
    ? [{
        id: 'default-ex',
        title: 'Canlı Demo & Kullanım',
        description: 'Bileşenin etkileşimli önizlemesi ve kaynak kodu.',
        preview: children,
        code: sourceCode || ''
      }]
    : [];

  const toggleTab = (exampleId: string, tab: 'preview' | 'code') => {
    setActiveTabs(prev => ({ ...prev, [exampleId]: tab }));
  };

  return (
    <div className="space-y-8 font-sans text-left pb-16">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {displayCategory}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              WAI-ARIA Uyumlu
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
              React 19 + TS
            </span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-3xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Optional Sub Navigation (Always visible above tabs, like _GridNav pills) */}
      {headerSubNav && (
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {headerSubNav}
        </div>
      )}

      {/* Main Navigation Tabs (Features | API | Accessibility) */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-2 -mb-px" aria-label="Tabs">
          <button
            type="button"
            onClick={() => handleTabClick('features')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs rounded-t-xl border-b-2 transition cursor-pointer ${
              mainTab === 'features'
                ? 'font-bold text-blue-600 border-blue-600 bg-blue-50/40'
                : 'font-semibold text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            <span>Örnekler (Features)</span>
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-800">
              {exampleCount !== undefined ? exampleCount : effectiveExamples.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('api')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs rounded-t-xl border-b-2 transition cursor-pointer ${
              mainTab === 'api'
                ? 'font-bold text-blue-600 border-blue-600 bg-blue-50/40'
                : 'font-semibold text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            <span>API Referansı (Props & Events)</span>
            {displayProps.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-slate-100 text-slate-700">
                {displayProps.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleTabClick('a11y')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs rounded-t-xl border-b-2 transition cursor-pointer ${
              mainTab === 'a11y'
                ? 'font-bold text-blue-600 border-blue-600 bg-blue-50/40'
                : 'font-semibold text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>
            <span>Erişilebilirlik (WAI-ARIA)</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: FEATURES & EXAMPLES */}
      {mainTab === 'features' && (
        children && (!examples || examples.length === 0) ? (
          <div className="space-y-6">
            {children}
          </div>
        ) : (
          <div className="space-y-8">
            {effectiveExamples.map((ex, index) => {
            const exampleId = ex.id || `example-${index}`;
            const currentTab = activeTabs[exampleId] || 'preview';

            return (
              <div
                key={exampleId}
                style={currentTab === 'preview' ? { zIndex: (effectiveExamples.length - index) * 10 } : undefined}
                className={`bg-white rounded-2xl border border-slate-200 shadow-sm transition-all relative ${
                  currentTab === 'preview'
                    ? 'overflow-visible hover:!z-50 focus-within:!z-50'
                    : 'overflow-hidden'
                }`}
              >
                {/* Example Header */}
                <div className="px-6 py-4 bg-slate-50/80 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 rounded-t-2xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{ex.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 ml-7">{ex.description}</p>
                  </div>

                  {/* Sub-tabs */}
                  <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => toggleTab(exampleId, 'preview')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        currentTab === 'preview'
                          ? 'bg-white text-blue-600 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      <span>Canlı Önizleme</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleTab(exampleId, 'code')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                        currentTab === 'code'
                          ? 'bg-white text-blue-600 shadow-2xs font-bold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                      <span>Kaynak Kodu (TSX)</span>
                    </button>
                  </div>
                </div>

                {/* Example Body */}
                {currentTab === 'preview' ? (
                  <div className="p-6 bg-white min-h-[180px] flex flex-col justify-center relative overflow-visible rounded-b-2xl">
                    {ex.preview}
                  </div>
                ) : (
                  <LightCodeViewer code={ex.code} label="TypeScript JSX (React 19)" />
                )}
              </div>
            );
          })}
        </div>
        )
      )}

      {/* TAB 2: API & PROPS REFERENCE */}
      {mainTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  React Props & API Referansı
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Bileşenin kabul ettiği TypeScript arayüz özellikleri ve olaylar.</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-100 text-blue-800">
                {title.split(' ')[0]}Props
              </span>
            </div>
            {displayProps.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                      <th className="py-3 px-6">Prop Adı</th>
                      <th className="py-3 px-4">Tip (TypeScript)</th>
                      <th className="py-3 px-4">Varsayılan</th>
                      <th className="py-3 px-6">Açıklama</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {displayProps.map(prop => (
                      <tr key={prop.name} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-6 font-mono font-bold text-blue-600">{prop.name}</td>
                        <td className="py-3 px-4 font-mono text-purple-600">{prop.type}</td>
                        <td className="py-3 px-4 font-mono text-slate-400">{prop.defaultValue || prop.default || '-'}</td>
                        <td className="py-3 px-6 text-slate-700">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                Bu bileşen için ek prop tanımı bulunmamaktadır; standart HTML/React özelliklerini destekler.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: ACCESSIBILITY (WAI-ARIA & KEYBOARD) */}
      {mainTab === 'a11y' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              WAI-ARIA Standartları & Klavye Erişilebilirliği
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Panoptes React bileşenleri, W3C WAI-ARIA yönergelerine ve modern erişilebilirlik standartlarına tam uyumlu olarak tasarlanmıştır. Ekran okuyucu yazılımlar (NVDA, JAWS, VoiceOver) ve salt klavye kullanan kullanıcılar için optimize edilmiştir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 font-mono">WAI-ARIA Nitelikleri</div>
              <div className="text-slate-600">Bileşenin durumuna göre <code>aria-expanded</code>, <code>aria-checked</code>, <code>aria-disabled</code> ve <code>role</code> nitelikleri otomatik güncellenir.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-slate-800 font-mono">Odak Yönetimi (Focus Management)</div>
              <div className="text-slate-600"><code>tabIndex</code> değerleri doğal sekme sırasını korur, odak halkaları (focus ring) görünür ve erişilebilirdir.</div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Klavye Kısayolları (Keyboard Shortcuts)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold">
                    <th className="py-2.5 px-4 w-48">Tuş (Key)</th>
                    <th className="py-2.5 px-4">İşlev (Function)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900"><kbd className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs shadow-2xs">Tab</kbd></td>
                    <td className="py-2.5 px-4">Bileşene odaklanır veya sayfadaki bir sonraki etkileşimli elemana geçer.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900"><kbd className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs shadow-2xs">Enter / Space</kbd></td>
                    <td className="py-2.5 px-4">Odaklanmış bileşeni veya seçili öğeyi onaylar, durumu değiştirir.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900"><kbd className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs shadow-2xs">Escape</kbd></td>
                    <td className="py-2.5 px-4">Açık olan açılır paneli veya diyalogu kapatır.</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900"><kbd className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-xs shadow-2xs">Down / Up Arrow (↓ / ↑)</kbd></td>
                    <td className="py-2.5 px-4">Liste, menü veya açılır seçenekler arasında gezinmeyi sağlar.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
