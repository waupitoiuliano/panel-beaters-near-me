import type { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Fetch all approved shops for the sitemap
  const { data: shops } = await supabase
    .from('shops')
    .select('id, updatedAt')
    .eq('approved', true);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: 'https://panelbeatersnearme.com.au',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://panelbeatersnearme.com.au/register',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic shop pages
  const shopPages: MetadataRoute.Sitemap = (shops || []).map((shop: any) => ({
    url: `https://panelbeatersnearme.com.au/shop/${shop.id}`,
    lastModified: new Date(shop.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...shopPages];
}
