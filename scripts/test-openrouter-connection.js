const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

// Manually read .env.local
try {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');

    // Extract API Key
    const matchKey = envContent.match(/OPENROUTER_API_KEY=(.*)/);
    if (!matchKey) {
        console.error('❌ OPENROUTER_API_KEY not found in .env.local');
        process.exit(1);
    }
    const apiKey = matchKey[1].trim();

    console.log('✅ Found API Key:', apiKey.substring(0, 8) + '...');

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        defaultHeaders: {
            'HTTP-Referer': 'https://lilamkt.com',
            'X-Title': 'LilaMkt Test Script',
        },
    });

    async function run() {
        console.log('🔄 Testing OpenRouter Connection (google/gemini-2.0-flash-001)...');
        try {
            const completion = await openai.chat.completions.create({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    { role: 'user', content: 'Say "Hello OpenRouter" in JSON format: {"message": "..."}' }
                ],
                response_format: { type: 'json_object' }
            });

            console.log('✅ OpenRouter Response Success:');
            console.log(completion.choices[0].message.content);
        } catch (e) {
            console.error('❌ OpenRouter Connection Failed:', e);
        }
    }

    run();

} catch (err) {
    console.error('❌ Error reading .env.local:', err.message);
}
