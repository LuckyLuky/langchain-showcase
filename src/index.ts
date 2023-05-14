import inquirer from "inquirer";
import { agentFeatures, chatFeatures, features, llmFeatures } from "./features";
import { chatModels, llmModels, models } from "./models";
import { log } from "./utils/verboseMode";

inquirer
  .prompt([
    {
      name: "feature",
      type: "list",
      message: "Select feature",
      choices: () => Object.keys(features),
    },
    {
      name: "chatModel",
      type: "list",
      message: "Select chat model",
      choices: (answers) => {
        const { feature } = answers;

        if (Object.keys(llmFeatures).includes(feature)) {
          return Object.keys(models);
        }
        if (Object.keys(chatFeatures).includes(feature)) {
          return Object.keys(chatModels);
        }

        throw new Error("Invalid input");
      },
    },
    {
      name: "input",
      type: "input",
      message: "Add prompt",
      when: (answers) => {
        const { feature } = answers;

        if (Object.keys(agentFeatures).includes(feature)) {
          return false;
        }

        return !process.env.USER_PROMPT;
      },
    },
  ])
  .then(({ feature, chatModel, input }) => {
    if (!features[feature] || !models[chatModel]) {
      throw new Error("Invalid input");
    }

    process.env.USER_PROMPT = input;

    log(`Running ${feature} with ${chatModel}`);

    return features[feature](models[chatModel]());
  });
