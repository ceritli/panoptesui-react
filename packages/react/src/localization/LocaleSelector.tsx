import React from 'react';
import { usePanoptesLocale } from './context';
import { localeList } from './locales';

export interface LocaleSelectorProps {
  className?: string;
  showFlag?: boolean;
  showNativeName?: boolean;
  variant?: 'select' | 'buttons';
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({
  className = '',
  showFlag = true,
  showNativeName = true,
  variant = 'select',
}) => {
  const { locale, setLocale } = usePanoptesLocale();

  if (variant === 'buttons') {
    return (
      <div className={`panoptes-locale-selector inline-flex flex-wrap gap-1 ${className}`}>
        {localeList.map((loc) => {
          const isActive = loc.code === locale;
          return (
            <button
              key={loc.code}
              type="button"
              onClick={() => setLocale(loc.code)}
              className={`px-2 py-1 text-xs rounded transition-all flex items-center gap-1.5 border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {showFlag && <span>{loc.flag}</span>}
              <span>{showNativeName ? loc.nativeName : loc.name}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`panoptes-locale-selector relative inline-flex items-center ${className}`}>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        aria-label="Dil seçimi"
        className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs rounded-lg px-2.5 py-1.5 pr-7 font-medium hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer shadow-sm"
      >
        {localeList.map((loc) => (
          <option key={loc.code} value={loc.code}>
            {showFlag ? `${loc.flag} ` : ''}
            {showNativeName ? loc.nativeName : loc.name} ({loc.code.toUpperCase()})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 text-slate-400 text-[10px]">
        ▼
      </div>
    </div>
  );
};
