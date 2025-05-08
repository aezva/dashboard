'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  MegaphoneIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('analisis');
  const [marketingData, setMarketingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Aquí se integrará la llamada a la API para obtener los datos del asistente
    const fetchMarketingData = async () => {
      try {
        // TODO: Integrar con la Assistant API
        // const response = await fetch('/api/marketing/assistant');
        // const data = await response.json();
        // setMarketingData(data);
      } catch (error) {
        console.error('Error al cargar datos de marketing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketingData();
  }, []);

  const tabs = [
    { id: 'analisis', name: 'Análisis', icon: ChartBarIcon },
    { id: 'campañas', name: 'Campañas', icon: MegaphoneIcon },
    { id: 'audiencia', name: 'Audiencia', icon: UserGroupIcon },
    { id: 'contenido', name: 'Contenido', icon: DocumentTextIcon },
    { id: 'configuracion', name: 'Configuración', icon: Cog6ToothIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Asistente de Marketing</h1>
            <p className="mt-1 text-sm text-gray-500">
              Tu asistente especializado en marketing y estrategia digital
            </p>
          </div>
        </div>

        {/* Pestañas */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === tab.id
                      ? 'border-nia-pink text-nia-pink'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon
                  className={`
                    -ml-0.5 mr-2 h-5 w-5
                    ${activeTab === tab.id ? 'text-nia-pink' : 'text-gray-400 group-hover:text-gray-500'}
                  `}
                  aria-hidden="true"
                />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenido de las pestañas */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500">Cargando datos del asistente...</p>
            </div>
          ) : (
            <>
              {activeTab === 'analisis' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Análisis de Marketing</h2>
                  <p className="text-gray-500">
                    Usa el chat de NNIA para solicitar análisis específicos. Por ejemplo:
                    <ul className="mt-2 list-disc list-inside">
                      <li>"Analiza el rendimiento de nuestras campañas del último mes"</li>
                      <li>"Genera un informe de ROI de nuestras estrategias"</li>
                      <li>"Compara el rendimiento de diferentes canales de marketing"</li>
                    </ul>
                  </p>
                </div>
              )}

              {activeTab === 'campañas' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Campañas</h2>
                  <p className="text-gray-500">
                    Interactúa con NNIA para gestionar tus campañas. Por ejemplo:
                    <ul className="mt-2 list-disc list-inside">
                      <li>"Crea una nueva campaña para el lanzamiento del producto"</li>
                      <li>"Revisa el estado de las campañas activas"</li>
                      <li>"Optimiza el presupuesto de las campañas actuales"</li>
                    </ul>
                  </p>
                </div>
              )}

              {activeTab === 'audiencia' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Audiencia</h2>
                  <p className="text-gray-500">
                    Pide a NNIA que analice y gestione tu audiencia. Por ejemplo:
                    <ul className="mt-2 list-disc list-inside">
                      <li>"Analiza el comportamiento de nuestra audiencia"</li>
                      <li>"Crea segmentos de audiencia basados en el comportamiento"</li>
                      <li>"Identifica oportunidades de crecimiento en nuevos segmentos"</li>
                    </ul>
                  </p>
                </div>
              )}

              {activeTab === 'contenido' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Contenido</h2>
                  <p className="text-gray-500">
                    Solicita a NNIA que te ayude con el contenido. Por ejemplo:
                    <ul className="mt-2 list-disc list-inside">
                      <li>"Genera ideas de contenido para el próximo trimestre"</li>
                      <li>"Analiza el rendimiento de nuestro contenido actual"</li>
                      <li>"Crea un calendario editorial para las redes sociales"</li>
                    </ul>
                  </p>
                </div>
              )}

              {activeTab === 'configuracion' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">Configuración</h2>
                  <p className="text-gray-500">
                    Configura tu asistente de marketing a través de NNIA. Por ejemplo:
                    <ul className="mt-2 list-disc list-inside">
                      <li>"Configura las alertas de métricas importantes"</li>
                      <li>"Ajusta las preferencias de notificaciones"</li>
                      <li>"Integra nuevas fuentes de datos"</li>
                    </ul>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
} 