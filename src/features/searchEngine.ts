import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools";
import { BaseLanguageModel } from "langchain/base_language";
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import { isVerboseMode, log } from "../utils/verboseMode";
import { formatResponse } from "../utils/formatResponse";
import { setLoading } from "../utils/loadingAnimation";
import { getUserInput } from "../prompts/user/input";

export const run = async (model: BaseLanguageModel) => {
  const verbose = isVerboseMode();

  log("Creating tools");
  const tools = [new SerpAPI()];

  log("Creating action agent executor");
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
    verbose,
  });

  const input = getUserInput(
    "What's the weather in Prague today? Use metric system."
  );

  log(`Running executor for input: ${input}`);

  const cancelLoading = setLoading();

  const result = await executor.call({
    input,
  });

  cancelLoading();

  console.log(
    formatResponse({
      llm: model,
      response: result.output,
      prompt: input,
    })
  );
};
