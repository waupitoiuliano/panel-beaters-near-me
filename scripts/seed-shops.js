#!/usr/bin/env node

/**
 * Seed Shops Script
 * Adds 50+ realistic Australian panel beater shops to Supabase
 *
 * Usage: node scripts/seed-shops.js
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
  console.error('Make sure .env.local is configured correctly');
  console.error('Expected file: ' + envFilePath);
  process.exit(1);
}

console.log('✅ Environment variables loaded');

const supabase = createClient(supabaseUrl, supabaseKey);

const shops = [
  // Victoria
  { name: 'SmashFix Geelong', address: '12 Malop St', suburb: 'Geelong', state: 'VIC', phone: '0431234567', email: 'geelong@smashfix.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.8, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'DentBusters Melbourne', address: '88 Flinders St', suburb: 'Melbourne', state: 'VIC', phone: '0390111222', email: 'melbourne@dentbusters.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.7, minPrice: 159, services: ['Dent Repair', 'Respray', 'Panel Replacement'], approved: true },
  { name: 'PanelPro Ballarat', address: '45 Sturt St', suburb: 'Ballarat', state: 'VIC', phone: '0353331234', email: 'ballarat@panelpro.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Insurance'], approved: true },
  { name: 'AutoSmash Bendigo', address: '123 High St', suburb: 'Bendigo', state: 'VIC', phone: '0354678901', email: 'bendigo@autosmash.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Respray', 'Welding'], approved: true },
  { name: 'FixIt Dandenong', address: '456 Lonsdale St', suburb: 'Dandenong', state: 'VIC', phone: '0397701234', email: 'dandenong@fixit.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.7, minPrice: 149, services: ['Dent Repair', 'Panel Replacement', 'Insurance'], approved: true },

  // New South Wales
  { name: 'PanelPro Sydney', address: '45 Pitt St', suburb: 'Sydney', state: 'NSW', phone: '0292888999', email: 'sydney@panelpro.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.8, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'CrashKings Newcastle', address: '200 Hunter St', suburb: 'Newcastle', state: 'NSW', phone: '0249111222', email: 'newcastle@crashkings.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'AutoBody Wollongong', address: '123 Crown St', suburb: 'Wollongong', state: 'NSW', phone: '0242555666', email: 'wollongong@autobody.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'SmashRepair Parramatta', address: '789 Church St', suburb: 'Parramatta', state: 'NSW', phone: '0296201234', email: 'parramatta@smashrepair.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.7, minPrice: 159, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'BodWork Central Coast', address: '456 Ocean View Dr', suburb: 'Gosford', state: 'NSW', phone: '0243333444', email: 'centralcoast@bodwork.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Panel Replacement'], approved: true },

  // Queensland
  { name: 'CrashKings Brisbane', address: '200 Queen St', suburb: 'Brisbane', state: 'QLD', phone: '0731555444', email: 'crashkings@outlook.com', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.8, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'DentFix Gold Coast', address: '123 Surfers Paradise Blvd', suburb: 'Surfers Paradise', state: 'QLD', phone: '0755551234', email: 'goldcoast@dentfix.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'AutoRepair Sunshine Coast', address: '789 Maroochydore Rd', suburb: 'Maroochydore', state: 'QLD', phone: '0754555666', email: 'sunshinecoast@autorepair.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'PanelWorks Toowoomba', address: '456 Main St', suburb: 'Toowoomba', state: 'QLD', phone: '0746666777', email: 'toowoomba@panelworks.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Insurance'], approved: true },
  { name: 'FixSmash Cairns', address: '123 Lake St', suburb: 'Cairns', state: 'QLD', phone: '0740777888', email: 'cairns@fixsmash.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.3, minPrice: 109, services: ['Dent Repair', 'Respray'], approved: true },

  // South Australia
  { name: 'AutoBody Adelaide', address: '200 North Tce', suburb: 'Adelaide', state: 'SA', phone: '0881111222', email: 'adelaide@autobody.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.7, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'SmashRepair Mount Gambier', address: '456 Main Rd', suburb: 'Mount Gambier', state: 'SA', phone: '0871555666', email: 'mountgambier@smashrepair.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.4, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'PanelPro Gawler', address: '789 Murray St', suburb: 'Gawler', state: 'SA', phone: '0881234567', email: 'gawler@panelpro.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.5, minPrice: 139, services: ['Dent Repair', 'Insurance'], approved: true },
  { name: 'CrashFix Port Adelaide', address: '123 Port Rd', suburb: 'Port Adelaide', state: 'SA', phone: '0882222333', email: 'portadelaide@crashfix.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.6, minPrice: 149, services: ['Dent Repair', 'Respray', 'Welding'], approved: true },
  { name: 'DentBusters Prospect', address: '456 Prospect Rd', suburb: 'Prospect', state: 'SA', phone: '0883333444', email: 'prospect@dentbusters.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Panel Replacement'], approved: true },

  // Western Australia
  { name: 'FixItFast Perth', address: '100 St Georges Tce', suburb: 'Perth', state: 'WA', phone: '0892333111', email: 'fixitfast@bigpond.com', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.8, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'AutoSmash Fremantle', address: '200 High St', suburb: 'Fremantle', state: 'WA', phone: '0894444555', email: 'fremantle@autosmash.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'PanelRepair Joondalup', address: '456 Grand Promenade', suburb: 'Joondalup', state: 'WA', phone: '0896666777', email: 'joondalup@panelrepair.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Panel Replacement', 'Insurance'], approved: true },
  { name: 'CrashBody Kwinana', address: '789 Kwinana Fwy', suburb: 'Kwinana', state: 'WA', phone: '0897777888', email: 'kwinana@crashbody.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'SmashFix Armadale', address: '123 Great Eastern Hwy', suburb: 'Armadale', state: 'WA', phone: '0895555666', email: 'armadale@smashfix.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Insurance'], approved: true },

  // Tasmania
  { name: 'AutoRepair Hobart', address: '200 Elizabeth St', suburb: 'Hobart', state: 'TAS', phone: '0362111222', email: 'hobart@autorepair.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Respray', 'Panel Replacement'], approved: true },
  { name: 'DentFix Launceston', address: '456 Charles St', suburb: 'Launceston', state: 'TAS', phone: '0363222333', email: 'launceston@dentfix.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Insurance'], approved: true },
  { name: 'PanelPro Glenorchy', address: '789 Main Rd', suburb: 'Glenorchy', state: 'TAS', phone: '0364333444', email: 'glenorchy@panelpro.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Respray'], approved: true },

  // Australian Capital Territory
  { name: 'CrashKings Canberra', address: '200 London Circuit', suburb: 'Canberra City', state: 'ACT', phone: '0261111222', email: 'canberra@crashkings.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.7, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'SmashRepair Belconnen', address: '456 Tower St', suburb: 'Belconnen', state: 'ACT', phone: '0262222333', email: 'belconnen@smashrepair.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },

  // Additional NSW locations for coverage
  { name: 'AutoSmash Lismore', address: '123 Keen St', suburb: 'Lismore', state: 'NSW', phone: '0266222333', email: 'lismore@autosmash.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.4, minPrice: 109, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'PanelFix Coffs Harbour', address: '456 Pacific Hwy', suburb: 'Coffs Harbour', state: 'NSW', phone: '0266533444', email: 'coffsharbour@panelfix.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Insurance'], approved: true },
  { name: 'DentRepair Armidale', address: '789 Beardy St', suburb: 'Armidale', state: 'NSW', phone: '0267772888', email: 'armidale@dentrepair.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.3, minPrice: 99, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'SmashFix Dubbo', address: '123 Church St', suburb: 'Dubbo', state: 'NSW', phone: '0268844555', email: 'dubbo@smashfix.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'FixBody Orange', address: '456 Lords Pl', suburb: 'Orange', state: 'NSW', phone: '0263622333', email: 'orange@fixbody.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },

  // Additional VIC locations
  { name: 'PanelSmash Frankston', address: '200 Cranbourne Rd', suburb: 'Frankston', state: 'VIC', phone: '0397701234', email: 'frankston@panelsmash.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.6, minPrice: 139, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },
  { name: 'AutoCrash Moorabbin', address: '456 Nephrite Rd', suburb: 'Moorabbin', state: 'VIC', phone: '0395551234', email: 'moorabbin@autocrash.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'SmashRepair Ringwood', address: '789 Mountain Hwy', suburb: 'Ringwood', state: 'VIC', phone: '0397701234', email: 'ringwood@smashrepair.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.7, minPrice: 149, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },

  // Additional QLD locations
  { name: 'FixSmash Ipswich', address: '200 Brisbane St', suburb: 'Ipswich', state: 'QLD', phone: '0733334444', email: 'ipswich@fixsmash.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'CrashRepair Rockhampton', address: '456 Bolsover St', suburb: 'Rockhampton', state: 'QLD', phone: '0749555666', email: 'rockhampton@crashrepair.com.au', photo: 'https://images.unsplash.com/photo-1465647521601-b0fcc4cf2237?w=400', rating: 4.3, minPrice: 109, services: ['Dent Repair', 'Panel Replacement'], approved: true },
  { name: 'DentSmash Townsville', address: '789 Flinders St', suburb: 'Townsville', state: 'QLD', phone: '0747776666', email: 'townsville@dentsmash.com.au', photo: 'https://images.unsplash.com/photo-1487958449943-2f6071e3dd41?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Respray', 'Insurance'], approved: true },

  // Additional SA locations
  { name: 'PanelFix Barossa', address: '200 Tanunda Rd', suburb: 'Nuriootpa', state: 'SA', phone: '0885551234', email: 'barossa@panelfix.com.au', photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', rating: 4.3, minPrice: 99, services: ['Dent Repair', 'Insurance'], approved: true },

  // Additional WA locations
  { name: 'SmashBody Mandurah', address: '456 Pinjarra Rd', suburb: 'Mandurah', state: 'WA', phone: '0953333444', email: 'mandurah@smashbody.com.au', photo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400', rating: 4.4, minPrice: 119, services: ['Dent Repair', 'Respray'], approved: true },
  { name: 'AutoRepair Rockingham', address: '789 Kent St', suburb: 'Rockingham', state: 'WA', phone: '0955551234', email: 'rockingham@autorepair.com.au', photo: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400', rating: 4.5, minPrice: 129, services: ['Dent Repair', 'Panel Replacement', 'Insurance'], approved: true },
];

async function seedShops() {
  try {
    console.log(`🚀 Starting to seed ${shops.length} shops...`);

    // Insert shops in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < shops.length; i += batchSize) {
      const batch = shops.slice(i, i + batchSize);
      const { error } = await supabase.from('shops').insert(batch);

      if (error) {
        console.error(`❌ Error inserting batch ${i / batchSize + 1}:`, error.message);
        process.exit(1);
      }

      console.log(`✅ Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(shops.length / batchSize)} (${batch.length} shops)`);
    }

    console.log(`\n✨ Success! ${shops.length} shops have been added to your database.`);
    console.log('\n📝 Next steps:');
    console.log('1. Go to http://localhost:3000 in your browser');
    console.log('2. Refresh the page (press F5)');
    console.log('3. You should now see all the shops!');
    console.log('\nIf you still don\'t see shops, make sure:');
    console.log('- npm run dev is still running');
    console.log('- Your .env.local file has the correct Supabase credentials');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

seedShops();
