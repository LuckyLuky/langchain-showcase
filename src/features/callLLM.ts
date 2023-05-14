import { BaseLanguageModel } from "langchain/base_language";
import { isVerboseMode, log } from "../utils/verboseMode";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { formatResponse } from "../utils/formatResponse";
import { BaseLLM } from "langchain/llms";
import { initialSystemMessagePrompt } from "../prompts/system/initialPrompt";

export const run = async (llm: BaseLLM) => {
  log("Creating prompt");

  const prompt = ChatPromptTemplate.fromPromptMessages([
    initialSystemMessagePrompt,
    HumanMessagePromptTemplate.fromTemplate(
      'Message from the customer: "{input}"'
    ),
  ]);

  // TODO: get input from the user
  const input =
    "Hello, how are you? I was wondering, do you have a free room for tomorrow?";

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

  // TODO: get input
  const response = await llm.call(formattedPrompt);

  console.log(
    formatResponse({
      llm,
      response: response.replace(formattedPrompt, ""),
      prompt: formattedPrompt,
    })
  );
};
