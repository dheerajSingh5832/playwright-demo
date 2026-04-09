import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.forgotPasswordLink = page.locator('a[href*="forgot-password"]');
    this.rememberMeCheckbox = page.locator('#remember-me');
  }

  /**
   * Navigate to login page
   */
  async goto(url?: string): Promise<void> {
    const loginUrl = url || process.env.BASE_URL + '/login';
    await this.navigate(loginUrl);
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get error message text
   */
  async getErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  /**
   * Click forgot password link
   */
  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  /**
   * Check remember me checkbox
   */
  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }

  /**
   * Verify login page is displayed
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return (
      (await this.usernameInput.isVisible()) &&
      (await this.passwordInput.isVisible()) &&
      (await this.loginButton.isVisible())
    );
  }
}
