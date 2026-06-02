-- ============================================================
-- Retro Noah Admin Panel Migration
-- Run this in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/yumopzfpzlqejprwpcrp/sql/new
-- ============================================================

-- 1. Gallery Items table
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  alt TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'other',
  tall BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'gallery_items' AND policyname = 'Public can read gallery_items'
  ) THEN
    CREATE POLICY "Public can read gallery_items" ON gallery_items FOR SELECT USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'gallery_items' AND policyname = 'Service role can manage gallery_items'
  ) THEN
    CREATE POLICY "Service role can manage gallery_items" ON gallery_items USING (auth.role() = 'service_role');
  END IF;
END $$;

-- 2. Add columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS range_label TEXT;

-- 3. Site settings table (homepage images + other configurable values)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Public can read site_settings'
  ) THEN
    CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Service role can manage site_settings'
  ) THEN
    CREATE POLICY "Service role can manage site_settings" ON site_settings USING (auth.role() = 'service_role');
  END IF;
END $$;

INSERT INTO site_settings (key, value) VALUES
  ('hero_image',              'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-02.png'),
  ('range_harvest_image',     'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-09.png'),
  ('range_farmhouse_image',   'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-03.png'),
  ('range_industrial_image',  'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/dining-tables/dt-24.jpg'),
  ('cta_image',               'https://yumopzfpzlqejprwpcrp.supabase.co/storage/v1/object/public/product-images/rn/outdoor/out-02.jpg')
ON CONFLICT (key) DO NOTHING;
