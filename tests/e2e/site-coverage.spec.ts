import { expect, test } from "@playwright/test"

test.describe("Website coverage", () => {
  test("projects page renders expected content", async ({ page }) => {
    await page.goto("/projects")

    await expect(page.getByRole("heading", { level: 1, name: /All Projects/i })).toBeVisible()
    await expect(page.getByText(/comprehensive showcase/i)).toBeVisible()
  })

  test("portfolio page renders expected content", async ({ page }) => {
    await page.goto("/portfolio")

    await expect(page.getByRole("heading", { level: 1, name: /My Portfolio/i })).toBeVisible()
    await expect(page.getByText(/curated selection/i)).toBeVisible()
  })

  test("services page renders expected content", async ({ page }) => {
    await page.goto("/services")

    await expect(page.getByRole("heading", { level: 1, name: /Our Services/i })).toBeVisible()
    await expect(page.getByText(/comprehensive suite of design services/i)).toBeVisible()
  })

  test("portfolio dynamic detail page renders expected content", async ({ page }) => {
    await page.goto("/portfolio/luminance-residence")

    await expect(page.getByRole("heading", { level: 1, name: /Luminance Residence/i })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: /Project Details/i })).toBeVisible()
  })
})
