'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  detectedLanguage: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Función para detectar el idioma del navegador
const detectBrowserLanguage = (): Language => {
  if (typeof window === 'undefined') return 'es';
  
  const browserLang = navigator.language.split('-')[0];
  return browserLang === 'en' ? 'en' : 'es';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es';
    
    // Intentar obtener el idioma guardado
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) return savedLanguage;
    
    // Si no hay idioma guardado, usar el del navegador
    return detectBrowserLanguage();
  });

  const detectedLanguage = detectBrowserLanguage();

  useEffect(() => {
    // Guardar preferencia del usuario
    localStorage.setItem('language', language);
    
    // Actualizar el atributo lang del HTML
    document.documentElement.lang = language;
    
    // Emitir evento para notificar cambios de idioma
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: language }));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, detectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 