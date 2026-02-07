import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'LilaMKT - AI Marketing Platform',
    template: '%s | LilaMKT'
  },
  description: 'Plataforma de marketing impulsada por IA para generación de estrategia, contenido y análisis. Optimiza tu presencia digital con LilaMKT.',
  keywords: ['marketing', 'IA', 'estrategia digital', 'generación de contenido', 'redes sociales', 'analytics'],
  authors: [{ name: 'LilaMKT Team' }],
  creator: 'LilaMKT',
  publisher: 'LilaMKT',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://lilamkt.com',
    title: 'LilaMKT - AI Marketing Platform',
    description: 'Genera estrategias y contenido de marketing profesional en segundos con IA.',
    siteName: 'LilaMKT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LilaMKT - AI Marketing Platform',
    description: 'Genera estrategias y contenido de marketing profesional en segundos con IA.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased h-screen overflow-hidden selection:bg-primary selection:text-white`}>
        {children}
      </body>
    </html>
  )
}
