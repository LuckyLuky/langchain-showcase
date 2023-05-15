import { isVerboseMode } from "../../utils/verboseMode";
import { getTemperature } from "../../utils/temperature";
import { Cohere } from "langchain/llms";

export const create = () => {
  const verbose = isVerboseMode();
  const temperature = getTemperature();

  return new Cohere({
    temperature,
    verbose,
    maxTokens: 150,
    model: "command",
  });
};
