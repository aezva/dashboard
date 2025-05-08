'use client';

import { useLanguage } from '@shared/i18n/LanguageContext';

export default function SupportPage() {
  const { language } = useLanguage();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Soporte</h1>
      <div className="max-w-4xl mx-auto">
        {/* Aquí irá el formulario de contacto y opciones de soporte */}
      </div>
    </main>
  );
} 