import { ITimestamp } from "./time";

export type ICommand<TType extends string, TPayload> = {
  type: TType;
  payload: TPayload;
};

export const Command = <TType extends string, TPayload>(command: any) => {
  if ("type" in command && "payload" in command) {
    return command as ICommand<TType, TPayload>;
  }
  throw new Error("invalide command");
};

export const CommandType = (namespace: string) => (name: string) => {
  return `[COMMAND][${namespace.toUpperCase()}][${name.toUpperCase()}]`;
};

export type IEvent<T extends string, P> = {
  type: T;
  timestamp: ITimestamp;
  payload: P;
};

export const EventType = (namespace: string) => (name: string) => {
  return `[EVENT][${namespace.toUpperCase()}][${name.toUpperCase()}]`;
};
