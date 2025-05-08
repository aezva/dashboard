'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { DocumentIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface FileItem {
  name: string;
  path: string;
  created_at: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const { data, error } = await supabase.storage
        .from('business-files')
        .list(user.id);

      if (error) {
        throw error;
      }

      setFiles(data.map(file => ({
        name: file.name,
        path: `${user.id}/${file.name}`,
        created_at: file.created_at
      })));
    } catch (err) {
      console.error('Error al cargar archivos:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar los archivos');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('business-files')
        .download(filePath);

      if (error) {
        throw error;
      }

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error al descargar archivo:', err);
      alert('Error al descargar el archivo');
    }
  };

  const handleDelete = async (filePath: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      return;
    }

    try {
      const { error } = await supabase.storage
        .from('business-files')
        .remove([filePath]);

      if (error) {
        throw error;
      }

      setFiles(files.filter(file => file.path !== filePath));
    } catch (err) {
      console.error('Error al eliminar archivo:', err);
      alert('Error al eliminar el archivo');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-nia-pink"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay archivos subidos
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Documentos Subidos</h3>
      </div>

      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {files.map((file) => (
          <div key={file.path} className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DocumentIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-900">{file.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleDownload(file.path, file.name)}
                className="text-gray-400 hover:text-gray-500"
                title="Descargar"
              >
                <ArrowDownTrayIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleDelete(file.path)}
                className="text-gray-400 hover:text-red-500"
                title="Eliminar"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 