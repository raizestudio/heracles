import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Heracles/);
});

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "Faire une simulation" }).click();
  await expect(page).toHaveTitle(/Heracles | Simulation/);
});
