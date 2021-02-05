import { IProjectId } from "../domain";
import { IProjectEvent } from "../events";

export type IProjectEventStore = {
  reduce<S>(
    reducer: (state: S, event: IProjectEvent) => S,
    initialState: S,
    aggergateId: IProjectId
  ): Promise<S>;

  subscribe: (callback: (projectEvent: IProjectEvent) => void) => Promise<void>;

  publish(projectEvent: IProjectEvent): Promise<void>;
};
