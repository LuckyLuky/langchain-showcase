import { config } from "dotenv";
import { BaseChatModel } from "langchain/chat_models";

config();
const verboseMode = Boolean(
  process.env.VERBOSE &&
    ["true", "1", "yes", "on"].includes(process.env.VERBOSE)
);
if (verboseMode) {
  console.info("Running in verbose mode");
}

export const isVerboseMode = () => verboseMode;

export const log = (...args: any[]) => {
  if (verboseMode) {
    console.log(...args);
  }
};

export const formatResponse = ({
  chat,
  response,
}: {
  chat: BaseChatModel;
  response: string;
}) => `\n[${chat._llmType()}]: ${response}`;
