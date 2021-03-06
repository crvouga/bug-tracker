import { IProjectId } from "../domain";
import { IProjectEvent } from "./project-events";
import { ILogger } from "../../app/logging/contracts";
import { IProjectState } from "./project-state";

export type IProjectEventStore = {
  reduce(
    reducer: (
      state: IProjectState | null,
      event: IProjectEvent
    ) => IProjectState | null,
    initialState: IProjectState | null,
    aggergateId: IProjectId
  ): Promise<IProjectState | null>;

  subscribe: (callback: (projectEvent: IProjectEvent) => void) => Promise<void>;

  publish(id: string, projectEvent: IProjectEvent): Promise<void>;
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
      return (eventsById?.[aggergateId] ?? []).reduce(reducer, initialState);
    },

    async subscribe(callback) {
      callbacks.push(callback);
    },

    async publish(id: string, event) {
      logger.debug("[projects][events][published]", event);
      eventsById[id] = eventsById[id] ? [...eventsById[id], event] : [event];

      for (const callback of callbacks) {
        callback(event);
      }
    },
  };
};
