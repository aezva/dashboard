'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ChevronDownIcon,
  BuildingStorefrontIcon, 
  GlobeAltIcon,
  CubeIcon,
  ShareIcon,
  ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import CustomSelect from './CustomSelect';
import WelcomeBubble from './WelcomeBubble';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  completed: boolean;
}

interface OnboardingSectionProps {
  onComplete: () => void;
}

export default function OnboardingSection({ onComplete }: OnboardingSectionProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'business-info',
      title: 'Nombre del negocio y tipo',
      description: 'Introduce el nombre, industria y una descripción corta de tu negocio.',
      icon: BuildingStorefrontIcon,
      completed: false
    },
    {
      id: 'website',
      title: 'Conecta tu sitio web',
      description: 'Enlaza tu web o tienda donde NIA estará activa.',
      icon: GlobeAltIcon,
      completed: false
    },
    {
      id: 'products',
      title: 'Qué vendes / Qué haces',
      description: 'Describe brevemente tus productos o servicios principales.',
      icon: CubeIcon,
      completed: false
    },
    {
      id: 'social-media',
      title: 'Redes sociales',
      description: 'Conecta Instagram, Facebook o TikTok (opcional).',
      icon: ShareIcon,
      completed: false
    },
    {
      id: 'test-chat',
      title: 'Simula una conversación',
      description: 'Prueba cómo responde NIA con tus datos.',
      icon: ChatBubbleLeftIcon,
      completed: false
    }
  ]);

  const [expandedStep, setExpandedStep] = useState<string | null>('business-info');
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    description: '',
    websiteUrl: '',
    platform: '',
    productType: '',
    mainProducts: '',
    socialMedia: [
      { platform: '', username: '' }
    ],
    testMessage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSocialMediaChange = (index: number, field: 'platform' | 'username', value: string) => {
    setFormData(prev => {
      const newSocialMedia = [...prev.socialMedia];
      newSocialMedia[index] = {
        ...newSocialMedia[index],
        [field]: value
      };
      return {
        ...prev,
        socialMedia: newSocialMedia
      };
    });
  };

  const addSocialMedia = () => {
    setFormData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: '', username: '' }]
    }));
  };

  const removeSocialMedia = (index: number) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index)
    }));
  };

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const completeStep = async (stepId: string) => {
    setSteps(steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    setExpandedStep(null);
    
    const allCompleted = steps.every(step => step.id === stepId ? true : step.completed);
    if (allCompleted) {
      try {
        // Obtener el user_id del usuario autenticado
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuario no autenticado');

        // Preparar los datos para insertar
        const businessData = {
          user_id: user.id,
          business_name: formData.businessName,
          industry: formData.industry,
          business_description: formData.description,
          website_url: formData.websiteUrl,
          platform: formData.platform,
          product_type: formData.productType,
          main_products: formData.mainProducts,
          social_media: formData.socialMedia,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        // Insertar los datos en Supabase
        const { error: businessError } = await supabase
          .from('business_data')
          .insert([businessData]);

        if (businessError) throw businessError;

        // Marcar el onboarding como completado en el perfil
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ onboarding_completed: true })
          .eq('id', user.id);

        if (profileError) throw profileError;

        // Redirigir al dashboard
        router.push('/dashboard');
        onComplete();
      } catch (error) {
        console.error('Error al guardar los datos del negocio:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    }
  };

  const allStepsCompleted = steps.every(step => step.completed);

  if (allStepsCompleted) {
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">¡Listo!</h2>
            <p className="mt-1 text-sm text-gray-500">
              NIA ya está en funcionamiento con los datos iniciales de tu negocio. 
              Puedes seguir personalizándola en la sección "Tu negocio" del menú lateral 
              para que responda con aún más inteligencia y contexto.
            </p>
          </div>
          <button
            type="button"
            className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
          >
            Activar NIA ahora
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
      <WelcomeBubble />
      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div
              className={`flex items-center justify-between w-full p-4 text-left transition-colors duration-200 ${
                expandedStep === step.id
                  ? 'bg-nia-pink/10 text-nia-pink'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
            >
              <div className="flex items-center space-x-3">
                <step.icon className={`h-5 w-5 ${
                  expandedStep === step.id ? 'text-nia-pink' : 'text-gray-400'
                }`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {step.completed && (
                  <CheckCircleIcon className="h-5 w-5 text-nia-pink" />
                )}
                <ChevronDownIcon 
                  className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                    expandedStep === step.id ? 'rotate-180 text-nia-pink' : ''
                  }`}
                />
              </div>
            </div>

            {expandedStep === step.id && (
              <div className="border-t border-gray-200 bg-white">
                <div className="p-4 space-y-4">
                  {step.id === 'business-info' && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          id="businessName"
                          value={formData.businessName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                          placeholder="Nombre del negocio"
                        />
                      </div>
                      <div>
                        <CustomSelect
                          id="industry"
                          value={formData.industry}
                          onChange={(value) => handleInputChange({ target: { id: 'industry', value } } as any)}
                          placeholder="Selecciona una industria"
                          options={[
                            { value: 'ecommerce', label: 'E-commerce' },
                            { value: 'services', label: 'Servicios' },
                            { value: 'education', label: 'Educación' },
                            { value: 'health', label: 'Salud' },
                            { value: 'other', label: 'Otro' }
                          ]}
                        />
                      </div>
                      <div>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                          placeholder="Describe brevemente tu negocio"
                        />
                      </div>
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => completeStep('business-info')}
                          className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
                        >
                          Listo
                        </button>
                      </div>
                    </div>
                  )}

                  {step.id === 'website' && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="url"
                          id="websiteUrl"
                          value={formData.websiteUrl}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                          placeholder="URL del sitio web"
                        />
                      </div>
                      <div>
                        <CustomSelect
                          id="platform"
                          value={formData.platform}
                          onChange={(value) => handleInputChange({ target: { id: 'platform', value } } as any)}
                          placeholder="Selecciona una plataforma"
                          options={[
                            { value: 'wordpress', label: 'WordPress' },
                            { value: 'shopify', label: 'Shopify' },
                            { value: 'woocommerce', label: 'WooCommerce' },
                            { value: 'custom', label: 'Sitio personalizado' }
                          ]}
                        />
                      </div>
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => completeStep('website')}
                          className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
                        >
                          Listo
                        </button>
                      </div>
                    </div>
                  )}

                  {step.id === 'products' && (
                    <div className="space-y-4">
                      <div>
                        <CustomSelect
                          id="productType"
                          value={formData.productType}
                          onChange={(value) => handleInputChange({ target: { id: 'productType', value } } as any)}
                          placeholder="Selecciona un tipo"
                          options={[
                            { value: 'physical', label: 'Productos físicos' },
                            { value: 'digital', label: 'Productos digitales' },
                            { value: 'services', label: 'Servicios' },
                            { value: 'mixed', label: 'Mixto' }
                          ]}
                        />
                      </div>
                      <div>
                        <textarea
                          id="mainProducts"
                          value={formData.mainProducts}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                          placeholder="Productos/servicios principales"
                        />
                      </div>
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => completeStep('products')}
                          className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
                        >
                          Listo
                        </button>
                      </div>
                    </div>
                  )}

                  {step.id === 'social-media' && (
                    <div className="space-y-4">
                      {formData.socialMedia.map((social, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="flex-1">
                            <CustomSelect
                              id={`platform-${index}`}
                              value={social.platform}
                              onChange={(value) => handleSocialMediaChange(index, 'platform', value)}
                              placeholder="Selecciona una red social"
                              options={[
                                { value: 'instagram', label: 'Instagram' },
                                { value: 'facebook', label: 'Facebook' },
                                { value: 'tiktok', label: 'TikTok' },
                                { value: 'twitter', label: 'Twitter' },
                                { value: 'linkedin', label: 'LinkedIn' },
                                { value: 'youtube', label: 'YouTube' },
                                { value: 'pinterest', label: 'Pinterest' },
                                { value: 'other', label: 'Otra red social' }
                              ]}
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              type="text"
                              id={`username-${index}`}
                              value={social.username}
                              onChange={(e) => handleSocialMediaChange(index, 'username', e.target.value)}
                              className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                              placeholder="Usuario o enlace"
                            />
                          </div>
                          {formData.socialMedia.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSocialMedia(index)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <div className="flex flex-col space-y-4">
                        <button
                          type="button"
                          onClick={addSocialMedia}
                          className="inline-flex items-center px-3 py-2 border border-gray-200 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-0"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Añadir otra red social
                        </button>
                        <div className="flex justify-start">
                          <button
                            type="button"
                            onClick={() => completeStep('social-media')}
                            className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
                          >
                            Listo
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step.id === 'test-chat' && (
                    <div className="space-y-4">
                      <div>
                        <textarea
                          id="testMessage"
                          value={formData.testMessage}
                          onChange={handleInputChange}
                          rows={3}
                          className="mt-1 block w-full rounded-md border border-gray-200 bg-white shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                          placeholder="Escribe un mensaje de prueba"
                        />
                      </div>
                      <div className="flex justify-start">
                        <button
                          type="button"
                          onClick={() => completeStep('test-chat')}
                          className="bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
                        >
                          Listo
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 