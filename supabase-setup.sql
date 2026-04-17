-- Huken BRYGG — Database setup
-- Run this in Supabase SQL Editor

-- Bookings table
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  floor text NOT NULL CHECK (floor IN ('gastro', 'lounge', 'underground')),
  date date NOT NULL,
  time time NOT NULL,
  guests int NOT NULL CHECK (guests >= 1 AND guests <= 50),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  date date NOT NULL,
  time time,
  description text,
  image_url text,
  floor text NOT NULL DEFAULT 'underground' CHECK (floor IN ('gastro', 'lounge', 'underground')),
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Bookings: anyone can insert (public booking form)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Bookings: only service_role can read/update (admin API)
CREATE POLICY "Service role can manage bookings" ON bookings
  FOR ALL USING (auth.role() = 'service_role');

-- Events: anyone can read published events
CREATE POLICY "Anyone can read published events" ON events
  FOR SELECT USING (published = true);

-- Events: only service_role can manage events (admin)
CREATE POLICY "Service role can manage events" ON events
  FOR ALL USING (auth.role() = 'service_role');
