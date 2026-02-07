// Client-side AI API wrapper functions
type AnalyzeBrandData = {
    brandName: string
    website: string
    logoUrl?: string
    manualUrl?: string
}

type BrandAnalysisResult = {
    primaryColor: string
    secondaryColor: string
    fontHeading: string
    fontBody: string
    toneOfVoice: string
}

export async function analyzeBrand(data: AnalyzeBrandData): Promise<BrandAnalysisResult> {
    const response = await fetch('/api/ai/analyze-brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to analyze brand')
    }

    return await response.json()
}

type GenerateStrategiesData = {
    brandConfig: any
    products: any[]
    goal: string
    duration: string
}

export async function generateStrategies(data: GenerateStrategiesData) {
    const response = await fetch('/api/ai/generate-strategies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to generate strategies')
    }

    return await response.json()
}

type GenerateContentPlanData = {
    strategy: any
    brandConfig: any
    products: any[]
    duration: string
}

export async function generateContentPlan(data: GenerateContentPlanData) {
    const response = await fetch('/api/ai/generate-content-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to generate content plan')
    }

    return await response.json()
}

type RefineCopyData = {
    contentItem: any
    platform: string
    instruction: string
    currentCopy?: string
}

export async function refineCopy(data: RefineCopyData) {
    const response = await fetch('/api/ai/refine-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to refine copy')
    }

    return await response.json()
}

type GenerateImageData = {
    prompt: string
    brandColors: { primary: string; secondary: string }
    productUrl?: string
}

export async function generateImage(data: GenerateImageData) {
    const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to generate image')
    }

    return await response.json()
}

type ChatMessageData = {
    message: string
    history: Array<{ role: string; content: string }>
    context: {
        brandConfig?: any
        products?: any[]
    }
}

export async function chatMessage(data: ChatMessageData) {
    const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to send message')
    }

    return await response.json()
}

type AnalyzeCampaignData = {
    campaign: any
    contentPlan: any[]
    posts: any[]
}

export async function analyzeCampaign(data: AnalyzeCampaignData) {
    const response = await fetch('/api/ai/analyze-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to analyze campaign')
    }

    return await response.json()
}
