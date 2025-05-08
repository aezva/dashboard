'use client';

import { useState, useRef } from 'react';
import { useUser } from '@/context/UserContext';
import { UserCircleIcon, PhotoIcon, EnvelopeIcon, LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const { userProfile, updateUserProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    image: userProfile?.image || null
  });
  const [profileImage, setProfileImage] = useState<string | null>(userProfile?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          image: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (isChangingPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      // Aquí iría la lógica para cambiar la contraseña
    }
    
    updateUserProfile({
      name: formData.name,
      email: formData.email,
      image: formData.image
    });
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Tu perfil</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90"
          >
            Editar Perfil
          </button>
        ) : (
          <div className="space-x-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setIsChangingPassword(false);
              }}
              className="bg-gray-200 text-black px-4 py-2 rounded-full text-sm hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-nia-pink text-black px-4 py-2 rounded-full text-sm hover:bg-nia-pink/90"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Información personal</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserCircleIcon className="h-24 w-24 text-gray-300" />
                )}
              </div>
              {isEditing && (
                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nia-pink"
                  >
                    <PhotoIcon className="h-5 w-5 text-gray-400 mr-2 inline-block" />
                    Cambiar foto
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                    placeholder="Tu nombre completo"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{userProfile?.name || 'No especificado'}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                    placeholder="tu@email.com"
                  />
                ) : (
                  <div className="mt-1 flex items-center text-sm text-gray-900">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {userProfile?.email || 'No especificado'}
                  </div>
                )}
              </div>

              <div className="pt-4">
                {!isChangingPassword ? (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nia-pink"
                  >
                    <KeyIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Cambiar contraseña
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Contraseña actual
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmar nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-gray-200 focus:ring-0 sm:text-sm"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Plan actual</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Prueba gratuita</p>
                <p className="text-2xl font-semibold text-gray-900">Gratis</p>
                <p className="text-sm text-gray-500 mt-1">15 días restantes</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Expira el 5 de mayo, 2024</p>
              </div>
            </div>
            <div className="bg-nia-pink/10 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                ¡No pierdas tu acceso a NNIA! Elige un plan antes de que termine tu prueba gratuita para seguir disfrutando de todas las funcionalidades.
              </p>
              <Link 
                href="/billing"
                className="mt-4 inline-block bg-nia-pink text-black border-none px-6 py-2 cursor-pointer text-base rounded-full transform scale-95 transition-transform duration-300 hover:scale-100 font-roboto"
              >
                Elegir plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 