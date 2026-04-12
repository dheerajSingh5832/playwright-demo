import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;

  constructor(page: Page) {
    super(page);
    // Updated selectors for Shopify login form
    this.usernameInput = page.locator('#customer_email');
    this.passwordInput = page.locator('#customer_password');
    this.loginButton = page.getByRole('button', { name: 'Sign In' });
    this.errorMessage = page.locator('.errors');
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
  }

  async goto(url?: string): Promise<void> {
    // Updated URL for Shopify login page
    const loginUrl = url || process.env.BASE_URL + '/account/login';
    await this.navigate(loginUrl);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async getErrorText(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async isLoginPageDisplayed(): Promise<boolean> {
    return (
      (await this.usernameInput.isVisible()) &&
      (await this.passwordInput.isVisible()) &&
      (await this.loginButton.isVisible())
    );
  }
}
