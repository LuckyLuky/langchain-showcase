export const getUserInput = (defaultValue?: string) =>
  process.env.USER_PROMPT || defaultValue;
