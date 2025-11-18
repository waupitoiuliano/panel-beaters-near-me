import { Shop } from './types';
import { supabase } from './supabase';

export async function getShops(approvedOnly: boolean = true): Promise<Shop[]> {
  try {
    let query = supabase
      .from('shops')
      .select('*')
      .order('name');

    if (approvedOnly) {
      query = query.eq('approved', true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching shops:', error);
    return [];
  }
}

export async function getShop(id: string): Promise<Shop | null> {
  try {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;
    return data;
  } catch (error) {
    console.error('Error fetching shop:', error);
    return null;
  }
}

