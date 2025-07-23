import { test, expect } from '@playwright/test';
import data from "./teklif.json";
data.forEach((item, idx) => {
  test(`test iteration ${idx}`, async ({ page }) => {
    await page.goto('https://www.pryazilim.com/');
    await page.getByRole('link', { name: 'Hemen Başlayalım!' }).click();
    await page.getByRole('textbox', { name: 'Ad Soyad' }).click();
    await page.getByRole('textbox', { name: 'Ad Soyad' }).fill('Sarp Şentürk');
    await page.getByRole('textbox', { name: 'Firma Adı' }).click();
    await page.getByRole('textbox', { name: 'Firma Adı' }).fill('sarpsenturk');
    await page.getByRole('textbox', { name: 'E-posta' }).click();
    await page.getByRole('textbox', { name: 'E-posta' }).fill('sarpsenturk38@gmail.com');
    await page.getByRole('textbox', { name: 'Telefon Numarası' }).click();
    await page.getByRole('textbox', { name: 'Telefon Numarası' }).fill('534 523 47 66');
    await page.getByRole('textbox', { name: 'Mesajınız' }).click();
    await page.getByRole('textbox', { name: 'Mesajınız' }).fill('Hello world');
    await page.locator('#kisisel').check();
    await expect(page.getByText('Gönder')).toBeVisible();
  });
});
