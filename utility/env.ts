export const getEnvVariable = (key: string): string => {
  const variable = process.env[key];

  if (variable) {
    return variable;
  }

  throw new Error(`${key} is undefined`);
};
