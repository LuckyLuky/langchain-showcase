import { config } from "dotenv";
import readline from "readline";
import { setLoading } from "./utils/loadingAnimation";

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
  const callChatbot = async (input: string) => {
    const cancelLoading = setLoading();

    // TODO
    const result = null;

    cancelLoading();

    console.log(input);
    rl.prompt();
  };

  rl.on("line", callChatbot);

  rl.setPrompt(`Ask anything!\n\n`);
  rl.prompt();
}
