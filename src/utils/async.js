/**
 * Simulated async delay for dummy data services.
 * @param {number} ms
 */
export function delay(ms = 400) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default delay;
