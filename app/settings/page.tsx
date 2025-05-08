'use client';

import { useLanguage } from '@shared/i18n/LanguageContext';
import { useState } from 'react';

export default function SettingsPage() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Aquí implementaremos la lógica para guardar la configuración
      console.log('Guardando configuración...');
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configuración de NNIA</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Sección de Personalización de NNIA */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Personalización de NNIA</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Asistente
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre personalizado para NNIA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Descripción del asistente y sus capacidades"
              />
            </div>
          </div>
        </section>

        {/* Sección de Configuración de Integración */}
        <section className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Configuración de Integración</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableWidget"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="enableWidget" className="ml-2 block text-sm text-gray-700">
                Habilitar Widget de Chat
              </label>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
} 