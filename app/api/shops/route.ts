import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Shop } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const approvedOnly = searchParams.get('approved') !== 'false';

    let query = supabase
      .from('shops')
      .select('*')
      .order('name');

    if (approvedOnly) {
      query = query.eq('approved', true);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shop: Omit<Shop, 'id'> = {
      name: body.name,
      address: body.address,
      suburb: body.suburb,
      state: body.state,
      phone: body.phone,
      email: body.email,
      photo: body.photo || 'https://via.placeholder.com/400x300',
      rating: body.rating || 0,
      minPrice: body.minPrice || 0,
      services: body.services || [],
      approved: body.approved !== undefined ? body.approved : true,
    };

    const { data, error } = await supabase
      .from('shops')
      .insert(shop)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error creating shop:', error);
    return NextResponse.json(
      { error: 'Failed to create shop' },
      { status: 500 }
    );
  }
}

