'use client';

import Image from 'next/image';

export default function WelcomeBubble() {
  return (
    <div className="bg-nia-pink rounded-2xl p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src="/nnia-profile-picture.webp"
              alt="NNIA Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-alata text-black mb-2">Bienvenido al panel de NIA</h3>
          <p className="text-black text-sm leading-relaxed">
            Antes de comenzar, necesito conocer algunos detalles clave de tu negocio.
            Esto me permitirá adaptarme a tu estilo, tus clientes y tu forma de trabajar.
            En solo unos pasos estarás listo para dejar que yo me encargue del resto.
          </p>
        </div>
      </div>
    </div>
  );
} 