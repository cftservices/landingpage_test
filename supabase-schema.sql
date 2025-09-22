-- HVAC AI Transformer Database Schema
-- Voor gebruik in Supabase SQL Editor

-- Tabel voor leads van de contact form
CREATE TABLE IF NOT EXISTS hvac_leads (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Contact informatie
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,

    -- Bedrijfs informatie
    technicians_range TEXT NOT NULL,
    annual_revenue_range TEXT NOT NULL,
    biggest_challenge TEXT NOT NULL,

    -- Berekende waardes uit ROI calculator
    estimated_company_size INTEGER,
    estimated_annual_revenue BIGINT,
    calculated_savings INTEGER,
    callback_reduction_savings INTEGER,
    efficiency_savings INTEGER,
    energy_savings INTEGER,
    admin_savings INTEGER,

    -- Metadata
    language_preference TEXT DEFAULT 'nl',
    source TEXT DEFAULT 'landing_page',
    page_language TEXT DEFAULT 'nl',
    user_agent TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel voor ROI calculator sessies (analytics)
CREATE TABLE IF NOT EXISTS roi_calculator_sessions (
    id BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Sessie identificatie
    session_id TEXT UNIQUE NOT NULL,

    -- Calculator input
    company_size INTEGER NOT NULL,
    annual_revenue BIGINT NOT NULL,
    calculated_savings INTEGER NOT NULL,
    language_preference TEXT DEFAULT 'nl',

    -- Metadata
    ip_address INET,
    user_agent TEXT
);

-- Row Level Security (RLS) inschakelen voor veiligheid
ALTER TABLE hvac_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculator_sessions ENABLE ROW LEVEL SECURITY;

-- Policies om data in te voegen (alleen inserting toestaan)
CREATE POLICY "Enable insert for all users" ON hvac_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable insert for all users" ON roi_calculator_sessions FOR INSERT WITH CHECK (true);

-- Indexen voor betere performance
CREATE INDEX IF NOT EXISTS idx_hvac_leads_created_at ON hvac_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_hvac_leads_email ON hvac_leads(email);
CREATE INDEX IF NOT EXISTS idx_hvac_leads_source ON hvac_leads(source);
CREATE INDEX IF NOT EXISTS idx_roi_sessions_created_at ON roi_calculator_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_roi_sessions_session_id ON roi_calculator_sessions(session_id);

-- View voor lead analytics (optioneel)
CREATE OR REPLACE VIEW lead_analytics AS
SELECT
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as total_leads,
    COUNT(DISTINCT email) as unique_leads,
    source,
    language_preference,
    AVG(calculated_savings) as avg_calculated_savings,
    AVG(estimated_company_size) as avg_company_size
FROM hvac_leads
GROUP BY DATE_TRUNC('day', created_at), source, language_preference
ORDER BY date DESC;