'use client';

import { useLanguage } from '@shared/i18n/LanguageContext';

export default function ConversationsPage() {
  const { language } = useLanguage();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Conversaciones</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          {/* Lista de conversaciones */}
        </div>
        <div className="lg:col-span-3">
          {/* Área de chat */}
        </div>
      </div>
    </main>
  );
} 