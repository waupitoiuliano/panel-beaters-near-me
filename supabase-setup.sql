-- Create shops table
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

-- Create indexes for shops table
CREATE INDEX idx_shops_suburb ON shops(suburb);
CREATE INDEX idx_shops_state ON shops(state);
CREATE INDEX idx_shops_name ON shops(name);

-- Create quotes table
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

-- Create indexes for quotes table
CREATE INDEX idx_quotes_shop_id ON quotes("shopId");
CREATE INDEX idx_quotes_created_at ON quotes("createdAt");

-- Enable Row Level Security
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for shops table
CREATE POLICY "Public can view approved shops" ON shops
  FOR SELECT USING (approved = true);

CREATE POLICY "Admins can view all shops" ON shops
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Public can create shops" ON shops
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can update shops" ON shops
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete shops" ON shops
  FOR DELETE USING (auth.role() = 'authenticated');

-- RLS Policies for quotes table
CREATE POLICY "Public can create quotes" ON quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view quotes" ON quotes
  FOR SELECT USING (true);



