import inquirer from "inquirer";
import { features } from "./features";
import { chatModels } from "./chatModels";
import { log } from "./utils";

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
      choices: () => Object.keys(chatModels),
    },
  ])
  .then(({ feature, chatModel }) => {
    if (!features[feature] || !chatModels[chatModel]) {
      throw new Error("Invalid input");
    }

    log(`Running ${feature} with ${chatModel}`);

    return features[feature](chatModels[chatModel]());
  });
