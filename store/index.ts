'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  BrandConfig,
  Product,
  Campaign,
  Strategy,
  ContentPlanItem,
  Post,
  GeneratedImage,
  ChatMessage,
  UserProfile,
} from '@/types'

interface AppState {
  // User
  user: UserProfile | null
  setUser: (user: UserProfile | null) => void

  // Brand
  brandConfig: BrandConfig | null
  setBrandConfig: (config: BrandConfig) => void
  updateBrandConfig: (data: Partial<BrandConfig>) => void

  // Products
  products: Product[]
  setProducts: (products: Product[]) => void
  addProduct: (product: Product) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Campaign
  currentCampaign: Campaign | null
  setCampaign: (campaign: Campaign | null) => void

  // Strategies
  strategies: Strategy[]
  setStrategies: (strategies: Strategy[]) => void
  selectedStrategy: Strategy | null
  selectStrategy: (strategy: Strategy | null) => void

  // Content Plan
  contentPlan: ContentPlanItem[]
  setContentPlan: (plan: ContentPlanItem[]) => void
  updateContentPlanItem: (id: string, data: Partial<ContentPlanItem>) => void

  // Generated Images
  generatedImages: GeneratedImage[]
  setGeneratedImages: (images: GeneratedImage[]) => void
  updateGeneratedImage: (id: string, data: Partial<GeneratedImage>) => void

  // Posts / Calendar
  posts: Post[]
  setPosts: (posts: Post[]) => void
  addPost: (post: Post) => void
  updatePost: (id: string, data: Partial<Post>) => void
  deletePost: (id: string) => void

  // Chat
  chatMessages: ChatMessage[]
  setChatMessages: (messages: ChatMessage[]) => void
  addChatMessage: (message: ChatMessage) => void

  // Reset
  resetCampaign: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // User
      user: null,
      setUser: (user) => set({ user }),

      // Brand
      brandConfig: null,
      setBrandConfig: (config) => set({ brandConfig: config }),
      updateBrandConfig: (data) =>
        set((state) => ({
          brandConfig: state.brandConfig
            ? { ...state.brandConfig, ...data }
            : null,
        })),

      // Products
      products: [],
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      updateProduct: (id, data) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Campaign
      currentCampaign: null,
      setCampaign: (campaign) => set({ currentCampaign: campaign }),

      // Strategies
      strategies: [],
      setStrategies: (strategies) => set({ strategies }),
      selectedStrategy: null,
      selectStrategy: (strategy) => set({ selectedStrategy: strategy }),

      // Content Plan
      contentPlan: [],
      setContentPlan: (plan) => set({ contentPlan: plan }),
      updateContentPlanItem: (id, data) =>
        set((state) => ({
          contentPlan: state.contentPlan.map((item) =>
            item.id === id ? { ...item, ...data } : item
          ),
        })),

      // Generated Images
      generatedImages: [],
      setGeneratedImages: (images) => set({ generatedImages: images }),
      updateGeneratedImage: (id, data) =>
        set((state) => ({
          generatedImages: state.generatedImages.map((img) =>
            img.id === id ? { ...img, ...data } : img
          ),
        })),

      // Posts / Calendar
      posts: [],
      setPosts: (posts) => set({ posts }),
      addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
      updatePost: (id, data) =>
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== id),
        })),

      // Chat
      chatMessages: [],
      setChatMessages: (messages) => set({ chatMessages: messages }),
      addChatMessage: (message) =>
        set((state) => ({
          chatMessages: [...state.chatMessages, message],
        })),

      // Reset campaign flow
      resetCampaign: () =>
        set({
          currentCampaign: null,
          strategies: [],
          selectedStrategy: null,
          contentPlan: [],
          generatedImages: [],
          posts: [],
          chatMessages: [],
        }),
    }),
    {
      name: 'lilamkt-storage',
      partialize: (state) => ({
        brandConfig: state.brandConfig,
        products: state.products,
        currentCampaign: state.currentCampaign,
        strategies: state.strategies,
        selectedStrategy: state.selectedStrategy,
        contentPlan: state.contentPlan,
        posts: state.posts,
        user: state.user,
      }),
    }
  )
)
