import { ChatOpenAI } from "langchain/chat_models/openai";
import { isVerboseMode } from "../utils";

export const create = () => {
  const verbose = isVerboseMode();

  return new ChatOpenAI({ temperature: 0, verbose });
};
