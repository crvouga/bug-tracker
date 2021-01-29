import { ITimestamp } from "./time";

export type ICommand<T extends string, P> = {
  type: T;
  payload: P;
};

export type IEvent<T extends string, P> = {
  type: T;
  timestamp: ITimestamp;
  payload: P;
};
