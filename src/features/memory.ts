import { BufferMemory } from "langchain/memory";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BaseLanguageModel } from "langchain/base_language";
import { isVerboseMode, log } from "../utils/verboseMode";
import { setLoading } from "../utils/loadingAnimation";
import { formatResponse } from "../utils/formatResponse";

const runStep = async ({
  model,
  chain,
  input,
}: {
  model: BaseLanguageModel;
  chain: LLMChain;
  input: string;
}) => {
  log(`Running chain for input: ${input}`);

  const cancelLoading = setLoading();

  const result = await chain.call({
    input,
  });

  cancelLoading();

  console.log(
    formatResponse({
      llm: model,
      response: result.response,
      prompt: input,
    })
  );
};

export const run = async (model: BaseLanguageModel) => {
  const verbose = isVerboseMode();

  const memory = new BufferMemory();
  const chain = new ConversationChain({ llm: model, memory, verbose });

  await runStep({
    model,
    chain,
    input: "Hi, I'm Luke Skywalker",
  });

  await runStep({
    model,
    chain,
    input: "What's my name?",
  });
};
