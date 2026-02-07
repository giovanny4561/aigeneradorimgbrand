'use server'

import { createClient } from './supabase/server'
import type {
    BrandConfig,
    Product,
    Campaign,
    Strategy,
    ContentPlanItem,
    Post,
} from '@/types'

// Brand operations
export async function saveBrand(userId: string, brandData: Partial<BrandConfig>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('brands')
        .upsert({
            user_id: userId,
            name: brandData.name,
            website: brandData.website,
            primary_color: brandData.primaryColor,
            secondary_color: brandData.secondaryColor,
            font_heading: brandData.fontHeading,
            font_body: brandData.fontBody,
            logo_url: brandData.logo,
            manual_url: brandData.manualUrl,
            social_media: brandData.socialMedia,
            tone_of_voice: brandData.toneOfVoice,
        })
        .select()
        .single()

    if (error) throw new Error(`Error saving brand: ${error.message}`)
    return data
}

export async function getBrand(userId: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('user_id', userId)
        .single()

    if (error && error.code !== 'PGRST116') {
        throw new Error(`Error fetching brand: ${error.message}`)
    }

    if (!data) return null

    // Transform database fields to BrandConfig format
    return {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        website: data.website,
        primaryColor: data.primary_color,
        secondaryColor: data.secondary_color,
        fontHeading: data.font_heading,
        fontBody: data.font_body,
        logo: data.logo_url,
        manualUrl: data.manual_url,
        socialMedia: data.social_media,
        toneOfVoice: data.tone_of_voice,
    } as BrandConfig
}

// Product operations
export async function saveProduct(brandId: string, product: Partial<Product>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('products')
        .upsert({
            id: product.id,
            brand_id: brandId,
            name: product.name,
            description: product.description,
            price: product.price,
            sku: product.sku,
            image_url: product.image,
            image_nobg_url: product.imageNoBg,
            visual_references: product.visualReferences,
            status: product.status,
            tags: product.tags,
        })
        .select()
        .single()

    if (error) throw new Error(`Error saving product: ${error.message}`)
    return transformProduct(data)
}

export async function getProducts(brandId: string): Promise<Product[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('brand_id', brandId)
        .order('created_at', { ascending: false })

    if (error) throw new Error(`Error fetching products: ${error.message}`)
    return data.map(transformProduct)
}

export async function deleteProduct(productId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)

    if (error) throw new Error(`Error deleting product: ${error.message}`)
}

function transformProduct(data: any): Product {
    return {
        id: data.id,
        brandId: data.brand_id,
        name: data.name,
        description: data.description,
        price: data.price,
        sku: data.sku,
        image: data.image_url,
        imageNoBg: data.image_nobg_url,
        visualReferences: data.visual_references || [],
        status: data.status,
        tags: data.tags || [],
    }
}

// Campaign operations
export async function saveCampaign(brandId: string, campaign: Partial<Campaign>) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('campaigns')
        .upsert({
            id: campaign.id,
            brand_id: brandId,
            goal: campaign.goal,
            duration: campaign.duration,
            status: campaign.status || 'draft',
        })
        .select()
        .single()

    if (error) throw new Error(`Error saving campaign: ${error.message}`)
    return data
}

export async function getCampaign(campaignId: string): Promise<Campaign | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single()

    if (error && error.code !== 'PGRST116') {
        throw new Error(`Error fetching campaign: ${error.message}`)
    }

    return data
}

// Strategy operations
export async function saveStrategies(campaignId: string, strategies: Strategy[]) {
    const supabase = await createClient()

    const strategiesToSave = strategies.map(s => ({
        id: s.id,
        campaign_id: campaignId,
        name: s.name,
        type: s.type,
        reach: s.reach,
        probability: s.probability,
        tags: s.tags,
        description: s.description,
        is_selected: s.isSelected,
    }))

    const { data, error } = await supabase
        .from('strategies')
        .upsert(strategiesToSave)
        .select()

    if (error) throw new Error(`Error saving strategies: ${error.message}`)
    return data
}

export async function getStrategies(campaignId: string): Promise<Strategy[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('strategies')
        .select('*')
        .eq('campaign_id', campaignId)

    if (error) throw new Error(`Error fetching strategies: ${error.message}`)

    return data.map(s => ({
        id: s.id,
        campaignId: s.campaign_id,
        name: s.name,
        type: s.type,
        reach: s.reach,
        probability: s.probability,
        tags: s.tags,
        description: s.description,
        isSelected: s.is_selected,
    }))
}

// Content Plan operations
export async function saveContentPlan(strategyId: string, items: ContentPlanItem[]) {
    const supabase = await createClient()

    const itemsToSave = items.map(item => ({
        id: item.id,
        strategy_id: strategyId,
        day: item.day,
        platform: item.platform,
        format: item.format,
        intention: item.intention,
        visual_description: item.visualDescription,
        copy_preview: item.copyPreview,
        copies: item.copies,
        status: item.status || 'draft',
    }))

    const { data, error } = await supabase
        .from('content_plan_items')
        .upsert(itemsToSave)
        .select()

    if (error) throw new Error(`Error saving content plan: ${error.message}`)
    return data
}

export async function getContentPlan(strategyId: string): Promise<ContentPlanItem[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('content_plan_items')
        .select('*')
        .eq('strategy_id', strategyId)
        .order('day', { ascending: true })

    if (error) throw new Error(`Error fetching content plan: ${error.message}`)

    return data.map(item => ({
        id: item.id,
        strategyId: item.strategy_id,
        day: item.day,
        platform: item.platform,
        format: item.format,
        intention: item.intention,
        visualDescription: item.visual_description,
        copyPreview: item.copy_preview,
        copies: item.copies,
        status: item.status,
    }))
}

// Posts operations
export async function savePosts(posts: Post[]) {
    const supabase = await createClient()

    const postsToSave = posts.map(post => ({
        id: post.id,
        content_plan_item_id: post.contentPlanItemId,
        brand_id: post.brandId,
        title: post.title,
        image_url: post.image,
        scheduled_date: new Date(post.date).toISOString().split('T')[0],
        scheduled_time: post.time,
        type: post.type,
        platform: post.platform,
        status: post.status || 'draft',
    }))

    const { data, error } = await supabase
        .from('posts')
        .upsert(postsToSave)
        .select()

    if (error) throw new Error(`Error saving posts: ${error.message}`)
    return data
}

export async function getPosts(brandId: string): Promise<Post[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('brand_id', brandId)
        .order('scheduled_date', { ascending: true })

    if (error) throw new Error(`Error fetching posts: ${error.message}`)

    return data.map(post => ({
        id: post.id,
        contentPlanItemId: post.content_plan_item_id,
        brandId: post.brand_id,
        title: post.title,
        image: post.image_url,
        date: new Date(post.scheduled_date).getTime(),
        time: post.scheduled_time,
        type: post.type,
        platform: post.platform,
        status: post.status,
    }))
}

export async function deletePost(postId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

    if (error) throw new Error(`Error deleting post: ${error.message}`)
}
