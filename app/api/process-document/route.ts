import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { AssistantAPI } from '@/lib/assistant';

export async function POST(request: Request) {
  try {
    const supabase = createClientComponentClient();
    
    // Verificar autenticación
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener la ruta del archivo del cuerpo de la solicitud
    const { filePath } = await request.json();
    if (!filePath) {
      return NextResponse.json(
        { error: 'Ruta del archivo no proporcionada' },
        { status: 400 }
      );
    }

    // Inicializar el asistente
    const assistant = new AssistantAPI();

    // Procesar el documento
    const result = await assistant.process_document(filePath, user.id);

    if (result.status === 'error') {
      return NextResponse.json(
        { error: result.message },
        { status: 500 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en process-document:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 