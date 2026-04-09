import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';

type CustomFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  authenticatedPage: Page;
};

/**
 * Custom fixtures for page objects and authenticated sessions
 */
export const test = base.extend<CustomFixtures>({
  // Login page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Home page fixture
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // Product page fixture
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },

  // Cart page fixture
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  // Authenticated page fixture - automatically logs in
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    // Perform login
    await loginPage.goto();
    await loginPage.login(
      process.env.TEST_USER_EMAIL || 'testuser@example.com',
      process.env.TEST_USER_PASSWORD || 'SecurePassword123'
    );
    
    // Wait for navigation after login
    await page.waitForLoadState('networkidle');
    
    await use(page);
  },
});

export { expect } from '@playwright/test';
