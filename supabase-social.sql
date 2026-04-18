-- ════════════════════════════════════════════════════
-- Huken BRYGG — Social media integration tables
-- Run this in Supabase SQL Editor
-- ════════════════════════════════════════════════════

-- Instagram posts (synced from Meta Graph API)
CREATE TABLE IF NOT EXISTS instagram_posts (
  id TEXT PRIMARY KEY,                -- Instagram media ID
  caption TEXT,
  media_type TEXT,                    -- IMAGE, VIDEO, CAROUSEL_ALBUM
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,                 -- for VIDEO type
  permalink TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL,
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE instagram_posts ENABLE ROW LEVEL SECURITY;

-- Anyone can read (public website)
CREATE POLICY "Public read instagram_posts"
  ON instagram_posts FOR SELECT
  USING (true);

-- Only service role can insert/update/delete (API sync)
CREATE POLICY "Service role manages instagram_posts"
  ON instagram_posts FOR ALL
  USING (auth.role() = 'service_role');

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_instagram_posts_timestamp
  ON instagram_posts (timestamp DESC);

-- ════════════════════════════════════════════════════
-- Update events table to support Facebook sync
-- ════════════════════════════════════════════════════

-- Add facebook_event_id column if events table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'events') THEN
    -- Add facebook columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'facebook_event_id') THEN
      ALTER TABLE events ADD COLUMN facebook_event_id TEXT UNIQUE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'cover_url') THEN
      ALTER TABLE events ADD COLUMN cover_url TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'place') THEN
      ALTER TABLE events ADD COLUMN place TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'events' AND column_name = 'synced_at') THEN
      ALTER TABLE events ADD COLUMN synced_at TIMESTAMPTZ;
    END IF;
  ELSE
    -- Create events table from scratch
    CREATE TABLE events (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      start_time TIMESTAMPTZ NOT NULL,
      end_time TIMESTAMPTZ,
      cover_url TEXT,
      place TEXT,
      facebook_event_id TEXT UNIQUE,
      synced_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE events ENABLE ROW LEVEL SECURITY;

    CREATE POLICY "Public read events"
      ON events FOR SELECT
      USING (true);

    CREATE POLICY "Service role manages events"
      ON events FOR ALL
      USING (auth.role() = 'service_role');

    CREATE INDEX idx_events_start_time ON events (start_time ASC);
  END IF;
END $$;
