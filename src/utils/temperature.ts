import { config } from "dotenv";

config();

export const getTemperature = () => {
  try {
    return parseFloat(process.env.TEMPERATURE);
  } catch {
    return 0;
  }
};
