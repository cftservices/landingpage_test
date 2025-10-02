// Vercel Serverless Function to provide Supabase configuration
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // Get Supabase config from environment variables
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

        // Check if config is available
        if (!supabaseUrl || !supabaseAnonKey) {
            return res.status(200).json({
                configured: false,
                supabaseUrl: null,
                supabaseAnonKey: null
            });
        }

        // Return config
        return res.status(200).json({
            configured: true,
            supabaseUrl: supabaseUrl,
            supabaseAnonKey: supabaseAnonKey
        });

    } catch (error) {
        console.error('Error in config function:', error);
        return res.status(500).json({
            error: 'Internal server error',
            configured: false
        });
    }
}
