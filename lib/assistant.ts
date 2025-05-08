import { supabase } from './supabase';

export interface Document {
  id: string;
  content: string;
  metadata?: Record<string, any>;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'action' | 'insight';
  priority: 'high' | 'medium' | 'low';
  metadata?: Record<string, any>;
}

export async function processDocument(document: Document): Promise<Recommendation[]> {
  try {
    // Aquí iría la lógica de procesamiento del documento
    // Por ahora, retornamos un array vacío
    return [];
  } catch (error) {
    console.error('Error processing document:', error);
    throw error;
  }
}

export async function getRecommendations(userId: string): Promise<Recommendation[]> {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
}

export async function saveRecommendation(recommendation: Omit<Recommendation, 'id'> & { user_id: string }): Promise<Recommendation> {
  try {
    const { data, error } = await supabase
      .from('recommendations')
      .insert([recommendation])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.error('Error saving recommendation:', error);
    throw error;
  }
} 