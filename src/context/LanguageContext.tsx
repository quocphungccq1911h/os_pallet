'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Locale, translations } from '@/i18n/translations';

type DictType = (typeof translations)[Locale];

interface LanguageContextValue {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: DictType;
}

const STORAGE_KEY = 'pta_locale';

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'vi',
  setLocale: () => {},
  t: translations.vi,
});

function isValidLocale(val: string | null | undefined): val is Locale {
  return val === 'vi' || val === 'en' || val === 'zh';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('vi');

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      const savedLang = window.localStorage.getItem(STORAGE_KEY);
      const initial: Locale = isValidLocale(urlLang)
        ? urlLang
        : isValidLocale(savedLang)
          ? savedLang
          : 'vi';

      setLocaleState(initial);
      window.localStorage.setItem(STORAGE_KEY, initial);
      document.documentElement.lang = initial === 'zh' ? 'zh-CN' : initial;
    } catch {
      // ignore storage errors
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${STORAGE_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = next === 'zh' ? 'zh-CN' : next;
    } catch {
      // ignore
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}
