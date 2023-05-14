import { log, isVerboseMode } from "../utils/verboseMode";
import {
  AIMessagePromptTemplate,
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain";
import { BaseLanguageModel } from "langchain/base_language";
import { formatResponse } from "../utils/formatResponse";
import { initialSystemMessagePrompt } from "../prompts/system/initialPrompt";
import { getUserInput } from "../prompts/user/input";

export const run = async (model: BaseLanguageModel) => {
  const verbose = isVerboseMode();

  log("Creating prompts");

  const prompt = ChatPromptTemplate.fromPromptMessages([
    initialSystemMessagePrompt,
    HumanMessagePromptTemplate.fromTemplate(
      "Hello! I'd like to book an apartment, would it be possible?"
    ),
    AIMessagePromptTemplate.fromTemplate(
      "Howdy fella! You bet your horses! Looking forward to see you soon! Adios!"
    ),
    HumanMessagePromptTemplate.fromTemplate(
      "Hi! We'd like to make a booking for a larger group. Is there a discount available?"
    ),
    AIMessagePromptTemplate.fromTemplate(
      "Howdy, you must be out of your mind! No discounts, either pay, or get lost! But I sure hope you'll get your mind right and well make a deal! Yeehaw!"
    ),
    HumanMessagePromptTemplate.fromTemplate("{input}"),
  ]);

  log("Setting up LLM chain");

  const chain = new LLMChain({ llm: model, prompt, verbose });

  log("Waiting for response");

  const input = getUserInput();

  const [formattedPrompt, response] = await Promise.all([
    prompt.formatMessages({ input }),
    chain.run(input),
  ]);

  console.log(
    formatResponse({
      llm: model,
      response,
      prompt: formattedPrompt
        .map((message) => `(${message._getType()}): ${message.text}`)
        .join("\n"),
    })
  );
};
