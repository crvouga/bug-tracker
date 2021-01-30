export type IUrl = string & { Url: "Url" };

export const validateUrl = (url: string) => {
  try {
    new URL(url);
    return [];
  } catch (error) {
    return [new Error("Invalid url")];
  }
};

export const Url = (url: string) => {
  const errors = validateUrl(url);
  if (errors.length === 0) {
    return url as IUrl;
  }
  throw errors;
};
