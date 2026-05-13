-- Retro Noah Furniture - Supabase Schema

create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  range text not null default 'custom',
  description text,
  sizes text[] default '{}',
  price_from integer,
  price_to integer,
  image_url text,
  images text[] default '{}',
  featured boolean default false,
  created_at timestamptz default now()
);

-- Enable row-level security
alter table products enable row level security;

-- Public read access
create policy "Anyone can read products"
  on products for select
  using (true);

-- Insert sample products
insert into products (name, category, range, description, sizes, price_from, price_to, image_url, featured) values
(
  'Harvest Dining Table',
  'dining-table',
  'harvest',
  'A classic French Country dining table crafted from reclaimed Oregon pine. Features elegant turned legs and a natural oak wash finish that showcases the wood''s 70-100 year old character.',
  array['4-seater', '6-seater', '8-seater', '10-seater', '12-seater', '14-seater', '16-seater'],
  6000, 18000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  true
),
(
  'Farmhouse Oval Table',
  'dining-table',
  'farmhouse',
  'Organic and rustic in feel, this round oval table brings warmth and natural beauty to any dining space. Made from reclaimed Baltic fir with an aged walnut finish.',
  array['4-seater', '6-seater', '8-seater', '10-seater'],
  6000, 16000,
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
  true
),
(
  'Industrial Boardroom Table',
  'dining-table',
  'industrial',
  'Our proudest signature piece — a fluted oval boardroom table with aged walnut finish on the top and white slats all around. Steel frame base with reclaimed wood top.',
  array['6-seater', '8-seater', '10-seater', '12-seater', '14-seater', '16-seater'],
  10000, 18000,
  'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800&q=80',
  true
),
(
  'French Country Coffee Table',
  'coffee-table',
  'harvest',
  'A beautiful French Country coffee table crafted from reclaimed Oregon pine. Perfect for living rooms seeking warmth and character.',
  array['Small', 'Medium', 'Large'],
  3000, 8000,
  'https://images.unsplash.com/photo-1532372320978-9b4f0a1e3e1c?w=800&q=80',
  false
),
(
  'Industrial Side Table',
  'side-table',
  'industrial',
  'Steel frame with reclaimed wood top. Clean industrial lines that complement any interior.',
  array['Standard'],
  3500, 5000,
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  false
),
(
  'Farmhouse Dining Bench',
  'bench',
  'farmhouse',
  'A matching bench set for your farmhouse dining table. Built to the same dimensions and finish as your table for a seamless look.',
  array['1.2m', '1.5m', '1.8m', '2.0m'],
  3000, 5000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  false
),
(
  'Harvest Server / Sideboard',
  'server-sideboard',
  'harvest',
  'Store your finest tableware in this beautifully crafted sideboard. Pedestal base with natural French oak wash finish.',
  array['1.2m', '1.5m', '1.8m'],
  8000, 14000,
  'https://images.unsplash.com/photo-1538688423619-a81d3f23454b?w=800&q=80',
  false
),
(
  'Reclaimed Wood Desk',
  'desk',
  'farmhouse',
  'A solid reclaimed wood desk with clean lines and subtle character marks. Perfect for home offices seeking warmth.',
  array['1.2m', '1.4m', '1.6m'],
  5000, 9000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  false
),
(
  'Industrial Kitchen Island',
  'kitchen-island',
  'industrial',
  'Custom kitchen island combining reclaimed wood top with steel frame. Fully customisable to your kitchen dimensions.',
  array['Custom size'],
  8000, 16000,
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
  false
),
(
  'Farmhouse Floating Shelves',
  'shelving',
  'farmhouse',
  'Set of three reclaimed wood floating shelves. Each shelf has unique grain patterns that tell the wood''s story.',
  array['Set of 3', 'Set of 5'],
  2000, 4000,
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
  false
),
(
  'Harvest Outdoor Dining Table',
  'outdoor-table',
  'harvest',
  'A robust outdoor dining table sealed with our UV-resistant water-based sealant. Brings the farmhouse aesthetic to your outdoor entertaining space.',
  array['4-seater', '6-seater', '8-seater'],
  7000, 14000,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  true
),
(
  'Rattan Bathroom Vanity',
  'bathroom-vanity',
  'farmhouse',
  'A beautiful bathroom vanity combining reclaimed wood with rattan accents. Transform your bathroom into a spa-like retreat.',
  array['600mm', '800mm', '1000mm', '1200mm'],
  5000, 12000,
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80',
  true
);
