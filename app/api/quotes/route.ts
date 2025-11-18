import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Quote } from '@/lib/types';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to read quotes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const quote: Omit<Quote, 'id'> = {
      shopId: body.shopId,
      name: body.name,
      email: body.email,
      phone: body.phone,
      vehicleInfo: body.vehicleInfo,
      serviceNeeded: body.serviceNeeded,
      message: body.message,
      createdAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('quotes')
      .insert(quote)
      .select()
      .single();

    if (error) throw error;

    if (data) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/quotes/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quoteId: data.id, shopId: body.shopId }),
        });
      } catch (notifyError) {
        console.error('Failed to send notification:', notifyError);
      }
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error saving quote:', error);
    return NextResponse.json(
      { error: 'Failed to save quote' },
      { status: 500 }
    );
  }
}
