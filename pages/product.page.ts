import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  // Locators
  readonly productGrid: Locator;
  readonly productCard: Locator;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly cartCount: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly sortDropdown: Locator;
  readonly productTitle: Locator;
  readonly productPrice: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators for Shopify store
    this.productGrid = page.locator('.product-grid, .collection-grid');
    this.productCard = page.locator('.product-card, .grid-product');
    this.addToCartButton = page.locator('button:has-text("Add to cart"), button[name="add"]');
    this.cartIcon = page.locator('a[href*="cart"], .cart-link');
    this.cartCount = page.locator('.cart-count, .cart__qty');
    this.searchInput = page.locator('input[type="search"], input[name="q"]');
    this.searchButton = page.locator('button[type="submit"]:has-text("Search")');
    this.sortDropdown = page.locator('select[name="sort_by"]');
    this.productTitle = page.locator('.product-title, .product__title');
    this.productPrice = page.locator('.product-price, .price');
  }

  /**
   * Navigate to products/collections page
   */
  async goto(collection?: string): Promise<void> {
    const url = collection 
      ? `${process.env.BASE_URL}/collections/${collection}`
      : process.env.BASE_URL || 'https://sauce-demo.myshopify.com';
    await this.navigate(url);
  }

  /**
   * Get product by name
   */
  async getProductByName(productName: string): Promise<Locator> {
    return this.page.locator(`.product-card:has-text("${productName}"), .grid-product:has-text("${productName}")`);
  }

  /**
   * Add product to cart by name
   */
  async addToCartByName(productName: string): Promise<void> {
    const product = await this.getProductByName(productName);
    await product.click();
    await this.addToCartButton.first().click();
  }

  /**
   * Search for product
   */
  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  /**
   * Get cart count
   */
  async getCartCount(): Promise<number> {
    const countText = await this.cartCount.textContent();
    return countText ? parseInt(countText) : 0;
  }

  /**
   * Navigate to cart
   */
  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  /**
   * Sort products
   */
  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  /**
   * Get all product names
   */
  async getProductNames(): Promise<string[]> {
    await this.productTitle.first().waitFor();
    return await this.productTitle.allTextContents();
  }

  /**
   * Get product count
   */
  async getProductCount(): Promise<number> {
    return await this.productCard.count();
  }
}
