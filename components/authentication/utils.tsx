export const getFormDataValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value === "string") {
    return value;
  }

  throw new Error(`failed to get form data value associated with ${value}`);
};
