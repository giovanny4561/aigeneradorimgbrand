// using global fetch available in Node 18+

const BASE_URL = 'http://localhost:3010';

async function testFullFlow() {
    console.log('🚀 Starting End-to-End System Test...\n');

    // --- STEP 1: Analyze Brand ---
    console.log('1️⃣ Testing /api/ai/analyze-brand...');
    const brandPayload = {
        brandName: 'LilaMkt Test',
        website: 'https://example.com',
        manualUrl: '',
        logoUrl: ''
    };

    let brandData;
    try {
        const res = await fetch(`${BASE_URL}/api/ai/analyze-brand`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(brandPayload)
        });

        if (!res.ok) throw new Error(`Status ${res.status}: ${await res.text()}`);
        brandData = await res.json();
        console.log('✅ Brand Analysis Success:', brandData);
    } catch (e) {
        console.error('❌ Brand Analysis Failed:', e.message);
        process.exit(1);
    }

    // --- STEP 2: Generate Strategies ---
    console.log('\n2️⃣ Testing /api/ai/generate-strategies...');
    const strategiesPayload = {
        brandConfig: { name: 'LilaMkt Test', ...brandData },
        products: [{ name: 'AI Service', description: 'Automated marketing', price: 99 }],
        goal: 'Test Integration',
        duration: '1 week'
    };

    let strategiesData;
    try {
        const res = await fetch(`${BASE_URL}/api/ai/generate-strategies`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(strategiesPayload)
        });

        if (!res.ok) throw new Error(`Status ${res.status}: ${await res.text()}`);
        strategiesData = await res.json();
        console.log(`✅ Strategies Generated: ${strategiesData.strategies?.length || 0} strategies found.`);
    } catch (e) {
        console.error('❌ Strategy Generation Failed:', e.message);
        process.exit(1);
    }

    const selectedStrategy = strategiesData.strategies?.[0];
    if (!selectedStrategy) {
        console.error('❌ No strategies returned to proceed.');
        process.exit(1);
    }

    // --- STEP 3: Generate Content Plan ---
    console.log(`\n3️⃣ Testing /api/ai/generate-content-plan (using Strategy "${selectedStrategy.name}")...`);
    const planPayload = {
        strategy: selectedStrategy,
        brandConfig: { name: 'LilaMkt Test', ...brandData },
        products: strategiesPayload.products
    };

    let planData;
    try {
        const res = await fetch(`${BASE_URL}/api/ai/generate-content-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planPayload)
        });

        if (!res.ok) throw new Error(`Status ${res.status}: ${await res.text()}`);
        planData = await res.json();
        console.log(`✅ Content Plan Generated: ${planData.plan?.length || 0} items found.`);
    } catch (e) {
        console.error('❌ Content Plan Failed:', e.message);
        process.exit(1);
    }

    const selectedContent = planData.plan?.[0];
    if (!selectedContent) {
        console.error('❌ No content plan items returned to proceed.');
        process.exit(1);
    }

    // --- STEP 4: Refine Copy ---
    console.log(`\n4️⃣ Testing /api/ai/refine-copy (Refining item Day ${selectedContent.day})...`);
    const copyPayload = {
        contentPlanItem: selectedContent,
        platform: 'instagram',
        instruction: 'Make it more exciting',
        brandConfig: { name: 'LilaMkt Test' }
    };

    try {
        const res = await fetch(`${BASE_URL}/api/ai/refine-copy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copyPayload)
        });

        if (!res.ok) throw new Error(`Status ${res.status}: ${await res.text()}`);
        const copyData = await res.json();
        console.log('✅ Copy Refinement Success:', copyData);
    } catch (e) {
        console.error('❌ Copy Refinement Failed:', e.message);
        process.exit(1);
    }

    console.log('\n🎉 ALL SYSTEMS GO! Full logical flow verified.');
}

testFullFlow();
