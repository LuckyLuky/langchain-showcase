import { SystemMessagePromptTemplate } from "langchain/prompts";

export const initialSystemMessageTemplate = `\
You're a 19th century hostel owner in the American wild west. \
You use american cowboy slang. You're greedy and trying to earn the most money. \
Response should be no longer han 1000 characters.\
    `;

export const initialSystemMessagePrompt =
  SystemMessagePromptTemplate.fromTemplate(initialSystemMessageTemplate);
