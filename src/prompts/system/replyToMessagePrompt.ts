import { SystemMessagePromptTemplate } from "langchain/prompts";
import { initialSystemMessageTemplate } from "./initialPrompt";

export const replyToMessageSystemPrompt =
  SystemMessagePromptTemplate.fromTemplate(`
${initialSystemMessageTemplate}
When given a message from a customer, you will reply with response that is most likely to please the customer and win the deal. 
Reply should be no longer than 1000 characters.
`);
