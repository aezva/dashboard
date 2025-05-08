'use client';

import { useRouter } from 'next/navigation';
import OnboardingSection from '../../components/OnboardingSection';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/login');
          return;
        }

        // Verificar si el usuario ya completó el onboarding
        const { data: profile } = await supabase
          .from('users')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single();

        if (profile?.onboarding_completed) {
          router.push('/dashboard');
        } else {
          setNeedsOnboarding(true);
        }
      } catch (error) {
        console.error('Error al verificar estado del onboarding:', error);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [router, supabase]);

  const handleOnboardingComplete = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Marcar el onboarding como completado
      await supabase
        .from('users')
        .update({ onboarding_completed: true })
        .eq('id', user.id);

      router.push('/dashboard');
    } catch (error) {
      console.error('Error al completar el onboarding:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nia-pink"></div>
      </div>
    );
  }

  if (!needsOnboarding) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Bienvenido a tu Panel de Cliente</h1>
          
          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-200 max-w-md">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-nia-pink">
                      <Image
                        src="/nnia-profile-picture.webp"
                        alt="NNIA Avatar"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-900">NNIA</span>
                      <span className="text-xs text-gray-500">• Asistente Virtual</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      ¡Hola! Soy NNIA, tu asistente virtual. Estoy aquí para ayudarte a monitorear y analizar el rendimiento de tu negocio. Explora las diferentes secciones para ver cómo puedo ayudarte.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OnboardingSection onComplete={handleOnboardingComplete} />
      </div>
    </div>
  );
} 