'use client';

import { useLanguage } from '@shared/i18n/LanguageContext';

export default function BillingPage() {
  const { language } = useLanguage();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Créditos y Suscripción</h1>
      <div className="max-w-4xl mx-auto">
        {/* Aquí irá la información de créditos y suscripción */}
      </div>
    </main>
  );
} 