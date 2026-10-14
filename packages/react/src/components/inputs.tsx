import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { usePanoptesLocale } from '../localization';

// ==========================================
// 1. TextBox
// ==========================================
export interface TextBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  clearButton?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export function TextBox({
  label,
  error,
  clearButton = true,
  prefixIcon,
  suffixIcon,
  value,
  onChange,
  className = '',
  ...rest
}: TextBoxProps) {
  const [val, setVal] = useState(value !== undefined ? value : '');

  useEffect(() => {
    if (value !== undefined) setVal(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
    if (onChange) onChange(e);
  };

  const handleClear = () => {
    setVal('');
    if (onChange) {
      const syntheticEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <div className="w-full space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="relative flex items-center">
        {prefixIcon && <span className="absolute left-3 text-slate-400">{prefixIcon}</span>}
        <input
          type="text"
          value={val}
          onChange={handleChange}
          className={`w-full text-xs text-slate-800 bg-white border rounded-xl py-2 px-3 shadow-2xs transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
          } ${prefixIcon ? 'pl-9' : ''} ${clearButton && val ? 'pr-9' : ''} ${className}`}
          {...rest}
        />
        {clearButton && val ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : suffixIcon ? (
          <span className="absolute right-3 text-slate-400">{suffixIcon}</span>
        ) : null}
      </div>
      {error && <p className="text-[11px] font-semibold text-rose-500">{error}</p>}
    </div>
  );
}

// ==========================================
// 2. NumericTextBox
// ==========================================
export interface NumericTextBoxProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  format?: 'currency' | 'percent' | 'decimal';
  currencySymbol?: string;
  onChange?: (val: number) => void;
  disabled?: boolean;
}

export function NumericTextBox({
  label,
  value = 0,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  format = 'decimal',
  currencySymbol = '₺',
  onChange,
  disabled
}: NumericTextBoxProps) {
  const [num, setNum] = useState(value);

  useEffect(() => {
    setNum(value);
  }, [value]);

  const updateVal = (newVal: number) => {
    let constrained = newVal;
    if (min !== undefined) constrained = Math.max(min, constrained);
    if (max !== undefined) constrained = Math.min(max, constrained);
    setNum(constrained);
    if (onChange) onChange(constrained);
  };

  const formattedDisplay = () => {
    if (format === 'currency') return `${currencySymbol}${num.toLocaleString('tr-TR')}`;
    if (format === 'percent') return `%${num}`;
    return num.toString();
  };

  return (
    <div className="w-full space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="relative flex items-center bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
        {prefix && (
          <span className="pl-3 pr-1 text-xs font-bold text-slate-400 select-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={num}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={e => updateVal(parseFloat(e.target.value) || 0)}
          className="w-full text-xs text-slate-800 py-2 px-3 focus:outline-none disabled:bg-slate-50"
        />
        {suffix && (
          <span className="pr-3 pl-1 text-xs font-bold text-slate-400 select-none">
            {suffix}
          </span>
        )}
        <div className="flex flex-col border-l border-slate-200 divide-y divide-slate-200 bg-slate-50">
          <button
            type="button"
            disabled={disabled || (max !== undefined && num >= max)}
            onClick={() => updateVal(num + step)}
            className="px-2 py-0.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-40 cursor-pointer"
          >
            ▲
          </button>
          <button
            type="button"
            disabled={disabled || (min !== undefined && num <= min)}
            onClick={() => updateVal(num - step)}
            className="px-2 py-0.5 text-slate-500 hover:bg-slate-200 active:bg-slate-300 disabled:opacity-40 cursor-pointer"
          >
            ▼
          </button>
        </div>
      </div>
      {format !== 'decimal' && (
        <span className="text-[10px] text-slate-400 font-medium">Önizleme: {formattedDisplay()}</span>
      )}
    </div>
  );
}

// ==========================================
// 3. TextArea
// ==========================================
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  autoResize?: boolean;
  maxLength?: number;
}

export function TextArea({ label, autoResize = true, maxLength, value, onChange, ...rest }: TextAreaProps) {
  const [text, setText] = useState(value !== undefined ? String(value) : '');

  useEffect(() => {
    if (value !== undefined) setText(String(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (autoResize) {
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
    if (onChange) onChange(e);
  };

  return (
    <div className="w-full space-y-1.5 text-left font-sans">
      <div className="flex justify-between items-center">
        {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
        {maxLength && (
          <span className="text-[10px] text-slate-400">
            {text.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={text}
        maxLength={maxLength}
        onChange={handleChange}
        rows={3}
        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-2 px-3 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-y"
        {...rest}
      />
    </div>
  );
}

// ==========================================
// 4. Switch
// ==========================================
export interface SwitchProps {
  label?: string;
  checked?: boolean;
  onLabel?: string;
  offLabel?: string;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({
  label,
  checked = false,
  onLabel = 'Açık',
  offLabel = 'Kapalı',
  onChange,
  disabled
}: SwitchProps) {
  const [isOn, setIsOn] = useState(checked);

  useEffect(() => {
    setIsOn(checked);
  }, [checked]);

  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    setIsOn(next);
    if (onChange) onChange(next);
  };

  return (
    <div className="inline-flex items-center gap-3 select-none font-sans">
      {label && <span className="text-xs font-bold text-slate-700">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isOn ? 'bg-blue-600' : 'bg-slate-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
            isOn ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
      <span className="text-xs font-semibold text-slate-500 min-w-[45px]">
        {isOn ? onLabel : offLabel}
      </span>
    </div>
  );
}

// ==========================================
// 5. CheckBox
// ==========================================
export interface CheckBoxProps {
  label?: React.ReactNode;
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function CheckBox({ label, checked = false, indeterminate = false, onChange, disabled }: CheckBoxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label className={`inline-flex items-center gap-2 select-none font-sans cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange && onChange(e.target.checked)}
        className="w-4 h-4 rounded text-blue-600 border-slate-300 focus:ring-blue-500 transition"
      />
      {label && <span className="text-xs font-medium text-slate-700">{label}</span>}
    </label>
  );
}

// ==========================================
// 6. RadioGroup
// ==========================================
export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
}

export interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  value?: string | number;
  onChange?: (val: any) => void;
  layout?: 'horizontal' | 'vertical';
}

export function RadioGroup({ label, options, value, onChange, layout = 'vertical' }: RadioGroupProps) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleSelect = (val: string | number) => {
    setSelected(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className={`flex ${layout === 'horizontal' ? 'flex-row gap-4 flex-wrap' : 'flex-col gap-2'}`}>
        {options.map(opt => {
          const isSelected = selected === opt.value;
          return (
            <label
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/50 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <input
                type="radio"
                checked={isSelected}
                onChange={() => handleSelect(opt.value)}
                className="mt-0.5 text-blue-600 border-slate-300 focus:ring-blue-500"
              />
              <div>
                <div className="text-xs font-bold text-slate-800">{opt.label}</div>
                {opt.description && <div className="text-[11px] text-slate-500 mt-0.5">{opt.description}</div>}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 7. DatePicker (Custom Enterprise Calendar)
// ==========================================
const MONTH_NAMES_TR = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];
const MONTH_SHORT_TR = [
  'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
  'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
];
const DAY_NAMES_TR = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

function parseAnyDate(val?: string | Date | null): Date | null {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;
  if (typeof val !== 'string') return null;

  const partsDot = val.split('.');
  if (partsDot.length === 3) {
    const d = parseInt(partsDot[0], 10);
    const m = parseInt(partsDot[1], 10) - 1;
    const y = parseInt(partsDot[2], 10);
    const date = new Date(y, m, d);
    return isNaN(date.getTime()) ? null : date;
  }

  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
}

function formatDateISO(d: Date | null): string {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateTR(d: Date | null): string {
  if (!d) return '';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${day}.${m}.${y}`;
}

export interface DatePickerProps {
  label?: string;
  value?: string | Date;
  defaultValue?: string | Date;
  onChange?: (date: string) => void;
  format?: 'DD.MM.YYYY' | 'YYYY-MM-DD' | string;
  placeholder?: string;
  min?: string | Date;
  max?: string | Date;
  disabled?: boolean;
  disabledDates?: 'weekend' | 'weekends' | ((date: Date) => boolean) | string[];
  clearable?: boolean;
  weekNumber?: boolean;
  className?: string;
}

export function DatePicker({
  label,
  value,
  defaultValue,
  onChange,
  format = 'DD.MM.YYYY',
  placeholder = 'GG.AA.YYYY',
  min,
  max,
  disabled = false,
  disabledDates,
  clearable = true,
  weekNumber = false,
  className = ''
}: DatePickerProps) {
  const { messages } = usePanoptesLocale();
  const monthNames = messages?.date?.months || MONTH_NAMES_TR;
  const monthShort = messages?.date?.monthsShort || MONTH_SHORT_TR;
  const dayNames = messages?.date?.daysShort || DAY_NAMES_TR;

  const initialDate = parseAnyDate(value !== undefined ? value : defaultValue);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate || new Date());
  const [viewMode, setViewMode] = useState<'month' | 'year' | 'decade'>('month');
  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState(
    initialDate ? (format === 'YYYY-MM-DD' ? formatDateISO(initialDate) : formatDateTR(initialDate)) : ''
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const minDate = parseAnyDate(min);
  const maxDate = parseAnyDate(max);

  useEffect(() => {
    if (value !== undefined) {
      const parsed = parseAnyDate(value);
      setSelectedDate(parsed);
      if (parsed) {
        setCurrentMonth(parsed);
        setTextInput(format === 'YYYY-MM-DD' ? formatDateISO(parsed) : formatDateTR(parsed));
      } else {
        setTextInput('');
      }
    }
  }, [value, format]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const isDateDisabled = (d: Date): boolean => {
    const dZero = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    if (minDate) {
      const minZero = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      if (dZero < minZero) return true;
    }
    if (maxDate) {
      const maxZero = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
      if (dZero > maxZero) return true;
    }
    if (disabledDates) {
      if (disabledDates === 'weekend' || disabledDates === 'weekends') {
        const day = d.getDay();
        if (day === 0 || day === 6) return true;
      } else if (typeof disabledDates === 'function') {
        if (disabledDates(d)) return true;
      } else if (Array.isArray(disabledDates)) {
        const iso = formatDateISO(d);
        const tr = formatDateTR(d);
        if (disabledDates.includes(iso) || disabledDates.includes(tr)) return true;
      }
    }
    return false;
  };

  const handleSelectDate = (d: Date) => {
    if (isDateDisabled(d) || disabled) return;
    setSelectedDate(d);
    const outStr = format === 'YYYY-MM-DD' ? formatDateISO(d) : formatDateTR(d);
    setTextInput(outStr);
    setIsOpen(false);
    if (onChange) {
      onChange(formatDateISO(d));
    }
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedDate(null);
    setTextInput('');
    if (onChange) onChange('');
  };

  const handleSelectToday = () => {
    const today = new Date();
    if (!isDateDisabled(today)) {
      handleSelectDate(today);
      setCurrentMonth(today);
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === 'month') {
      setCurrentMonth(new Date(year, month - 1, 1));
    } else if (viewMode === 'year') {
      setCurrentMonth(new Date(year - 1, month, 1));
    } else if (viewMode === 'decade') {
      setCurrentMonth(new Date(year - 10, month, 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === 'month') {
      setCurrentMonth(new Date(year, month + 1, 1));
    } else if (viewMode === 'year') {
      setCurrentMonth(new Date(year + 1, month, 1));
    } else if (viewMode === 'decade') {
      setCurrentMonth(new Date(year + 10, month, 1));
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMode === 'month') setViewMode('year');
    else if (viewMode === 'year') setViewMode('decade');
    else setViewMode('month');
  };

  const firstDayOrig = new Date(year, month, 1).getDay();
  const firstDay = firstDayOrig === 0 ? 6 : firstDayOrig - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayStr = formatDateISO(today);
  const selectedStr = selectedDate ? formatDateISO(selectedDate) : '';

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'} ${className}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className={`w-full flex items-center bg-white border rounded-xl py-1.5 px-3 transition shadow-2xs cursor-pointer ${
          disabled
            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
            : isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <input
          type="text"
          readOnly
          disabled={disabled}
          value={textInput}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none cursor-pointer font-medium"
        />

        {clearable && textInput && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition mr-1"
            title="Temizle"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <button
          type="button"
          disabled={disabled}
          className={`p-1 rounded-lg transition ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 text-xs select-none w-72">
          {/* Header Navigation */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={handlePrev}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              title="Önceki"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleTitleClick}
              className="font-bold text-slate-800 hover:text-blue-600 px-2 py-0.5 rounded-lg hover:bg-slate-100 transition"
            >
              {viewMode === 'month' && `${monthNames[month]} ${year}`}
              {viewMode === 'year' && `${year}`}
              {viewMode === 'decade' && `${Math.floor(year / 10) * 10} - ${Math.floor(year / 10) * 10 + 9}`}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
              title={messages?.grid?.nextPage || 'Sonraki'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* VIEW MODE 1: Month View */}
          {viewMode === 'month' && (
            <>
              <div className={`grid ${weekNumber ? 'grid-cols-8' : 'grid-cols-7'} gap-1 text-center font-bold text-[11px] text-slate-400 mb-1`}>
                {weekNumber && <div className="text-[10px] text-slate-300">#</div>}
                {dayNames.map(d => (
                  <div key={d} className="py-1">{d}</div>
                ))}
              </div>

              <div className={`grid ${weekNumber ? 'grid-cols-8' : 'grid-cols-7'} gap-1 text-center text-xs`}>
                {Array.from({ length: firstDay }).map((_, i) => {
                  const dayNum = prevMonthDays - firstDay + i + 1;
                  const dObj = new Date(year, month - 1, dayNum);
                  return (
                    <button
                      key={`prev-${i}`}
                      type="button"
                      onClick={() => handleSelectDate(dObj)}
                      className="p-1.5 text-slate-300 hover:bg-slate-50 rounded-lg transition"
                    >
                      {dayNum}
                    </button>
                  );
                })}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const dayNum = i + 1;
                  const dObj = new Date(year, month, dayNum);
                  const iso = formatDateISO(dObj);
                  const isSelected = iso === selectedStr;
                  const isToday = iso === todayStr;
                  const disabledDay = isDateDisabled(dObj);

                  return (
                    <button
                      key={`curr-${dayNum}`}
                      type="button"
                      disabled={disabledDay}
                      onClick={() => handleSelectDate(dObj)}
                      className={`p-1.5 rounded-lg transition font-medium cursor-pointer ${
                        disabledDay
                          ? 'opacity-25 cursor-not-allowed line-through text-slate-400'
                          : isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : isToday
                          ? 'ring-1 ring-blue-500 font-bold text-blue-700 hover:bg-blue-50'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}

                {Array.from({ length: (42 - (firstDay + daysInMonth)) % 7 }).map((_, i) => {
                  const dayNum = i + 1;
                  const dObj = new Date(year, month + 1, dayNum);
                  return (
                    <button
                      key={`next-${i}`}
                      type="button"
                      onClick={() => handleSelectDate(dObj)}
                      className="p-1.5 text-slate-300 hover:bg-slate-50 rounded-lg transition"
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* VIEW MODE 2: Year View */}
          {viewMode === 'year' && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {monthShort.map((mShort, idx) => {
                const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === idx;
                return (
                  <button
                    key={mShort}
                    type="button"
                    onClick={() => {
                      setCurrentMonth(new Date(year, idx, 1));
                      setViewMode('month');
                    }}
                    className={`py-2 px-1 text-center font-bold rounded-xl transition ${
                      isSelected ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {mShort}
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 3: Decade View */}
          {viewMode === 'decade' && (
            <div className="grid grid-cols-3 gap-2 py-2">
              {Array.from({ length: 12 }).map((_, idx) => {
                const startDecade = Math.floor(year / 10) * 10 - 1;
                const yNum = startDecade + idx;
                const isSelected = selectedDate && selectedDate.getFullYear() === yNum;
                return (
                  <button
                    key={yNum}
                    type="button"
                    onClick={() => {
                      setCurrentMonth(new Date(yNum, month, 1));
                      setViewMode('year');
                    }}
                    className={`py-2 px-1 text-center font-bold rounded-xl transition ${
                      isSelected ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {yNum}
                  </button>
                );
              })}
            </div>
          )}

          {/* Popover Footer Bar */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px] font-bold">
            <button
              type="button"
              onClick={handleSelectToday}
              className="text-blue-600 hover:text-blue-800 transition px-1.5 py-0.5 rounded hover:bg-blue-50"
            >
              {messages?.date?.today || 'Bugün'}
            </button>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleClear()}
                className="text-slate-400 hover:text-slate-600 transition px-1.5 py-0.5 rounded hover:bg-slate-50"
              >
                {messages?.date?.clear || 'Temizle'}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-slate-900 transition px-1.5 py-0.5 rounded hover:bg-slate-100"
              >
                {messages?.common?.close || 'Kapat'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. DateRangePicker (Custom Enterprise Range)
// ==========================================
export interface DateRangePickerProps {
  label?: string;
  startDate?: string;
  endDate?: string;
  value?: { start?: string; end?: string };
  onChange?: ((range: { start: string; end: string }) => void) | ((start: string, end: string) => void) | any;
  format?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export function DateRangePicker({
  label,
  startDate = '',
  endDate = '',
  value,
  onChange,
  format = 'DD.MM.YYYY',
  min,
  max,
  disabled = false,
  clearable = true
}: DateRangePickerProps) {
  const initialStart = value?.start !== undefined ? value.start : startDate;
  const initialEnd = value?.end !== undefined ? value.end : endDate;

  const [start, setStart] = useState<Date | null>(parseAnyDate(initialStart));
  const [end, setEnd] = useState<Date | null>(parseAnyDate(initialEnd));
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(start || new Date());
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const minDate = parseAnyDate(min);
  const maxDate = parseAnyDate(max);

  useEffect(() => {
    if (value?.start !== undefined) setStart(parseAnyDate(value.start));
    if (value?.end !== undefined) setEnd(parseAnyDate(value.end));
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleDayClick = (d: Date) => {
    if (disabled) return;
    if (!start || (start && end)) {
      setStart(d);
      setEnd(null);
    } else if (start && !end) {
      if (d < start) {
        setEnd(start);
        setStart(d);
        emitChange(d, start);
      } else {
        setEnd(d);
        emitChange(start, d);
      }
      setIsOpen(false);
    }
  };

  const emitChange = (s: Date, e: Date) => {
    const sStr = formatDateISO(s);
    const eStr = formatDateISO(e);
    if (onChange) {
      onChange({ start: sStr, end: eStr });
      (onChange as any)(sStr, eStr);
    }
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setStart(null);
    setEnd(null);
    if (onChange) {
      onChange({ start: '', end: '' });
      (onChange as any)('', '');
    }
  };

  const handleApplyPreset = (days: number) => {
    const today = new Date();
    const past = new Date();
    past.setDate(today.getDate() - days);
    setStart(past);
    setEnd(today);
    emitChange(past, today);
    setIsOpen(false);
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOrig = new Date(year, month, 1).getDay();
  const firstDay = firstDayOrig === 0 ? 6 : firstDayOrig - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const startFormatted = start ? formatDateTR(start) : 'Başlangıç';
  const endFormatted = end ? formatDateTR(end) : 'Bitiş';

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className={`w-full flex items-center justify-between bg-white border rounded-xl py-1.5 px-3 transition shadow-2xs cursor-pointer ${
          disabled
            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
            : isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <div className="flex items-center gap-2 text-xs font-medium text-slate-800">
          <span className={start ? 'text-slate-900 font-bold' : 'text-slate-400'}>{startFormatted}</span>
          <span className="text-slate-400">&mdash;</span>
          <span className={end ? 'text-slate-900 font-bold' : 'text-slate-400'}>{endFormatted}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {clearable && (start || end) && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition"
              title="Aralığı Temizle"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="button"
            disabled={disabled}
            className={`p-1 rounded-lg transition ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 text-xs select-none w-80">
          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1 pb-2.5 mb-2.5 border-b border-slate-100">
            <button
              type="button"
              onClick={() => handleApplyPreset(0)}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[10px] font-bold text-slate-600 transition"
            >
              Bugün
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(7)}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[10px] font-bold text-slate-600 transition"
            >
              Son 7 Gün
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(30)}
              className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-[10px] font-bold text-slate-600 transition"
            >
              Son 30 Gün
            </button>
          </div>

          {/* Month Header Navigation */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-bold text-slate-800">
              {MONTH_NAMES_TR[month]} {year}
            </span>
            <button
              type="button"
              onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
              className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-slate-400 mb-1">
            {DAY_NAMES_TR.map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`prev-${i}`} className="p-1.5 text-slate-300">
                {prevMonthDays - firstDay + i + 1}
              </div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dObj = new Date(year, month, dayNum);
              const time = dObj.getTime();

              const startTime = start ? new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime() : null;
              const endTime = end ? new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime() : null;
              const isStart = startTime !== null && time === startTime;
              const isEnd = endTime !== null && time === endTime;
              const isInRange = startTime !== null && endTime !== null && time > startTime && time < endTime;

              return (
                <button
                  key={`day-${dayNum}`}
                  type="button"
                  onClick={() => handleDayClick(dObj)}
                  onMouseEnter={() => !end && start && setHoverDate(dObj)}
                  className={`p-1.5 text-xs font-medium transition cursor-pointer ${
                    isStart
                      ? 'bg-blue-600 text-white font-bold rounded-l-lg shadow-xs'
                      : isEnd
                      ? 'bg-blue-600 text-white font-bold rounded-r-lg shadow-xs'
                      : isInRange
                      ? 'bg-blue-100 text-blue-800 font-semibold'
                      : 'hover:bg-slate-100 text-slate-700 rounded-lg'
                  }`}
                >
                  {dayNum}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100 text-[11px] font-bold">
            <span className="text-slate-400 font-normal">
              {!start ? 'Başlangıç seçin' : !end ? 'Bitiş seçin' : 'Aralık seçildi'}
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-slate-900 transition px-2 py-0.5 rounded hover:bg-slate-100"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. DropDownList (Select)
// ==========================================
export interface SelectOption {
  value: string | number;
  label: string;
}

export interface DropDownListProps {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  placeholder?: string;
  onChange?: (val: any) => void;
  filterable?: boolean;
  clearButton?: boolean;
}

export function DropDownList({
  label,
  options,
  value,
  placeholder = 'Seçiniz...',
  onChange,
  filterable = true,
  clearButton = false
}: DropDownListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectOption | null>(
    options.find(o => o.value === value) || null
  );
  const [filter, setFilter] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(options.find(o => o.value === value) || null);
  }, [value, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(filter.toLowerCase()));

  const handleSelect = (opt: SelectOption) => {
    setSelected(opt);
    setIsOpen(false);
    if (onChange) onChange(opt.value);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    if (onChange) onChange('');
  };

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-2 px-3 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        <span className={selected ? 'font-semibold' : 'text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <div className="flex items-center gap-1.5">
          {clearButton && selected && (
            <span
              onClick={handleClear}
              className="text-slate-400 hover:text-slate-700 font-bold px-1 rounded-sm text-xs cursor-pointer"
            >
              ✕
            </span>
          )}
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 space-y-1 max-h-60 overflow-y-auto">
          {filterable && (
            <input
              type="text"
              placeholder="Ara..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 mb-1"
            />
          )}
          {filtered.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt)}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                selected?.value === opt.value
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{opt.label}</span>
              {selected?.value === opt.value && <span>✓</span>}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-2 text-xs text-slate-400">Sonuç bulunamadı</div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. MultiSelect
// ==========================================
export interface MultiSelectProps {
  label?: string;
  options: SelectOption[];
  value?: (string | number)[];
  placeholder?: string;
  onChange?: (vals: any) => void;
}

export function MultiSelect({
  label,
  options,
  value = [],
  placeholder = 'Öğeleri seçin...',
  onChange
}: MultiSelectProps) {
  const [selectedVals, setSelectedVals] = useState<(string | number)[]>(value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedVals(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleVal = (val: string | number) => {
    const next = selectedVals.includes(val)
      ? selectedVals.filter(v => v !== val)
      : [...selectedVals, val];
    setSelectedVals(next);
    if (onChange) onChange(next);
  };

  const removeVal = (val: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = selectedVals.filter(v => v !== val);
    setSelectedVals(next);
    if (onChange) onChange(next);
  };

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full min-h-[38px] flex flex-wrap items-center gap-1.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-1.5 px-2.5 shadow-2xs hover:border-slate-300 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500"
      >
        {selectedVals.length === 0 && <span className="text-slate-400">{placeholder}</span>}
        {selectedVals.map(val => {
          const opt = options.find(o => o.value === val);
          return (
            <span
              key={val}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[11px] font-bold"
            >
              <span>{opt ? opt.label : val}</span>
              <button
                type="button"
                onClick={e => removeVal(val, e)}
                className="hover:text-blue-900 rounded"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 space-y-1 max-h-60 overflow-y-auto">
          {options.map(opt => {
            const isSelected = selectedVals.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleVal(opt.value)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer flex items-center justify-between ${
                  isSelected ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{opt.label}</span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  readOnly
                  className="rounded text-blue-600 focus:ring-0"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 11. Rating
// ==========================================
export interface RatingProps {
  label?: string;
  value?: number;
  max?: number;
  precision?: number; // 0.5 or 1
  onChange?: (val: number) => void;
  readonly?: boolean;
}

export function Rating({ label, value = 0, max = 5, precision = 0.5, onChange, readonly = false }: RatingProps) {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const activeVal = hoverRating !== null ? hoverRating : rating;

  const handleClick = (val: number) => {
    if (readonly) return;
    setRating(val);
    if (onChange) onChange(val);
  };

  return (
    <div className="space-y-1 text-left font-sans select-none">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="inline-flex items-center gap-1">
        {Array.from({ length: max }).map((_, i) => {
          const starVal = i + 1;
          const isFilled = activeVal >= starVal;
          const isHalf = !isFilled && activeVal >= starVal - 0.5;

          return (
            <button
              key={i}
              type="button"
              disabled={readonly}
              onMouseEnter={() => !readonly && setHoverRating(starVal)}
              onMouseLeave={() => !readonly && setHoverRating(null)}
              onClick={() => handleClick(starVal)}
              className={`text-lg transition cursor-pointer ${readonly ? 'cursor-default' : 'hover:scale-110'}`}
            >
              {isFilled ? '★' : isHalf ? '⯨' : '☆'}
            </button>
          );
        })}
        <span className="text-xs font-bold text-slate-600 ml-2">
          {rating.toFixed(1)} / {max}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 12. Slider
// ==========================================
export interface SliderProps {
  label?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (val: number) => void;
}

export function Slider({ label, value = 50, min = 0, max = 100, step = 1, onChange }: SliderProps) {
  const [val, setVal] = useState(value);

  useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = parseFloat(e.target.value);
    setVal(next);
    if (onChange) onChange(next);
  };

  return (
    <div className="w-full space-y-1.5 text-left font-sans">
      <div className="flex justify-between items-center text-xs">
        {label && <label className="font-bold text-slate-700">{label}</label>}
        <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
          {val}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={handleChange}
        className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
      />
    </div>
  );
}

// ==========================================
// 13. OtpInput
// ==========================================
export interface OtpInputProps {
  label?: string;
  length?: number;
  onComplete?: (code: string) => void;
}

export function OtpInput({ label, length = 6, onComplete }: OtpInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, idx: number) => {
    if (!/^[0-9]?$/.test(val)) return;
    const newCode = [...code];
    newCode[idx] = val;
    setCode(newCode);

    if (val && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    }

    if (newCode.every(c => c !== '')) {
      if (onComplete) onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="flex gap-2">
        {code.map((digit, idx) => (
          <input
            key={idx}
            ref={el => (inputsRef.current[idx] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(e.target.value, idx)}
            onKeyDown={e => handleKeyDown(e, idx)}
            className="w-10 h-12 text-center font-bold text-base bg-white border border-slate-200 rounded-xl shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 14. ColorPicker (Swatches + Canvas)
// ==========================================
export interface ColorPickerProps {
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
  palette?: string[];
  disabled?: boolean;
}

const DEFAULT_COLOR_PALETTE = [
  '#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6',
  '#6366f1', '#8b5cf6', '#ec4899', '#64748b', '#0f172a', '#ffffff'
];

export function ColorPicker({
  label,
  value = '#3b82f6',
  onChange,
  palette = DEFAULT_COLOR_PALETTE,
  disabled = false
}: ColorPickerProps) {
  const [color, setColor] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectColor = (c: string) => {
    setColor(c);
    if (onChange) onChange(c);
  };

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(prev => !prev)}
          className={`flex items-center gap-2 bg-white border border-slate-200 rounded-xl py-1.5 px-2.5 transition shadow-2xs cursor-pointer hover:border-slate-300 ${
            isOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''
          }`}
        >
          <span
            className="w-5 h-5 rounded-lg border border-slate-300/80 shadow-inner shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="text-xs font-mono font-bold text-slate-800 uppercase">{color}</span>
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <input
          type="color"
          disabled={disabled}
          value={color}
          onChange={e => handleSelectColor(e.target.value)}
          className="w-8 h-8 p-0 rounded-lg border border-slate-200 cursor-pointer shadow-2xs shrink-0"
          title="Renk Paleti Seç"
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 text-xs select-none w-56">
          <div className="text-[11px] font-bold text-slate-400 mb-2">Hazır Renk Paleti</div>
          <div className="grid grid-cols-6 gap-1.5 mb-3">
            {palette.map(swatch => (
              <button
                key={swatch}
                type="button"
                onClick={() => {
                  handleSelectColor(swatch);
                  setIsOpen(false);
                }}
                className={`w-6 h-6 rounded-lg border transition transform hover:scale-110 cursor-pointer ${
                  color.toLowerCase() === swatch.toLowerCase()
                    ? 'ring-2 ring-blue-500 ring-offset-1 border-white'
                    : 'border-slate-200'
                }`}
                style={{ backgroundColor: swatch }}
                title={swatch}
              />
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Özel Renk</span>
            <input
              type="text"
              value={color}
              onChange={e => handleSelectColor(e.target.value)}
              className="text-xs font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg py-1 px-2 w-20 text-center uppercase"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 15. TimePicker (Custom Enterprise Time)
// ==========================================
export interface TimePickerProps {
  label?: string;
  value?: string; // HH:mm
  defaultValue?: string;
  onChange?: (time: string) => void;
  step?: number; // 5, 10, 15, 30
  format?: '24h' | '12h';
  min?: string;
  max?: string;
  disabled?: boolean;
  clearable?: boolean;
}

export function TimePicker({
  label,
  value,
  defaultValue = '14:30',
  onChange,
  step = 15,
  disabled = false,
  clearable = true
}: TimePickerProps) {
  const initial = value !== undefined ? value : defaultValue;
  const [val, setVal] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) setVal(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const [curHour, curMin] = val && val.includes(':') ? val.split(':') : ['12', '00'];

  const handleSelectTime = (h: string, m: string) => {
    const formatted = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`;
    setVal(formatted);
    if (onChange) onChange(formatted);
  };

  const handleSetNow = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    handleSelectTime(h, m);
    setIsOpen(false);
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVal('');
    if (onChange) onChange('');
  };

  const hours = Array.from({ length: 24 }).map((_, i) => String(i).padStart(2, '0'));
  const minutes: string[] = [];
  for (let m = 0; m < 60; m += step) {
    minutes.push(String(m).padStart(2, '0'));
  }

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className={`w-full flex items-center justify-between bg-white border rounded-xl py-1.5 px-3 transition shadow-2xs cursor-pointer ${
          disabled
            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
            : isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className="text-xs font-mono font-medium text-slate-800">
          {val || <span className="text-slate-400 font-sans">SS:DD</span>}
        </span>

        <div className="flex items-center gap-1.5">
          {clearable && val && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition"
              title="Temizle"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="button"
            disabled={disabled}
            className={`p-1 rounded-lg transition ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 text-xs select-none w-56">
          {/* Header Time Display */}
          <div className="flex items-center justify-center gap-2 pb-2 mb-2 border-b border-slate-100 font-mono text-base font-bold text-slate-800">
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg">{curHour}</span>
            <span>:</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg">{curMin}</span>
          </div>

          {/* Dual Columns: Hours & Minutes */}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div>
              <div className="text-[10px] font-bold text-slate-400 mb-1">Saat</div>
              <div className="h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {hours.map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleSelectTime(h, curMin)}
                    className={`w-full py-1 rounded-lg font-mono text-xs font-bold transition cursor-pointer ${
                      h === curHour ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] font-bold text-slate-400 mb-1">Dakika</div>
              <div className="h-44 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {minutes.map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectTime(curHour, m)}
                    className={`w-full py-1 rounded-lg font-mono text-xs font-bold transition cursor-pointer ${
                      m === curMin ? 'bg-blue-600 text-white shadow-xs' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100 text-[11px] font-bold">
            <button
              type="button"
              onClick={handleSetNow}
              className="text-blue-600 hover:text-blue-800 transition px-1.5 py-0.5 rounded hover:bg-blue-50"
            >
              Şimdi
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-600 hover:text-slate-900 transition px-2 py-0.5 rounded hover:bg-slate-100"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 16. DateTimePicker (Custom Enterprise DateTime)
// ==========================================
export interface DateTimePickerProps {
  label?: string;
  value?: string; // YYYY-MM-DDTHH:mm or DD.MM.YYYY HH:mm
  defaultValue?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
  clearable?: boolean;
}

export function DateTimePicker({
  label,
  value,
  defaultValue = '2026-10-12T14:30',
  onChange,
  disabled = false,
  clearable = true
}: DateTimePickerProps) {
  const initial = value !== undefined ? value : defaultValue;
  const [val, setVal] = useState(initial);
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'date' | 'time'>('date');
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) setVal(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Parse date and time components
  let parsedDate: Date = new Date();
  let timeStr = '14:30';
  if (val) {
    if (val.includes('T')) {
      const parts = val.split('T');
      parsedDate = new Date(parts[0]) || new Date();
      timeStr = parts[1] ? parts[1].substring(0, 5) : '14:30';
    } else if (val.includes(' ')) {
      const parts = val.split(' ');
      parsedDate = parseAnyDate(parts[0]) || new Date();
      timeStr = parts[1] ? parts[1].substring(0, 5) : '14:30';
    }
  }

  const [datePart, setDatePart] = useState<Date>(parsedDate);
  const [timePart, setTimePart] = useState<string>(timeStr);

  const handleUpdate = (newDate: Date, newTime: string) => {
    setDatePart(newDate);
    setTimePart(newTime);
    const iso = `${formatDateISO(newDate)}T${newTime}`;
    setVal(iso);
    if (onChange) onChange(iso);
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setVal('');
    if (onChange) onChange('');
  };

  const displayFormatted = val
    ? `${formatDateTR(datePart)} ${timePart}`
    : 'GG.AA.YYYY SS:DD';

  return (
    <div ref={wrapperRef} className={`w-full space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div
        onClick={() => !disabled && setIsOpen(prev => !prev)}
        className={`w-full flex items-center justify-between bg-white border rounded-xl py-1.5 px-3 transition shadow-2xs cursor-pointer ${
          disabled
            ? 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
            : isOpen
            ? 'border-blue-500 ring-2 ring-blue-500/20'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`text-xs font-medium ${val ? 'text-slate-800' : 'text-slate-400'}`}>
          {displayFormatted}
        </span>

        <div className="flex items-center gap-1.5">
          {clearable && val && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition"
              title="Temizle"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          <button
            type="button"
            disabled={disabled}
            className={`p-1 rounded-lg transition ${isOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 text-xs select-none w-72">
          {/* Popover Tab Buttons: Date vs Time */}
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-3">
            <button
              type="button"
              onClick={() => setTab('date')}
              className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                tab === 'date' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>📅</span> Tarih
            </button>
            <button
              type="button"
              onClick={() => setTab('time')}
              className={`py-1 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                tab === 'time' ? 'bg-white text-blue-600 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🕒</span> Saat ({timePart})
            </button>
          </div>

          {/* Tab 1: Date Calendar Picker */}
          {tab === 'date' && (
            <div className="space-y-2">
              <DatePicker
                value={formatDateISO(datePart)}
                onChange={newDateStr => {
                  const d = parseAnyDate(newDateStr) || new Date();
                  handleUpdate(d, timePart);
                  setTab('time'); // Auto advance to time selection
                }}
                clearable={false}
              />
            </div>
          )}

          {/* Tab 2: Time Picker */}
          {tab === 'time' && (
            <div className="space-y-2">
              <TimePicker
                value={timePart}
                onChange={newTimeStr => {
                  handleUpdate(datePart, newTimeStr);
                }}
                clearable={false}
              />
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-slate-100 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const h = String(now.getHours()).padStart(2, '0');
                const m = String(now.getMinutes()).padStart(2, '0');
                handleUpdate(now, `${h}:${m}`);
                setIsOpen(false);
              }}
              className="text-blue-600 hover:text-blue-800 transition px-1.5 py-0.5 rounded hover:bg-blue-50"
            >
              Şimdi
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-700 bg-slate-100 hover:bg-slate-200 transition px-2.5 py-1 rounded-lg"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 17. ComboBox (Girdi & Liste)
// ==========================================
export interface ComboBoxProps {
  label?: string;
  options: string[];
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

export function ComboBox({ label, options, value = '', placeholder = 'Seçin veya yazın...', onChange }: ComboBoxProps) {
  const [val, setVal] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = options.filter(o => o.toLowerCase().includes(val.toLowerCase()));

  const handleSelect = (option: string) => {
    setVal(option);
    setIsOpen(false);
    if (onChange) onChange(option);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={`space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder={placeholder}
          value={val}
          onChange={e => {
            setVal(e.target.value);
            setIsOpen(true);
            if (onChange) onChange(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-2 px-3 pr-8 shadow-2xs outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 text-slate-400 hover:text-slate-600 text-xs"
        >
          ▼
        </button>
      </div>

      {isOpen && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto py-1">
          {filtered.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(opt)}
              className="px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 cursor-pointer font-medium"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 18. AutoComplete
// ==========================================
export interface AutoCompleteProps {
  label?: string;
  suggestions: string[];
  placeholder?: string;
  minLength?: number;
  onSelect?: (val: string) => void;
}

export function AutoComplete({
  label,
  suggestions,
  placeholder = 'Yazmaya başlayın...',
  minLength = 1,
  onSelect
}: AutoCompleteProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const matches = input.length >= minLength
    ? suggestions.filter(s => s.toLowerCase().includes(input.toLowerCase()))
    : [];

  return (
    <div className={`space-y-1.5 text-left font-sans relative ${isOpen && matches.length > 0 ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <input
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={e => {
          setInput(e.target.value);
          setIsOpen(true);
        }}
        className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-2 px-3 shadow-2xs outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isOpen && matches.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto py-1">
          {matches.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setInput(item);
                setIsOpen(false);
                if (onSelect) onSelect(item);
              }}
              className="px-3 py-1.5 text-xs hover:bg-blue-50 hover:text-blue-600 cursor-pointer font-medium"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 19. MaskedTextBox
// ==========================================
export interface MaskRule {
  test: (char: string) => boolean;
  transform?: (char: string) => string;
}

const DEFAULT_MASK_RULES: Record<string, MaskRule> = {
  // 0: Digit (0-9) - required
  '0': { test: c => /\d/.test(c) },
  // 9: Digit (0-9) or space - optional
  '9': { test: c => /[\d\s]/.test(c) },
  // #: Digit (0-9) or sign (+, -)
  '#': { test: c => /[\d+-]/.test(c) },
  // L: Letter (a-z, A-Z) - auto-uppercase (supports Turkish characters)
  'L': {
    test: c => /^[a-zA-ZğüşıöçĞÜŞİÖÇ]$/.test(c),
    transform: c => c.toLocaleUpperCase('tr-TR')
  },
  // ?: Optional letter
  '?': {
    test: c => /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]$/.test(c),
    transform: c => c.toLocaleUpperCase('tr-TR')
  },
  // A: Alphanumeric (0-9, a-z, A-Z)
  'A': {
    test: c => /^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ]$/.test(c),
    transform: c => c.toLocaleUpperCase('tr-TR')
  },
  // a: Optional alphanumeric
  'a': {
    test: c => /^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]$/.test(c)
  },
  // &: Any character
  '&': { test: () => true }
};

interface MaskToken {
  type: 'rule' | 'literal';
  char: string;
  rule?: MaskRule;
}

function parseMask(maskStr: string, customRules?: Record<string, MaskRule>): MaskToken[] {
  const rules = { ...DEFAULT_MASK_RULES, ...customRules };
  const tokens: MaskToken[] = [];
  let isEscaped = false;

  for (let i = 0; i < maskStr.length; i++) {
    const ch = maskStr[i];
    if (isEscaped) {
      tokens.push({ type: 'literal', char: ch });
      isEscaped = false;
      continue;
    }
    if (ch === '\\') {
      isEscaped = true;
      continue;
    }
    if (rules[ch]) {
      tokens.push({ type: 'rule', char: ch, rule: rules[ch] });
    } else {
      tokens.push({ type: 'literal', char: ch });
    }
  }
  return tokens;
}

function extractRuleValues(text: string, tokens: MaskToken[], promptChar?: string): string[] {
  if (!text) return [];
  const result: string[] = [];
  let tokenIdx = 0;

  for (let i = 0; i < text.length; i++) {
    if (tokenIdx >= tokens.length) break;
    const ch = text[i];
    if (promptChar && ch === promptChar) {
      tokenIdx++;
      continue;
    }
    const token = tokens[tokenIdx];

    if (token.type === 'literal') {
      if (ch === token.char) {
        tokenIdx++;
      } else {
        while (tokenIdx < tokens.length && tokens[tokenIdx].type === 'literal') {
          tokenIdx++;
        }
        if (tokenIdx < tokens.length && tokens[tokenIdx].type === 'rule') {
          const rule = tokens[tokenIdx].rule!;
          if (rule.test(ch)) {
            result.push(rule.transform ? rule.transform(ch) : ch);
            tokenIdx++;
          }
        }
      }
    } else {
      const rule = token.rule!;
      if (rule.test(ch)) {
        result.push(rule.transform ? rule.transform(ch) : ch);
        tokenIdx++;
      }
    }
  }

  return result;
}

function formatMask(ruleValues: string[], tokens: MaskToken[], promptChar?: string): string {
  if (ruleValues.length === 0 && !promptChar) {
    return '';
  }

  let formatted = '';
  let ruleIdx = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.type === 'literal') {
      if (promptChar) {
        formatted += token.char;
      } else {
        if (ruleIdx < ruleValues.length) {
          formatted += token.char;
        } else {
          // If we reached the end of rule values and the very next token is a literal right after the last typed rule,
          // include it (e.g. after area code, show ") ")
          if (ruleIdx > 0 && i > 0 && tokens[i - 1].type === 'rule') {
            formatted += token.char;
            // Also include immediate subsequent space if any (e.g. ") ")
            if (i + 1 < tokens.length && tokens[i + 1].type === 'literal' && tokens[i + 1].char === ' ') {
              formatted += tokens[i + 1].char;
            }
          }
          break;
        }
      }
    } else {
      if (ruleIdx < ruleValues.length) {
        formatted += ruleValues[ruleIdx++];
      } else if (promptChar) {
        formatted += promptChar;
      } else {
        break;
      }
    }
  }

  return formatted;
}

export interface MaskedTextBoxProps {
  label?: string;
  mask: string; // e.g. "(000) 000-0000", "00000000000", "0000 0000 0000 0000", "00 LLL 000"
  value?: string;
  defaultValue?: string;
  promptChar?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearButton?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  rules?: Record<string, MaskRule>;
  onChange?: (val: string) => void;
  onRawChange?: (raw: string) => void;
}

export function MaskedTextBox({
  label,
  mask,
  value,
  defaultValue = '',
  promptChar,
  placeholder,
  disabled = false,
  readOnly = false,
  clearButton = true,
  error,
  helperText,
  className = '',
  prefixIcon,
  suffixIcon,
  rules,
  onChange,
  onRawChange
}: MaskedTextBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const tokens = useMemo(() => parseMask(mask, rules), [mask, rules]);

  const [ruleValues, setRuleValues] = useState<string[]>(() => {
    const initialText = value !== undefined ? value : defaultValue;
    return extractRuleValues(initialText, tokens, promptChar);
  });

  const [displayVal, setDisplayVal] = useState<string>(() => {
    return formatMask(ruleValues, tokens, promptChar);
  });

  // Keep internal state synchronized with controlled `value` prop
  useEffect(() => {
    if (value !== undefined) {
      const extracted = extractRuleValues(value, tokens, promptChar);
      setRuleValues(extracted);
      setDisplayVal(formatMask(extracted, tokens, promptChar));
    }
  }, [value, tokens, promptChar]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElem = e.target;
    const rawInput = inputElem.value;
    const currentCursor = inputElem.selectionStart ?? rawInput.length;

    // Count how many valid rule characters existed before the cursor
    const textBeforeCursor = rawInput.slice(0, currentCursor);
    const rulesBefore = extractRuleValues(textBeforeCursor, tokens, promptChar);
    const rulesBeforeCount = rulesBefore.length;

    // Extract all valid rule characters from new input
    const newRules = extractRuleValues(rawInput, tokens, promptChar);
    const newFormatted = formatMask(newRules, tokens, promptChar);

    setRuleValues(newRules);
    setDisplayVal(newFormatted);

    if (onChange) onChange(newFormatted);
    if (onRawChange) onRawChange(newRules.join(''));

    // Determine target cursor position after formatting
    let targetCursor = 0;
    let counted = 0;

    if (rulesBeforeCount === 0) {
      let lead = 0;
      while (lead < tokens.length && tokens[lead].type === 'literal' && lead < newFormatted.length) {
        lead++;
      }
      targetCursor = lead;
    } else {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type === 'rule') {
          counted++;
          if (counted === rulesBeforeCount) {
            targetCursor = i + 1;
            while (
              targetCursor < newFormatted.length &&
              targetCursor < tokens.length &&
              tokens[targetCursor].type === 'literal'
            ) {
              targetCursor++;
            }
            break;
          }
        }
      }
    }

    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(targetCursor, targetCursor);
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || readOnly) return;
    const input = inputRef.current;
    if (!input) return;

    const { selectionStart, selectionEnd } = input;
    if (selectionStart === null || selectionEnd === null) return;

    if (e.key === 'Backspace' && selectionStart === selectionEnd) {
      if (selectionStart === 0) return;

      // Find character to delete (moving backwards past literal tokens)
      let deletePos = selectionStart - 1;
      while (deletePos >= 0 && tokens[deletePos]?.type === 'literal') {
        deletePos--;
      }

      if (deletePos >= 0 && tokens[deletePos]?.type === 'rule') {
        e.preventDefault();
        let ruleIndexToDelete = 0;
        for (let i = 0; i < deletePos; i++) {
          if (tokens[i].type === 'rule') ruleIndexToDelete++;
        }

        const nextRules = [...ruleValues];
        if (ruleIndexToDelete < nextRules.length) {
          nextRules.splice(ruleIndexToDelete, 1);
          const nextFormatted = formatMask(nextRules, tokens, promptChar);

          setRuleValues(nextRules);
          setDisplayVal(nextFormatted);

          if (onChange) onChange(nextFormatted);
          if (onRawChange) onRawChange(nextRules.join(''));

          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(deletePos, deletePos);
            }
          });
        }
      }
    } else if (e.key === 'Delete' && selectionStart === selectionEnd) {
      if (selectionStart >= displayVal.length) return;

      // Find character to delete forward (moving forward past literal tokens)
      let deletePos = selectionStart;
      while (deletePos < tokens.length && tokens[deletePos]?.type === 'literal') {
        deletePos++;
      }

      if (deletePos < tokens.length && tokens[deletePos]?.type === 'rule') {
        e.preventDefault();
        let ruleIndexToDelete = 0;
        for (let i = 0; i < deletePos; i++) {
          if (tokens[i].type === 'rule') ruleIndexToDelete++;
        }

        const nextRules = [...ruleValues];
        if (ruleIndexToDelete < nextRules.length) {
          nextRules.splice(ruleIndexToDelete, 1);
          const nextFormatted = formatMask(nextRules, tokens, promptChar);

          setRuleValues(nextRules);
          setDisplayVal(nextFormatted);

          if (onChange) onChange(nextFormatted);
          if (onRawChange) onRawChange(nextRules.join(''));

          requestAnimationFrame(() => {
            if (inputRef.current) {
              inputRef.current.setSelectionRange(deletePos, deletePos);
            }
          });
        }
      }
    }
  };

  const handleClear = () => {
    setRuleValues([]);
    const emptyFormatted = formatMask([], tokens, promptChar);
    setDisplayVal(emptyFormatted);
    if (onChange) onChange(emptyFormatted);
    if (onRawChange) onRawChange('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`space-y-1.5 text-left font-sans ${className}`}>
      {label && (
        <label className="block text-xs font-bold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {prefixIcon && <span className="absolute left-3 text-slate-400 pointer-events-none">{prefixIcon}</span>}

        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder || (promptChar ? formatMask([], tokens, promptChar) : mask)}
          value={displayVal}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className={`w-full text-xs font-mono font-bold text-slate-800 bg-white border rounded-xl py-2 px-3 shadow-2xs transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200'
          } ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-400' : ''} ${
            prefixIcon ? 'pl-9' : ''
          } ${clearButton && displayVal ? 'pr-9' : ''}`}
        />

        {clearButton && displayVal && !disabled && !readOnly ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 rounded-full cursor-pointer transition"
            title="Temizle"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : suffixIcon ? (
          <span className="absolute right-3 text-slate-400 pointer-events-none">{suffixIcon}</span>
        ) : null}
      </div>

      {helperText && !error && <p className="text-[11px] text-slate-400">{helperText}</p>}
      {error && <p className="text-[11px] font-semibold text-rose-500">{error}</p>}
    </div>
  );
}

// ==========================================
// 20. Upload (Dosya Yükleyici)
// ==========================================
export interface UploadProps {
  label?: string;
  multiple?: boolean;
  accept?: string;
  onFilesChange?: (files: File[]) => void;
  onUpload?: (files: File[]) => void;
  disabled?: boolean;
}

export function Upload({ label, multiple = true, accept, onFilesChange, onUpload, disabled = false }: UploadProps) {
  const [files, setFiles] = useState<Array<{ name: string; size: string; progress: number }>>([]);
  const [isDragging, setIsDragging] = useState(false);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || disabled) return;
    const fileArray = Array.from(fileList);
    const newFiles = fileArray.map(f => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      progress: 100
    }));
    setFiles(prev => [...prev, ...newFiles]);
    if (onFilesChange) onFilesChange(fileArray);
    if (onUpload) onUpload(fileArray);
  };

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-3 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}

      {/* Drop Zone */}
      <div
        onDragOver={e => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setIsDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition cursor-pointer ${
          isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
        }`}
      >
        <input
          type="file"
          id="panoptes-upload-input"
          multiple={multiple}
          accept={accept}
          onChange={e => addFiles(e.target.files)}
          className="hidden"
        />
        <label htmlFor="panoptes-upload-input" className="cursor-pointer space-y-1 block">
          <div className="text-2xl">📤</div>
          <p className="text-xs font-bold text-slate-800">
            Dosyaları buraya sürükleyin veya <span className="text-blue-600 underline">Gözatın</span>
          </p>
          <p className="text-[11px] text-slate-400">PDF, Word, Excel, Görseller (Maks. 25MB)</p>
        </label>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-1.5">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl text-xs"
            >
              <div className="flex items-center gap-2">
                <span>📄</span>
                <div>
                  <span className="font-bold text-slate-800">{file.name}</span>
                  <span className="text-[10px] text-slate-400 ml-2">({file.size})</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                className="text-rose-500 hover:text-rose-700 font-bold px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 21. Editor (WYSIWYG Zengin Metin)
// ==========================================
export interface EditorProps {
  label?: string;
  initialValue?: string;
  value?: string;
  onChange?: (html: string) => void;
  height?: string | number;
  placeholder?: string;
  disabled?: boolean;
}

export function Editor({
  label,
  initialValue = '<p>Panoptes zengin metin editörü içeriği...</p>',
  value,
  onChange,
  height = 160,
  placeholder,
  disabled = false
}: EditorProps) {
  const [content, setContent] = useState(value !== undefined ? value : initialValue);
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  useEffect(() => {
    if (value !== undefined) setContent(value);
  }, [value]);

  const exec = (cmd: string, val: string = '') => {
    document.execCommand(cmd, false, val);
  };

  return (
    <div className="space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}

      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
        {/* Toolbar */}
        <div className="p-2 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => exec('bold')}
            className="w-7 h-7 bg-white border rounded font-bold hover:bg-slate-100"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => exec('italic')}
            className="w-7 h-7 bg-white border rounded italic hover:bg-slate-100"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => exec('underline')}
            className="w-7 h-7 bg-white border rounded underline hover:bg-slate-100"
          >
            U
          </button>
          <span className="w-px h-5 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => exec('insertUnorderedList')}
            className="px-2 h-7 bg-white border rounded hover:bg-slate-100"
          >
            • Liste
          </button>
          <button
            type="button"
            onClick={() => exec('insertOrderedList')}
            className="px-2 h-7 bg-white border rounded hover:bg-slate-100"
          >
            1. Sıralı
          </button>
          <span className="w-px h-5 bg-slate-300 mx-1" />
          <button
            type="button"
            onClick={() => setIsHtmlMode(!isHtmlMode)}
            className={`px-2.5 h-7 rounded font-bold text-[11px] transition ${
              isHtmlMode ? 'bg-blue-600 text-white' : 'bg-white border text-slate-700 hover:bg-slate-100'
            }`}
          >
            &lt;/&gt; HTML Modu
          </button>
        </div>

        {/* Content Editable Area */}
        {isHtmlMode ? (
          <textarea
            value={content}
            onChange={e => {
              setContent(e.target.value);
              if (onChange) onChange(e.target.value);
            }}
            className="w-full h-36 p-4 font-mono text-xs outline-none bg-slate-950 text-slate-200"
          />
        ) : (
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
            onBlur={e => {
              const html = e.currentTarget.innerHTML;
              setContent(html);
              if (onChange) onChange(html);
            }}
            className="p-4 min-h-[140px] text-xs outline-none leading-relaxed text-slate-800"
          />
        )}
      </div>
    </div>
  );
}

// ==========================================
// 22. Signature (Dijital Islak İmza)
// ==========================================
export interface SignatureProps {
  label?: string;
  onSave?: (dataUrl: string) => void;
  onChange?: (dataUrl: string) => void;
  width?: string | number;
  height?: string | number;
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
}

export function Signature({
  label,
  onSave,
  onChange,
  width = '100%',
  height = 160,
  color = '#1e293b',
  backgroundColor,
  disabled = false
}: SignatureProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (canvasRef.current && onChange) {
      onChange(canvasRef.current.toDataURL('image/png'));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    if (onSave) onSave(dataUrl);
    alert('İmza görseli kaydedildi (PNG)');
  };

  return (
    <div className="space-y-1.5 text-left font-sans">
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs bg-white">
        <canvas
          ref={canvasRef}
          width={500}
          height={160}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          className="w-full h-40 bg-slate-50/50 cursor-crosshair"
        />
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-[11px] text-slate-400">Fare veya dokunmatik ekranla kutu içine imza atın</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={clear}
              className="px-3 py-1 bg-white border border-slate-200 rounded-lg font-bold hover:bg-slate-100"
            >
              Temizle
            </button>
            <button
              type="button"
              onClick={save}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
            >
              İmzayı Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 23. DropDownTree
// ==========================================
export interface DropDownTreeNode {
  id: string | number;
  label?: string;
  text?: string;
  children?: DropDownTreeNode[];
  items?: DropDownTreeNode[];
}

export interface DropDownTreeProps {
  label?: string;
  data: DropDownTreeNode[];
  value?: string | number;
  onChange?: (val: any) => void;
  onSelect?: (node: DropDownTreeNode) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function DropDownTree({
  label,
  data,
  value,
  onChange,
  onSelect,
  placeholder = 'Hiyerarşik öğe seçin...',
  disabled = false
}: DropDownTreeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<DropDownTreeNode | null>(null);

  const findNode = (nodes: DropDownTreeNode[], targetId: string | number): DropDownTreeNode | null => {
    for (const n of nodes) {
      if (n.id === targetId) return n;
      const sub = n.children || n.items;
      if (sub) {
        const found = findNode(sub, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    if (value !== undefined) {
      const node = findNode(data, value);
      setSelected(node || { id: value, label: String(value) });
    }
  }, [value, data]);

  const handleSelect = (node: DropDownTreeNode) => {
    if (disabled) return;
    setSelected(node);
    setIsOpen(false);
    if (onChange) onChange(node.id);
    if (onSelect) onSelect(node);
  };

  const getSubNodes = (n: DropDownTreeNode) => n.children || n.items;
  const getNodeText = (n: DropDownTreeNode) => n.label || n.text || String(n.id);

  return (
    <div className={`space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl shadow-2xs text-slate-800 transition ${
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : 'cursor-pointer hover:border-slate-300'
        } ${isOpen ? 'ring-2 ring-blue-500/20 border-blue-500' : ''}`}
      >
        <span className={selected ? 'font-bold' : 'text-slate-400'}>
          {selected ? `📁 ${getNodeText(selected)}` : placeholder}
        </span>
        <span className="text-slate-400 text-[10px]">▼</span>
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-2 max-h-56 overflow-y-auto">
          {data.map(root => {
            const rootSubs = getSubNodes(root);
            return (
              <div key={root.id} className="space-y-1">
                <div
                  onClick={() => handleSelect(root)}
                  className="px-2 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>📁</span>
                  <span>{getNodeText(root)}</span>
                </div>
                {rootSubs && (
                  <div className="pl-4 space-y-0.5 border-l border-slate-100 ml-2">
                    {rootSubs.map(child => (
                      <div
                        key={child.id}
                        onClick={() => handleSelect(child)}
                        className="px-2 py-1 rounded-lg hover:bg-blue-50 hover:text-blue-600 text-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <span>📄</span>
                        <span>{getNodeText(child)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 24. MultiColumnComboBox
// ==========================================
export interface MultiColumnComboBoxColumn {
  field: string;
  title: string;
  width?: string;
}

export type MultiColumnItem = Record<string, any>;

export interface MultiColumnComboBoxProps {
  label?: string;
  data: MultiColumnItem[];
  columns?: MultiColumnComboBoxColumn[];
  textField?: string;
  valueField?: string;
  value?: any;
  onChange?: (val: any) => void;
  onSelect?: (item: MultiColumnItem) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultiColumnComboBox({
  label,
  data,
  columns,
  textField = 'name',
  valueField = 'id',
  value,
  onChange,
  onSelect,
  placeholder = 'Kod veya ad ile arayın...',
  disabled = false
}: MultiColumnComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<MultiColumnItem | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (value !== undefined) {
      const item = data.find(d => String(d[valueField]) === String(value));
      if (item) setSelected(item);
    }
  }, [value, valueField, data]);

  const filtered = data.filter(d => {
    if (!filter) return true;
    const txt = String(d[textField] || '').toLowerCase();
    const val = String(d[valueField] || '').toLowerCase();
    const q = filter.toLowerCase();
    return txt.includes(q) || val.includes(q);
  });

  const cols: MultiColumnComboBoxColumn[] = columns || [
    { field: 'code', title: 'Kod', width: '100px' },
    { field: 'name', title: 'Ürün Adı', width: '200px' },
    { field: 'category', title: 'Kategori', width: '120px' },
    { field: 'price', title: 'Fiyat', width: '90px' }
  ];

  const handleChoose = (item: MultiColumnItem) => {
    if (disabled) return;
    setSelected(item);
    setFilter('');
    setIsOpen(false);
    if (onChange) onChange(item[valueField] !== undefined ? item[valueField] : item);
    if (onSelect) onSelect(item);
  };

  const displayText = selected ? String(selected[textField] || selected[valueField]) : filter;

  return (
    <div className={`space-y-1.5 text-left font-sans relative ${isOpen ? 'z-50' : 'z-10'}`}>
      {label && <label className="block text-xs font-bold text-slate-700">{label}</label>}
      <div className="relative">
        <input
          type="text"
          disabled={disabled}
          placeholder={placeholder}
          value={displayText}
          onChange={e => {
            setFilter(e.target.value);
            setSelected(null);
            setIsOpen(true);
          }}
          onFocus={() => !disabled && setIsOpen(true)}
          className={`w-full text-xs text-slate-800 bg-white border border-slate-200 rounded-xl py-2 px-3 pr-8 shadow-2xs outline-none transition ${
            disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : 'focus:ring-2 focus:ring-blue-500'
          }`}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className="absolute right-2 top-2.5 text-slate-400 text-xs cursor-pointer"
        >
          ▼
        </button>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 font-black text-slate-600 text-[11px]">
                {cols.map(c => (
                  <th key={c.field} style={{ width: c.width }} className="p-2.5">
                    {c.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={cols.length} className="p-4 text-center text-slate-400">
                    Kayıt bulunamadı.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr
                    key={item.id ?? idx}
                    onClick={() => handleChoose(item)}
                    className="hover:bg-blue-50 cursor-pointer transition"
                  >
                    {cols.map(c => (
                      <td key={c.field} className="p-2.5 font-medium text-slate-700">
                        {item[c.field]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 25. Form (Deklaratif Form Konteyneri)
// ==========================================
export interface FormProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  initialValues?: Record<string, any>;
  onSubmit?: (e: any) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function Form({
  title,
  subtitle,
  children,
  initialValues,
  onSubmit,
  style,
  className = ''
}: FormProps) {
  return (
    <form
      style={style}
      onSubmit={e => {
        e.preventDefault();
        if (onSubmit) onSubmit(initialValues || e);
      }}
      className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-left font-sans ${className}`}
    >
      {(title || subtitle) && (
        <div className="border-b border-slate-100 pb-3 mb-2">
          {title && <h3 className="text-sm font-black text-slate-800">{title}</h3>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </form>
  );
}

