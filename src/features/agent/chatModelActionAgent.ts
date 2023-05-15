import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools";
import { BufferMemory } from "langchain/memory";
import { BaseLanguageModel } from "langchain/base_language";
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import { isVerboseMode, log } from "../../utils/verboseMode";
import { formatResponse } from "../../utils/formatResponse";
import { setLoading } from "../../utils/loadingAnimation";

const runStep = async ({
  model,
  executor,
  input,
}: {
  model: BaseLanguageModel;
  executor: AgentExecutor;
  input: string;
}) => {
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

export const run = async (model: BaseLanguageModel) => {
  const verbose = isVerboseMode();

  log("Creating tools");
  const tools = [new Calculator(), new SerpAPI()];

  log("Creating buffer memory");
  const memory = new BufferMemory();

  log("Creating action agent executor");
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
    verbose,
  });

  await runStep({
    executor,
    model,
    input: `\
Who is the current president of the Czech republic?
    `,
  });

  await runStep({
    executor,
    model,
    input: `\
What's the name of his or her spouse?
    `,
  });
};
