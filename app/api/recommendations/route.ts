import { NextResponse } from 'next/server';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { AssistantAPI } from '@/lib/assistant';

export async function GET() {
    try {
        const supabase = createClientComponentClient();
        
        // Verificar autenticación
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json(
                { error: 'No autorizado' },
                { status: 401 }
            );
        }

        // Inicializar el asistente
        const assistant = new AssistantAPI();

        // Obtener recomendaciones
        const recommendations = await assistant.get_business_recommendations(user.id);

        if (recommendations.status === 'error') {
            return NextResponse.json(
                { error: recommendations.message },
                { status: 500 }
            );
        }

        return NextResponse.json(recommendations);
    } catch (error) {
        console.error('Error obteniendo recomendaciones:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
} 