import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ==========================================
// 1. TabStrip
// ==========================================
export interface TabItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  closable?: boolean;
  content: React.ReactNode;
}

export interface TabStripProps {
  tabs: TabItem[];
  defaultTabId?: string;
  onTabChange?: (id: string) => void;
  position?: 'top' | 'bottom';
}

export function TabStrip({ tabs, defaultTabId, onTabChange, position = 'top' }: TabStripProps) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || (tabs[0]?.id ?? ''));

  const handleSelect = (id: string) => {
    setActiveTabId(id);
    if (onTabChange) onTabChange(id);
  };

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const navBar = (
    <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-px">
      {tabs.map(tab => {
        const isActive = tab.id === activeTabId;
        return (
          <button
            key={tab.id}
            type="button"
            disabled={tab.disabled}
            onClick={() => handleSelect(tab.id)}
            className={`px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 border-b-2 cursor-pointer ${
              isActive
                ? 'border-blue-600 text-blue-600 bg-blue-50/40'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            } ${tab.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.title}</span>
            {tab.badge !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-visible text-left font-sans">
      {position === 'top' && navBar}
      <div className="p-5 overflow-visible">{activeTab?.content}</div>
      {position === 'bottom' && navBar}
    </div>
  );
}

// ==========================================
// 2. PanelBar (Accordion)
// ==========================================
export interface PanelItem {
  id: string;
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface PanelBarProps {
  items: PanelItem[];
  allowMultiple?: boolean;
}

export function PanelBar({ items, allowMultiple = false }: PanelBarProps) {
  const [openIds, setOpenIds] = useState<string[]>([items[0]?.id || '']);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds(openIds.includes(id) ? openIds.filter(i => i !== id) : [...openIds, id]);
    } else {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="w-full space-y-2 font-sans text-left">
      {items.map(item => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`bg-white border border-slate-200 rounded-2xl shadow-2xs transition-all ${
              isOpen ? 'overflow-visible relative z-20' : 'overflow-hidden'
            }`}
          >
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                {item.icon && <span className="text-slate-500">{item.icon}</span>}
                <div>
                  <div className="text-xs font-bold text-slate-800">{item.title}</div>
                  {item.subtitle && <div className="text-[11px] text-slate-400 mt-0.5">{item.subtitle}</div>}
                </div>
              </div>
              <svg
                className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && <div className="px-4 pb-4 pt-1 border-t border-slate-100 text-xs text-slate-600">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 3. TreeView
// ==========================================
export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  checkable?: boolean;
  onSelect?: (node: TreeNode) => void;
}

export function TreeView({ data, checkable = false, onSelect }: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedIds(expandedIds.includes(id) ? expandedIds.filter(i => i !== id) : [...expandedIds, id]);
  };

  const toggleCheck = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCheckedIds(checkedIds.includes(id) ? checkedIds.filter(i => i !== id) : [...checkedIds, id]);
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedIds.includes(node.id);
    const isChecked = checkedIds.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="text-left font-sans">
        <div
          onClick={() => onSelect && onSelect(node)}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          className="flex items-center gap-2 py-1.5 px-2 hover:bg-slate-100 rounded-lg cursor-pointer transition select-none text-xs text-slate-700 font-medium"
        >
          {hasChildren ? (
            <button
              type="button"
              onClick={e => toggleExpand(node.id, e)}
              className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-slate-600"
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          ) : (
            <span className="w-4" />
          )}

          {checkable && (
            <input
              type="checkbox"
              checked={isChecked}
              onClick={e => toggleCheck(node.id, e)}
              readOnly
              className="rounded text-blue-600"
            />
          )}

          <span>{node.icon || (hasChildren ? '📁' : '📄')}</span>
          <span>{node.label}</span>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-0.5">
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return <div className="space-y-0.5 p-2 bg-white border border-slate-200 rounded-2xl shadow-sm">{data.map(node => renderNode(node))}</div>;
}

// ==========================================
// 4. Stepper & Wizard
// ==========================================
export interface StepItem {
  label: string;
  description?: string;
  icon?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="flex items-center justify-between w-full font-sans select-none">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;

        return (
          <React.Fragment key={idx}>
            <div
              onClick={() => onStepChange && onStepChange(idx)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition shadow-2xs ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {isCompleted ? '✓' : idx + 1}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-bold ${isCurrent ? 'text-blue-600' : 'text-slate-700'}`}>
                  {step.label}
                </div>
                {step.description && (
                  <div className="text-[10px] text-slate-400 mt-0.5">{step.description}</div>
                )}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mb-6 transition ${
                  idx < currentStep ? 'bg-emerald-500' : 'bg-slate-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ==========================================
// 5. Breadcrumb
// ==========================================
export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export function Breadcrumb({ items, onNavigate }: { items: BreadcrumbItem[]; onNavigate?: (url: string) => void }) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold font-sans text-slate-500">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {isLast ? (
              <span className="text-slate-900 font-bold">{item.label}</span>
            ) : (
              <button
                type="button"
                onClick={() => item.url && onNavigate && onNavigate(item.url)}
                className="hover:text-blue-600 transition cursor-pointer"
              >
                {item.label}
              </button>
            )}
            {!isLast && <span className="text-slate-300">/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

// ==========================================
// 6. Splitter (Panel Bölücü)
// ==========================================
export function Splitter({
  leftPane,
  rightPane,
  initialSplit = 50
}: {
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  initialSplit?: number;
}) {
  const [split, setSplit] = useState(initialSplit);

  return (
    <div className="flex w-full h-80 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm font-sans text-left">
      <div style={{ width: `${split}%` }} className="p-4 overflow-auto">
        {leftPane}
      </div>
      {/* Resizer bar */}
      <div className="w-2.5 bg-slate-100 hover:bg-blue-500 cursor-col-resize flex items-center justify-center transition border-x border-slate-200 group">
        <div className="w-1 h-6 bg-slate-300 group-hover:bg-white rounded-full" />
      </div>
      <div style={{ width: `${100 - split}%` }} className="p-4 overflow-auto bg-slate-50/50">
        {rightPane}
      </div>
    </div>
  );
}

// ==========================================
// 7. TileLayout (Pano & Dashboard Düzeni)
// ==========================================
export interface TileItem {
  id: string;
  title: string;
  colSpan?: 1 | 2 | 3;
  content: React.ReactNode;
}

export function TileLayout({ tiles }: { tiles: TileItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-left">
      {tiles.map(tile => {
        const colClass = {
          1: 'col-span-1',
          2: 'col-span-1 md:col-span-2',
          3: 'col-span-1 md:col-span-3'
        }[tile.colSpan || 1];

        return (
          <div
            key={tile.id}
            className={`${colClass} bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition space-y-3`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h4 className="text-xs font-black text-slate-800 tracking-wide uppercase">{tile.title}</h4>
              <span className="text-slate-300 text-xs cursor-move">⋮⋮</span>
            </div>
            <div>{tile.content}</div>
          </div>
        );
      })}
    </div>
  );
}

// ==========================================
// 8. Drawer (Yan Çekmece)
// ==========================================
export function Drawer({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] overflow-hidden font-sans text-left">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 z-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full animate-in slide-in-from-right duration-300">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800">{title || 'Çekmece Menüsü'}</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="p-5 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}

// ==========================================
// 9. ActionSheet (Mobil Alt Eylem Sayfası)
// ==========================================
export interface ActionSheetItem {
  id: string;
  label: string;
  icon?: string;
  danger?: boolean;
  onClick: () => void;
}

export function ActionSheet({
  isOpen,
  onClose,
  title,
  items
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  items: ActionSheetItem[];
}) {
  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center font-sans text-left">
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-t-3xl shadow-2xl p-5 space-y-3 z-10 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-2" />
        {title && <div className="text-center font-bold text-xs text-slate-500 uppercase pb-1">{title}</div>}
        <div className="space-y-1.5">
          {items.map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                item.onClick();
                onClose();
              }}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                item.danger
                  ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                  : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
        >
          Vazgeç
        </button>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}

// ==========================================
// 10. Menu (Hiyerarşik Gezinme Menüsü)
// ==========================================
export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  separator?: boolean;
  items?: MenuItem[];
  onClick?: () => void;
}

export function Menu({
  items,
  orientation = 'horizontal',
  onSelect
}: {
  items: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
  onSelect?: (item: MenuItem) => void;
}) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const closeTimerRef = useRef<any>(null);
  const navRef = useRef<HTMLElement>(null);

  const isVertical = orientation === 'vertical';

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleMouseEnter = (itemId: string, hasChildren: boolean) => {
    clearCloseTimer();
    if (hasChildren) {
      setActiveSubmenu(itemId);
    }
  };

  const handleMouseLeave = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => {
      setActiveSubmenu(null);
    }, 220);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveSubmenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearCloseTimer();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`bg-white border border-slate-200 shadow-xs rounded-xl font-sans text-xs select-none relative overflow-visible ${
        isVertical ? 'w-56 p-1.5 flex flex-col space-y-0.5' : 'flex items-center gap-1 p-1'
      }`}
    >
      {items.map(item => {
        if (item.separator) {
          return (
            <div
              key={item.id}
              className={isVertical ? 'h-px bg-slate-100 my-1' : 'w-px h-5 bg-slate-200 mx-1'}
            />
          );
        }

        const hasChildren = item.items && item.items.length > 0;
        const isOpen = activeSubmenu === item.id;

        return (
          <div
            key={item.id}
            className={`relative ${isOpen ? 'z-50' : 'z-10'}`}
            onMouseEnter={() => handleMouseEnter(item.id, !!hasChildren)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => {
                if (!item.disabled) {
                  if (hasChildren) {
                    clearCloseTimer();
                    setActiveSubmenu(isOpen ? null : item.id);
                  } else {
                    item.onClick?.();
                    onSelect?.(item);
                    setActiveSubmenu(null);
                  }
                }
              }}
              className={`w-full px-3 py-2 rounded-lg font-bold flex items-center justify-between gap-2.5 transition text-left cursor-pointer ${
                item.disabled
                  ? 'opacity-40 cursor-not-allowed text-slate-400'
                  : isOpen
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
              {hasChildren && (
                <span className="text-[10px] text-slate-400">{isVertical ? '▶' : '▼'}</span>
              )}
            </button>

            {hasChildren && isOpen && (
              <div
                className={`absolute z-50 ${
                  isVertical
                    ? 'left-full top-0 pl-1.5 -ml-1'
                    : 'top-full left-0 pt-1.5 -mt-1'
                }`}
                onMouseEnter={clearCloseTimer}
                onMouseLeave={handleMouseLeave}
              >
                {/* Görünmez hover köprüsü (fare buton ile menü arasındaki boşluktan geçerken kapanmayı önler) */}
                <div
                  className={`absolute pointer-events-auto ${
                    isVertical
                      ? '-left-3 top-0 bottom-0 w-4'
                      : '-top-3 left-0 right-0 h-4'
                  }`}
                />
                <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 min-w-[200px] space-y-0.5 animate-in fade-in duration-100">
                  {item.items!.map(sub => {
                    if (sub.separator) {
                      return <div key={sub.id} className="h-px bg-slate-100 my-1" />;
                    }
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        disabled={sub.disabled}
                        onClick={() => {
                          if (!sub.disabled) {
                            sub.onClick?.();
                            onSelect?.(sub);
                            setActiveSubmenu(null);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2 transition text-left cursor-pointer disabled:opacity-40"
                      >
                        {sub.icon && <span>{sub.icon}</span>}
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// ==========================================
// 11. ToolBar (Araç Çubuğu)
// ==========================================
export interface ToolBarItem {
  id: string;
  type?: 'button' | 'toggle' | 'separator' | 'spacer' | 'custom';
  label?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  render?: () => React.ReactNode;
}

export function ToolBar({
  items,
  size = 'md'
}: {
  items: ToolBarItem[];
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeClasses = {
    sm: 'p-1 gap-1 text-xs',
    md: 'p-1.5 gap-1.5 text-xs',
    lg: 'p-2 gap-2 text-sm'
  }[size];

  const btnClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-3.5 py-2 text-sm'
  }[size];

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-wrap items-center font-sans ${sizeClasses}`}
    >
      {items.map(item => {
        if (item.type === 'separator') {
          return <div key={item.id} className="w-px h-6 bg-slate-200 mx-1" />;
        }
        if (item.type === 'spacer') {
          return <div key={item.id} className="flex-1" />;
        }
        if (item.type === 'custom' && item.render) {
          return <div key={item.id}>{item.render()}</div>;
        }

        const isToggle = item.type === 'toggle';
        const isActive = item.active;

        return (
          <button
            key={item.id}
            type="button"
            disabled={item.disabled}
            onClick={item.onClick}
            className={`rounded-lg font-bold flex items-center gap-1.5 transition cursor-pointer select-none ${btnClasses} ${
              item.disabled
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : isActive
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

// ==========================================
// 12. ScrollView (Yatay/Dikey Kaydırıcı)
// ==========================================
export interface ScrollViewProps {
  children: React.ReactNode;
  height?: number | string;
  showArrows?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export function ScrollView({
  children,
  height = 300,
  showArrows = true,
  orientation = 'horizontal'
}: ScrollViewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (!containerRef.current) return;
    const amount = 300;
    if (direction === 'left') containerRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
    if (direction === 'right') containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    if (direction === 'up') containerRef.current.scrollBy({ top: -amount, behavior: 'smooth' });
    if (direction === 'down') containerRef.current.scrollBy({ top: amount, behavior: 'smooth' });
  };

  const isHorizontal = orientation === 'horizontal';

  return (
    <div className="relative group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs font-sans">
      {showArrows && isHorizontal && (
        <>
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100 transition"
          >
            ◀
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white cursor-pointer opacity-0 group-hover:opacity-100 transition"
          >
            ▶
          </button>
        </>
      )}

      <div
        ref={containerRef}
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className={`p-4 ${
          isHorizontal
            ? 'flex gap-4 overflow-x-auto scroll-smooth no-scrollbar'
            : 'overflow-y-auto scroll-smooth space-y-4'
        }`}
      >
        {children}
      </div>
    </div>
  );
}


