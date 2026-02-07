// using global fetch available in Node 18+

const BASE_URL = 'http://localhost:3010';

async function testBrunchBranding() {
    console.log('🥞 Testing Branding Extraction for The Brunch Delivery (https://thebrunchdelivery.com)...\n');

    const brandPayload = {
        brandName: 'Brunch Delivery',
        website: 'https://thebrunchdelivery.com',
        manualUrl: '',
        logoUrl: ''
    };

    try {
        const res = await fetch(`${BASE_URL}/api/ai/analyze-brand`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(brandPayload)
        });

        if (!res.ok) {
            throw new Error(`Status ${res.status}: ${await res.text()}`);
        }

        const brandData = await res.json();
        console.log('✅ Extraction Result:');
        console.log(JSON.stringify(brandData, null, 2));

    } catch (e) {
        console.error('❌ Extraction Failed:', e);
    }
}

testBrunchBranding();
