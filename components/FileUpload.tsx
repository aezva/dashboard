'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUploadSuccess?: (data: any) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const supabase = createClientComponentClient();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setMessage(null);

      // Obtener el usuario autenticado
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Crear la ruta del archivo usando el user_id
      const filePath = `${user.id}/${selectedFile.name}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('business-files')
        .upload(filePath, selectedFile);

      if (uploadError) throw uploadError;

      // Procesar documento con Nnia
      setProcessing(true);
      const response = await fetch('/api/process-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath: data.path }),
      });

      if (!response.ok) {
        throw new Error('Error procesando el documento con Nnia');
      }

      const result = await response.json();
      
      if (result.status === 'success') {
        setMessage({ type: 'success', text: 'Documento procesado exitosamente' });
        if (onUploadSuccess) {
          onUploadSuccess(result);
        }
      } else {
        throw new Error(result.message || 'Error procesando el documento');
      }
    } catch (error) {
      console.error('Error en handleUpload:', error);
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Error al procesar el documento' 
      });
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <input
          type="file"
          onChange={handleFileSelect}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-primary-foreground
            hover:file:bg-primary/90"
        />
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading || processing}
        >
          {uploading || processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {processing ? 'Procesando...' : 'Subiendo...'}
            </>
          ) : (
            'Subir y Procesar'
          )}
        </Button>
      </div>
      
      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
} 