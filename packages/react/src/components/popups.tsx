import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// ==========================================
// 1. Dialog (Alert / Confirm / Prompt)
// ==========================================
export interface DialogProps {
  isOpen: boolean;
  title: string;
  message?: React.ReactNode;
  type?: 'alert' | 'confirm' | 'prompt';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (value?: string) => void;
  onCancel?: () => void;
}

export function Dialog({
  isOpen,
  title,
  message,
  type = 'confirm',
  confirmText = 'Tamam',
  cancelText = 'Vazgeç',
  onConfirm,
  onCancel
}: DialogProps) {
  const [promptVal, setPromptVal] = useState('');

  if (!isOpen) return null;

  const content = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4 animate-in zoom-in-95 duration-150 relative z-10">
        <h3 className="text-base font-black text-slate-900">{title}</h3>
        {message && <div className="text-xs text-slate-600 leading-relaxed">{message}</div>}

        {type === 'prompt' && (
          <input
            type="text"
            value={promptVal}
            onChange={e => setPromptVal(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 focus:ring-2 focus:ring-blue-500"
            placeholder="Değer giriniz..."
            autoFocus
          />
        )}

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          {type !== 'alert' && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={() => onConfirm && onConfirm(promptVal)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md transition cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}

// ==========================================
// 2. Notification (Toast)
// ==========================================
export interface NotificationToast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

export function NotificationContainer({
  toasts,
  onDismiss
}: {
  toasts: NotificationToast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  const content = (
    <div className="fixed bottom-5 right-5 z-[9999] space-y-2.5 max-w-sm w-full pointer-events-none font-sans">
      {toasts.map(toast => {
        const bgColors = {
          success: 'bg-emerald-50 border-emerald-300 text-emerald-800',
          error: 'bg-rose-50 border-rose-300 text-rose-800',
          warning: 'bg-amber-50 border-amber-300 text-amber-800',
          info: 'bg-blue-50 border-blue-300 text-blue-800'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border shadow-xl flex items-start justify-between gap-3 ${bgColors} animate-in slide-in-from-bottom duration-200`}
          >
            <div>
              {toast.title && <div className="text-xs font-black mb-0.5">{toast.title}</div>}
              <div className="text-xs font-medium">{toast.message}</div>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-700 font-bold p-1 cursor-pointer"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : content;
}

export function Notification({
  type = 'info',
  title,
  message,
  onClose
}: {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onClose?: () => void;
}) {
  const bgColors = {
    success: 'bg-emerald-50 border-emerald-300 text-emerald-800',
    error: 'bg-rose-50 border-rose-300 text-rose-800',
    warning: 'bg-amber-50 border-amber-300 text-amber-800',
    info: 'bg-blue-50 border-blue-300 text-blue-800'
  }[type];

  return (
    <div className={`p-4 rounded-2xl border shadow-sm flex items-start justify-between gap-3 font-sans ${bgColors}`}>
      <div>
        {title && <h4 className="font-bold text-xs">{title}</h4>}
        <p className="text-xs mt-0.5">{message}</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-xs opacity-60 hover:opacity-100 font-bold p-1 cursor-pointer"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ==========================================
// 3. Tooltip
// ==========================================
export function Tooltip({
  content,
  position = 'top',
  children
}: {
  content: string | React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);

  const posClass = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }[position];

  return (
    <div
      className={`relative inline-block ${show ? 'z-50' : 'z-10'}`}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className={`absolute z-50 ${posClass} px-2.5 py-1 text-[11px] font-bold text-white bg-slate-900 rounded-lg shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in duration-100`}>
          {content}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. Window (Draggable / Modal / Resizable Window)
// ==========================================
export interface WindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialWidth?: number;
  initialHeight?: number;
  resizable?: boolean;
  modal?: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function Window({
  isOpen,
  onClose,
  title,
  initialWidth = 520,
  initialHeight = 360,
  resizable = true,
  modal = true,
  children,
  actions
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMinimized) return;
    if ((e.target as HTMLElement).closest('button, span.cursor-pointer')) return;

    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      if (!position) {
        setPosition({ x: rect.left, y: rect.top });
      }
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newX = Math.max(10, Math.min(window.innerWidth - 120, e.clientX - dragOffset.x));
      const newY = Math.max(10, Math.min(window.innerHeight - 60, e.clientY - dragOffset.y));
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!isOpen) return null;

  // Window styling logic
  let windowStyle: React.CSSProperties = {};
  if (isMaximized) {
    windowStyle = {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999
    };
  } else if (isMinimized) {
    windowStyle = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '320px',
      height: 'auto',
      zIndex: 9995
    };
  } else if (position) {
    windowStyle = {
      position: 'fixed',
      top: `${position.y}px`,
      left: `${position.x}px`,
      width: `${initialWidth}px`,
      maxHeight: '85vh',
      zIndex: modal ? 9995 : 9990
    };
  } else {
    // Default initial centered position on viewport
    windowStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: `${initialWidth}px`,
      maxHeight: '85vh',
      zIndex: modal ? 9995 : 9990
    };
  }

  const windowNode = (
    <div
      ref={windowRef}
      style={windowStyle}
      className={`bg-white shadow-2xl border border-slate-200 flex flex-col font-sans transition-shadow ${
        isMaximized ? 'rounded-none' : 'rounded-2xl'
      } ${isDragging ? 'opacity-95 shadow-indigo-500/20' : ''}`}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        className="px-4 py-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between select-none cursor-move rounded-t-2xl"
      >
        <div className="flex items-center gap-2">
          <span
            title="Kapat"
            className="w-3.5 h-3.5 rounded-full bg-rose-500 hover:bg-rose-600 transition cursor-pointer flex items-center justify-center text-[8px] text-white font-bold opacity-80 hover:opacity-100"
            onClick={onClose}
          />
          <span
            title={isMinimized ? 'Eski Boyuta Getir' : 'Aşağı Küçült'}
            className="w-3.5 h-3.5 rounded-full bg-amber-400 hover:bg-amber-500 transition cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => setIsMinimized(!isMinimized)}
          />
          <span
            title={isMaximized ? 'Pencere Boyutu' : 'Tam Ekran'}
            className="w-3.5 h-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer opacity-80 hover:opacity-100"
            onClick={() => {
              setIsMinimized(false);
              setIsMaximized(!isMaximized);
            }}
          />
          <h3 className="text-xs font-bold text-slate-800 ml-2 tracking-wide">{title}</h3>
        </div>
        <div className="flex items-center gap-1.5">
          {actions}
          <button
            type="button"
            onClick={onClose}
            className="w-6 h-6 rounded-md hover:bg-slate-200 text-slate-500 hover:text-slate-800 font-bold text-xs flex items-center justify-center transition cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      {!isMinimized && (
        <div className="p-5 overflow-auto flex-1 text-xs text-slate-700 leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );

  // If modal is true and window is not minimized, render backdrop overlay
  if (modal && !isMinimized && !isMaximized) {
    const modalBackdrop = (
      <div className="fixed inset-0 z-[9990] bg-slate-900/50 backdrop-blur-xs font-sans">
        {windowNode}
      </div>
    );
    return typeof document !== 'undefined' ? createPortal(modalBackdrop, document.body) : modalBackdrop;
  }

  // Non-modal floating window or minimized/maximized window directly rendered into document.body
  return typeof document !== 'undefined' ? createPortal(windowNode, document.body) : windowNode;
}

