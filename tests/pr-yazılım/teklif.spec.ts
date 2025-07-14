import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pryazilim.com/');
  await page.getByRole('link', { name: 'Hemen Başlayalım!' }).click();
  await page.locator('.py-16.card-m').first().click();
});