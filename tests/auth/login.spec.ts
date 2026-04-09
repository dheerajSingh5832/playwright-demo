import { test, expect } from '../fixtures';
import { TestUsers } from '../../fixtures/test-data';

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ loginPage, homePage, page }) => {
    // Arrange
    const user = TestUsers.validUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    await expect(page).toHaveURL(/.*home/);
    await expect(homePage.welcomeMessage).toBeVisible();
    expect(await homePage.isUserLoggedIn()).toBeTruthy();
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    // Arrange
    const user = TestUsers.invalidUser();
    
    // Act
    await loginPage.login(user.username, user.password);
    
    // Assert
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorText = await loginPage.getErrorText();
    expect(errorText).toContain('invalid');
  });

  test('should display login page elements correctly', async ({ loginPage }) => {
    // Assert
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('should navigate to forgot password page', async ({ loginPage, page }) => {
    // Act
    await loginPage.clickForgotPassword();
    
    // Assert
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  test('should login with empty credentials shows validation', async ({ loginPage }) => {
    // Act
    await loginPage.login('', '');
    
    // Assert - Stays on login page
    expect(await loginPage.isLoginPageDisplayed()).toBeTruthy();
  });
});
