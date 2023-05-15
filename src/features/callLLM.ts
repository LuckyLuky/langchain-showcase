import { log } from "../utils/verboseMode";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { formatResponse } from "../utils/formatResponse";
import { BaseLLM } from "langchain/llms";
import { getUserInput } from "../prompts/user/input";
import { setLoading } from "../utils/loadingAnimation";

export const run = async (llm: BaseLLM) => {
  log("Creating prompt");

  const prompt = ChatPromptTemplate.fromPromptMessages([
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  const input = getUserInput("Who are you?");

  log("Formatting prompt");

  const formattedPrompt = (
    await prompt.formatPromptValue({
      input,
    })
  )
    .toChatMessages()
    .map((message) => message.text)
    .join(" ");

  log("Waiting for response");

  const cancelLoading = setLoading();

  const response = await llm.call(formattedPrompt);

  cancelLoading();

  console.log(
    formatResponse({
      llm,
      response: response.replace(formattedPrompt, ""),
      prompt: formattedPrompt,
    })
  );
};
