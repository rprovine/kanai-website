-- Website conversion tables for kanai-website

-- Every estimator + quick quote submission
CREATE TABLE IF NOT EXISTS quote_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,             -- 'ai-estimator', 'quick-quote', 'contact-form'
  items JSONB,                       -- array of items with quantities
  volume_cuft DECIMAL(10,2),
  truck_fraction TEXT,
  nte_price DECIMAL(10,2),
  lead_captured BOOLEAN DEFAULT false,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  ghl_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_quote_logs_created ON quote_logs(created_at DESC);
CREATE INDEX idx_quote_logs_source ON quote_logs(source);

-- Labeled training samples for AI model fine-tuning
CREATE TABLE IF NOT EXISTS job_training_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_urls JSONB,                  -- array of GCS image URLs
  actual_weight_lbs DECIMAL(10,2),
  volume_fraction TEXT,
  item_categories JSONB,             -- array of detected item categories
  workiz_job_id TEXT,
  workiz_job_number TEXT,
  estimated_lbs DECIMAL(10,2),
  estimated_cuft DECIMAL(10,2),
  accuracy_pct DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_job_training_created ON job_training_data(created_at DESC);

-- Magic link auth sessions for customer portal
CREATE TABLE IF NOT EXISTS portal_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_phone TEXT,
  customer_email TEXT,
  verification_code TEXT,
  verified BOOLEAN DEFAULT false,
  workiz_customer_id TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_portal_sessions_phone ON portal_sessions(customer_phone);
CREATE INDEX idx_portal_sessions_expires ON portal_sessions(expires_at);

-- Dumpster availability cache synced from Docket
CREATE TABLE IF NOT EXISTS dumpster_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  size_yard INT NOT NULL,            -- 15, 20, 25, 30
  available_count INT DEFAULT 0,
  next_available_date DATE,
  last_synced_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(size_yard)
);

-- Online bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type TEXT NOT NULL,        -- 'junk-removal', 'dumpster-rental'
  booking_date DATE NOT NULL,
  time_slot TEXT NOT NULL,           -- 'morning', 'afternoon'
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  customer_address TEXT,
  notes TEXT,
  workiz_job_id TEXT,
  status TEXT DEFAULT 'pending',     -- pending, confirmed, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Enable RLS
ALTER TABLE quote_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dumpster_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (API routes use service role key)
CREATE POLICY "Service role access" ON quote_logs FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON job_training_data FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON portal_sessions FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON dumpster_availability FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON bookings FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow anon read for availability (public)
CREATE POLICY "Public read availability" ON dumpster_availability FOR SELECT TO anon USING (true);
