import { expect, test } from "@playwright/test"

test.describe("Website coverage", () => {
  test("projects page renders expected content", async ({ page }) => {
    await page.goto("/projects")

    await expect(page.getByRole("heading", { level: 1, name: /All Projects/i })).toBeVisible()
    await expect(page.getByText(/comprehensive showcase/i)).toBeVisible()
  })

  test("services page renders expected content", async ({ page }) => {
    await page.goto("/services")

    await expect(page.getByRole("heading", { level: 1, name: /Development Services/i })).toBeVisible()
    await expect(page.getByText(/Frontend development/i)).toBeVisible()
  })

  test("project detail page renders expected content", async ({ page }) => {
    await page.goto("/projects/luna-huapi")

    await expect(page.getByRole("heading", { level: 1, name: /Luna Huapi/i })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: /Project Links/i })).toBeVisible()
  })

  test("legacy portfolio routes redirect to projects", async ({ page }) => {
    await page.goto("/portfolio")
    await expect(page).toHaveURL(/\/projects$/)

    await page.goto("/portfolio/luna-huapi")
    await expect(page).toHaveURL(/\/projects\/luna-huapi$/)
  })
})
