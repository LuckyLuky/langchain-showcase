import { BaseLanguageModel } from "langchain/base_language";

export const formatResponse = ({
  llm,
  prompt,
  response,
}: {
  llm: BaseLanguageModel;
  prompt: string;
  response: string;
}) => `
[Prompt]
${prompt}

[${llm._llmType()}][${llm._modelType()}] 
${response}
`;
