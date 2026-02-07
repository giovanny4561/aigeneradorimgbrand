import OpenAI from 'openai'

const globalForOpenAI = global as unknown as { openai: OpenAI }

export const getOpenAIClient = () => {
    if (globalForOpenAI.openai) return globalForOpenAI.openai

    const apiKey = process.env.OPENROUTER_API_KEY
    const siteUrl = process.env.OPENROUTER_SITE_URL || 'https://lilamkt.com'
    const siteName = process.env.OPENROUTER_SITE_NAME || 'LilaMkt'

    if (!apiKey) {
        console.error('Missing OPENROUTER_API_KEY')
        throw new Error('Missing OPENROUTER_API_KEY')
    }

    const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey,
        defaultHeaders: {
            'HTTP-Referer': siteUrl, // Optional, for including your app on openrouter.ai rankings.
            'X-Title': siteName, // Optional. Shows in rankings on openrouter.ai.
        },
    })

    // Singleton pattern for dev environment to avoid multiple instances
    if (process.env.NODE_ENV !== 'production') {
        globalForOpenAI.openai = openai
    }

    return openai
}
