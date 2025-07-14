import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pryazilim.com/');
  await expect(page.getByRole('heading', { name: 'Hayalinizdeki işi icon' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Projeniz için en iyi yazılım' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Yazılım Hizmetleri', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Yazılım dünyası zor ama biz' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dijital Pazarlama Hizmetlerimiz' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Hangi hizmeti almalıyım?' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blog Yazılarımız' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dijital Dünyada Başarıya Adım' })).toBeVisible();
  await expect(page.getByText('Lider Centrio C Blok Daire :')).toBeVisible();
});