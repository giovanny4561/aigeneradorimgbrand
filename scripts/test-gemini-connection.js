const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Manually read .env.local to avoid needing dotenv package if not installed
try {
    const envPath = path.join(__dirname, '..', '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);

    if (!match) {
        console.error('❌ GEMINI_API_KEY not found in .env.local');
        process.exit(1);
    }

    const apiKey = match[1].trim();
    console.log('✅ Found API Key:', apiKey.substring(0, 8) + '...');

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

    async function run() {
        console.log('🔄 Testing Gemini Connection...');
        try {
            const result = await model.generateContent('Explain what is marketing in 1 sentence.');
            const response = await result.response;
            const text = response.text();
            console.log('✅ Gemini Response Success:', text);
        } catch (e) {
            console.error('❌ Gemini Connection Failed:', e);
            if (e.response) {
                console.error('Response details:', await e.response.text());
            }
        }
    }

    run();

} catch (err) {
    console.error('❌ Error reading .env.local:', err.message);
}
