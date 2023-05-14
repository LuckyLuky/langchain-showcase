import { create as createChatOpenAI } from "./chat/openAI";
import { create as createOpenAI } from "./llm/openAI";
import { create as createHuggingFaceGPT2 } from "./llm/huggingFace/huggingFaceGPT2";

export const chatModels = {
  chatOpenAI: () => createChatOpenAI(),
};
export const llmModels = {
  openAI: () => createOpenAI(),
  huggingFaceGPT2: () => createHuggingFaceGPT2(),
};

export const models = {
  ...chatModels,
  ...llmModels,
};
