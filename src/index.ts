import { features } from "./features";
import { chatModels } from "./chatModels";

const chatOpenAI = chatModels.openAI();

features.fewShot(chatOpenAI);
