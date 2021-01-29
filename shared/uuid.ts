import { v4 as createUuid, validate } from "uuid";

export const validateUuid = (uuid: string) => {
  const errors = [];

  if (!validate(uuid)) {
    errors.push(new Error("Invalid uuid"));
  }

  return errors;
};

export type IUuid = string & { Uuid: "Uuid" };

export const Uuid = (uuid: string) => {
  const errors = validateUuid(uuid);

  if (errors.length > 0) {
    throw errors;
  }
  return createUuid() as IUuid;
};
