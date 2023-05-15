import { Calculator } from "langchain/tools/calculator";
import { SerpAPI } from "langchain/tools";
import { BufferMemory } from "langchain/memory";
import { BaseLanguageModel } from "langchain/base_language";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { isVerboseMode, log } from "../../utils/verboseMode";
import { formatResponse } from "../../utils/formatResponse";
import { setLoading } from "../../utils/loadingAnimation";

const runStep = async ({
  model,
  executor,
  input,
}: {
  model: BaseLanguageModel;
  executor: PlanAndExecuteAgentExecutor;
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

  log("Creating plan-and-execute executor");
  const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
    llm: model,
    tools,
    memory,
    verbose,
  });

  await runStep({
    model,
    executor,
    input: `\
Who is the current president of the Czech republic?\
    `,
  });

  await runStep({
    model,
    executor,
    input: `\
What's the name of his or her spouse?
    `,
  });

  await runStep({
    model,
    executor,
    input: `\
How many years has the president left before he's eligible for a retirement?
    `,
  });
};
