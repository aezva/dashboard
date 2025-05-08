import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface BusinessData {
  id: string;
  user_id: string;
  business_name: string;
  industry: string;
  business_description: string;
  website_url: string;
  platform: string;
  product_type: string;
  main_products: string;
  social_media: Array<{ platform: string; username: string }>;
  created_at: string;
  updated_at: string;
}

export const BusinessInfoForm: React.FC = () => {
  const [businessData, setBusinessData] = useState<Partial<BusinessData>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadBusinessData();
  }, []);

  const loadBusinessData = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const { data, error } = await supabase
        .from('business_data')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      setBusinessData(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al cargar la información del negocio' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const { error } = await supabase
        .from('business_data')
        .update({
          ...businessData,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Información actualizada correctamente' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar la información' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof BusinessData, value: any) => {
    setBusinessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (index: number, field: 'platform' | 'username', value: string) => {
    setBusinessData(prev => {
      const socialMedia = [...(prev.social_media || [])];
      if (!socialMedia[index]) {
        socialMedia[index] = { platform: '', username: '' };
      }
      socialMedia[index][field] = value;
      return { ...prev, social_media: socialMedia };
    });
  };

  const addSocialMedia = () => {
    setBusinessData(prev => ({
      ...prev,
      social_media: [...(prev.social_media || []), { platform: '', username: '' }]
    }));
  };

  const removeSocialMedia = (index: number) => {
    setBusinessData(prev => ({
      ...prev,
      social_media: (prev.social_media || []).filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Información del Negocio</h2>
      
      {message && (
        <div className={`mb-4 p-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Negocio
          </label>
          <input
            type="text"
            value={businessData.business_name || ''}
            onChange={(e) => handleChange('business_name', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industria
          </label>
          <input
            type="text"
            value={businessData.industry || ''}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del Negocio
          </label>
          <textarea
            value={businessData.business_description || ''}
            onChange={(e) => handleChange('business_description', e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sitio Web
          </label>
          <input
            type="url"
            value={businessData.website_url || ''}
            onChange={(e) => handleChange('website_url', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plataforma
          </label>
          <input
            type="text"
            value={businessData.platform || ''}
            onChange={(e) => handleChange('platform', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Producto
          </label>
          <input
            type="text"
            value={businessData.product_type || ''}
            onChange={(e) => handleChange('product_type', e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Productos Principales
          </label>
          <textarea
            value={businessData.main_products || ''}
            onChange={(e) => handleChange('main_products', e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Redes Sociales
          </label>
          <div className="space-y-4">
            {(businessData.social_media || []).map((social, index) => (
              <div key={index} className="flex space-x-4">
                <input
                  type="text"
                  value={social.platform}
                  onChange={(e) => handleSocialMediaChange(index, 'platform', e.target.value)}
                  placeholder="Plataforma"
                  className="flex-1 p-2 border rounded-md"
                />
                <input
                  type="text"
                  value={social.username}
                  onChange={(e) => handleSocialMediaChange(index, 'username', e.target.value)}
                  placeholder="Usuario"
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeSocialMedia(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSocialMedia}
              className="text-blue-500 hover:text-blue-700"
            >
              Añadir Red Social
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? 'bg-gray-400' : 'bg-nia-pink hover:bg-nia-pink/90'
          }`}
        >
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
}; 