import { log } from "../utils/verboseMode";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { formatResponse } from "../utils/formatResponse";
import { BaseLLM } from "langchain/llms";
import { initialSystemMessagePrompt } from "../prompts/system/initialPrompt";
import { getUserInput } from "../prompts/user/input";
import { setLoading } from "../utils/loadingAnimation";

export const run = async (llm: BaseLLM) => {
  log("Creating prompt");

  const prompt = ChatPromptTemplate.fromPromptMessages([
    initialSystemMessagePrompt,
    HumanMessagePromptTemplate.fromTemplate(
      'Message from the customer: "{input}"'
    ),
  ]);

  const input = getUserInput();

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

  // TODO: get input
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
