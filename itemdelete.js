const nodemailer = require("nodemailer");
Cypress.Commands.add("itemdelete", () => {
  let successCount = 0;
  let errorCount = 0;
  let errorMessages = [];
  cy.visit(`${xyz.com}`); //put your valid url
  function itemDelete() {
    cy.get(
      ":nth-child(1) > :nth-child(11) > .flex > .text-primaryRed>svg"
    ).click(); //click on delete button
    cy.wait(4000);
    cy.get(".gap-3 > .text-white")
      .should("be.visible")
      .then(($button) => {
        if ($button.is(":visible")) {
          cy.get(".gap-3 > .text-white").click(); //item delete confimation button
          cy.wait(4000);
          cy.get("body").then(($body) => {
            if (
              $body.find(
                ".Toastify__toast.Toastify__toast--success, .Toastify__toast.Toastify__toast--error"
              ).length > 0
            ) {
              cy.get(
                ".Toastify__toast.Toastify__toast--success, .Toastify__toast.Toastify__toast--error"
              )
                .should("be.visible")
                .then(($element) => {
                  const toastText = $element.text();
                  if (toastText.includes("Item deleted successfully!")) {
                    cy.log('Success: "Item deleted successfully!"');
                    successCount++;
                  } else if (
                    toastText.includes("This item is used cannot be deleted.")
                  ) {
                    cy.log('Success: "This item is used cannot be deleted."');
                    successCount++;
                  } else {
                    const errorMessage = "Error: Item no deleted!";
                    errorMessages.push(errorMessage);
                    errorCount++;
                  }
                });
            } else {
              const errorMessage =
                "Error: Item deleted but Toaster not showing or something else!";
              errorMessages.push(errorMessage);
              errorCount++;
            }
          });
        } else {
          const errorMessage =
            "Error: Item deleted confirmation button not visible!";
          errorMessages.push(errorMessage);
          errorCount++;
        }
      });
  }
  itemDelete();
   cy.then(() => {
    let totalCases = successCount + errorCount;
    cy.log(`Total Number of Cases: ${totalCases}`);
    cy.log(`Total Success: ${successCount}`);
    if (errorMessages.length > 0) {
      cy.log(`Total Errors: ${errorCount}`);
      let formattedErrorMessages = errorMessages
        .map((error, index) => `${index + 1}. ${error}`)
        .join("<br>");
      let htmlString = `
      <h3>Module Name: Products </h3>
      <p>Total Number of Cases= ${totalCases}</p>
      <p>Total Success= ${successCount}</p>
      <p>Total Errors= ${errorCount}</p>
      <h3>Error Details</h3>
      <p>${formattedErrorMessages}</p>
    `;
      errorMessages.forEach((error, index) => {
        cy.log(`${index + 1}: ${error}`);
      });
      cy.task("sendEmail", { emailHtml: htmlString });
    } else {
      cy.log("All checks passed!");
      let htmlString = `
      <h3>Module Name: Products </h3>
      <p>Total Number of Cases= ${totalCases}</p>
      <p>Total Success= ${successCount}</p>
      <h3>All checks passed!</h3>
    `;
      cy.task("sendEmail", { emailHtml: htmlString });
    }
  });
});
