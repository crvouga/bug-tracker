import { IProjectId } from "../domain";
import { IProjectEvent } from "./project-events";
import { ILogger } from "../../app/logging/contracts";

export type IProjectEventStore = {
  reduce<S>(
    reducer: (state: S, event: IProjectEvent) => S,
    initialState: S,
    aggergateId: IProjectId
  ): Promise<S>;

  subscribe: (callback: (projectEvent: IProjectEvent) => void) => Promise<void>;

  publish(projectEvent: IProjectEvent): Promise<void>;
};

export const ProjectEventStoreInMemory = ({
  logger,
}: {
  logger: ILogger;
}): IProjectEventStore & {
  eventsById: { [key: string]: IProjectEvent[] };
} => {
  let eventsById: { [key: string]: IProjectEvent[] } = {};
  const callbacks: ((event: IProjectEvent) => void)[] = [];

  return {
    eventsById,
    async reduce<S>(
      reducer: (state: S, event: IProjectEvent) => S,
      initialState: S,
      aggergateId: string
    ) {
      return eventsById[aggergateId].reduce(reducer, initialState);
    },
    async subscribe(callback) {
      callbacks.push(callback);
    },
    async publish(event) {
      logger.debug("[projects][events][published]", event);
      eventsById[event.aggergateId] = eventsById[event.aggergateId]
        ? [...eventsById[event.aggergateId], event]
        : [event];

      for (const callback of callbacks) {
        callback(event);
      }
    },
  };
};
