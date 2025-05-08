'use client';

import { useState } from 'react';
import { useLanguage } from '@shared/i18n/LanguageContext';
import { useTranslation } from '@shared/i18n/useTranslation';
import { 
  SparklesIcon,
  Cog6ToothIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

interface NNIAConfig {
  businessInfo: {
    name: string;
    industry: string;
    email: string;
    phone: string;
    address: string;
  };
  preferences: {
    language: string;
    timezone: string;
    notificationSettings: {
      email: boolean;
      push: boolean;
    };
  };
  integrations: {
    shopify: boolean;
    whatsapp: boolean;
    email: boolean;
  };
  roles: {
    personal: boolean;
    sales: boolean;
    customerService: boolean;
    marketing: boolean;
  };
}

export default function SetupPage() {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<NNIAConfig>({
    businessInfo: {
      name: '',
      industry: '',
      email: '',
      phone: '',
      address: '',
    },
    preferences: {
      language: 'es',
      timezone: 'America/Mexico_City',
      notificationSettings: {
        email: true,
        push: true,
      },
    },
    integrations: {
      shopify: false,
      whatsapp: false,
      email: false,
    },
    roles: {
      personal: true,
      sales: true,
      customerService: true,
      marketing: true,
    },
  });

  const handleInputChange = (section: keyof NNIAConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSave = () => {
    // Implementa la lógica para guardar la configuración de NNIA
    console.log('Guardando configuración de NNIA:', config);
  };

  const handleCancel = () => {
    // Implementa la lógica para cancelar la configuración
    console.log('Cancelando configuración');
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <SparklesIcon className="h-8 w-8 text-nia-pink mr-2" />
            <h1 className="text-3xl font-bold text-nia-pink">
              Configuración de NNIA
            </h1>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Configura tu asistente virtual NNIA para tu negocio
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <Cog6ToothIcon className="h-5 w-5 mr-2 text-nia-pink" />
                  Información del Negocio
                </h2>
                
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Nombre del Negocio
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={config.businessInfo.name}
                    onChange={(e) => handleInputChange('businessInfo', 'name', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nia-pink focus:ring-nia-pink sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                    Industria
                  </label>
                  <input
                    type="text"
                    name="industry"
                    id="industry"
                    value={config.businessInfo.industry}
                    onChange={(e) => handleInputChange('businessInfo', 'industry', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nia-pink focus:ring-nia-pink sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={config.businessInfo.email}
                    onChange={(e) => handleInputChange('businessInfo', 'email', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-nia-pink focus:ring-nia-pink sm:text-sm"
                    required
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <LinkIcon className="h-5 w-5 mr-2 text-nia-pink" />
                  Integraciones
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shopify"
                      checked={config.integrations.shopify}
                      onChange={(e) => handleInputChange('integrations', 'shopify', e.target.checked)}
                      className="h-4 w-4 text-nia-pink focus:ring-nia-pink border-gray-300 rounded"
                    />
                    <label htmlFor="shopify" className="ml-2 block text-sm text-gray-900">
                      Shopify
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="whatsapp"
                      checked={config.integrations.whatsapp}
                      onChange={(e) => handleInputChange('integrations', 'whatsapp', e.target.checked)}
                      className="h-4 w-4 text-nia-pink focus:ring-nia-pink border-gray-300 rounded"
                    />
                    <label htmlFor="whatsapp" className="ml-2 block text-sm text-gray-900">
                      WhatsApp
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Anterior
                </button>
              )}
              {step < 2 ? (
                <button
                  onClick={handleNext}
                  className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nia-pink hover:bg-nia-pink-dark"
                >
                  Siguiente
                </button>
              ) : (
                <div className="ml-auto space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-nia-pink hover:bg-nia-pink-dark"
                  >
                    Guardar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 