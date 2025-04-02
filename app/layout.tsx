import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CursorFollower } from "@/components/cursor-follower"
import { MenuProvider } from "@/context/menu-context"
import { ProjectsProvider } from "@/context/projects-context"

// Cargar CursorFollower dinámicamente solo en el cliente
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})
export const metadata: Metadata = {
  metadataBase: new URL('https://www.vtitov.dev'),
  title: "Vladislav Titov | Portfolio",
  description:
    "Portfolio of a creative developer and designer specializing in building engaging digital experiences with modern web technologies.",
  keywords: ["developer", "designer", "portfolio", "web development", "frontend", "UI/UX", "React", "Next.js"],
  authors: [{ name: "Vladislav" }],
  creator: "Vladislav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.vtitov.dev/",
    title: "Vladislav Titov | Developer",
    description:
      "Portfolio of a creative developer and designer specializing in building engaging digital experiences with modern web technologies.",
    siteName: "Vladislav Titov",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vladislav Titov Preview",
      },
    ],
  },
  icons: {
    icon: "/icon.ico",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script src="/theme-detector.js" strategy="beforeInteractive" />
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </head>
      <body className={`${inter.variable} font-sans antialiased max-w-[100vw] overflow-x-hidden`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MenuProvider>
            <ProjectsProvider>
              <CursorFollower />
              <Navbar />
              {children}
              <Footer />
              <Toaster />
            </ProjectsProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}