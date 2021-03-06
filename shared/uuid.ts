import { v4, validate } from "uuid";

export const validateUuid = (uuid: string) => {
  const errors = [];

  if (!validate(uuid)) {
    errors.push(new Error("Invalid uuid"));
  }

  return errors;
};

export type IUuid = string & { Uuid: "Uuid" };

export const Uuid = (uuid?: string) => {
  if (uuid) {
    const errors = validateUuid(uuid);

    if (errors.length > 0) {
      throw errors;
    }

    return uuid as IUuid;
  }

  return v4() as IUuid;
};
