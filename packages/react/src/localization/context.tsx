import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { PanoptesLocaleMessages } from './types';
import { availableLocales, trLocale, enLocale } from './locales';

interface PanoptesLocaleContextType {
  locale: string;
  messages: PanoptesLocaleMessages;
  setLocale: (code: string) => void;
  direction: 'ltr' | 'rtl';
  t: (keyPath: string, ...args: (string | number)[]) => string;
}

const defaultContextValue: PanoptesLocaleContextType = {
  locale: 'tr',
  messages: trLocale,
  setLocale: () => {},
  direction: 'ltr',
  t: (keyPath: string, ...args: (string | number)[]) => formatMessage(trLocale, keyPath, ...args),
};

const PanoptesLocaleContext = createContext<PanoptesLocaleContextType>(defaultContextValue);

function resolveKey(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

function formatMessage(messages: PanoptesLocaleMessages, path: string, ...args: (string | number)[]): string {
  let val = resolveKey(messages, path);
  if (typeof val !== 'string') {
    // Fallback to English if missing
    val = resolveKey(enLocale, path);
    if (typeof val !== 'string') return path;
  }

  if (args.length === 0) return val;

  return val.replace(/\{(\d+)\}/g, (match, index) => {
    const idx = parseInt(index, 10);
    return args[idx] !== undefined ? String(args[idx]) : match;
  });
}

export interface PanoptesProviderProps {
  children: React.ReactNode;
  locale?: string | PanoptesLocaleMessages;
  messages?: Partial<PanoptesLocaleMessages>;
  storageKey?: string;
  applyDocumentDir?: boolean;
}

export const PanoptesProvider: React.FC<PanoptesProviderProps> = ({
  children,
  locale: initialLocaleProp = 'tr',
  messages: customMessages,
  storageKey = 'panoptes_locale',
  applyDocumentDir = false,
}) => {
  const [currentCode, setCurrentCode] = useState<string>(() => {
    if (typeof initialLocaleProp === 'string') {
      if (typeof window !== 'undefined' && storageKey) {
        const saved = localStorage.getItem(storageKey);
        if (saved && availableLocales[saved]) return saved;
      }
      return initialLocaleProp;
    }
    return initialLocaleProp.code || 'tr';
  });

  useEffect(() => {
    if (typeof initialLocaleProp === 'string' && initialLocaleProp !== currentCode) {
      if (availableLocales[initialLocaleProp]) {
        setCurrentCode(initialLocaleProp);
      }
    }
  }, [initialLocaleProp]);

  const setLocale = (code: string) => {
    if (availableLocales[code]) {
      setCurrentCode(code);
      if (typeof window !== 'undefined' && storageKey) {
        localStorage.setItem(storageKey, code);
      }
    }
  };

  const activeMessages = useMemo<PanoptesLocaleMessages>(() => {
    let base: PanoptesLocaleMessages;
    if (typeof initialLocaleProp === 'object' && initialLocaleProp.code === currentCode) {
      base = initialLocaleProp;
    } else {
      base = availableLocales[currentCode] || trLocale;
    }

    if (!customMessages) return base;

    return {
      ...base,
      ...customMessages,
      grid: { ...base.grid, ...(customMessages.grid || {}) },
      date: { ...base.date, ...(customMessages.date || {}) },
      common: { ...base.common, ...(customMessages.common || {}) },
    };
  }, [currentCode, initialLocaleProp, customMessages]);

  const direction = activeMessages.direction || 'ltr';

  useEffect(() => {
    if (applyDocumentDir && typeof document !== 'undefined') {
      document.documentElement.dir = direction;
      document.documentElement.lang = currentCode;
    }
  }, [direction, currentCode, applyDocumentDir]);

  const t = (path: string, ...args: (string | number)[]) => formatMessage(activeMessages, path, ...args);

  const contextValue = useMemo(
    () => ({
      locale: currentCode,
      messages: activeMessages,
      setLocale,
      direction,
      t,
    }),
    [currentCode, activeMessages, direction]
  );

  return (
    <PanoptesLocaleContext.Provider value={contextValue}>
      {children}
    </PanoptesLocaleContext.Provider>
  );
};

export const usePanoptesLocale = () => {
  return useContext(PanoptesLocaleContext);
};

export const usePanoptesTranslation = () => {
  const { t, messages, locale, direction, setLocale } = useContext(PanoptesLocaleContext);
  return { t, messages, locale, direction, setLocale };
};
