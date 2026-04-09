# Sauce Demo Store - Test Guide

## 🛍️ About Sauce Demo Store

Base URL: **https://sauce-demo.myshopify.com**

This is a Shopify demo store configured for testing e-commerce functionality.

## 📦 What's Included

### Page Objects
- ✅ **ProductPage** - Browse products, search, add to cart
- ✅ **CartPage** - View cart, update quantities, checkout
- ✅ **HomePage** - Store homepage navigation
- ✅ **LoginPage** - User authentication (if enabled)

### Test Suites
- ✅ **Product Browsing** - Product catalog, search, navigation
- ✅ **Shopping Cart** - Cart operations, checkout flow
- ✅ **Store Navigation** - Page accessibility, responsive design

## 🚀 Running Tests

### Run all Sauce Demo tests
```bash
npx playwright test tests/e2e/sauce-demo.spec.ts --project=chromium
```

### Run with UI Mode (recommended)
```bash
npx playwright test tests/e2e/sauce-demo.spec.ts --ui
```

### Run specific test suite
```bash
# Product browsing tests
npx playwright test tests/e2e/sauce-demo.spec.ts -g "Product Browsing"

# Shopping cart tests
npx playwright test tests/e2e/sauce-demo.spec.ts -g "Shopping Cart"
```

### Debug mode
```bash
npx playwright test tests/e2e/sauce-demo.spec.ts --debug
```

## 🎯 Using AI Agents with Sauce Demo

### 1. Create a test plan
```
@planner Using tests/seed.spec.ts, create a plan for testing:
1. Product search and filtering
2. Adding multiple items to cart
3. Updating cart quantities
4. Proceeding to checkout
```

### 2. Generate tests
```
@generator Generate tests from specs/sauce-demo-shopping.md
```

### 3. Fix failures
```
@healer Fix failing tests in tests/e2e/
```

## 📝 Example Test with Fixtures

```typescript
import { test, expect } from '../fixtures';

test('add product to cart', async ({ productPage, cartPage }) => {
  // Navigate to store
  await productPage.goto();
  
  // Add product (if available)
  const productCount = await productPage.getProductCount();
  
  if (productCount > 0) {
    await productPage.addToCartByName('Product Name');
    await productPage.goToCart();
    
    // Verify cart
    const itemCount = await cartPage.getItemCount();
    expect(itemCount).toBeGreaterThan(0);
  }
});
```

## 🛒 Shopping Flow Example

```typescript
test('complete shopping flow', async ({ page }) => {
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  
  // Browse products
  await productPage.goto('all');
  
  // Search for product
  await productPage.searchProduct('shirt');
  
  // Add to cart
  await productPage.addToCartByName('T-Shirt');
  
  // Go to cart
  await productPage.goToCart();
  
  // Verify item in cart
  const items = await cartPage.getItemNames();
  expect(items).toContain('T-Shirt');
  
  // Update quantity
  await cartPage.updateQuantity(0, 2);
  
  // Proceed to checkout
  await cartPage.proceedToCheckout();
});
```

## 🎨 Testing Different Scenarios

### Product Search
```typescript
test('search products', async ({ productPage }) => {
  await productPage.goto();
  await productPage.searchProduct('backpack');
  
  const products = await productPage.getProductNames();
  console.log('Search results:', products);
});
```

### Cart Operations
```typescript
test('manage cart', async ({ cartPage }) => {
  await cartPage.goto();
  
  // Check if cart is empty
  if (await cartPage.isCartEmpty()) {
    console.log('Cart is empty');
  } else {
    // Get items
    const items = await cartPage.getItemNames();
    console.log('Cart items:', items);
    
    // Remove first item
    await cartPage.removeItem(0);
  }
});
```

### Responsive Design
```typescript
test('mobile shopping', async ({ page }) => {
  const productPage = new ProductPage(page);
  
  // Set mobile viewport
  await page.setViewportSize({ width: 375, height: 667 });
  
  // Test mobile navigation
  await productPage.goto();
  
  // Mobile-specific interactions
  const isMobileMenuVisible = await page.locator('.mobile-menu').isVisible();
  console.log('Mobile menu:', isMobileMenuVisible);
});
```

## 🔧 Configuration

### Update .env file
```env
BASE_URL=https://sauce-demo.myshopify.com
HEADLESS=false  # Set to false to watch tests
```

### Custom Collections
Test specific product collections:
```typescript
await productPage.goto('backpacks');  // /collections/backpacks
await productPage.goto('clothing');   // /collections/clothing
```

## 📊 Test Results

After running tests, view the report:
```bash
npx playwright show-report
```

View trace for debugging:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

## 💡 Tips

1. **Check Store Availability** - Demo stores may have limited products
2. **Handle Loading States** - Use `waitForLoadState('networkidle')`
3. **Flexible Selectors** - Store structure may vary
4. **Error Handling** - Use try-catch for optional elements
5. **Screenshots** - Auto-captured on failure in `test-results/`

## 🐛 Common Issues

### Products not loading
```typescript
// Wait for products with custom timeout
await productPage.productGrid.waitFor({ timeout: 10000 });
```

### Cart button not visible
```typescript
// Check if cart exists before clicking
const hasCart = await productPage.cartIcon.isVisible();
if (hasCart) {
  await productPage.goToCart();
}
```

### Checkout requires password
Some demo stores may be password protected. Check the store directly.

## 📚 Next Steps

1. Explore the store manually
2. Identify key user flows
3. Use planner agent to create test plans
4. Generate tests with generator agent
5. Run and heal with healer agent

---

**Happy Testing! 🛍️🎭**
