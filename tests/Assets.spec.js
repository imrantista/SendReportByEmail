import { test, expect } from "@playwright/test";
import CommonActions from "../Pages/Common/Actions.js";
import AssetDelete from "../Pages/Assets/AssetDelete.js";
import testData from "../fixtures/testData.json" assert { type: "json" };
test.describe("Assets Module Tests", () => {
  let resultTracker;
  let commonAction;
  test.beforeEach(async () => {
    resultTracker = {
      successCount: 0,
      errorCount: 0,
      errorMessages: [],
      stepToReproduces: [],
    };
    commonAction = new CommonActions();
  });
  test.beforeEach(async ({ page }) => {
    await commonAction.loginSession(page);
  });
  test("Delete Asset", async ({ page }) => {
    await page.goto(`${testData.link}products-and-assets?tab=Assets`);
    await expect(page.locator("text=Search")).toBeVisible();
    const deleteAsset = new AssetDelete();
    await deleteAsset.deleteAsset(page, resultTracker);
  });
  test.afterAll(async () => {
    await commonAction.logResults(resultTracker, "Assets Module");
  });
});
