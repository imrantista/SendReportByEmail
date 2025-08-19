import { test } from '@playwright/test';
import LoginPage from '../Pages/Auth/Login.js';
import testData from '../fixtures/testData.json' assert { type: "json" };
test.describe('Auth Module Tests', () => {
  test('Login and Access Dashboard', async ({ page }) => {
    await page.goto(`${testData.link}auth/login`);
    const loginPage = new LoginPage();
    await loginPage.loginToApplication(page);
  });
});
