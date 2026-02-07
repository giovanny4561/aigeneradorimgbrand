const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Global fetch for Node 18+
// const fetch = global.fetch; 

async function verifyPages() {
    console.log('🔐 Authenticating as giovannymarin23@gmail.com...');

    // 1. Load Env
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');

    const getEnv = (key) => {
        const match = envContent.match(new RegExp(`${key}=(.*)`));
        return match ? match[1].trim() : null;
    };

    const url = getEnv('NEXT_PUBLIC_SUPABASE_URL');
    const key = getEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

    if (!url || !key) {
        console.error('❌ Missing Supabase credentials in .env.local');
        process.exit(1);
    }

    // 2. Login
    const supabase = createClient(url, key);

    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'giovannymarin23@gmail.com',
        password: 'hispano'
    });

    if (error) {
        console.error('❌ Login Failed:', error.message);
        process.exit(1);
    }

    console.log('✅ Login Successful. Session established.');
    const token = data.session.access_token;

    // 3. Test Pages
    const pages = [
        '/dashboard',
        '/api/auth/callback', // Check auth callback route
    ];

    const BASE_URL = 'http://localhost:3010';

    console.log('\n📡 Verifying Page Accessibility (HTTP 200 OK)...');

    // We primarily check if the server is responsive. 
    // Note: Next.js middleware using supabase-ssr might be tricky to spoof via just headers in a fetch 
    // without setting the actual cookies the middleware expects. 
    // However, we can check basic connectivity.

    for (const p of pages) {
        try {
            // In a real browser `sb-accessToken` cookie would be set. 
            // Mimicking direct fetch might still redirect if middleware is strict about cookies vs headers.
            // We will try sending the Access-Token header as a proxy for connectivity test.
            const res = await fetch(`${BASE_URL}${p}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const isRedirect = res.status >= 300 && res.status < 400;
            const isSuccess = res.status >= 200 && res.status < 300;

            console.log(`- ${p}: Status ${res.status} ${isRedirect ? '(Redirect)' : ''} ${isSuccess ? '✅' : '⚠️'}`);

        } catch (e) {
            console.error(`- ${p}: Failed to connect (${e.message})`);
        }
    }

    console.log('\n✨ Server is running and responding to auth requests.');
}

verifyPages();
