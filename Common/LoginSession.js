import { expect } from "@playwright/test";
import testData from "../../fixtures/testData.json" assert { type: "json" };

class LoginSession {
  async login(page) {
    await page.goto(`${testData.link}auth/login`);
    await page.getByPlaceholder("Email").fill(testData.useremail);
    await page.getByPlaceholder("Password").fill(testData.password);
    await page.getByRole("button", { name: /Login/i }).click();
    await expect(page.locator('[href="/live-campaigns"] .text-primary')).toBeVisible();
  }
}
export default LoginSession;
