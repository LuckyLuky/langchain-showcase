import { config } from "dotenv";

config();
const verboseMode = Boolean(
  process.env.VERBOSE &&
    ["true", "1", "yes", "on"].includes(process.env.VERBOSE)
);
if (verboseMode) {
  console.info("Running in verbose mode");
}

export const isVerboseMode = () => verboseMode;

export const log = (...args: any[]) => {
  if (verboseMode) {
    console.log(...args);
  }
};
