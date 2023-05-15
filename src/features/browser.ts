import { WebBrowser } from "langchain/tools/webbrowser";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { BaseLanguageModel } from "langchain/base_language";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { isVerboseMode, log } from "../utils/verboseMode";
import { formatResponse } from "../utils/formatResponse";
import { setLoading } from "../utils/loadingAnimation";
import { getUserInput } from "../prompts/user/input";

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
  const embeddings = new OpenAIEmbeddings();

  log("Creating browser");
  const browser = new WebBrowser({ model, verbose, embeddings });

  const url = "https://www.pipedrive.com/";
  const input = getUserInput("What's Pipedrive?");

  log(`Running browser for url "${url}" and input "${input}"`);

  const cancelLoading = setLoading();

  const result = await browser.call([url, input].join(","));

  cancelLoading();

  console.log(
    formatResponse({
      llm: model,
      response: result,
      prompt: input,
    })
  );
};
