const DEFAULT_SITE_URL = "https://vtitov-portfolio.vercel.app"

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, "")
}

/**
 * Canonical site URL for metadata, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in Vercel when using a custom domain (e.g. https://www.vtitov.dev).
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalizeUrl(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  }

  if (process.env.VERCEL_URL) {
    return normalizeUrl(`https://${process.env.VERCEL_URL}`)
  }

  return DEFAULT_SITE_URL
}

export const siteUrl = getSiteUrl()
