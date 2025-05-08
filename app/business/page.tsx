'use client';

import { useRouter } from 'next/navigation';
import { BusinessInfoForm } from '@/components/BusinessInfoForm';
import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import { 
  BuildingStorefrontIcon,
  GlobeAltIcon,
  CubeIcon,
  ShareIcon,
  DocumentIcon,
  PlusIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { fetchBusinessData, BusinessData } from '@/lib/fetchBusinessData';
import { supabase } from '@/lib/supabase';

export default function BusinessPage() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadBusinessData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Usuario no autenticado');

        const { data, error } = await supabase
          .from('business_data')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        if (!data) {
          throw new Error('No se encontraron datos del negocio');
        }

        // Transformar los datos para que coincidan con la interfaz BusinessData
        const transformedData: BusinessData = {
          id: data.id,
          business_name: data.business_name || '',
          business_description: data.business_description || '',
          industry: data.industry || '',
          website_url: data.website_url || '',
          platform: data.platform || '',
          product_type: data.product_type || '',
          main_products: data.main_products || '',
          social_media: Array.isArray(data.social_media) ? data.social_media : [],
          created_at: data.created_at,
          updated_at: data.updated_at,
          user_id: data.user_id,
          status: data.status || 'active',
          settings: {
            theme: data.settings?.theme || 'default',
            notifications: data.settings?.notifications ?? true,
            language: data.settings?.language || 'es'
          }
        };

        setBusinessData(transformedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Error al cargar los datos del negocio'));
      } finally {
        setLoading(false);
      }
    }

    loadBusinessData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nia-pink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p>Error al cargar los datos: {error.message}</p>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-alata text-gray-900">Editar Información del Negocio</h1>
          <button
            onClick={() => setIsEditing(false)}
            className="text-nia-pink hover:text-nia-pink/80"
          >
            Volver a la vista
          </button>
        </div>
        <BusinessInfoForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-alata text-gray-900">Información del Negocio</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center space-x-2 text-nia-pink hover:text-nia-pink/80"
        >
          <PencilIcon className="h-5 w-5" />
          <span>Editar</span>
        </button>
      </div>

      {businessData && (
        <div className="space-y-4">
          <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Información Básica</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-700">Nombre del Negocio</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.business_name || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Industria</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.industry || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Descripción del Negocio</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.business_description || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Sitio Web</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.website_url || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Plataforma</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.platform || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Tipo de Producto</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.product_type || 'No disponible'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Productos Principales</p>
                <p className="mt-1 text-sm text-gray-900">{businessData.main_products || 'No disponible'}</p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Redes Sociales</h2>
            <div className="space-y-4">
              {businessData.social_media && businessData.social_media.length > 0 ? (
                businessData.social_media.map((social, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <ShareIcon className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{social.platform}</p>
                      <p className="text-sm text-gray-500">{social.username}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay redes sociales configuradas</p>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 mb-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Documentos</h2>
            <div className="space-y-6">
              <FileUpload />
              <FileList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 