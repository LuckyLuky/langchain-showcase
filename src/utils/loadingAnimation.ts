import { isVerboseMode } from "./verboseMode";

export const setLoading = () => {
  const verbose = isVerboseMode();
  if (verbose) {
    return () => {};
  }

  const symbols = ["\\", "|", "/", "-"];
  let x = 0;

  const interval = setInterval(() => {
    process.stdout.write("\r" + symbols[x++]);
    x &= 3;
  }, 250);

  return () => {
    clearInterval(interval);
  };
};
