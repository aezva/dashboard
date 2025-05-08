import { supabase } from './supabase';

export interface BusinessData {
  id: string;
  business_name: string;
  industry: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  status: 'active' | 'inactive';
  settings: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}

export async function fetchBusinessData(): Promise<BusinessData | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No user found');
    }

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw error;
    }

    return data as BusinessData;
  } catch (error) {
    console.error('Error fetching business data:', error);
    return null;
  }
}

export async function updateBusinessData(businessId: string, updates: Partial<BusinessData>): Promise<BusinessData | null> {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .update(updates)
      .eq('id', businessId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as BusinessData;
  } catch (error) {
    console.error('Error updating business data:', error);
    return null;
  }
} 