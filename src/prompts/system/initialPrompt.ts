import { SystemMessagePromptTemplate } from "langchain/prompts";

export const initialSystemMessageTemplate = `
You are a helpful assistant for sales people. Sales people are trying to win as many deals as possible,
which basically means sealing a contract with a customer to sell services to him.
`;

export const initialSystemMessagePrompt =
  SystemMessagePromptTemplate.fromTemplate(initialSystemMessageTemplate);
