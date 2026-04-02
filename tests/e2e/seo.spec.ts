import { expect, test } from "@playwright/test"

test.describe("SEO baseline", () => {
  test("site metadata is present and valid", async ({ page }) => {
    await page.goto("/projects")

    await expect(page).toHaveTitle(/Vladislav Titov/i)

    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveCount(1)
    await expect(metaDescription).toHaveAttribute("content", /Portfolio/i)

    const canonical = page.locator('link[rel="canonical"]')
    await expect(canonical).toHaveCount(1)

    const openGraphTitle = page.locator('meta[property="og:title"]')
    await expect(openGraphTitle).toHaveAttribute("content", /Vladislav Titov/i)

    const twitterCard = page.locator('meta[name="twitter:card"]')
    await expect(twitterCard).toHaveAttribute("content", "summary_large_image")
  })

  test("robots and sitemap endpoints are reachable", async ({ request }) => {
    const robotsResponse = await request.get("/robots.txt")
    expect(robotsResponse.ok()).toBeTruthy()
    await expect(robotsResponse.text()).resolves.toContain("Sitemap:")

    const sitemapResponse = await request.get("/sitemap.xml")
    expect(sitemapResponse.ok()).toBeTruthy()
    await expect(sitemapResponse.text()).resolves.toContain("<urlset")
  })
})
