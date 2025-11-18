import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quoteId, shopId } = body;

    const { data: quote } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quoteId)
      .single();

    const { data: shop } = await supabase
      .from('shops')
      .select('*')
      .eq('id', shopId)
      .single();

    if (!quote || !shop) {
      return NextResponse.json(
        { error: 'Quote or shop not found' },
        { status: 404 }
      );
    }

    // Email notification is optional - if not configured, just return success
    if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL) {
      console.log('Email not configured, skipping notification');
      return NextResponse.json({ success: true, message: 'Quote created (email not configured)' });
    }

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      const emailSubject = `New Quote Request for ${shop.name}`;
      const emailBody = `
        <h2>New Quote Request</h2>
        <p><strong>Customer Name:</strong> ${quote.name}</p>
        <p><strong>Email:</strong> ${quote.email}</p>
        <p><strong>Phone:</strong> ${quote.phone}</p>
        <p><strong>Vehicle:</strong> ${quote.vehicleInfo}</p>
        <p><strong>Service:</strong> ${quote.serviceNeeded}</p>
        ${quote.message ? `<p><strong>Message:</strong> ${quote.message}</p>` : ''}
        <p><strong>Submitted:</strong> ${new Date(quote.createdAt).toLocaleString()}</p>
      `;

      await resend.emails.send({
        from: process.env.NOTIFICATION_EMAIL!,
        to: shop.email,
        subject: emailSubject,
        html: emailBody,
      });
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Don't fail the quote creation if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing notification:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}

