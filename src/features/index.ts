import { run as runFewShot } from "./fewShot";
import { run as runCallLLM } from "./callLLM";
import { run as runPlanAndExecuteAgent } from "./agent/planAndExecuteAgent";
import { run as runChatModelActionAgent } from "./agent/chatModelActionAgent";

export const llmFeatures = {
  callLLM: runCallLLM,
};

export const chatFeatures = {
  fewShot: runFewShot,
  planAndExecuteAgent: runPlanAndExecuteAgent,
  chatModelActionAgent: runChatModelActionAgent,
};

export const features = {
  ...chatFeatures,
  ...llmFeatures,
};
