import LogResult from "./LogResult.js";
class ToastChecker {
  async checkToast(
    page,
    successText,
    errorText,
    stepToReproduce,
    resultTracker
  ) {
    const logger = new LogResult();
    const successToast = page.getByText(successText);
    const errorToast = page.getByText(errorText);

    if ((await successToast.count()) > 0 && (await successToast.isVisible())) {
      const message = await successToast.innerText();
      logger.logResult(true, message, "", stepToReproduce, resultTracker);
    } else if (
      (await errorToast.count()) > 0 &&
      (await errorToast.isVisible())
    ) {
      const message = await errorToast.innerText();
      logger.logResult(false, "", message, stepToReproduce, resultTracker);
    } else {
      logger.logResult(
        false,
        "",
        "No toast message appeared",
        stepToReproduce,
        resultTracker
      );
    }
  }
}
export default ToastChecker;
