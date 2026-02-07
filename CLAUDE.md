# LilaMKT - AI Marketing Platform

Proyecto de plataforma de marketing impulsada por IA (OpenRouter + Firecrawl) para generación de estrategias, planes de contenido y análisis de marca.

## 🛠 Stack Tecnológico

- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Lucide React (Iconos).
- **Backend**: Next.js API Routes.
- **Base de Datos**: Supabase (PostgreSQL).
- **Estado Global**: Zustand (con persistencia).
- **IA**: 
  - **OpenRouter**: Acceso a modelos como `google/gemini-2.0-flash-001`.
  - **Firecrawl**: Scraping avanzado de sitios web para branding.
  - **OpenAI SDK**: Cliente unificado para conectar con OpenRouter.

## 📂 Estructura del Proyecto

```
/app
  /(auth)       # Rutas de autenticación (login, register)
  /(dashboard)  # Rutas protegidas (branding, strategy, calendar...)
  /api          # Endpoints de Backend (Next.js API Routes)
    /ai         # Endpoints de IA (analyze-brand, generate-strategies...)
/components     # Componentes UI reutilizables
/lib            # Utilidades (supabase client, db, openrouter helper)
/store          # Estado global (Zustand)
/types          # Definiciones de TypeScript
```

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Instalar dependencias
npm install

# Construir para producción
npm run build
```

## 🔑 Variables de Entorno (.env.local)

Requiere las siguientes claves:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# AI Services
OPENROUTER_API_KEY=...
FIRECRAWL_API_KEY=...

# Optional OpenRouter Metadata
OPENROUTER_SITE_URL=https://lilamkt.com
OPENROUTER_SITE_NAME=LilaMkt
```

## 🔄 Flujo de Datos

1.  **Branding**: Usuario sube logo/web -> Firecrawl extrae datos -> `useAppStore` persiste -> Supabase guarda.
2.  **Estrategia**: BrandConfig + Objetivos -> OpenRouter genera estrategias -> Usuario selecciona.
3.  **Contenido**: Estrategia -> OpenRouter planifica posts -> Usuario refina.

## 📝 Convenciones

- Usar `useAppStore` para todo estado compartido.
- Componentes en `components/` deben ser "tontos" (UI pura) o recibir props.
- Páginas en `app/` manejan la lógica y conexión con Store.
- Todas las llamadas a IA van a través de `/api/ai/*` para no exponer Keys.
