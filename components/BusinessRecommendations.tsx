import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Recommendation {
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: string;
}

interface RecommendationsResponse {
    status: 'success' | 'error';
    message?: string;
    data?: {
        strategic_recommendations: Recommendation[];
        opportunities: Recommendation[];
        priority_actions: Recommendation[];
        metrics: Recommendation[];
    };
}

export function BusinessRecommendations() {
    const [recommendations, setRecommendations] = useState<RecommendationsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch('/api/recommendations');
                const data = await response.json();
                
                if (response.ok) {
                    setRecommendations(data);
                } else {
                    setError(data.error || 'Error al cargar las recomendaciones');
                }
            } catch (err) {
                setError('Error al conectar con el servidor');
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                {error}
            </div>
        );
    }

    if (!recommendations?.data) {
        return null;
    }

    const renderRecommendations = (items: Recommendation[], title: string) => (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {items.map((item, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                            <div className="flex items-center mt-2">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                }`}>
                                    {item.priority === 'high' ? 'Alta' :
                                     item.priority === 'medium' ? 'Media' : 'Baja'} prioridad
                                </span>
                                <span className="ml-2 text-xs text-gray-500">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {renderRecommendations(recommendations.data.strategic_recommendations, 'Recomendaciones Estratégicas')}
            {renderRecommendations(recommendations.data.opportunities, 'Oportunidades Identificadas')}
            {renderRecommendations(recommendations.data.priority_actions, 'Acciones Prioritarias')}
            {renderRecommendations(recommendations.data.metrics, 'Métricas de Seguimiento')}
        </div>
    );
} 