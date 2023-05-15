import { run as runFewShot } from "./fewShot";
import { run as runCallCowboyLLM } from "./callCowboyLLM";
import { run as runCallLLM } from "./callLLM";
import { run as runPlanAndExecuteAgent } from "./agent/planAndExecuteAgent";
import { run as runChatModelActionAgent } from "./agent/chatModelActionAgent";
import { run as runBrowser } from "./browser";

export const llmFeatures = {
  callCowboyLLM: runCallCowboyLLM,
  callLLM: runCallLLM,
  browser: runBrowser,
};

export const agentFeatures = {
  planAndExecuteAgent: runPlanAndExecuteAgent,
  chatModelActionAgent: runChatModelActionAgent,
};

export const chatFeatures = {
  fewShot: runFewShot,
  ...agentFeatures,
};

export const features = {
  ...chatFeatures,
  ...llmFeatures,
};
