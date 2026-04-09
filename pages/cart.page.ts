import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  // Locators
  readonly cartItems: Locator;
  readonly cartItemName: Locator;
  readonly cartItemPrice: Locator;
  readonly cartItemQuantity: Locator;
  readonly removeButton: Locator;
  readonly updateCartButton: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly subtotal: Locator;
  readonly emptyCartMessage: Locator;
  readonly quantityInput: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.cartItems = page.locator('.cart-item, .cart__item');
    this.cartItemName = page.locator('.cart-item__name, .cart__item-title');
    this.cartItemPrice = page.locator('.cart-item__price, .cart__price');
    this.cartItemQuantity = page.locator('input[name*="quantity"], .cart__qty-input');
    this.removeButton = page.locator('a:has-text("Remove"), button:has-text("Remove")');
    this.updateCartButton = page.locator('button:has-text("Update cart"), button[name="update"]');
    this.checkoutButton = page.locator('button:has-text("Check out"), button[name="checkout"]');
    this.continueShoppingButton = page.locator('a:has-text("Continue shopping")');
    this.subtotal = page.locator('.cart-subtotal, .cart__subtotal');
    this.emptyCartMessage = page.locator(':has-text("Your cart is empty")');
    this.quantityInput = page.locator('input[type="number"][name*="quantity"]');
  }

  /**
   * Navigate to cart page
   */
  async goto(): Promise<void> {
    const cartUrl = `${process.env.BASE_URL}/cart`;
    await this.navigate(cartUrl);
  }

  /**
   * Get cart item count
   */
  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return await this.emptyCartMessage.isVisible();
  }

  /**
   * Get item names in cart
   */
  async getItemNames(): Promise<string[]> {
    return await this.cartItemName.allTextContents();
  }

  /**
   * Update item quantity
   */
  async updateQuantity(itemIndex: number, quantity: number): Promise<void> {
    const quantityInputs = await this.quantityInput.all();
    if (quantityInputs[itemIndex]) {
      await quantityInputs[itemIndex].fill(quantity.toString());
      if (await this.updateCartButton.isVisible()) {
        await this.updateCartButton.click();
      }
    }
  }

  /**
   * Remove item from cart
   */
  async removeItem(itemIndex: number): Promise<void> {
    const removeButtons = await this.removeButton.all();
    if (removeButtons[itemIndex]) {
      await removeButtons[itemIndex].click();
    }
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping
   */
  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  /**
   * Get subtotal amount
   */
  async getSubtotal(): Promise<string | null> {
    return await this.subtotal.textContent();
  }
}
