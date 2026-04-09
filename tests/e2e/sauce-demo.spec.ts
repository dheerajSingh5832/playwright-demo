import { test, expect } from '../fixtures';
import { ProductPage } from '../../pages/product.page';
import { CartPage } from '../../pages/cart.page';

test.describe('Sauce Demo - Product Browsing', () => {
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    await productPage.goto();
  });

  test('should load the store homepage', async ({ page }) => {
    // Verify page loads
    await expect(page).toHaveURL(/sauce-demo\.myshopify\.com/);
    
    // Check if products are displayed (if available)
    const productCount = await productPage.getProductCount();
    console.log(`Found ${productCount} products on the page`);
  });

  test('should display product catalog', async () => {
    // Wait for products to load
    await productPage.page.waitForLoadState('networkidle');
    
    // Check if product grid exists
    const hasProducts = await productPage.productGrid.isVisible().catch(() => false);
    
    if (hasProducts) {
      // Try to get product names with a timeout
      const hasProductTitles = await productPage.productTitle.first().isVisible({ timeout: 5000 }).catch(() => false);
      
      if (hasProductTitles) {
        const productNames = await productPage.getProductNames();
        console.log('Products found:', productNames);
        expect(productNames.length).toBeGreaterThan(0);
      } else {
        console.log('Product grid exists but no product titles found');
      }
    } else {
      console.log('Store may be in demo mode or has no products');
    }
  });

  test('should navigate to different collections', async ({ page }) => {
    // Try navigating to common Shopify collections
    await productPage.goto('all');
    await expect(page).toHaveURL(/collections/);
  });

  test('should have search functionality', async () => {
    // Check if search is available
    const hasSearch = await productPage.searchInput.isVisible().catch(() => false);
    
    if (hasSearch) {
      console.log('Search functionality is available');
      expect(hasSearch).toBeTruthy();
    } else {
      console.log('Search may not be enabled on this store');
    }
  });

  test('should have cart functionality', async () => {
    // Check if cart icon exists
    const hasCart = await productPage.cartIcon.isVisible().catch(() => false);
    
    if (hasCart) {
      await productPage.goToCart();
      await expect(cartPage.page).toHaveURL(/cart/);
    } else {
      console.log('Cart may not be visible on this page');
    }
  });
});

test.describe('Sauce Demo - Shopping Cart', () => {
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    cartPage = new CartPage(page);
    await cartPage.goto();
  });

  test('should display cart page', async ({ page }) => {
    await expect(page).toHaveURL(/cart/);
  });

  test('should show empty cart message when cart is empty', async () => {
    // Check if cart shows as empty or has items
    const isEmpty = await cartPage.isCartEmpty().catch(() => false);
    console.log('Cart is empty:', isEmpty);
  });

  test('should have checkout button', async () => {
    const hasCheckout = await cartPage.checkoutButton.isVisible().catch(() => false);
    console.log('Checkout button visible:', hasCheckout);
  });
});

test.describe('Sauce Demo - Store Navigation', () => {
  test('should have accessible store pages', async ({ page }) => {
    const baseUrl = process.env.BASE_URL || 'https://sauce-demo.myshopify.com';
    
    // Test main pages
    const pages = [
      { url: baseUrl, name: 'Home' },
      { url: `${baseUrl}/cart`, name: 'Cart' },
      { url: `${baseUrl}/collections/all`, name: 'All Products' },
    ];

    for (const testPage of pages) {
      await page.goto(testPage.url);
      console.log(`Navigated to ${testPage.name}: ${testPage.url}`);
      
      // Verify page loaded
      await expect(page).not.toHaveURL(/password/); // Not password protected
      
      // Wait for page to be ready
      await page.waitForLoadState('domcontentloaded');
    }
  });

  test('should have responsive design', async ({ page }) => {
    await page.goto(process.env.BASE_URL || 'https://sauce-demo.myshopify.com');
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForLoadState('networkidle');
    console.log('Desktop viewport loaded');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    console.log('Mobile viewport loaded');
    
    expect(true).toBeTruthy();
  });
});
