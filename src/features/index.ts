import { run as runFewShot } from "./fewShot";
import { run as runCallLLM } from "./callLLM";

export const llmFeatures = {
  callLLM: runCallLLM,
};

export const chatFeatures = {
  fewShot: runFewShot,
};

export const features = {
  ...chatFeatures,
  ...llmFeatures,
};
