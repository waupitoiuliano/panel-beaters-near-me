# Database Schema Documentation

This document describes the Supabase database schema required for the Panel Beaters Directory application.

## Tables

### 1. `shops` Table

Stores information about panel beater shops in the directory.

#### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier for the shop |
| `name` | `text` | NOT NULL | Shop name (e.g., "SmashFix Geelong") |
| `address` | `text` | NOT NULL | Street address (e.g., "12 Malop St") |
| `suburb` | `text` | NOT NULL | Suburb name (e.g., "Geelong") |
| `state` | `text` | NOT NULL | State abbreviation (e.g., "VIC", "NSW") |
| `phone` | `text` | NOT NULL | Contact phone number |
| `email` | `text` | NOT NULL | Contact email address |
| `photo` | `text` | | URL to shop photo/image |
| `rating` | `numeric(3,1)` | DEFAULT 0 | Shop rating (0-5) |
| `minPrice` | `integer` | DEFAULT 0 | Minimum price in dollars |
| `services` | `text[]` | DEFAULT '{}' | Array of services offered |
| `createdAt` | `timestamp` | DEFAULT `now()` | When the shop was added |
| `updatedAt` | `timestamp` | DEFAULT `now()` | When the shop was last updated |

#### SQL to Create Table

```sql
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  suburb TEXT NOT NULL,
  state TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  photo TEXT,
  rating NUMERIC(3,1) DEFAULT 0,
  "minPrice" INTEGER DEFAULT 0,
  services TEXT[] DEFAULT '{}',
  "createdAt" TIMESTAMP DEFAULT now(),
  "updatedAt" TIMESTAMP DEFAULT now(),
  approved BOOLEAN DEFAULT true
);

-- Create index for faster searches
CREATE INDEX idx_shops_suburb ON shops(suburb);
CREATE INDEX idx_shops_state ON shops(state);
CREATE INDEX idx_shops_name ON shops(name);
```

### 2. `quotes` Table

Stores quote requests submitted through the website.

#### Columns

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | `uuid` | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier for the quote |
| `shopId` | `uuid` | NOT NULL, FOREIGN KEY → `shops.id` | Reference to the shop |
| `name` | `text` | NOT NULL | Customer name |
| `email` | `text` | NOT NULL | Customer email |
| `phone` | `text` | NOT NULL | Customer phone number |
| `vehicleInfo` | `text` | NOT NULL | Vehicle information (e.g., "2020 Toyota Corolla") |
| `serviceNeeded` | `text` | NOT NULL | Service requested (e.g., "Dent Repair") |
| `message` | `text` | | Optional message from customer |
| `createdAt` | `timestamp` | DEFAULT `now()` | When the quote was submitted |

#### SQL to Create Table

```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "shopId" UUID NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  "vehicleInfo" TEXT NOT NULL,
  "serviceNeeded" TEXT NOT NULL,
  message TEXT,
  "createdAt" TIMESTAMP DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_quotes_shop_id ON quotes("shopId");
CREATE INDEX idx_quotes_created_at ON quotes("createdAt");
```

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key from Settings → API

### 2. Run SQL in Supabase SQL Editor

1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Run the SQL commands above to create both tables

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Seed Initial Data (Optional)

You can insert the 5 sample shops from `lib/data.ts`:

```sql
INSERT INTO shops (name, address, suburb, state, phone, email, photo, rating, "minPrice", services)
VALUES
  ('SmashFix Geelong', '12 Malop St', 'Geelong', 'VIC', '0431 234 567', 'smashfix@gmail.com', 'https://i.imgur.com/8jWqR2k.jpg', 4.8, 149, ARRAY['Dent Repair', 'Respray', 'Insurance']),
  ('DentBusters Melbourne', '88 Flinders St', 'Melbourne', 'VIC', '0390 111 222', 'info@dentbusters.com.au', 'https://i.imgur.com/K3dL9pM.jpg', 4.8, 149, ARRAY['Dent Repair', 'Respray', 'Insurance']),
  ('PanelPro Sydney', '45 Pitt St', 'Sydney', 'NSW', '0292 888 999', 'hello@panelpro.au', 'https://i.imgur.com/7xYvF5g.jpg', 4.8, 149, ARRAY['Dent Repair', 'Respray', 'Insurance']),
  ('CrashKings Brisbane', '200 Queen St', 'Brisbane', 'QLD', '0731 555 444', 'crashkings@outlook.com', 'https://i.imgur.com/Z2mPqR1.jpg', 4.8, 149, ARRAY['Dent Repair', 'Respray', 'Insurance']),
  ('FixItFast Perth', '100 St Georges Tce', 'Perth', 'WA', '0892 333 111', 'fixitfast@bigpond.com', 'https://i.imgur.com/9vN2kLm.jpg', 4.8, 149, ARRAY['Dent Repair', 'Respray', 'Insurance']);
```

## Row Level Security (RLS)

For production, you should enable Row Level Security:

```sql
-- Enable RLS on shops table
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can view shops" ON shops
  FOR SELECT USING (true);

-- Enable RLS on quotes table
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Allow public to insert quotes
CREATE POLICY "Public can create quotes" ON quotes
  FOR INSERT WITH CHECK (true);

-- Allow public to read their own quotes (optional)
CREATE POLICY "Public can view quotes" ON quotes
  FOR SELECT USING (true);
```

## Additional Setup

### Storage Bucket

1. Go to Supabase Dashboard → Storage
2. Create a new bucket named `shop-images`
3. Set it to **Public** (or configure RLS policies)

### Authentication

1. Go to Supabase Dashboard → Authentication
2. Enable Email/Password authentication
3. Create an admin user:
   - Go to Authentication → Users
   - Click "Add user"
   - Enter email and password
   - Set email as verified

## Row Level Security (RLS)

### Shops Table

```sql
-- Allow public to view approved shops only
CREATE POLICY "Public can view approved shops" ON shops
  FOR SELECT USING (approved = true);

-- Allow authenticated users to view all shops
CREATE POLICY "Admins can view all shops" ON shops
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow public to create shops (for registration)
CREATE POLICY "Public can create shops" ON shops
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update shops
CREATE POLICY "Admins can update shops" ON shops
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete shops
CREATE POLICY "Admins can delete shops" ON shops
  FOR DELETE USING (auth.role() = 'authenticated');
```

### Storage Bucket

```sql
-- Allow public to read images
CREATE POLICY "Public can read shop images" ON storage.objects
  FOR SELECT USING (bucket_id = 'shop-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated can upload shop images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'shop-images' AND
    auth.role() = 'authenticated'
  );
```

## Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Email notifications (Resend - optional)
RESEND_API_KEY=your_resend_api_key
NOTIFICATION_EMAIL=noreply@yourdomain.com

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Notes

- The `services` column uses PostgreSQL's array type for flexibility
- Timestamps are automatically managed by PostgreSQL
- Foreign key relationship ensures data integrity between shops and quotes
- Indexes improve query performance for common searches
- The `approved` field controls shop visibility on the public directory

