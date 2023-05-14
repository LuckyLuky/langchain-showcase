import { create as createChatOpenAI } from "./chat/openAI";
import { create as createOpenAI } from "./llm/openAI";
import { create as createHuggingFaceGPT2 } from "./llm/huggingFace/huggingFaceGPT2";
import { create as createCohere } from "./llm/cohere";

export const chatModels = {
  chatOpenAI: () => createChatOpenAI(),
};
export const llmModels = {
  openAI: () => createOpenAI(),
  huggingFaceGPT2: () => createHuggingFaceGPT2(),
  cohere: () => createCohere(),
};

export const models = {
  ...chatModels,
  ...llmModels,
};
