import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await expect(page.getByRole('link', { name: 'YouTube Home' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('Cat videos');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
});