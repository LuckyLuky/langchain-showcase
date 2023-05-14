import { ChatOpenAI } from "langchain/chat_models/openai";
import { isVerboseMode } from "../../utils/verboseMode";
import { getTemperature } from "../../utils/temperature";

export const create = () => {
  const verbose = isVerboseMode();
  const temperature = getTemperature();

  return new ChatOpenAI({ temperature: 0, verbose });
};
