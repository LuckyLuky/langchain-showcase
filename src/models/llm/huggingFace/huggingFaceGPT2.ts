import { HuggingFaceInference } from "langchain/llms/hf";
import { isVerboseMode } from "../../../utils/verboseMode";
import { getTemperature } from "../../../utils/temperature";

export const create = () => {
  const verbose = isVerboseMode();
  const temperature = getTemperature();

  return new HuggingFaceInference({
    temperature,
    verbose,
    maxTokens: 150,
    model: "gpt2",
  });
};
