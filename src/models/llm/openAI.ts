import { OpenAI } from "langchain/llms/openai";
import { isVerboseMode } from "../../utils/verboseMode";
import { getTemperature } from "../../utils/temperature";

export const create = () => {
  const verbose = isVerboseMode();
  const temperature = getTemperature();

  return new OpenAI({ temperature, verbose });
};
