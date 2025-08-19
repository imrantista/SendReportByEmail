class LogResult {
  logResult(
    isSuccess,
    successMessage,
    errorMessage,
    stepToReproduce,
    resultTracker
  ) {
    if (isSuccess) {
      console.log(`: ${successMessage}`);
      resultTracker.successCount++;
    } else {
      console.error(`Error: ${errorMessage}`);
      console.log(`Step to reproduce: ${stepToReproduce}`);
      resultTracker.errorMessages.push(errorMessage);
      resultTracker.stepToReproduces.push(stepToReproduce);
      resultTracker.errorCount++;
    }
  }
}
export default LogResult;
