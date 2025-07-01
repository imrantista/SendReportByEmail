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
    after(() => {
    commonAction.logResults(globalResultTracker, "Assets");
  });
});
