import _debug from "debug";

export function sleep(ms) {
  return new Promise(resolve => {
    if (__DEV__) {
      _debug('sleep')(`Sleeping for ${ms} ms.`);
      setTimeout(resolve, ms);
    } else {
      resolve();
    }
  });
}
