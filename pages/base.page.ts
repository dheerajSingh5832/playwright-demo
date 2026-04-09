import { Page, Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   */
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Wait for page to load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click on an element
   */
  async click(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.click();
  }

  /**
   * Fill input field
   */
  async fill(selector: string | Locator, text: string): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.fill(text);
  }

  /**
   * Type text with delay
   */
  async type(selector: string | Locator, text: string, delay: number = 100): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.pressSequentially(text, { delay });
  }

  /**
   * Get text content
   */
  async getText(selector: string | Locator): Promise<string | null> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.textContent();
  }

  /**
   * Get input value
   */
  async getValue(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.inputValue();
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string | Locator): Promise<boolean> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.isVisible();
  }

  /**
   * Check if element is enabled
   */
  async isEnabled(selector: string | Locator): Promise<boolean> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.isEnabled();
  }

  /**
   * Wait for element
   */
  async waitForElement(selector: string | Locator, options?: { timeout?: number }): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.waitFor({ state: 'visible', ...options });
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selector: string | Locator, value: string): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.selectOption(value);
  }

  /**
   * Check checkbox
   */
  async check(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.check();
  }

  /**
   * Uncheck checkbox
   */
  async uncheck(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.uncheck();
  }

  /**
   * Hover over element
   */
  async hover(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.hover();
  }

  /**
   * Drag and drop
   */
  async dragAndDrop(source: string | Locator, target: string | Locator): Promise<void> {
    const sourceLocator = typeof source === 'string' ? this.page.locator(source) : source;
    const targetLocator = typeof target === 'string' ? this.page.locator(target) : target;
    await sourceLocator.dragTo(targetLocator);
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  /**
   * Reload page
   */
  async reload(): Promise<void> {
    await this.page.reload();
  }

  /**
   * Go back
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Go forward
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
  }

  /**
   * Execute JavaScript
   */
  async executeScript<T>(script: string): Promise<T> {
    return await this.page.evaluate(script);
  }

  /**
   * Wait for timeout
   */
  async wait(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  /**
   * Press keyboard key
   */
  async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  /**
   * Get element count
   */
  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }
}
