import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 600,
    width: 800
  }
});

test('test', async ({ page }) => {
  await page.goto('https://www.pryazilim.com/');
});