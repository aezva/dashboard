import { useLanguage } from './LanguageContext';
import { getTranslation, TranslationKey } from './translations';

export function useTranslation() {
  const { language } = useLanguage();
  
  return {
    t: (key: TranslationKey) => getTranslation(key, language),
    language
  };
} 