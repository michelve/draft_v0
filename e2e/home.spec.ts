import { expect, test } from "@playwright/test";

test("homepage loads with heading", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
});
