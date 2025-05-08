'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';

export default function ClientPanel() {
  const params = useParams();
  const clientID = params.clientID as string;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Aquí podemos cargar los datos del cliente si es necesario
    setLoading(false);
  }, [clientID]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-nia-pink"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Panel del Cliente {clientID}</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">Contenido del panel del cliente...</p>
        </div>
      </div>
    </Layout>
  );
} 