export function runGas(functionName, ...args) {
  return new Promise((resolve, reject) => {
    if (
      typeof window === "undefined" ||
      !window.google?.script?.run
    ) {
      reject(new Error("Google Apps Script runtime is unavailable."));
      return;
    }

    window.google.script.run
      .withSuccessHandler(resolve)
      .withFailureHandler((error) => {
        reject(
          error instanceof Error
            ? error
            : new Error(error?.message || String(error))
        );
      })[functionName](...args);
  });
}
