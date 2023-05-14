import { ChatOpenAI } from "langchain/chat_models/openai";
import { isVerboseMode } from "../../utils/verboseMode";
import { getTemperature } from "../../utils/temperature";

export const create = () => {
  const verbose = isVerboseMode();
  const temperature = getTemperature();

  return new ChatOpenAI({ temperature, verbose, modelName: "gpt-3.5-turbo" });
};
