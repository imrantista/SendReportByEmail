class CommonActions {
  //Result send via email
  logResults(resultTracker, moduleName) {
    let totalCases = resultTracker.successCount + resultTracker.errorCount;
    cy.log(`Total Number of Cases: ${totalCases}`);
    cy.log(`Total Success: ${resultTracker.successCount}`);

    if (resultTracker.errorMessages.length > 0) {
      cy.log(`Total Errors: ${resultTracker.errorCount}`);
      let formattedErrorMessages = resultTracker.errorMessages
        .map(
          (error, index) =>
            `${
              index + 1
            }. ${error} <br> <span style="color:#22228B;">#Step to Reproduce</span>: ${
              resultTracker.stepToReproduces[index]
            }`
        )
        .join("<br>");
      let htmlString = `
          <h3>Module Name: ${moduleName}</h3>
          <p>Total Number of Test: ${totalCases}</p>
          <p>Total Success: ${resultTracker.successCount}</p>
          <p>Total Errors: ${resultTracker.errorCount}</p>
          <h3>Error Details</h3>
          <p>${formattedErrorMessages}</p>
        `;
      resultTracker.errorMessages.forEach((error, index) => {
        cy.log(`Error ${index + 1}: ${error}`);
        cy.log(
          `Step to Reproduce for Error ${index + 1}: ${
            resultTracker.stepToReproduces[index]
          }`
        );
      });
      //cy.task("sendEmail", { emailHtml: htmlString });
    } else {
      cy.log("All checks passed!");
      let htmlString = `
          <h3>Module Name: ${moduleName}</h3>
          <p>Total Number of Test: ${totalCases}</p>
          <p>Total Success: ${resultTracker.successCount}</p>
          <h3><span style="color:#228B22;">All checks passed!</span></h3>
        `;
     // cy.task("sendEmail", { emailHtml: htmlString });
    }
  }
 }
export default CommonActions;
