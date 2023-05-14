import { run as runFewShot } from "./fewShot";
import { run as runCallLLM } from "./callLLM";
import { run as runPlanAndExecuteAgent } from "./agent/planAndExecuteAgent";
import { run as runChatModelActionAgent } from "./agent/chatModelActionAgent";

export const llmFeatures = {
  callLLM: runCallLLM,
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
