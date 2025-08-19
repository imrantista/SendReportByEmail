import { expect } from "@playwright/test";
import testData from "../../fixtures/testData.json" assert { type: "json" };
import { sendEmail } from "./sendEmail.js";
class CommonActions {
  // Login to application
  async loginSession(page) {
    await page.goto(`${testData.link}auth/login`);
    await page.getByPlaceholder("Email").fill(testData.useremail);
    await page.getByPlaceholder("Password").fill(testData.password);
    await page.getByRole("button", { name: /Login/i }).click();
    await expect(
      page.locator('[href="/live-campaigns"] .text-primary')
    ).toBeVisible();
  }

  // Log the result
  logResult(
    isSuccess,
    successMessage,
    errorMessage,
    stepToReproduce,
    resultTracker
  ) {
    if (isSuccess) {
      console.log(`Success: ${successMessage}`);
      resultTracker.successCount++;
    } else {
      console.error(`Error: ${errorMessage}`);
      console.log(`Step to reproduce: ${stepToReproduce}`);
      resultTracker.errorMessages.push(errorMessage);
      resultTracker.stepToReproduces.push(stepToReproduce);
      resultTracker.errorCount++;
    }
  }
  // Check toast messages
  async checkToast(
    page,
    successText,
    errorText,
    stepToReproduce,
    resultTracker
  ) {
    const successToast = page.getByText(successText);
    const errorToast = page.getByText(errorText);

    if ((await successToast.count()) > 0 && (await successToast.isVisible())) {
      const message = await successToast.innerText();
      this.logResult(true, message, "", stepToReproduce, resultTracker);
    } else if (
      (await errorToast.count()) > 0 &&
      (await errorToast.isVisible())
    ) {
      const message = await errorToast.innerText();
      this.logResult(false, "", message, stepToReproduce, resultTracker);
    } else {
      this.logResult(
        false,
        "",
        "No toast message appeared",
        stepToReproduce,
        resultTracker
      );
    }
  }
  // Log final results summary and send email
  async logResults(resultTracker, moduleName) {
    const totalCases = resultTracker.successCount + resultTracker.errorCount;
    console.log(`Total Number of Cases: ${totalCases}`);
    console.log(`Total Success: ${resultTracker.successCount}`);
    let htmlString;
    if (resultTracker.errorMessages.length > 0) {
      console.log(`Total Errors: ${resultTracker.errorCount}`);
      const formattedErrorMessages = resultTracker.errorMessages
        .map(
          (error, index) =>
            `${
              index + 1
            }. ${error} <br> <span style="color:#22228B;">#Step to Reproduce</span>: ${
              resultTracker.stepToReproduces[index]
            }`
        )
        .join("<br>");

      htmlString = `
        <h3>Module Name: ${moduleName}</h3>
        <p>Total Number of Test: ${totalCases}</p>
        <p>Total Success: ${resultTracker.successCount}</p>
        <p>Total Errors: ${resultTracker.errorCount}</p>
        <h3>Error Details</h3>
        <p>${formattedErrorMessages}</p>
      `;

      resultTracker.errorMessages.forEach((error, index) => {
        console.log(`Error ${index + 1}: ${error}`);
        console.log(
          `Step to Reproduce for Error ${index + 1}: ${
            resultTracker.stepToReproduces[index]
          }`
        );
      });
    } else {
      console.log("All checks passed!");
      htmlString = `
        <h3>Module Name: ${moduleName}</h3>
        <p>Total Number of Test: ${totalCases}</p>
        <p>Total Success: ${resultTracker.successCount}</p>
        <h3><span style="color:#228B22;">All checks passed!</span></h3>
      `;
    }
    // Send email using NodeMailer helper
    await sendEmail({
      emailHtml: htmlString,
      subject: `Stickler Automation Test Result - ${moduleName}`,
    });
  }
}
export default CommonActions;
