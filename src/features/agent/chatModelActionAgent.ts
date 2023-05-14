import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools";
import { BufferMemory } from "langchain/memory";
import { BaseLanguageModel } from "langchain/base_language";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { isVerboseMode, log } from "../../utils/verboseMode";
import { formatResponse } from "../../utils/formatResponse";
import { setLoading } from "../../utils/loadingAnimation";

export const run = async (model: BaseLanguageModel) => {
  const verbose = isVerboseMode();

  log("Creating tools");
  const tools = [new Calculator(), new SerpAPI()];

  log("Creating buffer memory");
  const memory = new BufferMemory();

  log("Creating action agent executor");
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-zero-shot-react-description",
  });

  let input = `\
Who is the current president of the Czech republic?
`;

  log(`Running executor for input: ${input}`);

  let cancelLoading = setLoading();

  let result = await executor.call({
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

  input = `\
What's the name of his or her spouse?
`;

  log(`Running executor for input: ${input}`);

  cancelLoading = setLoading();

  result = await executor.call({
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
