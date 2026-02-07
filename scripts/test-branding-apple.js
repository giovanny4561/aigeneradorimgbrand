// using global fetch available in Node 18+

const BASE_URL = 'http://localhost:3010';

async function testAppleBranding() {
    console.log('🍎 Testing Branding Extraction for Apple (https://www.apple.com)...\n');

    const brandPayload = {
        brandName: 'Apple',
        website: 'https://www.apple.com',
        manualUrl: '',
        logoUrl: '' // Let it find the logo
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

        // Simple validation
        if (brandData.primaryColor && brandData.fontHeading) {
            console.log('\n✨ Validation: SUCCESS - Retrieved colors and fonts.');
        } else {
            console.log('\n⚠️ Validation: WARNING - Missing key branding elements.');
        }

    } catch (e) {
        console.error('❌ Extraction Failed:', e);
    }
}

testAppleBranding();
