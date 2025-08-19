import ToastChecker from "../Common/ToastChecker.js";
import { logResult } from "../Common/LogResult.js";
class AssetDelete {
  async deleteAsset(page, resultTracker) {
    await page.waitForTimeout(4000);
    await page
      .locator(":nth-child(1) > :nth-child(7) > .flex > .text-primaryRed > svg")
      .click();
    await page.waitForTimeout(2000);
    const confirmButton = page.locator(".gap-3 > .text-white");
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
      await page.waitForTimeout(4000);
      const toastcheck = new ToastChecker ();
      await toastcheck.checkToast(
        page,
        "Asset deleted successfully!",
        /Unable to delete Asset|cannot be deleted/,
        "Asset -> Click delete icon -> Confirm deletion",
        resultTracker
      );
    } else {
        logResult(
        false,
        "",
        "Asset delete confirmation button not visible",
        "Asset -> Click delete icon",
        resultTracker
      );
    }
  }
}

export default AssetDelete;

