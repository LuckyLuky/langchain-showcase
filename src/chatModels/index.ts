import { create as createChatOpenAI } from "./openAI";

export const chatModels = {
  openAI: () => createChatOpenAI(),
};
