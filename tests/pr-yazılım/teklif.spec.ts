import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.pryazilim.com/');
  await page.getByRole('link', { name: 'Hemen Başlayalım!' }).click();
  await page.locator('.py-16.card-m').first().click();
  await page.getByRole('textbox', { name: 'Giriniz' }).click();
  await page.getByRole('textbox', { name: 'Giriniz' }).fill('Random project description and requirements');
  await page.locator('#Find-language #tr').check();
  await page.locator('#Find-language #en').check();
  await page.getByRole('radio', { name: '$30.000 ve üstü' }).check();
  await page.getByRole('textbox', { name: 'Ad Soyad' }).click();
  await page.getByRole('textbox', { name: 'Ad Soyad' }).fill('Sarp');
  await page.getByRole('textbox', { name: 'Ad Soyad' }).press('Tab');
  await page.getByRole('textbox', { name: 'Firma Adı' }).fill('şentürk');
  await page.getByRole('textbox', { name: 'Firma Adı' }).press('Tab');
  await page.getByRole('textbox', { name: 'E-posta' }).fill('sarpsenturk38@gmail.com');
  await page.getByRole('textbox', { name: 'E-posta' }).press('Tab');
  await page.getByRole('textbox', { name: 'Telefon Numarası' }).click();
  await page.getByRole('textbox', { name: 'Telefon Numarası' }).fill('534 523 47 66');
  await page.getByRole('textbox', { name: 'Mesajınız' }).click();
  await page.getByRole('textbox', { name: 'Mesajınız' }).fill('Hello world');
  await page.locator('#kisisel').check();
  await page.getByText('Gönder').click();
});