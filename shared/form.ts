export const getFormDataValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value === "string") {
    return value;
  }

  throw new Error(`failed to get form data value associated with ${value}`);
};

export type IFormDataErrors<TFormData> = {
  [key in keyof TFormData]: Error[];
};

export type IForm<TFormData> = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  errors: IFormDataErrors<TFormData>;
};
