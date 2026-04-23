import { test, expect } from '@playwright/test';

test.describe('About Us Page Visual Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sauce-demo.myshopify.com/pages/about-us');
    await page.waitForLoadState('networkidle');
  });

  test('full page layout matches baseline', async ({ page }) => {
    await expect(page).toHaveScreenshot('about-us-full-page.png');
  });

  test('header navigation matches baseline', async ({ page }) => {
    const header = page.locator('header, .header, nav, [role="navigation"]');
    await expect(header).toHaveScreenshot('about-us-header.png');
  });

  test('main hero section matches baseline', async ({ page }) => {
    const heroSection = page.locator('main, .main-content, .hero, h1').first();
    await expect(heroSection).toHaveScreenshot('about-us-hero-section.png');
  });

  test('about us content area matches baseline', async ({ page }) => {
    const contentArea = page.locator('main .content, .about-content, .page-content');
    await expect(contentArea).toHaveScreenshot('about-us-content.png');
  });

  test('company branding elements match baseline', async ({ page }) => {
    const brandingElements = page.locator('.logo, .brand, [class*="sauce"]');
    await expect(brandingElements.first()).toHaveScreenshot('about-us-branding.png');
  });

  test('navigation menu items match baseline', async ({ page }) => {
    const navItems = page.locator('nav ul, .nav-menu, .menu-items');
    await expect(navItems).toHaveScreenshot('about-us-navigation-menu.png');
  });

  test('footer section matches baseline', async ({ page }) => {
    const footer = page.locator('footer, .footer, .site-footer');
    await expect(footer).toHaveScreenshot('about-us-footer.png');
  });

  test('mobile responsive layout matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('about-us-mobile-layout.png');
  });
});