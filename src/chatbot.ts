import { config } from "dotenv";
import readline from "readline";
import { setLoading } from "./utils/loadingAnimation";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

config();

const rl = readline.createInterface(process.stdin, process.stdout);

process.on("beforeExit", () => {
  rl.close();
});

run();

/**
 * Run script
 */
async function run() {
  const model = new ChatOpenAI({ temperature: 0 });
  const tools = [new SerpAPI()];
  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "chat-conversational-react-description",
  });

  const callChatbot = async (input: string) => {
    const cancelLoading = setLoading();

    // TODO
    const result = await executor.call({ input });

    cancelLoading();

    console.log(`\n${result.output}\n`);
    rl.prompt();
  };

  rl.on("line", callChatbot);

  rl.setPrompt(`Ask anything!\n\n`);
  rl.prompt();
}
