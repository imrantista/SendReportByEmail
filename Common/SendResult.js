import { sendEmail } from "./EmailConfig.js";
class SendResult {
  async logResults(resultTracker, moduleName) {
    const totalCases = resultTracker.successCount + resultTracker.errorCount;
    let htmlString;

    if (resultTracker.errorMessages.length > 0) {
      const formattedErrorMessages = resultTracker.errorMessages
        .map(
          (error, index) =>
            `${index + 1}. ${error} <br>
             <span style="color:#22228B;">#Step to Reproduce</span>: ${
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
    } else {
      htmlString = `
        <h3>Module Name: ${moduleName}</h3>
        <p>Total Number of Test: ${totalCases}</p>
        <p>Total Success: ${resultTracker.successCount}</p>
        <h3><span style="color:#228B22;">All checks passed!</span></h3>
      `;
    }

    await sendEmail({
      emailHtml: htmlString,
      subject: `Automation Test Result - ${moduleName}`,
    });
  }
}
export default SendResult;
