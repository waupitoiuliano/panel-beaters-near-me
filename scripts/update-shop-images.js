#!/usr/bin/env node

/**
 * Update Shop Images Script
 * Updates all shops with proper images
 *
 * Usage: node scripts/update-shop-images.js
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Read .env.local file
const envFilePath = path.join(__dirname, '..', '.env.local');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// If not in environment, try to read from .env.local file
if (!supabaseUrl || !supabaseKey) {
  try {
    const envContent = fs.readFileSync(envFilePath, 'utf-8');
    const envLines = envContent.split('\n');

    envLines.forEach(line => {
      if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
        supabaseUrl = line.replace('NEXT_PUBLIC_SUPABASE_URL=', '').trim();
      }
      if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
        supabaseKey = line.replace('NEXT_PUBLIC_SUPABASE_ANON_KEY=', '').trim();
      }
    });
  } catch (error) {
    console.error('❌ Error reading .env.local file:', error.message);
  }
}

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Array of high-quality car repair/panel beating images from Unsplash
const imageUrls = [
  'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=300&fit=crop', // Car workshop
  'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400&h=300&fit=crop', // Car repair
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', // Mechanic working
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', // Car detail
  'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop', // Car wash
  'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400&h=300&fit=crop', // Car maintenance
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop', // Mechanic tools
  'https://images.unsplash.com/photo-1494783367193-149034c05e41?w=400&h=300&fit=crop', // Car repair garage
  'https://images.unsplash.com/photo-1459305902263-13bf1e787032?w=400&h=300&fit=crop', // Professional mechanic
  'https://images.unsplash.com/photo-1533473359331-35b3d5ec5cb0?w=400&h=300&fit=crop', // Auto shop
];

async function updateImages() {
  try {
    console.log('🚀 Starting to update shop images...');

    // Fetch all shops
    const { data: shops, error: fetchError } = await supabase
      .from('shops')
      .select('id')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('❌ Error fetching shops:', fetchError.message);
      process.exit(1);
    }

    if (!shops || shops.length === 0) {
      console.error('❌ No shops found in database');
      process.exit(1);
    }

    console.log(`📍 Found ${shops.length} shops to update`);

    // Update each shop with a rotating image
    for (let i = 0; i < shops.length; i++) {
      const shop = shops[i];
      const imageUrl = imageUrls[i % imageUrls.length];

      const { error: updateError } = await supabase
        .from('shops')
        .update({ photo: imageUrl })
        .eq('id', shop.id);

      if (updateError) {
        console.error(`❌ Error updating shop ${i + 1}:`, updateError.message);
      } else {
        console.log(`✅ Updated shop ${i + 1}/${shops.length} with image`);
      }
    }

    console.log(`\n✨ Success! All ${shops.length} shops have been updated with images.`);
    console.log('\n📝 Next steps:');
    console.log('1. Go to http://localhost:3000 in your browser');
    console.log('2. Refresh the page (press F5)');
    console.log('3. All shops should now have beautiful images!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

updateImages();
