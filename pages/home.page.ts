import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  // Locators
  readonly welcomeMessage: Locator;
  readonly userProfile: Locator;
  readonly logoutButton: Locator;
  readonly dashboardLink: Locator;
  readonly settingsLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.welcomeMessage = page.locator('.welcome-message');
    this.userProfile = page.locator('#user-profile');
    this.logoutButton = page.getByRole('button', { name: /logout/i });
    this.dashboardLink = page.locator('a[href*="dashboard"]');
    this.settingsLink = page.locator('a[href*="settings"]');
  }

  /**
   * Navigate to home page
   */
  async goto(): Promise<void> {
    const homeUrl = process.env.BASE_URL || 'https://sauce-demo.myshopify.com';
    await this.navigate(homeUrl);
  }

  /**
   * Get welcome message text
   */
  async getWelcomeMessage(): Promise<string | null> {
    return await this.welcomeMessage.textContent();
  }

  /**
   * Click user profile
   */
  async clickUserProfile(): Promise<void> {
    await this.userProfile.click();
  }

  /**
   * Click logout button
   */
  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }

  /**
   * Navigate to dashboard
   */
  async navigateToDashboard(): Promise<void> {
    await this.dashboardLink.click();
  }

  /**
   * Navigate to settings
   */
  async navigateToSettings(): Promise<void> {
    await this.settingsLink.click();
  }

  /**
   * Verify user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    return (
      (await this.userProfile.isVisible()) &&
      (await this.logoutButton.isVisible())
    );
  }

  /**
   * Verify home page is displayed
   */
  async isHomePageDisplayed(): Promise<boolean> {
    return await this.welcomeMessage.isVisible();
  }
}
