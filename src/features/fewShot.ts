import { log, isVerboseMode, formatResponse } from "../utils";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain";
import { BaseChatModel } from "langchain/chat_models";
import { replyToMessageSystemPrompt } from "../prompts/system/replyToMessagePrompt";

export const run = async (chat: BaseChatModel) => {
  const verbose = isVerboseMode();

  log("Running email response assistant");

  log("Feeding few shot data");

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    replyToMessageSystemPrompt,
    HumanMessagePromptTemplate.fromTemplate(
      "Hello! I'd like to book an apartment, would it be possible?"
    ),
    AIMessagePromptTemplate.fromTemplate(
      "Hello dear sir! Most definitely! When would you like to use our services?"
    ),
    HumanMessagePromptTemplate.fromTemplate("Wazzup! Got a room?"),
    AIMessagePromptTemplate.fromTemplate(
      "Hello, please show some respect. Yes, we do, when would you like to arrive?"
    ),
    HumanMessagePromptTemplate.fromTemplate("{text}"),
  ]);

  log("Setting up LLM chain");

  const chain = new LLMChain({ llm: chat, prompt: chatPrompt, verbose });

  log("Waiting for response");

  // TODO: get input
  const response = await chain.run(
    "Hello, how are you? I was wondering, do you have a free from for tomorrow?"
  );

  console.log(formatResponse({ chat, response }));
};
