import inquirer from "inquirer";
import { chatFeatures, features, llmFeatures } from "./features";
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
      choices: (answer) => {
        const { feature } = answer;

        if (Object.keys(llmFeatures).includes(feature)) {
          return Object.keys(models);
        }
        if (Object.keys(chatFeatures).includes(feature)) {
          return Object.keys(chatModels);
        }

        throw new Error("Invalid input");
      },
    },
  ])
  .then(({ feature, chatModel }) => {
    if (!features[feature] || !models[chatModel]) {
      throw new Error("Invalid input");
    }

    log(`Running ${feature} with ${chatModel}`);

    return features[feature](models[chatModel]());
  });
